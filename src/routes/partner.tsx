import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import { Star, Phone, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/partner")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Partner & Netzwerk – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Unsere Partner: J.S Küchen Duo Handwerk & Umbau. Für Elektro- und Sanitärarbeiten arbeiten wir mit Fachbetrieben zusammen." },
      { property: "og:title", content: "Partner & Netzwerk" },
      { property: "og:description", content: "Saubere Abgrenzung und Zusammenarbeit mit Fachbetrieben." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/partner" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Partner und Kooperationen von Verlegt & Verschraubt aus Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Partner & Netzwerk" },
      { name: "twitter:description", content: "Saubere Abgrenzung und Zusammenarbeit mit Fachbetrieben." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Partner und Kooperationen von Verlegt & Verschraubt aus Wilhelmshaven" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/partner" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/partner", name: 'Partner – Verlegt & Verschraubt', description: 'Partner und Kooperationen von Verlegt & Verschraubt.' }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Partner', url: "https://verlegt-verschraubt.de/partner" },
        ]),
      ]),
    ],
  }),
});

const tags = ["Küchenmontage", "Möbelmontage", "Küchenabbau", "Demontage", "Entrümpelung", "Umbauarbeiten"];

function PartnerCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">Empfohlener Partner</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            J.S Küchen Duo Handwerk &amp; Umbau
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Küchenbau · Handwerk &amp; Umbau
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">5,0</span>
          <span className="text-muted-foreground">· 14 Google-Rezensionen</span>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        J.S Küchen Duo Handwerk &amp; Umbau ist ein zuverlässiger Partner für Küchenmontage, Möbelmontage,
        Küchenabbau, Demontage und Entrümpelung. Das Unternehmen unterstützt Kunden bei Umzügen,
        Renovierungen und Umbauarbeiten mit sauberer, zuverlässiger und kundenorientierter Ausführung.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>Enfieldstraße 241<br />45966 Gladbeck</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
          <a href="tel:+4915757941442" className="hover:text-foreground">01575 7941442</a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
        >
          <a href="https://www.kuechenduohandwerkundumbau.de" target="_blank" rel="noreferrer">
            <Globe className="mr-1 h-4 w-4" /> Website besuchen
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-border bg-transparent px-5"
        >
          <a href="tel:+4915757941442">
            <Phone className="mr-1 h-4 w-4" /> Anrufen
          </a>
        </Button>
      </div>
    </article>
  );
}

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Partner"
        title="Partner & Netzwerk."
        intro="Für bestimmte Arbeiten braucht es Fachbetriebe. Wir nennen ehrlich, was wir nicht machen, und stimmen uns bei Bedarf mit passenden Partnern ab."
        breadcrumbs={[{ label: "Partner" }]}
      />

      <Section eyebrow="Empfohlener Partner" title="Mit wem wir gerne zusammenarbeiten">
        <PartnerCard />
      </Section>

      <Section eyebrow="Abgrenzung" title="Was Fachbetriebe übernehmen" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Elektroinstallation (Herd, Starkstrom, neue Leitungen)</Bullet>
          <Bullet>Sanitäranlagen und neue Wasserleitungen</Bullet>
          <Bullet>Heizungs- und Klimatechnik</Bullet>
          <Bullet>Schadstoffsanierung</Bullet>
        </ul>
      </Section>

      <Section eyebrow="Aufbau" title="Diese Partner ergänzen wir mit der Zeit">
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
