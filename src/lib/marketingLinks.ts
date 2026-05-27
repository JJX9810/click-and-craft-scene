// Zentrale Dokumentation aller Kampagnenlinks für Verlegt & Verschraubt.
// Alle Links führen auf /preise mit unterschiedlichen UTM-Parametern, damit
// wir im Lead-Eingang die Quelle erkennen.
//
// Update-Regel: Wenn ein neuer Kanal hinzukommt, hier ergänzen UND ggf. den
// dazugehörigen Kurzlink in src/routes/go.$slug.tsx eintragen.

export const SITE_BASE = "https://www.verlegt-verschraubt.de";

export type MarketingLink = {
  key: string;
  label: string;
  group: "online" | "offline" | "content";
  url: string;
  shortPath?: string; // optionaler Kurzlink unter /go/...
};

function preise(qs: string) {
  return `${SITE_BASE}/preise?${qs}`;
}

export const MARKETING_LINKS: MarketingLink[] = [
  // Online
  { key: "kleinanzeigen", group: "online", label: "Kleinanzeigen", url: preise("utm_source=kleinanzeigen&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/kleinanzeigen" },
  { key: "facebook", group: "online", label: "Facebook-Seite", url: preise("utm_source=facebook&utm_medium=social&utm_campaign=preisrechner"), shortPath: "/go/facebook" },
  { key: "facebook_gruppe", group: "online", label: "Facebook-Gruppe", url: preise("utm_source=facebook_gruppe&utm_medium=social&utm_campaign=preisrechner"), shortPath: "/go/facebook-gruppe" },
  { key: "instagram", group: "online", label: "Instagram", url: preise("utm_source=instagram&utm_medium=social&utm_campaign=preisrechner"), shortPath: "/go/instagram" },
  { key: "whatsapp_status", group: "online", label: "WhatsApp-Status", url: preise("utm_source=whatsapp_status&utm_medium=social&utm_campaign=preisrechner"), shortPath: "/go/whatsapp" },
  { key: "google_business", group: "online", label: "Google-Unternehmensprofil", url: preise("utm_source=google_business&utm_medium=local&utm_campaign=preisrechner"), shortPath: "/go/google" },
  { key: "myhammer", group: "online", label: "MyHammer", url: preise("utm_source=myhammer&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/myhammer" },
  { key: "gelbe_seiten", group: "online", label: "Gelbe Seiten", url: preise("utm_source=gelbe_seiten&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/gelbe-seiten" },
  { key: "11880", group: "online", label: "11880", url: preise("utm_source=11880&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/11880" },
  { key: "das_oertliche", group: "online", label: "Das Örtliche", url: preise("utm_source=das_oertliche&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/oertliche" },
  { key: "golocal", group: "online", label: "GoLocal", url: preise("utm_source=golocal&utm_medium=portal&utm_campaign=preisrechner"), shortPath: "/go/golocal" },

  // Offline
  { key: "flyer_qr", group: "offline", label: "Flyer-QR", url: preise("utm_source=flyer_qr&utm_medium=offline&utm_campaign=preisrechner"), shortPath: "/go/flyer" },
  { key: "visitenkarte_qr", group: "offline", label: "Visitenkarte-QR", url: preise("utm_source=visitenkarte_qr&utm_medium=offline&utm_campaign=preisrechner"), shortPath: "/go/visitenkarte" },
  { key: "fahrzeug_qr", group: "offline", label: "Fahrzeug-QR", url: preise("utm_source=fahrzeug_qr&utm_medium=offline&utm_campaign=preisrechner"), shortPath: "/go/fahrzeug" },
  { key: "baustellenschild_qr", group: "offline", label: "Baustellenschild-QR", url: preise("utm_source=baustellenschild_qr&utm_medium=offline&utm_campaign=preisrechner"), shortPath: "/go/baustellenschild" },
  { key: "rechnung_pdf", group: "offline", label: "Rechnung / Angebot", url: preise("utm_source=rechnung_pdf&utm_medium=offline&utm_campaign=preisrechner"), shortPath: "/go/rechnung" },

  // Content-spezifisch
  { key: "fb_boden", group: "content", label: "Facebook · Bodenverlegung", url: preise("leistung=bodenverlegung&utm_source=facebook&utm_medium=social&utm_campaign=preisrechner&utm_content=bodenverlegung_post") },
  { key: "fb_kueche", group: "content", label: "Facebook · Küchenmontage", url: preise("leistung=kuechenmontage&utm_source=facebook&utm_medium=social&utm_campaign=preisrechner&utm_content=kuechenmontage_post") },
  { key: "fb_ent", group: "content", label: "Facebook · Entrümpelung", url: preise("leistung=entruempelung&utm_source=facebook&utm_medium=social&utm_campaign=preisrechner&utm_content=entruempelung_post") },
  { key: "ka_boden", group: "content", label: "Kleinanzeigen · Bodenverlegung", url: preise("leistung=bodenverlegung&utm_source=kleinanzeigen&utm_medium=portal&utm_campaign=preisrechner&utm_content=bodenverlegung_anzeige") },
  { key: "ka_kueche", group: "content", label: "Kleinanzeigen · Küchenmontage", url: preise("leistung=kuechenmontage&utm_source=kleinanzeigen&utm_medium=portal&utm_campaign=preisrechner&utm_content=kuechenmontage_anzeige") },
  { key: "ka_ent", group: "content", label: "Kleinanzeigen · Entrümpelung", url: preise("leistung=entruempelung&utm_source=kleinanzeigen&utm_medium=portal&utm_campaign=preisrechner&utm_content=entruempelung_anzeige") },
];

// Mapping Kurzlink-Slug → Ziel-Pfad (relativ). Genutzt von /go/$slug.
export const SHORTLINKS: Record<string, string> = MARKETING_LINKS.reduce(
  (acc, l) => {
    if (l.shortPath) {
      const slug = l.shortPath.replace(/^\/go\//, "");
      acc[slug] = l.url.replace(SITE_BASE, "");
    }
    return acc;
  },
  {} as Record<string, string>,
);
