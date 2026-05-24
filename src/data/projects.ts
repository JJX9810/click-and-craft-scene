export type ProjectCategory =
  | "Bodenverlegung"
  | "Küchenmontage"
  | "Küchenfolierung"
  | "Treppenbelag"
  | "Detailarbeiten";

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  phase?: "Vorher" | "Vorbereitung" | "Nachher" | "Detail";
};

export type Project = {
  slug: string;
  title: string;
  ort: string;
  category: ProjectCategory;
  services?: string[];
  description: string;
  cover: string;
  coverAlt: string;
  media: ProjectMedia[];
  featured?: boolean;
  detail?: boolean;
};

const BASE = "https://verlegt-verschraubt.de/wp-content/uploads/2026/05";

export const projects: Project[] = [
  {
    slug: "bodenverlegung-coldewei-wilhelmshaven",
    title: "Bodenverlegung in Coldewei, Wilhelmshaven",
    ort: "Coldewei, Wilhelmshaven",
    category: "Bodenverlegung",
    services: [
      "Vinylboden verlegen",
      "Schlingenteppich verlegen",
      "Altbelag entfernen",
      "Untergrund vorbereiten",
      "Übergangsschienen setzen",
      "Sockelleisten montieren",
      "Gehrungen schneiden",
    ],
    description:
      "In Coldewei, Wilhelmshaven wurde der vorhandene Teppichboden entfernt und der Untergrund vorbereitet. Untere Etage: Vinylboden in Holzoptik. Obere Etage: Schlingenteppich. Fokus auf saubere Übergänge, Sockelleisten auf Gehrung und ein stimmiges Gesamtbild.",
    cover: `${BASE}/WhatsApp-Image-2026-05-19-at-17.55.19.jpeg`,
    coverAlt: "Vinylboden im Wohnzimmer in Coldewei, Wilhelmshaven",
    featured: true,
    detail: true,
    media: [
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-23-at-23.13.55-1.jpeg`,
        alt: "Vorherbild Bodenverlegung im Flur in Coldewei",
        caption: "Ausgangszustand im Flur- und Treppenbereich vor der neuen Bodenverlegung.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-23-at-23.13.54.jpeg`,
        alt: "Untergrund vorbereitet nach Teppichentfernung in Coldewei",
        caption: "Alter Teppich entfernt, Untergrund für die neue Bodenverlegung vorbereitet.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.54.58-1.jpeg`,
        alt: "Vinylboden im Flur mit Sockelleisten in Coldewei",
        caption: "Vinylboden im Flur. Sockelleisten auf Gehrung gesägt, montiert, versiegelt, mit Acryl abgezogen.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.54.58.jpeg`,
        alt: "Vinylboden im Flurbereich in Coldewei",
        caption: "Fertig verlegter Vinylboden in Holzoptik im Flurbereich.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.55.04.jpeg`,
        alt: "Vinylboden mit Übergangsschiene in Coldewei",
        caption: "Sauber ausgeführter Raumübergang mit Übergangsschiene.",
        phase: "Detail",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.55.19.jpeg`,
        alt: "Vinylboden im Wohnzimmer in Coldewei",
        caption: "Vinylboden in Holzoptik im Wohnzimmer – ruhiges, modernes Gesamtbild.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.56.27.jpeg`,
        alt: "Schlingenteppich im Flur der zweiten Etage in Coldewei",
        caption: "Schlingenteppich im Flur- und Treppenbereich der zweiten Etage.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.56.16.jpeg`,
        alt: "Schlingenteppich mit sauberen Übergängen in Coldewei",
        caption: "Schlingenteppich mit sauberen Übergängen zu angrenzenden Zimmern.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.56.45.jpeg`,
        alt: "Schlingenteppich im Zimmer in Coldewei",
        caption: "Fertig verlegter Schlingenteppich in einem Zimmer der zweiten Etage.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/WhatsApp-Image-2026-05-19-at-17.56.59.jpeg`,
        alt: "Schlingenteppich mit sauberen Gehrungen in Coldewei",
        caption: "Detailbild: sauber ausgeführte Gehrungen und ordentliche Anschlüsse.",
        phase: "Detail",
      },
    ],
  },
  {
    slug: "kuechenmontage-schortens",
    title: "Küchenmontage in Schortens",
    ort: "Schortens",
    category: "Küchenmontage",
    description:
      "In Schortens wurde eine helle Küchenzeile montiert und sauber ausgerichtet. Arbeitsplatte, Spüle, Kochfeld und Fronten wurden ordentlich eingebaut.",
    cover: `${BASE}/kuechenmontage-schortens-verlegt-verschraubt.jpg-1-scaled.png`,
    coverAlt: "Küchenmontage in Schortens – helle Küchenzeile",
    featured: true,
    media: [
      {
        type: "image",
        src: `${BASE}/kuechenmontage-schortens-verlegt-verschraubt.jpg-1-scaled.png`,
        alt: "Küchenmontage in Schortens",
        caption: "Fertig montierte helle Küchenzeile mit Arbeitsplatte, Spüle, Kochfeld und ausgerichteten Fronten.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/kuechenmontage-schortens-verlegt-verschraubt.jpg-scaled.png`,
        alt: "Weiße Küche mit Arbeitsplatte in Schortens montiert",
        caption: "Nachher-Bild der Küchenmontage in Schortens.",
        phase: "Nachher",
      },
    ],
  },
  {
    slug: "weisse-einbaukueche-schortens",
    title: "Weiße Einbauküche montiert in Schortens",
    ort: "Schortens",
    category: "Küchenmontage",
    description:
      "Moderne weiße Einbauküche in Schortens montiert und sauber ausgerichtet. Arbeitsplatte, Spüle, Kochfeld, Dunstabzug, Hochschrank und integrierte Geräte stimmig eingebaut.",
    cover: `${BASE}/kuechenmontage-nobilia-kueche-schortens-verlegt-verschraubt.jpg-scaled.png`,
    coverAlt: "Weiße Einbauküche in Schortens",
    featured: false,
    media: [
      {
        type: "image",
        src: `${BASE}/kuechenmontage-nobilia-kueche-schortens-verlegt-verschraubt.jpg-scaled.png`,
        alt: "Weiße Einbauküche montiert in Schortens",
        caption: "Weiße Küche mit Arbeitsplatte, Spüle, Kochfeld, Dunstabzug, Hochschrank und integrierten Geräten.",
        phase: "Nachher",
      },
    ],
  },
  {
    slug: "kuechenfolierung-hooksiel",
    title: "Küchenfolierung in Hooksiel – Ferienwohnung",
    ort: "Hooksiel",
    category: "Küchenfolierung",
    description:
      "In einer Ferienwohnung in Hooksiel wurde eine vorhandene Küche durch Folierung optisch aufgewertet – ohne Komplettaustausch.",
    cover: `${BASE}/kuechenmontage-nobilia-kueche-schortens-verlegt-verschraubt.jpg-scaled.png`,
    coverAlt: "Küchenfolierung Ferienwohnung in Hooksiel",
    featured: true,
    media: [
      {
        type: "video",
        src: `${BASE}/kuechenfolierung-hooksiel-verlegt-verschraubt.mp4.mp4`,
        alt: "Video einer Küchenfolierung in einer Ferienwohnung in Hooksiel",
        caption: "Vorhandene Küche optisch aufgefrischt und modernisiert – per Folierung.",
      },
    ],
  },
  {
    slug: "kueche-holzarbeitsplatte-wilhelmshaven",
    title: "Küchenmontage mit Holzarbeitsplatte in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Küchenmontage",
    description:
      "Küche mit weißen Fronten und Holzoptik-Arbeitsplatte in Wilhelmshaven montiert. Spüle, Kochfeld, Hochschrank und Arbeitsbereich sauber eingebaut.",
    cover: `${BASE}/fertige-kueche-montage-wilhelmshaven.jpg-scaled.png`,
    coverAlt: "Küchenmontage mit Holzarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: `${BASE}/fertige-kueche-montage-wilhelmshaven.jpg-scaled.png`,
        alt: "Küchenmontage mit Holzarbeitsplatte in Wilhelmshaven",
        caption: "Weiße Fronten, Holzoptik-Arbeitsplatte, Spüle, Kochfeld – sauberes Gesamtbild.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/screenshot_20251015_121135_kleinanzeigen-high.webp`,
        alt: "Küche mit weißen Fronten und Holzoptik-Arbeitsplatte",
        caption: "Fertige Küche mit weißen Fronten und Holzoptik-Arbeitsplatte.",
        phase: "Nachher",
      },
    ],
  },
  {
    slug: "silikonfuge-wilhelmshaven",
    title: "Silikonfuge an Küchenarbeitsplatte in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Detailarbeiten",
    description:
      "Sauber gezogene Silikonfuge zwischen Küchenarbeitsplatte und Fliesenspiegel. Schützt die Anschlusskante und rundet die Küchenmontage optisch ab.",
    cover: `${BASE}/Silikonarbeit.WHV_-scaled.png`,
    coverAlt: "Silikonfuge an Küchenarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: `${BASE}/Silikonarbeit.WHV_-scaled.png`,
        alt: "Silikonfuge an Küchenarbeitsplatte in Wilhelmshaven",
        caption: "Detailbild einer sauberen Silikonfuge zwischen Arbeitsplatte und Fliesenspiegel.",
        phase: "Detail",
      },
    ],
  },
  {
    slug: "treppenbelag-wilhelmshaven",
    title: "Treppenbelag vorher/nachher in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Treppenbelag",
    description:
      "Erneuerung eines Treppenbelags in Wilhelmshaven. Der Vergleich zeigt, wie stark sich ein Treppenbereich durch einen neuen Belag optisch und funktional verändert.",
    cover: `${BASE}/teppich-treppe-vorher-nachher-wilhelmshaven.jpg-scaled.png`,
    coverAlt: "Treppenbelag vorher und nachher in Wilhelmshaven",
    featured: true,
    media: [
      {
        type: "image",
        src: `${BASE}/treppenbelag-vorher-wilhelmshaven-verlegt-verschraubt.jpg.png`,
        alt: "Treppenbelag vorher in Wilhelmshaven",
        caption: "Vorherbild eines Treppenbereichs mit altem Belag.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: `${BASE}/teppich-treppe-vorher-nachher-wilhelmshaven.jpg-scaled.png`,
        alt: "Treppenbelag vorher und nachher in Wilhelmshaven",
        caption: "Vorher-Nachher-Vergleich der Treppenverlegung.",
        phase: "Nachher",
      },
    ],
  },
  {
    slug: "vinylboden-uebergang-wilhelmshaven",
    title: "Vinylboden-Übergang mit Übergangsschiene in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Detailarbeiten",
    description:
      "Sauber ausgeführter Übergang zwischen zwei Bereichen. Die Übergangsschiene sorgt für einen ordentlichen Abschluss und ein stimmiges Gesamtbild.",
    cover: `${BASE}/vinylboden-diele-uebergangsschiene-wilhelmshaven.jpg.png`,
    coverAlt: "Vinylboden mit Übergangsschiene in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: `${BASE}/vinylboden-diele-uebergangsschiene-wilhelmshaven.jpg.png`,
        alt: "Vinylboden mit sauberem Raumübergang in Wilhelmshaven",
        caption: "Detailbild eines Vinylbodens mit sauber gesetzter Übergangsschiene.",
        phase: "Detail",
      },
    ],
  },
  {
    slug: "bodenverlegung-wohnbereich-wilhelmshaven",
    title: "Bodenverlegung im Wohnbereich in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Bodenverlegung",
    description:
      "Neuer Bodenbelag in Holzoptik im Wohnbereich. Der Raum wirkt ruhiger, moderner und wohnlicher. Übergänge und Abschlüsse sind ordentlich ausgeführt.",
    cover: `${BASE}/Verlegung.WHV_-scaled.jpg`,
    coverAlt: "Bodenverlegung im Wohnbereich in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: `${BASE}/Verlegung.WHV_-scaled.jpg`,
        alt: "Bodenverlegung im Wohnbereich in Wilhelmshaven",
        caption: "Bodenbelag in Holzoptik im Wohnbereich – sauberes Gesamtbild.",
        phase: "Nachher",
      },
    ],
  },
  {
    slug: "vinylboden-wohnraum-wilhelmshaven",
    title: "Vinylboden im Wohnraum in Wilhelmshaven",
    ort: "Wilhelmshaven",
    category: "Bodenverlegung",
    description:
      "Vinylboden im Wohnraum verlegt. Saubere Bodenverlegung im Innenbereich – als Referenz für Wohnräume, Mietwohnungen oder teilmöblierte Bereiche.",
    cover: `${BASE}/bodenleger-wilhelmshaven-vinylboden-verlegt-verlegt-verschraubt.jpg-scaled.png`,
    coverAlt: "Vinylboden in Wilhelmshaven verlegt",
    media: [
      {
        type: "image",
        src: `${BASE}/laminatboden-verlegt-wilhelmshaven-verlegt-verschraubt.jpg.png`,
        alt: "Vinylboden im Wohnraum in Wilhelmshaven",
        caption: "Neu verlegter Boden im Wohnraum.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/bodenleger-wilhelmshaven-vinylboden-verlegt-verlegt-verschraubt.jpg-scaled.png`,
        alt: "Vinylboden in Wilhelmshaven verlegt",
        caption: "Fertig verlegter Vinylboden – sauber an angrenzende Bereiche angepasst.",
        phase: "Nachher",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function projectsByCategory(c: ProjectCategory) {
  return projects.filter((p) => p.category === c);
}

export function projectsByOrt(ort: string) {
  return projects.filter((p) => p.ort.toLowerCase().includes(ort.toLowerCase()));
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
