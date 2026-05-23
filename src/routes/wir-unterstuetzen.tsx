import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";

export const Route = createFileRoute("/wir-unterstuetzen")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Wir unterstützen – Umzug, Renovierung, Wohnungsübergabe" },
      { name: "description", content: "Bei Umzug, Renovierung, Küche im neuen Zuhause oder Wohnungsübergabe: Verlegt & Verschraubt unterstützt mit Bodenverlegung, Küchenmontage und Entrümpelung." },
      { property: "og:title", content: "Wir unterstützen" },
      { property: "og:description", content: "Leistungen nach Lebenssituation – wir holen Sie da ab, wo Sie stehen." },
      { property: "og:url", content: "/wir-unterstuetzen" },
    ],
    links: [{ rel: "canonical", href: "/wir-unterstuetzen" }],
  }),
});

const items = [
  { t: "Umzug", d: "Boden, Küche und Räumung im neuen oder alten Zuhause aus einer Hand." },
  { t: "Renovierung", d: "Räume vorbereiten, Boden erneuern, Küche montieren – planbar und sauber." },
  { t: "Küche nach Umzug", d: "Bestehende Küche im neuen Raum sauber aufstellen und anschließen." },
  { t: "Wohnung vorbereiten", d: "Boden erneuern und Räume frei machen, bevor Möbel einziehen." },
  { t: "Räume leer bekommen", d: "Entrümpelung und Sperrmüll – schnell und besenrein." },
  { t: "Vermieter & Wohnungsübergabe", d: "Übergabe-fähige Räume nach Auszug oder Wohnungswechsel." },
  { t: "Angehörige & Senioren", d: "Diskrete Räumung und kleine Anpassungen mit Rücksicht." },
  { t: "Kleine Innenarbeiten", d: "Sockelleisten, Übergänge, Restmontagen – wo es eben hakt." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Wir unterstützen"
        title="Wir holen Sie da ab, wo Sie stehen."
        intro="Manchmal ist nicht klar, welche Leistung passt – Hauptsache, am Ende ist der Raum fertig. Diese Lebenssituationen kommen häufig vor."
        breadcrumbs={[{ label: "Wir unterstützen" }]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <article key={i.t} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <h3 className="text-base font-semibold">{i.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBlock />
    </>
  );
}
