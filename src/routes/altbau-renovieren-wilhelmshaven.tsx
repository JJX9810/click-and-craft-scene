import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/altbau-renovieren-wilhelmshaven";

const fragen = [
  {
    frage: 'Warum ist die Substanzprüfung hier wichtiger als anderswo?',
    antwort:
      'Küstenklima. Die Kombination aus salzhaltiger Luft, Wind und relativ hoher Grundfeuchte setzt Altbausubstanz stärker zu als im Binnenland. Bevor Sie in Elektrik oder Böden investieren, prüfen (lassen): Feuchtigkeit im Sockelbereich, Zustand der Fugen an Klinkerfassaden, Kellerabdichtung, Dachraum. Ein feuchtes Fundament besiegt jede neue Fußleiste in einem Jahr.',
  },
  {
    frage: 'Elektrik im Altbau – warum meistens neu?',
    antwort:
      'In Wilhelmshavener Häusern aus den 1950ern und 1960ern liegen oft noch Klassikaltleitungen mit Stoff- oder Bleimantel, teils ohne Schutzleiter. Das ist weder sicher noch für heutige Lasten (Herd, Backofen, Waschmaschine, Geschirrspüler gleichzeitig) ausgelegt. Elektrik-Erneuerung ist im Altbau die teuerste, aber am wenigsten verhandelbare Position. Läuft über unseren Elektro-Partnerbetrieb.',
  },
  {
    frage: 'Die Wandfrage: Putz auf was?',
    antwort:
      'Wilhelmshavener Nachkriegs-Altbau hat oft Putz direkt auf Ziegel oder Kalkstein – kein Trockenbau, keine Gipskarton-Schicht. Das hat zwei Konsequenzen: Steckdosen und Leitungen werden gestemmt, nicht gebohrt (staubig, laut, aufwendig), und Hängeschränke halten anders als in modernen Wänden – falscher Dübel = Schrank auf dem Boden. Für die Wandgestaltung selbst empfehlen wir <Link to="/partner" className="font-medium text-accent hover:underline">Wand & Wirkung</Link> (Andreas Wagner, unser Partner) mit Erfahrung in Spachteltechnik auch für unebene Altbau-Wände.',
  },
  {
    frage: 'Boden im Altbau – die Höhenfrage',
    antwort:
      'Alte Dielenböden, überlegter Estrich, schief gewordene Balken – Wilhelmshavener Altbauböden sind selten gerade. Vor Vinyl oder Laminat ist fast immer Spachtelarbeit nötig (19 €/m² inklusive Grundierung). Bei stark schwingenden Dielenböden ist eine tragfähige OSB-Zwischenlage sinnvoll – das erhöht die Aufbauhöhe und muss bei Türen und Übergängen mitbedacht werden.',
  },
  {
    frage: 'Küche im Altbau – die Anschlussfrage',
    antwort:
      'Alte Küchen standen oft an anderer Stelle als moderne, oder die neue IKEA-Zeile hat andere Anschluss-Höhen. Wasser, Abwasser, Strom müssen typisch neu positioniert werden – das entscheidet, ob eine Neuküche 3.000 € oder 8.000 € kostet. Wir planen das mit vor der Bestellung, nicht nach der Anlieferung.',
  },
  {
    frage: 'Wann lohnt Renovierung, wann eher Verkauf?',
    antwort:
      'Ehrlich: Wenn Fundament, Dach und Elektrik alle gleichzeitig anstehen, geht der Kostenrahmen schnell an eine Neubau-Investition. Wir sind Handwerker, keine Gutachter – aber wenn wir bei der Besichtigung sehen, dass die Substanz kritisch ist, sagen wir es. Sie entscheiden dann informiert.',
  },
];

export const Route = createFileRoute("/altbau-renovieren-wilhelmshaven")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Altbau renovieren in Wilhelmshaven: Der regionale Fahrplan' },
      { name: "description", content: 'Altbau renovieren in Wilhelmshaven: die richtige Reihenfolge für regionale Baustile – Klinkerhäuser der Nachkriegszeit, Marinehäuser, Backsteinbau. Von der Substanzprüfung über Elektrik bis zum Boden. Vom Handwerkerservice, der genau diese Häuser täglich sieht.' },
      { property: "og:title", content: 'Altbau renovieren in Wilhelmshaven: Der regionale Fahrplan' },
      { property: "og:description", content: 'Altbau in Wilhelmshaven renovieren: der regionale Fahrplan mit ehrlicher Reihenfolge für Klinker- und Marinehäuser.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Altbau renovieren in Wilhelmshaven: Der regionale Fahrplan' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Altbau renovieren in Wilhelmshaven: Der regionale Fahrplan' },
      { name: "twitter:description", content: 'Altbau in Wilhelmshaven renovieren: der regionale Fahrplan mit ehrlicher Reihenfolge für Klinker- und Marinehäuser.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Altbau renovieren in Wilhelmshaven: Der regionale Fahrplan', description: 'Altbau renovieren in Wilhelmshaven: die richtige Reihenfolge für regionale Baustile – Klinkerhäuser der Nachkriegszeit, Marinehäuser, Backsteinbau. Von der Substanzprüfung über Elektrik bis zum Boden. Vom Handwerkerservice, der genau diese Häuser täglich sieht.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Altbau renovieren in Wilhelmshaven', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Altbau renovieren in Wilhelmshaven – was zuerst?'} intro={'Wilhelmshavener Altbau ist eine eigene Welt – geprägt von Marine, Nachkriegszeit und dem Klima am Jadebusen. Wer ein solches Haus renoviert, ohne die regionalen Besonderheiten zu kennen, arbeitet gegen das Haus statt mit ihm. Hier ist der Fahrplan, wie wir ihn für unsere Kunden zwischen Rüstersiel und Neuengroden anwenden.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Der bewährte Ablauf bei Wilhelmshavener Altbau: erst Substanz und Feuchtigkeit prüfen (Klima am Jadebusen ist unforgivend), dann Elektrik und Sanitär erneuern, dann Wände (viele Marine- und Nachkriegshäuser haben Putz auf Lehm oder Ziegel – nicht wie moderne Trockenbauwände), dann der Boden, dann Küche und Einbauten, zuletzt Sockelleisten und Feinschliff. Wir koordinieren Boden, Küche und Entrümpelung selbst, Elektrik/Malerarbeiten/Sanitär über geprüfte Partnerbetriebe – ein Ansprechpartner statt fünf. Kostenrahmen für eine mittlere Wohnungsrenovierung: 15.000–40.000 € je nach Zustand und Umfang, verbindlich nach Substanz-Aufnahme.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Sechs Punkte, die im Wilhelmshavener Altbau zählen'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Regionale Erfahrung als Vorteil'}>
        <p className="leading-relaxed text-muted-foreground">
          Wilhelmshavener Altbau ist ein Fach für sich – und wir haben Boden für Boden, Küche für Küche in diesen Häusern gearbeitet. Was wir selbst machen: Boden, Küche, Entrümpelung. Was Partner machen: Elektro, Sanitär, Malerarbeiten (<Link to="/partner" className="font-medium text-accent hover:underline">Wand & Wirkung, Andreas Wagner</Link>). Für alles gemeinsam: ein Ansprechpartner. Ablauf-Details: <Link to="/renovierung-reihenfolge" className="font-medium text-accent hover:underline">Renovierung – die richtige Reihenfolge</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/renovierung-reihenfolge", eyebrow: 'Renovierung', title: 'Renovierung: Die richtige Reihenfolge' },
          { to: "/bodenverlegung-fussbodenheizung", eyebrow: 'Bodenverlegung', title: 'Bodenverlegung mit Fußbodenheizung' },
          { to: "/partner", eyebrow: 'Netzwerk', title: 'Renovierung aus einer Hand' },
        ]}
      />

      <CtaBlock title={'Altbau renovieren – wo anfangen?'} text={'Schicken Sie Fotos und ein paar Zeilen zur Situation – ehrliche Einschätzung meist am selben Werktag.'} />
    </>
  );
}
