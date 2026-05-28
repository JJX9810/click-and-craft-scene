import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone, Mail, User, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * Kompakte Kurzantwort-Box (GEO/AEO).
 * Sichtbarer, klarer Antwort-Absatz für Nutzer und KI-Suchsysteme.
 */
export function QuickAnswer({
  title = "Kurz erklärt",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className="rounded-2xl border border-accent/40 bg-accent/5 p-6 backdrop-blur sm:p-7"
      aria-label={title}
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{title}</p>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">{children}</p>
    </aside>
  );
}

/**
 * Faktenbox: zentrale Unternehmensdaten, sichtbar und vertrauensfördernd.
 */
export function FactBox() {
  return (
    <aside
      className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur sm:p-7"
      aria-label="Verlegt & Verschraubt – Fakten"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Auf einen Blick</p>
      <p className="mt-2 text-lg font-semibold">Verlegt &amp; Verschraubt Handwerkerservice</p>
      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <User className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Inhaber
          </dt>
          <dd className="mt-0.5 pl-6">Justus Brosch</dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Standort
          </dt>
          <dd className="mt-0.5 pl-6">Weichselstraße 12, 26388 Wilhelmshaven</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Wrench className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Leistungen
          </dt>
          <dd className="mt-0.5 pl-6">Bodenverlegung, Küchenmontage, Entrümpelung &amp; Entsorgung</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Einsatzgebiet
          </dt>
          <dd className="mt-0.5 pl-6">
            Wilhelmshaven, Sande, Schortens, Jever, Varel, Wangerland, Wittmund und Umgebung
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Telefon
          </dt>
          <dd className="mt-0.5 pl-6">
            <a href="tel:+491634799286" className="hover:text-accent">0163 4799286</a>
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            E-Mail
          </dt>
          <dd className="mt-0.5 break-all pl-6">
            <a href="mailto:justus.brosch@verlegt-verschraubt.de" className="hover:text-accent">
              justus.brosch@verlegt-verschraubt.de
            </a>
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/**
 * Leistungsgrenzen sichtbar machen: was wird nicht gemacht / was muss vorab geprüft werden.
 */
export function LimitsBox({
  title = "Was wir nicht übernehmen",
  items,
  note,
}: {
  title?: string;
  items: string[];
  note?: string;
}) {
  return (
    <aside
      className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur sm:p-7"
      aria-label={title}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-accent" />
        <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{title}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent/70" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
    </aside>
  );
}

type InternalLink = { to: string; label: string };

/**
 * Beschreibende interne Links (CTAs) – verbessert interne Verlinkung.
 */
export function InternalLinks({
  title = "Weiter im Überblick",
  links,
}: {
  title?: string;
  links: InternalLink[];
}) {
  return (
    <aside
      className="rounded-2xl border border-border/70 bg-card/40 p-6 backdrop-blur sm:p-7"
      aria-label={title}
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">{title}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/90 hover:text-accent"
            >
              <ArrowRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:translate-x-0.5" />
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
