import { Link } from "@tanstack/react-router";
import { Star, ArrowRight, MessageCircle, Phone, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Echte Bewertungs-Auszüge (Quelle: Google-Unternehmensprofil / weitere Plattformen,
// identisch zu /referenzen – nicht erfunden, nur Auszüge).
export const realReviews = [
  {
    name: "Pass Pass2",
    src: "Google",
    cat: "Küchenmontage",
    text: "Küche nach unserem Umzug komplett aufgebaut. Saubere Arbeit, alles funktioniert.",
  },
  {
    name: "Haysam B.",
    src: "Google",
    cat: "Bodenverlegung",
    text: "Laminat im ganzen Wohnzimmer verlegt – ordentlich, schnell, ohne Diskussion.",
  },
  {
    name: "Pauline G.",
    src: "Google",
    cat: "Zuverlässigkeit",
    text: "Sehr zuverlässig und flexibel bei einem kurzfristigen Termin.",
  },
  {
    name: "Euphoria_Zeus",
    src: "Google",
    cat: "Bodenverlegung",
    text: "Boden ordentlich und zügig verlegt. Genau wie versprochen.",
  },
  {
    name: "Michael Kraushaar",
    src: "Facebook",
    cat: "Kommunikation",
    text: "Klare Kommunikation und faires Preis-Leistungs-Verhältnis.",
  },
] as const;

function Stars({ size = "h-3.5 w-3.5" }: { size?: string }) {
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-current`} />
      ))}
    </div>
  );
}

/** Schmale Trust-Leiste oberhalb / am Rechner. Keine erfundenen Zahlen. */
export function TrustBar() {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 px-5 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Stars />
          <div className="text-sm">
            <p className="font-medium text-foreground">
              Echte Kundenstimmen aus Wilhelmshaven &amp; Umgebung
            </p>
            <p className="text-xs text-muted-foreground">
              Auszüge aus Google, MyHammer, Das Telefonbuch &amp; Facebook
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="h-9 rounded-full border-border bg-transparent text-xs hover:bg-card"
          >
            <Link to="/referenzen">Bewertungen ansehen</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-9 rounded-full bg-accent text-xs text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/kontakt">
              Unverbindlich anfragen <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Seitliche Bewertungsbox neben dem Rechner (Desktop). */
export function ReviewsAside() {
  const picks = realReviews.slice(0, 3);
  return (
    <aside className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-accent">Kundenstimmen</p>
        <Stars />
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        Echte Bewertungen
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Quelle: Google-Unternehmensprofil &amp; weitere Plattformen
      </p>

      <ul className="mt-5 space-y-5">
        {picks.map((r) => (
          <li key={r.name} className="border-l-2 border-accent/60 pl-4">
            <p className="text-sm leading-relaxed text-foreground/90">„{r.text}"</p>
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-foreground/80">{r.name}</span> · {r.src} · {r.cat}
            </p>
          </li>
        ))}
      </ul>

      <Link
        to="/referenzen"
        className="mt-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-accent hover:underline"
      >
        Alle Bewertungen ansehen <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </aside>
  );
}

/** Vertrauensblock nach dem Rechner – führt zum nächsten Schritt. */
export function PostCalcTrust() {
  const r = realReviews[0];
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Noch unsicher?</p>
          <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Unsere Kunden schätzen besonders die saubere Ausführung,
            klare Kommunikation und zuverlässige Termine.
          </p>
          <figure className="mt-5 border-l-2 border-accent/60 pl-4">
            <Stars />
            <blockquote className="mt-2 text-sm leading-relaxed text-foreground/90">
              „{r.text}"
            </blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {r.name} · {r.src} · {r.cat}
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col gap-2 lg:min-w-[14rem]">
          <Button
            asChild
            className="h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/kontakt">
              Anfrage mit Preisrahmen senden <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-border bg-transparent hover:bg-card"
          >
            <a
              href="https://wa.me/491634799286"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImagePlus className="mr-1 h-4 w-4" />
              Bilder per WhatsApp senden
              <MessageCircle className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-border bg-transparent hover:bg-card"
          >
            <a href="tel:+491634799286">
              <Phone className="mr-1 h-4 w-4" /> Direkt anrufen
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Was-Kunden-schätzen-Abschnitt mit echten Bewertungs-Cards. */
export function ValuedBySection() {
  const values = [
    "Saubere Ausführung",
    "Ordentliche Übergabe",
    "Klare Kommunikation",
    "Lokale Erreichbarkeit",
    "Zuverlässige Terminabstimmung",
  ];
  const cards = realReviews.slice(0, 3);
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {values.map((v) => (
          <li
            key={v}
            className="rounded-full border border-border/70 bg-card/50 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground/80"
          >
            {v}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((r) => (
          <article
            key={r.name}
            className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur"
          >
            <Stars />
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">„{r.text}"</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{r.name}</span>
              <span>
                {r.src} · {r.cat}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Auszüge echter Bewertungen. Quelle: Google-Unternehmensprofil &amp; weitere Plattformen.
        Die jeweils volle Bewertung finden Sie auf der genannten Plattform bzw. unter Referenzen.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          asChild
          className="h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link to="/showroom">
            Unsere Arbeiten ansehen <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-border bg-transparent hover:bg-card"
        >
          <Link to="/referenzen">Alle Bewertungen &amp; Referenzen</Link>
        </Button>
      </div>
    </div>
  );
}
