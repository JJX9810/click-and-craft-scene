import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/entruempelung-kosten";

const fragen = [
  {
    frage: "Welche Preisspannen sind realistisch?",
    antwort:
      "Als grobe Orientierung aus der Praxis in Norddeutschland: Ein Keller oder eine Garage liegt häufig zwischen 150 und 500 €, eine 2- bis 3-Zimmer-Wohnung meist zwischen 600 und 1.500 €, ein komplettes Einfamilienhaus ab etwa 1.500 € aufwärts – je nach Füllgrad auch deutlich mehr. Solche Spannen ersetzen kein Angebot, zeigen aber, ob ein Angebot völlig aus dem Rahmen fällt – nach oben wie nach unten.",
  },
  {
    frage: "Wovon hängt der Preis wirklich ab?",
    antwort:
      "Von vier Faktoren: der Menge (ein knietief gefüllter Keller ist etwas anderes als ein Messie-Haushalt), der Art des Inventars (Sperrmüll, Elektrogeräte, Sondermüll wie Farben oder Reifen kosten unterschiedlich in der Entsorgung), dem Zugang (Erdgeschoss mit Parkplatz vor der Tür oder 3. Stock ohne Aufzug) und dem gewünschten Endzustand (grob leer oder besenrein zur Wohnungsübergabe).",
  },
  {
    frage: "Warum gibt es keinen seriösen Festpreis am Telefon?",
    antwort:
      "Weil niemand die Menge und den Entsorgungsaufwand sehen kann, ohne vor Ort gewesen zu sein. Telefon-Festpreise sind entweder großzügig nach oben abgesichert – dann zahlen Sie zu viel – oder sie werden vor Ort nachverhandelt, wenn der Wagen schon da steht. Ein verbindlicher Preis nach Besichtigung schützt beide Seiten.",
  },
  {
    frage: "Was bedeutet 'kostenlose Besichtigung' bei vielen Anbietern?",
    antwort:
      "Oft ist sie ein Verkaufstermin: Der Anbieter investiert die Anfahrt und will den Auftrag im Wohnzimmer abschließen – mit entsprechendem Druck. Wir gehen einen anderen Weg: Unsere Besichtigung kostet pauschal 39 € und wird bei Auftragserteilung vollständig verrechnet. Wer beauftragt, zahlt dafür im Ergebnis nichts – und bekommt statt einer Schätzung ein verbindliches Angebot ohne Verkaufsdruck.",
  },
  {
    frage: "Kann verwertbares Inventar den Preis senken?",
    antwort:
      "Ja, in Grenzen. Gut erhaltene Möbel, funktionierende Geräte oder Sammlerstücke können mit dem Preis verrechnet werden – das besprechen wir offen bei der Besichtigung. Wichtig für realistische Erwartungen: Der Gebrauchtmarkt ist voll; die meisten Haushalte enthalten weniger Verwertbares, als man hofft. Seriös ist, wer das ehrlich sagt, statt mit 'Wertanrechnung' zu ködern.",
  },
  {
    frage: "Woran erkennt man unseriöse Angebote?",
    antwort:
      "An drei Mustern: Kampfpreise weit unter den üblichen Spannen (die Differenz landet dann gern als illegal entsorgter Müll im Wald – haftbar ist im Zweifel der Auftraggeber), Barzahlung ohne Rechnung, und Festpreise ohne jede Besichtigung. Fragen Sie immer nach: Rechnung, Nachweis der fachgerechten Entsorgung und einem schriftlichen Angebot.",
  },
];

export const Route = createFileRoute("/entruempelung-kosten")({
  component: RatgeberEntruempelungKosten,
  head: () => ({
    meta: [
      { title: "Was kostet eine Entrümpelung? Ehrliche Orientierung" },
      {
        name: "description",
        content:
          "Was kostet eine Entrümpelung in Wilhelmshaven? Realistische Preisspannen (Keller ab 150 €, Wohnung 600–1.500 €), die 4 echten Preisfaktoren, Warnsignale unseriöser Anbieter – und warum ein verbindliches Angebot nach Besichtigung fairer ist als ein Telefon-Festpreis.",
      },
      { property: "og:title", content: "Was kostet eine Entrümpelung? Ehrliche Orientierung" },
      {
        property: "og:description",
        content:
          "Realistische Preisspannen, die echten Preisfaktoren und Warnsignale unseriöser Anbieter – der ehrliche Entrümpelungs-Ratgeber aus Wilhelmshaven.",
      },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Entrümpelungs-Kosten – Ratgeber von Verlegt & Verschraubt Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Was kostet eine Entrümpelung? Ehrliche Orientierung" },
      {
        name: "twitter:description",
        content:
          "Realistische Preisspannen, echte Preisfaktoren, Warnsignale – der ehrliche Entrümpelungs-Ratgeber aus Wilhelmshaven.",
      },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: URL,
          name: "Was kostet eine Entrümpelung? Ehrliche Orientierung",
          description:
            "Realistische Preisspannen für Entrümpelungen, die vier echten Preisfaktoren, Warnsignale unseriöser Anbieter und das Modell 'verbindliches Angebot nach Besichtigung' – vom Entrümpelungsdienst aus Wilhelmshaven.",
        }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Was kostet eine Entrümpelung?", url: URL },
        ]),
      ]),
    ],
  }),
});

function RatgeberEntruempelungKosten() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Was kostet eine Entrümpelung? Die ehrliche Antwort."
        intro="Die häufigste Frage vor jeder Haushaltsauflösung – und die, bei der am meisten getrickst wird. Hier ist die Orientierung, die wir auch am Telefon geben: mit realistischen Spannen, den echten Preisfaktoren und den Warnsignalen, an denen Sie schwarze Schafe erkennen."
      />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>
          Realistisch liegen Keller und Garagen häufig bei 150–500 €, Wohnungen
          bei 600–1.500 €, Häuser ab etwa 1.500 € aufwärts – abhängig von Menge,
          Inventar, Zugang und Endzustand. Einen seriösen Festpreis gibt es erst
          nach einem Blick vor Ort. Bei Verlegt &amp; Verschraubt kostet diese
          Besichtigung pauschal 39 €, die bei Auftragserteilung vollständig
          verrechnet werden – danach erhalten Sie ein verbindliches Angebot
          statt einer Schätzung.
        </QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title="Die sechs Fragen, auf die es ankommt" bordered>
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

      <Section eyebrow="So läuft es bei uns" title="Vom Anruf zum verbindlichen Angebot">
        <p className="leading-relaxed text-muted-foreground">
          Sie schicken uns per WhatsApp ein paar Fotos und sagen, worum es geht –
          Wohnung, Haus, Keller oder Dachboden, grober Füllgrad, Etage. Dann
          vereinbaren wir die Besichtigung vor Ort (39 € Pauschale, bei Auftrag
          vollständig verrechnet). Danach haben Sie ein schriftliches,
          verbindliches Angebot inklusive fachgerechter Entsorgung – auf Wunsch
          mit besenreiner Übergabe zum Wunschtermin. Wir arbeiten in
          Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland und
          Wittmund. Mehr zur Leistung auf unserer Seite{" "}
          <Link to="/entruempelung-entsorgung-in-wilhelmshaven" className="font-medium text-accent hover:underline">
            Entrümpelung &amp; Entsorgung in Wilhelmshaven
          </Link>
          , eine erste Einschätzung liefert der{" "}
          <Link to="/preise" className="font-medium text-accent hover:underline">
            Kostenrechner
          </Link>
          .
        </p>
      </Section>

      <CtaBlock
        title="Klarheit statt Schätzung?"
        text="Fotos per WhatsApp schicken, Besichtigung vereinbaren – verbindliches Angebot statt böser Überraschung."
      />
    </>
  );
}
