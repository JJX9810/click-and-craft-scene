import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { RelatedTopics } from "@/components/site/RelatedTopics";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/ikea-kueche-montieren-lassen";

const fragen = [
  {
    frage: 'Warum ist die Hängeschiene bei METOD Segen und Fluch?',
    antwort:
      'Segen: Steht die Schiene exakt waagerecht, hängen alle Schränke automatisch in einer Linie – das spart pro Schrank Ausrichtungs-Aufwand und macht spätere Umzüge einfach. Fluch: Steht die Schiene nur einen Millimeter schief, wandert der Fehler durch die ganze Zeile, und niemand versteht, warum der letzte Schrank auf der Arbeitsplatte kippt. Wir richten die Schiene mit Laser und Wasserwaage aus – nicht mit Bandmaß.',
  },
  {
    frage: 'Die drei IKEA-Anpassungen, die fast immer nötig sind',
    antwort:
      'Erstens: Sockelblende kürzen und ergänzen – IKEA liefert Standardlängen, Ihr Raum ist nie standard. Zweitens: Arbeitsplatte zuschneiden – die Länge stimmt selten, der Ausschnitt für Kochfeld und Spüle sowieso nie. Drittens: Blende oder Passleiste am Rand – wo IKEA in eine Ecke oder gegen eine Wand stößt, klafft eine Lücke, die eine Passleiste schließt.',
  },
  {
    frage: 'Elektrogeräte – bis wohin machen wir es selbst?',
    antwort:
      'Alle Geräte mit Schuko-Stecker (Backofen mit Kabel, Kühlschrank, Geschirrspüler, Dunstabzugshaube) schließen wir direkt an. Kochfelder mit Starkstrom-Anschluss (400 V) sind Elektrikersache – wir koordinieren den Partnerbetrieb, damit alles am selben Tag läuft. Waschmaschine und Trockner werden ebenfalls angeschlossen, wenn sie in die Küchenzeile integriert sind.',
  },
  {
    frage: 'Wasser: Spüle, Armatur und Geschirrspüler',
    antwort:
      'Standardmäßig übernehmen: neue Armatur montieren, Siphon anschließen, Geschirrspüler mit Zu- und Ablauf verbinden, Testlauf und Dichtigkeitsprüfung. Was wir nicht machen: Wandanschlüsse neu setzen, wenn die Spüle woandershin wandert – das ist Sanitär-Sache und läuft dann über den Partnerbetrieb.',
  },
  {
    frage: 'Häufige IKEA-Detailfehler beim Selberbauen',
    antwort:
      'Wir sehen sie regelmäßig, wenn Kunden nach Ergänzung fragen: Hängeschränke ohne die zusätzlichen Sicherungsschrauben (fallen mit Inhalt runter), Arbeitsplatte ohne saubere Silikonfuge zur Wand (Wasser läuft dahinter), Spüle ohne Dichtband im Ausschnitt (Arbeitsplatte quillt in einem Jahr auf). Diese Details sind kein IKEA-Fehler, sondern werden in der Anleitung nur angedeutet.',
  },
  {
    frage: 'Was kostet die Montage konkret?',
    antwort:
      '189 €/lfm Arbeitslohn ist der Standardsatz. Beispiel für eine 4-lfm-Küche gerade Zeile mit Standardausstattung: 756 € Montage. Dazu kommen ggf. Anfahrt (bis 30 km ab Wilhelmshaven frei), Elektriker-Partnerkosten für den Starkstromanschluss (ca. 80–120 €) und Anpassungen wie eine neue Arbeitsplatten-Ecke. Als Handwerkerleistung 20 % steuerlich absetzbar.',
  },
  {
    frage: 'Was Sie vor unserem Kommen erledigen sollten',
    antwort:
      'Alle Pakete in den Raum bringen und öffnen (das braucht Zeit und Platz), Anleitungen bereitlegen, Wasseranschluss und Starkstrom auf einem Foto festhalten. Wir bringen Werkzeug und Kleinteile mit; besondere Kleinschrauben aus dem IKEA-Zubehör bitte prüfen, dass sie da sind. Der Rest ist unser Job.',
  },
];

export const Route = createFileRoute("/ikea-kueche-montieren-lassen")({
  component: Page,
  head: () => ({
    meta: [
      { title: "IKEA-Küche montieren lassen: So läuft's beim Profi" },
      { name: "description", content: 'IKEA-Küche (METOD) montieren lassen in Wilhelmshaven: Ablauf, typische Anpassungen (Sockelblende, Arbeitsplatte, Elektrogeräte), Kosten (189 €/lfm Montage) und die 3 IKEA-Details, die selten stimmen. Vom Küchenmonteur aus Wilhelmshaven.' },
      { property: "og:title", content: "IKEA-Küche montieren lassen: So läuft's beim Profi" },
      { property: "og:description", content: 'IKEA-Küche montieren lassen: Ablauf, Anpassungen und Kosten vom Küchenmonteur aus Wilhelmshaven.' },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "IKEA-Küche montieren lassen: So läuft's beim Profi" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "IKEA-Küche montieren lassen: So läuft's beim Profi" },
      { name: "twitter:description", content: 'IKEA-Küche montieren lassen: Ablauf, Anpassungen und Kosten vom Küchenmonteur aus Wilhelmshaven.' },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: URL, name: "IKEA-Küche montieren lassen: So läuft's beim Profi", description: 'IKEA-Küche (METOD) montieren lassen in Wilhelmshaven: Ablauf, typische Anpassungen (Sockelblende, Arbeitsplatte, Elektrogeräte), Kosten (189 €/lfm Montage) und die 3 IKEA-Details, die selten stimmen. Vom Küchenmonteur aus Wilhelmshaven.' }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Ratgeber", url: "https://verlegt-verschraubt.de/ratgeber" },
          { name: 'IKEA-Küche montieren lassen', url: URL },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Ratgeber" title={'IKEA-Küche montieren lassen – so läuft es bei uns.'} intro={"IKEA-Küchen sind clever konstruiert, aber der Aufbau ist keine Wochenendaufgabe für Ungeübte. Das METOD-System hat Eigenheiten, die den Unterschied zwischen 'sitzt und hängt' und 'wackelt in drei Monaten' ausmachen. Hier ist, wie wir es machen."} />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>Wir montieren IKEA-Küchen in Wilhelmshaven und Umgebung für 189 €/lfm Arbeitslohn – inklusive Ausrichten der Hängeschiene, Aufhängen und Verbinden aller Schränke, Arbeitsplatten-Zuschnitt, Blendenanpassung und Anschluss der Elektrogeräte mit normalem Stecker. Starkstrom-Herdanschluss übernimmt bei Bedarf unser Elektro-Partner. Eine durchschnittliche IKEA-Küche (3–4 lfm) ist an einem Arbeitstag fertig; bei Anpassungen wie Ecken oder Insellösungen zwei Tage.</QuickAnswer>
      </Section>

      <Section eyebrow="Im Detail" title={'Sieben Punkte zur IKEA-Montage'} bordered>
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

      <Section eyebrow="So helfen wir" title={'Wir montieren IKEA regelmäßig – kein Prestige-Thema'}>
        <p className="leading-relaxed text-muted-foreground">
          Nennen Sie uns Ihre METOD-Konfiguration (Länge, Ecke oder gerade Zeile, welche Geräte) und schicken Sie ein Foto vom Raum – wir sagen Ihnen den Termin und die Zeit, die wir brauchen. Details und Kosten: <Link to="/kuechenmontage-in-wilhelmshaven" className="font-medium text-accent hover:underline">Küchenmontage in Wilhelmshaven</Link>. Wer die Küche ausserdem umzieht: <Link to="/kueche-umzug-checkliste" className="font-medium text-accent hover:underline">Küchenumzugs-Checkliste</Link>.
        </p>
      </Section>

      <RelatedTopics
        links={[
          { to: "/kueche-umzug-checkliste", eyebrow: 'Küchenmontage', title: 'Küche umziehen: Die Checkliste' },
          { to: "/kuechenmontage-steuerlich-absetzen", eyebrow: 'Küchenmontage', title: 'Küchenmontage steuerlich absetzen' },
          { to: "/kuechenmontage-in-wilhelmshaven", eyebrow: 'Leistung', title: 'Küchenmontage in Wilhelmshaven' },
        ]}
      />

      <CtaBlock title={'IKEA-Küche geplant?'} text={'Konfiguration und Fotos per WhatsApp – ehrliches Angebot meist am selben Werktag.'} />
    </>
  );
}
