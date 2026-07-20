import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/haushaltsaufloesung-nachlass";

const fragen = [
  {
    frage: 'Schritt 1: Welche Fristen gelten wirklich?',
    antwort:
      'Der Mietvertrag läuft nach einem Todesfall zunächst weiter; für die Kündigung gelten gesetzliche Fristen, die den Erben Zeit geben. Praktisch wichtig: früh das Gespräch mit dem Vermieter suchen – viele sind bei Nachlass-Situationen kulant mit Übergabeterminen, besonders wenn eine besenreine, termingerechte Übergabe zugesagt ist. Bei Unsicherheiten zu Erbfragen hilft das Nachlassgericht oder ein Anwalt – keine Räumungsfirma.',
  },
  {
    frage: 'Schritt 2: Was muss vor allem anderen gesichert werden?',
    antwort:
      'Dokumente (Testament, Versicherungspolicen, Kontounterlagen, Urkunden, Verträge – auch in Schubladen, Büchern und Manteltaschen suchen), Schlüssel, Bargeld, Schmuck und alles mit erkennbarem Wert oder Erinnerungswert. Diese Sicherung gehört in Familienhand, bevor irgendjemand Fremdes die Wohnung betritt – ein seriöser Entrümpler wird genau das empfehlen.',
  },
  {
    frage: 'Schritt 3: Wie sortiert man würdevoll – ohne sich zu verlieren?',
    antwort:
      'Bewährt hat sich das Vier-Kisten-Prinzip: Behalten, Verschenken/Familie, Verkaufen, Weggeben. Und zwei Regeln dazu: Niemand muss alles an einem Wochenende schaffen – und niemand muss jede Kiste öffnen. Was nach dem Sortieren übrig bleibt, übernimmt die Räumung; gut Erhaltenes geben wir auf Wunsch an gemeinnützige Stellen weiter, statt es zu entsorgen.',
  },
  {
    frage: 'Schritt 4: Was macht die eigentliche Auflösung aus?',
    antwort:
      'Die vollständige Räumung aller Räume inklusive Keller, Dachboden und Garage, fachgerechte Entsorgung nach Abfallarten, auf Wunsch Demontage von Einbauten und Küche – und zum Schluss die besenreine Übergabe, oft mit festem Termin für die Wohnungsrückgabe. Verwertbares kann mit dem Preis verrechnet werden; ehrlich gesagt ist das seltener werthaltig, als man hofft – seriös ist, wer das vorher sagt.',
  },
  {
    frage: 'Schritt 5: Woran erkenne ich einen seriösen Anbieter für diese sensible Aufgabe?',
    antwort:
      'An Diskretion (keine reißerischen Fahrzeuge vor der Tür, wenn gewünscht), einem schriftlichen, verbindlichen Angebot nach Besichtigung statt Telefon-Pauschalen, Entsorgungsnachweisen, Rechnung statt Barzahlung – und daran, wie mit persönlichen Gegenständen umgegangen wird: Was nach Erinnerung aussieht, wird zur Seite gelegt und gefragt, nicht entsorgt.',
  },
];

export const Route = createFileRoute("/haushaltsaufloesung-nachlass")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Haushaltsauflösung im Trauerfall: Der einfühlsame Leitfaden' },
      { name: "description", content: 'Haushaltsauflösung nach einem Todesfall: der praktische Leitfaden – Fristen mit dem Vermieter, Wertsachen und Dokumente sichern, würdevoll sortieren, Entrümpelung mit besenreiner Übergabe. Diskret begleitet in Wilhelmshaven und Umgebung.' },
      { property: "og:title", content: 'Haushaltsauflösung im Trauerfall: Der einfühlsame Leitfaden' },
      { property: "og:description", content: 'Fristen, Dokumente, würdevolles Sortieren, besenreine Übergabe – der praktische Leitfaden für die Haushaltsauflösung im Trauerfall.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Haushaltsauflösung im Trauerfall: Der einfühlsame Leitfaden' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Haushaltsauflösung im Trauerfall: Der einfühlsame Leitfaden' },
      { name: "twitter:description", content: 'Fristen, Dokumente, würdevolles Sortieren, besenreine Übergabe – der praktische Leitfaden für die Haushaltsauflösung im Trauerfall.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Haushaltsauflösung im Trauerfall: Der einfühlsame Leitfaden', description: 'Haushaltsauflösung nach einem Todesfall: der praktische Leitfaden – Fristen mit dem Vermieter, Wertsachen und Dokumente sichern, würdevoll sortieren, Entrümpelung mit besenreiner Übergabe. Diskret begleitet in Wilhelmshaven und Umgebung.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Haushaltsauflösung im Trauerfall', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Haushaltsauflösung im Trauerfall – Schritt für Schritt.'} intro={'Eine Wohnung aufzulösen, während die Trauer noch frisch ist, gehört zu den schwersten Aufgaben, die Angehörige übernehmen. Dieser Leitfaden ordnet die praktischen Schritte – damit der Kopf frei bleibt für das, was wirklich zählt. Ohne Zeitdruck-Panik, ohne falsche Versprechen.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Der bewährte Weg in fünf Schritten: erst die Fristen klären (Mietvertrag endet nicht automatisch – das Gespräch mit dem Vermieter schafft oft Spielraum), dann Dokumente und Wertsachen sichern, dann in Ruhe sortieren, was bleibt, verschenkt oder verkauft wird – und erst danach die eigentliche Räumung beauftragen, auf Wunsch bis zur besenreinen Übergabe. Seriöse Anbieter machen ein verbindliches Angebot nach Besichtigung; bei uns kostet diese 39 €, die bei Auftrag vollständig verrechnet werden.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Die fünf Schritte in Ruhe erklärt'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Diskret, planbar, mit festem Übergabetermin'}>
        <p className="leading-relaxed text-muted-foreground">
          Wir übernehmen Haushaltsauflösungen in Wilhelmshaven und Umgebung diskret und planbar – von der Besichtigung (39 € Pauschale, bei Auftrag vollständig verrechnet) über die Räumung bis zur besenreinen Übergabe zum vereinbarten Termin. Gefundene persönliche Dinge legen wir zur Seite. Mehr zur Leistung: <Link to="/entruempelung-entsorgung-in-wilhelmshaven" className="font-medium text-accent hover:underline">Entrümpelung & Haushaltsauflösung in Wilhelmshaven</Link> – und zur Kostenfrage: <Link to="/entruempelung-kosten" className="font-medium text-accent hover:underline">Was kostet eine Entrümpelung?</Link>.
        </p>
      </Section>

      <CtaBlock title={'Sie stehen gerade vor dieser Aufgabe?'} text={'Melden Sie sich, wenn Sie so weit sind – wir besprechen alles in Ruhe und ohne Druck.'} />
    </>
  );
}
