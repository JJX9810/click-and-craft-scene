#!/usr/bin/env node
/*
 * build-nexus-brain.js
 * Liest den Markdown-Vault NEXUS_BRAIN/ und erzeugt daraus:
 *   NEXUS_BRAIN/export/nexus-brain.json
 *   NEXUS_BRAIN/export/nexus-brain.generated.js   (window.NEXUS_BRAIN_DEFAULT = …)
 *
 * Mit --embed wird der Block zwischen
 *   // BEGIN NEXUS_BRAIN_DEFAULT … // END NEXUS_BRAIN_DEFAULT
 * in der Cockpit-HTML ersetzt (Standard: vvcockpit.html, überschreibbar
 * mit --target=pfad/zur/datei.html). Existiert der Block nicht, wird er
 * vor dem ersten </script> eingefügt.
 *
 * Es werden ausschließlich Begriffe, Seiten, Tools, Regeln und
 * Unternehmenswissen exportiert – niemals API-Keys oder Kundendaten.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const VAULT = path.join(ROOT, "NEXUS_BRAIN");
const EXPORT_DIR = path.join(VAULT, "export");

function read(name){
  const p = path.join(VAULT, name);
  if(!fs.existsSync(p)) { console.warn("⚠ fehlt:", name); return ""; }
  return fs.readFileSync(p, "utf8");
}

/* "## Abschnitt"-Blöcke: [{title, body}] */
function sections(md){
  const out = [];
  const parts = md.split(/^## +/m).slice(1);
  for(const part of parts){
    const nl = part.indexOf("\n");
    out.push({ title: part.slice(0, nl).trim(), body: part.slice(nl + 1) });
  }
  return out;
}
/* "- schlüssel: wert"-Zeilen eines Abschnitts als Objekt */
function kv(body){
  const o = {};
  for(const line of body.split("\n")){
    const m = line.match(/^- +([^:]+?): +(.*\S)\s*$/);
    if(m) o[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return o;
}
/* einfache "- wert"-Bullets (ohne Doppelpunkt-Schlüssel) */
function bullets(body){
  const out = [];
  for(const line of body.split("\n")){
    const m = line.match(/^- +(.*\S)\s*$/);
    if(m && !/^[^:]{1,30}: /.test(m[1])) out.push(m[1].trim());
  }
  return out;
}
const list = s => String(s || "").split(",").map(x => x.trim()).filter(Boolean);

/* 01: Glossar */
function parseGlossary(){
  return sections(read("01_Begriffe_und_Synonyme.md")).map(sec => {
    const o = kv(sec.body);
    if(!o.bedeutung) return null;
    return {
      term: sec.title,
      meaning: o.bedeutung,
      canonicalIntent: o.intent || null,
      canonicalTool: o.tool || null,
      page: o.seite || null,
      aliases: list(o.synonyme),
      notMeant: list(o["nicht-gemeint"]),
      dangerousWhenCombinedWith: list(o.gefahr),
      clarificationRule: o.regel || null
    };
  }).filter(Boolean);
}
/* 02: Seiten */
function parsePages(){
  const pages = {};
  for(const sec of sections(read("02_Cockpit_Seiten.md"))){
    const o = kv(sec.body);
    if(o.label) pages[sec.title] = { label: o.label, aliases: list(o.synonyme) };
  }
  return pages;
}
/* 03: Tools */
function parseTools(){
  const tools = {};
  for(const sec of sections(read("03_Cockpit_Tools.md"))){
    const o = kv(sec.body);
    if(!o.beschreibung) continue;
    const sicher = (o.sicherheit || "confirm").toLowerCase();
    tools[sec.title] = {
      label: o.label || sec.title,
      description: o.beschreibung,
      safe: sicher === "safe",
      requiresConfirmation: sicher !== "safe",
      requiresStrongConfirmation: sicher === "strong",
      params: list(o.params),
      page: o.seite || null
    };
  }
  return tools;
}
/* 04: Sicherheitsregeln */
function parseRules(){
  const md = read("04_Sicherheitsregeln.md");
  return sections(md).flatMap(sec => bullets(sec.body));
}
/* 05: Unternehmenswissen */
function parseBusiness(){
  const biz = {};
  for(const sec of sections(read("05_VV_Unternehmenswissen.md"))){
    const o = kv(sec.body); const b = bullets(sec.body);
    const key = sec.title.toLowerCase()
      .replace(/[äöüß]/g, c => ({ "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss" }[c]))
      .replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    biz[key] = Object.keys(o).length ? o : b;
  }
  // Komfortfelder für den KI-Kontext
  const st = biz.stammdaten || {};
  biz.name = st.name || "Verlegt & Verschraubt Handwerkerservice";
  biz.type = st.typ || "Handwerksservice";
  biz.owner = st.inhaber || "";
  biz.region = st.region || "Wilhelmshaven und Umgebung";
  biz.claim = st.claim || "";
  biz.mainServices = biz.hauptleistungen || [];
  return biz;
}
/* 10: Few-Shot-Beispiele */
function parseExamples(){
  const out = [];
  for(const sec of sections(read("10_Beispielbefehle.md"))){
    const um = sec.body.match(/^User: +(.+)$/m);
    const jm = sec.body.match(/```json\s*([\s\S]*?)```/);
    if(!um || !jm) continue;
    try{ out.push({ user: um[1].trim(), json: JSON.parse(jm[1]) }); }
    catch(e){ console.warn("⚠ Beispiel-JSON ungültig in:", sec.title, e.message); }
  }
  return out;
}
/* übrige Dateien als Doku-Verzeichnis (Titel + erste Textzeile) */
function parseDocs(){
  const files = ["00_INDEX.md","06_Buchhaltung_und_offene_Posten.md","07_Kunden_und_Auftraege.md",
    "08_Marketing_und_Content.md","09_Agentenrollen.md","11_Lernspeicher_und_Erinnerungen.md"];
  return files.map(f => {
    const md = read(f); if(!md) return null;
    const title = (md.match(/^# +(.+)$/m) || [,""])[1].trim();
    const para = (md.split(/\n\n+/).find(p => p.trim() && !p.trim().startsWith("#")) || "").replace(/\s+/g, " ").trim().slice(0, 240);
    return { file: f, title, summary: para };
  }).filter(Boolean);
}

function build(){
  const brain = {
    version: 1,
    updatedAt: new Date().toISOString(),
    glossary: parseGlossary(),
    pages: parsePages(),
    tools: parseTools(),
    safetyRules: parseRules(),
    businessKnowledge: parseBusiness(),
    examples: parseExamples(),
    docs: parseDocs()
  };
  // Sicherheitsnetz: keine Key-artigen Inhalte exportieren
  const flat = JSON.stringify(brain);
  if(/AIza[0-9A-Za-z_\-]{20,}|gsk_[0-9A-Za-z]{20,}|sk-[a-zA-Z0-9]{20,}/.test(flat))
    throw new Error("Abbruch: Brain enthält etwas, das wie ein API-Key aussieht!");
  return brain;
}

function writeExports(brain){
  fs.mkdirSync(EXPORT_DIR, { recursive: true });
  const json = JSON.stringify(brain, null, 2);
  fs.writeFileSync(path.join(EXPORT_DIR, "nexus-brain.json"), json);
  const js = "/* automatisch erzeugt von tools/build-nexus-brain.js – nicht von Hand ändern */\n" +
    "window.NEXUS_BRAIN_DEFAULT = " + JSON.stringify(brain) + ";\n";
  fs.writeFileSync(path.join(EXPORT_DIR, "nexus-brain.generated.js"), js);
  console.log("✓ NEXUS_BRAIN/export/nexus-brain.json (" + json.length + " Zeichen)");
  console.log("✓ NEXUS_BRAIN/export/nexus-brain.generated.js");
}

function embed(brain){
  const targetArg = process.argv.find(a => a.startsWith("--target="));
  const target = path.join(ROOT, targetArg ? targetArg.slice(9) : "vvcockpit.html");
  if(!fs.existsSync(target)){ console.error("✗ Ziel nicht gefunden:", target); process.exit(1); }
  let html = fs.readFileSync(target, "utf8");
  const block = "// BEGIN NEXUS_BRAIN_DEFAULT\nwindow.NEXUS_BRAIN_DEFAULT = " +
    JSON.stringify(brain) + ";\n// END NEXUS_BRAIN_DEFAULT";
  const re = /\/\/ BEGIN NEXUS_BRAIN_DEFAULT[\s\S]*?\/\/ END NEXUS_BRAIN_DEFAULT/;
  if(re.test(html)){
    html = html.replace(re, block);
    console.log("✓ Brain-Block in " + path.basename(target) + " ersetzt");
  } else {
    const i = html.indexOf("</script>");
    if(i < 0){ console.error("✗ Kein </script> im Ziel gefunden."); process.exit(1); }
    html = html.slice(0, i) + "\n" + block + "\n" + html.slice(i);
    console.log("✓ Brain-Block in " + path.basename(target) + " neu eingefügt");
  }
  fs.writeFileSync(target, html);
}

const brain = build();
writeExports(brain);
if(process.argv.includes("--embed")) embed(brain);
console.log("Fertig. Begriffe: " + brain.glossary.length + ", Seiten: " + Object.keys(brain.pages).length +
  ", Tools: " + Object.keys(brain.tools).length + ", Regeln: " + brain.safetyRules.length +
  ", Beispiele: " + brain.examples.length);
