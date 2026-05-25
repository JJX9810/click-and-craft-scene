import { Calculator, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PreisrechnerCTAVariant =
  | "bodenverlegung"
  | "laminat"
  | "vinyl"
  | "pvc"
  | "teppichboden"
  | "kuechenmontage"
  | "entruempelung"
  | "handwerkerservice";

type Preset = {
  title: string;
  text: string;
  buttonText: string;
};

const PRESETS: Record<PreisrechnerCTAVariant, Preset> = {
  bodenverlegung: {
    title: "Kosten für Ihre Bodenverlegung grob einschätzen",
    text: "Ob Laminat, Vinyl, PVC oder Teppichboden – mit unserem Preisrechner erhalten Sie eine erste Orientierung zum möglichen Aufwand. Anschließend können Sie uns direkt Fotos, Maße und Projektdaten senden.",
    buttonText: "Bodenverlegung berechnen",
  },
  laminat: {
    title: "Laminat verlegen lassen – Aufwand grob einschätzen",
    text: "Geben Sie Fläche, Räume und wichtige Projektdaten ein. Der Rechner hilft bei der ersten Orientierung, bevor wir den genauen Aufwand anhand von Fotos oder einem Termin einschätzen.",
    buttonText: "Laminat-Kosten einschätzen",
  },
  vinyl: {
    title: "Vinylboden geplant? Erste Kosteneinschätzung starten",
    text: "Nutzen Sie den Preisrechner für eine grobe Orientierung. Für eine genauere Einschätzung sind Untergrund, Fläche, Material und Details vor Ort entscheidend.",
    buttonText: "Vinylboden einschätzen",
  },
  pvc: {
    title: "PVC-Boden verlegen – Aufwand grob kalkulieren",
    text: "Mit wenigen Angaben erhalten Sie eine erste Orientierung. Danach können Sie Ihre Projektdaten direkt senden und eine persönliche Rückmeldung erhalten.",
    buttonText: "PVC-Projekt einschätzen",
  },
  teppichboden: {
    title: "Teppichboden verlegen lassen? Erst grob einschätzen",
    text: "Der Preisrechner hilft Ihnen bei der ersten Orientierung. Für den genauen Aufwand prüfen wir Fläche, Untergrund, Zuschnitte und weitere Details.",
    buttonText: "Teppichboden einschätzen",
  },
  kuechenmontage: {
    title: "Küchenmontage grob einschätzen lassen",
    text: "Küchen unterscheiden sich stark je nach Aufbau, Anpassungen, Arbeitsplatte, Anschlüssen und Zustand vor Ort. Der Preisrechner hilft bei der ersten Orientierung.",
    buttonText: "Küchenmontage einschätzen",
  },
  entruempelung: {
    title: "Entrümpelung oder Entsorgung grob einschätzen",
    text: "Ob Keller, Garage, Wohnung oder einzelne Räume – mit ein paar Angaben erhalten Sie eine erste Orientierung. Fotos helfen uns anschließend bei einer realistischen Einschätzung.",
    buttonText: "Entrümpelung einschätzen",
  },
  handwerkerservice: {
    title: "Handwerksleistung grob einschätzen lassen",
    text: "Beschreiben Sie kurz Ihr Projekt und nutzen Sie den Preisrechner als erste Orientierung. Danach können Sie uns Ihre Angaben direkt senden.",
    buttonText: "Projekt einschätzen",
  },
};

export function PreisrechnerCTA({
  variant,
  title,
  text,
  buttonText,
  href,
  eyebrow = "Unverbindliche Ersteinschätzung",
}: {
  variant: PreisrechnerCTAVariant;
  title?: string;
  text?: string;
  buttonText?: string;
  href?: string;
  eyebrow?: string;
}) {
  const preset = PRESETS[variant];
  const finalTitle = title ?? preset.title;
  const finalText = text ?? preset.text;
  const finalButton = buttonText ?? preset.buttonText;
  const finalHref = href ?? `/preise?leistung=${variant}`;

  return (
    <section aria-label="Preisrechner-Hinweis" className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-7 backdrop-blur sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {finalTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {finalText}
            </p>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground/90">
              Die Berechnung ersetzt kein verbindliches Angebot. Für eine genaue Einschätzung
              prüfen wir Fläche, Zustand, Material und Aufwand.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <Calculator className="h-3.5 w-3.5 text-accent" /> Lokal aus Wilhelmshaven
              </li>
              <li className="inline-flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5 text-accent" /> Fotos & Maße per WhatsApp
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Unverbindliche Ersteinschätzung
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Button
              asChild
              size="lg"
              className="h-12 w-full rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90 sm:w-auto"
            >
              <a href={finalHref}>
                {finalButton} <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <a
              href="https://wa.me/491634799286"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Fotos direkt per WhatsApp senden
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
