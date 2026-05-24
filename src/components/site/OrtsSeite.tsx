import { Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import { Layers, Wrench, Trash2, ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, type Project } from "@/data/projects";

export function OrtsSeite({
  ort,
  umgebung,
  projectSlugs,
}: {
  ort: string;
  umgebung: string[];
  projectSlugs?: string[];
}) {
  const ortProjects: Project[] = projectSlugs
    ? (projectSlugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as Project[])
    : projects.filter((p) => p.ort.toLowerCase().includes(ort.toLowerCase()));
  const services = [
    { icon: Layers, title: `Bodenverlegung in ${ort}`, desc: "Vinyl, Laminat, PVC und Teppich – sauber verlegt.", to: "/bodenverlegung-wilhelmshaven" },
    { icon: Wrench, title: `Küchenmontage in ${ort}`, desc: "Aufbau nach Umzug, Restmontage, Arbeitsplatten.", to: "/kuechenmontage-in-wilhelmshaven" },
    { icon: Trash2, title: `Entrümpelung in ${ort}`, desc: "Wohnung, Keller, Dachboden – planbar und besenrein.", to: "/entruempelung-entsorgung-in-wilhelmshaven" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Einsatzort"
        title={`Handwerkerservice in ${ort}`}
        intro={`Bodenverlegung, Küchenmontage und Entrümpelung in ${ort} und Umgebung. Lokal, planbar und sauber – mit kurzer Anfahrt aus Wilhelmshaven.`}
        breadcrumbs={[{ label: "Einsatzorte" }, { label: ort }]}
      />

      <Section eyebrow="Leistungen" title={`Was wir in ${ort} machen`}>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="group rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur transition-colors hover:border-accent/60">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <Link to={s.to} className="mt-5 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-2">
                Details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Anfrage" title="Was wir für eine Einschätzung brauchen" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Kurze Beschreibung des Vorhabens</Bullet>
          <Bullet>Fotos der Räume und Anschlüsse</Bullet>
          <Bullet>Grobe Maße bzw. Quadratmeter</Bullet>
          <Bullet>Wunschzeitraum und Erreichbarkeit</Bullet>
        </ul>
      </Section>

      {ortProjects.length > 0 && (
        <Section eyebrow="Referenzen" title={`Projekte in ${ort} und Umgebung`}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ortProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i === 0} />
            ))}
          </div>
          <div className="mt-8">
            <Link to="/showroom" className="inline-flex items-center text-sm text-accent hover:underline">
              Alle Projekte im Showroom <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

        <ol className="grid gap-6 md:grid-cols-4">
          {["Anfrage senden", "Fotos & Maße", "Einschätzung", "Saubere Umsetzung"].map((t, i) => (
            <li key={t} className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Schritt {i + 1}</p>
              <h3 className="mt-1 text-base font-semibold">{t}</h3>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Region" title="Umliegende Orte" bordered>
        <ul className="flex flex-wrap gap-2 text-sm">
          {umgebung.map((o) => (
            <li key={o} className="rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur">{o}</li>
          ))}
        </ul>
      </Section>

      <CtaBlock title={`Projekt in ${ort} anfragen`} text="Senden Sie Fotos und Maße – wir geben eine ehrliche Einschätzung." />
    </>
  );
}
