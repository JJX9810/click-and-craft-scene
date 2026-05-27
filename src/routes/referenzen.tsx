import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { Star, ArrowRight } from "lucide-react";
import { InternalLinks } from "@/components/site/InfoBlocks";

export const Route = createFileRoute("/referenzen")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Referenzen & Bewertungen – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "description", content: "Echte Bewertungen von Kunden auf Google, MyHammer, Das Telefonbuch und Facebook – Auszüge zu Bodenverlegung, Küchenmontage und Zuverlässigkeit." },
      { property: "og:title", content: "Referenzen & Bewertungen" },
      { property: "og:description", content: "Bewertungen unserer Kunden zu Bodenverlegung, Küchenmontage und mehr." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/referenzen" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Referenzen und Kundenstimmen von Verlegt & Verschraubt aus Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Referenzen & Bewertungen" },
      { name: "twitter:description", content: "Bewertungen unserer Kunden zu Bodenverlegung, Küchenmontage und mehr." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Referenzen und Kundenstimmen von Verlegt & Verschraubt aus Wilhelmshaven" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/referenzen" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/referenzen", name: 'Referenzen – Verlegt & Verschraubt', description: 'Ausgewählte Projekte und Referenzen aus Wilhelmshaven und Umgebung.' }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Referenzen', url: "https://verlegt-verschraubt.de/referenzen" },
        ]),
      ]),
    ],
  }),
});

type Cat = "Alle" | "Bodenverlegung" | "Küchenmontage" | "Arbeitsplatten" | "Kommunikation" | "Zuverlässigkeit" | "Problemlösung";

const reviews: { name: string; src: string; cat: Exclude<Cat, "Alle">; text: string }[] = [
  { name: "Ricarda F.", src: "MyHammer", cat: "Arbeitsplatten", text: "Sehr lösungsorientiert bei den Arbeitsplatten – die Küche ist jetzt richtig stimmig. (Auszug)" },
  { name: "Pass Pass2", src: "Google", cat: "Küchenmontage", text: "Küche nach unserem Umzug komplett aufgebaut. Saubere Arbeit, alles funktioniert. (Auszug)" },
  { name: "Haysam B.", src: "Google", cat: "Bodenverlegung", text: "Laminat im ganzen Wohnzimmer verlegt – ordentlich, schnell, ohne Diskussion. (Auszug)" },
  { name: "Euphoria_Zeus", src: "Google", cat: "Bodenverlegung", text: "Boden ordentlich und zügig verlegt. Genau wie versprochen. (Auszug)" },
  { name: "Finjas W.", src: "Google", cat: "Bodenverlegung", text: "Laminat verlegt, schnelle Abwicklung, freundlicher Kontakt. (Auszug)" },
  { name: "Pauline G.", src: "Google", cat: "Zuverlässigkeit", text: "Sehr zuverlässig und flexibel bei einem kurzfristigen Termin. (Auszug)" },
  { name: "Vanessa F.", src: "Google", cat: "Problemlösung", text: "Hat eine schwierige Situation pragmatisch und sauber gelöst. (Auszug)" },
  { name: "bartelsjana3081", src: "Das Telefonbuch", cat: "Zuverlässigkeit", text: "Pünktlich, mit Blick fürs Detail. Klare Empfehlung. (Auszug)" },
  { name: "Michael Kraushaar", src: "Facebook", cat: "Kommunikation", text: "Klare Kommunikation und faires Preis-Leistungs-Verhältnis. (Auszug)" },
];

const cats: Cat[] = ["Alle", "Bodenverlegung", "Küchenmontage", "Arbeitsplatten", "Kommunikation", "Zuverlässigkeit", "Problemlösung"];

function Page() {
  const [active, setActive] = useState<Cat>("Alle");
  const filtered = active === "Alle" ? reviews : reviews.filter((r) => r.cat === active);

  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title="Referenzen & Bewertungen"
        intro="Auszüge echter Kundenbewertungen von Google, MyHammer, Das Telefonbuch und Facebook. Wir kennzeichnen Kürzungen als Auszug und nennen die Quelle."
        breadcrumbs={[{ label: "Referenzen" }]}
      />

      <Section eyebrow="Plattformen" title="Wo Kunden uns bewerten">
        <ul className="flex flex-wrap gap-3 text-sm">
          {["Google", "MyHammer", "Das Telefonbuch", "Facebook"].map((p) => (
            <li key={p} className="rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur">{p}</li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Showroom" title="Echte Projekte ansehen">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          Im Showroom finden Sie ausgewählte Projekte mit Bildern und Videos – sortiert nach Leistung und Ort.
        </p>
        <Link
          to="/showroom"
          className="mt-6 inline-flex items-center gap-1 rounded-full bg-accent px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-accent-foreground hover:bg-accent/90"
        >
          Zum Showroom <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>



      <Section eyebrow="Bewertungen" title="Stimmen unserer Kunden" bordered>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                active === c
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <article key={r.name + r.cat} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">„{r.text}"</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{r.name}</span>
                <span>{r.src} · {r.cat}</span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Hinweis: Bewertungen sind teilweise gekürzt und als Auszüge gekennzeichnet. Die jeweils volle Bewertung finden Sie auf der genannten Plattform.
        </p>
      </Section>

      <Section eyebrow="Weiterlesen" title="Passende Leistung anfragen">
        <InternalLinks
          links={[
            { to: "/bodenverlegung-wilhelmshaven", label: "Bodenverlegung in Wilhelmshaven ansehen" },
            { to: "/kuechenmontage-in-wilhelmshaven", label: "Küchenmontage in Wilhelmshaven anfragen" },
            { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Kosten für Entrümpelung einschätzen" },
            { to: "/preise", label: "Zum Kostenrechner" },
            { to: "/kontakt", label: "Projekt mit Fotos anfragen" },
          ]}
        />
      </Section>

      <CtaBlock
        title="Auch Ihr Projekt soll so laufen?"
        text="Sagen Sie kurz, worum es geht – wir geben eine realistische Einschätzung."
      />
    </>
  );
}
