import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowDown,
  Instagram,
  Facebook,
  Check,
  Paintbrush,
} from "lucide-react";
import { GoldVeins } from "@/components/site/GoldVeins";
import { BrushEdge } from "@/components/site/BrushEdge";

export const Route = createFileRoute("/wand-und-wirkung")({
  component: WandUndWirkung,
  head: () => ({
    meta: [
      { title: "Wand & Wirkung – Wandgestaltung auf höchstem Niveau" },
      {
        name: "description",
        content:
          "Andreas Wagner gestaltet Wände und Böden – fugenlose Systeme, Spachteltechnik und Harz. Kreative Wandgestaltung in Wilhelmshaven & Umgebung.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
});

const NAV = ["Start", "Leistungen", "Projekte", "Über mich", "Kontakt"];

const FEATURES = [
  {
    title: "Ein Ansprechpartner",
    desc: "Persönlich betreut vom Erstgespräch bis zur gemeinsamen Abnahme – ohne wechselndes Team.",
  },
  {
    title: "Ehrliche Beratung",
    desc: "Offene Material- und Machbarkeitsberatung. Ich sage Ihnen, was in Ihrem Raum wirklich sinnvoll ist.",
  },
  {
    title: "Sauberer Untergrund",
    desc: "Sorgfältige Vorbereitung ist die halbe Miete – erst dann kommt die Oberfläche.",
  },
  {
    title: "Privat & Gewerbe",
    desc: "Von der einzelnen Akzentwand bis zum kompletten Gewerbeobjekt in Wilhelmshaven und Umgebung.",
  },
];

const SERVICES = [
  {
    title: "Glatte Oberflächen",
    desc: "Für ruhige, makellose Wände und Decken",
    hue: "linear-gradient(135deg, #b7a893, #8f8069)",
  },
  {
    title: "Fugenlose Oberflächen",
    desc: "Für großzügige Bäder und moderne Wohnräume",
    hue: "linear-gradient(135deg, #b9bdbe, #7d8486)",
  },
  {
    title: "Oberflächenveredelungen",
    desc: "Für individuelle Akzentwände mit Charakter",
    hue: "linear-gradient(135deg, #5b86a8, #caa94f)",
  },
];

function WandUndWirkung() {
  const [glow, setGlow] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--ww-green-800)] text-[var(--ww-cream)] antialiased">
      {/* ================= HEADER ================= */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <a href="#start" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg text-[var(--ww-gold)]">
                <Paintbrush className="h-8 w-8 -rotate-45" strokeWidth={1.4} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-wide text-[var(--ww-gold)]">
                  WAND &amp; WIRKUNG
                </span>
                <span className="mt-1 text-[10px] italic tracking-wide text-[var(--ww-gold)]/70">
                  auf höchstem Niveau
                </span>
              </span>
            </a>
            <div className="ml-2 hidden items-center gap-2 sm:flex">
              <SocialIcon label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/[^a-zä]/g, "")}`}
                className="text-sm text-[var(--ww-cream)]/85 transition-colors hover:text-[var(--ww-gold)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#kontakt"
            className="rounded-full bg-gradient-to-b from-[var(--ww-gold-bright)] to-[var(--ww-gold)] px-6 py-3 text-sm font-semibold text-[#3a2f12] shadow-lg shadow-[var(--ww-gold)]/25 transition-transform hover:-translate-y-0.5"
          >
            Projekt anfragen
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="start"
        className="ww-marble relative flex min-h-screen items-center overflow-hidden"
        onMouseEnter={() => setGlow(true)}
        onMouseLeave={() => setGlow(false)}
      >
        <GoldVeins glow={glow} />

        {/* leichtes Vignette-Overlay für Lesbarkeit */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(6,18,14,0.72) 0%, rgba(6,18,14,0.35) 45%, transparent 75%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
          <div className="max-w-3xl">
            <p className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.28em] text-[var(--ww-gold)]">
              <span className="h-px w-10 bg-[var(--ww-gold)]/70" />
              Angehender Malermeister · Wilhelmshaven &amp; Umgebung
            </p>

            <h1 className="mt-8 font-serif text-5xl font-semibold leading-[1.05] text-[var(--ww-cream)] sm:text-6xl lg:text-7xl">
              Wände, die wirken.
              <br />
              Oberflächen, die bleiben.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--ww-cream)]/75">
              Andreas Wagner gestaltet Wände und Böden – kreative Wandgestaltung
              mit fugenlosen Systemen, Spachteltechnik und Harz, persönlich
              geplant, sauber ausgeführt und passend zu Ihrem Raum.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#kontakt"
                className="rounded-full bg-gradient-to-b from-[var(--ww-gold-bright)] to-[var(--ww-gold)] px-8 py-4 text-sm font-semibold text-[#3a2f12] shadow-lg shadow-[var(--ww-gold)]/25 transition-transform hover:-translate-y-0.5"
              >
                Unverbindlich beraten lassen
              </a>
              <a
                href="#projekte"
                className="rounded-full border border-[var(--ww-cream)]/25 px-8 py-4 text-sm font-semibold text-[var(--ww-cream)] transition-colors hover:border-[var(--ww-gold)] hover:text-[var(--ww-gold)]"
              >
                Arbeiten ansehen
              </a>
            </div>
          </div>
        </div>

        <a
          href="#vorteile"
          aria-label="Nach unten scrollen"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--ww-cream)]/50 transition-colors hover:text-[var(--ww-gold)]"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* ================= VORTEILE (Creme-Band, gerissene Kanten) ========= */}
      <section id="vorteile" className="relative bg-[var(--ww-cream)] py-24">
        <BrushEdge
          fill="var(--ww-cream)"
          flip
          seed={7}
          className="absolute inset-x-0 top-0 -translate-y-[98%]"
        />
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="rounded-2xl bg-white/60 p-7 shadow-[0_18px_40px_-24px_rgba(20,50,41,0.5)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ww-green-700)] text-[var(--ww-gold-bright)]">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <h3 className="mt-6 font-serif text-lg font-semibold text-[var(--ww-green-800)]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ww-green-800)]/70">
                  {f.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
        <BrushEdge
          fill="var(--ww-green-800)"
          seed={23}
          className="absolute inset-x-0 bottom-0"
        />
      </section>

      {/* ================= LEISTUNGEN (grün) ============================== */}
      <section id="leistungen" className="ww-marble relative overflow-hidden py-28">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--ww-gold)]">
                Leistungen
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[var(--ww-cream)] sm:text-5xl">
                Welche Oberfläche passt zu Ihrem Raum?
              </h2>
            </div>
            <a
              href="#leistungen"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ww-gold)] hover:gap-3"
            >
              Alle Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div id="projekte" className="mt-14 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-2xl border border-[var(--ww-cream)]/10 bg-[var(--ww-green-900)]/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] transition-transform hover:-translate-y-1"
              >
                <div
                  className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                  style={{ background: s.hue }}
                />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-[var(--ww-cream)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--ww-cream)]/65">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--ww-gold)] group-hover:gap-3">
                    Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= KONTAKT / FOOTER =============================== */}
      <footer id="kontakt" className="bg-[var(--ww-green-900)] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
          <span className="flex items-center gap-3 text-[var(--ww-gold)]">
            <Paintbrush className="h-6 w-6 -rotate-45" strokeWidth={1.4} />
            <span className="font-serif text-lg font-semibold tracking-wide">
              WAND &amp; WIRKUNG
            </span>
          </span>
          <p className="max-w-md text-sm text-[var(--ww-cream)]/55">
            Wandgestaltung auf höchstem Niveau – Wilhelmshaven &amp; Umgebung.
          </p>
          <a
            href="#start"
            className="mt-2 rounded-full bg-gradient-to-b from-[var(--ww-gold-bright)] to-[var(--ww-gold)] px-7 py-3 text-sm font-semibold text-[#3a2f12]"
          >
            Projekt anfragen
          </a>
        </div>
      </footer>
    </div>
  );
}

function SocialIcon({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[var(--ww-gold-bright)] to-[var(--ww-gold-deep)] text-[#3a2f12]"
    >
      {children}
    </span>
  );
}
