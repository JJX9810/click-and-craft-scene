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
          "Handwerkerservice aus Wilhelmshaven: präzise Bodenverlegung, fachgerechte Küchenmontage und zuverlässige Entrümpelung. Sauber, ehrlich, lokal.",
      },
      {
        property: "og:title",
        content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven",
      },
      {
        property: "og:description",
        content:
          "Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung. Saubere Ausführung, ehrliche Einschätzung.",
      },
    ],
  }),
});

const services = [
  {
    icon: Layers,
    title: "Bodenverlegung",
    desc: "Laminat, Vinyl, PVC und Teppich – fachgerecht verlegt.",
    points: [
      "Laminat, Vinyl, PVC & Teppich",
      "Sockelleisten & Übergangsschienen",
      "Saubere Kanten, stimmiges Verlegebild",
      "Vorbereitung & Untergrundprüfung",
    ],
  },
  {
    icon: Wrench,
    title: "Küchenmontage",
    desc: "Aufbau und Anschluss neuer oder umgestellter Küchen.",
    points: [
      "Aufbau von Korpussen & Fronten",
      "Arbeitsplatten zuschneiden & einpassen",
      "Anschluss von Spüle, Geräten & Armaturen",
      "Sauberes Ergebnis, dokumentiert",
    ],
  },
  {
    icon: Trash2,
    title: "Entrümpelung & Entsorgung",
    desc: "Wohnung, Keller, Garage – wir räumen zuverlässig.",
    points: [
      "Komplett- oder Teilentrümpelung",
      "Fachgerechte Trennung & Entsorgung",
      "Besenrein zur Übergabe",
      "Diskret und planbar",
    ],
  },
];

const reasons = [
  {
    icon: Target,
    title: "Spezialisiert",
    desc: "Fokus auf Boden, Küche und Entrümpelung – kein Bauchladen.",
  },
  {
    icon: Sparkles,
    title: "Saubere Ausführung",
    desc: "Wir hinterlassen Räume wie sie sein sollten: ordentlich.",
  },
  {
    icon: MessageSquare,
    title: "Direkte Kommunikation",
    desc: "Sie sprechen direkt mit dem Inhaber – kurze Wege, klare Absprachen.",
  },
  {
    icon: ShieldCheck,
    title: "Realistische Einschätzung",
    desc: "Ehrliches Angebot. Keine Überraschungen auf der Rechnung.",
  },
];

const steps = [
  {
    icon: Send,
    title: "Anfrage senden",
    desc: "Per Telefon, E-Mail oder WhatsApp – kurz schildern, worum es geht.",
  },
  {
    icon: ClipboardCheck,
    title: "Aufwand prüfen",
    desc: "Wir klären Details, ggf. mit Vor-Ort-Termin oder Fotos.",
  },
  {
    icon: FileText,
    title: "Angebot erhalten",
    desc: "Transparentes Festpreis-Angebot – ohne Kleingedrucktes.",
  },
  {
    icon: CheckCircle2,
    title: "Umsetzung",
    desc: "Termingerechte Ausführung. Sauber. Pünktlich. Fertig.",
  },
];

const areas = [
  "Wilhelmshaven",
  "Schortens",
  "Jever",
  "Sande",
  "Varel",
  "Wangerland",
];

const faqs = [
  {
    q: "Wie wird der Preis ermittelt?",
    a: "Nach kurzer Beschreibung – ggf. mit Fotos oder Vor-Ort-Termin – erhalten Sie ein transparentes Festpreis-Angebot. Keine versteckten Posten.",
  },
  {
    q: "Welche Leistungen bieten Sie an?",
    a: "Bodenverlegung (Laminat, Vinyl, PVC, Teppich), Küchenmontage sowie Entrümpelung und fachgerechte Entsorgung – ausschließlich für Privatkunden.",
  },
  {
    q: "Wie schnell bekomme ich eine Einschätzung?",
    a: "In der Regel innerhalb von 24 Stunden an Werktagen. Bei dringenden Anliegen einfach anrufen.",
  },
  {
    q: "In welchem Gebiet arbeiten Sie?",
    a: "Wilhelmshaven und Umgebung: Schortens, Jever, Sande, Varel und Wangerland. Andere Orte auf Anfrage.",
  },
  {
    q: "Bringen Sie das Material mit?",
    a: "Auf Wunsch übernehmen wir die Materialbeschaffung. Sie können Material aber auch selbst bereitstellen.",
  },
];

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* NAV */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-center gap-2">
          <Hammer className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold tracking-widest uppercase">
            Verlegt &amp; Verschraubt
          </span>
        </a>
        <div className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#leistungen" className="hover:text-foreground">Leistungen</a>
          <a href="#ablauf" className="hover:text-foreground">Ablauf</a>
          <a href="#gebiet" className="hover:text-foreground">Gebiet</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
          <a href="#kontakt" className="hover:text-foreground">Kontakt</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        className="relative"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-8 lg:grid-cols-2 lg:gap-8 lg:pt-16">
          <div className="relative z-10 max-w-xl">
            <span className="inline-block rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              Handwerkerservice · Wilhelmshaven
            </span>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Präzise Bodenverlegung.
              <br />
              <span className="text-accent">Sauber umgesetzt.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Professionelle Bodenverlegung, Küchenmontage und Entrümpelung in
              Wilhelmshaven &amp; Umgebung. Ehrlich kalkuliert, sauber ausgeführt.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
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

            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-2xl font-semibold">15+</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Jahre Erfahrung</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">500+</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Projekte</dd>
              </div>
              <div>
                <dt className="text-2xl font-semibold">100%</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Sauber</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <img
                src={heroScene}
                alt="Bodenleger als stilisierte Holzfigur verlegt eine Laminatplanke auf dunklem Holzboden"
                className="animate-hero-float h-full w-full object-cover"
                width={1024}
                height={640}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.16 0.012 60 / 0.55) 0%, transparent 45%)",
                }}
              />
            </div>
            <p className="mt-4 text-right text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Animiertes Keyvisual · Click-System Laminat
            </p>
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{ background: "oklch(0.55 0.11 50 / 0.35)" }}
        />
      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Leistungen</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Drei Disziplinen. Ein Anspruch: sauber gemacht.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-7 backdrop-blur transition-colors hover:border-accent/60"
            >
              <s.icon className="h-8 w-8 text-accent" />
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* WARUM WIR */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Warum wir</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ehrliches Handwerk, ohne Umweg.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-border bg-background/40 p-6">
                <r.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF */}
      <section id="ablauf" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Ablauf</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            In vier Schritten zum Ergebnis.
          </h2>
        </div>
        <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background text-accent">
                <step.icon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Schritt {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* EINSATZGEBIET */}
      <section
        id="gebiet"
        className="border-y border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Einsatzgebiet</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wilhelmshaven &amp; Umgebung.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Wir arbeiten lokal – kurze Wege, schnelle Termine. Andere Orte gerne
              auf Anfrage.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-border bg-card/40 px-4 py-2 text-sm backdrop-blur"
                >
                  <MapPin className="mr-1.5 inline h-3.5 w-3.5 text-accent" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
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
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Einblicke</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ergebnisse aus der Werkstatt.
            </h2>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Vinyl-Klick im Wohnzimmer", d: "60 m² · saubere Übergänge" },
            { t: "Küchenmontage Neubau", d: "Arbeitsplatte mit Spüle eingepasst" },
            { t: "Komplettentrümpelung", d: "Wohnung besenrein übergeben" },
            { t: "Laminat im Flur", d: "Diagonalverlegung mit Schienen" },
            { t: "Teppich Schlafzimmer", d: "Verklebt, kantenrein" },
            { t: "Küchenumzug", d: "Abbau, Transport, Aufbau" },
          ].map((p) => (
            <article
              key={p.t}
              className="group overflow-hidden rounded-2xl border border-border bg-card/40"
            >
              <div
                className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.32 0.04 55) 0%, oklch(0.18 0.012 60) 100%)",
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

      {/* FAQ */}
      <section id="faq" className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">FAQ</p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Häufige Fragen.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Kontakt</p>
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
                  Kostenlose Ersteinschätzung anfragen
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
              >
                <a
                  href="https://wa.me/4916347992866"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/40 p-8 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Inhaber
            </p>
            <p className="mt-1 text-xl font-semibold">Justus Brosch</p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                  <Phone className="h-4 w-4 text-accent" />
                </span>
                <a href="tel:+4916347992866" className="hover:text-accent">
                  0163 4799286
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background">
                  <Mail className="h-4 w-4 text-accent" />
                </span>
                <a
                  href="mailto:justus.brosch@verlegt-verschraubt.de"
                  className="hover:text-accent"
                >
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
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Hammer className="h-4 w-4 text-accent" />
            <span className="uppercase tracking-[0.2em]">
              Verlegt &amp; Verschraubt Handwerkerservice
            </span>
          </div>
          <p>© {new Date().getFullYear()} Justus Brosch · Wilhelmshaven</p>
        </div>
      </footer>
    </main>
  );
}
