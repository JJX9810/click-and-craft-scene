import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/bodenverlegung-fussbodenheizung";

const fragen = [
  {
    frage: "Warum ist der 'Wärmedurchgangswiderstand' die entscheidende Kennzahl?",
    antwort:
      'Jeder Belag zwischen Heizung und Raum wirkt wie eine Decke – er hält die Wärme zurück. Gemessen wird das als R-Wert (m²K/W). Über einer Fußbodenheizung darf dieser Wert 0,15 m²K/W nicht überschreiten, sonst verliert die Heizung Effizienz und der Raum wird nicht warm. Alle namhaften Hersteller drucken diesen Wert auf die Verpackung oder ins Datenblatt. Fehlt er, ist der Belag entweder nicht getestet oder nicht geeignet.',
  },
  {
    frage: 'Vinyl auf Fußbodenheizung – die beste Kombination?',
    antwort:
      'Ja, aus rein technischer Sicht: Vollflächig verklebtes Vinyl (22 €/m² Verlegelohn bei uns) leitet die Wärme praktisch ohne Verlust weiter (R-Wert oft unter 0,05). Klick-Vinyl ist etwas dicker und liegt nicht direkt auf, funktioniert aber ebenfalls einwandfrei – Voraussetzung: FBH-Tauglichkeit auf der Verpackung. Klick-Vinyl-Verlegelohn bei uns 18 €/m².',
  },
  {
    frage: 'Laminat – geht das überhaupt?',
    antwort:
      "Nur explizit FBH-taugliches Laminat, und das ist eine deutlich kleinere Auswahl als 'normales' Laminat. Die Trittschalldämmung darunter darf nicht zu dick sein (max. 2 mm) – sonst summiert sich der Widerstand aus Belag und Dämmung. Wer ein Laminat 'weil es billig war' auf FBH legt, heizt jeden Winter dagegen an.",
  },
  {
    frage: 'Fliesen sind der Klassiker – warum nicht immer?',
    antwort:
      'Fliesen leiten Wärme perfekt (R-Wert nahe null) und sind für FBH ideal. Aber: Fliesen brauchen eine ebene, tragfähige Untergrundvorbereitung, sind kalt, wenn die Heizung aus ist, und die Verlegung ist aufwendig. Für Küche, Bad und Flur oft die beste Wahl; für Wohn- und Schlafräume verzichten viele Kunden bewusst darauf und wählen Vinyl.',
  },
  {
    frage: 'Teppich und Parkett – warum wir hier ehrlich abraten',
    antwort:
      'Dicke Teppichböden (Hochflor, Auslegware mit dicker Rückseite) haben R-Werte über 0,20 – die Heizung heizt effektiv den Boden statt den Raum. Kurzflor-Teppich in FBH-Ausführung geht, ist aber selten schön. Massivparkett arbeitet zu stark bei Temperaturschwankungen; für Parkett-Optik gibt es Mehrschicht-Parkett mit FBH-Freigabe – oder gleich hochwertiges Klick-Vinyl in Holzoptik.',
  },
  {
    frage: 'Was ist beim Verlegen anders?',
    antwort:
      "Zwei Regeln: Erstens muss die Fußbodenheizung mindestens 21 Tage laufen, bevor überhaupt verlegt wird (Aufheizprotokoll führen – Vermieter und Handwerker verlangen es zunehmend). Zweitens wird die Heizung vor der Verlegung heruntergefahren und bleibt es 48 Stunden nach der Verlegung – der Estrich und der frisch verlegte Boden brauchen gleichmäßige Temperatur zum Anpassen. Nach dem Aufheizen langsam in Stufen hochfahren, nicht 'auf einmal'.",
  },
];

export const Route = createFileRoute("/bodenverlegung-fussbodenheizung")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Bodenverlegung mit Fußbodenheizung: Welche Beläge funktionieren?' },
      { name: "description", content: 'Bodenverlegung auf Fußbodenheizung: Vinyl, Laminat, Fliese oder Parkett? Der Wärmedurchgangswiderstand entscheidet – der ehrliche Vergleich mit klaren Grenzen und den passenden Verlegehinweisen vom Bodenleger aus Wilhelmshaven.' },
      { property: "og:title", content: 'Bodenverlegung mit Fußbodenheizung: Welche Beläge funktionieren?' },
      { property: "og:description", content: 'Vinyl, Laminat oder Parkett auf Fußbodenheizung? Der ehrliche Vergleich mit Wärmedurchgangs-Werten und Verlegehinweisen.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Bodenverlegung mit Fußbodenheizung: Welche Beläge funktionieren?' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Bodenverlegung mit Fußbodenheizung: Welche Beläge funktionieren?' },
      { name: "twitter:description", content: 'Vinyl, Laminat oder Parkett auf Fußbodenheizung? Der ehrliche Vergleich mit Wärmedurchgangs-Werten und Verlegehinweisen.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Bodenverlegung mit Fußbodenheizung: Welche Beläge funktionieren?', description: 'Bodenverlegung auf Fußbodenheizung: Vinyl, Laminat, Fliese oder Parkett? Der Wärmedurchgangswiderstand entscheidet – der ehrliche Vergleich mit klaren Grenzen und den passenden Verlegehinweisen vom Bodenleger aus Wilhelmshaven.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Bodenverlegung mit Fußbodenheizung', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Welcher Boden passt auf Fußbodenheizung?'} intro={'Die falsche Belagswahl über einer Fußbodenheizung ist teuer – entweder heizen Sie am Boden vorbei, oder der Belag arbeitet gegen Sie. Hier ist die Belag-für-Belag-Bewertung, wie wir sie in der Praxis geben.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Auf Fußbodenheizung funktionieren am besten dünner Klick- oder Klebe-Vinyl (sehr guter Wärmedurchgang), spezielle FBH-taugliche Laminate mit ausgewiesenem R-Wert unter 0,15 m²K/W und natürlich Fliesen. Vollflächig verklebtes Vinyl (22 €/m²) ist die effizienteste Kombination. Vermeiden Sie dicke Teppiche, hochflorige Beläge und Massivparkett – die dämmen die Wärme aus statt sie durchzulassen. Alle FBH-tauglichen Beläge müssen gekennzeichnet sein: fehlt der Vermerk, sind sie es nicht.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Belag für Belag: Was funktioniert, was nicht'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Wir sagen ehrlich, was auf Ihre Heizung passt'}>
        <p className="leading-relaxed text-muted-foreground">
          Schicken Sie uns Fotos vom Raum und den Namen Ihres bisherigen Belags plus Angaben zur Fußbodenheizung (Alter, wenn bekannt) – wir sagen Ihnen, welche Beläge in Ihrem Fall wirklich funktionieren und welche wir Ihnen abraten würden. Details und Preise: <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">Bodenverlegung in Wilhelmshaven</Link>. Wenn die Grundsatzfrage Vinyl oder Laminat noch offen ist: <Link to="/vinyl-oder-laminat" className="font-medium text-accent hover:underline">der ehrliche Vergleich</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/vinyl-oder-laminat", eyebrow: 'Bodenverlegung', title: 'Vinyl oder Laminat?' },
          { to: "/vinyl-kueche-bad", eyebrow: 'Bodenverlegung', title: 'Vinyl in Küche und Bad' },
          { to: "/bodenverlegung-wilhelmshaven", eyebrow: 'Leistung', title: 'Bodenverlegung in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'Fußbodenheizung im Raum?'} text={'Fotos und kurze Info per WhatsApp – ehrliche Belagsempfehlung meist am selben Werktag.'} />
    </>
  );
}
