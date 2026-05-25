// Attribution / UTM-Tracking für Verlegt & Verschraubt
// Speichert First-Touch + Last-Touch im localStorage (90 Tage), liest UTM-
// Parameter und ordnet Referrer bekannten Quellen zu.
//
// Datenschutz: speichert KEINE personenbezogenen Daten. Nur source/medium/
// campaign/content/term/landing_page/timestamp.

const STORAGE_KEY = "vv_attribution_v1";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 Tage

export type Touch = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  landing_page: string;
  timestamp: string; // ISO
};

export type Attribution = {
  first: Touch;
  last: Touch;
  stored_at: number; // ms
};

// Menschenlesbare Anzeige-Namen
const SOURCE_LABELS: Record<string, string> = {
  kleinanzeigen: "Kleinanzeigen",
  facebook: "Facebook",
  facebook_gruppe: "Facebook-Gruppe",
  instagram: "Instagram",
  whatsapp_status: "WhatsApp-Status",
  google_business: "Google-Unternehmensprofil",
  google: "Google-Suche",
  bing: "Bing-Suche",
  myhammer: "MyHammer",
  gelbe_seiten: "Gelbe Seiten",
  das_oertliche: "Das Örtliche",
  "11880": "11880",
  golocal: "GoLocal",
  flyer_qr: "Flyer-QR-Code",
  visitenkarte_qr: "Visitenkarte",
  fahrzeug_qr: "Fahrzeug-QR-Code",
  baustellenschild_qr: "Baustellenschild-QR-Code",
  rechnung_pdf: "Rechnung/Angebot",
  direct: "Direkter Websitebesuch",
};

const CAMPAIGN_LABELS: Record<string, string> = {
  preisrechner: "Preisrechner",
  none: "—",
};

export function formatSource(source: string | undefined | null): string {
  if (!source) return SOURCE_LABELS.direct;
  return SOURCE_LABELS[source] ?? source;
}

export function formatCampaign(campaign: string | undefined | null): string {
  if (!campaign || campaign === "none") return CAMPAIGN_LABELS.none;
  return CAMPAIGN_LABELS[campaign] ?? campaign;
}

// Referrer-Mapping
const REFERRER_MAP: { match: RegExp; source: string; medium: string }[] = [
  { match: /(^|\.)facebook\.com$/i, source: "facebook", medium: "social" },
  { match: /(^|\.)m\.facebook\.com$/i, source: "facebook", medium: "social" },
  { match: /(^|\.)instagram\.com$/i, source: "instagram", medium: "social" },
  { match: /(^|\.)google\./i, source: "google", medium: "organic" },
  { match: /(^|\.)bing\.com$/i, source: "bing", medium: "organic" },
  { match: /(^|\.)duckduckgo\.com$/i, source: "duckduckgo", medium: "organic" },
  { match: /(^|\.)kleinanzeigen\.de$/i, source: "kleinanzeigen", medium: "portal" },
  { match: /(^|\.)ebay-kleinanzeigen\.de$/i, source: "kleinanzeigen", medium: "portal" },
  { match: /(^|\.)my-hammer\.de$/i, source: "myhammer", medium: "portal" },
  { match: /(^|\.)myhammer\.de$/i, source: "myhammer", medium: "portal" },
  { match: /(^|\.)gelbeseiten\.de$/i, source: "gelbe_seiten", medium: "portal" },
  { match: /(^|\.)dasoertliche\.de$/i, source: "das_oertliche", medium: "portal" },
  { match: /(^|\.)11880\.com$/i, source: "11880", medium: "portal" },
  { match: /(^|\.)golocal\.de$/i, source: "golocal", medium: "portal" },
];

function safeRead(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed?.first || !parsed?.last) return null;
    if (Date.now() - (parsed.stored_at ?? 0) > TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function safeWrite(a: Attribution) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* ignore quota */
  }
}

function emptyTouch(landing: string): Touch {
  return {
    source: "direct",
    medium: "direct",
    campaign: "none",
    content: "",
    term: "",
    landing_page: landing,
    timestamp: new Date().toISOString(),
  };
}

function classifyReferrer(referrer: string): { source: string; medium: string } | null {
  try {
    const u = new URL(referrer);
    // Eigene Domain ignorieren
    if (typeof window !== "undefined" && u.hostname === window.location.hostname) return null;
    for (const entry of REFERRER_MAP) {
      if (entry.match.test(u.hostname)) {
        return { source: entry.source, medium: entry.medium };
      }
    }
    return { source: u.hostname.replace(/^www\./, ""), medium: "referral" };
  } catch {
    return null;
  }
}

/**
 * Erfasst Attribution beim Seitenaufruf.
 * - Liest utm_* aus URL
 * - Fällt sonst auf document.referrer zurück
 * - Speichert first_touch (nur wenn leer) + last_touch
 */
export function captureAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  const url = new URL(window.location.href);
  const p = url.searchParams;
  const landing = url.pathname + (url.search || "");

  const utmSource = p.get("utm_source");
  const utmMedium = p.get("utm_medium");
  const utmCampaign = p.get("utm_campaign");
  const utmContent = p.get("utm_content") ?? "";
  const utmTerm = p.get("utm_term") ?? "";

  let newTouch: Touch | null = null;

  if (utmSource) {
    newTouch = {
      source: utmSource,
      medium: utmMedium || "unknown",
      campaign: utmCampaign || "none",
      content: utmContent,
      term: utmTerm,
      landing_page: landing,
      timestamp: new Date().toISOString(),
    };
  } else {
    // Kein UTM: Referrer auswerten
    const ref = typeof document !== "undefined" ? document.referrer : "";
    const cls = ref ? classifyReferrer(ref) : null;
    if (cls) {
      newTouch = {
        source: cls.source,
        medium: cls.medium,
        campaign: "none",
        content: "",
        term: "",
        landing_page: landing,
        timestamp: new Date().toISOString(),
      };
    }
  }

  const existing = safeRead();
  if (!existing) {
    const initial: Attribution = {
      first: newTouch ?? emptyTouch(landing),
      last: newTouch ?? emptyTouch(landing),
      stored_at: Date.now(),
    };
    safeWrite(initial);
    return initial;
  }

  if (newTouch) {
    const updated: Attribution = {
      first: existing.first,
      last: newTouch,
      stored_at: Date.now(),
    };
    safeWrite(updated);
    return updated;
  }

  // refresh stored_at to keep alive
  const refreshed: Attribution = { ...existing, stored_at: Date.now() };
  safeWrite(refreshed);
  return refreshed;
}

export function getAttribution(): Attribution | null {
  return safeRead();
}

/**
 * Flaches Objekt mit allen Attributionsfeldern – ideal für trackEvent oder
 * Hidden-Form-Felder.
 */
export function getAttributionFields(): Record<string, string> {
  const a = safeRead();
  const cur =
    typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
  if (!a) {
    return {
      first_touch_source: "direct",
      first_touch_medium: "direct",
      first_touch_campaign: "none",
      first_touch_content: "",
      first_touch_term: "",
      first_touch_landing_page: "",
      first_touch_timestamp: "",
      last_touch_source: "direct",
      last_touch_medium: "direct",
      last_touch_campaign: "none",
      last_touch_content: "",
      last_touch_term: "",
      last_touch_landing_page: "",
      last_touch_timestamp: "",
      current_page: cur,
    };
  }
  return {
    first_touch_source: a.first.source,
    first_touch_medium: a.first.medium,
    first_touch_campaign: a.first.campaign,
    first_touch_content: a.first.content,
    first_touch_term: a.first.term,
    first_touch_landing_page: a.first.landing_page,
    first_touch_timestamp: a.first.timestamp,
    last_touch_source: a.last.source,
    last_touch_medium: a.last.medium,
    last_touch_campaign: a.last.campaign,
    last_touch_content: a.last.content,
    last_touch_term: a.last.term,
    last_touch_landing_page: a.last.landing_page,
    last_touch_timestamp: a.last.timestamp,
    current_page: cur,
  };
}

/**
 * Erzeugt die menschenlesbaren Zeilen, die unten in WhatsApp- oder
 * E-Mail-Nachrichten angehängt werden.
 */
export function buildAttributionLines(): string[] {
  const a = safeRead();
  const lines: string[] = [];
  if (!a) {
    lines.push("Anfrage über: Direkter Websitebesuch");
    return lines;
  }
  lines.push(`Anfrage über: ${formatSource(a.last.source)}`);
  if (a.last.campaign && a.last.campaign !== "none") {
    lines.push(`Kampagne: ${formatCampaign(a.last.campaign)}`);
  }
  if (a.last.content) {
    lines.push(`Inhalt: ${a.last.content}`);
  }
  if (a.first.landing_page) {
    lines.push(`Einstiegsseite: ${a.first.landing_page}`);
  }
  if (a.first.source !== a.last.source && a.first.source !== "direct") {
    lines.push(`Erstkontakt über: ${formatSource(a.first.source)}`);
  }
  return lines;
}
