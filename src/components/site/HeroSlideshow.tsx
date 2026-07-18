import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
const WA_HREF =
  "https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20";

/**
 * Vollbild-Hero: Slideshow echter Projektfotos mit langsamem Heraus-Zoomen,
 * typografischer Markenplatte und synchron eingeblendeten echten Bewertungen.
 * prefers-reduced-motion: erstes Bild statisch, keine Rotation.
 */

type Slide = {
  src: string;
  label: string;
  review?: { q: string; w: string };
};

const R = {
  euphoria: { q: "Boden ordentlich und zügig verlegt. Genau wie versprochen.", w: "Euphoria_Zeus · Google" },
  kraushaar: { q: "Klare Kommunikation und faires Preis-Leistungs-Verhältnis.", w: "Michael Kraushaar · Facebook" },
  kolbKurz: { q: "So viel Einsatz, Zuverlässigkeit und Eigeninitiative haben wir bisher noch bei keinem Handwerksunternehmen erlebt.", w: "Familie Kolb · Google" },
  pauline: { q: "Sehr zuverlässig und flexibel bei einem kurzfristigen Termin.", w: "Pauline G. · Google" },
  haysam: { q: "Laminat im ganzen Wohnzimmer verlegt – ordentlich, schnell, ohne Diskussion.", w: "Haysam B. · Google" },
  kolbNetz: { q: "Herr Brosch kümmerte sich um einen Umzugspartner, einen Elektriker und einen Maler und koordinierte alle beteiligten Gewerke.", w: "Familie Kolb · Google" },
  kolbStart: { q: "Was ursprünglich nur mit der Bodenverlegung und der Küchenmontage begann, entwickelte sich zu einer vollständigen Organisation unseres Umzugs.", w: "Familie Kolb · Google" },
};

const SLIDES: Slide[] = [
  { src: "/projects/coldewei-06-vinyl-wohnzimmer.webp", label: "Vinyl-Wohnzimmer · Coldewei", review: R.euphoria },
  { src: "/projects/coldewei-16-vinyl-wohnzimmer-kamin.webp", label: "Wohnzimmer mit Kamin · Coldewei", review: R.kraushaar },
  { src: "/projects/kueche-marmoroptik-schortens-01.webp", label: "Küche Marmoroptik · Schortens", review: R.kolbKurz },
  { src: "/projects/kueche-wilhelmshaven-01.webp", label: "Küche · Wilhelmshaven", review: R.pauline },
  { src: "/projects/kueche-schortens-modern-01.webp", label: "Einbauküche · Schortens" },
  { src: "/projects/coldewei-04-vinyl-flur-treppe.webp", label: "Flur & Treppe · Coldewei", review: R.euphoria },
  { src: "/projects/laminat-bremerhaven-03-nachher.webp", label: "Laminat · Bremerhaven", review: R.haysam },
  { src: "/projects/netzwerk-led-decke-malerarbeiten.webp", label: "LED-Decke · Partnerprojekt", review: R.kolbNetz },
  { src: "/projects/teppichboden-schortens-02-nachher.webp", label: "Teppichboden · Schortens", review: R.kolbStart },
];

const INTERVAL = 6500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    const start = () => {
      stop();
      timer.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    };
    const stop = () => {
      if (timer.current) clearInterval(timer.current);
    };
    const onVis = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Nächstes Bild vorladen
  useEffect(() => {
    const next = new Image();
    next.src = SLIDES[(index + 1) % SLIDES.length].src;
  }, [index]);

  const goTo = (n: number) => setIndex(n % SLIDES.length);
  const review = SLIDES[index].review;

  return (
    <section
      className="hero-stage relative flex min-h-[calc(100svh-57px)] items-center justify-center overflow-hidden"
      aria-label="Verlegt & Verschraubt – Projekte aus Wilhelmshaven und Umgebung"
    >
      {SLIDES.map((s, n) => (
        <div
          key={s.src}
          aria-hidden={n !== index}
          className={`hero-slide ${n === index ? "on" : ""} ${animate ? "animate" : ""} ${n % 2 === 1 ? "alt" : ""}`}
          style={{ backgroundImage: `url('${s.src}')` }}
        />
      ))}
      <div className="hero-scrim" aria-hidden />

      <div className="relative z-[2] flex max-w-4xl flex-col items-center gap-5 px-6 pb-16 pt-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/logo.webp"
            alt=""
            aria-hidden
            width={144}
            height={135}
            className="h-14 w-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            fetchPriority="high"
          />
          <div className="font-display text-xl font-semibold uppercase tracking-[0.32em] [text-indent:0.32em] text-foreground [text-shadow:0_2px_18px_rgba(0,0,0,0.5)] sm:text-3xl">
            Verlegt &amp; Verschraubt
          </div>
          <div className="hero-goldline" aria-hidden />
          <div className="text-[11px] uppercase tracking-[0.42em] [text-indent:0.42em] text-muted-foreground sm:text-xs">
            Boden &nbsp;·&nbsp; Küche &nbsp;·&nbsp; Entrümpelung
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold uppercase leading-[1.05] text-foreground [text-shadow:0_4px_30px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
          Räume, die wirken.
          <span className="mt-3 block text-[0.4em] font-medium normal-case tracking-[0.2em] text-muted-foreground">
            Handwerkerservice in Wilhelmshaven &amp; Umgebung
          </span>
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ein Ansprechpartner statt zehn Handwerker – eigene Gewerke, geprüfte Partnerbetriebe, ein Ergebnis.
        </p>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
          >
            WhatsApp schreiben
          </a>
          <Link
            to="/kontakt"
            className="inline-flex h-12 items-center rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground shadow-lg transition hover:bg-accent/90"
          >
            Projekt anfragen →
          </Link>
          <Link
            to="/preise"
            className="inline-flex h-12 items-center rounded-full border border-accent/50 bg-background/40 px-7 text-sm font-medium text-foreground backdrop-blur transition hover:border-accent"
          >
            Kosten einschätzen
          </Link>
        </div>

        <div
          className="mt-2 inline-flex min-h-[42px] max-w-[min(92vw,640px)] items-center gap-2.5 rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-[13px] leading-snug text-muted-foreground backdrop-blur transition-opacity duration-500"
          style={{ opacity: review ? 1 : 0 }}
          aria-hidden={!review}
        >
          <span className="shrink-0 tracking-[2px] text-accent" aria-hidden>
            ★★★★★
          </span>
          {review && (
            <span>
              „{review.q}" · {review.w}
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 z-[3] -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] text-foreground/60">
        {SLIDES[index].label}
      </div>
      <div className="absolute bottom-7 left-1/2 z-[3] flex -translate-x-1/2 gap-2.5" role="tablist" aria-label="Bildauswahl">
        {SLIDES.map((s, n) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={n === index}
            aria-label={`Bild ${n + 1}: ${s.label}`}
            onClick={() => goTo(n)}
            className={`hero-dot ${n === index ? "on" : ""} ${animate ? "animate" : ""}`}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="hero-scrollcue absolute bottom-[74px] left-1/2 z-[3] hidden -translate-x-1/2 text-xl text-foreground/50 sm:block"
      >
        ↓
      </div>
    </section>
  );
}
