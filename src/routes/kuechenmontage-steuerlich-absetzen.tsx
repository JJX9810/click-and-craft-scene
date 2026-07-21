import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/kuechenmontage-steuerlich-absetzen";

const fragen = [
  {
    frage: 'Was genau ist absetzbar – und was nicht?',
    antwort:
      'Absetzbar: reine Arbeitskosten (Montage, Anschluss, Anpassung, Entsorgung der alten Küche), Fahrtkosten des Handwerkers und im Gewerk verbrauchtes Material (Silikon, Kleinteile, Verbrauchsmaterial). Nicht absetzbar: die Küche selbst (Möbel, Fronten, Arbeitsplatte), die Elektrogeräte (auch nicht der Einbau, wenn die Geräte gleichzeitig gekauft wurden – hier prüfen), Anlieferungspauschalen für die Möbel.',
  },
  {
    frage: 'Wie hoch ist der tatsächliche Vorteil?',
    antwort:
      '20 % der begünstigten Arbeitskosten, gedeckelt auf 1.200 € pro Jahr. Rechenbeispiel Küchenmontage: 5 lfm × 189 € = 945 € Arbeitslohn – davon 20 % = 189 € direkte Steuerersparnis. Bei einer aufwendigeren Montage mit Anpassungen und 2.000 € Arbeitskosten wären es 400 €. Das ist keine Steuererstattung im Sinne einer Rückzahlung, sondern eine direkte Reduktion der Steuerschuld – auch bei kleinen Steuerbeträgen sinnvoll.',
  },
  {
    frage: 'Was muss in unserer Rechnung stehen?',
    antwort:
      'Damit das Finanzamt sie akzeptiert: Rechnungsdatum und -nummer, unser Name und Adresse, Ihr Name und Adresse (der Rechnungsempfänger muss Sie sein!), Leistungsbeschreibung, eine getrennte Ausweisung von Arbeitskosten und ggf. Material, Zahlungsart. Wir stellen das standardmäßig so aus – gemäß § 19 UStG ohne ausgewiesene Umsatzsteuer, das ist für die Absetzbarkeit unproblematisch.',
  },
  {
    frage: 'Warum ist Barzahlung ein Problem?',
    antwort:
      'Weil das Finanzamt einen Zahlungsnachweis will – und der geht nur per Überweisung, Lastschrift oder Kartenzahlung. Barzahlung wird selbst bei sonst perfekter Rechnung nicht anerkannt. Der Grund ist Schwarzarbeit-Vorbeugung, und die Regel ist eisern. Wer bar zahlt, verschenkt bis zu 1.200 €.',
  },
  {
    frage: 'Der wichtige Zeitpunkt: Wann muss die Rechnung bezahlt sein?',
    antwort:
      'Absetzbar in der Steuererklärung ist das Jahr, in dem Sie die Rechnung bezahlt haben – nicht das Jahr der Leistung. Wer im Dezember montieren lässt und im Januar überweist, setzt es im Folgejahr ab. Wer den Höchstbetrag mit anderen Handwerkerleistungen bereits ausgeschöpft hat, kann die Küchenrechnung bewusst ins nächste Jahr schieben.',
  },
  {
    frage: 'Wo trage ich es in der Steuererklärung ein?',
    antwort:
      "In der Anlage 'Haushaltsnahe Aufwendungen' (Elster) unter 'Handwerkerleistungen'. Die Rechnung nicht mitschicken, aber aufbewahren – das Finanzamt kann sie nachfordern. Bei Unsicherheit fragen Sie Ihre Steuerberatung; wir sind Handwerker, keine Steuerberater. Der Vollständigkeit halber: Die Regeln können sich ändern; die Angaben hier entsprechen dem Stand 2026.",
  },
];

export const Route = createFileRoute("/kuechenmontage-steuerlich-absetzen")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Küchenmontage steuerlich absetzen: Der Handwerkerbonus einfach erklärt' },
      { name: "description", content: 'Küchenmontage steuerlich absetzen: 20 % der Arbeitskosten nach § 35a EStG, max. 1.200 € pro Jahr. Was in der Rechnung stehen muss, warum Überweisung Pflicht ist und der wichtige Zeitpunkt. Vom Küchenmonteur aus Wilhelmshaven – kein Steuerberater-Ersatz.' },
      { property: "og:title", content: 'Küchenmontage steuerlich absetzen: Der Handwerkerbonus einfach erklärt' },
      { property: "og:description", content: '20 % Handwerkerbonus für Küchenmontage: Rechnungsvoraussetzungen, Grenzen und was Sie beachten müssen.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Küchenmontage steuerlich absetzen: Der Handwerkerbonus einfach erklärt' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Küchenmontage steuerlich absetzen: Der Handwerkerbonus einfach erklärt' },
      { name: "twitter:description", content: '20 % Handwerkerbonus für Küchenmontage: Rechnungsvoraussetzungen, Grenzen und was Sie beachten müssen.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Küchenmontage steuerlich absetzen: Der Handwerkerbonus einfach erklärt', description: 'Küchenmontage steuerlich absetzen: 20 % der Arbeitskosten nach § 35a EStG, max. 1.200 € pro Jahr. Was in der Rechnung stehen muss, warum Überweisung Pflicht ist und der wichtige Zeitpunkt. Vom Küchenmonteur aus Wilhelmshaven – kein Steuerberater-Ersatz.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Küchenmontage steuerlich absetzen', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Küchenmontage steuerlich absetzen – der Handwerkerbonus.'} intro={'Viele wissen es, wenige nutzen es: Handwerkerleistungen im eigenen Haushalt sind steuerlich absetzbar – auch die Küchenmontage. Hier ist die einfache Erklärung, was möglich ist, was nicht, und was wir als Handwerksbetrieb dafür in die Rechnung schreiben.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Nach § 35a EStG können Privatpersonen 20 % der Arbeitskosten für Handwerkerleistungen im eigenen Haushalt direkt von der Steuer abziehen – maximal 1.200 € pro Jahr (das entspricht 6.000 € Arbeitslohn). Das gilt auch für Küchenmontage. Voraussetzungen: eine ordentliche Rechnung, die Arbeitskosten getrennt ausweist, sowie Zahlung per Überweisung (nicht bar!). Wichtig: Es geht ausschließlich um den Arbeitslohn, nicht um die Küche selbst oder die Geräte. Dieser Ratgeber ersetzt keine steuerliche Beratung; für Ihre konkrete Situation fragen Sie Ihre Steuerberatung.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Sechs Punkte zum Handwerkerbonus'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Rechnung, Überweisung, § 35a – bei uns Standard'}>
        <p className="leading-relaxed text-muted-foreground">
          Wir stellen jede Rechnung so aus, dass Sie den Handwerkerbonus geltend machen können: Arbeitskosten separat ausgewiesen, alle Pflichtangaben, Überweisungsdaten drauf. Fragen zur Steuer klärt Ihre Steuerberatung; Fragen zur Küchenmontage klären wir. Details: <Link to="/kuechenmontage-in-wilhelmshaven" className="font-medium text-accent hover:underline">Küchenmontage in Wilhelmshaven</Link>. Wer die Küche umzieht: <Link to="/kueche-umzug-checkliste" className="font-medium text-accent hover:underline">Küchenumzugs-Checkliste</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/ikea-kueche-montieren-lassen", eyebrow: 'Küchenmontage', title: 'IKEA-Küche montieren lassen' },
          { to: "/kueche-umzug-checkliste", eyebrow: 'Küchenmontage', title: 'Küche umziehen: Die Checkliste' },
          { to: "/kuechenmontage-in-wilhelmshaven", eyebrow: 'Leistung', title: 'Küchenmontage in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'Küchenmontage geplant und Steuertipp genutzt?'} text={'WhatsApp mit Fotos – wir montieren und stellen die Rechnung korrekt aus.'} />
    </>
  );
}
