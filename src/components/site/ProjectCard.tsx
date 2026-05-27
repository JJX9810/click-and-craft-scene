import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Play } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const hasVideo = project.media.some((m) => m.type === "video");
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/50 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
      <Link
        to="/showroom/$slug"
        params={{ slug: project.slug }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        <img
          src={project.cover}
          alt={project.coverAlt}
          title={project.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback !== "1") {
              img.dataset.fallback = "1";
              img.src = "/wood-bg.png";
            }
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/85 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur">
            {project.category}
          </span>
          {hasVideo && (
            <span className="flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur">
              <Play className="h-2.5 w-2.5" /> Video
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <MapPin className="h-3 w-3 text-accent" /> {project.ort}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <Link
            to="/showroom/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-2"
          >
            Projekt ansehen <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/kontakt"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            Anfragen
          </Link>
        </div>
      </div>
    </article>
  );
}
