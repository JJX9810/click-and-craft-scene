import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/renovierung-reihenfolge";

const fragen = [
  {
    frage: 'Phase 1: Ausräumen und Entrümpeln – warum ganz am Anfang?',
    antwort:
      'Jedes Gewerk arbeitet schneller und günstiger im leeren Raum. Alte Möbel, Teppiche und Einbauten raus, bevor der erste Handwerker kommt – das spart bei jedem folgenden Schritt Arbeitszeit. Bei größeren Objekten lohnt eine professionelle Entrümpelung inklusive Entsorgung, damit nichts den Start blockiert.',
  },
  {
    frage: 'Phase 2: Elektrik und Sanitär – alles, was Schlitze macht',
    antwort:
      'Neue Steckdosen, Leitungen, Wasseranschlüsse: Diese Arbeiten öffnen Wände und Böden und erzeugen Staub und Schutt. Deshalb kommen sie zwingend vor jeder Oberfläche. Wichtig: Jetzt schon wissen, wo später Küche und Möbel stehen – nachträgliche Steckdosen hinter der fertigen Küchenzeile sind ein teures Ärgernis.',
  },
  {
    frage: 'Phase 3: Decken und Wände – Spachteln vor Streichen',
    antwort:
      'Erst werden Schlitze geschlossen und Flächen gespachtelt, dann kommt der Maler. Decken vor Wänden streichen, und beides vor dem Boden – Farbspritzer auf Abdeckvlies kosten nichts, auf frischem Vinyl kosten sie Nerven.',
  },
  {
    frage: 'Phase 4: Der Boden – auf fertige Wände, unter alles Weitere',
    antwort:
      'Jetzt ist der Untergrund frei zum Spachteln und Verlegen, und keine Leiter kratzt mehr über den neuen Belag. Der Boden läuft dabei durchgehend unter die künftige Küche – das sieht besser aus, dichtet sauberer ab und macht spätere Küchenumbauten unabhängig vom Belag.',
  },
  {
    frage: 'Phase 5: Küche und Einbauten – ins fertige Umfeld',
    antwort:
      'Die Küche wird auf dem fertigen Boden vor gestrichenen Wänden montiert und direkt angeschlossen. Gleiches gilt für Einbauschränke und schwere Möbel. Wer die Küche früher stellt, renoviert danach um sie herum – mit sichtbaren Kanten als Dauererinnerung.',
  },
  {
    frage: 'Phase 6: Sockelleisten und Feinschliff – das Finale',
    antwort:
      'Sockelleisten verbinden Boden und Wand erst ganz am Ende – so decken sie die Dehnungsfugen des Bodens und die Schnittkanten des Malers gleichzeitig ab. Danach: Silikonfugen, Übergangsschienen, Endreinigung, Funktionstest. Fertig.',
  },
];

export const Route = createFileRoute("/renovierung-reihenfolge")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Renovierung: Die richtige Reihenfolge der Gewerke' },
      { name: "description", content: 'Die richtige Reihenfolge bei der Renovierung: Entrümpeln, Elektrik & Sanitär, Wände, Boden, Küche, Feinschliff. Warum die Reihenfolge über Kosten entscheidet – erklärt vom Handwerkerservice aus Wilhelmshaven.' },
      { property: "og:title", content: 'Renovierung: Die richtige Reihenfolge der Gewerke' },
      { property: "og:description", content: 'Entrümpeln, Rohinstallation, Wände, Boden, Küche, Feinschliff – die bewährte Renovierungs-Reihenfolge, die Doppelarbeit verhindert.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Renovierung: Die richtige Reihenfolge der Gewerke' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Renovierung: Die richtige Reihenfolge der Gewerke' },
      { name: "twitter:description", content: 'Entrümpeln, Rohinstallation, Wände, Boden, Küche, Feinschliff – die bewährte Renovierungs-Reihenfolge, die Doppelarbeit verhindert.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Renovierung: Die richtige Reihenfolge der Gewerke', description: 'Die richtige Reihenfolge bei der Renovierung: Entrümpeln, Elektrik & Sanitär, Wände, Boden, Küche, Feinschliff. Warum die Reihenfolge über Kosten entscheidet – erklärt vom Handwerkerservice aus Wilhelmshaven.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Renovierungs-Reihenfolge', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'In welcher Reihenfolge renovieren? Der Fahrplan.'} intro={'Der teuerste Renovierungsfehler ist keine Pfuscharbeit, sondern die falsche Reihenfolge: der frische Boden, über den dann der Maler steigt, die fertige Küche, hinter der noch eine Leitung fehlt. Hier ist der Fahrplan, nach dem wir koordinierte Projekte planen.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Die bewährte Reihenfolge: erst ausräumen und entrümpeln, dann alles, was Wände und Böden öffnet (Elektrik, Sanitär), dann Decken und Wände (Spachteln, Malerarbeiten), dann der Boden, dann Küche und Einbauten, zuletzt Sockelleisten und Feinschliff. Merksatz: von dreckig nach sauber, von der Wand in den Raum. Wer die Reihenfolge einhält, fasst keine Fläche zweimal an.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Die sechs Phasen im Detail'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Ein Ansprechpartner statt sechs Terminplänen'}>
        <p className="leading-relaxed text-muted-foreground">
          Die Reihenfolge zu kennen ist das eine – sechs Gewerke terminlich ineinanderzuschieben das andere. Genau dafür gibt es unser Modell: Wir übernehmen Boden, Küche und Entrümpelung selbst und koordinieren Malerarbeiten, Elektrik oder Sanitär über geprüfte Partnerbetriebe wie die <Link to="/partner" className="font-medium text-accent hover:underline">Maler Manufaktur Wand & Wirkung</Link>. Sie haben einen Ansprechpartner und einen Terminplan – mehr auf unserer <Link to="/partner" className="font-medium text-accent hover:underline">Netzwerk-Seite</Link>.
        </p>
      </Section>

      <CtaBlock title={'Renovierung geplant?'} text={'Schicken Sie uns Fotos und Ihr Vorhaben per WhatsApp – wir sagen ehrlich, was wir übernehmen und was Partner machen.'} />
    </>
  );
}
