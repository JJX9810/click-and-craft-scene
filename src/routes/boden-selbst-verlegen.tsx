import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/boden-selbst-verlegen";

const fragen = [
  {
    frage: 'Was können Selbermacher wirklich gut?',
    antwort:
      'Klick-Systeme (Laminat, Klick-Vinyl) in einfachen, rechteckigen Räumen mit ordentlichem Untergrund. Wer sauber misst, die Anleitung respektiert und Geduld für die ersten zwei Reihen mitbringt, bekommt ein ordentliches Ergebnis. Auch Altbelag rausreißen und Räume vorbereiten sind dankbare Eigenleistungen, die beim Profi-Angebot bares Geld sparen.',
  },
  {
    frage: 'Woran scheitern die meisten DIY-Projekte?',
    antwort:
      'An drei Stellen: dem Untergrund (Unebenheiten über 2–3 mm pro Meter drücken sich durch jeden Klick-Boden und lassen ihn knarzen oder aufklaffen), der ersten Reihe (steht sie schief, wandert der Fehler durch den ganzen Raum) und den Abschlüssen – Türzargen unterschneiden, Heizungsrohre aussparen, Übergänge und Gehrungen. Genau dort erkennt man den Unterschied zwischen verlegt und hingelegt.',
  },
  {
    frage: 'Was wird beim Selbermachen gern vergessen?',
    antwort:
      'Die Dehnungsfuge (10–15 mm Wandabstand rundum – ohne sie wölbt sich der Boden im Sommer), die Akklimatisierung (Pakete 48 Stunden liegend im Raum lagern), die Dampfbremse auf mineralischen Untergründen und die Trittschalldämmung. Und das Werkzeug: Ohne Zugeisen, Schlagklotz und ordentliche Säge wird es Flickwerk.',
  },
  {
    frage: 'Wann ist der Profi Pflicht, nicht Kür?',
    antwort:
      'Bei vollflächiger Verklebung (Vinyl, PVC, Teppich – Kleberauftrag und offene Zeiten verzeihen keine Fehler), bei Treppen, bei Fußbodenheizung, bei fraglichem Untergrund (Feuchtigkeit, alte Kleberreste, Höhenunterschiede) und überall, wo gespachtelt werden muss. Diese Arbeiten misslingen im ersten Versuch fast immer – und die Korrektur kostet mehr als die Beauftragung.',
  },
  {
    frage: 'Was kostet der Vergleich konkret?',
    antwort:
      'Rechenbeispiel 25-m²-Wohnzimmer, Klick-Laminat: Beim Selbermachen sparen Sie unseren Verlegelohn von 400 € (25 m² × 16 €) – investieren dafür ein bis zwei Tage, Werkzeug (50–150 €, falls nicht vorhanden) und etwa 8 % mehr Material für Verschnitt-Lehrgeld. Geht etwas schief, kommt neues Material dazu. Der Profi liefert in einem halben Tag ein gewährleistetes Ergebnis. Beides kann richtig sein – je nachdem, was Ihre Zeit wert ist.',
  },
  {
    frage: 'Gibt es den Mittelweg?',
    antwort:
      'Ja, und er ist beliebt: Sie übernehmen Ausräumen, Altbelag entfernen und Entsorgung – wir übernehmen Untergrundprüfung, Spachteln, Verlegung und Abschlüsse. So stecken Ihre Stunden in den einfachen Arbeiten und unsere in denen, die man sieht.',
  },
];

export const Route = createFileRoute("/boden-selbst-verlegen")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Boden selbst verlegen oder verlegen lassen? Ehrlicher Vergleich' },
      { name: "description", content: 'Laminat oder Vinyl selbst verlegen oder den Bodenleger holen? Die ehrliche Grenze: Was Selbermacher gut können, woran sie scheitern (Untergrund, erste Reihe, Abschlüsse) – und ab wann sich der Profi rechnet (Verlegung ab 16 €/m²).' },
      { property: "og:title", content: 'Boden selbst verlegen oder verlegen lassen? Ehrlicher Vergleich' },
      { property: "og:description", content: 'Was Selbermacher gut können, woran sie scheitern – und ab wann sich der Bodenleger rechnet. Der ehrliche Vergleich aus Wilhelmshaven.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Boden selbst verlegen oder verlegen lassen? Ehrlicher Vergleich' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Boden selbst verlegen oder verlegen lassen? Ehrlicher Vergleich' },
      { name: "twitter:description", content: 'Was Selbermacher gut können, woran sie scheitern – und ab wann sich der Bodenleger rechnet. Der ehrliche Vergleich aus Wilhelmshaven.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Boden selbst verlegen oder verlegen lassen? Ehrlicher Vergleich', description: 'Laminat oder Vinyl selbst verlegen oder den Bodenleger holen? Die ehrliche Grenze: Was Selbermacher gut können, woran sie scheitern (Untergrund, erste Reihe, Abschlüsse) – und ab wann sich der Profi rechnet (Verlegung ab 16 €/m²).' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Selbst verlegen oder Handwerker?', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Boden selbst verlegen oder verlegen lassen?'} intro={'Als Bodenleger könnten wir jetzt sagen: Lassen Sie das die Profis machen. Die ehrliche Antwort ist differenzierter – manche Räume sind gute Wochenendprojekte, andere enden als teure Lehrstunde. Hier ist die Grenze, wie wir sie täglich sehen.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Ein rechteckiges Zimmer mit ebenem Untergrund und Klick-Laminat ist ein machbares Wochenendprojekt für geübte Heimwerker. Der Handwerker lohnt sich, sobald einer dieser Faktoren dazukommt: unebener oder unklarer Untergrund, verklebte Beläge, viele Türzargen, Rohre und Ecken, Treppen – oder schlicht fehlende Zeit. Bei 16–22 €/m² Verlegelohn ist der Profi oft günstiger als gedacht, vor allem gegen die Kosten eines misslungenen Erstversuchs gerechnet.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Die sechs ehrlichen Fragen'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Ehrliche Einschätzung statt Verkaufsgespräch'}>
        <p className="leading-relaxed text-muted-foreground">
          Schicken Sie uns Fotos von Raum und Untergrund – wir sagen Ihnen ehrlich, ob Ihr Projekt ein gutes Wochenendprojekt ist oder in Profihände gehört. Preise und Details auf der Seite <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">Bodenleger & Bodenverlegung in Wilhelmshaven</Link>, die Belagswahl klärt der Ratgeber <Link to="/vinyl-oder-laminat" className="font-medium text-accent hover:underline">Vinyl oder Laminat?</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/bodenverlegung-kosten", eyebrow: 'Bodenverlegung', title: 'Was kostet Bodenverlegung?' },
          { to: "/vinyl-oder-laminat", eyebrow: 'Bodenverlegung', title: 'Vinyl oder Laminat?' },
          { to: "/bodenverlegung-wilhelmshaven", eyebrow: 'Leistung', title: 'Bodenverlegung in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'Unsicher, ob DIY reicht?'} text={'Fotos per WhatsApp – ehrliche Einschätzung, ob Selbermachen sinnvoll ist. Versprochen ohne Verkaufsdruck.'} />
    </>
  );
}
