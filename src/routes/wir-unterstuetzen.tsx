import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import { BookOpen, PawPrint, Heart, ShieldCheck, Hammer, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/wir-unterstuetzen")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Wir unterstützen Bildung & Tierschutz" },
      { name: "description", content: "Verlegt & Verschraubt aus Wilhelmshaven unterstützt Kinderbildung und Tierschutz durch Spenden und Lehrmaterialien." },
      { property: "og:title", content: "Wir unterstützen – Bildung & Tierschutz" },
      { property: "og:description", content: "Lokale Verantwortung: Lehrmaterial-Spenden für Kinder und Spenden an Tierschutzvereine." },
      { property: "og:url", content: "/wir-unterstuetzen" },
    ],
    links: [{ rel: "canonical", href: "/wir-unterstuetzen" }],
  }),
});

function FocusCard({
  icon: Icon,
  eyebrow,
  title,
  text,
  bullets,
  note,
}: {
  icon: any;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  note: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-8 backdrop-blur transition hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(201,168,76,0.45)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-xs uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{text}</p>
      <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <Bullet key={b}>{b}</Bullet>
        ))}
      </ul>
      <p className="mt-5 border-t border-border/60 pt-4 text-xs italic text-muted-foreground">{note}</p>
    </article>
  );
}

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Wir unterstützen"
        title="Wir unterstützen, was bleibt."
        intro="Als regionaler Handwerksbetrieb möchten wir nicht nur Räume verschönern, sondern auch dort etwas beitragen, wo Unterstützung wirklich ankommt: bei Kindern, Bildung und Tierschutz."
        breadcrumbs={[{ label: "Wir unterstützen" }]}
      />

      <Section>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Verlegt &amp; Verschraubt Handwerkerservice steht für zuverlässige Arbeit, ordentliche Ausführung
          und zügige Umsetzung. Gleichzeitig ist uns wichtig, Verantwortung über die Baustelle hinaus zu
          übernehmen. Deshalb unterstützen wir ausgewählte soziale Bereiche, die uns persönlich wichtig
          sind: Bildung für Kinder und Tierschutz.
        </p>
      </Section>

      <Section eyebrow="Schwerpunkte" title="Wo wir konkret etwas beitragen" bordered>
        <div className="grid gap-6 md:grid-cols-2">
          <FocusCard
            icon={BookOpen}
            eyebrow="Bildung"
            title="Lehrmaterial-Spenden für Kinder"
            text="Bildung beginnt oft mit einfachen Dingen: Hefte, Stifte, Bücher, Lernmaterialien und eine Umgebung, in der Kinder besser lernen können. Deshalb unterstützen wir die Bildung von Kindern in Form von Lehrmaterial-Spenden. Unser Ziel ist es, einen kleinen, aber sinnvollen Beitrag dazu zu leisten, dass Kinder bessere Voraussetzungen zum Lernen erhalten."
            bullets={[
              "Unterstützung durch Lehrmaterialien",
              "Fokus auf praktische Hilfe",
              "Beitrag für bessere Lernbedingungen",
              "Regional und verantwortungsbewusst",
            ]}
            note="Dabei geht es uns nicht um große Worte, sondern um konkrete Unterstützung im Rahmen unserer Möglichkeiten."
          />
          <FocusCard
            icon={PawPrint}
            eyebrow="Tierschutz"
            title="Spenden an Tierschutzvereine"
            text="Auch der Tierschutz liegt uns am Herzen. Tiere sind auf Menschen angewiesen, die Verantwortung übernehmen. Deshalb unterstützen wir Tierschutzvereine durch Spenden und möchten damit Organisationen helfen, die sich täglich um Schutz, Versorgung und Vermittlung von Tieren kümmern."
            bullets={[
              "Unterstützung von Tierschutzvereinen",
              "Hilfe für Versorgung und Betreuung",
              "Wertschätzung für ehrenamtliches Engagement",
              "Verantwortung gegenüber Tieren",
            ]}
            note="Tierschutz lebt von Menschen, die nicht wegsehen. Wir möchten dazu unseren Beitrag leisten."
          />
        </div>
      </Section>

      <Section eyebrow="Haltung" title="Warum uns das wichtig ist">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <Heart className="h-5 w-5 text-accent" />
              <h3 className="text-base font-semibold">Warum uns das wichtig ist</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Als lokaler Handwerksbetrieb arbeiten wir direkt bei Menschen vor Ort. Wir sehen, wie wichtig
              Vertrauen, Verantwortung und Zusammenhalt sind. Für uns gehört dazu auch, einen Teil
              zurückzugeben – nicht als große Werbeaussage, sondern als ehrlicher Bestandteil unserer
              Unternehmenshaltung.
            </p>
          </article>
          <article className="rounded-2xl border border-border/70 bg-card/50 p-7 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <h3 className="text-base font-semibold">Ehrlich. Nachvollziehbar. Ohne große Inszenierung.</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Wir kommunizieren unser Engagement bewusst sachlich. Wenn konkrete Aktionen, Spenden oder
              Kooperationen umgesetzt werden, können diese auf Wunsch dokumentiert und auf dieser Seite
              ergänzt werden. Dabei achten wir darauf, nur das zu zeigen, was tatsächlich stattgefunden hat.
            </p>
          </article>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/70 bg-background/40 p-5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p className="text-sm text-muted-foreground">
            Hinweis: Logos, Namen oder Bilder von unterstützten Einrichtungen und Vereinen werden nur
            verwendet, wenn eine entsprechende Freigabe vorliegt.
          </p>
        </div>
      </Section>

      <Section bordered>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Marke</p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Z.O.Z. auch außerhalb der Baustelle
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Zuverlässig. Ordentlich. Zügig. Diese Werte gelten für unsere Arbeit – und genauso für die Art,
              wie wir Verantwortung übernehmen möchten. Unterstützung muss nicht laut sein. Sie muss ehrlich
              gemeint sein und dort ankommen, wo sie gebraucht wird.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/50 p-8 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <Hammer className="h-5 w-5 text-accent" />
              <h3 className="text-base font-semibold">Handwerk mit Haltung</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Verlegt &amp; Verschraubt Handwerkerservice steht für saubere Arbeit, klare Kommunikation und
              regionale Verantwortung. Wir möchten mit unserer Arbeit Werte schaffen – auf der Baustelle und
              darüber hinaus.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/kontakt">
                  Projekt anfragen <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-border bg-transparent px-5"
              >
                <Link to="/">Zur Startseite</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-11 rounded-full px-4 text-muted-foreground hover:text-foreground"
              >
                <Link to="/ueber-uns">Über uns</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CtaBlock />
    </>
  );
}
