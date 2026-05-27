import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { Kostenrechner } from "@/components/site/Kostenrechner";
import { QuickAnswer, FactBox, InternalLinks } from "@/components/site/InfoBlocks";
import {
  TrustBar,
  ReviewsAside,
  PostCalcTrust,
  ValuedBySection,
} from "@/components/site/TrustReviews";
import { AttributionDebugPanel } from "@/components/site/AttributionDebugPanel";

export const Route = createFileRoute("/preise")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Kostenrechner & Preise – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Kostenloser Kostenrechner für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – mit direkter WhatsApp-Anfrage." },
      { property: "og:title", content: "Kostenrechner – Verlegt & Verschraubt" },
      { property: "og:description", content: "Erste Preisorientierung in Sekunden – Anfrage direkt per WhatsApp senden." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/preise" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Preisrechner von Verlegt & Verschraubt für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kostenrechner – Verlegt & Verschraubt" },
      { name: "twitter:description", content: "Erste Preisorientierung in Sekunden – Anfrage direkt per WhatsApp senden." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Preisrechner von Verlegt & Verschraubt für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/preise" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://www.verlegt-verschraubt.de/preise", name: 'Kostenrechner – Verlegt & Verschraubt', description: 'Kostenloser Kostenrechner für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – mit direkter WhatsApp-Anfrage.' }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: 'Preise', url: "https://www.verlegt-verschraubt.de/preise" },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Kostenrechner"
        title="Kostenrechner für Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven"
        intro="Wählen Sie Ihre Leistung, ergänzen Sie ein paar Angaben und erhalten Sie eine unverbindliche Ersteinschätzung – inklusive direkter Anfrage per WhatsApp."
        breadcrumbs={[{ label: "Kostenrechner" }]}
      />

      <Section eyebrow="Kurzfassung" title="Wie Preise zustande kommen">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickAnswer>
            Der Preis hängt bei Verlegt &amp; Verschraubt vom Leistungsumfang,
            Zustand vor Ort, Material, Fläche, Etage, Anfahrt und Dringlichkeit
            ab. Der Kostenrechner liefert eine erste Orientierung und ersetzt
            kein verbindliches Angebot.
          </QuickAnswer>
          <FactBox />
        </div>
      </Section>

      <Section eyebrow="Hinweis" title="Unverbindliche Ersteinschätzung" bordered>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Die Berechnung ist eine grobe Orientierung. Endgültige Preise hängen
          von Untergrund, Material, Zugang und Sonderfaktoren ab. Senden Sie
          Fotos für eine genauere Einschätzung – am schnellsten direkt über
          WhatsApp.
        </p>
      </Section>

      <Section eyebrow="Rechner" title="Projekt einschätzen lassen" bordered>
        <div className="mb-8">
          <TrustBar />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="min-w-0">
            <Kostenrechner />
          </div>
          <div className="lg:sticky lg:top-24">
            <ReviewsAside />
          </div>
        </div>

        <div className="mt-10">
          <PostCalcTrust />
        </div>
      </Section>

      <Section eyebrow="Vertrauen" title="Was Kunden an Verlegt & Verschraubt schätzen">
        <ValuedBySection />
      </Section>

      <Section eyebrow="Weiterlesen" title="Passende Leistungen ansehen">
        <InternalLinks
          links={[
            { to: "/bodenverlegung-wilhelmshaven", label: "Bodenverlegung in Wilhelmshaven ansehen" },
            { to: "/kuechenmontage-in-wilhelmshaven", label: "Küchenmontage in Wilhelmshaven anfragen" },
            { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Kosten für Entrümpelung einschätzen" },
            { to: "/kontakt", label: "Projekt mit Fotos anfragen" },
          ]}
        />
      </Section>

      <CtaBlock
        title="Lieber direkt sprechen?"
        text="Anrufen oder WhatsApp – wir melden uns in der Regel innerhalb von 24 Stunden."
      />
      <AttributionDebugPanel />
    </>

  );
}
