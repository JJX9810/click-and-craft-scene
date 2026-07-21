import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/bodenverlegung-kosten";

const fragen = [
  {
    frage: 'Der Verlegelohn: Warum kostet Vinyl mehr als Laminat?',
    antwort:
      'Der Lohn richtet sich nach Aufwand und Fehlertoleranz: Klick-Laminat (16 €/m²) verzeiht kleine Ungenauigkeiten, Klick-Vinyl (18 €/m²) ist dünner und zeigt jede Untergrund-Schwäche, vollflächig verklebtes Vinyl (22 €/m²) verlangt perfekten Untergrund, sauberen Kleberauftrag und Erfahrung mit offenen Zeiten. Teppich lose liegt bei 10 €/m², verklebt bei 12 €/m², PVC bei 12–15 €/m².',
  },
  {
    frage: "Altbelag entfernen: Wovon hängen die 'ab 4 €' ab?",
    antwort:
      'Schwimmend verlegtes Laminat ist schnell raus (ab 4 €/m²). Verklebte Beläge und vor allem alter Teppich mit Kleberresten sind Handarbeit mit Spachtel und Geduld – hier gelten höhere Sätze und Mindestbeträge, weil auch ein kleiner Raum Stunden kosten kann. Die Entsorgung des Altbelags organisieren wir auf Wunsch gleich mit.',
  },
  {
    frage: 'Spachteln: Die wichtigste Position, die keiner einplant',
    antwort:
      "19 €/m² inklusive Grundierung – und der Posten, der über das Endergebnis entscheidet. Unebenheiten über 2–3 mm pro Meter drücken sich durch jeden Belag, lassen Klick-Böden knarzen und Vinyl jede Welle nachzeichnen. Ob gespachtelt werden muss, zeigt erst der freigelegte Untergrund – deshalb steht diese Position in seriösen Angeboten als 'nach Befund'.",
  },
  {
    frage: 'Sockelleisten: Standard oder Gehrung?',
    antwort:
      'Montage 5 €/lfm mit Eckstücken – oder 7 €/lfm auf Gehrung gesägt: Dabei werden die Leisten in den Ecken im 45-Grad-Winkel exakt aufeinander zugeschnitten, ohne Plastik-Eckstücke. Das ist der Unterschied, den man in jedem Raum sofort sieht, und unser meistgebuchtes Premium-Detail.',
  },
  {
    frage: 'Anfahrt, Material, Kleinkram: Was kommt noch dazu?',
    antwort:
      "Anfahrt ist bis 30 km ab Wilhelmshaven frei, darüber 0,70 €/km. Material (Boden, Leisten, Dämmung) kaufen Sie selbst – oder wir übernehmen die Beschaffung als Service (15 % vom Materialwert, mindestens 150 €): mit Handwerker-Blick eingekauft, geliefert, Reste zurückgeführt. Versteckte Posten wie 'Baustelleneinrichtung' gibt es bei uns nicht.",
  },
  {
    frage: 'Das komplette Rechenbeispiel: 25-m²-Wohnzimmer',
    antwort:
      'Laminat verlegen 25 m² × 16 € = 400 €. Alten Teppich entfernen: 180 € (Mindestbetrag). Trittschalldämmung 25 m² × 1,50 € = 37,50 €. Sockelleisten 20 lfm × 5 € = 100 €. Summe Arbeitslohn: rund 720 € – gemäß § 19 UStG ohne ausgewiesene Umsatzsteuer. Muss zusätzlich gespachtelt werden, kommen bis zu 475 € dazu. Ihr konkreter Fall: zwei Minuten im Kostenrechner.',
  },
];

export const Route = createFileRoute("/bodenverlegung-kosten")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Was kostet Bodenverlegung? Alle Posten transparent erklärt' },
      { name: "description", content: 'Bodenverlegung Kosten transparent: Laminat 16 €/m², Vinyl 18–22 €/m², dazu Altbelag entfernen, Spachteln (19 €/m²), Sockelleisten (5 €/lfm). Mit komplettem Rechenbeispiel für 25 m² – vom Bodenleger aus Wilhelmshaven.' },
      { property: "og:title", content: 'Was kostet Bodenverlegung? Alle Posten transparent erklärt' },
      { property: "og:description", content: 'Laminat 16 €/m², Vinyl 18–22 €/m², alle Zusatzposten erklärt, komplettes Rechenbeispiel – die transparente Kostenaufstellung vom Bodenleger.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Was kostet Bodenverlegung? Alle Posten transparent erklärt' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Was kostet Bodenverlegung? Alle Posten transparent erklärt' },
      { name: "twitter:description", content: 'Laminat 16 €/m², Vinyl 18–22 €/m², alle Zusatzposten erklärt, komplettes Rechenbeispiel – die transparente Kostenaufstellung vom Bodenleger.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Was kostet Bodenverlegung? Alle Posten transparent erklärt', description: 'Bodenverlegung Kosten transparent: Laminat 16 €/m², Vinyl 18–22 €/m², dazu Altbelag entfernen, Spachteln (19 €/m²), Sockelleisten (5 €/lfm). Mit komplettem Rechenbeispiel für 25 m² – vom Bodenleger aus Wilhelmshaven.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Bodenverlegung: Kosten', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Was kostet Bodenverlegung? Die transparente Rechnung.'} intro={'Die meisten Preisseiten nennen eine Zahl und verstecken den Rest im Kleingedruckten. Wir machen das Gegenteil: Hier ist jede Position erklärt, die auf einer ehrlichen Bodenleger-Rechnung stehen kann – mit unseren echten Preisen und einem kompletten Rechenbeispiel.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Das reine Verlegen kostet bei uns je nach Belag 10–22 €/m² Arbeitslohn: Laminat 16 €, Klick-Vinyl 18 €, verklebtes Vinyl 22 €, PVC 12–15 €, Teppich 10–12 €. Dazu kommen je nach Zustand: Altbelag entfernen (ab 4 €/m²), Spachteln inklusive Grundierung (19 €/m²), Trittschalldämmung (1,50 €/m²) und Sockelleisten (5 €/lfm, auf Gehrung 7 €). Ein typisches 25-m²-Wohnzimmer mit Laminat liegt damit komplett meist zwischen 600 und 1.000 € Arbeitslohn – das Material kommt von Ihnen oder über unseren Beschaffungsservice.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Jede Position einzeln erklärt'} bordered>
        <div className="space-y-8">
          {fragen.map((v, i) => (
            <div key={v.frage} className="border-t border-border/60 pt-6">
              <h3 className="font-display text-lg font-semibold">
                <span className="mr-3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                {v.frage}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{v.antwort}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="So helfen wir" title={'Verbindlich wird es nach Fotos oder Aufmaß'}>
        <p className="leading-relaxed text-muted-foreground">
          Alle genannten Preise sind unsere echten Arbeitslohn-Sätze – verbindlich wird ein Angebot nach Fotos mit Maßen oder einem Aufmaß vor Ort, denn Untergrund und Details entscheiden mit. Erste Einschätzung in zwei Minuten: der <Link to="/preise" className="font-medium text-accent hover:underline">Kostenrechner</Link>. Und falls die Belagsfrage noch offen ist: <Link to="/vinyl-oder-laminat" className="font-medium text-accent hover:underline">Vinyl oder Laminat?</Link> klärt sie ehrlich.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/vinyl-oder-laminat", eyebrow: 'Bodenverlegung', title: 'Vinyl oder Laminat?' },
          { to: "/boden-selbst-verlegen", eyebrow: 'Bodenverlegung', title: 'Selbst verlegen oder Handwerker?' },
          { to: "/bodenverlegung-wilhelmshaven", eyebrow: 'Leistung', title: 'Bodenverlegung in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'Was kostet Ihr Boden?'} text={'Fotos und Maße per WhatsApp – ehrliche Einschätzung meist am selben Werktag.'} />
    </>
  );
}
