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
          "Vorbereitungsphase im Erdgeschoss: Der alte Teppichboden inklusive Klebereste wurde komplett entfernt, der Estrich gereinigt, gesaugt und kontrolliert. Sichtbar sind die Reste der alten Verklebung und das eingesetzte Bauwerkzeug (Industriesauger, Spachtel, Schutzfolie). Ein sauberer, ebener Untergrund ist die Grundlage für eine fugendichte und langlebige Vinylverlegung – wir prüfen Ebenheit, Restfeuchte und Saugfähigkeit, bevor neue Dielen verlegt werden.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: "/projects/coldewei-03-vinyl-flur.jpeg",
        alt: "Frisch verlegter Vinylboden in Holzoptik im Flur in Coldewei, Wilhelmshaven",
        caption: "Vinyl in Holzoptik – frisch verlegt im Flur, noch während der Endmontage.",
        longDescription:
          "Frisch verlegter Vinylboden in warmer, rustikaler Holzoptik im Flurbereich. Die Dielen sind sauber im wilden Verband mit versetzten Stößen verlegt, an Türzargen und Glasflächen exakt eingeschnitten. Das Material ist trittschalldämmend, fußwarm und für Mietwohnungen wie für Eigentum gleichermaßen geeignet.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-04-vinyl-flur-treppe.jpeg",
        alt: "Vinylboden im Eingangs- und Treppenbereich in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Übergang zwischen Eingang, Flur und offener Treppe.",
        longDescription:
          "Vinylboden im Eingangs- und Treppenbereich. Die Dielen wurden um die Treppenwange herum exakt zugeschnitten, der Anschluss an die Stufen ist staubdicht ausgeführt. Die Holzoptik nimmt den Farbton der bestehenden Holztreppe auf und sorgt für ein durchgängig ruhiges Gesamtbild im Erdgeschoss.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-05-uebergangsschiene.jpeg",
        alt: "Vinylboden mit sauber gesetzter Übergangsschiene in Coldewei, Wilhelmshaven",
        caption: "Detail: sauber gesetzte Übergangsschiene zwischen zwei Räumen.",
        longDescription:
          "Detailaufnahme eines Raumübergangs: Zwischen Wohnzimmer und Flur wurde eine schmale, weiße Übergangsschiene flächenbündig gesetzt. Sie überbrückt die Dehnungsfuge der schwimmend verlegten Vinyldielen, schützt die Stoßkante vor Aufstemmen und sorgt für einen optisch ruhigen Übergang ohne Stolperkante.",
        phase: "Detail",
      },
      {
        type: "image",
        src: "/projects/coldewei-06-vinyl-wohnzimmer.jpeg",
        alt: "Vinylboden in Holzoptik im Wohnzimmer mit Kaminofen in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Wohnzimmer – ruhiges, modernes Gesamtbild rund um den Kaminofen.",
        longDescription:
          "Vinylboden in heller, gewaschener Holzoptik im Wohnzimmer des Hauses in Coldewei. Die Dielen verlaufen gleichmäßig durch den gesamten Raum, der Kaminofen auf Glas-Funkenschutzplatte ist sauber umfasst. Auch um Heizkörper, Türzargen und das schwere Hemnes-Vitrinenmöbel wurde millimetergenau eingepasst – kein sichtbarer Fugenversatz, keine offenen Anschlüsse.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-07-teppich-2etage.jpeg",
        alt: "Schlingenteppich im Flur der zweiten Etage in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich im Flur- und Treppenpodest der zweiten Etage.",
        longDescription:
          "Schlingenteppich in neutralem Beigegrau im oberen Flurbereich. Der Belag wurde fugenlos um die Holztreppe und an die Zimmertüren angearbeitet, an den Wänden sind frisch montierte weiße Sockelleisten gesetzt. Schlingenteppich ist robust, strapazierfähig und akustisch dämpfend – eine gute Wahl für Schlafetage und Kinderzimmerflur.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-08-teppich-flur.jpeg",
        alt: "Schlingenteppich im oberen Flur mit sauberen Übergängen in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich auf dem Treppenpodest mit sauberen Anschlüssen zu den Zimmern.",
        longDescription:
          "Treppenpodest in der zweiten Etage: Der Schlingenteppich wurde flächig verlegt und an Treppenwange, Wand und beiden Zimmertüren bündig eingeschnitten. Die Anschlüsse zu den angrenzenden Zimmern sind ohne sichtbare Übergangsschiene gelöst – möglich durch denselben Belag in beiden Räumen und sorgfältig gesetzte Klebenähte.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-09-teppich-zimmer.jpeg",
        alt: "Schlingenteppich in einem Dachschrägen-Zimmer in Coldewei, Wilhelmshaven",
        caption: "Fertig verlegter Schlingenteppich in einem Zimmer mit Dachschräge.",
        longDescription:
          "Frisch verlegter Schlingenteppich in einem Zimmer mit Dachschräge in der oberen Etage. Der Belag wurde an die Schräge, an die Sockelleisten und um den Heizkörper sauber eingepasst. Der weiche, schalldämpfende Teppich macht den Raum sofort wohnlich und ist bereit für die Möblierung.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-10-teppich-gehrungen.jpeg",
        alt: "Detail: Schlingenteppich mit sauberen Anschlüssen in Coldewei, Wilhelmshaven",
        caption: "Detailbild: sauber ausgeführte Anschlüsse und Sockelleisten an der Wandkante.",
        longDescription:
          "Detailaufnahme im Schlafzimmer: Der Schlingenteppich liegt fugenlos am weißen Bettgestell und am Hocker an, die weißen Sockelleisten sind auf Gehrung geschnitten und sauber an die Teppichkante gesetzt. Diese Detailarbeit – exakte Gehrungen, dichte Anschlüsse, kein Klaffen an den Ecken – entscheidet über das hochwertige Gesamtbild eines verlegten Bodens.",
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
