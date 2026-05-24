import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock, Bullet } from "@/components/site/PageShell";
import { ProjectCard } from "@/components/site/ProjectCard";
import { getProject, projects, type ProjectMedia } from "@/data/projects";
import { ArrowRight, MapPin } from "lucide-react";

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
    return {
      meta: [
        { title: `${p.title} – Showroom Verlegt & Verschraubt` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:url", content: `/showroom/${p.slug}` },
        { property: "og:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: `/showroom/${p.slug}` }],
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
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            src={m.src}
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
      {m.caption && (
        <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {m.caption}
        </figcaption>
      )}
    </figure>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
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
      <PageHero
        eyebrow={project.category}
        title={project.title}
        intro={project.description}
        breadcrumbs={[
          { label: "Showroom", to: "/showroom" },
          { label: project.title },
        ]}
      />

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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {project.media.map((m, i) => (
            <MediaItem key={m.src + i} m={m} eager={i === 0} />
          ))}
        </div>
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
