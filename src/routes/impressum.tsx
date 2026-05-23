import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/impressum")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Impressum – Verlegt & Verschraubt Handwerkerservice" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG." },
      { property: "og:url", content: "/impressum" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" intro="Anbieterkennzeichnung gemäß § 5 TMG." breadcrumbs={[{ label: "Impressum" }]} />
      <Section>
        <div className="prose prose-invert max-w-3xl space-y-6 text-sm text-muted-foreground">
          <div>
            <h2 className="text-base font-semibold text-foreground">Anbieter</h2>
            <p>Verlegt &amp; Verschraubt Handwerkerservice<br />
            Inhaber: Justus Brosch<br />
            Weichselstraße 12<br />
            26388 Wilhelmshaven</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Kontakt</h2>
            <p>Telefon: 0163 4799286<br />
            E-Mail: justus.brosch@verlegt-verschraubt.de</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Verantwortlich i.S.d. § 18 Abs. 2 MStV</h2>
            <p>Justus Brosch (Anschrift wie oben)</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a href="https://ec.europa.eu/consumers/odr" className="text-accent hover:underline" target="_blank" rel="noreferrer"> https://ec.europa.eu/consumers/odr</a>.
              Wir sind nicht bereit oder verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </div>
          <p className="text-xs">Weitere Pflichtangaben (z. B. USt-IdNr., Berufshaftpflicht) ergänzen wir, sobald sie vorliegen.</p>
        </div>
      </Section>
    </>
  );
}
