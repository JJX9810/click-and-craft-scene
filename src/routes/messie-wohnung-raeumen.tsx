import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/messie-wohnung-raeumen";

const fragen = [
  {
    frage: 'Wer beauftragt uns – und was, wenn die betroffene Person nicht will?',
    antwort:
      'Beauftragen können nur Personen, die berechtigt sind: Mieter, Eigentümer, Erben, gerichtlich bestellte Betreuer, Angehörige mit Vollmacht. Wir räumen nichts gegen den Willen einer geschäftsfähigen Person. Bei komplexen Situationen – demente Angehörige, laufende Betreuungsverfahren, Vermieter-Kündigung mit Räumungsklage – arbeiten wir mit den zuständigen Personen (Betreuer, Anwalt, Gericht) zusammen und beginnen erst mit klarer Rechtslage.',
  },
  {
    frage: "Was bedeutet 'diskret' konkret?",
    antwort:
      'Auf Wunsch: unmarkierte Fahrzeuge vor der Tür, keine großen Schriftzüge, ruhige Anlieferung ohne Aufsehen im Treppenhaus, kein Kontakt zu Nachbarn ohne Ihr Einverständnis. Wir tragen keine Firmenkleidung mit riesigen Logos. Für viele Betroffene und Angehörige ist genau das der Grund, überhaupt jemanden zu holen.',
  },
  {
    frage: 'Der praktische Ablauf – nüchtern erklärt',
    antwort:
      'Schritt 1: kurzes Telefonat, groben Zustand schildern (kein Detail nötig). Schritt 2: Besichtigung vor Ort – wir kommen zu zweit, schauen, machen keine Kommentare zur Situation. Schritt 3: verbindliches Angebot schriftlich, mit Dauer und Preis. Schritt 4: Räumung in Zonen (Zimmer für Zimmer), wir stellen persönliche und wertwirkende Dinge zur Seite. Schritt 5: Abschluss-Runde, was zurück soll, geht zurück, alles andere zur fachgerechten Entsorgung. Auf Wunsch besenrein zur Wohnungsübergabe.',
  },
  {
    frage: 'Was passiert mit persönlichen Dingen?',
    antwort:
      'Alles, was nach Erinnerung aussieht – Fotos, Briefe, Dokumente, Ausweise, Wertsachen –, kommt in eine gekennzeichnete Kiste und wird nicht ohne Rücksprache entsorgt. Diese Kiste bleibt bei Ihnen. Bei Nachlass-Situationen ohne Angehörige übergeben wir Dokumente und Wertsachen an den zuständigen Betreuer oder das Nachlassgericht.',
  },
  {
    frage: 'Kosten – und was den Preis realistisch macht',
    antwort:
      "Messie-Wohnungen kosten mehr als Standard-Entrümpelungen: die Zeit vor Ort ist länger, die Entsorgung aufwendiger (Sondermüll, unterschiedliche Abfallarten), das Team muss oft größer sein. Realistische Größenordnung: eine kleine Wohnung ab etwa 1.500 €, eine 3-Zimmer-Wohnung im mittleren Fall 2.500–4.500 €, im schweren Fall darüber. Verbindlich wird der Preis nach der Besichtigung – und er wird nicht am Räumungstag 'plötzlich höher'.",
  },
  {
    frage: 'Was passiert nach der Räumung?',
    antwort:
      'Der Raum ist leer, geschluckt hat er trotzdem viel. Für Betroffene ist der Neustart oft schwieriger als die Räumung selbst. Wir sind Handwerker, keine Therapeuten – aber wir wissen, wo Sie in Wilhelmshaven und Umgebung Ansprechpartner finden: Selbsthilfegruppen, das Sozialpsychiatrischer Dienst, der Sozialdienst der Kommune. Auf Wunsch nennen wir Kontakte.',
  },
];

export const Route = createFileRoute("/messie-wohnung-raeumen")({
  component: Page,
  head: () => ({
    meta: [
      { title: 'Messie-Wohnung räumen: Diskret, praktisch, ohne Vorwurf' },
      { name: "description", content: 'Messie-Wohnung räumen in Wilhelmshaven: diskreter Ablauf ohne Belehrung, Schritt-für-Schritt-Plan, Umgang mit persönlichen Gegenständen, Kosten. Vom Entrümpelungsdienst, der auch schwierige Fälle mit Respekt übernimmt.' },
      { property: "og:title", content: 'Messie-Wohnung räumen: Diskret, praktisch, ohne Vorwurf' },
      { property: "og:description", content: 'Messie-Wohnung räumen: diskret, praktisch, ohne Vorwurf – der ruhige Leitfaden.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: 'Messie-Wohnung räumen: Diskret, praktisch, ohne Vorwurf' },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: 'Messie-Wohnung räumen: Diskret, praktisch, ohne Vorwurf' },
      { name: "twitter:description", content: 'Messie-Wohnung räumen: diskret, praktisch, ohne Vorwurf – der ruhige Leitfaden.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: 'Messie-Wohnung räumen: Diskret, praktisch, ohne Vorwurf', description: 'Messie-Wohnung räumen in Wilhelmshaven: diskreter Ablauf ohne Belehrung, Schritt-für-Schritt-Plan, Umgang mit persönlichen Gegenständen, Kosten. Vom Entrümpelungsdienst, der auch schwierige Fälle mit Respekt übernimmt.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'Messie-Wohnung räumen', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'Messie-Wohnung räumen – der ruhige Weg zurück.'} intro={'Wenn ein Haushalt über Jahre außer Kontrolle geraten ist, ist der schwierigste Schritt der erste – jemanden zu holen, ohne dass es sich anfühlt wie eine Kapitulation. Dieser Ratgeber ist bewusst nüchtern geschrieben: keine Belehrung, keine Diagnose, sondern der praktische Weg zurück in einen Raum, in dem man leben kann.'} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Eine Messie-Wohnung räumen wir in Wilhelmshaven und Umgebung diskret und mit Respekt – ohne markierte Fahrzeuge vor der Tür, wenn gewünscht, und ohne Bewertung des Zustands. Der Ablauf: Besichtigung in Ruhe (39 € Pauschale, bei Auftrag verrechnet), verbindliches Angebot, gemeinsam vereinbaren, was gesichert und was entsorgt wird, dann Räumung in geordneter Reihenfolge, auf Wunsch mit besenreiner Übergabe. Sensible und persönliche Gegenstände werden zur Seite gelegt und mit der beauftragenden Person besprochen, nicht selbstständig entsorgt.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Sechs Punkte, die den Unterschied machen'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Ohne Bewertung, mit Ruhe – und mit klarem Preis'}>
        <p className="leading-relaxed text-muted-foreground">
          Wenn Sie den ersten Schritt machen möchten, für sich oder für einen Angehörigen: Melden Sie sich per WhatsApp oder Anruf, gern auch kurz und ohne viel Beschreibung. Wir vereinbaren einen Besichtigungstermin und Sie bekommen ein verbindliches Angebot ohne Verkaufsdruck. Details zur Leistung: <Link to="/entruempelung-entsorgung-in-wilhelmshaven" className="font-medium text-accent hover:underline">Entrümpelung & Haushaltsauflösung in Wilhelmshaven</Link>. Bei einem Trauerfall passt eher unser Leitfaden <Link to="/haushaltsaufloesung-nachlass" className="font-medium text-accent hover:underline">Haushaltsauflösung im Trauerfall</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/haushaltsaufloesung-nachlass", eyebrow: 'Entrümpelung', title: 'Haushaltsauflösung im Trauerfall' },
          { to: "/entruempelung-kosten", eyebrow: 'Entrümpelung', title: 'Was kostet eine Entrümpelung?' },
          { to: "/entruempelung-entsorgung-in-wilhelmshaven", eyebrow: 'Leistung', title: 'Entrümpelung & Haushaltsauflösung' },
        ]}
      />

      <CtaBlock title={'Sie stehen vor dieser Aufgabe?'} text={'Kurze Nachricht per WhatsApp reicht – wir melden uns zurück, unaufgeregt.'} />
    </>
  );
}
