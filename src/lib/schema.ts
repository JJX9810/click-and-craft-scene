// Zentrale JSON-LD Bausteine für Verlegt & Verschraubt
// Sprint 3 – konsolidierter Graph, keine erfundenen Daten.

export const SITE_URL = "https://verlegt-verschraubt.de";

export const ORG_ID = `${SITE_URL}/#organization`;
export const LB_ID = `${SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const HOME_WEBPAGE_ID = `${SITE_URL}/#webpage`;

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
  "Wilhelmshaven und Umgebung",
];

// OfferCatalog ohne Preise / Offers – nur Leistungsspektrum
const OFFER_CATALOG = {
  "@type": "OfferCatalog",
  name: "Leistungen Verlegt & Verschraubt",
  itemListElement: [
    { "@type": "OfferCatalog", name: "Bodenverlegung", url: `${SITE_URL}/bodenverlegung-wilhelmshaven` },
    { "@type": "OfferCatalog", name: "Küchenmontage", url: `${SITE_URL}/kuechenmontage-in-wilhelmshaven` },
    { "@type": "OfferCatalog", name: "Entrümpelung & Entsorgung", url: `${SITE_URL}/entruempelung-entsorgung-in-wilhelmshaven` },
  ],
};

export const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Verlegt & Verschraubt Handwerkerservice",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/hero-flooring.png`,
  email: "justus.brosch@verlegt-verschraubt.de",
  telephone: "+491634799286",
  founder: { "@type": "Person", name: "Justus Brosch" },
  address: POSTAL_ADDRESS,
  sameAs: PROFILE_URLS,
};

export const localBusinessNode = {
  "@type": "HomeAndConstructionBusiness",
  "@id": LB_ID,
  name: "Verlegt & Verschraubt Handwerkerservice",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/hero-flooring.png`,
  email: "justus.brosch@verlegt-verschraubt.de",
  telephone: "+491634799286",
  founder: { "@type": "Person", name: "Justus Brosch" },
  parentOrganization: { "@id": ORG_ID },
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  sameAs: PROFILE_URLS,
  slogan: "Z.O.Z. – Zuverlässig. Ordentlich. Zügig.",
  hasOfferCatalog: OFFER_CATALOG,
};

export const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: "Verlegt & Verschraubt Handwerkerservice",
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
};

export interface WebPageInput { url: string; name: string; description: string; id?: string; }
export function webPageNode({ url, name, description, id }: WebPageInput) {
  return {
    "@type": "WebPage",
    "@id": id ?? `${url}#webpage`,
    url, name, description,
    inLanguage: "de-DE",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": LB_ID },
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

export interface ServiceInput {
  url: string; name: string; description: string; serviceType: string;
  areaServed?: string | string[];
}
export function serviceNode({ url, name, description, serviceType, areaServed }: ServiceInput) {
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name, description, serviceType, url,
    provider: { "@id": LB_ID },
    areaServed: areaServed ?? AREA_SERVED,
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

export function graph(nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function jsonLdScript(nodes: unknown[]) {
  return { type: "application/ld+json" as const, children: JSON.stringify(graph(nodes)) };
}
