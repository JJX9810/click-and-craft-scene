import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hammer } from "lucide-react";
import heroScene from "@/assets/hero-flooring.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Verlegt & Verschraubt – Bodenverlegung Wilhelmshaven" },
      {
        name: "description",
        content:
          "Verlegt & Verschraubt Handwerkerservice aus Wilhelmshaven – professionelle Bodenverlegung mit sauberer Ausführung und hochwertigem Ergebnis.",
      },
    ],
  }),
});

function Index() {
  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-foreground">
          <Hammer className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold tracking-widest uppercase">
            Verlegt &amp; Verschraubt
          </span>
        </div>
        <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground md:block">
          Wilhelmshaven
        </span>
      </nav>

      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-2 lg:gap-8 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <span className="inline-block rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            Handwerkerservice
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Präzise Bodenverlegung.
            <br />
            <span className="text-accent">Sauber umgesetzt.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Verlegt &amp; Verschraubt Handwerkerservice aus Wilhelmshaven –
            professionelle Bodenverlegung mit sauberer Ausführung und
            hochwertigem Ergebnis.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="group h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
            >
              Angebot anfragen
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-7 text-foreground hover:bg-card"
            >
              Referenzen ansehen
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8 max-w-md">
            <div>
              <dt className="text-2xl font-semibold text-foreground">15+</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Jahre Erfahrung
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-foreground">500+</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Projekte
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-semibold text-foreground">100%</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Sauber
              </dd>
            </div>
          </dl>
        </div>

        {/* 3D Scene */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <img
              src={heroScene}
              alt="Bodenleger als stilisierte Holzfigur verlegt eine Laminatplanke"
              className="animate-hero-float h-full w-full object-cover"
              width={1024}
              height={640}
            />

            {/* Subtle vignette for legibility */}
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
      </section>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "oklch(0.55 0.11 50 / 0.35)" }}
      />
    </main>
  );
}
