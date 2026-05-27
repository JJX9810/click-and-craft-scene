import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/datenschutz")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Datenschutz – Verlegt & Verschraubt Handwerkerservice" },
      { name: "description", content: "Datenschutzerklärung von Verlegt & Verschraubt Handwerkerservice." },
      { property: "og:title", content: "Datenschutz – Verlegt & Verschraubt" },
      { property: "og:description", content: "Datenschutzerklärung von Verlegt & Verschraubt Handwerkerservice." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/datenschutz" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Datenschutz – Verlegt & Verschraubt" },
      { name: "twitter:description", content: "Datenschutzerklärung von Verlegt & Verschraubt Handwerkerservice." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/datenschutz" }],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutz" intro="Informationen zum Umgang mit personenbezogenen Daten gemäß DSGVO." breadcrumbs={[{ label: "Datenschutz" }]} />
      <Section>
        <div className="max-w-3xl space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold text-foreground">Verantwortlicher</h2>
            <p>Justus Brosch · Verlegt &amp; Verschraubt Handwerkerservice · Weichselstraße 12, 26388 Wilhelmshaven · justus.brosch@verlegt-verschraubt.de</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Kontaktanfragen</h2>
            <p>Wenn Sie uns per Formular, E-Mail, Telefon oder WhatsApp kontaktieren, werden die übermittelten Daten zur Bearbeitung Ihrer Anfrage gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Wir geben diese Daten nicht ohne Ihre Einwilligung weiter.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Hosting & Server-Logfiles</h2>
            <p>Beim Aufruf der Website werden technisch notwendige Daten (z. B. IP-Adresse, Datum/Uhrzeit, abgerufene Seite) verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Eingebettete Dienste</h2>
            <p>Auf einzelnen Seiten betten wir eine OpenStreetMap-Karte ein. Beim Aufruf wird Ihre IP-Adresse an OpenStreetMap übertragen.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Ihre Rechte</h2>
            <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch sowie ein Beschwerderecht bei einer Aufsichtsbehörde.</p>
          </div>
          <p className="text-xs">Diese Datenschutzerklärung wird laufend aktualisiert. Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}.</p>
        </div>
      </Section>
    </>
  );
}
