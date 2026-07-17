import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, type ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

type Filter =
  | "Alle"
  | ProjectCategory
  | "Wilhelmshaven"
  | "Schortens"
  | "Hooksiel"
  | "Coldewei";

const filters: Filter[] = [
  "Alle",
  "Komplettprojekt",
  "Bodenverlegung",
  "Küchenmontage",
  "Küchenfolierung",
  "Treppenbelag",
  "Detailarbeiten",
  "Wilhelmshaven",
  "Schortens",
  "Hooksiel",
  "Coldewei",
];


const categorySet: ProjectCategory[] = [
  "Bodenverlegung",
  "Küchenmontage",
  "Küchenfolierung",
  "Treppenbelag",
  "Detailarbeiten",
];

export const Route = createFileRoute("/showroom/")({
  component: ShowroomPage,
  head: () => {
    const ogImage = "https://verlegt-verschraubt.de/projects/coldewei-03-vinyl-flur.webp";
    const ogDesc = "Ausgewählte Projekte aus Wilhelmshaven, Coldewei, Schortens, Hooksiel und Umgebung.";
    const ogTitle = "Showroom – Projekte von Verlegt & Verschraubt";
    return {
      meta: [
        { title: "Showroom – Projekte von Verlegt & Verschraubt Wilhelmshaven" },
        {
          name: "description",
          content:
            "Showroom: echte Projekte von Verlegt & Verschraubt aus Wilhelmshaven & Umgebung. Bodenverlegung, Küchenmontage, Küchenfolierung, Treppenbeläge und saubere Detailarbeiten.",
        },
        { property: "og:title", content: ogTitle },
        { property: "og:description", content: ogDesc },
        { property: "og:url", content: "https://verlegt-verschraubt.de/showroom" },
        { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: "Projektbeispiele von Verlegt & Verschraubt aus Wilhelmshaven und Umgebung" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: ogTitle },
        { name: "twitter:description", content: ogDesc },
        { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: "Projektbeispiele von Verlegt & Verschraubt aus Wilhelmshaven und Umgebung" },
      ],
      links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/showroom" }],
      scripts: [
        jsonLdScript([
          webPageNode({
            url: "https://verlegt-verschraubt.de/showroom",
            name: ogTitle,
            description: ogDesc,
          }),
          breadcrumbNode([
            { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
            { name: "Showroom", url: "https://verlegt-verschraubt.de/showroom" },
          ]),
        ]),
      ],
    };
  },
});

function ShowroomPage() {
  const [active, setActive] = useState<Filter>("Alle");

  const filtered = useMemo(() => {
    if (active === "Alle") return projects;
    if ((categorySet as string[]).includes(active)) {
      return projects.filter((p) => p.category === active);
    }
    return projects.filter((p) => p.ort.toLowerCase().includes(active.toLowerCase()));
  }, [active]);

  return (
    <>
      <PageHero
        eyebrow="Showroom"
        title="Showroom – Projekte von Verlegt & Verschraubt"
        intro="Hier finden Sie ausgewählte Projekte von Verlegt & Verschraubt Handwerkerservice aus Wilhelmshaven und Umgebung. Die Beispiele zeigen Bodenverlegung, Küchenmontage, Küchenfolierung, Treppenbeläge, Übergänge, Sockelleisten und saubere Detailarbeiten aus echten Projekten."
        breadcrumbs={[{ label: "Showroom" }]}
      />

      <Section eyebrow="Filter" title="Projekte filtern">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                active === f
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {active === "Alle" && filtered.length > 0 && (
          <Link
            to="/showroom/$slug"
            params={{ slug: filtered[0].slug }}
            className="group mt-10 relative block overflow-hidden rounded-2xl border border-border/70 bg-card/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <img
                src={filtered[0].cover}
                alt={filtered[0].coverAlt}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.15 0.012 60 / 0.85) 0%, oklch(0.15 0.012 60 / 0.35) 45%, transparent 75%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <p className="text-xs uppercase tracking-[0.28em] text-accent">Aktuelles Projekt</p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {filtered[0].title}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="opacity-80">{filtered[0].ort}</span>
                </p>
              </div>
            </div>
          </Link>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(active === "Alle" ? filtered.slice(1) : filtered).map((p, i) => (
            <ProjectCard key={p.slug} project={p} eager={i < 3} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            Für diesen Filter gibt es aktuell kein Projekt. Wählen Sie eine andere Kategorie oder einen anderen Ort.
          </p>
        )}
      </Section>

      <section className="relative border-t border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Anfrage</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Sie planen ein ähnliches Projekt?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Senden Sie uns Fotos, Maße und den Ort. Wir geben Ihnen eine erste Einschätzung und besprechen, was bei Ihrem Projekt sinnvoll möglich ist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
              <Link to="/kontakt">
                Kostenlose Ersteinschätzung anfragen <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card">
              <a href="tel:+491634799286"><Phone className="mr-1 h-4 w-4" /> Direkt anrufen</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card">
              <Link to="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBlock title="Mehr erfahren?" text="Telefon und E-Mail sind direkt – Sie sprechen mit dem Inhaber." />
    </>
  );
}
