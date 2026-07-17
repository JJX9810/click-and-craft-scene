import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, CtaBlock, Bullet } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import { getProject, projects, type ProjectMedia } from "@/data/projects";
import { ArrowRight, ChevronRight, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const WA_HREF =
  "https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20";

export const Route = createFileRoute("/showroom/$slug")({
  component: ProjectDetail,
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return {};
    const url = `https://verlegt-verschraubt.de/showroom/${p.slug}`;
    const ogImage = "https://verlegt-verschraubt.de/og-image.jpg";
    const firstLocal = p.media.find(
      (m) => m.type === "image" && typeof m.src === "string" && m.src.startsWith("/projects/"),
    );
    const nodes: unknown[] = [
      webPageNode({ url, name: p.title, description: p.description }),
      breadcrumbNode([
        { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
        { name: "Showroom", url: "https://verlegt-verschraubt.de/showroom" },
        { name: p.title, url },
      ]),
    ];
    if (firstLocal) {
      const absSrc = `https://verlegt-verschraubt.de${firstLocal.src}`;
      nodes.push({
        "@type": "ImageObject",
        contentUrl: absSrc,
        url: absSrc,
        name: firstLocal.alt,
        caption: firstLocal.caption,
        description: firstLocal.longDescription ?? firstLocal.caption ?? firstLocal.alt,
      });
    }
    return {
      meta: [
        { title: `${p.title} – Showroom Verlegt & Verschraubt` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: "Projektbeispiel von Verlegt & Verschraubt aus Wilhelmshaven und Umgebung" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: "Projektbeispiel von Verlegt & Verschraubt aus Wilhelmshaven und Umgebung" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [jsonLdScript(nodes)],
    };
  },
});

function MediaItem({ m, eager }: { m: ProjectMedia; eager?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border/70 bg-card/40">
      <div className="relative aspect-[4/3] bg-muted">
        {m.type === "image" ? (
          <img
            src={m.src}
            alt={m.alt}
            title={m.caption ?? m.alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.dataset.fallback !== "1") {
                img.dataset.fallback = "1";
                img.src = "/wood-bg.webp";
              }
            }}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={m.src}
            poster="/wood-bg.webp"
            controls
            preload="metadata"
            playsInline
            className="h-full w-full object-cover"
          />
        )}
        {m.phase && (
          <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur">
            {m.phase}
          </span>
        )}
      </div>
      {(m.caption || m.longDescription) && (
        <figcaption className="space-y-2 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {m.caption && <span className="block font-medium text-foreground/85">{m.caption}</span>}
          {m.longDescription && <span className="block text-[11px] leading-relaxed text-muted-foreground/85">{m.longDescription}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: NonNullable<ReturnType<typeof getProject>> };
  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);

  const serviceLinkMap: Record<string, string> = {
    Bodenverlegung: "/bodenverlegung-wilhelmshaven",
    Treppenbelag: "/bodenverlegung-wilhelmshaven",
    Küchenmontage: "/kuechenmontage-in-wilhelmshaven",
    Küchenfolierung: "/kuechenmontage-in-wilhelmshaven",
    Detailarbeiten: "/bodenverlegung-wilhelmshaven",
  };
  const serviceLink = serviceLinkMap[project.category] ?? "/kontakt";

  return (
    <>
      <section className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:pt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr,380px] lg:items-start">
            <div>
              <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Start</Link>
                <span className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <Link to="/showroom" className="hover:text-foreground">Showroom</Link>
                </span>
                <span className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-foreground">{project.title}</span>
                </span>
              </nav>
              <p className="text-xs uppercase tracking-[0.28em] text-accent">{project.category}</p>
              <h1 className="mt-3 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {project.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-[#25D366] px-7 text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#25D366]/90"
                >
                  <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp schreiben
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
                >
                  <a href="tel:+491634799286">
                    <Phone className="mr-1 h-4 w-4" /> 0163 4799286
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/kontakt">
                    Projekt anfragen <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            {project.testimonial && (
              <aside className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5" aria-label="5 von 5 Sternen">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
                    ))}
                  </div>
                  <span className="text-sm font-medium">5,0</span>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                  „{project.testimonial.shortQuote ?? project.testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 not-italic">
                  <span className="block font-medium">{project.testimonial.author}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Google-Bewertung · 5 Sterne · Juli 2026
                  </span>
                </figcaption>
              </aside>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent" /> {project.ort}
            </span>
            <span className="rounded-full border border-border bg-card/50 px-3 py-1 text-xs uppercase tracking-[0.18em]">
              {project.category}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to={serviceLink}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card/50 px-4 py-2 text-xs uppercase tracking-[0.18em] hover:border-accent/60 hover:text-accent"
            >
              Ähnliche Leistung anfragen <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs uppercase tracking-[0.18em] text-accent-foreground hover:bg-accent/90"
            >
              Projekt anfragen <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {project.services && project.services.length > 0 && (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Leistungen in diesem Projekt</p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              {project.services.map((s) => (
                <Bullet key={s}>{s}</Bullet>
              ))}
            </ul>
          </div>
        )}

        {project.beforeAfter && project.beforeAfter.length > 0 && (
          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Vorher / Nachher</p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Ziehen Sie den Regler.
            </h2>
            <div
              className={`mt-6 grid gap-8 md:grid-cols-2 ${
                project.beforeAfter.length === 1 ? "max-w-2xl" : ""
              }`}
            >
              {project.beforeAfter.map((pair, i) => (
                <div key={pair.before + i} className="mx-auto w-full max-w-sm md:max-w-none">
                  <BeforeAfterSlider
                    before={pair.before}
                    after={pair.after}
                    alt={pair.alt}
                    eager={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {project.media[0] && (
          <div className="mt-12">
            <MediaItem m={project.media[0]} eager />
          </div>
        )}
        {project.media.length > 1 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.media.slice(1).map((m, i) => (
              <MediaItem key={m.src + i} m={m} />
            ))}
          </div>
        )}

      </Section>

      {related.length > 0 && (
        <Section eyebrow="Ähnliche Projekte" title="Weitere Arbeiten in dieser Kategorie" bordered>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBlock
        title="Sie planen ein ähnliches Projekt?"
        text="Senden Sie uns Fotos, Maße und den Ort. Wir geben Ihnen eine erste Einschätzung."
      />
    </>
  );
}
