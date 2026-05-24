import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { Kostenrechner } from "@/components/site/Kostenrechner";

export const Route = createFileRoute("/preise")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Kostenrechner & Preise – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Kostenloser Kostenrechner für Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – mit direkter WhatsApp-Anfrage." },
      { property: "og:title", content: "Kostenrechner – Verlegt & Verschraubt" },
      { property: "og:description", content: "Erste Preisorientierung in Sekunden – Anfrage direkt per WhatsApp senden." },
      { property: "og:url", content: "/preise" },
    ],
    links: [{ rel: "canonical", href: "/preise" }],
  }),
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Kostenrechner"
        title="In wenigen Schritten zur Ersteinschätzung."
        intro="Wählen Sie Ihre Leistung, ergänzen Sie ein paar Angaben und senden Sie alles auf Wunsch direkt per WhatsApp – inklusive aller Daten aus dem Rechner."
        breadcrumbs={[{ label: "Kostenrechner" }]}
      />

      <Section eyebrow="Hinweis" title="Unverbindliche Ersteinschätzung">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Die Berechnung ist eine grobe Orientierung. Endgültige Preise hängen
          von Untergrund, Material, Zugang und Sonderfaktoren ab. Senden Sie
          Fotos für eine genauere Einschätzung – am schnellsten direkt über
          WhatsApp.
        </p>
      </Section>

      <Section eyebrow="Rechner" title="Projekt einschätzen lassen" bordered>
        <Kostenrechner />
      </Section>

      <CtaBlock
        title="Lieber direkt sprechen?"
        text="Anrufen oder WhatsApp – wir melden uns in der Regel innerhalb von 24 Stunden."
      />
    </>
  );
}
