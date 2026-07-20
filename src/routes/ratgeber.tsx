import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

const URL = "https://verlegt-verschraubt.de/ratgeber";

/** Neue Ratgeber hier eintragen – die Übersicht wächst automatisch mit. */
const guides = [
  {
    to: "/kueche-umzug-checkliste",
    eyebrow: "Küchenmontage",
    title: "Küche umziehen: Die komplette Checkliste",
    teaser:
      "Vom Lohnt-sich-Check über die richtige Demontage-Reihenfolge bis zum Funktionstest – der komplette Küchenumzug Schritt für Schritt, inklusive Kosten und Steuer-Tipp.",
  },
  {
    to: "/entruempelung-kosten",
    eyebrow: "Entrümpelung",
    title: "Was kostet eine Entrümpelung?",
    teaser:
      "Realistische Preisspannen, die vier echten Preisfaktoren, Warnsignale unseriöser Anbieter – und warum ein verbindliches Angebot nach Besichtigung fairer ist als jeder Telefon-Festpreis.",
  },
  {
    to: "/renovierung-reihenfolge",
    eyebrow: 'Renovierung',
    title: 'Renovierung: die richtige Reihenfolge der Gewerke',
    teaser:
      'Erst Elektrik, dann Wände, dann Boden – und die Küche zum Schluss? Die bewährte Reihenfolge, die teure Doppelarbeit verhindert, Schritt für Schritt erklärt.',
  },
  {
    to: "/boden-selbst-verlegen",
    eyebrow: 'Bodenverlegung',
    title: 'Boden selbst verlegen oder verlegen lassen?',
    teaser:
      'Klick-Laminat kann fast jeder – oder? Die ehrliche Grenze zwischen Wochenendprojekt und Handwerkerjob, mit Rechenbeispiel und den drei Aufgaben, an denen Selbermacher scheitern.',
  },
  {
    to: "/gebrauchte-kueche-kaufen",
    eyebrow: 'Küchenmontage',
    title: 'Gebrauchte Küche kaufen: Die Checkliste',
    teaser:
      'Kleinanzeigen-Küchen können Schnäppchen oder Geldgräber sein. Worauf Sie bei Besichtigung, Maßen und Geräten achten – vom Monteur, der sie regelmäßig ab- und wieder aufbaut.',
  },
  {
    to: "/haushaltsaufloesung-nachlass",
    eyebrow: 'Entrümpelung',
    title: 'Haushaltsauflösung im Trauerfall: Schritt für Schritt',
    teaser:
      'Wenn eine Wohnung aufgelöst werden muss, während die Trauer noch frisch ist: der einfühlsame, praktische Leitfaden – von den Fristen über das Sortieren bis zur besenreinen Übergabe.',
  },
  {
    to: "/bodenverlegung-kosten",
    eyebrow: 'Bodenverlegung',
    title: 'Was kostet Bodenverlegung? Alle Posten erklärt',
    teaser:
      'Verlegen ab 16 €/m² – aber was kommt dazu? Altbelag, Spachteln, Sockelleisten, Anfahrt: jede Position transparent erklärt, mit Rechenbeispiel für ein 25-m²-Wohnzimmer.',
  },
  {
    to: "/vinyl-oder-laminat",
    eyebrow: "Bodenverlegung",
    title: "Vinyl oder Laminat – was passt zu welchem Raum?",
    teaser:
      "Feuchtigkeit, Trittschall, Aufbauhöhe, Kosten: der ehrliche Vergleich vom Bodenleger – mit klaren Empfehlungen für Küche, Bad, Wohn- und Schlafräume.",
  },
];

export const Route = createFileRoute("/ratgeber")({
  component: RatgeberUebersicht,
  head: () => ({
    meta: [
      { title: "Ratgeber – Ehrliches Handwerkerwissen aus Wilhelmshaven" },
      {
        name: "description",
        content:
          "Der Ratgeber von Verlegt & Verschraubt: ehrliche Antworten auf die häufigsten Fragen zu Bodenverlegung, Küchenmontage, Entrümpelung und Renovierung – mit echten Zahlen statt Werbefloskeln.",
      },
      { property: "og:title", content: "Ratgeber – Ehrliches Handwerkerwissen aus Wilhelmshaven" },
      {
        property: "og:description",
        content:
          "Ehrliche Antworten auf die häufigsten Handwerker-Fragen – von Bodenverlegung bis Entrümpelung.",
      },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Ratgeber von Verlegt & Verschraubt Handwerkerservice Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ratgeber – Ehrliches Handwerkerwissen aus Wilhelmshaven" },
      {
        name: "twitter:description",
        content:
          "Ehrliche Antworten auf die häufigsten Handwerker-Fragen – von Bodenverlegung bis Entrümpelung.",
      },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: URL,
          name: "Ratgeber – Ehrliches Handwerkerwissen aus Wilhelmshaven",
          description:
            "Ratgeber-Übersicht von Verlegt & Verschraubt: ehrliche Antworten zu Bodenverlegung, Küchenmontage, Entrümpelung und Renovierung in Wilhelmshaven und Umgebung.",
        }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: URL },
        ]),
      ]),
    ],
  }),
});

function RatgeberUebersicht() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Ehrliches Handwerkerwissen. Ohne Werbefloskeln."
        intro="Hier beantworten wir die Fragen, die uns Kunden am häufigsten stellen – so, wie wir sie auch am Telefon beantworten: mit echten Zahlen, klaren Empfehlungen und ehrlichen Grenzen. Die Sammlung wächst laufend."
      />

      <Section eyebrow="Alle Ratgeber" title="Aktuelle Beiträge" bordered>
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.45)]"
            >
              <span className="text-xs uppercase tracking-[0.22em] text-accent">{g.eyebrow}</span>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug">{g.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{g.teaser}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                Ratgeber lesen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Ihre Frage ist nicht dabei? Schreiben Sie uns per WhatsApp – die besten
          Kundenfragen werden hier zum nächsten Ratgeber.
        </p>
      </Section>

      <CtaBlock
        title="Lieber direkt fragen?"
        text="Fotos und Fragen per WhatsApp – ehrliche Einschätzung meist am selben Werktag."
      />
    </>
  );
}
