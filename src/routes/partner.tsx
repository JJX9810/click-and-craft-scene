import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";

export const Route = createFileRoute("/partner")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Partner & Netzwerk – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Partner & Netzwerk im Aufbau. Für Elektro- und Sanitärarbeiten arbeiten wir mit Fachbetrieben zusammen." },
      { property: "og:title", content: "Partner & Netzwerk" },
      { property: "og:description", content: "Saubere Abgrenzung und Zusammenarbeit mit Fachbetrieben." },
      { property: "og:url", content: "/partner" },
    ],
    links: [{ rel: "canonical", href: "/partner" }],
  }),
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Partner"
        title="Partner & Netzwerk im Aufbau."
        intro="Für bestimmte Arbeiten braucht es Fachbetriebe. Wir nennen ehrlich, was wir nicht machen, und stimmen uns bei Bedarf mit passenden Partnern ab."
        breadcrumbs={[{ label: "Partner" }]}
      />

      <Section eyebrow="Abgrenzung" title="Was Fachbetriebe übernehmen">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Elektroinstallation (Herd, Starkstrom, neue Leitungen)</Bullet>
          <Bullet>Sanitäranlagen und neue Wasserleitungen</Bullet>
          <Bullet>Heizungs- und Klimatechnik</Bullet>
          <Bullet>Schadstoffsanierung</Bullet>
        </ul>
      </Section>

      <Section eyebrow="Aufbau" title="Diese Partner ergänzen wir mit der Zeit" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <Bullet>Elektriker</Bullet>
          <Bullet>Sanitär</Bullet>
          <Bullet>Entsorger</Bullet>
          <Bullet>Maler</Bullet>
          <Bullet>Reinigungsservice</Bullet>
          <Bullet>Immobilienverwaltung</Bullet>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Hinweis: Wir nennen hier nur echte Partner. Solange Empfehlungen
          nicht bestätigt sind, bleibt diese Liste schlank.
        </p>
      </Section>

      <CtaBlock />
    </>
  );
}
