import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/data/projects";
import {
  breadcrumbNode, faqPageNode, jsonLdScript, serviceNode, webPageNode,
} from "@/lib/schema";
import { QuickAnswer, FactBox, LimitsBox, InternalLinks } from "@/components/site/InfoBlocks";
import { PreisrechnerCTA } from "@/components/site/PreisrechnerCTA";

const PAGE_URL = "https://www.verlegt-verschraubt.de/bodenverlegung-wilhelmshaven";

export const Route = createFileRoute("/bodenverlegung-wilhelmshaven")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Bodenverlegung in Wilhelmshaven – Vinyl, Laminat, PVC, Teppich" },
      { name: "description", content: "Bodenverlegung in Wilhelmshaven & Umgebung: Vinyl, Laminat, PVC und Teppich. Sauber verlegt, mit Untergrundprüfung und Sockelleisten." },
      { property: "og:title", content: "Bodenverlegung in Wilhelmshaven & Umgebung" },
      { property: "og:description", content: "Vinyl, Laminat, PVC und Teppich – fachgerecht verlegt von Verlegt & Verschraubt." },
      { property: "og:url", content: PAGE_URL },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Bodenverlegung in Wilhelmshaven mit Vinyl, Laminat, Teppich und sauberen Abschlüssen" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bodenverlegung in Wilhelmshaven & Umgebung" },
      { name: "twitter:description", content: "Vinyl, Laminat, PVC und Teppich – fachgerecht verlegt von Verlegt & Verschraubt." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Bodenverlegung in Wilhelmshaven mit Vinyl, Laminat, Teppich und sauberen Abschlüssen" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: PAGE_URL,
          name: "Bodenverlegung in Wilhelmshaven & Umgebung",
          description: "Vinyl, Laminat, PVC, Teppich, Treppen und Sockelleisten – sauber verlegt, mit ordentlichen Kanten und stimmigem Verlegebild. Für Privatkunden in Wilhelmshaven, Schortens, Sande, Jever, Varel und Wangerland.",
        }),
        serviceNode({
          url: PAGE_URL,
          name: "Bodenverlegung in Wilhelmshaven",
          description: "Verlegung von Vinyl, Designboden, Laminat, PVC und Teppich inklusive Untergrundprüfung, Altbelag entfernen, Treppenverkleidung sowie Sockelleisten und Übergängen.",
          serviceType: "Bodenverlegung",
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: "Bodenverlegung", url: PAGE_URL },
        ]),
        faqPageNode(faqs),
      ]),
    ],
  }),
});

const sub = [
  { t: "Vinylboden verlegen", d: "Klick- und Klebevinyl, hochwertige Optiken, ruhig und strapazierfähig." },
  { t: "Designboden verlegen", d: "Designvinyl / SPC / LVT mit edler Holz- oder Steinoptik – langlebig und wertig." },
  { t: "Laminat verlegen", d: "Click-Systeme, sauberer Plankenverlauf, Diagonalverlegung möglich." },
  { t: "Boden ausgleichen", d: "Untergrund spachteln und nivellieren – Voraussetzung für ein ruhiges Verlegebild." },
  { t: "PVC verlegen", d: "Pflegeleichter Bodenbelag für Küche, Bad und Nebenräume." },
  { t: "Teppich verlegen", d: "Spannteppich oder verklebt – schalldämpfend und behaglich." },
  { t: "Treppenverkleidung mit Vinyl & Teppich", d: "Stufen sauber bezogen, kantenrein und rutschsicher – Vinyl und Teppich nach Wunsch." },
  { t: "Sockelleisten & Übergänge", d: "Mit Eckstücken oder auf Gehrung – passende Übergangsschienen, ordentliche Ecken." },
  { t: "Acryl-Versiegeln von Leisten", d: "Sockelleisten und Treppenleisten sauber mit Acryl versiegelt – geschützt gegen Feuchtigkeit und haltbar." },
];

const faqs = [
  { q: "Wie wird der Untergrund geprüft?", a: "Wir prüfen Ebenheit, Restfeuchte und Tragfähigkeit. Bei Bedarf gleichen wir Unebenheiten aus oder empfehlen die passende Vorbereitung." },
  { q: "Müssen die Räume leer sein?", a: "Idealerweise ja. Auf Wunsch übernehmen wir Möbelumstellung im überschaubaren Rahmen oder organisieren das gemeinsam." },
  { q: "Entfernt ihr den Altbelag?", a: "Ja. Altbelag entfernen, entsorgen und Untergrund vorbereiten gehört zum Leistungsumfang." },
  { q: "Was kostet Bodenverlegung in Wilhelmshaven?", a: "Der Preis hängt von Bodenart, m², Vorbereitung und Zubehör ab. Im Preisrechner bekommen Sie eine erste Orientierung." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title="Bodenverlegung in Wilhelmshaven & Umgebung"
        intro="Vinyl, Laminat, PVC, Teppich, Treppen und Sockelleisten – sauber verlegt, mit ordentlichen Kanten und stimmigem Verlegebild. Für Privatkunden in Wilhelmshaven, Schortens, Sande, Jever, Varel und Wangerland."
        breadcrumbs={[{ label: "Leistungen" }, { label: "Bodenverlegung" }]}
      />

      <Section eyebrow="Kurzfassung" title="Bodenverlegung in Wilhelmshaven">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt übernimmt Bodenverlegung in Wilhelmshaven
            und Umgebung. Dazu gehören Vinyl, Laminat, PVC, Teppich,
            Untergrundprüfung, Zuschnitt, Verlegung und auf Wunsch
            Sockelleisten.
          </QuickAnswer>
          <FactBox />
        </div>
      </Section>

      <PreisrechnerCTA variant="bodenverlegung" />

      <Section eyebrow="Kurzfassung" title="Was wir verlegen" bordered>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Verlegt &amp; Verschraubt verlegt für Privatkunden in Wilhelmshaven und
          Umgebung verschiedene Bodenbeläge. Dazu gehören Untergrundprüfung,
          Altbelag entfernen, Verlegung sowie der saubere Abschluss mit Sockelleisten
          und Übergängen. Eine erste Einschätzung ist anhand von Fotos, Maßen und
          kurzer Beschreibung möglich.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sub.map((s) => (
            <article key={s.t} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Vorbereitung" title="Untergrund &amp; Altbelag" bordered>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Untergrund prüfen und vorbereiten</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Bullet>Ebenheit prüfen, kleine Unebenheiten ausgleichen</Bullet>
              <Bullet>Saugfähigkeit und Tragfähigkeit beurteilen</Bullet>
              <Bullet>Sauberer, trockener Untergrund vor Verlegebeginn</Bullet>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Altbelag entfernen</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <Bullet>Teppich, PVC, Laminat oder Vinyl rückbauen</Bullet>
              <Bullet>Kleberückstände beurteilen und entfernen</Bullet>
              <Bullet>Fachgerechte Entsorgung auf Wunsch</Bullet>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Ablauf" title="So arbeiten wir">
        <ol className="grid gap-6 md:grid-cols-4">
          {["Anfrage & Fotos", "Einschätzung & Termin", "Vorbereitung & Verlegung", "Abschluss & Übergabe"].map((t, i) => (
            <li key={t} className="rounded-2xl border border-border/70 bg-card/40 p-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Schritt {i + 1}</p>
              <h3 className="mt-1 text-base font-semibold">{t}</h3>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Preisfaktoren" title="Was den Preis beeinflusst" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <Bullet>Bodenart (Vinyl, Designboden, Laminat, PVC, Teppich)</Bullet>
          <Bullet>Quadratmeter und Raumzuschnitt</Bullet>
          <Bullet>Untergrund ausgleichen / spachteln</Bullet>
          <Bullet>Altbelag entfernen ja/nein</Bullet>
          <Bullet>Sockelleisten – mit Eckstücken oder auf Gehrung</Bullet>
          <Bullet>Türen, Heizungsrohre, Schrägen</Bullet>
        </ul>
        <div className="mt-8">
          <Link to="/preise" className="inline-flex items-center text-sm text-accent hover:underline">
            Zum Preisrechner <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="Referenzen" title="Bodenprojekte aus der Region">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => ["Bodenverlegung", "Treppenbelag", "Detailarbeiten"].includes(p.category))
            .slice(0, 6)
            .map((p, i) => (
              <ProjectCard key={p.slug} project={p} eager={i === 0} />
            ))}
        </div>
        <div className="mt-8">
          <Link to="/showroom" className="inline-flex items-center text-sm text-accent hover:underline">
            Alle Projekte im Showroom <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Häufige Fragen zur Bodenverlegung" bordered>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`b-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section eyebrow="Grenzen & nächste Schritte" title="Was vorab zu klären ist">
        <div className="grid gap-6 lg:grid-cols-2">
          <LimitsBox
            title="Voraussetzungen für ein gutes Ergebnis"
            items={[
              "Der Untergrund wird vorab geprüft (Ebenheit, Restfeuchte, Tragfähigkeit).",
              "Bei starken Schäden oder Feuchtigkeit kann eine separate Vorbereitung nötig sein.",
              "Wir machen keine unrealistischen Pauschalversprechen – die Einschätzung erfolgt nach Foto und Maßen.",
            ]}
            note="Sind Sie unsicher? Senden Sie Fotos vom Raum – wir geben eine ehrliche Einschätzung."
          />
          <InternalLinks
            links={[
              { to: "/preise", label: "Kosten für Bodenverlegung einschätzen" },
              { to: "/referenzen", label: "Referenzen ansehen" },
              { to: "/kontakt", label: "Projekt mit Fotos anfragen" },
              { to: "/faq", label: "Antworten auf häufige Fragen" },
            ]}
          />
        </div>
      </Section>

      <PreisrechnerCTA variant="bodenverlegung" />

      <CtaBlock
        title="Bodenprojekt in Wilhelmshaven anfragen"
        text="Senden Sie Fotos vom Raum und ein paar Maße – Sie erhalten eine ehrliche Einschätzung."
      />
    </>
  );
}
