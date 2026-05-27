import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";

export const Route = createFileRoute("/ueber-uns")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Über uns – Verlegt & Verschraubt Handwerkerservice Wilhelmshaven" },
      { name: "description", content: "Inhaber Justus Brosch und das Z.O.Z.-Prinzip: Zuverlässig, Ordentlich, Zügig. Lokal in Wilhelmshaven, ehrlich und bodenständig." },
      { property: "og:title", content: "Über uns – Verlegt & Verschraubt" },
      { property: "og:description", content: "Wer hinter Verlegt & Verschraubt steht und wie wir arbeiten." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/ueber-uns" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Über Verlegt & Verschraubt – Handwerkerservice aus Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Über uns – Verlegt & Verschraubt" },
      { name: "twitter:description", content: "Wer hinter Verlegt & Verschraubt steht und wie wir arbeiten." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Über Verlegt & Verschraubt – Handwerkerservice aus Wilhelmshaven" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/ueber-uns" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/ueber-uns", name: 'Über uns – Verlegt & Verschraubt', description: 'Über Verlegt & Verschraubt Handwerkerservice – Inhaber Justus Brosch aus Wilhelmshaven.' }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Über uns', url: "https://verlegt-verschraubt.de/ueber-uns" },
        ]),
      ]),
    ],
  }),
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Lokales Handwerk aus Wilhelmshaven."
        intro="Verlegt & Verschraubt ist ein kleiner Handwerkerservice für Privatkunden. Inhaber Justus Brosch arbeitet mit klarem Fokus: Bodenverlegung, Küchenmontage und Entrümpelung – sauber gemacht."
        breadcrumbs={[{ label: "Über uns" }]}
      />

      <Section eyebrow="Inhaber" title="Justus Brosch">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Sie sprechen direkt mit dem Inhaber. Kurze Wege, klare Absprachen,
          ehrliche Einschätzung. Keine Verwaltungsschleifen, keine wechselnden
          Ansprechpartner.
        </p>
      </Section>

      <Section eyebrow="Z.O.Z." title="Wofür unsere Werte stehen" bordered>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Zuverlässig", d: "Klare Kommunikation, realistische Einschätzung, verbindliche Termine." },
            { t: "Ordentlich", d: "Saubere Ausführung, strukturierte Arbeit, gepflegte Übergaben." },
            { t: "Zügig", d: "Schnelle Rückmeldung, einfache Anfrage, keine unnötigen Hürden." },
          ].map((v) => (
            <article key={v.t} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Arbeitsweise" title="Wie wir arbeiten">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Anfrage prüfen und ehrlich einschätzen – auch wenn’s nicht passt</Bullet>
          <Bullet>Saubere Vorbereitung, ordentlicher Werkzeugumgang</Bullet>
          <Bullet>Klare Termine, planbare Übergabe</Bullet>
          <Bullet>Bei spezieller Arbeit: Fachbetriebe einbinden</Bullet>
        </ul>
      </Section>

      <Section eyebrow="Was wir bewusst nicht machen" title="Grenzen kennen wir." bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Keine Elektroinstallation</Bullet>
          <Bullet>Keine Sanitäränderungen</Bullet>
          <Bullet>Keine tragenden Bauteile</Bullet>
          <Bullet>Keine Versprechen, die wir nicht halten können</Bullet>
        </ul>
      </Section>

      <CtaBlock />
    </>
  );
}
