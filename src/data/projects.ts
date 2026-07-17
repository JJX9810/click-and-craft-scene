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
  /** Echtes Vorher-/Nachher-Bildpaar für den Slider. Nur setzen, wenn beide Bilder aus demselben Blickwinkel entstanden sind. */
  beforeAfter?: { before: string; after: string; alt: string };
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
    cover: "/projects/coldewei-06-vinyl-wohnzimmer.webp",
    coverAlt: "Vinylboden in Holzoptik im Wohnzimmer in Coldewei, Wilhelmshaven",
    featured: true,
    detail: true,
    beforeAfter: {
      before: "/projects/coldewei-01-vorher-flur.webp",
      after: "/projects/coldewei-04-vinyl-flur-treppe.webp",
      alt: "Vorher-Nachher-Vergleich: Flur mit Treppe in Coldewei – vorher Altzustand, nachher neuer Vinylboden",
    },
    
    media: [
      {
        type: "image",
        src: "/projects/coldewei-01-vorher-flur.webp",
        alt: "Vorher: Flur mit Materialkartons vor der Bodenverlegung in Coldewei, Wilhelmshaven",
        caption: "Ausgangszustand im Flur- und Treppenbereich vor Beginn der Bodenverlegung.",
        longDescription:
          "Vorher-Aufnahme aus dem Einfamilienhaus in Coldewei, Wilhelmshaven: Im Flur stehen die angelieferten Vinyldielen und das Verlegezubehör neben der offenen Holztreppe. Der vorhandene Boden ist noch unverändert, Sockelleisten und Wände sind unbeschädigt. Diese Aufnahme dokumentiert den Ausgangszustand vor der Renovierung als Referenz für ein faires Vorher-/Nachher-Vergleichsbild.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: "/projects/coldewei-02-untergrund-vorbereitet.webp",
        alt: "Untergrund nach Entfernen des alten Teppichbodens in Coldewei, Wilhelmshaven",
        caption: "Alter Teppich entfernt, Estrich gereinigt und für den neuen Vinylboden vorbereitet.",
        longDescription:
          "Vorbereitungsphase im Erdgeschoss: Der alte Teppichboden inklusive Klebereste wurde komplett entfernt, der Estrich gereinigt, gesaugt und kontrolliert. Sichtbar sind die Reste der alten Verklebung und das eingesetzte Bauwerkzeug. Ein sauberer, ebener Untergrund ist die Grundlage für eine fugendichte und langlebige Vinylverlegung.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: "/projects/coldewei-03-vinyl-flur.webp",
        alt: "Frisch verlegter Vinylboden in Holzoptik im Flur in Coldewei, Wilhelmshaven",
        caption: "Vinyl in Holzoptik – frisch verlegt im Flur, noch während der Endmontage.",
        longDescription:
          "Frisch verlegter Vinylboden in warmer Holzoptik im Flurbereich. Die Dielen sind sauber mit versetzten Stößen verlegt und an Türzargen sowie Glasflächen exakt eingeschnitten. Das Material ist pflegeleicht, robust und fußwarm.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-04-vinyl-flur-treppe.webp",
        alt: "Vinylboden im Eingangs- und Treppenbereich in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Übergang zwischen Eingang, Flur und offener Treppe.",
        longDescription:
          "Vinylboden im Eingangs- und Treppenbereich des Hauses in Coldewei. Die Dielen wurden präzise um die Treppenwange herum geschnitten, die Anschlüsse sind sauber ausgeführt und fügen sich harmonisch an die bestehende Holztreppe an.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-05-uebergangsschiene.webp",
        alt: "Vinylboden mit sauber gesetzter Übergangsschiene in Coldewei, Wilhelmshaven",
        caption: "Detail: sauber gesetzte Übergangsschiene zwischen zwei Räumen.",
        longDescription:
          "Detailaufnahme eines Raumübergangs: Zwischen Flur und Wohnbereich wurde eine schmale, weiße Übergangsschiene flächenbündig gesetzt. Sie schützt die Stoßkante der Vinyldielen und sorgt für einen optisch ruhigen Abschluss ohne Stolperkante.",
        phase: "Detail",
      },
      {
        type: "image",
        src: "/projects/coldewei-06-vinyl-wohnzimmer.webp",
        alt: "Vinylboden in Holzoptik im Wohnzimmer mit Kaminofen in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Wohnzimmer – ruhiges, modernes Gesamtbild rund um den Kaminofen.",
        longDescription:
          "Vinylboden in heller Holzoptik im Wohnzimmer des Hauses in Coldewei. Der Boden läuft gleichmäßig durch den Raum, wurde sauber an Kaminofen, Heizkörper, Türzargen und Möbel angepasst und verleiht dem Zimmer ein modernes, ruhiges Gesamtbild.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-07-teppich-2etage.webp",
        alt: "Schlingenteppich im Flur der zweiten Etage in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich im Flur- und Treppenpodest der zweiten Etage.",
        longDescription:
          "Schlingenteppich in neutralem Beigegrau im oberen Flurbereich. Der Belag wurde sauber entlang der Treppe und an den Zimmertüren eingepasst. Weiße Sockelleisten fassen die Fläche sauber ein und sorgen für ein ordentliches Finish.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-08-teppich-flur.webp",
        alt: "Schlingenteppich im oberen Flur mit sauberen Übergängen in Coldewei, Wilhelmshaven",
        caption: "Schlingenteppich auf dem Treppenpodest mit sauberen Anschlüssen zu den Zimmern.",
        longDescription:
          "Treppenpodest in der zweiten Etage: Der Schlingenteppich wurde flächig verlegt und bündig an Wände, Zargen und den Übergang zur Treppe gearbeitet. Das Ergebnis ist robust, angenehm begehbar und optisch ruhig.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-09-teppich-zimmer.webp",
        alt: "Schlingenteppich in einem Dachschrägen-Zimmer in Coldewei, Wilhelmshaven",
        caption: "Fertig verlegter Schlingenteppich in einem Zimmer mit Dachschräge.",
        longDescription:
          "Frisch verlegter Schlingenteppich in einem Zimmer mit Dachschräge in der oberen Etage. Der Belag wurde sauber an die Schräge, um den Heizkörper und an die Sockelleisten angepasst und macht den Raum sofort wohnlich.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-10-teppich-gehrungen.webp",
        alt: "Detail: Schlingenteppich mit sauberen Anschlüssen in Coldewei, Wilhelmshaven",
        caption: "Detailbild: sauber ausgeführte Anschlüsse und Sockelleisten an der Wandkante.",
        longDescription:
          "Detailaufnahme im Schlafzimmer: Der Schlingenteppich liegt sauber an Möbeln und Sockelleisten an. Die exakten Anschlüsse und das ruhige Verlegebild zeigen die sorgfältige Ausführung im Detail.",
        phase: "Detail",
      },
      {
        type: "image",
        src: "/projects/coldewei-11-untergrund-flur.webp",
        alt: "Freigelegter Untergrund im Eingangsbereich in Coldewei vor der neuen Bodenverlegung",
        caption: "Vorbereitung im Flur: Altbelag entfernt und Untergrund für den neuen Boden freigelegt.",
        longDescription:
          "Zusätzliche Vorher-Aufnahme aus Coldewei: Im Eingangsbereich wurde der alte Belag entfernt, der Untergrund sichtbar gemacht und für die weitere Bodenverlegung vorbereitet. Die Aufnahme dokumentiert den Sanierungszustand rund um Treppe und Flur.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: "/projects/coldewei-12-teppich-podest.webp",
        alt: "Schlingenteppich auf dem Podest in der oberen Etage in Coldewei, Wilhelmshaven",
        caption: "Obere Etage mit fertig verlegtem Schlingenteppich am Podest und in den Zimmerzugängen.",
        longDescription:
          "Weiteres Referenzbild der oberen Etage in Coldewei: Der Schlingenteppich wurde sauber bis an die Türzargen und entlang der Treppe geführt. Das Bild zeigt die ruhige Wirkung des Belags auf dem Podestbereich.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-13-vinyl-flur-treppe-oben.webp",
        alt: "Vinylboden im Flur und an der offenen Treppe in Coldewei, Wilhelmshaven",
        caption: "Vinylboden im Flur mit sauberem Anschluss an Treppe und angrenzende Räume.",
        longDescription:
          "Diese Aufnahme zeigt den fertig verlegten Vinylboden im Flur von Coldewei aus erhöhter Perspektive. Sichtbar sind die exakten Anschlüsse an die offene Holztreppe sowie die gleichmäßige Verlegung bis in die angrenzenden Räume.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/coldewei-14-uebergangsschiene-detail.webp",
        alt: "Detail einer weißen Übergangsschiene zwischen zwei Bodenbereichen in Coldewei",
        caption: "Detailaufnahme der Übergangsschiene zwischen Flur und angrenzendem Raum.",
        longDescription:
          "Nahaufnahme eines sauber ausgeführten Bodenübergangs in Coldewei. Die weiße Übergangsschiene bildet einen ordentlichen Abschluss zwischen zwei Bereichen und unterstreicht die präzise Detailarbeit der Verlegung.",
        phase: "Detail",
      },
      {
        type: "image",
        src: "/projects/coldewei-15-untergrund-material.webp",
        alt: "Vorbereitung im Flur mit Material und freigelegtem Untergrund in Coldewei",
        caption: "Sanierungsphase im Flur mit vorbereitetem Untergrund und angeliefertem Material.",
        longDescription:
          "Weitere Dokumentation der Vorbereitungsarbeiten in Coldewei: Im Flur liegt der freigelegte Untergrund bereit, während das Material für die nachfolgende Boden- und Teppichverlegung bereits vor Ort ist.",
        phase: "Vorbereitung",
      },
      {
        type: "image",
        src: "/projects/coldewei-16-vinyl-wohnzimmer-kamin.webp",
        alt: "Vinylboden im Wohnzimmer mit Kaminofen in Coldewei, Wilhelmshaven",
        caption: "Wohnzimmeransicht mit fertig verlegtem Vinylboden rund um den Kaminofen.",
        longDescription:
          "Zusätzliche Nachher-Aufnahme aus dem Wohnzimmer in Coldewei. Der Vinylboden in Holzoptik läuft sauber durch den Raum und wirkt besonders harmonisch im Bereich rund um den freistehenden Kaminofen.",
        phase: "Nachher",
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
    cover: "/projects/kuechen-schortens-01.webp",
    coverAlt: "Weiße Küchenmontage in Schortens mit dunkler Arbeitsplatte und schwarzer Spüle",
    featured: true,
    media: [
      {
        type: "image",
        src: "/projects/kuechen-schortens-01.webp",
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
    cover: "/projects/kueche-schortens-modern-02.webp",
    coverAlt: "Weiße Einbauküche in Schortens mit grifflosen Fronten und integrierten Geräten",
    featured: false,
    media: [
      {
        type: "image",
        src: "/projects/kueche-schortens-modern-02.webp",
        alt: "Moderne weiße Einbauküche mit schwarzem Geräteblock in Schortens",
        caption: "Moderne Einbauküche in Schortens mit klaren Fronten, Gerätehochschrank und Holzoptikboden.",
        longDescription:
          "Diese in Schortens montierte Einbauküche zeigt eine minimalistische Linienführung mit weißen Fronten, integrierten Siemens-Geräten, beleuchtetem Arbeitsbereich und hochwertigem Boden in Holzoptik. Die Montage wurde präzise ausgerichtet und sauber abgeschlossen.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/kueche-schortens-modern-01.webp",
        alt: "Weiße L-Küche mit grauer Arbeitsplatte in Schortens",
        caption: "Zweite Perspektive der weißen Einbauküche mit langer Zeile und Hochschrank.",
        longDescription:
          "Weitere Ansicht der modernen Küchenmontage in Schortens. Sichtbar sind die durchgehende graue Arbeitsplatte, die klare Frontaufteilung und die großzügige Raumsituation mit offener Anbindung an den Wohnbereich.",
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
    cover: "/projects/kuechenfolierung-hooksiel-poster.webp",
    coverAlt: "Küchenfolierung in einer Ferienwohnung in Hooksiel",
    featured: true,
    media: [
      {
        type: "video",
        src: "/projects/kuechenfolierung-hooksiel.mp4",
        alt: "Video einer Küchenfolierung in einer Ferienwohnung in Hooksiel",
        caption: "Vorhandene Küche optisch aufgefrischt und modernisiert – per Folierung.",
        longDescription:
          "Kurzvideo aus Hooksiel: In einer Ferienwohnung wurde eine bestehende Küche durch Folierung modernisiert. Das Projekt zeigt die optische Aufwertung ohne kompletten Küchenaustausch und ist jetzt vollständig als lokale Datei eingebunden.",
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
    cover: "/projects/kueche-wilhelmshaven-01.webp",
    coverAlt: "Küchenmontage mit Holzarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/kueche-wilhelmshaven-01.webp",
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
    cover: "/projects/silikonfuge-wilhelmshaven-01.webp",
    coverAlt: "Silikonfuge an Küchenarbeitsplatte in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/silikonfuge-wilhelmshaven-01.webp",
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
    cover: "/projects/treppenbelag-wilhelmshaven-02-vorher-nachher.webp",
    coverAlt: "Treppenbelag vorher und nachher in Wilhelmshaven",
    featured: true,
    media: [
      {
        type: "image",
        src: "/projects/treppenbelag-wilhelmshaven-01-vorher.webp",
        alt: "Vorherbild einer mit Teppich belegten Holztreppe in Wilhelmshaven",
        caption: "Vorher: bestehender Treppenbelag im Altzustand vor der Erneuerung.",
        longDescription:
          "Vorheraufnahme einer Holztreppe in Wilhelmshaven mit älterem, braun gemustertem Treppenbelag. Die Aufnahme dokumentiert den Zustand vor der Sanierung und dient als Vergleich zur späteren Neuverlegung des Belags auf Stufen und Podesten.",
        phase: "Vorher",
      },
      {
        type: "image",
        src: "/projects/treppenbelag-wilhelmshaven-02-vorher-nachher.webp",
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
    cover: "/projects/vinyl-uebergang-wilhelmshaven-01.webp",
    coverAlt: "Vinylboden mit Übergangsschiene in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/vinyl-uebergang-wilhelmshaven-01.webp",
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
    cover: "/projects/verlegung-wilhelmshaven-01.webp",
    coverAlt: "Bodenverlegung im Wohnbereich in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/verlegung-wilhelmshaven-01.webp",
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
    cover: "/projects/vinyl-wohnraum-wilhelmshaven-01.webp",
    coverAlt: "Vinylboden im Wohnraum in Wilhelmshaven",
    media: [
      {
        type: "image",
        src: "/projects/vinyl-wohnraum-wilhelmshaven-01.webp",
        alt: "Heller Wohnraum mit neu verlegtem Boden in Wilhelmshaven",
        caption: "Neu verlegter Boden im Wohnraum – großformatig, ruhig und gleichmäßig verlegt.",
        longDescription:
          "Referenzbild eines Wohnraums in Wilhelmshaven mit neu verlegtem Boden in grauer Holzoptik. Der große Raum wirkt durch das einheitliche Verlegebild offen und modern. Die Dielen laufen sauber bis an Heizkörper, Wände und Durchgang, was den hochwertigen Gesamteindruck unterstreicht.",
        phase: "Nachher",
      },
      {
        type: "image",
        src: "/projects/vinyl-wohnraum-wilhelmshaven-02.webp",
        alt: "Großer Wohnraum mit fertig verlegtem Vinylboden in Wilhelmshaven",
        caption: "Weitere Referenzansicht des verlegten Vinylbodens im Wohnraum in Wilhelmshaven.",
        longDescription:
          "Zusätzliche Nachher-Aufnahme aus Wilhelmshaven: Der Vinylboden in grauer Holzoptik wurde großflächig und gleichmäßig verlegt. Die Perspektive zeigt die ruhige Raumwirkung und die sauberen Anschlüsse im offenen Wohnbereich.",
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
