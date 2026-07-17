// Zentrale JSON-LD Bausteine für Verlegt & Verschraubt
// Sprint 3 – konsolidierter Graph, keine erfundenen Daten.

export const SITE_URL = "https://verlegt-verschraubt.de";

export const ORG_ID = `${SITE_URL}/#organization`;
// LB_ID kept as alias for backwards-compat; points to the same single
// Organization/LocalBusiness/HomeAndConstructionBusiness entity.
export const LB_ID = ORG_ID;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const HOME_WEBPAGE_ID = `${SITE_URL}/#webpage`;

export const SERVICE_IDS = {
  bodenverlegung: `${SITE_URL}/#service-bodenverlegung`,
  kuechenmontage: `${SITE_URL}/#service-kuechenmontage`,
  entruempelung: `${SITE_URL}/#service-entruempelung`,
} as const;

export const PROFILE_URLS = [
  "https://share.google/47AcEDNTSDkltR1un",
  "https://www.facebook.com/profile.php?id=61579455697023",
  "https://www.my-hammer.de/auftragnehmer/justus-1",
  "https://www.kleinanzeigen.de/s-bestandsliste.html?userId=162496234",
  "https://www.gelbeseiten.de/gsbiz/cb6b8b66-db85-4b56-8397-4a920963c6d1",
  "https://www.11880.com/branchenbuch/wilhelmshaven/060690823B113934961/verlegt-verschraubt-handwerkerservice.html",
  "https://adresse.dastelefonbuch.de/Wilhelmshaven/2-Holzfu%C3%9Fb%C3%B6den-Verlegt-Verschraubt-Handwerkerservice-Wilhelmshaven-Weichselstr.html",
  "https://www.golocal.de/wilhelmshaven/bodenbelaege/verlegtverschraubt-handwerkerservice-YVD9o/",
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Weichselstraße 12",
  postalCode: "26388",
  addressLocality: "Wilhelmshaven",
  addressRegion: "Niedersachsen",
  addressCountry: "DE",
};

const AREA_SERVED = [
  "Wilhelmshaven",
  "Sande",
  "Schortens",
  "Jever",
  "Varel",
  "Wangerland",
  "Wittmund",
  "Friesland",
  "Wilhelmshaven und Umgebung",
];

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "19:00",
  },
];

const OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Leistungen Verlegt & Verschraubt",
  itemListElement: [
    { "@type": "OfferCatalog", name: "Bodenverlegung", url: `${SITE_URL}/bodenverlegung-wilhelmshaven` },
    { "@type": "OfferCatalog", name: "Küchenmontage", url: `${SITE_URL}/kuechenmontage-in-wilhelmshaven` },
    { "@type": "OfferCatalog", name: "Entrümpelung & Entsorgung", url: `${SITE_URL}/entruempelung-entsorgung-in-wilhelmshaven` },
  ],
};

// Eine konsolidierte Entität mit mehreren Typen – wird sowohl als
// Organization als auch als LocalBusiness / HomeAndConstructionBusiness
// erkannt und über ORG_ID von allen WebPages referenziert.
export const organizationNode = {
  "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": ORG_ID,
  name: "Verlegt & Verschraubt Handwerkerservice",
  alternateName: "Verlegt & Verschraubt",
  description:
    "Verlegt & Verschraubt Handwerkerservice unterstützt Privatkunden bei Bodenverlegung, Küchenmontage sowie Entrümpelung & Entsorgung in Wilhelmshaven und Umgebung.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  email: "justus.brosch@verlegt-verschraubt.de",
  telephone: "+491634799286",
  priceRange: "€€",
  founder: { "@type": "Person", name: "Justus Brosch" },
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  sameAs: PROFILE_URLS,
  slogan: "Z.O.Z. – Zuverlässig. Ordentlich. Zügig.",
  knowsAbout: [
    "Bodenverlegung",
    "Küchenmontage",
    "Entrümpelung",
    "Vinylboden",
    "Laminat",
    "PVC-Boden",
    "Teppichboden",
    "Sockelleisten",
    "Küchenaufbau",
  ],
  hasOfferCatalog: OFFER_CATALOG,
  openingHoursSpecification: OPENING_HOURS,
};

// Backwards-compat-Alias – verweist auf dieselbe Entität.
export const localBusinessNode = organizationNode;

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Verlegt & Verschraubt Handwerkerservice",
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
};

// Eigenständige Service-Entities mit stabilen @ids, die von Leistungs-
// und Ortsseiten als WebPage.about referenziert werden können.
export const serviceEntities = [
  {
    "@type": "Service",
    "@id": SERVICE_IDS.bodenverlegung,
    name: "Bodenverlegung in Wilhelmshaven & Umgebung",
    description:
      "Verlegung von Vinyl, Designboden, Laminat, PVC und Teppich inklusive Untergrundprüfung, Treppenverkleidung sowie Sockelleisten und Übergängen.",
    serviceType: "Bodenverlegung",
    url: `${SITE_URL}/bodenverlegung-wilhelmshaven`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
  },
  {
    "@type": "Service",
    "@id": SERVICE_IDS.kuechenmontage,
    name: "Küchenmontage in Wilhelmshaven & Umgebung",
    description:
      "Küchenaufbau nach Umzug, Restmontage und Anpassung – Arbeitsplatten, Spüle, Armatur sowie Sockel und Lichtleisten.",
    serviceType: "Küchenmontage",
    url: `${SITE_URL}/kuechenmontage-in-wilhelmshaven`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
  },
  {
    "@type": "Service",
    "@id": SERVICE_IDS.entruempelung,
    name: "Entrümpelung & Entsorgung in Wilhelmshaven",
    description:
      "Wohnungs-, Keller- und Dachbodenentrümpelung, Möbel- und Sperrmüllentsorgung sowie Räumung vor Renovierung.",
    serviceType: "Entrümpelung und Entsorgung",
    url: `${SITE_URL}/entruempelung-entsorgung-in-wilhelmshaven`,
    provider: { "@id": ORG_ID },
    areaServed: AREA_SERVED,
  },
];

export interface WebPageInput {
  url: string;
  name: string;
  description: string;
  id?: string;
  about?: { "@id": string } | { "@id": string }[];
  primaryImageOfPage?: string;
}
export function webPageNode({ url, name, description, id, about, primaryImageOfPage }: WebPageInput) {
  return {
    "@type": "WebPage",
    "@id": id ?? `${url}#webpage`,
    url, name, description,
    inLanguage: "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    about: about ?? { "@id": ORG_ID },
    ...(primaryImageOfPage ? { primaryImageOfPage } : {}),
  };
}

export interface BreadcrumbItem { name: string; url: string; }
export function breadcrumbNode(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: it.url,
    })),
  };
}

export interface OfferInput {
  name: string;
  price: number;
  unitText: string; // z. B. "m²", "lfm"
  priceCurrency?: string;
}
export function offerNode({ name, price, unitText, priceCurrency = "EUR" }: OfferInput) {
  return {
    "@type": "Offer",
    name,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price,
      priceCurrency,
      unitText,
    },
  };
}

export interface ServiceInput {
  url: string; name: string; description: string; serviceType: string | string[];
  areaServed?: string | string[];
  id?: string;
  offers?: ReturnType<typeof offerNode>[];
}
export function serviceNode({ url, name, description, serviceType, areaServed, id, offers }: ServiceInput) {
  return {
    "@type": "Service",
    "@id": id ?? `${url}#service`,
    name, description, serviceType, url,
    provider: { "@id": ORG_ID },
    areaServed: areaServed ?? AREA_SERVED,
    ...(offers && offers.length ? { offers } : {}),
  };
}

export interface FaqItem { q: string; a: string; }
export function faqPageNode(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// Standardisierte FAQ für Ortsseiten – wird sowohl sichtbar im DOM
// als auch als FAQPage-Schema verwendet (Konsistenzpflicht).
export function ortFaqItems(ort: string): FaqItem[] {
  return [
    {
      q: `Bietet Verlegt & Verschraubt Handwerkerservice auch Arbeiten in ${ort} an?`,
      a: `Ja. Wir sitzen in Wilhelmshaven und arbeiten regelmäßig in ${ort} und Umgebung – für Bodenverlegung, Küchenmontage sowie Entrümpelung und Entsorgung.`,
    },
    {
      q: `Welche Leistungen sind in ${ort} möglich?`,
      a: `Bodenverlegung (Vinyl, Laminat, PVC, Teppich), Küchenmontage (Aufbau nach Umzug, Restmontage, Arbeitsplatten) sowie Entrümpelung und Entsorgung von Wohnung, Keller oder Dachboden.`,
    },
    {
      q: `Kann ich vorab Fotos für eine Einschätzung senden?`,
      a: `Ja. Fotos und eine kurze Beschreibung per E-Mail oder über das Kontaktformular reichen für eine erste Einschätzung in den meisten Fällen aus.`,
    },
    {
      q: `Ist eine Besichtigung vor Ort möglich?`,
      a: `Ja, bei größeren Vorhaben in ${ort} stimmen wir gerne einen Vor-Ort-Termin ab, um Maße, Untergrund und Anschlüsse direkt zu prüfen.`,
    },
    {
      q: `Wie frage ich ein Projekt in ${ort} am besten an?`,
      a: `Senden Sie Ort, gewünschte Leistung, Maße bzw. Fläche, Fotos und einen Wunschzeitraum. Auf dieser Basis melden wir uns mit einer ehrlichen Einschätzung.`,
    },
  ];
}

export function graph(nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function jsonLdScript(nodes: unknown[]) {
  return { type: "application/ld+json" as const, children: JSON.stringify(graph(nodes)) };
}
