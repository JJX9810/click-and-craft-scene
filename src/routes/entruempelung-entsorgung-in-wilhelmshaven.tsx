import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import {
  breadcrumbNode, jsonLdScript, serviceNode, webPageNode, SERVICE_IDS,
} from "@/lib/schema";
import { QuickAnswer, FactBox, LimitsBox, InternalLinks } from "@/components/site/InfoBlocks";
import { PreisrechnerCTA } from "@/components/site/PreisrechnerCTA";

const EN_URL = "https://verlegt-verschraubt.de/entruempelung-entsorgung-in-wilhelmshaven";

export const Route = createFileRoute("/entruempelung-entsorgung-in-wilhelmshaven")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Entrümpelung & Haushaltsauflösung in Wilhelmshaven" },
      { name: "description", content: "Entrümpelung und Haushaltsauflösung in Wilhelmshaven: Wohnung, Keller, Dachboden – planbar, diskret und besenrein. Fotos senden, ehrliche Einschätzung erhalten." },
      { property: "og:title", content: "Entrümpelung & Haushaltsauflösung Wilhelmshaven" },
      { property: "og:description", content: "Wohnungs-, Keller- und Dachbodenräumung, Möbel- und Sperrmüllentsorgung sowie komplette Haushaltsauflösung in Wilhelmshaven & Umgebung." },
      { property: "og:url", content: EN_URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Entrümpelung und Haushaltsauflösung in Wilhelmshaven und Umgebung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Entrümpelung & Haushaltsauflösung Wilhelmshaven" },
      { name: "twitter:description", content: "Wohnungs-, Keller- und Dachbodenräumung, Möbel- und Sperrmüllentsorgung sowie komplette Haushaltsauflösung in Wilhelmshaven & Umgebung." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { name: "twitter:image:alt", content: "Entrümpelung und Haushaltsauflösung in Wilhelmshaven und Umgebung" },
    ],
    links: [{ rel: "canonical", href: EN_URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: EN_URL,
          name: "Entrümpelung & Haushaltsauflösung in Wilhelmshaven",
          description: "Wohnungen, Keller, Dachböden und ganze Häuser räumen wir zuverlässig und besenrein – von der Kellerentrümpelung bis zur kompletten Haushaltsauflösung inklusive fachgerechter Entsorgung von Möbeln und Sperrmüll.",
          about: { "@id": SERVICE_IDS.entruempelung },
        }),
        serviceNode({
          url: EN_URL,
          id: SERVICE_IDS.entruempelung,
          name: "Entrümpelung & Haushaltsauflösung",
          description: "Wohnungs-, Keller- und Dachbodenentrümpelung, Möbel- und Sperrmüllentsorgung sowie komplette Haushaltsauflösung und Räumung vor Renovierung in Wilhelmshaven und Umgebung. Preis nach Besichtigung.",
          serviceType: ["Entrümpelung und Entsorgung", "Haushaltsauflösung", "Wohnungsauflösung"],
          areaServed: [
            "Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Wittmund", "Friesland",
          ],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "Entrümpelung & Haushaltsauflösung", url: EN_URL },
        ]),
      ]),
    ],
  }),
});

const types = [
  { t: "Haushaltsauflösung & Wohnungsauflösung", d: "Komplette Auflösung von Haushalten – etwa nach Umzug, Auszug oder im Nachlassfall. Diskret, planbar, mit besenreiner Übergabe." },
  { t: "Wohnungsentrümpelung", d: "Komplette oder teilweise Räumung – planbar und diskret." },
  { t: "Kellerentrümpelung", d: "Aufgeräumte Übergabe inklusive enger Zugänge und Treppen." },
  { t: "Dachbodenentrümpelung", d: "Sicheres Abtragen und Trennen, auch bei viel Material." },
  { t: "Möbel entsorgen", d: "Demontage, Abtransport und fachgerechte Entsorgung." },
  { t: "Sperrmüll entsorgen", d: "Schnelle Räumung von Sperrmüll inklusive Abtransport." },
  { t: "Räumung vor Renovierung", d: "Räume frei machen, damit andere Gewerke arbeiten können." },
];

const faqs = [
  { q: "Übernehmt ihr auch komplette Haushaltsauflösungen?", a: "Ja. Wir lösen Haushalte und Wohnungen in Wilhelmshaven und Umgebung vollständig auf – planbar, diskret und mit besenreiner Übergabe. Sie entscheiden vorab, was behalten, verschenkt oder entsorgt werden soll." },
  { q: "Übernehmt ihr Entrümpelung in Sande oder Schortens?", a: "Ja. Wir arbeiten in Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland und Wittmund. Andere Orte gerne auf Anfrage." },
  { q: "Wie wird der Aufwand eingeschätzt?", a: "Mit Fotos der Räume und kurzer Beschreibung von Volumen, Etage, Aufzug und Zufahrt können wir den Aufwand gut einschätzen." },
  { q: "Was passiert mit Gefahrstoffen?", a: "Gefahrstoffe wie Asbest, Chemikalien oder Öle dürfen nicht regulär entsorgt werden. Wir prüfen vorab und stimmen den richtigen Weg ab." },
  { q: "Kann ich brauchbare Sachen behalten?", a: "Ja. Sie entscheiden, was bleibt, was eingelagert wird und was entsorgt werden soll." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title="Entrümpelung, Haushaltsauflösung & Entsorgung in Wilhelmshaven"
        intro="Wohnungen, Keller, Dachböden und ganze Haushalte räumen wir zuverlässig und besenrein – von der einzelnen Kellerentrümpelung bis zur kompletten Haushaltsauflösung, inklusive fachgerechter Entsorgung von Möbeln und Sperrmüll."
        breadcrumbs={[{ label: "Leistungen" }, { label: "Entrümpelung & Haushaltsauflösung" }]}
      />

      <Section eyebrow="Kurzfassung" title="Entrümpelung in Wilhelmshaven">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt übernimmt Entrümpelung, Haushaltsauflösung
            und Entsorgung in Wilhelmshaven, Schortens, Sande, Jever, Varel,
            Wangerland und Wittmund. Wohnungen, Häuser, Keller und Dachböden
            werden planbar, diskret und auf Wunsch besenrein geräumt – inklusive
            fachgerechter Entsorgung. Anfrage per WhatsApp mit Fotos, Angebot
            nach Besichtigung vor Ort.
          </QuickAnswer>
          <FactBox />
        </div>
      </Section>

      <PreisrechnerCTA variant="entruempelung" />

      <Section eyebrow="Leistungen" title="Was wir räumen und entsorgen" bordered>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {types.map((s) => (
            <article key={s.t} className="rounded-2xl border border-border/70 bg-card/50 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Haushaltsauflösung" title="Haushaltsauflösung in Wilhelmshaven" bordered>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Eine Haushaltsauflösung steht oft in besonderen Lebenssituationen an –
          nach einem Umzug, einem Auszug ins Pflegeheim oder im Nachlassfall.
          Verlegt &amp; Verschraubt räumt Wohnungen und Häuser in Wilhelmshaven
          und Umgebung vollständig, trennt Verwertbares von Entsorgung nach
          Absprache mit den Angehörigen bzw. Auftraggebern und übergibt
          besenrein – auf Wunsch termingerecht zur Wohnungsübergabe an den
          Vermieter. Auch eine reine Wohnungsauflösung ohne Nachlass läuft
          nach demselben ruhigen Ablauf: Sie sagen, was bleibt und was gehen
          darf, wir kümmern uns um Transport und fachgerechte Entsorgung.
        </p>
      </Section>


      <Section eyebrow="Sonderfälle" title="Was vorab geprüft werden muss" bordered>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <Bullet>Gefahrstoffe (Asbest, Chemikalien, Altöl)</Bullet>
          <Bullet>Brand- oder Wasserschäden</Bullet>
          <Bullet>Schimmel & Hygienesonderfälle</Bullet>
          <Bullet>Schwere Tresore, Klaviere, Sondergüter</Bullet>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Solche Fälle besprechen wir vorab – bei Bedarf binden wir Fachbetriebe ein.
        </p>
      </Section>

      <Section eyebrow="Preisfaktoren" title="Was den Preis beeinflusst">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
          <Bullet>Raumart und Volumen</Bullet>
          <Bullet>Etage und Aufzug</Bullet>
          <Bullet>Parkmöglichkeit und Zufahrt</Bullet>
          <Bullet>Trennung und Entsorgungsmenge</Bullet>
          <Bullet>Sonderfälle (siehe oben)</Bullet>
          <Bullet>Termin-Dringlichkeit</Bullet>
        </ul>
        <div className="mt-8">
          <Link to="/preise" className="inline-flex items-center text-sm text-accent hover:underline">
            Zum Preisrechner <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Häufige Fragen zur Entrümpelung" bordered>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`e-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section eyebrow="Grenzen & nächste Schritte" title="Was vorab geklärt sein muss">
        <div className="grid gap-6 lg:grid-cols-2">
          <LimitsBox
            title="Sonderfälle und Grenzen"
            items={[
              "Gefahrstoffe wie Asbest, Chemikalien oder Altöl müssen vorab geprüft werden.",
              "Bei Sonderfällen (Brand- oder Wasserschäden, Schimmel) benötigen wir eine Einschätzung.",
              "Keine gefährlichen Entsorgungen ohne fachliche Prüfung – wir binden bei Bedarf Fachbetriebe ein.",
            ]}
          />
          <InternalLinks
            links={[
              { to: "/preise", label: "Kosten für Entrümpelung einschätzen" },
              { to: "/referenzen", label: "Referenzen ansehen" },
              { to: "/kontakt", label: "Räumung mit Fotos anfragen" },
              { to: "/faq", label: "Antworten auf häufige Fragen" },
            ]}
          />
        </div>
      </Section>



      <PreisrechnerCTA variant="entruempelung" />

      <Section eyebrow="Netzwerk" title="Nach der Räumung soll renoviert werden?" bordered>
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          Über unser Partnernetzwerk koordinieren wir die nächsten Schritte –
          vom neuen Boden bis zur Küchenmontage, bei Bedarf mit geprüften
          Fachbetrieben. Sie behalten einen Ansprechpartner für das gesamte
          Projekt.
        </p>
        <div className="mt-6">
          <Link to="/partner" className="inline-flex items-center text-sm font-medium text-accent hover:underline">
            Mehr zum Netzwerk <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBlock
        title="Entrümpelung in Wilhelmshaven anfragen"
        text="Schicken Sie Fotos der Räume und ein paar Eckdaten – wir geben eine ehrliche Einschätzung."
      />
    </>
  );
}
