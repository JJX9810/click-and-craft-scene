import { breadcrumbNode, jsonLdScript, webPageNode, serviceNode } from "@/lib/schema";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/PageShell";
import {
  Star,
  Phone,
  Globe,
  MapPin,
  MessageSquare,
  ArrowRight,
  ClipboardCheck,
  Handshake,
  Wrench,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL =
  "https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20";

export const Route = createFileRoute("/partner")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Renovierung aus einer Hand in Wilhelmshaven" },
      {
        name: "description",
        content:
          "Renovierung in Wilhelmshaven aus einer Hand: eigene Gewerke plus geprüfte Partnerbetriebe – koordiniert von Verlegt & Verschraubt. Ein Ansprechpartner statt zehn Handwerker.",
      },
      { property: "og:title", content: "Renovierung aus einer Hand in Wilhelmshaven" },
      {
        property: "og:description",
        content:
          "Planung, Umsetzung und Koordination aus einer Hand – mit geprüften Partnerbetrieben aus unserem Netzwerk.",
      },
      { property: "og:url", content: "https://verlegt-verschraubt.de/partner" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Partner und Kooperationen von Verlegt & Verschraubt aus Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Renovierung aus einer Hand in Wilhelmshaven" },
      { name: "twitter:description", content: "Renovierung aus einer Hand – koordiniert von uns, umgesetzt von uns und geprüften Partnern." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/partner" }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: "https://verlegt-verschraubt.de/partner",
          name: "Renovierung aus einer Hand in Wilhelmshaven",
          description:
            "Ein Ansprechpartner für Ihre Renovierung: eigene Leistungen und geprüfte Partnerbetriebe – koordiniert von Verlegt & Verschraubt.",
          about: { "@id": "https://verlegt-verschraubt.de/partner#service" },
        }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/partner",
          name: "Renovierung aus einer Hand",
          description:
            "Koordinierte Renovierung in Wilhelmshaven und Umgebung: eigene Gewerke (Bodenverlegung, Küchenmontage, Entrümpelung) plus geprüfte Partnerbetriebe für weitere Gewerke – mit einem Ansprechpartner für das gesamte Projekt.",
          serviceType: ["Renovierung aus einer Hand", "Handwerkskoordination"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "Partnernetzwerk", url: "https://verlegt-verschraubt.de/partner" },
        ]),
      ]),
    ],
  }),
});

const steps = [
  {
    icon: MessageSquare,
    title: "Anfrage",
    desc: "Sie schildern uns Ihr Vorhaben – per Telefon, WhatsApp oder Formular. Rückmeldung in der Regel noch am selben Tag.",
  },
  {
    icon: ClipboardCheck,
    title: "Ein Gespräch, ein Plan",
    desc: "Wir prüfen, was wir selbst übernehmen und wo Partnerbetriebe sinnvoll sind. Sie bekommen eine ehrliche Einschätzung zu Ablauf, Zeitrahmen und Kosten.",
  },
  {
    icon: Wrench,
    title: "Koordinierte Umsetzung",
    desc: "Eigene Gewerke führen wir selbst aus. Partnerleistungen stimmen wir ab und steuern die Termine – Sie müssen nichts koordinieren.",
  },
  {
    icon: Handshake,
    title: "Eine saubere Übergabe",
    desc: "Am Ende steht ein fertiges Ergebnis. Ein Projekt, ein Ansprechpartner, eine Übergabe.",
  },
];

const ownServices: { label: string; to?: string }[] = [
  { label: "Bodenleger & Bodenverlegung (Vinyl, Laminat, PVC, Teppich)", to: "/bodenverlegung-wilhelmshaven" },
  { label: "Küchenmonteur & Küchenmontage", to: "/kuechenmontage-in-wilhelmshaven" },
  { label: "Küchenfolierung" },
  { label: "Entrümpelung & Haushaltsauflösung", to: "/entruempelung-entsorgung-in-wilhelmshaven" },
  { label: "Sockelleisten & Silikonarbeiten" },
  { label: "kleinere Renovierungs- und Anpassungsarbeiten" },
];

const partnerServices = [
  "Elektroinstallation (Herd, Starkstrom, neue Leitungen)",
  "Sanitäranlagen und Wasserleitungen",
  "Heizungs- und Klimatechnik",
  "Malerarbeiten – Maler Manufaktur Wand & Wirkung (Wilhelmshaven)",
  "weitere Gewerke nach individueller Prüfung",
];

const criteria = [
  "Gewerbeanmeldung bzw. Eintrag im jeweiligen Gewerk",
  "Nachgewiesene Betriebshaftpflichtversicherung",
  "Referenzprojekte, die wir gesichtet haben",
  "Mindestens ein gemeinsames Projekt erfolgreich abgewickelt",
  "Verlässliche Erreichbarkeit und klare Kommunikation",
];

const partnerTags = [
  "Küchenmontage",
  "Möbelmontage",
  "Küchenabbau",
  "Demontage",
  "Entrümpelung",
  "Umbauarbeiten",
];

const futureTrades = [
  "Elektriker",
  "Sanitär",
  "Entsorger",
  "Maler",
  "Reinigungsservice",
  "Immobilienverwaltung",
];

function HeroCtas() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Button
        asChild
        size="lg"
        className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
      >
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
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
          <Phone className="mr-1 h-4 w-4" /> Anrufen
        </a>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
      >
        <Link to="/kontakt">
          Projekt anfragen <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function PartnerCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">
            Gründungspartner · Zentrale West
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            J.S Küchen Duo Handwerk &amp; Umbau
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Küchenbau · Handwerk &amp; Umbau
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs">
          <Star aria-hidden="true" className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">5,0</span>
          <span className="text-muted-foreground">· 14 Google-Rezensionen</span>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          JS Küchenduo ist unser Gründungspartner und die Zentrale für Projekte im Westen:
          Gladbeck, Ruhrgebiet, Köln und Rheinland. Das Team übernimmt Küchenmontage,
          Möbelmontage, Küchenabbau, Demontage, Entrümpelung und Umbauarbeiten – mit
          derselben Arbeitsweise, für die auch wir stehen: sauber, zuverlässig,
          kundenorientiert.
        </p>
        <p>
          Gemeinsam prüfen wir auch überregionale und deutschlandweite Projekte –
          individuell nach Projektumfang, Terminlage und Partnerverfügbarkeit.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {partnerTags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            Enfieldstraße 241
            <br />
            45966 Gladbeck
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
          <a href="tel:+4915757941442" className="hover:text-foreground">
            01575 7941442
          </a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
        >
          <a
            href="https://www.kuechenduohandwerkundumbau.de"
            target="_blank"
            rel="noreferrer"
          >
            <Globe className="mr-1 h-4 w-4" /> Website besuchen
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-border bg-transparent px-5"
        >
          <a href="tel:+4915757941442">
            <Phone className="mr-1 h-4 w-4" /> Anrufen
          </a>
        </Button>
      </div>
    </article>
  );
}

function MalerPartnerCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-7 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.45)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">
            Partnerbetrieb · Malerarbeiten
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Maler Manufaktur Wand &amp; Wirkung
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Malerarbeiten · Kreative Wandgestaltung · Inhaber Andreas Wagner
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs">
          <Star aria-hidden="true" className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium text-foreground">5,0</span>
          <span className="text-muted-foreground">· 10 Google-Rezensionen</span>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          Die Maler Manufaktur Wand &amp; Wirkung von Andreas Wagner übernimmt in unseren
          Projekten die Malerarbeiten – von frischen Wänden und Decken vor der
          Bodenverlegung bis zur kompletten Renovierung. Seine Spezialität geht dabei
          über das klassische Streichen hinaus: kreative Wandgestaltung und perfekte
          Spachteloberflächen, die aus einer Wand ein Gestaltungselement machen. Ein
          Wilhelmshavener Betrieb mit Bestbewertung und demselben Anspruch wie wir:
          Präzision, Sauberkeit, Termintreue.
        </p>
        <p>
          Boden, Küche und Malerarbeiten aus einem Guss: Sie stellen Ihre Anfrage bei
          uns, wir stimmen die Gewerke aufeinander ab – ein Ansprechpartner, ein Terminplan.
          Einsatzgebiet: Wilhelmshaven, Friesland, Oldenburg, Ostfriesland und Umgebung.
        </p>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          <span>
            Virchowstraße 58A
            <br />
            26382 Wilhelmshaven
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
          <a href="tel:+4915565904328" className="hover:text-foreground">
            015565 904328
          </a>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          className="h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
        >
          <a href="https://www.wand-wirkung.de" target="_blank" rel="noreferrer">
            <Globe className="mr-1 h-4 w-4" /> Website besuchen
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-border bg-transparent px-5"
        >
          <a href="tel:+4915565904328">
            <Phone className="mr-1 h-4 w-4" /> Anrufen
          </a>
        </Button>
      </div>
    </article>
  );
}

function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:pt-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">
              Start
            </Link>
            <span className="mx-1">›</span>
            <span className="text-foreground">Partnernetzwerk</span>
          </nav>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">
            Partnernetzwerk
          </p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Ein Ansprechpartner statt zehn Handwerker – Ihre Renovierung in Wilhelmshaven aus einer Hand.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sie schildern uns Ihr Projekt einmal. Wir übernehmen Planung,
            Umsetzung und Koordination – mit eigenen Leistungen und geprüften
            Partnerbetrieben aus unserem Netzwerk. Auf Wunsch kurzfristig.
          </p>
          <HeroCtas />
        </div>
      </section>

      {/* WARUM ES UNS GIBT */}
      <Section
        eyebrow="Warum es uns gibt"
        title="Renovierung in Wilhelmshaven – so funktioniert es aus einer Hand."
      >
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Wer in Wilhelmshaven, Friesland oder Umgebung renoviert, kennt das
            Problem: Für den Boden braucht man einen Betrieb, für die Küche den
            nächsten, für Elektrik den dritten. Dazu Entsorgung, vielleicht
            Malerarbeiten. Am Ende koordiniert man selbst fünf Handwerker,
            vergleicht Angebote, jongliert Termine – und hofft, dass alles
            ineinandergreift.
          </p>
          <p>
            Genau das nehmen wir Ihnen ab. Verlegt &amp; Verschraubt ist Ihre
            Zentrale: Was unsere Fachbereiche sind, machen wir selbst. Was
            darüber hinausgeht, übernehmen geprüfte Partnerbetriebe aus unserem
            Netzwerk – koordiniert von uns, mit einem Ansprechpartner für Sie.
          </p>
        </div>
      </Section>

      {/* PARTNER-VORSTELLUNG */}
      <Section eyebrow="Unsere Partnerbetriebe" title="Das Netzwerk hinter dem Versprechen." bordered>
        <div className="grid gap-6 lg:grid-cols-2">
          <PartnerCard />
          <MalerPartnerCard />
        </div>
      </Section>

      {/* ABLAUF */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Ablauf</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              So läuft Ihr Projekt ab.
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
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
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

          {/* Kundenzitat */}
          <figure className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border/70 bg-card/50 p-7 text-center backdrop-blur">
            <div
              className="flex items-center justify-center gap-1 text-accent"
              role="img"
              aria-label="5 von 5 Sternen"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-lg leading-relaxed text-foreground/90 sm:text-xl">
              „Sehr zuverlässig und flexibel bei einem kurzfristigen Termin."
            </blockquote>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              — Pauline G. · Google
            </figcaption>
          </figure>
        </div>
      </section>

      {/* GOOGLE-BEWERTUNG ZITAT */}
      <Section eyebrow="Aus einer echten Google-Bewertung" bordered>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <figure className="border-l-2 border-accent pl-6">
            <blockquote className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
              „Während Herr Brosch bei uns den Boden verlegte, sagte plötzlich unser Umzugsunternehmen ab. Er vermittelte uns einen passenden Partner aus seinem Netzwerk. Was mit Bodenverlegung und Küchenmontage begann, entwickelte sich zu einer vollständigen Organisation unseres Umzugs – koordiniert innerhalb von nur drei Wochen. Aus einer Situation, die zunächst wie eine Vollkatastrophe aussah, wurde einer der entspanntesten Umzüge, die wir je erlebt haben."
            </blockquote>
            <figcaption className="mt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Familie Kolb · 5 Sterne · Google-Bewertung, Juli 2026
            </figcaption>
            <Link
              to="/showroom/$slug"
              params={{ slug: "renovierung-aus-einer-hand-schortens" }}
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Zum Projekt: Renovierung aus einer Hand in Schortens →
            </Link>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-border/70">
            <img
              src="/projects/netzwerk-led-decke-malerarbeiten.webp"
              alt="Wohnraum mit abgehängter Decke, indirekter LED-Beleuchtung und frischen Malerarbeiten – ausgeführt durch Partnerbetriebe"
              width={960}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover lg:max-h-[480px]"
            />
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">
              Abgehängte Decke, indirekte LED-Beleuchtung, Malerarbeiten: Gewerke wie diese realisieren geprüfte Partnerbetriebe – koordiniert von uns.
            </figcaption>
          </figure>
        </div>
      </Section>


      {/* ZWEI SPALTEN */}
      <Section eyebrow="Rollenverteilung" title="Klare Rollen. Klare Verantwortung.">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              Machen wir selbst
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {ownServices.map((s) => (
                <li key={s.label} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {s.to ? (
                      <Link to={s.to} className="text-accent hover:underline">
                        {s.label}
                      </Link>
                    ) : (
                      s.label
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              Übernehmen geprüfte Partnerbetriebe
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {partnerServices.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Handshake className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="mt-8 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4 text-center text-sm font-medium text-foreground">
          Egal wer ausführt: Koordination, Termine und Kommunikation laufen über uns.
        </p>
      </Section>

      {/* PRÜFKRITERIEN */}
      <Section
        eyebrow="Prüfkriterien"
        title={`„Geprüft" ist bei uns keine Floskel.`}
        bordered
      >
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          In unser Netzwerk kommt nur, wer unsere Kriterien erfüllt. Denn wenn
          wir koordinieren, stehen wir auch für das Ergebnis gerade.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {criteria.map((c) => (
            <li
              key={c}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/40 p-4 text-sm text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm italic text-muted-foreground">
          Wir nennen hier nur echte, bestätigte Partner. Solange ein Gewerk
          nicht abgedeckt ist, sagen wir das offen – und prüfen Ihre Anfrage
          individuell.
        </p>
      </Section>

      {/* PARTNER-VORSTELLUNG */}
      {/* FAQ */}
      <Section eyebrow="FAQ" title="Häufige Fragen zur Renovierung aus einer Hand" bordered>
        <div className="max-w-3xl space-y-3">
          {[
            {
              q: "Seid ihr ein Generalunternehmer?",
              a: "Nein. Wir treten nicht als Generalunternehmer auf. Unsere eigenen Gewerke – Boden, Küche, Entrümpelung – führen wir selbst aus. Für weitere Gewerke vermitteln und koordinieren wir geprüfte Partnerbetriebe, die ihre Leistungen eigenverantwortlich erbringen. Sie haben dabei durchgehend einen Ansprechpartner: uns.",
            },
            {
              q: "Was kostet eine Renovierung aus einer Hand?",
              a: "Für unsere eigenen Leistungen gibt der Kostenrechner eine erste Orientierung. Partnerleistungen kalkulieren die jeweiligen Fachbetriebe. Verbindliche Preise gibt es erst nach Prüfung von Fotos, Maßen bzw. einer Besichtigung – ehrlich und ohne Überraschungen.",
            },
            {
              q: "Welche Gewerke deckt das Netzwerk aktuell ab?",
              a: "Selbst übernehmen wir Bodenverlegung, Küchenmontage, Küchenfolierung sowie Entrümpelung und Entsorgung. Über Partner laufen Küchen- und Umbauprojekte gemeinsam mit JS Küchenduo sowie Malerarbeiten mit der Maler Manufaktur Wand & Wirkung aus Wilhelmshaven. Weitere Gewerke wie Elektro und Sanitär ergänzen wir nur mit bestätigten, geprüften Partnern – solange sagen wir offen, was noch nicht abgedeckt ist.",
            },
            {
              q: "Arbeitet ihr auch außerhalb von Wilhelmshaven?",
              a: "Ja. Unser Kerngebiet ist Wilhelmshaven mit Schortens, Sande, Jever, Varel, Wangerland und Wittmund. Gemeinsam mit JS Küchenduo (Zentrale West, Raum Ruhrgebiet/Rheinland) prüfen wir auch überregionale Projekte – individuell nach Umfang und Terminlage.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border/70 bg-card/40 p-5 backdrop-blur"
            >
              <summary className="cursor-pointer list-none text-base font-medium text-foreground marker:hidden">
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* NETZWERK IM AUFBAU */}
      <Section
        eyebrow="Netzwerk im Aufbau"
        title="Diese Gewerke ergänzen wir mit der Zeit."
        bordered
      >
        <div className="flex flex-wrap gap-2">
          {futureTrades.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/70 bg-background/40 px-4 py-1.5 text-sm text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Hinweis: Wir nennen hier nur echte Partner. Solange Empfehlungen
          nicht bestätigt sind, bleibt diese Liste schlank.
        </p>

        <div className="mt-10 rounded-2xl border border-accent/40 bg-accent/5 p-7">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Sie führen einen Fachbetrieb in der Region?
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Wir erweitern unser Netzwerk gezielt um zuverlässige Partner –
            aktuell besonders Elektro, Sanitär und Malerarbeiten. Wenn Sie
            sauber arbeiten, erreichbar sind und Interesse an gemeinsamen
            Projekten haben, melden Sie sich gerne.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/kontakt">
                Kontakt aufnehmen <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* ABSCHLUSS-CTA */}
      <section className="relative border-t border-border/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.8 }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Ihr Projekt. Ein Anruf.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Schildern Sie uns kurz Ihr Vorhaben – gern mit Fotos und Maßen.
            Wir melden uns in der Regel noch am selben Tag mit einer ehrlichen
            Einschätzung: was wir selbst übernehmen, wo Partner sinnvoll sind
            und wie der Ablauf aussieht. Für eine erste Preisorientierung
            können Sie auch direkt unseren Kostenrechner nutzen.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageSquare className="mr-1 h-4 w-4" /> WhatsApp schreiben
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
            >
              <Link to="/kontakt">
                <Send className="mr-1 h-4 w-4" /> Anfrage starten
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
            >
              <Link to="/preise">
                Zum Kostenrechner <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
