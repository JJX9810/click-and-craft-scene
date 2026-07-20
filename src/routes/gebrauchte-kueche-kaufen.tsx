import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/gebrauchte-kueche-kaufen";

const fragen = [
  {
    frage: 'Passt die Küche überhaupt in meinen Raum?',
    antwort:
      'Der häufigste Fehlkauf: verliebt in die Küche, vergessen den Raum. Nehmen Sie zur Besichtigung mit: Raummaße inklusive Fenster- und Türpositionen, Lage von Wasser- und Starkstromanschluss, Deckenhöhe (Hängeschränke!). Eine Zeile lässt sich kürzen – aber eine Spüle, die vier Meter vom Wasseranschluss landet, wird teuer.',
  },
  {
    frage: 'Woran erkenne ich den wahren Zustand?',
    antwort:
      'Schauen Sie dorthin, wo Küchen altern: Boden des Spülenschranks (Wasserschäden quellen Spanplatte auf – einmal gequollen, immer kaputt), Scharniere und Auszüge (mehrfach öffnen – Nachjustieren geht, ausgerissene Löcher kaum), Arbeitsplatten-Kanten und -Ausschnitte (aufgequollene Kanten wandern weiter) und die Fronten gegen das Licht (Kratzer auf Hochglanz sind irreparabel).',
  },
  {
    frage: 'Lohnen sich die Geräte?',
    antwort:
      'Faustregel: Typenschild fotografieren und Baujahr prüfen. Geräte unter fünf Jahren: mitnehmen. Fünf bis zehn Jahre: Zustandsfrage. Über zehn Jahre: meist nicht – alte Kühlschränke und Spülmaschinen fressen den Kaufvorteil über die Stromrechnung wieder auf, und ein Transportschaden trifft ein Gerät ohne Restwert. Eine gute gebrauchte Zeile mit neuen Geräten ist oft die klügste Kombination.',
  },
  {
    frage: 'Was ist ein fairer Preis?',
    antwort:
      'Als grobe Orientierung: Gut erhaltene Marken-Küchen mit brauchbaren Geräten werden gebraucht meist mit 20–35 % des Neupreises gehandelt; ohne Geräte oder mit Macken deutlich darunter. Rechnen Sie ehrlich dazu: Transport, Abbau, Aufbau, Anpassungen und eventuell neue Arbeitsplatte – erst diese Gesamtsumme vergleicht sich mit einer günstigen neuen Küche.',
  },
  {
    frage: 'Wie läuft der Abbau beim Verkäufer richtig?',
    antwort:
      'Meist unter Zeitdruck in fremder Umgebung – deshalb doppelt sorgfältig: alles fotografieren (besonders Anschlüsse und Aufbau-Details), Schränke und Fronten nummerieren, Schrauben pro Schrank in beschriftete Beutel, Arbeitsplatte hochkant transportieren. Klären Sie vorher, wer abbaut: Manche Verkäufer bauen ab (Zustand dann ungeprüft übernehmen!), meist aber der Käufer – oder dessen Monteur.',
  },
  {
    frage: 'Welche Anpassungen sind normal?',
    antwort:
      'Fast jede Gebrauchtküche braucht mindestens eine: Arbeitsplatte kürzen oder neu (der häufigste Posten), ein Schrank bleibt übrig oder fehlt, neue Sockelblenden, Anschluss-Verlängerungen. Planen Sie dafür ein kleines Budget ein – und feilschen Sie beim Kauf nicht um den letzten Fünfziger, wenn dafür der Zustand stimmt.',
  },
];

export const Route = createFileRoute("/gebrauchte-kueche-kaufen")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Gebrauchte Küche kaufen: Die Checkliste vom Monteur' },
      { name: "description", content: 'Gebrauchte Küche auf Kleinanzeigen kaufen: die Checkliste vom Küchenmonteur – Maße prüfen, Zustand erkennen, Geräte bewerten, Abbau richtig planen. Inklusive Kosten für Demontage und Montage (189 €/lfm).' },
      { property: "og:title", content: 'Gebrauchte Küche kaufen: Die Checkliste vom Monteur' },
      { property: "og:description", content: 'Maße, Zustand, Geräte, Abbau: die Gebrauchtküchen-Checkliste vom Monteur aus Wilhelmshaven, der Kleinanzeigen-Küchen regelmäßig umzieht.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Gebrauchte Küche kaufen: Die Checkliste vom Monteur' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Gebrauchte Küche kaufen: Die Checkliste vom Monteur' },
      { name: "twitter:description", content: 'Maße, Zustand, Geräte, Abbau: die Gebrauchtküchen-Checkliste vom Monteur aus Wilhelmshaven, der Kleinanzeigen-Küchen regelmäßig umzieht.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Gebrauchte Küche kaufen: Die Checkliste vom Monteur', description: 'Gebrauchte Küche auf Kleinanzeigen kaufen: die Checkliste vom Küchenmonteur – Maße prüfen, Zustand erkennen, Geräte bewerten, Abbau richtig planen. Inklusive Kosten für Demontage und Montage (189 €/lfm).' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Gebrauchte Küche kaufen', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Gebrauchte Küche kaufen – ohne böses Erwachen.'} intro={'Eine gute gebrauchte Küche kostet ein Viertel des Neupreises – eine schlechte kostet am Ende mehr als eine neue. Wir bauen regelmäßig Kleinanzeigen-Küchen ab und wieder auf und sehen beide Fälle. Hier ist die Checkliste, die den Unterschied macht.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Vor dem Kauf zählen drei Dinge: die Maße Ihres Raums (mit Anschluss-Positionen!) in der Tasche, ein Zustands-Check an den kritischen Stellen (Spülenschrank-Boden, Scharniere, Arbeitsplatten-Kanten) und ein Altersblick auf die Geräte – über zehn Jahre alte Geräte sind selten den Transport wert. Der Abbau beim Verkäufer entscheidet über den Wiederaufbau: fotografieren, nummerieren, Schrauben sichern. Montage bei uns: 189 €/lfm, auf Wunsch inklusive Abbau beim Verkäufer.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Die sechs Prüfpunkte vor dem Kauf'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Wir machen den Komplett-Service für Kleinanzeigen-Küchen'}>
        <p className="leading-relaxed text-muted-foreground">
          Abbau beim Verkäufer, Transport-Beratung, Aufbau mit Anpassungen bei Ihnen – als Monteure für IKEA-, Poco- und Gebrauchtküchen ist das unser Alltag. Auf Wunsch schauen wir vor dem Kauf auf die Anzeige und sagen ehrlich, ob sich die Küche lohnt. Details und Preise: <Link to="/kuechenmontage-in-wilhelmshaven" className="font-medium text-accent hover:underline">Küchenmontage in Wilhelmshaven</Link> – und für den Umzug selbst: <Link to="/kueche-umzug-checkliste" className="font-medium text-accent hover:underline">die komplette Küchenumzugs-Checkliste</Link>.
        </p>
      </Section>

      <CtaBlock title={'Küche auf Kleinanzeigen gefunden?'} text={'Schicken Sie uns den Link oder Fotos – ehrliche Einschätzung, ob sich Kauf und Umzug lohnen.'} />
    </>
  );
}
