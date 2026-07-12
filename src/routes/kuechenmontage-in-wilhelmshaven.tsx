import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/data/projects";
import {
  breadcrumbNode, jsonLdScript, offerNode, serviceNode, webPageNode, SERVICE_IDS,
} from "@/lib/schema";
import { QuickAnswer, FactBox, LimitsBox, InternalLinks } from "@/components/site/InfoBlocks";
import { PreisrechnerCTA } from "@/components/site/PreisrechnerCTA";
import { KUECHE_MONTAGE_PRICE } from "@/lib/pricing";

const KM_AREA_SERVED = [
  "Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Wittmund", "Friesland",
];
import { QuickAnswer, FactBox, LimitsBox, InternalLinks } from "@/components/site/InfoBlocks";
import { PreisrechnerCTA } from "@/components/site/PreisrechnerCTA";

const KM_URL = "https://verlegt-verschraubt.de/kuechenmontage-in-wilhelmshaven";



export const Route = createFileRoute("/kuechenmontage-in-wilhelmshaven")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Küchenmontage in Wilhelmshaven – Aufbau, Restmontage, Arbeitsplatte" },
      { name: "description", content: "Küchenmontage in Wilhelmshaven & Umgebung: Aufbau nach Umzug, Restmontage, Arbeitsplatten, Spüle und Armatur. Saubere Ausführung von Verlegt & Verschraubt." },
      { property: "og:title", content: "Küchenmontage in Wilhelmshaven & Umgebung" },
      { property: "og:description", content: "Aufbau, Restmontage und Anpassung Ihrer Küche – sauber und zuverlässig." },
      { property: "og:url", content: KM_URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/projects/kueche-wilhelmshaven-01.webp" },
      { property: "og:image:alt", content: "Küchenmontage in Wilhelmshaven und Umgebung durch Verlegt & Verschraubt" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Küchenmontage in Wilhelmshaven & Umgebung" },
      { name: "twitter:description", content: "Aufbau, Restmontage und Anpassung Ihrer Küche – sauber und zuverlässig." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/projects/kueche-wilhelmshaven-01.webp" },
      { name: "twitter:image:alt", content: "Küchenmontage in Wilhelmshaven und Umgebung durch Verlegt & Verschraubt" },
    ],
    links: [{ rel: "canonical", href: KM_URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: KM_URL,
          name: "Küchenmontage in Wilhelmshaven & Umgebung",
          description: "Aufbau nach Umzug, Restmontage, neue Module, Arbeitsplatten, Spüle und Armatur sowie saubere Abschlüsse mit Sockel, Lichtleisten und Silikon.",
          about: { "@id": SERVICE_IDS.kuechenmontage },
        }),
        serviceNode({
          url: KM_URL,
          id: SERVICE_IDS.kuechenmontage,
          name: "Küchenmontage in Wilhelmshaven",
          description: "Küchenaufbau, Restmontage und Anpassung – von der Front über die Arbeitsplatte bis zur Spüle und Armatur. Wasseranschluss an bestehende Eckventile.",
          serviceType: "Küchenmontage",
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "Küchenmontage", url: KM_URL },
        ]),
      ]),
    ],
  }),
});

const scope = [
  { t: "Küche nach Umzug aufbauen", d: "Bestehende Küche im neuen Raum aufstellen, ausrichten und anschließen." },
  { t: "Restmontage einer Küche", d: "Sie haben angefangen oder etwas fehlt – wir bringen es sauber zu Ende." },
  { t: "Neue Küchenmodule montieren", d: "Korpusse, Hängeschränke, Fronten – ausgerichtet und stabil befestigt." },
  { t: "Arbeitsplatten", d: "Zuschnitt, Einpassung, Verbindungen und saubere Abschlüsse." },
  { t: "Spüle & Armatur", d: "Einbau, Anschluss an vorhandene Anschlüsse, Dichtungen sauber gesetzt." },
  { t: "Abschlussleisten & Silikon", d: "Sockel, Lichtleisten, Silikonfugen – ordentlich und unauffällig." },
];

const faqs = [
  { q: "Montiert ihr Küchen nach einem Umzug?", a: "Ja. Wir bauen bestehende Küchen ab, transportieren sie und bauen sie im neuen Zuhause sauber wieder auf." },
  { q: "Schließt ihr Herd oder Starkstrom an?", a: "Nein. Elektroinstallationen übernehmen Fachbetriebe. Bei Bedarf stimmen wir uns ab." },
  { q: "Macht ihr Sanitäranschlüsse?", a: "Wasseranschlüsse an bestehende Eckventile inklusive Spüle und Armatur ja, neue Sanitäranlagen nein." },
  { q: "Was muss vor dem Termin vorhanden sein?", a: "Komplette Küche bzw. fehlende Teile, Anschlüsse für Wasser/Strom und ein zugänglicher Raum." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title="Küchenmontage in Wilhelmshaven & Umgebung"
        intro="Aufbau nach Umzug, Restmontage, neue Module, Arbeitsplatten und Anschluss von Spüle und Armatur. Saubere Ausführung mit ordentlichen Übergängen und einer dokumentierten Übergabe."
        breadcrumbs={[{ label: "Leistungen" }, { label: "Küchenmontage" }]}
      />

      <Section eyebrow="Kurzfassung" title="Küchenmontage in Wilhelmshaven">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt übernimmt Küchenmontage in Wilhelmshaven
            und Umgebung. Dazu gehören Aufbau nach Umzug, Restmontage,
            Küchenmodule, Arbeitsplatten sowie Spüle und Armatur an vorhandenen
            Anschlüssen.
          </QuickAnswer>
          <FactBox />
        </div>
      </Section>

      <PreisrechnerCTA variant="kuechenmontage" />

      <Section eyebrow="Leistungsumfang" title="Was wir bei der Küchenmontage übernehmen" bordered>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scope.map((s) => (
            <article key={s.t} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Voraussetzungen" title="Was wir nicht übernehmen" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Keine Elektroinstallation (kein Herdanschluss, kein Starkstrom)</Bullet>
          <Bullet>Keine neuen Sanitäranlagen oder Leitungsverlegungen</Bullet>
          <Bullet>Keine Fliesen- oder Wandarbeiten an tragenden Wänden</Bullet>
          <Bullet>Spezialgeräte gemäß Herstellervorgabe nur in Abstimmung</Bullet>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Für Elektro- und Sanitärarbeiten stimmen wir uns auf Wunsch mit Fachbetrieben ab.
        </p>
      </Section>

      <Section eyebrow="Preisfaktoren" title="Was den Preis beeinflusst">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <Bullet>Küchenlänge & Anzahl Schränke</Bullet>
          <Bullet>Komplette Montage oder Restmontage</Bullet>
          <Bullet>Arbeitsplatte: Material, Zuschnitt, Verbindungen</Bullet>
          <Bullet>Spüle, Armatur, Geräteanschlüsse</Bullet>
          <Bullet>Hängeschränke und Lichtleisten</Bullet>
          <Bullet>Anfahrt und Region</Bullet>
        </ul>
        <div className="mt-8">
          <Link to="/preise" className="inline-flex items-center text-sm text-accent hover:underline">
            Zum Preisrechner <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Häufige Fragen zur Küchenmontage" bordered>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`k-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section eyebrow="Referenzen" title="Küchen-Projekte aus der Region">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => ["Küchenmontage", "Küchenfolierung"].includes(p.category) || p.slug === "silikonfuge-wilhelmshaven")
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

      <Section eyebrow="Grenzen & nächste Schritte" title="Klare Grenzen, klare Wege" bordered>
        <div className="grid gap-6 lg:grid-cols-2">
          <LimitsBox
            title="Was wir bei der Küchenmontage nicht übernehmen"
            items={[
              "Keine Elektroinstallation.",
              "Kein Starkstromanschluss.",
              "Keine neuen Sanitärleitungen.",
              "Spüle und Armatur nur an vorhandenen Anschlüssen und im Zusammenhang mit Küchenmontage.",
            ]}
            note="Für Elektro- und Sanitärarbeiten stimmen wir uns auf Wunsch mit Fachbetrieben ab."
          />
          <InternalLinks
            links={[
              { to: "/preise", label: "Kosten für Küchenmontage einschätzen" },
              { to: "/referenzen", label: "Referenzen ansehen" },
              { to: "/kontakt", label: "Küchenmontage mit Fotos anfragen" },
              { to: "/faq", label: "Antworten auf häufige Fragen" },
            ]}
          />
        </div>
      </Section>




      <PreisrechnerCTA variant="kuechenmontage" />

      <Section eyebrow="Netzwerk" title="Ihr Projekt umfasst mehr als die Küche?" bordered>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Über unser Partnernetzwerk koordinieren wir weitere Gewerke – vom
          neuen Boden bis zu Arbeiten durch geprüfte Fachbetriebe. Sie behalten
          einen Ansprechpartner für das gesamte Projekt.
        </p>
        <div className="mt-6">
          <Link to="/partner" className="inline-flex items-center text-sm font-medium text-accent hover:underline">
            Mehr zum Netzwerk <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBlock
        title="Küchenprojekt anfragen"
        text="Senden Sie Fotos der Küche und Anschlüsse – wir geben eine realistische Einschätzung."
      />
    </>
  );
}
