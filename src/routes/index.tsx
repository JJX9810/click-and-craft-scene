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
import { ProjectCard } from "@/components/site/ProjectCard";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { featuredProjects } from "@/data/projects";
import { EinsatzgebietMap } from "@/components/site/EinsatzgebietMap";
import { Kostenrechner } from "@/components/site/Kostenrechner";
import { OnlinePresenceSection } from "@/components/site/OnlinePresenceSection";
import { SawdustParticles } from "@/components/site/SawdustParticles";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import {
  HOME_WEBPAGE_ID,
  breadcrumbNode,
  
  jsonLdScript,
  serviceEntities,
  webPageNode,
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
          "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – auf Wunsch Koordination weiterer Gewerke über geprüfte Partner. Ehrliche Preise, Rückmeldung noch am selben Tag.",
      },
      {
        property: "og:title",
        content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven",
      },
      {
        property: "og:description",
        content:
          "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – auf Wunsch Koordination weiterer Gewerke über geprüfte Partner. Ehrliche Preise, Rückmeldung noch am selben Tag.",
      },
      { property: "og:url", content: "https://verlegt-verschraubt.de/" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Bodenleger verlegt Laminat in Holzoptik – Verlegt & Verschraubt Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven" },
      { name: "twitter:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – auf Wunsch Koordination weiterer Gewerke über geprüfte Partner. Ehrliche Preise, Rückmeldung noch am selben Tag." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { name: "twitter:image:alt", content: "Bodenleger verlegt Laminat in Holzoptik – Verlegt & Verschraubt Wilhelmshaven" },
    ],
    links: [
      { rel: "canonical", href: "https://verlegt-verschraubt.de/" },
      {
        rel: "preload",
        as: "image",
        href: "/projects/coldewei-06-vinyl-wohnzimmer.webp",
        fetchpriority: "high",
      },
    ],
    scripts: [
      jsonLdScript([
        ...serviceEntities,
        webPageNode({
          url: "https://verlegt-verschraubt.de/",
          name: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven",
          description:
            "Handwerkerservice Wilhelmshaven: Bodenverlegung, Küchenmontage und Entrümpelung. Z.O.Z. – zuverlässig, ordentlich, zügig.",
          id: HOME_WEBPAGE_ID,
          primaryImageOfPage: "https://verlegt-verschraubt.de/og-image.jpg",
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
        ]),
      ]),
    ],
  }),
});

const services = [
  {
    icon: Layers,
    title: "Bodenleger & Bodenverlegung",
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
  { icon: Target, title: "Klare Spezialisierung", desc: "Selbst machen wir nur, was wir wirklich können: Boden, Küche, Entrümpelung. Alles Weitere koordinieren wir über geprüfte Partner – statt es halb zu machen." },
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

const areas = ["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Wittmund"];

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
      <HeroSlideshow />


      {/* KURZANTWORT + FAKTEN */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt ist ein Handwerkerservice aus Wilhelmshaven
            für Bodenverlegung, Küchenmontage sowie Entrümpelung und Entsorgung.
            Das Unternehmen unterstützt Privatkunden in Wilhelmshaven und Umgebung
            bei sauberen Innenarbeiten mit klarer Absprache, ordentlicher
            Ausführung und zügiger Umsetzung. Umfasst ein Projekt weitere Gewerke,
            koordiniert Verlegt &amp; Verschraubt geprüfte Partnerbetriebe aus dem
            eigenen Netzwerk – Kunden behalten dabei durchgehend einen Ansprechpartner.
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
              <article key={r.name} className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur">
                <div className="flex items-center gap-1 text-accent" role="img" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
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
          <div className="mx-auto mt-12 max-w-4xl">
            <BeforeAfterSlider
              before="/projects/teppichboden-schortens-01-vorher.webp"
              after="/projects/teppichboden-schortens-02-nachher.webp"
              alt="Vorher-Nachher-Vergleich aus Schortens: Untergrund mit alten Kleberesten, danach frisch verlegter grauer Teppichboden"
              aspect="3/2"
            />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Ziehen Sie den Regler – echtes Projekt aus Schortens.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} eager={false} />
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
                <div className="mt-7 flex items-center justify-between">
                  <Link
                    to={s.to}
                    className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-2"
                  >
                    {s.title} in Wilhelmshaven ansehen <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/kontakt" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
                    Mit Fotos anfragen
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NETZWERK */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Partnernetzwerk</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ein Ansprechpartner statt zehn Handwerker.
            </h2>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Renovierung heißt für die meisten: mehrere Betriebe suchen, Angebote
                vergleichen, Termine jonglieren – und hoffen, dass alles ineinandergreift.
                Bei uns heißt es: ein Anruf.
              </p>
              <p>
                Boden, Küche und Entrümpelung machen wir selbst. Braucht Ihr Projekt mehr
                – etwa Elektrik, Sanitär oder Malerarbeiten – holen wir geprüfte
                Partnerbetriebe aus unserem Netzwerk dazu und steuern den gesamten Ablauf.
              </p>
            </div>
            <ul className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {[
                "Ein Ansprechpartner",
                "Ein Plan",
                "Eine saubere Übergabe",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/50 px-4 py-3 backdrop-blur"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Gemeinsam mit JS Küchenduo setzen wir Projekte auch überregional um.
            Rückmeldung in der Regel noch am selben Tag.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/partner">
                So funktioniert unser Netzwerk <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
            >
              <Link to="/kontakt">Projekt anfragen</Link>
            </Button>
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
          <div className="mt-12 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <div key={r.title} className="border-t border-border/60 py-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-2xl font-semibold text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{r.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
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
        <ol className="mt-12 grid gap-x-10 md:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-border/60 py-6">
              <p className="font-display text-sm font-semibold text-accent tabular-nums">
                Schritt {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
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

      {/* INTERNE LINKS */}
      <section className="border-t border-border/60 bg-background/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <InternalLinks
            title="Weiter im Überblick"
            links={[
              { to: "/bodenverlegung-wilhelmshaven", label: "Bodenverlegung in Wilhelmshaven ansehen" },
              { to: "/kuechenmontage-in-wilhelmshaven", label: "Küchenmontage in Wilhelmshaven anfragen" },
              { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Kosten für Entrümpelung einschätzen" },
              { to: "/preise", label: "Zum Kostenrechner" },
              { to: "/referenzen", label: "Referenzen ansehen" },
              { to: "/faq", label: "Antworten auf häufige Fragen" },
              { to: "/kontakt", label: "Projekt mit Fotos anfragen" },
            ]}
          />
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
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#25D366] px-7 text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#25D366]/90"
              >
                <a
                  href="https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-1 h-4 w-4" /> WhatsApp schreiben
                </a>
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
              <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90">
                <Link to="/kontakt">
                  Anfrage senden <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
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
