import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/tracking";
import {
  BODEN_VARIANTEN,
  ALT_PRICE_SCHWIMMEND,
  ALT_PRICE_VERKLEBT,
  ALT_TEPPICH_LOSE_PRICE,
  ALT_TEPPICH_LOSE_MIN,
  ALT_TEPPICH_VERKLEBT_PRICE,
  ALT_TEPPICH_VERKLEBT_MIN,
  DAEMMUNG_PRICE,
  SPACHTELN_PRICE,
  SOCKEL_PRICE,
  SOCKEL_GEHRUNG_PRICE,
  MATERIALSERVICE_RATE,
  MATERIALSERVICE_MIN,
  ANFAHRT_FREI_KM,
  ANFAHRT_PRO_KM,
  KUECHE_MONTAGE_PRICE,
  KUECHE_DEMONTAGE_PRICE,
  KUECHE_ARBEITSPLATTE_PRICE,
  KUECHE_ENTSORGUNG_PAUSCHAL,
} from "@/lib/pricing";

/**
 * Kostenrechner V2 – Premium-Wizard in vier Schritten.
 * Kalkuliert intern mit der zentralen Preisbasis (lib/pricing), zeigt dem
 * Kunden aber KEINE Einzelpreise – nur eine gerundete Ca.-Gesamteinschätzung.
 * Übergabe: WhatsApp (vorgefertigt), Google-Kalender-Buchung, E-Mail, Anruf.
 */

const PHONE_NUMBER = "491634799286";
const PHONE_DISPLAY = "0163 4799286";
const MAIL = "justus.brosch@verlegt-verschraubt.de";
const BOOKING_URL = "https://calendar.app.google/MbCnvoSqYjuLSAfY9";

type Service = "boden" | "kueche" | "ent" | "sonst";

const BELAG_LABELS: Record<string, string> = {
  laminat_schwimmend: "Laminat",
  vinyl_schwimmend: "Vinyl · Klick",
  vinyl_verklebt: "Vinyl · verklebt",
  pvc_schwimmend: "PVC · lose",
  pvc_verklebt: "PVC · verklebt",
  linoleum_verklebt: "Linoleum",
  teppich_lose: "Teppich · lose",
  teppich_verklebt: "Teppich · verklebt",
};
const BELAG_DESC: Record<string, string> = {
  laminat_schwimmend: "schwimmend verlegt",
  linoleum_verklebt: "vollflächig verklebt · Preis nach Anfrage",
  vinyl_schwimmend: "schwimmend verlegt",
  vinyl_verklebt: "vollflächig verklebt",
  pvc_schwimmend: "lose/fixiert verlegt",
  pvc_verklebt: "vollflächig verklebt",
  teppich_lose: "lose verlegt",
  teppich_verklebt: "vollflächig verklebt",
};

const TIMING = [
  { key: "flexibel", label: "Flexibel", desc: "nächster freier Termin", surcharge: 0 },
  { key: "14tage", label: "Zeitnah", desc: "innerhalb von 14 Tagen", surcharge: 0.1 },
  { key: "7tage", label: "Dringend", desc: "innerhalb von 7 Tagen oder schneller", surcharge: 0.2 },
];

type Item = { label: string; detail?: string; open?: boolean };

type St = {
  svc: Service | null;
  belag: string | null;
  qm: string;
  raeume: string;
  adds: Set<string>;
  altArt: "schwimmend" | "verklebt" | "tep_l" | "tep_k";
  lfm: string;
  sockelArt: "normal" | "gehrung";
  matWert: string;
  klfm: string;
  kart: string;
  kadds: Set<string>;
  ent: string | null;
  entMenge: string;
  entEtage: string;
  sonst: string;
  ort: string;
  km: string;
  timing: string;
  wunsch: string;
};

const initial: St = {
  svc: null,
  belag: null,
  qm: "",
  raeume: "",
  adds: new Set(),
  altArt: "schwimmend",
  lfm: "",
  sockelArt: "normal",
  matWert: "",
  klfm: "",
  kart: "Neue Küche (geliefert)",
  kadds: new Set(),
  ent: null,
  entMenge: "Normal möbliert",
  entEtage: "Erdgeschoss",
  sonst: "",
  ort: "",
  km: "",
  timing: "flexibel",
  wunsch: "",
};

function eur(n: number) {
  return n.toLocaleString("de-DE");
}
function round10(n: number) {
  return Math.round(n / 10) * 10;
}

function compute(s: St): { items: Item[]; sum: number; open: boolean } {
  const items: Item[] = [];
  let sum = 0;
  let open = false;
  const qm = Number(s.qm) || 0;

  if (s.svc === "boden" && s.belag && qm > 0) {
    const v = BODEN_VARIANTEN.find((b) => b.key === s.belag);
    if (v) {
      const isOpen = v.price == null;
      items.push({
        label: `${BELAG_LABELS[s.belag] ?? v.label} verlegen`,
        detail: `${qm} m²${s.raeume ? ` · ${s.raeume} Räume` : ""}`,
        open: isOpen,
      });
      if (v.price != null) sum += qm * v.price;
      else open = true;
    }
    if (s.adds.has("alt")) {
      let x = 0;
      if (s.altArt === "tep_l") x = Math.max(qm * ALT_TEPPICH_LOSE_PRICE, ALT_TEPPICH_LOSE_MIN);
      else if (s.altArt === "tep_k") x = Math.max(qm * ALT_TEPPICH_VERKLEBT_PRICE, ALT_TEPPICH_VERKLEBT_MIN);
      else if (s.altArt === "verklebt") x = qm * ALT_PRICE_VERKLEBT;
      else x = qm * ALT_PRICE_SCHWIMMEND;
      items.push({ label: "Altbelag entfernen & entsorgen" });
      sum += x;
    }
    if (s.adds.has("daemmung")) {
      items.push({ label: "Trittschalldämmung verlegen" });
      sum += qm * DAEMMUNG_PRICE;
    }
    if (s.adds.has("spachteln")) {
      items.push({ label: "Untergrund spachteln & grundieren" });
      sum += qm * SPACHTELN_PRICE;
    }
    const lfm = Number(s.lfm) || 0;
    if (s.adds.has("sockel") && lfm > 0) {
      items.push({ label: `Sockelleisten montieren${s.sockelArt === "gehrung" ? " (auf Gehrung)" : ""}`, detail: `${lfm} lfm` });
      sum += lfm * (s.sockelArt === "gehrung" ? SOCKEL_GEHRUNG_PRICE : SOCKEL_PRICE);
    }
    const mw = Number(s.matWert) || 0;
    if (s.adds.has("material") && mw > 0) {
      items.push({ label: "Materialbeschaffung über uns" });
      sum += Math.max(mw * MATERIALSERVICE_RATE, MATERIALSERVICE_MIN);
    }
  }

  if (s.svc === "kueche") {
    const m = Number(s.klfm) || 0;
    if (m > 0) {
      items.push({ label: "Küchenmontage", detail: `${m} lfm · ${s.kart}` });
      sum += m * KUECHE_MONTAGE_PRICE;
      if (s.kadds.has("demontage")) {
        items.push({ label: "Demontage der alten Küche" });
        sum += m * KUECHE_DEMONTAGE_PRICE;
      }
      if (s.kadds.has("entsorgung")) {
        items.push({ label: "Entsorgung der alten Küche" });
        sum += KUECHE_ENTSORGUNG_PAUSCHAL;
      }
      if (s.kadds.has("platte")) {
        items.push({ label: "Arbeitsplatte zuschneiden" });
        sum += m * KUECHE_ARBEITSPLATTE_PRICE;
      }
      if (s.kadds.has("spuele")) {
        items.push({ label: "Spüle & Armatur montieren", detail: "an vorhandenen Anschlüssen" });
      }
      if (s.kadds.has("geraete")) {
        items.push({ label: "Geräte einsetzen", detail: "Umfang klären wir gemeinsam", open: true });
        open = true;
      }
    }
  }

  if (s.svc === "ent" && s.ent) {
    items.push({ label: `Entrümpelung: ${s.ent}`, detail: `${s.entMenge} · ${s.entEtage}`, open: true });
    open = true;
  }
  if (s.svc === "sonst" && s.sonst.trim()) {
    items.push({ label: "Individuelles Projekt", detail: s.sonst.trim().slice(0, 90), open: true });
    open = true;
  }

  const km = Number(s.km) || 0;
  if (sum > 0 && km > ANFAHRT_FREI_KM) {
    items.push({ label: "Anfahrt", detail: s.ort || undefined });
    sum += (km - ANFAHRT_FREI_KM) * ANFAHRT_PRO_KM;
  }
  const t = TIMING.find((x) => x.key === s.timing);
  if (sum > 0 && t && t.surcharge > 0) {
    items.push({ label: t.key === "7tage" ? "Kurzfristige Umsetzung" : "Zeitnahe Umsetzung", detail: "bevorzugte Terminierung" });
    sum *= 1 + t.surcharge;
  }

  return { items, sum: Math.round(sum), open };
}

function buildMessage(s: St, items: Item[], sum: number) {
  const lines = items.map((i) => `• ${i.label}${i.detail ? ` (${i.detail})` : ""}`).join("\n");
  return (
    `Hallo, ich habe den Kostenrechner auf verlegt-verschraubt.de genutzt:\n${lines}\n` +
    `${s.ort ? `Ort: ${s.ort}\n` : ""}` +
    `${s.wunsch ? `Wunschtermin: ${s.wunsch}\n` : ""}` +
    `Meine Ca.-Einschätzung: ${sum ? `ca. ${eur(round10(sum))} €` : "nach Besichtigung"}.\n` +
    `Können Sie mir eine verbindliche Einschätzung geben?`
  );
}

/* ---------- UI-Bausteine ---------- */

function Snum({ children }: { children: string }) {
  return <span className="font-display text-xs uppercase tracking-[0.3em] text-accent">{children}</span>;
}
function StepTitle({ t, hint }: { t: string; hint: string }) {
  return (
    <>
      <h3 className="mt-2 font-display text-xl font-semibold">{t}</h3>
      <p className="mb-6 mt-1.5 text-sm leading-relaxed text-muted-foreground">{hint}</p>
    </>
  );
}
function OptCard({
  sel,
  onClick,
  title,
  desc,
  icon,
}: {
  sel: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`krv2-opt relative rounded-xl border p-4 text-left transition-all ${
        sel ? "krv2-sel border-accent bg-accent/[0.07]" : "border-border/50 bg-background/40 hover:border-accent/50"
      }`}
    >
      {icon && <span className={`mb-3 block text-accent ${sel ? "krv2-glow-icon" : ""}`}>{icon}</span>}
      <b className="block break-words text-sm font-semibold [hyphens:auto]">{title}</b>
      {desc && <small className="mt-1 block text-xs leading-snug text-muted-foreground">{desc}</small>}
      <span
        className={`absolute right-3 top-3 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-accent transition-opacity ${sel ? "opacity-100" : "opacity-0"}`}
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
    </button>
  );
}
function Chip({ sel, onClick, children }: { sel: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm transition-all ${
        sel ? "krv2-chip-sel border-accent bg-accent/[0.07] text-accent" : "border-border/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
const inputCls =
  "krv2-input w-full rounded-xl border border-border/50 bg-background/60 px-4 py-3.5 text-base outline-none transition-all focus:border-accent";

const Icons = {
  boden: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18M3 15h18M7 9v6M12 9v6M17 9v6M3 5h18v14H3z" />
    </svg>
  ),
  kueche: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h16M4 10v9h16v-9M4 10V5h16v5M9 14h2M8 5V3M16 5V3" />
    </svg>
  ),
  ent: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8l8-5 8 5-8 5-8-5zM4 8v8l8 5 8-5V8M12 13v8" />
    </svg>
  ),
  sonst: (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
};

/* ---------- Hauptkomponente ---------- */

export function KostenrechnerV2() {
  const [st, setSt] = useState<St>(initial);
  const [step, setStep] = useState(1);

  // Deep-Link von den Leistungsseiten: /preise?leistung=… wählt vor und springt zu Schritt 2
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search).get("leistung");
    const map: Record<string, Service> = {
      bodenverlegung: "boden",
      boden: "boden",
      laminat: "boden",
      vinyl: "boden",
      pvc: "boden",
      teppichboden: "boden",
      teppich: "boden",
      kuechenmontage: "kueche",
      kueche: "kueche",
      entruempelung: "ent",
      entsorgung: "ent",
      handwerkerservice: "sonst",
      sonstiges: "sonst",
    };
    const svc = p ? map[p] : undefined;
    if (svc) {
      setSt((prev) => ({ ...prev, svc }));
      setStep(2);
      trackEvent("preisrechner_view", { leistung_param: p ?? "" });
    } else {
      trackEvent("preisrechner_view", { leistung_param: "" });
    }
  }, []);
  const up = (patch: Partial<St>) => setSt((p) => ({ ...p, ...patch }));
  const toggle = (key: "adds" | "kadds", v: string) =>
    setSt((p) => {
      const n = new Set(p[key]);
      n.has(v) ? n.delete(v) : n.add(v);
      return { ...p, [key]: n };
    });

  const { items, sum, open } = useMemo(() => compute(st), [st]);
  const total = sum ? `ca. ${eur(round10(sum))} €${open ? " +" : ""}` : "nach Besichtigung";
  const message = buildMessage(st, items, sum);
  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
  const mailUrl = `mailto:${MAIL}?subject=${encodeURIComponent("Anfrage über den Kostenrechner")}&body=${encodeURIComponent(message)}`;

  const canNext2 =
    (st.svc === "boden" && !!st.belag && Number(st.qm) > 0) ||
    (st.svc === "kueche" && Number(st.klfm) > 0) ||
    (st.svc === "ent" && !!st.ent) ||
    (st.svc === "sonst" && !!st.sonst.trim());

  const goto = (n: number) => {
    setStep(n);
    if (n === 4) trackEvent("preisrechner_result", { selected_service: st.svc ?? "", total: round10(sum) });
    if (typeof window !== "undefined") {
      // Zum Rechner-Anfang scrollen (nicht zum Seitenanfang) – und nur, wenn nötig
      const el = document.getElementById("rechner");
      if (el) {
        const top = el.getBoundingClientRect().top;
        if (top < -8 || top > 140) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  const pickService = (v: Service) => {
    up({ svc: v });
    trackEvent("preisrechner_leistung_selected", { selected_service: v });
  };
  const pickBelag = (v: string) => {
    const guess = v.startsWith("teppich")
      ? v === "teppich_lose"
        ? "tep_l"
        : "tep_k"
      : v.endsWith("verklebt")
        ? "verklebt"
        : "schwimmend";
    up({ belag: v, altArt: guess as St["altArt"] });
  };

  return (
    <div id="rechner" className="mx-auto max-w-5xl scroll-mt-24">
      {/* Fortschritt */}
      <div className="mx-auto mb-10 flex max-w-xl items-start">
        {["Leistung", "Details", "Rahmen", "Voranschau"].map((l, i) => (
          <div key={l} className="krv2-pst relative flex-1 text-center">
            {i > 0 && (
              <span
                className={`absolute left-[-50%] right-1/2 top-[5px] h-px ${step > i ? "bg-accent" : "bg-border/60"}`}
              />
            )}
            <span
              className={`relative z-[1] mx-auto block h-[11px] w-[11px] rounded-full border transition-all ${
                step === i + 1 ? "krv2-dot-active border-accent" : step > i + 1 ? "border-accent bg-accent" : "border-muted-foreground/50 bg-background"
              }`}
            />
            <span className={`mt-3 block text-[10px] uppercase tracking-[0.24em] ${step === i + 1 ? "text-accent" : "text-muted-foreground"}`}>
              {l}
            </span>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[1fr_310px]">
        <div className="krv2-card rounded-3xl border border-accent/15 bg-gradient-to-b from-secondary/50 to-card/60 p-6 sm:p-9">
          {/* 01 */}
          {step === 1 && (
            <div className="krv2-in">
              <Snum>01 · Leistung</Snum>
              <StepTitle t="Womit dürfen wir helfen?" hint="Wählen Sie eine Karte – alle weiteren Fragen passen sich an." />
              <div className="krv2-grid">
                <OptCard sel={st.svc === "boden"} onClick={() => pickService("boden")} title="Bodenverlegung" desc="Laminat, Vinyl, PVC, Teppich" icon={Icons.boden} />
                <OptCard sel={st.svc === "kueche"} onClick={() => pickService("kueche")} title="Küchenmontage" desc="Aufbau, Umbau, Demontage" icon={Icons.kueche} />
                <OptCard sel={st.svc === "ent"} onClick={() => pickService("ent")} title="Entrümpelung" desc="Wohnung, Keller, Dachboden" icon={Icons.ent} />
                <OptCard sel={st.svc === "sonst"} onClick={() => pickService("sonst")} title="Sonstiges" desc="Kurz beschreiben, wir schauen drauf" icon={Icons.sonst} />
              </div>
              <div className="mt-8 flex justify-end">
                <button type="button" disabled={!st.svc} onClick={() => goto(2)} className="krv2-btn-gold">
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* 02 */}
          {step === 2 && st.svc === "boden" && (
            <div className="krv2-in">
              <Snum>02 · Details</Snum>
              <StepTitle t="Ihr neuer Boden" hint="Belag wählen, Fläche angeben – wir kalkulieren im Hintergrund mit unserer internen Preisbasis." />
              <div className="krv2-grid">
                {BODEN_VARIANTEN.map((b) => (
                  <OptCard key={b.key} sel={st.belag === b.key} onClick={() => pickBelag(b.key)} title={BELAG_LABELS[b.key] ?? b.label} desc={BELAG_DESC[b.key]} />
                ))}
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <Field label="Fläche in m²">
                  <input type="number" min={1} inputMode="decimal" placeholder="z. B. 45" className={inputCls} value={st.qm} onChange={(e) => up({ qm: e.target.value })} />
                </Field>
                <Field label="Räume (optional)">
                  <input type="number" min={1} inputMode="numeric" placeholder="z. B. 3" className={inputCls} value={st.raeume} onChange={(e) => up({ raeume: e.target.value })} />
                </Field>
              </div>
              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="mb-4 text-[10.5px] uppercase tracking-[0.26em] text-accent">Vorarbeiten &amp; Zubehör</h4>
                <div className="flex flex-wrap gap-2.5">
                  <Chip sel={st.adds.has("alt")} onClick={() => toggle("adds", "alt")}>Altbelag entfernen</Chip>
                  <Chip sel={st.adds.has("daemmung")} onClick={() => toggle("adds", "daemmung")}>Trittschalldämmung</Chip>
                  <Chip sel={st.adds.has("spachteln")} onClick={() => toggle("adds", "spachteln")}>Untergrund spachteln &amp; grundieren</Chip>
                  <Chip sel={st.adds.has("sockel")} onClick={() => toggle("adds", "sockel")}>Sockelleisten montieren</Chip>
                  <Chip sel={st.adds.has("material")} onClick={() => toggle("adds", "material")}>Material über uns beziehen</Chip>
                </div>
                {st.adds.has("alt") && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Alter Belag (der raus soll)">
                      <select className={inputCls} value={st.altArt} onChange={(e) => up({ altArt: e.target.value as St["altArt"] })}>
                        <option value="schwimmend">Lag schwimmend (Laminat, Klick-Vinyl)</option>
                        <option value="verklebt">War verklebt (Vinyl, PVC, Linoleum)</option>
                        <option value="tep_l">Teppich, lose verlegt</option>
                        <option value="tep_k">Teppich, verklebt</option>
                      </select>
                    </Field>
                  </div>
                )}
                {st.adds.has("sockel") && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Sockelleisten (lfm)">
                      <input type="number" min={1} inputMode="decimal" placeholder="z. B. 28" className={inputCls} value={st.lfm} onChange={(e) => up({ lfm: e.target.value })} />
                    </Field>
                    <Field label="Ausführung">
                      <select className={inputCls} value={st.sockelArt} onChange={(e) => up({ sockelArt: e.target.value as St["sockelArt"] })}>
                        <option value="normal">Standard-Montage</option>
                        <option value="gehrung">Auf Gehrung gesägt (Premium)</option>
                      </select>
                    </Field>
                  </div>
                )}
                {st.adds.has("material") && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label="Ungefährer Materialwert (€)">
                      <input type="number" min={1} inputMode="numeric" placeholder="z. B. 900" className={inputCls} value={st.matWert} onChange={(e) => up({ matWert: e.target.value })} />
                    </Field>
                  </div>
                )}
              </div>
              <Nav onBack={() => goto(1)} onNext={() => goto(3)} nextDisabled={!canNext2} />
            </div>
          )}

          {step === 2 && st.svc === "kueche" && (
            <div className="krv2-in">
              <Snum>02 · Details</Snum>
              <StepTitle t="Ihre Küche" hint="Gemessen wird die Küchenzeile in laufenden Metern – einmal an den Fronten entlang." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Küchenlänge (lfm)">
                  <input type="number" min={1} step={0.5} inputMode="decimal" placeholder="z. B. 4,5" className={inputCls} value={st.klfm} onChange={(e) => up({ klfm: e.target.value })} />
                </Field>
                <Field label="Küche vorhanden als">
                  <select className={inputCls} value={st.kart} onChange={(e) => up({ kart: e.target.value })}>
                    <option>Neue Küche (geliefert)</option>
                    <option>Küche aus Umzug</option>
                    <option>Gebrauchte Küche (gekauft)</option>
                  </select>
                </Field>
              </div>
              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="mb-4 text-[10.5px] uppercase tracking-[0.26em] text-accent">Zusatzleistungen</h4>
                <div className="flex flex-wrap gap-2.5">
                  <Chip sel={st.kadds.has("demontage")} onClick={() => toggle("kadds", "demontage")}>Alte Küche demontieren</Chip>
                  <Chip sel={st.kadds.has("entsorgung")} onClick={() => toggle("kadds", "entsorgung")}>Alte Küche entsorgen</Chip>
                  <Chip sel={st.kadds.has("platte")} onClick={() => toggle("kadds", "platte")}>Arbeitsplatte zuschneiden</Chip>
                  <Chip sel={st.kadds.has("spuele")} onClick={() => toggle("kadds", "spuele")}>Spüle &amp; Armatur montieren</Chip>
                  <Chip sel={st.kadds.has("geraete")} onClick={() => toggle("kadds", "geraete")}>Geräte einsetzen</Chip>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Elektro- und Wasseranschlüsse außerhalb des zulässigen Rahmens übernehmen Fachbetriebe – auf Wunsch koordiniert über unser Partnernetzwerk.
                </p>
              </div>
              <Nav onBack={() => goto(1)} onNext={() => goto(3)} nextDisabled={!canNext2} />
            </div>
          )}

          {step === 2 && st.svc === "ent" && (
            <div className="krv2-in">
              <Snum>02 · Details</Snum>
              <StepTitle t="Ihre Entrümpelung" hint="Für ein seriöses Angebot schauen wir vor Ort – dafür ist es danach verbindlich, kein Schätzwert." />
              <div className="krv2-grid krv2-grid-sm">
                {["Wohnung", "Haus", "Keller", "Dachboden", "Garage"].map((o) => (
                  <OptCard key={o} sel={st.ent === o} onClick={() => up({ ent: o })} title={o} />
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Füllgrad">
                  <select className={inputCls} value={st.entMenge} onChange={(e) => up({ entMenge: e.target.value })}>
                    <option>Wenig (bis knietief)</option>
                    <option>Normal möbliert</option>
                    <option>Stark gefüllt</option>
                    <option>Messie-Zustand</option>
                  </select>
                </Field>
                <Field label="Etage / Zugang">
                  <select className={inputCls} value={st.entEtage} onChange={(e) => up({ entEtage: e.target.value })}>
                    <option>Erdgeschoss</option>
                    <option>Mit Aufzug</option>
                    <option>1.–2. OG ohne Aufzug</option>
                    <option>3. OG+ ohne Aufzug</option>
                  </select>
                </Field>
              </div>
              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="mb-2 text-[10.5px] uppercase tracking-[0.26em] text-accent">Ihr Weg zum Festpreis</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Vor-Ort-Besichtigung für pauschal <b className="text-accent">39&nbsp;€</b> – wird bei Auftragserteilung <b>vollständig verrechnet</b>. Sie erhalten ein verbindliches Angebot statt einer Schätzung.
                </p>
              </div>
              <Nav onBack={() => goto(1)} onNext={() => goto(3)} nextDisabled={!canNext2} />
            </div>
          )}

          {step === 2 && st.svc === "sonst" && (
            <div className="krv2-in">
              <Snum>02 · Details</Snum>
              <StepTitle t="Ihr Projekt in Ihren Worten" hint="Zwei, drei Sätze genügen – was soll gemacht werden, wie groß ist es ungefähr?" />
              <Field label="Projektbeschreibung">
                <textarea
                  className={`${inputCls} min-h-[120px] resize-y`}
                  placeholder="z. B. Treppenstufen mit Vinyl bekleben, 14 Stufen …"
                  value={st.sonst}
                  onChange={(e) => up({ sonst: e.target.value })}
                />
              </Field>
              <Nav onBack={() => goto(1)} onNext={() => goto(3)} nextDisabled={!canNext2} />
            </div>
          )}

          {/* 03 */}
          {step === 3 && (
            <div className="krv2-in">
              <Snum>03 · Rahmen</Snum>
              <StepTitle t="Ort & Zeitplan" hint="Damit die Einschätzung realistisch wird – und wir wissen, wie eilig es ist." />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Postleitzahl / Ort">
                  <input type="text" placeholder="z. B. 26386 Wilhelmshaven" className={inputCls} value={st.ort} onChange={(e) => up({ ort: e.target.value })} />
                </Field>
                <Field label="Entfernung von Wilhelmshaven (km)">
                  <input type="number" min={0} inputMode="numeric" placeholder={`bis ${ANFAHRT_FREI_KM} km ohne Anfahrtskosten`} className={inputCls} value={st.km} onChange={(e) => up({ km: e.target.value })} />
                </Field>
              </div>
              <div className="mt-8 border-t border-border/50 pt-6">
                <h4 className="mb-4 text-[10.5px] uppercase tracking-[0.26em] text-accent">Zeitrahmen</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {TIMING.map((t) => (
                    <OptCard key={t.key} sel={st.timing === t.key} onClick={() => up({ timing: t.key })} title={t.label} desc={t.desc} />
                  ))}
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Wunschtermin (optional)">
                    <input type="date" className={inputCls} value={st.wunsch} onChange={(e) => up({ wunsch: e.target.value })} />
                  </Field>
                </div>
              </div>
              <Nav onBack={() => goto(2)} onNext={() => goto(4)} nextLabel="Zur Voranschau" />
            </div>
          )}

          {/* 04 */}
          {step === 4 && (
            <div className="krv2-in">
              <Snum>04 · Voranschau</Snum>
              <StepTitle t="Ihre Kosten-Voranschau" hint="Auf Basis Ihrer Angaben, kalkuliert mit unserer internen Preisbasis. Verbindlich wird es nach Fotos oder Aufmaß." />
              <div className="overflow-hidden rounded-2xl border border-accent/15 bg-background/40">
                <div className="h-0.5 bg-gradient-to-r from-accent to-transparent" />
                <div className="border-b border-border/50 px-6 py-5">
                  <p className="font-display text-[15px] font-semibold uppercase tracking-[0.22em]">
                    Verlegt <span className="text-accent">&amp;</span> Verschraubt
                  </p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Handwerkerservice · Wilhelmshaven · Kosten-Voranschau</p>
                </div>
                <div className="px-6">
                  {items.map((i, n) => (
                    <div key={n} className={`flex justify-between gap-4 py-4 text-[14.5px] ${n < items.length - 1 ? "border-b border-border/40" : ""}`}>
                      <div>
                        {i.label}
                        {i.detail && <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{i.detail}</div>}
                      </div>
                      <div className="whitespace-nowrap pt-0.5 text-[10.5px] uppercase tracking-[0.16em] text-accent">{i.open ? "nach Besichtigung" : "enthalten"}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline justify-between border-t border-accent/15 bg-accent/[0.05] px-6 py-4">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Ihre Ca.-Einschätzung</span>
                  <b className="font-display text-2xl text-accent tabular-nums">{total}</b>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Die Ca.-Angabe basiert auf Ihren Angaben und unserer internen Kalkulation. Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen. Material ist nicht enthalten, sofern nicht als Position aufgeführt. Verbindliche Preise nach Foto-Einschätzung oder Aufmaß vor Ort.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click_preisrechner", { selected_service: st.svc ?? "", total: round10(sum) })}
                  className="krv2-cta flex-1 bg-[#25D366] text-white"
                >
                  Per WhatsApp anfragen
                </a>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("booking_click_preisrechner", { selected_service: st.svc ?? "" })}
                  className="krv2-cta flex-1 bg-accent text-accent-foreground"
                >
                  Besichtigung buchen
                </a>
                <a href={mailUrl} className="krv2-cta flex-1 border border-border/60 text-foreground">
                  Per E-Mail senden
                </a>
                <a href={`tel:+${PHONE_NUMBER}`} className="krv2-cta flex-1 border border-border/60 text-foreground">
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6">
                <button type="button" onClick={() => goto(3)} className="krv2-btn-ghost">
                  Angaben ändern
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live-Panel */}
        <aside className="lg:sticky lg:top-24">
          <div className="krv2-sum rounded-2xl border border-accent/15 bg-gradient-to-br from-secondary/60 to-card/50 p-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Ihre Einschätzung · live</span>
            <div className="mt-3 font-display text-4xl font-semibold tabular-nums leading-none">
              <span className="align-super text-[0.42em] font-normal tracking-[0.1em] text-muted-foreground">CA. </span>
              {sum ? eur(round10(sum)) : "–"}
              <span className="text-[0.55em] text-accent"> €</span>
            </div>
            <div className="my-4 h-px bg-gradient-to-r from-accent/60 to-transparent" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {items.length
                ? open && !sum
                  ? "Preis nach Besichtigung – Positionen unten."
                  : "Interne Kalkulation · Material nicht enthalten."
                : "Wählen Sie eine Leistung, um zu starten."}
            </p>
            <div className="mt-4 flex flex-col gap-2.5 text-[13px] text-muted-foreground">
              {items.map((i, n) => (
                <div key={n} className="flex items-baseline gap-2.5">
                  <span className="relative -top-0.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {i.label}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Weiter",
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-3">
      <button type="button" onClick={onBack} className="krv2-btn-ghost">
        Zurück
      </button>
      <button type="button" onClick={onNext} disabled={nextDisabled} className="krv2-btn-gold">
        {nextLabel}
      </button>
    </div>
  );
}
