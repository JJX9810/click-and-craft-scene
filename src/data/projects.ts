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
  /** Ausführliche, SEO-relevante Beschreibung (Ort, Material, Arbeitsschritte). */
  longDescription?: string;
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
    cover: "/projects/coldewei-06-vinyl-wohnzimmer.jpeg",
    coverAlt: "Vinylboden in Holzoptik im Wohnzimmer in Coldewei, Wilhelmshaven",
    featured: true,
    detail: true,
    media: [
      {
        type: "image",
        src: "/projects/coldewei-01-vorher-flur.jpeg",
        alt: "Vorher: Flur mit Materialkartons vor der Bodenverlegung in Coldewei, Wilhelmshaven",
        caption: "Ausgangszustand im Flur- und Treppenbereich vor Beginn der Bodenverlegung.",
        longDescription:
          "Vorher-Aufnahme aus dem Einfamilienhaus in Coldewei, Wilhelmshaven: Im Flur stehen die angelieferten Vinyldielen und das Verlegezubehör neben der offenen Holztreppe. Der vorhandene Boden ist noch unverändert, Sockelleisten und Wände sind unbeschädigt. Diese Aufnahme dokumentiert den Ausgangszustand vor der Renovierung als Referenz für ein faires Vorher-/Nachher-Vergleichsbild.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: "/projects/coldewei-02-untergrund-vorbereitet.jpeg",
        alt: "Untergrund nach Entfernen des alten Teppichbodens in Coldewei, Wilhelmshaven",
        caption: "Alter Teppich entfernt, Estrich gereinigt und für den neuen Vinylboden vorbereitet.",
        longDescription:
          "Vorbereitungsphase im Erdgeschoss: Der alte Teppichboden inklusive Klebereste wurde komplett entfernt, der Estrich gereinigt, gesaugt und kontrolliert. Sichtbar sind die Reste der alten Verklebung und das eingesetzte Bauwerkzeug. Ein sauberer, ebener Untergrund ist die Grundlage für eine fugendichte und langlebige Vinylverlegung.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: "/projects/coldewei-03-vinyl-flur.jpeg",
        alt: "Frisch verlegter Vinylboden in Holzoptik im Flur in Coldewei, Wilhelmshaven",
        caption: "Vinyl in Holzoptik – frisch verlegt im Flur, noch während der Endmontage.",
        longDescription:
          "Frisch verlegter Vinylboden in warmer Holzoptik im Flurbereich. Die Dielen sind sauber mit versetzten Stößen verlegt und an Türzargen sowie Glasflächen exakt eingeschnitten. Das Material ist pflegeleicht, robust und fußwarm.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-04-vinyl-flur-treppe.jpeg",
        alt: "Vinylboden im Eingangs- und Treppenbereich in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Übergang zwischen Eingang, Flur und offener Treppe.",
        longDescription:
          "Vinylboden im Eingangs- und Treppenbereich des Hauses in Coldewei. Die Dielen wurden präzise um die Treppenwange herum geschnitten, die Anschlüsse sind sauber ausgeführt und fügen sich harmonisch an die bestehende Holztreppe an.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-05-uebergangsschiene.jpeg",
        alt: "Vinylboden mit sauber gesetzter Übergangsschiene in Coldewei, Wilhelmshaven",
        caption: "Detail: sauber gesetzte Übergangsschiene zwischen zwei Räumen.",
        longDescription:
          "Detailaufnahme eines Raumübergangs: Zwischen Flur und Wohnbereich wurde eine schmale, weiße Übergangsschiene flächenbündig gesetzt. Sie schützt die Stoßkante der Vinyldielen und sorgt für einen optisch ruhigen Abschluss ohne Stolperkante.",
        phase: "Detail",
      },
      {
        type: "image",
        src: "/projects/coldewei-06-vinyl-wohnzimmer.jpeg",
        alt: "Vinylboden in Holzoptik im Wohnzimmer mit Kaminofen in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Wohnzimmer – ruhiges, modernes Gesamtbild rund um den Kaminofen.",
        longDescription:
          "Vinylboden in heller Holzoptik im Wohnzimmer des Hauses in Coldewei. Der Boden läuft gleichmäßig durch den Raum, wurde sauber an Kaminofen, Heizkörper, Türzargen und Möbel angepasst und verleiht dem Zimmer ein modernes, ruhiges Gesamtbild.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-07-teppich-2etage.jpeg",
        alt: "Schlingenteppich im Flur der zweiten Etage in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich im Flur- und Treppenpodest der zweiten Etage.",
        longDescription:
          "Schlingenteppich in neutralem Beigegrau im oberen Flurbereich. Der Belag wurde sauber entlang der Treppe und an den Zimmertüren eingepasst. Weiße Sockelleisten fassen die Fläche sauber ein und sorgen für ein ordentliches Finish.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-08-teppich-flur.jpeg",
        alt: "Schlingenteppich im oberen Flur mit sauberen Übergängen in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich auf dem Treppenpodest mit sauberen Anschlüssen zu den Zimmern.",
        longDescription:
          "Treppenpodest in der zweiten Etage: Der Schlingenteppich wurde flächig verlegt und bündig an Wände, Zargen und den Übergang zur Treppe gearbeitet. Das Ergebnis ist robust, angenehm begehbar und optisch ruhig.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-09-teppich-zimmer.jpeg",
        alt: "Schlingenteppich in einem Dachschrägen-Zimmer in Coldewei, Wilhelmshaven",
        caption: "Fertig verlegter Schlingenteppich in einem Zimmer mit Dachschräge.",
        longDescription:
          "Frisch verlegter Schlingenteppich in einem Zimmer mit Dachschräge in der oberen Etage. Der Belag wurde sauber an die Schräge, um den Heizkörper und an die Sockelleisten angepasst und macht den Raum sofort wohnlich.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-10-teppich-gehrungen.jpeg",
        alt: "Detail: Schlingenteppich mit sauberen Anschlüssen in Coldewei, Wilhelmshaven",
        caption: "Detailbild: sauber ausgeführte Anschlüsse und Sockelleisten an der Wandkante.",
        longDescription:
          "Detailaufnahme im Schlafzimmer: Der Schlingenteppich liegt sauber an Möbeln und Sockelleisten an. Die exakten Anschlüsse und das ruhige Verlegebild zeigen die sorgfältige Ausführung im Detail.",
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
    cover: "/projects/kuechen-schortens-01.png",
    coverAlt: "Weiße Küchenmontage in Schortens mit dunkler Arbeitsplatte und schwarzer Spüle",
    featured: true,
    media: [
      {
        type: "image",
        src: "/projects/kuechen-schortens-01.png",
        alt: "Weiße L-förmige Küche nach der Montage in Schortens",
        caption: "Fertig montierte Küchenzeile in Schortens mit dunkler Arbeitsplatte und schwarzer Spüle.",
        longDescription:
          "Montierte Küche in Schortens mit weißen Fronten, dunkler Arbeitsplatte in Holzoptik, schwarzer Spüle und Kochfeld. Die Schränke wurden sauber ausgerichtet, die Fugen verlaufen ruhig und die Fronten bilden ein einheitliches Gesamtbild. Die Montage eignet sich als Referenz für Umzugsküchen, Mietwohnungen und Bestandsimmobilien.",
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
        longDescription:
          "Moderne weiße Einbauküche in Schortens mit Hochschrank, integrierten Geräten und klaren Linien. Dieses Bild wird im nächsten Upload-Paket noch auf eine lokale Datei umgestellt.",
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
        longDescription:
          "Kurzvideo einer Küchenfolierung in Hooksiel. Das Material folgt im nächsten Upload-Paket als lokale Datei, damit auch dieses Projekt domain-sicher ausgeliefert wird.",
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
    cover: "/projects/kueche-wilhelmshaven-01.png",
    coverAlt: "Küchenmontage mit Holzarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/kueche-wilhelmshaven-01.png",
        alt: "Weiße Küche mit Holzarbeitsplatte nach der Montage in Wilhelmshaven",
        caption: "Fertig montierte U-Küche in Wilhelmshaven mit weißen Fronten und heller Holzarbeitsplatte.",
        longDescription:
          "Küchenmontage in Wilhelmshaven: Zu sehen ist eine helle U-förmige Einbauküche mit weißen Fronten, Holzarbeitsplatte, Spülbecken unter dem Fenster sowie integriertem Backofen und Kochfeld. Die Montage wurde sauber ausgerichtet, die Frontfugen verlaufen gleichmäßig und die Arbeitsplatte bildet einen ruhigen, hochwertigen Abschluss.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/kueche-wilhelmshaven-02.webp",
        alt: "Weiße Küche mit Holzrückwand und Holzarbeitsplatte in Wilhelmshaven",
        caption: "Weitere Küchenansicht aus Wilhelmshaven mit Holzrückwand, Geräten und großzügiger Arbeitsfläche.",
        longDescription:
          "Zweite Referenzansicht der Küche in Wilhelmshaven: Weiße Fronten treffen auf eine warme Holzarbeitsplatte und eine passende Rückwand. Backofen, Kühlschrank und Dunstabzug sind stimmig integriert. Die Aufnahme zeigt das Projekt aus einer anderen Perspektive und unterstreicht die saubere Linienführung der Montage.",
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
    cover: "/projects/silikonfuge-wilhelmshaven-01.png",
    coverAlt: "Silikonfuge an Küchenarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/silikonfuge-wilhelmshaven-01.png",
        alt: "Sauber gezogene weiße Silikonfuge zwischen Arbeitsplatte und Fliesenspiegel in Wilhelmshaven",
        caption: "Detailbild einer gleichmäßig gezogenen Silikonfuge an der Küchenarbeitsplatte.",
        longDescription:
          "Detailaufnahme aus einer Küche in Wilhelmshaven: Zwischen dunkler Arbeitsplatte und weißem Fliesenspiegel wurde eine saubere, gleichmäßige Sanitär-Silikonfuge gezogen. Die Fuge schützt die Anschlusskante vor Feuchtigkeit, dichtet den Übergang dauerhaft ab und sorgt für einen hochwertigen Gesamteindruck der Küchenmontage.",
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
    cover: "/projects/treppenbelag-wilhelmshaven-02-vorher-nachher.png",
    coverAlt: "Treppenbelag vorher und nachher in Wilhelmshaven",
    featured: true,
    media: [
      {
        type: "image",
        src: "/projects/treppenbelag-wilhelmshaven-01-vorher.png",
        alt: "Vorherbild einer mit Teppich belegten Holztreppe in Wilhelmshaven",
        caption: "Vorher: bestehender Treppenbelag im Altzustand vor der Erneuerung.",
        longDescription:
          "Vorheraufnahme einer Holztreppe in Wilhelmshaven mit älterem, braun gemustertem Treppenbelag. Die Aufnahme dokumentiert den Zustand vor der Sanierung und dient als Vergleich zur späteren Neuverlegung des Belags auf Stufen und Podesten.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: "/projects/treppenbelag-wilhelmshaven-02-vorher-nachher.png",
        alt: "Vorher-Nachher-Vergleich einer Treppe mit neuem Belag in Wilhelmshaven",
        caption: "Vorher-Nachher-Vergleich der Treppenverlegung in Wilhelmshaven.",
        longDescription:
          "Direkter Vergleich zwischen Altbelag und neuem Treppenbelag in Wilhelmshaven. Während links der alte, abgenutzte Belag zu sehen ist, zeigt die rechte Hälfte die modernisierte Treppe mit gleichmäßig verlegtem, dunklerem Belag und sauberem Anschluss an Wangen und Podeste. Das Bild eignet sich ideal für SEO-relevante Vorher-Nachher-Referenzen im Bereich Treppenrenovierung.",
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
    cover: "/projects/vinyl-uebergang-wilhelmshaven-01.png",
    coverAlt: "Vinylboden mit Übergangsschiene in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/vinyl-uebergang-wilhelmshaven-01.png",
        alt: "Dunkler Vinylboden mit sauber gesetzter Übergangsschiene in Wilhelmshaven",
        caption: "Detailbild eines dunklen Vinylbodens mit sauber ausgeführtem Raumübergang.",
        longDescription:
          "Detailreferenz aus Wilhelmshaven: Ein dunkler Vinyl- bzw. Laminatboden wurde in Längsrichtung verlegt und an einem Durchgang mit einer schmalen Übergangsschiene sauber abgeschlossen. Das Bild zeigt die Präzision bei Türdurchgängen und Bodenanschlüssen – ein wichtiges Qualitätsmerkmal bei der Bodenverlegung.",
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
    cover: "/projects/verlegung-wilhelmshaven-01.jpg",
    coverAlt: "Bodenverlegung im Wohnbereich in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/verlegung-wilhelmshaven-01.jpg",
        alt: "Wohnbereich mit neu verlegtem Boden in Holzoptik in Wilhelmshaven",
        caption: "Bodenbelag in Holzoptik im Wohnbereich – sauber verlegt und wohnlich inszeniert.",
        longDescription:
          "Wohnbereich in Wilhelmshaven mit neu verlegtem Boden in dunkler Holzoptik. Das Bild zeigt, wie der Boden den Raum optisch aufwertet und mit weißen Sockelleisten, Türen und Einrichtung harmoniert. Die Verlegung wirkt ruhig, gleichmäßig und sauber an den Übergängen ausgeführt.",
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
    cover: "/projects/vinyl-wohnraum-wilhelmshaven-01.png",
    coverAlt: "Vinylboden im Wohnraum in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/vinyl-wohnraum-wilhelmshaven-01.png",
        alt: "Heller Wohnraum mit neu verlegtem Boden in Wilhelmshaven",
        caption: "Neu verlegter Boden im Wohnraum – großformatig, ruhig und gleichmäßig verlegt.",
        longDescription:
          "Referenzbild eines Wohnraums in Wilhelmshaven mit neu verlegtem Boden in grauer Holzoptik. Der große Raum wirkt durch das einheitliche Verlegebild offen und modern. Die Dielen laufen sauber bis an Heizkörper, Wände und Durchgang, was den hochwertigen Gesamteindruck unterstreicht.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: `${BASE}/bodenleger-wilhelmshaven-vinylboden-verlegt-verlegt-verschraubt.jpg-scaled.png`,
        alt: "Vinylboden in Wilhelmshaven verlegt",
        caption: "Weitere Ansicht des fertig verlegten Vinylbodens in Wilhelmshaven.",
        longDescription:
          "Zusätzliche Referenzansicht des Projekts in Wilhelmshaven. Diese Datei wird mit dem nächsten Bildpaket ebenfalls noch auf eine lokale Projektdatei umgestellt.",
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
