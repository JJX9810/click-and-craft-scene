/*
 * ============================================================
 *  NEXUS Gemini-Proxy (lokal)
 * ------------------------------------------------------------
 *  Läuft NUR auf localhost. Der Gemini API-Key bleibt serverseitig
 *  (process.env / .env) und verlässt niemals diese Datei Richtung
 *  Browser. Das Cockpit ruft nur /intent auf und bekommt
 *  ausschließlich ein strukturiertes Intent-JSON zurück.
 *
 *  Keine npm-Abhängigkeiten. Benötigt Node.js >= 18 (globales fetch).
 *  Start:  node server.js   (oder über start-vv-cockpit.bat)
 * ============================================================
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

/* ---- .env laden (einfacher KEY=VALUE-Parser, keine Abhängigkeit) ---- */
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const txt = fs.readFileSync(envPath, 'utf8');
    txt.split(/\r?\n/).forEach((line) => {
      if (/^\s*#/.test(line) || !line.trim()) return;
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
      }
    });
  } catch (e) { /* ignore */ }
}
loadEnv();

const PORT = parseInt(process.env.GEMINI_PROXY_PORT, 10) || 8787;
const API_KEY = (process.env.GEMINI_API_KEY || '').trim();
const MODEL = (process.env.GEMINI_MODEL || 'gemini-2.0-flash').trim();
const PLACEHOLDER = /^(your_gemini_api_key_here|hier_key_eintragen|)$/i;
const HAS_KEY = !!API_KEY && !PLACEHOLDER.test(API_KEY);
const ALLOW_ORIGINS = (process.env.GEMINI_ALLOW_ORIGINS ||
  'http://localhost:8000,http://127.0.0.1:8000,http://localhost:8001,http://127.0.0.1:8001,http://localhost:8002,http://localhost:8765,http://127.0.0.1:8765'
).split(',').map((s) => s.trim()).filter(Boolean);

function maskKey(k) { if (!k) return '(leer)'; if (k.length <= 6) return '***'; return k.slice(0, 2) + '...' + k.slice(-2); }

const ALLOWED_INTENTS = ['navigate', 'open_items_summary', 'finance_summary', 'search_customer', 'create_customer_draft', 'create_booking_draft', 'create_offer_draft', 'create_invoice_draft', 'project_summary', 'marketing_draft', 'open_agent', 'system_action', 'stop_speaking', 'confirm_action', 'cancel_action', 'unknown'];
const ALLOWED_TOOLS = ['navigateTo', 'getOpenPositionsSummary', 'getFinanceSummary', 'searchCustomer', 'createCustomerDraft', 'createBookingDraft', 'createOfferDraft', 'createInvoiceDraft', 'getProjectSummary', 'createMarketingDraft', 'openAgent', 'stopSpeaking', 'confirmPendingAction', 'cancelPendingAction', 'askClarifyingQuestion'];

const SYSTEM_PROMPT = `Du bist NEXUS, der Intent-Router für das V&V-Cockpit (Handwerksbetrieb Verlegt & Verschraubt, Wilhelmshaven).
Du steuerst NICHT direkt die Oberfläche. Du klickst KEINE Buttons. Du führst KEINE Aktionen selbst aus. Du wählst nur EIN erlaubtes Cockpit-Tool aus.

Antworte AUSSCHLIESSLICH mit gültigem JSON. Keine Markdown-Blöcke. Kein Text außerhalb des JSON.

Erlaubte intents: ${ALLOWED_INTENTS.join(', ')}.
Erlaubte tools: ${ALLOWED_TOOLS.join(', ')}.

Antwortformat (immer alle Felder):
{"intent":"string","tool":"string","confidence":0.0,"requiresConfirmation":false,"entities":{"customerName":null,"amount":null,"date":null,"category":null,"service":null,"page":null},"spokenResponse":"string","clarifyingQuestion":null}

Kritische Aktionen brauchen IMMER Bestätigung (wähle dann NUR ein Draft-Tool und setze requiresConfirmation=true): Buchung speichern, Kunde anlegen, offenen Posten als bezahlt markieren, Rechnung/Angebot finalisieren, Daten löschen/importieren, Nachricht senden, veröffentlichen.
Für Navigation: tool=navigateTo und entities.page = eine Seiten-ID aus dem Kontext.
Für Buchungen: entities.amount = Zahl, entities.customerName falls genannt, und schreibe "Einnahme" oder "Ausgabe" in spokenResponse.
Erfinde KEINE Daten. Bei unklarem Befehl: intent=unknown bzw. tool=askClarifyingQuestion und fülle clarifyingQuestion. confidence ehrlich zwischen 0 und 1.`;

function corsHeaders(origin) {
  const allow = (origin && ALLOW_ORIGINS.includes(origin)) ? origin : (ALLOW_ORIGINS[0] || '*');
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}
function sendJson(res, code, obj, origin) {
  const body = JSON.stringify(obj);
  res.writeHead(code, Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, corsHeaders(origin)));
  res.end(body);
}

function extractJson(text) {
  let t = String(text || '').trim();
  t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try { return JSON.parse(t); } catch (e) {
    const m = t.match(/\{[\s\S]*\}/);
    if (m) { try { return JSON.parse(m[0]); } catch (e2) { /* ignore */ } }
  }
  return null;
}

/* Strenge Whitelist-Prüfung – unbekannte Tools/Intents werden verworfen */
function sanitizeIntent(obj) {
  if (!obj || typeof obj !== 'object') return null;
  const intent = String(obj.intent || 'unknown');
  const tool = String(obj.tool || '');
  let confidence = Number(obj.confidence);
  if (!isFinite(confidence)) confidence = 0;
  if (confidence > 1) confidence = confidence > 100 ? 1 : confidence / 100;
  if (!ALLOWED_INTENTS.includes(intent)) { console.warn('[gemini-proxy] Intent verworfen:', intent); return null; }
  if (tool && !ALLOWED_TOOLS.includes(tool)) { console.warn('[gemini-proxy] Tool verworfen:', tool); return null; }
  const e = (obj.entities && typeof obj.entities === 'object') ? obj.entities : {};
  const pick = (v) => (v === undefined ? null : v);
  return {
    intent, tool, confidence,
    requiresConfirmation: obj.requiresConfirmation === true,
    entities: {
      customerName: pick(e.customerName), amount: pick(e.amount), date: pick(e.date),
      category: pick(e.category), service: pick(e.service), page: pick(e.page)
    },
    spokenResponse: obj.spokenResponse != null ? String(obj.spokenResponse) : '',
    clarifyingQuestion: obj.clarifyingQuestion != null ? String(obj.clarifyingQuestion) : null
  };
}
function clarifyIntent(question) {
  return {
    intent: 'unknown', tool: 'askClarifyingQuestion', confidence: 0, requiresConfirmation: false,
    entities: { customerName: null, amount: null, date: null, category: null, service: null, page: null },
    spokenResponse: '', clarifyingQuestion: question || 'Ich habe das nicht eindeutig verstanden.'
  };
}

async function callGemini(userText, context) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
    encodeURIComponent(MODEL) + ':generateContent?key=' + encodeURIComponent(API_KEY);
  // Nur minimaler Kontext (keine Kundenakten o. Ä.)
  const userMsg = 'KONTEXT:\n' + JSON.stringify(context || {}) + '\n\nNUTZERTEXT:\n' + String(userText || '');
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts: [{ text: userMsg }] }],
    generationConfig: { temperature: 0, responseMimeType: 'application/json' }
  };
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
    clearTimeout(to);
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      // Key niemals mitloggen; Fehlertext kürzen
      throw new Error('Gemini HTTP ' + res.status + (t ? (': ' + t.slice(0, 200)) : ''));
    }
    const j = await res.json();
    const parts = (j && j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
    return parts.map((p) => p && p.text ? p.text : '').join('');
  } catch (err) {
    clearTimeout(to);
    if (err && err.name === 'AbortError') throw new Error('timeout');
    throw err;
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 1e6) { data = data.slice(0, 1e6); } });
    req.on('end', () => resolve(data));
    req.on('error', () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || '';
  const url = (req.url || '').split('?')[0];

  if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders(origin)); res.end(); return; }

  if (req.method === 'GET' && url === '/health') {
    return sendJson(res, 200, { ok: true, provider: 'gemini', hasKey: HAS_KEY, model: MODEL }, origin);
  }

  if (req.method === 'POST' && url === '/intent') {
    if (!HAS_KEY) return sendJson(res, 200, clarifyIntent('Gemini ist nicht konfiguriert (kein API-Key im Proxy).'), origin);
    let payload = null;
    try { payload = JSON.parse(await readBody(req) || '{}'); } catch (e) { payload = null; }
    if (!payload || typeof payload !== 'object') return sendJson(res, 400, { error: 'invalid_request' }, origin);
    const userText = String(payload.userText || '');
    if (!userText.trim()) return sendJson(res, 200, clarifyIntent('Kein Befehl erhalten.'), origin);
    try {
      const raw = await callGemini(userText, payload.context || {});
      const obj = extractJson(raw);
      const clean = sanitizeIntent(obj);
      if (!clean) return sendJson(res, 200, clarifyIntent('Die Antwort war nicht eindeutig. Bitte den Befehl anders formulieren.'), origin);
      return sendJson(res, 200, clean, origin);
    } catch (err) {
      console.warn('[gemini-proxy] /intent Fehler:', (err && err.message) || err);
      return sendJson(res, 502, { error: 'gemini_unreachable', message: String((err && err.message) || err) }, origin);
    }
  }

  sendJson(res, 404, { error: 'not_found' }, origin);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('============================================================');
  console.log(' NEXUS Gemini-Proxy läuft auf http://localhost:' + PORT);
  console.log('  • Modell:        ' + MODEL);
  console.log('  • API-Key:       ' + (HAS_KEY ? ('erkannt (' + maskKey(API_KEY) + ')') : 'NICHT gesetzt – /intent liefert Rückfrage'));
  console.log('  • Erlaubte Origins: ' + ALLOW_ORIGINS.join(', '));
  console.log('  • Endpunkte:     GET /health   POST /intent');
  console.log('============================================================');
});
