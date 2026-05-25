import { Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import { Layers, Wrench, Trash2, ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects, type Project } from "@/data/projects";
import { InternalLinks } from "@/components/site/InfoBlocks";
import { PreisrechnerCTA } from "@/components/site/PreisrechnerCTA";
import { ortFaqItems } from "@/lib/schema";

// Neutrale, faktische Kurzbeschreibungen – keine erfundenen Stadtteile,
// keine Fahrzeiten, keine Werbeversprechen.
const ORT_EINLEITUNG: Record<string, string> = {
  Wilhelmshaven:
    "Wilhelmshaven ist unser Standort an der Jade. Von hier aus bedienen wir die Stadt und die umliegende Region rund um den Jadebusen.",
  Sande:
    "Sande grenzt direkt an Wilhelmshaven und ist für uns aus der Region heraus gut erreichbar – für Bodenverlegung, Küchenmontage und Entrümpelung.",
  Schortens:
    "Schortens liegt im Landkreis Friesland in unmittelbarer Nachbarschaft zu Wilhelmshaven und Jever – Projekte dort betreuen wir aus Wilhelmshaven heraus.",
  Jever:
    "Jever ist die Kreisstadt des Landkreises Friesland. Wir arbeiten hier regelmäßig im Auftrag von Privatkunden aus Stadt und Umgebung.",
  Varel:
    "Varel liegt am westlichen Rand des Jadebusens im Landkreis Friesland. Vorhaben in Varel betreuen wir von Wilhelmshaven aus.",
  Wangerland:
    "Wangerland ist eine Gemeinde an der Nordseeküste im Landkreis Friesland. Wir übernehmen dort Boden-, Küchen- und Entrümpelungsprojekte aus der Region heraus.",
  Wittmund:
    "Wittmund ist die Kreisstadt des Landkreises Wittmund. Aufträge in Wittmund und Umgebung übernehmen wir aus Wilhelmshaven – ohne lange Wege.",
};

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

  const einleitung = ORT_EINLEITUNG[ort];
  const faqs = ortFaqItems(ort);
  const hasReferenzen = ortProjects.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Einsatzort"
        title={`Handwerkerservice in ${ort}`}
        intro={`Bodenverlegung, Küchenmontage und Entrümpelung in ${ort} und Umgebung. Lokal, planbar und sauber – mit kurzer Anfahrt aus Wilhelmshaven.`}
        breadcrumbs={[{ label: "Einsatzorte" }, { label: ort }]}
      />

      {einleitung && (
        <Section eyebrow={ort} title={`Kurz zu ${ort}`}>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {einleitung}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Verlegt &amp; Verschraubt sitzt in Wilhelmshaven (Weichselstraße 12). {ort} wird
            aus dieser Region heraus bedient – ohne erfundene Filiale vor Ort und ohne
            Versprechen, die wir nicht halten können.
          </p>
        </Section>
      )}

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
                {s.title} ansehen <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ablauf" title={`So läuft eine Anfrage in ${ort}`}>
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            { t: "Fotos oder Beschreibung senden", d: "Kurz schildern, worum es geht – Fotos helfen enorm." },
            { t: "Ort und Leistungswunsch nennen", d: `Stichwort ${ort} und gewünschte Leistung mitschicken.` },
            { t: "Erste Einschätzung erhalten", d: "Wir melden uns mit Rückfragen und einer ehrlichen Einschätzung." },
            { t: "Termin oder Vor-Ort-Besichtigung", d: "Bei Bedarf vereinbaren wir einen Vor-Ort-Termin." },
          ].map((step, i) => (
            <li key={step.t} className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Schritt {i + 1}</p>
              <h3 className="mt-1 text-base font-semibold">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Anfrage" title="Welche Angaben uns helfen" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Ort (z. B. {ort})</Bullet>
          <Bullet>Gewünschte Leistung (Boden, Küche, Entrümpelung)</Bullet>
          <Bullet>Maße, Fläche oder betroffener Raum</Bullet>
          <Bullet>Fotos der Räume und Anschlüsse</Bullet>
          <Bullet>Wunschzeitraum und Erreichbarkeit</Bullet>
          <Bullet>Besondere Umstände (Treppenhaus, Parken, Zugang)</Bullet>
        </ul>
      </Section>

      {hasReferenzen ? (
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
      ) : (
        <Section eyebrow="Referenzen" title="Aktuelle Projekte aus der Region">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Aktuell sind im Showroom keine Referenzen ausschließlich aus {ort} hinterlegt.
            Stattdessen zeigen wir dort Projekte aus Wilhelmshaven und Umgebung, die einen
            Eindruck von Qualität und Ablauf geben.
          </p>
          <div className="mt-6">
            <Link to="/showroom" className="inline-flex items-center text-sm text-accent hover:underline">
              Projekte aus Wilhelmshaven und Umgebung ansehen <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      <Section eyebrow="Region" title="Umliegende Orte" bordered>
        <ul className="flex flex-wrap gap-2 text-sm">
          {umgebung.map((o) => (
            <li key={o} className="rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur">{o}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title={`Häufige Fragen zu ${ort}`}>
        <div className="divide-y divide-border/60 rounded-2xl border border-border/70 bg-card/40 backdrop-blur">
          {faqs.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-foreground">
                <span>{f.q}</span>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section eyebrow="Weiterlesen" title="Passende Leistungen & nächste Schritte">
        <InternalLinks
          links={[
            { to: "/bodenverlegung-wilhelmshaven", label: `Bodenverlegung für ${ort} ansehen` },
            { to: "/kuechenmontage-in-wilhelmshaven", label: `Küchenmontage für ${ort} anfragen` },
            { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: `Entrümpelung für ${ort} planen` },
            { to: "/preise", label: "Kosten grob einschätzen" },
            { to: "/referenzen", label: "Referenzen ansehen" },
            { to: "/kontakt", label: `Projekt in ${ort} mit Fotos anfragen` },
          ]}
        />
      </Section>


      <PreisrechnerCTA variant="handwerkerservice" />

      <CtaBlock title={`Projekt in ${ort} anfragen`} text="Senden Sie Fotos und Maße – wir geben eine ehrliche Einschätzung." />
    </>
  );
}
