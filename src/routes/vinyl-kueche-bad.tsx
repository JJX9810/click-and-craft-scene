import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/vinyl-kueche-bad";

const fragen = [
  {
    frage: "Was heißt 'wasserfest' bei Vinyl wirklich?",
    antwort:
      "Vinyl selbst ist zu 100 % wasserunempfindlich – ein Wasserglas darf tagelang darauf stehen. 'Wasserfest' bezieht sich beim Klick-System aber auf die Klick-Verbindungen: Hochwertige Systeme haben wasserresistente Klicks; günstige nicht. Aber Achtung: 'wasserfest' heißt nicht 'wasserdicht' – bei stehender Nässe unter dem Boden (undichte Spüle, ausgelaufener Geschirrspüler) kann Feuchtigkeit durch die Klicks nach unten kriechen.",
  },
  {
    frage: 'Klick oder verklebt – für welche Räume was?',
    antwort:
      'Küche: Klick-Vinyl reicht in aller Regel; die Randdichtung ist entscheidender als die Verlege-Art. Bad, Gäste-WC, Waschküche: Verklebt ist die sichere Wahl – der Boden ist eine geschlossene Fläche ohne Fugen, und das Verlegen unter Dusch- oder Waschbereichen wird planbar. Der Aufpreis (22 statt 18 €/m²) rechnet sich über die Sicherheit.',
  },
  {
    frage: 'Der häufigste Fehler: die Randfuge',
    antwort:
      '80 % der Vinyl-in-Bad-Schäden entstehen nicht auf der Fläche, sondern an den Rändern – wo der Boden auf Wand, Türzarge, Spülenschrank oder Duschtasse trifft. Diese Fugen müssen sauber mit sanitärem Silikon (nicht normalem Küchensilikon!) abgedichtet werden und alle drei bis fünf Jahre erneuert werden. Das ist der Wartungsposten, den kein Vinyl-Prospekt erwähnt.',
  },
  {
    frage: 'Wo endet Vinyl, wo beginnt Fliese?',
    antwort:
      'Direkt in der Duschtasse und auf dem Boden einer bodengleichen Dusche gehört Fliese hin, nicht Vinyl – dort stehendes Wasser über Jahre besiegt jeden Belag. Als Faustregel: Der Bereich zwischen zwei senkrechten Wänden mit permanenter Nässe bleibt gefliest; der restliche Badboden kann Vinyl sein. Das ist die günstigste und ehrlichste Kombination.',
  },
  {
    frage: 'Rutschsicherheit im Bad – was ist Pflicht?',
    antwort:
      "Im privaten Bad gibt es keine gesetzliche Rutschklasse, in gewerblichen (Praxen, Salons) schon. Trotzdem: Für Vinyl im Bad achten Sie auf die Angabe 'R10' oder höher auf dem Datenblatt – normales Vinyl ohne Rutsch-Angabe wird nass zur Eisbahn. Für Bäder mit älteren Bewohnern empfehlen wir R10 als Minimum.",
  },
  {
    frage: 'Die Aufbauhöhe – warum sie in Bad und Küche zählt',
    antwort:
      'In Bad und Küche stoßen Sie schnell an Höhen-Grenzen: der Übergang zum bestehenden Flurboden, die Anschlussleiste am Duschbereich, die Kücheninsel mit fester Höhe. Klick-Vinyl mit Trittschall baut typisch 5–7 mm auf, verklebt nur 2–3 mm. In sanierten Bädern mit knappen Höhen ist verklebt oft die einzige Option.',
  },
];

export const Route = createFileRoute("/vinyl-kueche-bad")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Vinyl in Küche und Bad: Was funktioniert wirklich?' },
      { name: "description", content: "Vinylboden in Küche und Bad: Klick-Vinyl (18 €/m²) oder verklebtes Vinyl (22 €/m²)? Was 'wasserfest' wirklich bedeutet, wo Vinyl an seine Grenze kommt und welches Detail alle vergessen: die Fugen und Übergänge. Vom Bodenleger aus Wilhelmshaven." },
      { property: "og:title", content: 'Vinyl in Küche und Bad: Was funktioniert wirklich?' },
      { property: "og:description", content: 'Klick oder verklebt? Wasserfest oder wasserdicht? Der ehrliche Vinyl-Ratgeber für Küche und Bad.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Vinyl in Küche und Bad: Was funktioniert wirklich?' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Vinyl in Küche und Bad: Was funktioniert wirklich?' },
      { name: "twitter:description", content: 'Klick oder verklebt? Wasserfest oder wasserdicht? Der ehrliche Vinyl-Ratgeber für Küche und Bad.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Vinyl in Küche und Bad: Was funktioniert wirklich?', description: "Vinylboden in Küche und Bad: Klick-Vinyl (18 €/m²) oder verklebtes Vinyl (22 €/m²)? Was 'wasserfest' wirklich bedeutet, wo Vinyl an seine Grenze kommt und welches Detail alle vergessen: die Fugen und Übergänge. Vom Bodenleger aus Wilhelmshaven." }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Vinyl in Küche und Bad', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Vinyl in Küche und Bad – was hält, was nicht?'} intro={'Vinyl in Küche und Bad ist eine der beliebtesten Alternativen zu Fliesen – wärmer, günstiger, wohnlicher. Aber nur, wenn man weiß, welcher Vinyl-Typ hält und wo die Grenze zur Fliese wirklich liegt. Hier die ehrliche Bewertung.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>In der Küche funktioniert hochwertiges Klick-Vinyl (18 €/m²) sehr gut – vorausgesetzt, die Fugen zwischen Boden und Wand werden sauber mit Silikon abgedichtet. Im Bad wird es kritischer: Vor der Dusche und in klassischen Nasszonen empfehlen wir vollflächig verklebtes Vinyl (22 €/m²) mit versiegelten Übergängen; direkt in der Duschtasse gehört weiterhin Fliese hin. Der häufigste Fehler ist nicht die falsche Vinyl-Wahl, sondern die vernachlässigte Randdichtung – dort dringt Wasser ein, nicht durch die Vinyl-Fläche.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Die sechs entscheidenden Punkte'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Verklebt oder geklickt: wir prüfen, was hier passt'}>
        <p className="leading-relaxed text-muted-foreground">
          Schicken Sie uns Fotos vom Bad oder der Küche und teilen Sie uns mit, wo Spüle, Dusche oder Waschmaschine stehen – wir empfehlen die passende Vinyl-Art und die Verlege-Detailplanung. Alle Details und Preise: <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">Bodenverlegung in Wilhelmshaven</Link>. Und wenn die Belagsfrage grundsätzlicher ist: <Link to="/vinyl-oder-laminat" className="font-medium text-accent hover:underline">Vinyl oder Laminat?</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/vinyl-oder-laminat", eyebrow: 'Bodenverlegung', title: 'Vinyl oder Laminat?' },
          { to: "/bodenverlegung-fussbodenheizung", eyebrow: 'Bodenverlegung', title: 'Bodenverlegung mit Fußbodenheizung' },
          { to: "/bodenverlegung-wilhelmshaven", eyebrow: 'Leistung', title: 'Bodenverlegung in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'Vinyl in Küche oder Bad geplant?'} text={'Fotos per WhatsApp – ehrliche Belagsempfehlung meist am selben Werktag.'} />
    </>
  );
}
