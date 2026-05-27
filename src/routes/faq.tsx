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
    ],
  },
  {
    title: "Bodenverlegung",
    items: [
      { q: "Was kostet Bodenverlegung in Wilhelmshaven?", a: "Der Preis hängt von Bodenart, Fläche, Vorbereitung und Zubehör ab. Erste Orientierung im Preisrechner." },
      { q: "Muss der Raum leer sein?", a: "Idealerweise ja. Kleinere Möbelumstellungen sind nach Absprache möglich." },
    ],
  },
  {
    title: "Küchenmontage",
    items: [
      { q: "Montiert ihr Küchen nach einem Umzug?", a: "Ja. Küche aus dem alten Zuhause aufbauen und anschließen ist ein häufiger Auftrag." },
      { q: "Schließt ihr Herd oder Starkstrom an?", a: "Nein. Diese Arbeiten übernehmen Elektrofachbetriebe." },
    ],
  },
  {
    title: "Entrümpelung",
    items: [
      { q: "Übernehmt ihr Entrümpelung in Sande oder Schortens?", a: "Ja. Wir arbeiten in ganz Wilhelmshaven und Umgebung – andere Orte gerne auf Anfrage." },
      { q: "Arbeitet ihr auch für Vermieter?", a: "Ja, Wohnungsübergaben und Räumungen vor Renovierung sind möglich." },
    ],
  },
  {
    title: "Grenzen / Fachbetriebe",
    items: [
      { q: "Wann ist ein Fachbetrieb nötig?", a: "Bei Elektro-, Sanitär- und tragenden Arbeiten. Wir sagen ehrlich, wenn die Aufgabe besser bei Fachbetrieben liegt." },
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
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Häufige Fragen zu Bodenverlegung, Küchenmontage und Entrümpelung bei Verlegt & Verschraubt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Häufige Fragen" },
      { name: "twitter:description", content: "Antworten zu Leistungen, Preisen und Ablauf." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
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
