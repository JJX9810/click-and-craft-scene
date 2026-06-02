import { useEffect, useMemo, useRef, useState } from "react";
import {
  Layers,
  Wrench,
  Trash2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Copy,
  Phone,
  Check,
  Camera,
  MapPin,
  Clock,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import { buildAttributionLines } from "@/lib/attribution";
import { trackEvent } from "@/lib/tracking";
import { upsertCalcSession, submitCalculation } from "@/lib/admin-tracking";

// Mapping URL-Parameter `?leistung=...` → interne Service-Keys
const LEISTUNG_PARAM_MAP: Record<string, Service> = {
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

type Service = "boden" | "kueche" | "ent" | "sonst";

// Boden-Preise: feste €/m² pro Variante. null = auf Anfrage.
const BODEN_VARIANTEN: { key: string; label: string; price: number | null }[] = [
  { key: "laminat_schwimmend", label: "Laminat schwimmend", price: 16 },
  { key: "pvc_schwimmend", label: "PVC schwimmend", price: 12 },
  { key: "pvc_verklebt", label: "PVC verklebt", price: 15 },
  { key: "vinyl_schwimmend", label: "Vinyl schwimmend", price: 18 },
  { key: "vinyl_verklebt", label: "Vinyl verklebt", price: 22 },
  { key: "linoleum_verklebt", label: "Linoleum verklebt", price: null },
  { key: "teppich_lose", label: "Teppich lose verlegt / lose verklebt", price: 10 },
  { key: "teppich_vollflaechig", label: "Teppich vollflächig verklebt", price: 12 },
];

// === Interne Berechnungswerte – NICHT im Frontend sichtbar rendern ===
const ALT_PRICE_SCHWIMMEND = 4; // €/m²
const ALT_PRICE_VERKLEBT = 7; // €/m² – verklebter Altbelag (Boden, nicht Teppich)
const SOCKEL_PRICE = 5; // €/lfm – normale Montage
const SOCKEL_GEHRUNG_PRICE = 7; // €/lfm – auf Gehrung gesägt
const DAEMMUNG_PRICE = 1.5; // €/m²
const SPACHTELN_PRICE = 19; // €/m² – inkl. Grundierung

const ALT_TEPPICH_LOSE_PRICE = 7; // €/m²
const ALT_TEPPICH_LOSE_MIN = 120; // €
const ALT_TEPPICH_VERKLEBT_PRICE = 12; // €/m²
const ALT_TEPPICH_VERKLEBT_MIN = 180; // €
const MATERIALSERVICE_RATE = 0.15;
const MATERIALSERVICE_MIN = 150; // €
const ANFAHRT_FREI_KM = 30;
const ANFAHRT_PRO_KM = 0.7;

// Küchenmontage (interne Preise)
const KUECHE_MONTAGE_PRICE = 189; // €/lfm
const KUECHE_DEMONTAGE_PRICE = 100; // €/lfm
const KUECHE_ARBEITSPLATTE_PRICE = 119; // €/lfm
const KUECHE_ENTSORGUNG_PAUSCHAL = 350; // €


const DRINGLICHKEIT_OPTIONS = [
  { key: "flexibel", label: "Flexibel / normal planbar", surcharge: 0 },
  { key: "14tage", label: "Innerhalb von 14 Tagen", surcharge: 0.1 },
  { key: "7tage", label: "Innerhalb von 7 Tagen", surcharge: 0.2 },
  { key: "3tage", label: "Innerhalb von 3 Tagen / sehr kurzfristig", surcharge: 0.2 },
];

type State = {
  service: Service | null;
  // gemeinsam
  name: string;
  telefon: string;
  ort: string;
  nachricht: string;
  // anfahrt
  anfahrtKm: string;
  // termin
  dringlichkeit: string;
  wunschDatum: string;
  wunschZeitraum: string;
  fertigDatum: string;
  terminHinweise: string;
  // boden
  bodenartKey: string;
  qm: string;
  altEntfernen:
    | ""
    | "Nein"
    | "schwimmend"
    | "verklebt"
    | "teppich_lose"
    | "teppich_verklebt"
    | "teppich_stark";
  sockelLfm: string;
  sockelArt: "" | "keine" | "normal" | "gehrung";
  daemmung: "Ja" | "Nein" | "";
  spachteln: "Ja" | "Nein" | "";
  
  materialService: "Ja" | "Nein" | "";
  materialWert: string;
  // küche
  kueArt: string;
  kueMeter: string;
  kueArbeit: "Ja" | "Nein" | "Unsicher" | "";
  kueGeraete: "Ja" | "Nein" | "Unsicher" | "";
  kueSpuele: "Ja" | "Nein" | "Unsicher" | "";
  kueDemontage: "Ja" | "Nein" | "";
  kueTransport: "Ja" | "Nein" | "";
  // ent
  entObjekt: string;
  entMenge: "" | "klein" | "mittel" | "groß" | "sehr groß";
  entEtage: string;
  entAufzug: "Ja" | "Nein" | "";
  entEntsorgen: "Ja" | "Nein" | "";
  // sonst
  sonstText: string;
};

const initial: State = {
  service: null,
  name: "",
  telefon: "",
  ort: "",
  nachricht: "",
  anfahrtKm: "",
  dringlichkeit: "",
  wunschDatum: "",
  wunschZeitraum: "",
  fertigDatum: "",
  terminHinweise: "",
  bodenartKey: "vinyl_schwimmend",
  qm: "",
  altEntfernen: "",
  sockelLfm: "",
  sockelArt: "",
  daemmung: "",
  spachteln: "",
  
  materialService: "",
  materialWert: "",
  kueArt: "Neue Küche",
  kueMeter: "",
  kueArbeit: "",
  kueGeraete: "",
  kueSpuele: "",
  kueDemontage: "",
  kueTransport: "",
  entObjekt: "Wohnung",
  entMenge: "",
  entEtage: "",
  entAufzug: "",
  entEntsorgen: "",
  sonstText: "",
};

const PHONE_NUMBER = "491634799286";
const PHONE_DISPLAY = "0163 4799286";
const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.app.google/MbCnvoSqYjuLSAfY9";

const services: { key: Service; label: string; desc: string; icon: any }[] = [
  { key: "boden", label: "Bodenverlegung", desc: "Laminat, Vinyl, PVC, Teppich, Linoleum", icon: Layers },
  { key: "kueche", label: "Küchenmontage", desc: "Aufbau, Restmontage, Umbau, Demontage", icon: Wrench },
  { key: "ent", label: "Entrümpelung & Entsorgung", desc: "Wohnung, Keller, Dachboden, Garage", icon: Trash2 },
  { key: "sonst", label: "Sonstiges Projekt", desc: "Beschreiben Sie kurz Ihr Anliegen", icon: Sparkles },
];

function eur(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

type LineItem = {
  label: string;
  detail?: string;
  amount: number | null; // null = auf Anfrage
  inklusive?: boolean;
  arbeitsleistung?: boolean; // wird vom Express-Zuschlag erfasst
};

type Breakdown = {
  items: LineItem[];
  anfahrt: LineItem | null;
  express: LineItem | null;
  total: number; // Summe berechenbarer Positionen inkl. Express + Anfahrt
  hasOnRequest: boolean;
};

function computeAnfahrt(km: number): LineItem {
  if (km <= ANFAHRT_FREI_KM) {
    return { label: "Anfahrt", detail: `${km} km – im Einsatzgebiet inklusive`, amount: 0, inklusive: true };
  }
  const extra = km - ANFAHRT_FREI_KM;
  const amount = +(extra * ANFAHRT_PRO_KM).toFixed(2);
  return {
    label: "Anfahrt",
    detail: `${km} km Entfernung – Mehrkilometer werden anteilig berücksichtigt`,
    amount,
  };
}

function computeBreakdown(s: State): Breakdown | null {
  const items: LineItem[] = [];
  let arbeitssumme = 0;
  let sonstSumme = 0;
  let hasOnRequest = false;

  if (s.service === "boden") {
    const variante = BODEN_VARIANTEN.find((b) => b.key === s.bodenartKey);
    const qm = Number(s.qm);
    if (!variante || !qm || qm <= 0) return null;

    if (variante.price === null) {
      items.push({
        label: `${variante.label} verlegen`,
        detail: `${qm} m² – Preis nach Besichtigung / auf Anfrage`,
        amount: null,
      });
      hasOnRequest = true;
    } else {
      const a = +(qm * variante.price).toFixed(2);
      items.push({
        label: `${variante.label} verlegen`,
        detail: `${qm} m²`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    }

    items.push({ label: "Baustelleneinrichtung", amount: 0, inklusive: true });

    if (s.altEntfernen === "schwimmend") {
      const a = +(qm * ALT_PRICE_SCHWIMMEND).toFixed(2);
      items.push({
        label: "Alten schwimmend verlegten Boden entfernen",
        detail: `${qm} m²`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    } else if (s.altEntfernen === "verklebt") {
      const a = +(qm * ALT_PRICE_VERKLEBT).toFixed(2);
      items.push({
        label: "Verklebten Altbelag entfernen",
        detail: `${qm} m²`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    } else if (s.altEntfernen === "teppich_lose") {
      const raw = +(qm * ALT_TEPPICH_LOSE_PRICE).toFixed(2);
      const a = Math.max(raw, ALT_TEPPICH_LOSE_MIN);
      items.push({
        label: "Altbelag entfernen & entsorgen – Teppich lose / nicht verklebt",
        detail: `${qm} m² – inklusive Aufnahme, Tragen, Laden, Transport und Entsorgung`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    } else if (s.altEntfernen === "teppich_verklebt") {
      const raw = +(qm * ALT_TEPPICH_VERKLEBT_PRICE).toFixed(2);
      const a = Math.max(raw, ALT_TEPPICH_VERKLEBT_MIN);
      items.push({
        label: "Altbelag entfernen & entsorgen – Teppich verklebt",
        detail: `${qm} m² – inklusive Aufnahme, Tragen, Laden, Transport und Entsorgung. Zusätzliche Untergrundarbeiten sind nicht enthalten.`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    } else if (s.altEntfernen === "teppich_stark") {
      items.push({
        label: "Stark verklebter Altbelag / Schaumrücken / Klebereste – nur nach Besichtigung",
        detail: "Bei stark verklebtem Teppich, Schaumrückenresten oder Kleberückständen können zusätzliche Schleif-, Spachtel- oder Untergrundarbeiten erforderlich sein. Diese werden erst nach Sichtprüfung kalkuliert.",
        amount: null,
      });
      hasOnRequest = true;
    }

    items.push({ label: "Alten Boden entsorgen", amount: 0, inklusive: true });
    items.push({ label: "Trittschalldämmung verlegen", amount: 0, inklusive: true });

    if (s.daemmung === "Ja") {
      const a = +(qm * DAEMMUNG_PRICE).toFixed(2);
      items.push({
        label: "Dämmung verlegen",
        detail: `${qm} m²`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    }

    if (s.spachteln === "Ja") {
      const a = +(qm * SPACHTELN_PRICE).toFixed(2);
      items.push({
        label: "Spachteln inkl. Grundierung",
        detail: `${qm} m²`,
        amount: a,
        arbeitsleistung: true,
      });
      arbeitssumme += a;
    }


    const lfm = Number(s.sockelLfm);
    if (lfm > 0 && s.sockelArt && s.sockelArt !== "keine") {
      if (s.sockelArt === "gehrung") {
        const a = +(lfm * SOCKEL_GEHRUNG_PRICE).toFixed(2);
        items.push({
          label: "Sockelleisten auf Gehrung montieren",
          detail: `${lfm} lfm`,
          amount: a,
          arbeitsleistung: true,
        });
        arbeitssumme += a;
      } else if (s.sockelArt === "normal") {
        const a = +(lfm * SOCKEL_PRICE).toFixed(2);
        items.push({
          label: "Sockelleisten montieren (ohne Acrylfuge)",
          detail: `${lfm} lfm`,
          amount: a,
          arbeitsleistung: true,
        });
        arbeitssumme += a;
      }
    }

    if (s.materialService === "Ja") {
      const wert = Number(s.materialWert);
      if (!isNaN(wert) && wert > 0) {
        const raw = +(wert * MATERIALSERVICE_RATE).toFixed(2);
        const a = Math.max(raw, MATERIALSERVICE_MIN);
        items.push({
          label: "Materialservice – Auswahl, Beschaffung und Anlieferung",
          amount: a,
        });
        sonstSumme += a;
      } else {
        items.push({
          label: "Materialservice – Auswahl, Beschaffung und Anlieferung",
          detail: "Bitte Materialwert eintragen, damit der Materialservice berücksichtigt werden kann.",
          amount: null,
        });
        hasOnRequest = true;
      }
    }
  } else if (s.service === "kueche") {
    const m = Number(s.kueMeter);
    if (!m || m <= 0) return null;

    // Hauptleistung anhand Projektart
    if (s.kueArt === "Küchenabbau") {
      const a = +(m * KUECHE_DEMONTAGE_PRICE).toFixed(2);
      items.push({ label: "Küchen-Demontage", detail: `${m} lfm`, amount: a, arbeitsleistung: true });
      arbeitssumme += a;
    } else {
      // Neue Küche, Gebrauchte Küche, Küchenumbau → Montage
      const a = +(m * KUECHE_MONTAGE_PRICE).toFixed(2);
      items.push({ label: "Küchenmontage", detail: `${m} lfm`, amount: a, arbeitsleistung: true });
      arbeitssumme += a;
    }

    // Zusätzliche Demontage einer alten Küche
    if (s.kueDemontage === "Ja" && s.kueArt !== "Küchenabbau") {
      const a = +(m * KUECHE_DEMONTAGE_PRICE).toFixed(2);
      items.push({ label: "Demontage alter Küche", detail: `${m} lfm`, amount: a, arbeitsleistung: true });
      arbeitssumme += a;
    }

    // Alte Küche entsorgen (wenn Transport "Ja" → Pauschale für Entsorgung)
    if (s.kueTransport === "Ja") {
      items.push({ label: "Alte Küche entsorgen", amount: KUECHE_ENTSORGUNG_PAUSCHAL });
      sonstSumme += KUECHE_ENTSORGUNG_PAUSCHAL;
    }

    // Geräte / Spüle / Arbeitsplatte – falls "Unsicher" → Hinweis auf Besichtigung
    if (s.kueArbeit === "Unsicher" || s.kueGeraete === "Unsicher" || s.kueSpuele === "Unsicher") {
      items.push({
        label: "Zusatzleistungen (Geräte, Spüle, Arbeitsplatte)",
        detail: "Genauer Umfang wird nach Besichtigung festgelegt.",
        amount: null,
      });
      hasOnRequest = true;
    }
  } else if (s.service === "ent") {
    if (!s.entMenge) return null;
    items.push({
      label: "Entrümpelung & Entsorgung",
      detail: `${s.entObjekt}, Menge: ${s.entMenge} – Preis nach Besichtigung / Foto-Einschätzung`,
      amount: null,
    });
    hasOnRequest = true;
  } else if (s.service === "sonst") {
    if (!s.sonstText.trim()) return null;
    items.push({
      label: "Individuelles Projekt",
      detail: "Preis nach Besichtigung / Rücksprache",
      amount: null,
    });
    hasOnRequest = true;
  } else {
    return null;
  }

  // Anfahrt
  let anfahrt: LineItem | null = null;
  const kmStr = s.anfahrtKm.trim();
  if (kmStr !== "") {
    const km = Number(kmStr);
    if (!isNaN(km) && km >= 0) {
      anfahrt = computeAnfahrt(km);
      if (anfahrt.amount && !anfahrt.inklusive) sonstSumme += anfahrt.amount;
    }
  } else {
    anfahrt = { label: "Anfahrt", detail: "wird nach Einsatzort geprüft", amount: null };
  }

  // Express-Zuschlag (auf Arbeitsleistung)
  let express: LineItem | null = null;
  if (s.dringlichkeit) {
    const d = DRINGLICHKEIT_OPTIONS.find((o) => o.key === s.dringlichkeit);
    if (d) {
      if (d.surcharge > 0 && arbeitssumme > 0) {
        const a = +(arbeitssumme * d.surcharge).toFixed(2);
        express = {
          label: "Expresszuschlag",
          detail: `${d.label} – wird auf die Arbeitsleistung angewendet`,
          amount: a,
        };
        sonstSumme += a;
      } else if (d.surcharge === 0) {
        express = {
          label: "Termin",
          detail: "flexibel / normal planbar – kein Expresszuschlag",
          amount: 0,
          inklusive: true,
        };
      }
    }
  }

  const total = +(arbeitssumme + sonstSumme).toFixed(2);
  return { items, anfahrt, express, total, hasOnRequest };
}

function altSockelLabel(v: State["sockelArt"]): string {
  switch (v) {
    case "keine": return "keine Sockelleisten";
    case "normal": return "normale Montage";
    case "gehrung": return "auf Gehrung gesägt";
    default: return "";
  }
}

function altEntfernenLabel(v: State["altEntfernen"]): string {
  switch (v) {
    case "Nein": return "nein";
    case "schwimmend": return "schwimmend verlegter Boden";
    case "verklebt": return "verklebter Boden (nach Besichtigung)";
    case "teppich_lose": return "Teppich lose / nicht verklebt";
    case "teppich_verklebt": return "Teppich verklebt";
    case "teppich_stark": return "stark verklebt / Schaumrücken / Klebereste (nur nach Besichtigung)";
    default: return "";
  }
}

function summaryLines(s: State): string[] {
  const lines: string[] = [];
  const serviceLabel =
    s.service === "boden"
      ? "Bodenverlegung"
      : s.service === "kueche"
        ? "Küchenmontage"
        : s.service === "ent"
          ? "Entrümpelung & Entsorgung"
          : s.service === "sonst"
            ? "Sonstiges Projekt"
            : "";
  if (serviceLabel) lines.push(`Gewählte Leistung: ${serviceLabel}`);

  if (s.service === "boden") {
    const v = BODEN_VARIANTEN.find((x) => x.key === s.bodenartKey);
    if (v) lines.push(`Bodenart: ${v.label}`);
    if (s.qm) lines.push(`Fläche: ${s.qm} m²`);
    if (s.sockelLfm && Number(s.sockelLfm) > 0) lines.push(`Sockelleisten: ${s.sockelLfm} lfm`);
    if (s.sockelArt) lines.push(`Sockelleisten-Ausführung: ${altSockelLabel(s.sockelArt)}`);
    if (s.altEntfernen) lines.push(`Altbelag entfernen & entsorgen: ${altEntfernenLabel(s.altEntfernen)}`);
    if (s.daemmung === "Ja") lines.push("Dämmung verlegen: ja");
    if (s.spachteln === "Ja") lines.push("Spachteln inkl. Grundierung: ja");
    if (s.materialService === "Ja") {
      lines.push(`Materialservice: ja${s.materialWert ? ` (Materialwert ca. ${s.materialWert} €)` : ""}`);
    }
  } else if (s.service === "kueche") {
    if (s.kueArt) lines.push(`Projektart: ${s.kueArt}`);
    if (s.kueMeter) lines.push(`Küchenlänge: ${s.kueMeter} m`);
  } else if (s.service === "ent") {
    if (s.entObjekt) lines.push(`Objekt: ${s.entObjekt}`);
    if (s.entMenge) lines.push(`Menge: ${s.entMenge}`);
    if (s.entEtage) lines.push(`Etage: ${s.entEtage}`);
  } else if (s.service === "sonst") {
    if (s.sonstText.trim()) lines.push(`Beschreibung: ${s.sonstText.trim()}`);
  }

  if (s.ort.trim()) lines.push(`Einsatzort: ${s.ort.trim()}`);
  if (s.anfahrtKm.trim()) {
    lines.push(`Anfahrt: wird je nach Einsatzort berücksichtigt (${s.anfahrtKm} km angegeben)`);
  } else {
    lines.push("Anfahrt: wird nach Einsatzort berücksichtigt");
  }

  if (s.wunschDatum || s.wunschZeitraum) {
    const t = [s.wunschDatum, s.wunschZeitraum].filter(Boolean).join(", ");
    lines.push(`Terminwunsch: ${t}`);
  }
  if (s.fertigDatum) lines.push(`Fertigstellung gewünscht bis: ${s.fertigDatum}`);
  if (s.dringlichkeit) {
    const d = DRINGLICHKEIT_OPTIONS.find((o) => o.key === s.dringlichkeit);
    if (d) lines.push(`Dringlichkeit: ${d.label}`);
  }
  return lines;
}

function buildWaMessage(s: State, b: Breakdown | null): string {
  const lines: string[] = [];
  lines.push("Hallo Verlegt & Verschraubt,");
  lines.push("");
  lines.push("ich möchte eine unverbindliche Anfrage stellen.");
  lines.push("");
  if (s.name.trim()) lines.push(`Name: ${s.name.trim()}`);
  if (s.telefon.trim()) lines.push(`Telefon: ${s.telefon.trim()}`);
  if (s.ort.trim()) lines.push(`Ort / Einsatzadresse: ${s.ort.trim()}`);

  const serviceLabel =
    s.service === "boden"
      ? "Bodenverlegung"
      : s.service === "kueche"
        ? "Küchenmontage"
        : s.service === "ent"
          ? "Entrümpelung & Entsorgung"
          : "Sonstiges Projekt";
  lines.push(`Leistung: ${serviceLabel}`);

  if (s.service === "boden") {
    const v = BODEN_VARIANTEN.find((x) => x.key === s.bodenartKey);
    if (v) lines.push(`Bodenart: ${v.label}`);
    if (s.qm) lines.push(`Fläche: ${s.qm} m²`);
    if (s.sockelLfm && Number(s.sockelLfm) > 0) lines.push(`Sockelleisten: ${s.sockelLfm} lfm`);
    if (s.sockelArt) lines.push(`Sockelleisten-Ausführung: ${altSockelLabel(s.sockelArt)}`);
    if (s.altEntfernen) lines.push(`Altbelag entfernen & entsorgen: ${altEntfernenLabel(s.altEntfernen)}`);
    if (s.daemmung === "Ja") lines.push(`Dämmung verlegen: ja`);
    if (s.spachteln === "Ja") lines.push(`Spachteln inkl. Grundierung: ja`);
    if (s.materialService === "Ja") {
      lines.push(`Materialservice: ja${s.materialWert ? ` (Materialwert ca. ${s.materialWert} €)` : ""}`);
    }
  } else if (s.service === "kueche") {
    if (s.kueArt) lines.push(`Projektart: ${s.kueArt}`);
    if (s.kueMeter) lines.push(`Küchenlänge: ${s.kueMeter} m`);
  } else if (s.service === "ent") {
    if (s.entObjekt) lines.push(`Objekt: ${s.entObjekt}`);
    if (s.entMenge) lines.push(`Menge: ${s.entMenge}`);
    if (s.entEtage) lines.push(`Etage: ${s.entEtage}`);
  } else if (s.service === "sonst") {
    if (s.sonstText.trim()) lines.push(`Beschreibung: ${s.sonstText.trim()}`);
  }

  if (s.anfahrtKm.trim()) lines.push(`Entfernung: ${s.anfahrtKm} km`);

  lines.push("");
  lines.push("Wunschtermin:");
  if (s.wunschDatum) lines.push(`- Wunschdatum: ${s.wunschDatum}`);
  if (s.wunschZeitraum) lines.push(`- Wunschzeitraum: ${s.wunschZeitraum}`);
  if (s.fertigDatum) lines.push(`- Fertigstellung gewünscht bis: ${s.fertigDatum}`);
  if (s.dringlichkeit) {
    const d = DRINGLICHKEIT_OPTIONS.find((o) => o.key === s.dringlichkeit);
    if (d) lines.push(`- Dringlichkeit: ${d.label}`);
  }
  if (s.terminHinweise.trim()) lines.push(`- Hinweise: ${s.terminHinweise.trim()}`);
  lines.push("- Terminstatus: unverbindliche Anfrage, Bestätigung nach Prüfung");

  if (s.nachricht.trim()) {
    lines.push("");
    lines.push("Zusätzliche Nachricht:");
    lines.push(s.nachricht.trim());
  }

  if (b && b.total > 0) {
    lines.push("");
    lines.push(`Geschätzte Gesamtkosten laut Rechner: ca. ${eur(b.total)}`);
  }

  lines.push("");
  lines.push("Die Berechnung ist eine unverbindliche Ersteinschätzung. Der endgültige Preis wird nach Prüfung bestätigt.");

  // Attribution / Quelle anhängen
  const attrLines = buildAttributionLines();
  if (attrLines.length > 0) {
    lines.push("");
    lines.push(...attrLines);
  }

  lines.push("");
  lines.push("Viele Grüße");
  return lines.join("\n");
}


export function Kostenrechner() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s, set] = useState<State>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const viewTracked = useRef(false);
  const stepTracked = useRef<Set<number>>(new Set());

  const upd = <K extends keyof State>(k: K, v: State[K]) => set((p) => ({ ...p, [k]: v }));
  const breakdown = useMemo(() => computeBreakdown(s), [s]);

  // Leistung über URL-Parameter vorauswählen + view-Event
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!viewTracked.current) {
      viewTracked.current = true;
      const params = new URLSearchParams(window.location.search);
      const leistung = params.get("leistung");
      if (leistung) {
        const mapped = LEISTUNG_PARAM_MAP[leistung.toLowerCase()];
        if (mapped) {
          set((p) => (p.service ? p : { ...p, service: mapped }));
        }
      }
      trackEvent("preisrechner_view", { leistung_param: leistung ?? "" });
    }
  }, []);

  // Step-Tracking
  useEffect(() => {
    if (stepTracked.current.has(step)) return;
    stepTracked.current.add(step);
    const stepNames: Record<number, string> = { 1: "leistung", 2: "details", 3: "ergebnis" };
    trackEvent("preisrechner_step", {
      step_number: step,
      step_name: stepNames[step] ?? String(step),
      selected_service: s.service ?? "",
    });
    if (step === 3) {
      trackEvent("preisrechner_result", {
        selected_service: s.service ?? "",
        total: breakdown?.total ?? 0,
        has_on_request: breakdown?.hasOnRequest ?? false,
      });
    }
  }, [step, s.service, breakdown]);

  // Live-Tracking für Admin-Bereich: debounced Upsert bei jeder Änderung
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!s.service) return;
    const t = window.setTimeout(() => {
      void upsertCalcSession(s as any, breakdown?.total ?? null);
    }, 600);
    return () => window.clearTimeout(t);
  }, [s, breakdown]);

  // Abschluss-Erfassung bei Erreichen von Schritt 3 (Ergebnis)
  const submittedRef = useRef(false);
  useEffect(() => {
    if (step === 3 && !submittedRef.current && s.service) {
      submittedRef.current = true;
      void submitCalculation(s as any, breakdown?.total ?? null);
    }
  }, [step, s, breakdown]);


  // Leistungs-Auswahl tracken
  useEffect(() => {
    if (!s.service) return;
    trackEvent("preisrechner_leistung_selected", { selected_service: s.service });
  }, [s.service]);

  const validate = (): string[] => {
    const e: string[] = [];
    if (!s.service) e.push("Bitte eine Leistung auswählen.");
    if (!s.ort.trim()) e.push("Bitte Ort oder PLZ angeben.");
    if (s.service === "boden" && (!s.qm || Number(s.qm) <= 0)) e.push("Bitte Fläche in m² angeben.");
    if (s.service === "kueche" && (!s.kueMeter || Number(s.kueMeter) <= 0)) e.push("Bitte Küchenlänge in Metern angeben.");
    if (s.service === "ent" && !s.entMenge) e.push("Bitte geschätzte Menge auswählen.");
    if (s.service === "sonst" && !s.sonstText.trim()) e.push("Bitte Projektbeschreibung angeben.");
    return e;
  };

  const goResult = () => {
    const e = validate();
    setErrors(e);
    if (e.length === 0) setStep(3);
  };

  const message = useMemo(() => buildWaMessage(s, breakdown), [s, breakdown]);
  const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click_preisrechner", {
      selected_service: s.service ?? "",
      total: breakdown?.total ?? 0,
    });
  };

  const handlePhoneClick = () => {
    trackEvent("phone_click", {
      origin: "preisrechner",
      selected_service: s.service ?? "",
    });
  };

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Nachricht kopiert");
    } catch {
      toast.error("Kopieren nicht möglich");
    }
  };

  return (
    <div className="rounded-3xl border border-border/70 bg-card/60 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
      <Stepper step={step} hasService={!!s.service} />

      {step === 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold sm:text-xl">Welche Leistung benötigen Sie?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Wählen Sie eine Leistung. Die Felder im nächsten Schritt passen sich automatisch an.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((sv) => {
              const active = s.service === sv.key;
              return (
                <button
                  key={sv.key}
                  type="button"
                  onClick={() => upd("service", sv.key)}
                  className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? "border-accent bg-accent/10"
                      : "border-border/70 bg-background/50 hover:border-accent/60 hover:bg-accent/5"
                  }`}
                >
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${active ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"}`}>
                    <sv.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold">{sv.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{sv.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!s.service}
              onClick={() => setStep(2)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Weiter <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold sm:text-xl">Details zu Ihrem Projekt</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Alle Preise sind Endkundenpreise. Verlegt &amp; Verschraubt arbeitet als Kleinunternehmer nach § 19 UStG – es wird keine Umsatzsteuer ausgewiesen.
            </p>
          </div>

          {s.service === "boden" && <BodenForm s={s} upd={upd} />}
          {s.service === "kueche" && <KuecheForm s={s} upd={upd} />}
          {s.service === "ent" && <EntForm s={s} upd={upd} />}
          {s.service === "sonst" && <SonstForm s={s} upd={upd} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ort / PLZ *">
              <input
                value={s.ort}
                onChange={(e) => upd("ort", e.target.value)}
                maxLength={120}
                placeholder="z. B. Wilhelmshaven 26388"
                className={input}
              />
            </Field>
            <Field label="Entfernung vom Firmensitz in km">
              <input
                type="number"
                min={0}
                value={s.anfahrtKm}
                onChange={(e) => upd("anfahrtKm", e.target.value.replace(/^-/, ""))}
                placeholder="z. B. 25"
                className={input}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Die Anfahrt wird je nach Einsatzort in der Schätzung berücksichtigt.
              </p>
            </Field>
          </div>

          <TerminBlock s={s} upd={upd} />

          <Field label="Zusatznachricht (optional)">
            <textarea
              value={s.nachricht}
              onChange={(e) => upd("nachricht", e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Besonderheiten, Zugang, Termine, Fragen…"
              className={input}
            />
          </Field>

          {errors.length > 0 && (
            <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
              <p className="font-medium text-destructive">Bitte ergänzen:</p>
              <ul className="mt-1 list-disc pl-5 text-destructive/90">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" /> Zurück
            </button>
            <button
              type="button"
              onClick={goResult}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-medium text-accent-foreground hover:bg-accent/90"
            >
              Einschätzung anzeigen <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/15 via-background/60 to-background/40 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Ihre unverbindliche Ersteinschätzung</p>
            {breakdown && breakdown.total > 0 ? (
              <>
                <p className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Ihr unverbindlicher Orientierungspreis: ca. {eur(breakdown.total)}
                </p>
                {breakdown.hasOnRequest && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Einzelne Positionen werden erst nach Besichtigung kalkuliert und sind in dieser Spanne noch nicht enthalten.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 text-2xl font-semibold sm:text-3xl">Individuelles Angebot nach Besichtigung</p>
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              Endkundenpreise · keine Umsatzsteuer (§ 19 UStG / Kleinunternehmer)
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/40 p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ihre Angaben in der Zusammenfassung</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {summaryLines(s).map((line, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted-foreground">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Diese Berechnung ist eine unverbindliche Ersteinschätzung. Der endgültige Preis hängt von Untergrund, Zuschnitten,
              Raumaufteilung, Einsatzort, Terminwunsch und Zusatzarbeiten ab.
            </p>
          </div>


          <KalenderPlatzhalter />

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" /> Unverbindliche Terminanfrage per WhatsApp
            </a>
            <a
              href={`tel:+${PHONE_NUMBER}`}
              onClick={handlePhoneClick}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 text-base font-semibold text-accent hover:bg-accent/20"
            >
              <Phone className="h-5 w-5" /> {PHONE_DISPLAY} anrufen
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Der gewünschte Termin wird nach Aufwand, Einsatzort, Materialverfügbarkeit und bestehender Planung geprüft.
            Der Termin wird erst nach unserer Rückbestätigung verbindlich.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm hover:bg-card"
            >
              <ArrowLeft className="h-4 w-4" /> Angaben bearbeiten
            </button>
            <button
              type="button"
              onClick={copyMsg}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm hover:bg-card"
            >
              <Copy className="h-4 w-4" /> Nachricht kopieren
            </button>
          </div>

          <details className="rounded-xl border border-border/70 bg-background/40 p-4 text-sm">
            <summary className="cursor-pointer text-xs uppercase tracking-[0.2em] text-muted-foreground">Vorschau der WhatsApp-Nachricht</summary>
            <pre className="mt-3 whitespace-pre-wrap text-xs text-muted-foreground">{message}</pre>
          </details>

          <div className="grid gap-2 rounded-2xl border border-border/70 bg-background/40 p-5 text-xs text-muted-foreground sm:grid-cols-2">
            <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Kostenlose Ersteinschätzung</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Schnelle Rückmeldung</div>
            <div className="flex items-center gap-2"><Camera className="h-4 w-4 text-accent" /> Bilder per WhatsApp ergänzbar</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Regional in Wilhelmshaven &amp; Umgebung</div>
          </div>
        </div>
      )}
    </div>
  );
}

const input = "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none";

function Stepper({ step, hasService }: { step: 1 | 2 | 3; hasService: boolean }) {
  const items = [
    { n: 1, label: "Leistung" },
    { n: 2, label: "Details" },
    { n: 3, label: "Ergebnis" },
  ];
  return (
    <ol className="flex items-center gap-2 text-xs">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        const reachable = it.n === 1 || (it.n === 2 && hasService) || (it.n === 3 && hasService);
        return (
          <li key={it.n} className="flex flex-1 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : done
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-border text-muted-foreground"
              } ${reachable ? "" : "opacity-50"}`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : it.n}
            </span>
            <span className={`hidden text-xs uppercase tracking-[0.2em] sm:inline ${active ? "text-foreground" : "text-muted-foreground"}`}>
              {it.label}
            </span>
            {i < items.length - 1 && <span className="ml-1 h-px flex-1 bg-border/70" />}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Choice({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[] | string[];
}) {
  const norm = (options as any[]).map((o) =>
    typeof o === "string" ? { value: o, label: o } : (o as { value: string; label: string }),
  );
  return (
    <div className="flex flex-wrap gap-2">
      {norm.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(active ? "" : o.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active
                ? "border-accent bg-accent/15 text-accent"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function BodenForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Bodenart / Verlegeart">
        <Choice
          value={s.bodenartKey}
          onChange={(v) => upd("bodenartKey", v || "vinyl_schwimmend")}
          options={BODEN_VARIANTEN.map((b) => ({
            value: b.key,
            label: b.price === null ? `${b.label} (auf Anfrage)` : b.label,
          }))}
        />
      </Field>
      <Grid2>
        <Field label="Fläche in m² *">
          <input type="number" min={1} value={s.qm} onChange={(e) => upd("qm", e.target.value.replace(/^-/, ""))} className={input} placeholder="z. B. 28" />
        </Field>
        <Field label="Sockelleisten in lfm (laufende Meter)">
          <input type="number" min={0} value={s.sockelLfm} onChange={(e) => upd("sockelLfm", e.target.value.replace(/^-/, ""))} className={input} placeholder="z. B. 40" />
          <p className="mt-1 text-xs text-muted-foreground">
            Ausführung bitte unten auswählen. Acrylfuge / Versiegelung separat nach Aufwand.
          </p>
        </Field>
      </Grid2>
      <Field label="Sockelleisten-Ausführung">
        <Choice
          value={s.sockelArt}
          onChange={(v) => upd("sockelArt", v as State["sockelArt"])}
          options={[
            { value: "keine", label: "Keine Sockelleisten" },
            { value: "normal", label: "Normale Montage" },
            { value: "gehrung", label: "Auf Gehrung gesägt" },
          ]}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Es wird entweder normale Montage oder Gehrung berücksichtigt – nicht beides.
        </p>
      </Field>
      <Field label="Altbelag entfernen & entsorgen">
        <Choice
          value={s.altEntfernen}
          onChange={(v) => upd("altEntfernen", v as State["altEntfernen"])}
          options={[
            { value: "Nein", label: "Nein" },
            { value: "schwimmend", label: "Schwimmend verlegt" },
            { value: "verklebt", label: "Verklebter Boden" },
            { value: "teppich_lose", label: "Teppich lose / nicht verklebt" },
            { value: "teppich_verklebt", label: "Teppich verklebt" },
            { value: "teppich_stark", label: "Stark verklebt / Schaumrücken / Klebereste (nur nach Besichtigung)" },
          ]}
        />
      </Field>
      <Field label="Dämmung verlegen">
        <Choice
          value={s.daemmung}
          onChange={(v) => upd("daemmung", v as State["daemmung"])}
          options={["Ja", "Nein"]}
        />
      </Field>
      <Field label="Spachteln inkl. Grundierung">
        <Choice
          value={s.spachteln}
          onChange={(v) => upd("spachteln", v as State["spachteln"])}
          options={["Ja", "Nein"]}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Untergrund vorbereiten: spachteln inklusive Grundierung (19 €/m²).
        </p>
      </Field>
      <div className="space-y-3 rounded-md border border-border/60 bg-background/40 p-4">
        <Field label="Materialservice gewünscht">
          <Choice
            value={s.materialService}
            onChange={(v) => upd("materialService", v as State["materialService"])}
            options={["Ja", "Nein"]}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Wir unterstützen bei der Materialauswahl, Beschaffung und Anlieferung des passenden Materials.
          </p>
        </Field>
        {s.materialService === "Ja" && (
          <Field label="Geschätzter Materialwert in €">
            <input
              type="number"
              min={0}
              step={1}
              value={s.materialWert}
              onChange={(e) => upd("materialWert", e.target.value.replace(/^-/, ""))}
              className={input}
              placeholder="z. B. 1200"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Materialauswahl, Beschaffung und Anlieferung. Der Materialwert dient ausschließlich als Berechnungsgrundlage.
            </p>
            {(!s.materialWert || Number(s.materialWert) <= 0) && (
              <p className="mt-1 text-xs text-destructive">
                Bitte Materialwert eintragen, damit der Materialservice berechnet werden kann.
              </p>
            )}
          </Field>
        )}
      </div>
    </div>
  );
}

function KuecheForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Grid2>
        <Field label="Art des Projekts">
          <Choice value={s.kueArt} onChange={(v) => upd("kueArt", v || "Neue Küche")} options={["Neue Küche", "Gebrauchte Küche", "Küchenumbau", "Küchenabbau"]} />
        </Field>
        <Field label="Küchenlänge in m *">
          <input type="number" step={0.5} min={1} value={s.kueMeter} onChange={(e) => upd("kueMeter", e.target.value.replace(/^-/, ""))} className={input} placeholder="z. B. 3" />
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Arbeitsplatte zuschneiden">
          <Choice value={s.kueArbeit} onChange={(v) => upd("kueArbeit", v as State["kueArbeit"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Geräte einbauen">
          <Choice value={s.kueGeraete} onChange={(v) => upd("kueGeraete", v as State["kueGeraete"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Spüle montieren">
          <Choice value={s.kueSpuele} onChange={(v) => upd("kueSpuele", v as State["kueSpuele"])} options={["Ja", "Nein", "Unsicher"]} />
        </Field>
        <Field label="Demontage alter Küche">
          <Choice value={s.kueDemontage} onChange={(v) => upd("kueDemontage", v as State["kueDemontage"])} options={["Ja", "Nein"]} />
        </Field>
      </Grid2>
      <Field label="Transport nötig">
        <Choice value={s.kueTransport} onChange={(v) => upd("kueTransport", v as State["kueTransport"])} options={["Ja", "Nein"]} />
      </Field>
      <p className="rounded-md border border-border/60 bg-background/40 p-3 text-xs text-muted-foreground">
        Küchenmontage wird nach Besichtigung kalkuliert. Elektro- und Gas-/Wasseranschlüsse übernehmen Fachbetriebe; wir koordinieren das auf Wunsch.
      </p>
    </div>
  );
}

function EntForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Objektart">
        <Choice value={s.entObjekt} onChange={(v) => upd("entObjekt", v || "Wohnung")} options={["Wohnung", "Haus", "Keller", "Garage", "Dachboden", "Garten", "Sonstiges"]} />
      </Field>
      <Field label="Geschätzte Menge *">
        <Choice
          value={s.entMenge}
          onChange={(v) => upd("entMenge", v as State["entMenge"])}
          options={["klein", "mittel", "groß", "sehr groß"]}
        />
      </Field>
      <Grid2>
        <Field label="Etage">
          <input type="number" min={0} value={s.entEtage} onChange={(e) => upd("entEtage", e.target.value.replace(/^-/, ""))} className={input} placeholder="z. B. 2" />
        </Field>
        <Field label="Aufzug vorhanden">
          <Choice value={s.entAufzug} onChange={(v) => upd("entAufzug", v as State["entAufzug"])} options={["Ja", "Nein"]} />
        </Field>
      </Grid2>
      <Field label="Muss entsorgt werden">
        <Choice value={s.entEntsorgen} onChange={(v) => upd("entEntsorgen", v as State["entEntsorgen"])} options={["Ja", "Nein"]} />
      </Field>
    </div>
  );
}

function SonstForm({ s, upd }: { s: State; upd: <K extends keyof State>(k: K, v: State[K]) => void }) {
  return (
    <Field label="Beschreibung Ihres Projekts *">
      <textarea
        value={s.sonstText}
        onChange={(e) => upd("sonstText", e.target.value)}
        rows={5}
        maxLength={1500}
        placeholder="Was soll gemacht werden? Räume, Maße, Besonderheiten…"
        className={input}
      />
    </Field>
  );
}

export function TerminBlock({
  s,
  upd,
}: {
  s: State;
  upd: <K extends keyof State>(k: K, v: State[K]) => void;
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/70 bg-background/40 p-5">
      <div className="flex items-start gap-3">
        <CalendarClock className="mt-0.5 h-5 w-5 text-accent" />
        <div>
          <p className="text-sm font-semibold">Wunschtermin anfragen</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Wählen Sie Ihren bevorzugten Zeitraum aus. Der Terminwunsch wird geprüft und erst nach unserer Rückbestätigung verbindlich eingeplant.
          </p>
        </div>
      </div>
      <Grid2>
        <Field label="Wunschdatum">
          <input type="date" value={s.wunschDatum} onChange={(e) => upd("wunschDatum", e.target.value)} className={input} />
        </Field>
        <Field label="Wunschzeitraum">
          <Choice
            value={s.wunschZeitraum}
            onChange={(v) => upd("wunschZeitraum", v)}
            options={["Vormittag", "Mittag", "Nachmittag", "Abend", "ganztägig flexibel"]}
          />
        </Field>
      </Grid2>
      <Field label="Fertigstellung gewünscht bis">
        <input type="date" value={s.fertigDatum} onChange={(e) => upd("fertigDatum", e.target.value)} className={input} />
      </Field>
      <Field label="Dringlichkeit">
        <Choice
          value={s.dringlichkeit}
          onChange={(v) => upd("dringlichkeit", v)}
          options={DRINGLICHKEIT_OPTIONS.map((o) => ({ value: o.key, label: o.label }))}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Kurzfristige Termine mit zeitnahem Fertigstellungsdatum können teurer sein, weil Planung, Personal und Material schneller organisiert werden müssen.
          Der Expresszuschlag wird sichtbar als eigene Position ausgewiesen und nur auf berechenbare Arbeitsleistungen angewendet.
        </p>
      </Field>
      <Field label="Besondere Hinweise zum Termin">
        <textarea
          value={s.terminHinweise}
          onChange={(e) => upd("terminHinweise", e.target.value)}
          rows={2}
          maxLength={500}
          placeholder="z. B. nur werktags, bestimmte Uhrzeit, Zugang…"
          className={input}
        />
      </Field>
      <p className="text-xs text-muted-foreground">
        Unverbindliche Terminanfrage – kein automatisch gebuchter Termin. Bestätigung erfolgt nach Prüfung von Aufwand, Einsatzort und Materialverfügbarkeit.
      </p>
    </div>
  );
}

export function KalenderPlatzhalter() {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/40 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Verfügbarkeiten prüfen</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Im Online-Kalender können Sie freie Zeiträume einsehen und einen Wunschtermin senden. Aus Datenschutzgründen werden
        belegte Termine nur als „belegt“ angezeigt – ohne Kundennamen, Adressen oder Auftragsdetails.
      </p>
      <div className="mt-4">
        <a
          href={GOOGLE_CALENDAR_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <CalendarClock className="h-4 w-4" /> Verfügbarkeit prüfen
        </a>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Der Kalender dient zur unverbindlichen Terminanfrage. Der endgültige Termin wird nach Prüfung von Aufwand,
        Einsatzort, Materialverfügbarkeit und bestehender Planung bestätigt.
      </p>
    </div>
  );
}

export function TrustChips() {
  return (
    <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><ShieldCheck className="h-4 w-4 text-accent" /> Kostenlose Ersteinschätzung</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><Clock className="h-4 w-4 text-accent" /> Schnelle Rückmeldung</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><Camera className="h-4 w-4 text-accent" /> Bilder per WhatsApp</span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-2"><MapPin className="h-4 w-4 text-accent" /> Wilhelmshaven &amp; Umgebung</span>
    </div>
  );
}
