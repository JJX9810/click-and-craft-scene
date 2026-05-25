import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Layers,
  Wrench,
  Trash2,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Target,
  Phone,
  Mail,
  MapPin,
  Send,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  Star,
} from "lucide-react";
import heroScene from "@/assets/hero-flooring.png";
import { ProjectCard } from "@/components/site/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { EinsatzgebietMap } from "@/components/site/EinsatzgebietMap";
import { Kostenrechner } from "@/components/site/Kostenrechner";
import { OnlinePresenceSection } from "@/components/site/OnlinePresenceSection";
import { SawdustParticles } from "@/components/site/SawdustParticles";
import {
  HOME_WEBPAGE_ID,
  breadcrumbNode,
  faqPageNode,
  jsonLdScript,
  localBusinessNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from "@/lib/schema";
import { QuickAnswer, FactBox, InternalLinks } from "@/components/site/InfoBlocks";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Verlegt & Verschraubt – Handwerker Wilhelmshaven",
      },
      {
        name: "description",
        content:
          "Handwerkerservice Wilhelmshaven: Bodenverlegung, Küchenmontage und Entrümpelung. Z.O.Z. – zuverlässig, ordentlich, zügig.",
      },
      {
        property: "og:title",
        content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven",
      },
      {
        property: "og:description",
        content:
          "Z.O.Z. – Zuverlässig. Ordentlich. Zügig. Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung.",
      },
      { property: "og:url", content: "https://verlegt-verschraubt.de/" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven" },
      { name: "twitter:description", content: "Z.O.Z. – Zuverlässig. Ordentlich. Zügig. Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/" }],
    scripts: [
      jsonLdScript([
        organizationNode,
        localBusinessNode,
        websiteNode,
        webPageNode({
          url: "https://verlegt-verschraubt.de/",
          name: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven",
          description:
            "Handwerkerservice Wilhelmshaven: Bodenverlegung, Küchenmontage und Entrümpelung. Z.O.Z. – zuverlässig, ordentlich, zügig.",
          id: HOME_WEBPAGE_ID,
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
        ]),
        faqPageNode(faqs),
      ]),
    ],
  }),
});

const services = [
  {
    icon: Layers,
    title: "Bodenverlegung",
    desc: "Laminat, Vinyl, PVC und Teppich – fachgerecht verlegt mit sauberen Kanten und stimmigem Verlegebild.",
    points: ["Vinyl, Laminat, PVC & Teppich", "Sockelleisten & Übergänge", "Untergrund prüfen & vorbereiten"],
    to: "/bodenverlegung-wilhelmshaven",
  },
  {
    icon: Wrench,
    title: "Küchenmontage",
    desc: "Aufbau, Restmontage und Anpassung – von der Front über die Arbeitsplatte bis zur Spüle.",
    points: ["Küche nach Umzug aufbauen", "Restmontage & neue Module", "Arbeitsplatte, Spüle, Armatur"],
    to: "/kuechenmontage-in-wilhelmshaven",
  },
  {
    icon: Trash2,
    title: "Entrümpelung & Entsorgung",
    desc: "Wohnung, Keller, Dachboden – wir räumen zuverlässig und übergeben besenrein.",
    points: ["Wohnungs-, Keller-, Dachbodenräumung", "Möbel & Sperrmüll entsorgen", "Räumung vor Renovierung"],
    to: "/entruempelung-entsorgung-in-wilhelmshaven",
  },
];

const reasons = [
  { icon: Target, title: "Klare Spezialisierung", desc: "Fokus auf Boden, Küche und Entrümpelung – kein Bauchladen." },
  { icon: Sparkles, title: "Saubere Ausführung", desc: "Ordentliche Kanten, ordentliche Übergaben, ordentliche Räume." },
  { icon: MessageSquare, title: "Direkte Kommunikation", desc: "Sie sprechen direkt mit dem Inhaber. Kurze Wege." },
  { icon: ShieldCheck, title: "Realistische Einschätzung", desc: "Ehrlich vorab. Keine Überraschungen auf der Rechnung." },
];

const steps = [
  { icon: Send, title: "Anfrage senden", desc: "Kurz schildern, worum es geht – per Telefon, E-Mail oder Formular." },
  { icon: ClipboardCheck, title: "Fotos & Maße", desc: "Bilder und ein paar Zahlen genügen für die erste Einschätzung." },
  { icon: FileText, title: "Einschätzung", desc: "Realistischer Aufwand, Termin und Preisrahmen – transparent." },
  { icon: CheckCircle2, title: "Saubere Ausführung", desc: "Termin, Umsetzung, Übergabe – ordentlich und zügig." },
];

const areas = ["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland"];

const reviews = [
  {
    name: "Ricarda F.",
    src: "MyHammer",
    text: "Sehr lösungsorientiert bei den Arbeitsplatten – die Küche sieht jetzt richtig stimmig aus.",
    cat: "Küchenlösung",
  },
  {
    name: "Pass Pass2",
    src: "Google",
    text: "Küche nach unserem Umzug komplett aufgebaut. Saubere Arbeit, alles funktioniert.",
    cat: "Küchenmontage",
  },
  {
    name: "Haysam B.",
    src: "Google",
    text: "Laminat im ganzen Wohnzimmer verlegt – ordentlich, schnell, ohne Diskussion.",
    cat: "Bodenverlegung",
  },
  {
    name: "Pauline G.",
    src: "Google",
    text: "Sehr zuverlässig und flexibel bei einem kurzfristigen Termin.",
    cat: "Zuverlässigkeit",
  },
];

const faqs = [
  { q: "Reichen Fotos für eine erste Einschätzung?", a: "Ja. Mit ein paar Fotos, groben Maßen und einer kurzen Beschreibung können wir den Aufwand in den meisten Fällen gut einschätzen." },
  { q: "In welchem Gebiet arbeiten Sie?", a: "Wilhelmshaven und Umgebung: Schortens, Sande, Jever, Varel und Wangerland. Andere Orte gerne auf Anfrage." },
  { q: "Schließt ihr Herd oder Starkstrom an?", a: "Nein. Elektroinstallationen und Sanitäränderungen übernehmen Fachbetriebe. Bei Bedarf stimmen wir uns ab." },
  { q: "Wie schnell bekomme ich eine Rückmeldung?", a: "An Werktagen in der Regel innerhalb von 24 Stunden. Dringend? Einfach anrufen." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen animate-aurora-shift"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 30%, oklch(0.55 0.12 60 / 0.18), transparent 60%), radial-gradient(50% 45% at 80% 70%, oklch(0.45 0.10 40 / 0.15), transparent 60%), radial-gradient(40% 40% at 50% 100%, oklch(0.50 0.14 80 / 0.12), transparent 60%)",
            backgroundSize: "200% 200%",
          }}
        />
        <SawdustParticles density={28} />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2 lg:gap-10 lg:pt-20">
          <div className="relative z-10 max-w-xl animate-fade-up">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-accent">
              Z.O.Z. · Zuverlässig · Ordentlich · Zügig
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Bodenverlegung, Küchenmontage &amp; Entrümpelung in{" "}
              <span className="text-accent">Wilhelmshaven</span> &amp; Umgebung
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Verlegt &amp; Verschraubt unterstützt Privatkunden bei sauberen
              Innenarbeiten – zuverlässig, ordentlich und zügig.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-accent px-7 text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90"
              >
                <Link to="/kontakt">
                  Projekt anfragen
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a href="tel:+491634799286">
                  <Phone className="mr-1 h-4 w-4" /> Direkt anrufen
                </a>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border/70 pt-8">
              <div>
                <dt className="text-2xl font-semibold">Lokal</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Wilhelmshaven</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">Direkt</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Inhaber-Kontakt</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">Sauber</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Übergabe</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-border/60 shadow-2xl">
              <img
                src={heroScene}
                alt="Bodenleger verlegt Laminatplanke in Holzoptik auf dunklem Holzboden"
                className="animate-hero-float h-full w-full object-cover"
                width={1024}
                height={704}
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, oklch(0.14 0.012 60 / 0.55) 100%), linear-gradient(90deg, oklch(0.16 0.012 60 / 0.45) 0%, transparent 40%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* KURZANTWORT + FAKTEN */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt ist ein Handwerkerservice aus Wilhelmshaven
            für Bodenverlegung, Küchenmontage sowie Entrümpelung und Entsorgung.
            Das Unternehmen unterstützt Privatkunden in Wilhelmshaven und Umgebung
            bei sauberen Innenarbeiten mit klarer Absprache, ordentlicher
            Ausführung und zügiger Umsetzung.
          </QuickAnswer>
          <FactBox />
        </div>
      </section>

      {/* TRUST / BEWERTUNGEN */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Bewertungen</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Echte Stimmen von Kunden
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
              <Link to="/referenzen">Alle Referenzen ansehen <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <article key={r.name} className="tile-shader rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur">
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
            Auszüge aus Bewertungen auf Google, MyHammer, Das Telefonbuch und Facebook.
          </p>
        </div>
      </section>

      {/* SHOWROOM-VORSCHAU */}
      <section id="referenzen" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Showroom</p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ausgewählte Projekte aus der Region.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                Echte Arbeiten aus Wilhelmshaven, Coldewei, Schortens und Hooksiel –
                Bodenverlegung, Küchenmontage, Folierung und Treppenbeläge.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-border bg-transparent">
              <Link to="/showroom">Zum gesamten Showroom <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Leistungen</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Drei Disziplinen. Ein Anspruch: sauber gemacht.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="tile-shader group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center justify-between">
                  <Link
                    to={s.to}
                    className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-2"
                  >
                    Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/kontakt" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                    Anfragen
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Warum Verlegt &amp; Verschraubt</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ehrliches Handwerk, ohne Umweg.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div key={r.title} className="tile-shader group rounded-2xl border border-border/70 bg-card/40 p-6 transition-colors hover:border-accent/50">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/60">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section id="ablauf" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Ablauf</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            So läuft eine Anfrage ab.
          </h2>
        </div>
        <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Schritt {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* PREISE */}
      <section id="preise" className="border-y border-border/60 bg-background/40">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Kostenrechner</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Was kostet mein Projekt ungefähr?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Erste Orientierung in unter einer Minute – Anfrage anschließend
              direkt per WhatsApp inklusive aller Angaben senden.
            </p>
          </div>
          <div className="mt-12">
            <Kostenrechner />
          </div>
        </div>
      </section>

      {/* EINSATZGEBIET */}
      <section id="gebiet" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.65 }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Einsatzgebiet</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wilhelmshaven &amp; Umgebung.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Wir arbeiten lokal – kurze Wege, schnelle Termine. Andere Orte
              gerne auf Anfrage.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a}>
                  <a
                    href={`/handwerkerservice-${a.toLowerCase()}`}
                    className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2 text-sm backdrop-blur hover:border-accent/60 hover:text-accent"
                  >
                    <MapPin className="mr-1.5 h-3.5 w-3.5 text-accent" />
                    {a}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <EinsatzgebietMap
            center={[53.5285, 8.1083]}
            radiusMeters={30000}
            label="Wilhelmshaven"
            height="460px"
            zoom={9}
          />
        </div>
      </section>

      <OnlinePresenceSection />

      {/* FAQ */}
      <section id="faq" className="border-t border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Häufige Fragen.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/70">
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8">
            <Link to="/faq" className="text-sm text-accent hover:underline">
              Alle Fragen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* KONTAKT-CTA */}
      <section id="kontakt" className="relative border-t border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Kontakt</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Unsicher, ob Ihr Auftrag machbar ist?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Senden Sie Fotos und ein paar Maße – wir geben eine ehrliche
              Ersteinschätzung, in der Regel innerhalb von 24 Stunden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
                <Link to="/kontakt">
                  Anfrage senden <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a href="https://wa.me/491634799286" target="_blank" rel="noreferrer">WhatsApp</a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/50 p-8 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Inhaber</p>
            <p className="mt-1 text-xl font-semibold">Justus Brosch</p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                  <Phone className="h-4 w-4 text-accent" />
                </span>
                <a href="tel:+491634799286" className="hover:text-accent">0163 4799286</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                  <Mail className="h-4 w-4 text-accent" />
                </span>
                <a href="mailto:justus.brosch@verlegt-verschraubt.de" className="hover:text-accent break-all">
                  justus.brosch@verlegt-verschraubt.de
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                  <MapPin className="h-4 w-4 text-accent" />
                </span>
                <span>Weichselstraße 12, 26388 Wilhelmshaven</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
