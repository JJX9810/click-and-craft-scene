import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/PageShell";

export type RelatedLink = {
  to: string;
  eyebrow: string;
  title: string;
};

export function RelatedTopics({ links }: { links: RelatedLink[] }) {
  return (
    <Section eyebrow="Verwandte Themen" title="Weiterlesen">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex flex-col rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_16px_40px_-24px_rgba(201,168,76,0.45)]"
          >
            <span className="text-[10px] uppercase tracking-[0.24em] text-accent">
              {l.eyebrow}
            </span>
            <h3 className="mt-2 font-display text-sm font-semibold leading-snug">
              {l.title}
            </h3>
            <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-accent">
              Lesen
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
