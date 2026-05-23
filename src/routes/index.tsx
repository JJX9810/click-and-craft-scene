import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Hammer,
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
  Menu,
} from "lucide-react";
import heroScene from "@/assets/hero-flooring.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Verlegt & Verschraubt – Bodenverlegung, Küchenmontage & Entrümpelung Wilhelmshaven",
      },
      {
        name: "description",
        content:
          "Handwerkerservice aus Wilhelmshaven: Z.O.Z. – Zuverlässig, Ordentlich, Zügig. Bodenverlegung, Küchenmontage und Entrümpelung für Privatkunden.",
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
    ],
  }),
});

const marqueeWords = [
  "Wilhelmshaven",
  "Zuverlässig",
  "Ordentlich",
  "Zügig",
  "Bodenverlegung",
  "Küchenmontage",
  "Entrümpelung",
  "Direkter Ansprechpartner",
  "Saubere Ausführung",
  "Z.O.Z.",
];

const services = [
  {
    icon: Layers,
    title: "Bodenverlegung",
    desc: "Laminat, Vinyl, PVC und Teppich – fachgerecht verlegt mit sauberen Kanten und stimmigem Verlegebild.",
    points: [
      "Laminat, Vinyl, PVC & Teppich",
      "Sockelleisten & Übergangsschienen",
      "Untergrundprüfung & Vorbereitung",
    ],
  },
  {
    icon: Wrench,
    title: "Küchenmontage",
    desc: "Aufbau und Anschluss neuer oder umgestellter Küchen – von der Front bis zur Arbeitsplatte.",
    points: [
      "Korpusse, Fronten & Arbeitsplatten",
      "Spüle, Armaturen & Geräteanschluss",
      "Sauberes, dokumentiertes Ergebnis",
    ],
  },
  {
    icon: Trash2,
    title: "Entrümpelung & Entsorgung",
    desc: "Wohnung, Keller, Garage – wir räumen zuverlässig und übergeben besenrein.",
    points: [
      "Komplett- oder Teilentrümpelung",
      "Fachgerechte Trennung & Entsorgung",
      "Diskret und planbar",
    ],
  },
];

const reasons = [
  { icon: Target, title: "Klare Spezialisierung", desc: "Fokus auf Boden, Küche und Entrümpelung – kein Bauchladen." },
  { icon: Sparkles, title: "Saubere Ausführung", desc: "Ordentliche Kanten, ordentliche Übergaben, ordentliche Räume." },
  { icon: MessageSquare, title: "Direkte Kommunikation", desc: "Sie sprechen direkt mit dem Inhaber. Kurze Wege." },
  { icon: ShieldCheck, title: "Realistische Einschätzung", desc: "Ehrliches Angebot. Keine Überraschungen auf der Rechnung." },
];

const steps = [
  { icon: Send, title: "Anfrage senden", desc: "Per Telefon, E-Mail oder WhatsApp – kurz schildern, worum es geht." },
  { icon: ClipboardCheck, title: "Aufwand prüfen", desc: "Wir klären Details, bei Bedarf vor Ort oder anhand von Fotos." },
  { icon: FileText, title: "Angebot erhalten", desc: "Transparentes Festpreis-Angebot – ohne Kleingedrucktes." },
  { icon: CheckCircle2, title: "Sauber umsetzen", desc: "Termingerechte Ausführung. Sauber. Pünktlich. Fertig." },
];

const areas = ["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland"];

const references = [
  { t: "Vinyl-Klick im Wohnzimmer", d: "60 m² · saubere Übergänge" },
  { t: "Küchenmontage Neubau", d: "Arbeitsplatte mit Spüle eingepasst" },
  { t: "Komplettentrümpelung", d: "Wohnung besenrein übergeben" },
  { t: "Laminat im Flur", d: "Diagonalverlegung mit Schienen" },
  { t: "Teppich Schlafzimmer", d: "Verklebt, kantenrein" },
  { t: "Küchenumzug", d: "Abbau, Transport, Aufbau" },
];

const faqs = [
  { q: "Wie wird der Preis ermittelt?", a: "Nach kurzer Beschreibung – bei Bedarf mit Fotos oder Vor-Ort-Termin – erhalten Sie ein transparentes Festpreis-Angebot. Keine versteckten Posten." },
  { q: "Welche Leistungen bieten Sie an?", a: "Bodenverlegung (Laminat, Vinyl, PVC, Teppich), Küchenmontage sowie Entrümpelung und fachgerechte Entsorgung – ausschließlich für Privatkunden." },
  { q: "Wie schnell bekomme ich eine Einschätzung?", a: "In der Regel innerhalb von 24 Stunden an Werktagen. Bei dringenden Anliegen einfach anrufen." },
  { q: "In welchem Gebiet arbeiten Sie?", a: "Wilhelmshaven und Umgebung: Schortens, Sande, Jever, Varel und Wangerland. Andere Orte gerne auf Anfrage." },
  { q: "Bringen Sie das Material mit?", a: "Auf Wunsch übernehmen wir die Materialbeschaffung. Sie können Material aber auch selbst bereitstellen." },
];

function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border/60 bg-background/60 py-3 backdrop-blur"
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap pl-10">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-xs uppercase tracking-[0.35em] text-muted-foreground/80 sm:text-sm">
            {w}
            <span className="h-1 w-1 rounded-full bg-accent/70" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15 text-accent">
            <Hammer className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.2em]">
            Verlegt &amp; Verschraubt
          </span>
        </a>
        <nav className="hidden gap-7 text-xs uppercase tracking-[0.2em] text-muted-foreground lg:flex">
          <a href="#leistungen" className="hover:text-foreground">Leistungen</a>
          <a href="#gebiet" className="hover:text-foreground">Einsatzorte</a>
          <a href="#referenzen" className="hover:text-foreground">Referenzen</a>
          <a href="#preise" className="hover:text-foreground">Preise</a>
          <a href="#kontakt" className="hover:text-foreground">Kontakt</a>
          <a href="#faq" className="hover:text-foreground">Mehr</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="mailto:justus.brosch@verlegt-verschraubt.de"
            aria-label="E-Mail schreiben"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground sm:flex"
          >
            <Mail className="h-4 w-4" />
          </a>
          <Button
            asChild
            size="sm"
            className="h-10 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
          >
            <a href="tel:+4916347992866" className="gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Anrufen</span>
              <span className="sm:hidden">Call</span>
            </a>
          </Button>
          <button aria-label="Menü" className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Index() {
  return (
    <main className="bg-wood-grain relative min-h-screen overflow-x-hidden text-foreground">
      <Marquee />
      <Header />

      {/* HERO */}
      <section id="top" className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2 lg:gap-10 lg:pt-20">
          <div className="relative z-10 max-w-xl animate-fade-up">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-accent">
              Z.O.Z. · Zuverlässig · Ordentlich · Zügig
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Bodenverlegung, Küchenmontage &amp; Entrümpelung in{" "}
              <span className="text-accent">Wilhelmshaven</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Saubere Arbeiten im Innenbereich – zuverlässig, ordentlich und zügig.
              Für Privatkunden in Wilhelmshaven und Umgebung.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-accent px-7 text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90"
              >
                <a href="#kontakt">
                  Kostenlose Ersteinschätzung anfragen
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a href="#referenzen">Referenzen ansehen</a>
              </Button>
            </div>

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border/70 pt-8">
              <div>
                <dt className="text-2xl font-semibold">15+</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Jahre Erfahrung</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">500+</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Projekte</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">100%</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Sauber</dd>
              </div>
            </dl>
          </div>

          {/* Hero visual — slot ready for 3D animation */}
          <div className="relative">
            <div
              id="hero-3d-slot"
              data-hero-3d-placeholder
              className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-border/60 shadow-2xl"
            >
              <img
                src={heroScene}
                alt="Stilisierter Bodenleger in Holzoptik verlegt eine Laminatplanke auf dunklem Holzboden"
                className="animate-hero-float h-full w-full object-cover"
                width={1024}
                height={704}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, oklch(0.14 0.012 60 / 0.55) 100%), linear-gradient(90deg, oklch(0.16 0.012 60 / 0.45) 0%, transparent 40%)",
                }}
              />
              <div className="absolute bottom-4 left-4 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
                Keyvisual · 3D-Bereich
              </div>
            </div>
            <p className="mt-4 text-right text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Click-System Laminat · ruhige, präzise Bewegung
            </p>
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
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
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
                <a
                  href="#kontakt"
                  className="mt-7 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-2"
                >
                  Anfragen <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM WIR */}
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
              <div key={r.title} className="group rounded-2xl border border-border/70 bg-card/40 p-6 transition-colors hover:border-accent/50">
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

      {/* EINSATZGEBIET */}
      <section id="gebiet" className="relative border-y border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.7 }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Einsatzgebiet</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wilhelmshaven &amp; Umgebung.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Wir arbeiten lokal – kurze Wege, schnelle Termine. Andere Orte gerne auf Anfrage.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm backdrop-blur"
                >
                  <MapPin className="mr-1.5 inline h-3.5 w-3.5 text-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/70">
            <iframe
              title="Karte Einsatzgebiet Wilhelmshaven"
              src="https://www.openstreetmap.org/export/embed.html?bbox=7.65%2C53.40%2C8.20%2C53.65&layer=mapnik&marker=53.5283%2C8.1117"
              className="h-full w-full opacity-90 grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* REFERENZEN */}
      <section id="referenzen" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Referenzen</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Einblicke aus der Praxis.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((p) => (
            <article
              key={p.t}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card/40"
            >
              <div
                className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.34 0.04 55) 0%, oklch(0.18 0.012 60) 100%)",
                }}
              />
              <div className="p-5">
                <h3 className="text-base font-semibold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PREISE */}
      <section id="preise" className="border-y border-border/60 bg-background/40">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Preise</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Transparent. Festpreis. Ohne Überraschungen.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Jedes Projekt ist anders. Nach kurzer Beschreibung – bei Bedarf mit Fotos
            oder Vor-Ort-Termin – erhalten Sie ein klares Festpreis-Angebot. Kein
            Stundenhonorar-Roulette, keine versteckten Posten.
          </p>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
            >
              <a href="#kontakt">Angebot anfordern <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
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
      </section>

      {/* KONTAKT */}
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
              Lassen Sie uns kurz reden.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Schildern Sie Ihr Vorhaben – Sie erhalten eine ehrliche
              Ersteinschätzung, in der Regel innerhalb von 24 Stunden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
              >
                <a href="mailto:justus.brosch@verlegt-verschraubt.de">
                  Anfrage senden <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a href="https://wa.me/4916347992866" target="_blank" rel="noreferrer">WhatsApp</a>
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
                <a href="tel:+4916347992866" className="hover:text-accent">0163 4799286</a>
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
                <span>Wilhelmshaven &amp; Umgebung</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-accent" />
            <span className="uppercase tracking-[0.2em]">Verlegt &amp; Verschraubt Handwerkerservice</span>
          </div>
          <p className="uppercase tracking-[0.2em]">Z.O.Z. · Zuverlässig · Ordentlich · Zügig</p>
          <p>© {new Date().getFullYear()} Justus Brosch · Wilhelmshaven</p>
        </div>
      </footer>
    </main>
  );
}
