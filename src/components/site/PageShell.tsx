import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WA_HREF =
  "https://wa.me/491634799286?text=Hallo%2C%20ich%20habe%20ein%20Projekt%3A%20";

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative border-b border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
      />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:pt-24">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Start</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-foreground">{b.label}</Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-[#25D366] px-7 text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#25D366]/90"
          >
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp schreiben
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border bg-transparent px-7 hover:bg-card"
          >
            <a href="tel:+491634799286">
              <Phone className="mr-1 h-4 w-4" /> 0163 4799286
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/kontakt">
              Projekt anfragen <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  bordered = false,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <section className={bordered ? "border-y border-border/60 bg-background/40" : ""}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        {(eyebrow || title) && (
          <div className="max-w-2xl">
            {eyebrow && <p className="text-xs uppercase tracking-[0.28em] text-accent">{eyebrow}</p>}
            {title && (
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className={eyebrow || title ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

export function CtaBlock({
  title = "Bereit für eine ehrliche Einschätzung?",
  text = "Senden Sie kurz Fotos und ein paar Maße – Sie erhalten zeitnah eine realistische Einschätzung.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative border-t border-border/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.8 }}
      />
      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-accent px-7 text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/kontakt">
              Anfrage starten <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
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
        </div>
      </div>
    </section>
  );
}
