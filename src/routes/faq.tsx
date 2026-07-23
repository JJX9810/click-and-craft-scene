import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  breadcrumbNode, faqPageNode, jsonLdScript, webPageNode,
} from "@/lib/schema";
import { InternalLinks } from "@/components/site/InfoBlocks";

const FAQ_URL = "https://verlegt-verschraubt.de/faq";

const faqGroups = [
  {
    title: "Allgemein",
    items: [
      { q: "Reichen Fotos für eine erste Einschätzung?", a: "Ja. Mit Fotos, groben Maßen und einer kurzen Beschreibung bekommen Sie meist schon eine belastbare erste Einschätzung." },
      { q: "Wie schnell bekommt man einen Termin?", a: "Je nach Auslastung sind Termine oft kurzfristig möglich. An Werktagen melden wir uns in der Regel innerhalb von 24 Stunden." },
      { q: "Was macht ihr nicht?", a: "Keine Elektroinstallation, keine Sanitäränderungen und keine tragenden Bauarbeiten." },
      { q: "Wer bietet Renovierung aus einer Hand in Wilhelmshaven an?", a: "Verlegt & Verschraubt führt Boden, Küche und Entrümpelung selbst aus und koordiniert weitere Gewerke wie Elektrik, Sanitär, Malerarbeiten oder den Umzug über geprüfte Partnerbetriebe – ein Ansprechpartner für das gesamte Projekt, kein Generalunternehmer." },
    ],
  },
  {
    title: "Bodenverlegung",
    items: [
      { q: "Was kostet Bodenverlegung in Wilhelmshaven?", a: "Richtwerte (Arbeitslohn): Laminat 16 €/m², Vinyl schwimmend 18 €/m², Vinyl verklebt 22 €/m², PVC 12–15 €/m², Teppich 10–12 €/m². Verbindlich wird der Preis nach Fotos und Maßen – erste Orientierung liefert der Preisrechner." },
      { q: "Wer verlegt Böden in Wilhelmshaven und Umgebung?", a: "Verlegt & Verschraubt verlegt Laminat, Vinyl, PVC und Teppich in Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland und Wittmund. Anfrage am einfachsten per WhatsApp mit Fotos – Einschätzung meist am selben Werktag." },
      { q: "Muss der Raum leer sein?", a: "Idealerweise ja. Kleinere Möbelumstellungen sind nach Absprache möglich." },
    ],
  },
  {
    title: "Küchenmontage",
    items: [
      { q: "Wer baut in Wilhelmshaven oder Schortens Küchen auf?", a: "Verlegt & Verschraubt montiert Küchen in Wilhelmshaven und Umgebung – auch nach einem Umzug – für 189 €/lfm Arbeitslohn. Elektro- und Sanitäranschlüsse außerhalb des zulässigen Rahmens übernehmen Fachbetriebe." },
      { q: "Montiert ihr Küchen nach einem Umzug?", a: "Ja. Küche aus dem alten Zuhause aufbauen und anschließen ist ein häufiger Auftrag." },
      { q: "Schließt ihr Herd oder Starkstrom an?", a: "Nein. Diese Arbeiten übernehmen Elektrofachbetriebe." },
    ],
  },
  {
    title: "Entrümpelung",
    items: [
      { q: "Wer macht Entrümpelung und Haushaltsauflösung in Wilhelmshaven?", a: "Verlegt & Verschraubt entrümpelt Wohnungen, Häuser, Keller und Dachböden in Wilhelmshaven und Umgebung – inklusive fachgerechter Entsorgung, auf Wunsch besenrein zur Übergabe." },
      { q: "Was kostet die Besichtigung vor Ort?", a: "Die Vor-Ort-Besichtigung ist kostenlos und unverbindlich. Danach erhalten Sie ein schriftliches, verbindliches Angebot statt einer groben Schätzung." },
      { q: "Übernehmt ihr Entrümpelung in Sande oder Schortens?", a: "Ja. Wir arbeiten in ganz Wilhelmshaven und Umgebung – andere Orte gerne auf Anfrage." },
      { q: "Arbeitet ihr auch für Vermieter?", a: "Ja, Wohnungsübergaben und Räumungen vor Renovierung sind möglich." },
    ],
  },
  {
    title: "Netzwerk & Fachbetriebe",
    items: [
      {
        q: "Übernehmen Sie auch Arbeiten außerhalb Ihrer Fachbereiche?",
        a: "Was wir selbst können, machen wir selbst: Bodenverlegung, Küchenmontage, Entrümpelung und Entsorgung. Was nicht unser Fachbereich ist – etwa Elektroinstallation oder Sanitär – übernehmen geprüfte Partnerbetriebe aus unserem Netzwerk, koordiniert von uns. Sie behalten dabei durchgehend einen Ansprechpartner: uns. So müssen Sie nicht mehrere Handwerker suchen, vergleichen und koordinieren. Mehr dazu auf unserer Netzwerk-Seite: https://verlegt-verschraubt.de/partner",
      },
      { q: "Wann ist ein Fachbetrieb nötig?", a: "Bei Elektro-, Sanitär- und tragenden Arbeiten. Wir sagen ehrlich, wenn die Aufgabe besser bei Fachbetrieben liegt – und holen bei Bedarf einen geprüften Partnerbetrieb aus unserem Netzwerk dazu." },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  component: Page,
  head: () => ({
    meta: [
      { title: "FAQ – Häufige Fragen | Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Antworten zu Anfragen, Preisen, Bodenverlegung, Küchenmontage, Entrümpelung und Einsatzgebiet rund um Wilhelmshaven." },
      { property: "og:title", content: "Häufige Fragen" },
      { property: "og:description", content: "Antworten zu Leistungen, Preisen und Ablauf." },
      { property: "og:url", content: FAQ_URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Häufige Fragen zu Bodenverlegung, Küchenmontage und Entrümpelung bei Verlegt & Verschraubt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Häufige Fragen" },
      { name: "twitter:description", content: "Antworten zu Leistungen, Preisen und Ablauf." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { name: "twitter:image:alt", content: "Häufige Fragen zu Bodenverlegung, Küchenmontage und Entrümpelung bei Verlegt & Verschraubt" },
    ],
    links: [{ rel: "canonical", href: FAQ_URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: FAQ_URL,
          name: "Häufige Fragen",
          description: "Antworten zu Anfragen, Preisen, Bodenverlegung, Küchenmontage, Entrümpelung und Einsatzgebiet rund um Wilhelmshaven.",
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "FAQ", url: FAQ_URL },
        ]),
        faqPageNode(faqGroups.flatMap(g => g.items)),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Häufige Fragen."
        intro="Antworten zu Anfragen, Preisen und Leistungen. Was Sie hier nicht finden, klären wir gerne im persönlichen Kontakt."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      {faqGroups.map((g, gi) => (
        <Section key={g.title} eyebrow="Kategorie" title={g.title} bordered={gi % 2 === 1}>
          <Accordion type="single" collapsible className="max-w-3xl">
            {g.items.map((f, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`} className="border-border/70">
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      ))}

      <Section eyebrow="Weiterlesen" title="Direkt zur passenden Leistung" bordered>
        <InternalLinks
          links={[
            { to: "/bodenverlegung-wilhelmshaven", label: "Bodenverlegung in Wilhelmshaven ansehen" },
            { to: "/kuechenmontage-in-wilhelmshaven", label: "Küchenmontage in Wilhelmshaven anfragen" },
            { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Kosten für Entrümpelung einschätzen" },
            { to: "/preise", label: "Zum Kostenrechner" },
            { to: "/kontakt", label: "Projekt mit Fotos anfragen" },
          ]}
        />
      </Section>

      <CtaBlock />
    </>
  );
}
