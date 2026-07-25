import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, Bullet, CtaBlock } from "@/components/site/PageShell";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  breadcrumbNode, faqPageNode, jsonLdScript, serviceNode, webPageNode, SERVICE_IDS,
} from "@/lib/schema";
import { QuickAnswer, FactBox, LimitsBox, InternalLinks } from "@/components/site/InfoBlocks";

const UM_URL = "https://verlegt-verschraubt.de/umzuege-wilhelmshaven";

export const Route = createFileRoute("/umzuege-wilhelmshaven")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Umzüge Wilhelmshaven – Umzug, Küche & Boden aus einer Hand" },
      { name: "description", content: "Umzugsservice in Wilhelmshaven: Möbel ab- und aufbauen, Transport, Küchen-Demontage und -Montage, auf Wunsch neuer Boden vor dem Einzug. Kostenlose Besichtigung, verbindlicher Festpreis." },
      { property: "og:title", content: "Umzüge Wilhelmshaven – Umzug, Küche & Boden aus einer Hand" },
      { property: "og:description", content: "Umzug mit Handwerk kombiniert: Möbelmontage, Küchenumzug, Bodenverlegung vor dem Einzug und besenreine Übergabe der alten Wohnung – ein Ansprechpartner statt vieler Firmen." },
      { property: "og:url", content: UM_URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Umzüge und Umzugsservice in Wilhelmshaven und Umgebung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Umzüge Wilhelmshaven – Umzug, Küche & Boden aus einer Hand" },
      { name: "twitter:description", content: "Umzug mit Handwerk kombiniert: Möbelmontage, Küchenumzug, Bodenverlegung vor dem Einzug und besenreine Übergabe der alten Wohnung – ein Ansprechpartner statt vieler Firmen." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { name: "twitter:image:alt", content: "Umzüge und Umzugsservice in Wilhelmshaven und Umgebung" },
    ],
    links: [{ rel: "canonical", href: UM_URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: UM_URL,
          name: "Umzüge & Umzugsservice in Wilhelmshaven",
          description: "Umzüge in Wilhelmshaven und Umgebung: Möbel demontieren, transportieren und wieder aufbauen – auf Wunsch kombiniert mit Küchen-Demontage und -Montage, neuem Boden vor dem Einzug und besenreiner Übergabe der alten Wohnung.",
          about: { "@id": SERVICE_IDS.umzug },
        }),
        serviceNode({
          url: UM_URL,
          id: SERVICE_IDS.umzug,
          name: "Umzüge & Umzugsservice",
          description: "Umzüge in Wilhelmshaven und Umgebung: Möbel-Demontage, Transport und Wiederaufbau, Küchen-Demontage und -Montage beim Umzug, auf Wunsch Bodenverlegung in der neuen Wohnung vor dem Einzug sowie Entrümpelung und besenreine Übergabe der alten Wohnung. Kostenlose, unverbindliche Vor-Ort-Besichtigung, danach verbindliches Festpreis-Angebot.",
          serviceType: ["Umzüge", "Umzugsservice", "Möbeltransport und Möbelmontage"],
          areaServed: [
            "Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Wittmund", "Friesland",
          ],
        }),
        faqPageNode(faqs),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "Umzüge & Umzugsservice", url: UM_URL },
        ]),
      ]),
    ],
  }),
});

const leistungen = [
  { t: "Wohnungsumzug", d: "Möbel demontieren, sicher transportieren und am Zielort wieder aufbauen – planbar zum Wunschtermin." },
  { t: "Küchenumzug", d: "Unsere Spezialität: Küche fachgerecht demontieren, transportieren und in der neuen Wohnung wieder montieren – inklusive Anpassung von Arbeitsplatte und Zeilen, wenn der neue Grundriss es verlangt." },
  { t: "Möbelmontage", d: "Schränke, Betten und Regale ab- und aufbauen – auch einzelne Möbeltransporte." },
  { t: "Neuer Boden vor dem Einzug", d: "Der beste Zeitpunkt für neuen Boden ist die leere Wohnung: Wir verlegen Laminat oder Vinyl, bevor die Möbel kommen." },
  { t: "Alte Wohnung besenrein", d: "Entrümpelung von allem, was nicht mitkommt, und besenreine Übergabe an Vermieter oder Nachmieter." },
  { t: "Malerarbeiten über Partner", d: "Wände in der alten oder neuen Wohnung streicht unser Partnerbetrieb Maler Manufaktur Wand & Wirkung – ein Termin, ein Ansprechpartner." },
];

const faqs = [
  { q: "Übernehmt ihr komplette Umzüge oder nur Teilleistungen?", a: "Beides. Vom kompletten Wohnungsumzug mit Demontage, Transport und Aufbau bis zu Teilleistungen wie reiner Möbelmontage oder einem einzelnen Küchenumzug – Sie entscheiden, was wir übernehmen." },
  { q: "Was unterscheidet euch von einem klassischen Umzugsunternehmen?", a: "Wir sind Handwerker: Küchen-Demontage und -Montage inklusive Anpassungen, neuer Boden vor dem Einzug und besenreine Übergabe der alten Wohnung kommen bei uns aus einer Hand – dafür bräuchte es sonst drei verschiedene Firmen." },
  { q: "Macht ihr auch Umzüge außerhalb von Wilhelmshaven?", a: "Ja. Wir arbeiten in Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland und Wittmund – und über unseren Gründungspartner JS Küchenduo in Gladbeck auch bei Umzügen Richtung Ruhrgebiet und Rheinland. Andere Strecken gerne auf Anfrage." },
  { q: "Wie kommt der Preis zustande?", a: "Nach einer kostenlosen, unverbindlichen Besichtigung – oder bei kleineren Umzügen nach Fotos und Eckdaten (Zimmer, Etagen, Aufzug, Strecke) – erhalten Sie ein schriftliches, verbindliches Festpreis-Angebot." },
  { q: "Kann die Küche in der neuen Wohnung angepasst werden?", a: "Ja, das ist unsere Stärke: Arbeitsplatten kürzen, Zeilen umstellen, Geräte umsetzen – die Küche wird an den neuen Grundriss angepasst statt notdürftig hingestellt." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title="Umzüge & Umzugsservice in Wilhelmshaven"
        intro="Umzug mit Handwerk kombiniert: Wir demontieren, transportieren und montieren Ihre Möbel – und übernehmen auf Wunsch gleich mit, was klassische Umzugsfirmen nicht können: Küche fachgerecht umziehen und anpassen, neuen Boden vor dem Einzug verlegen und die alte Wohnung besenrein übergeben."
        breadcrumbs={[{ label: "Leistungen" }, { label: "Umzüge & Umzugsservice" }]}
      />

      <Section eyebrow="Kurzfassung" title="Umzüge in Wilhelmshaven">
        <div className="grid gap-6 lg:grid-cols-2">
          <QuickAnswer>
            Verlegt &amp; Verschraubt übernimmt Umzüge in Wilhelmshaven,
            Schortens, Sande, Jever, Varel, Wangerland und Wittmund – von der
            Möbel-Demontage über den Transport bis zum Wiederaufbau. Der
            Unterschied zum klassischen Umzugsunternehmen: Küchen-Demontage
            und -Montage inklusive Anpassung, neuer Boden in der leeren
            Wohnung vor dem Einzug und besenreine Übergabe der alten Wohnung
            kommen aus einer Hand. Anfrage per WhatsApp mit Eckdaten –
            verbindliches Festpreis-Angebot nach kostenloser, unverbindlicher
            Besichtigung.
          </QuickAnswer>
          <FactBox />
        </div>
      </Section>

      <Section eyebrow="Leistungen" title="Was wir beim Umzug übernehmen" bordered>
        <div className="grid gap-4 sm:grid-cols-2">
          {leistungen.map((l) => (
            <Bullet key={l.t} title={l.t}>{l.d}</Bullet>
          ))}
        </div>
      </Section>

      <Section eyebrow="Der Unterschied" title="Umzug und Handwerk aus einer Hand" bordered>
        <p className="leading-relaxed text-muted-foreground">
          Ein Umzug ist selten nur ein Transport. Die Küche passt nicht in den
          neuen Grundriss, der Boden in der neuen Wohnung sollte eigentlich
          vorher raus, und die alte Wohnung muss besenrein übergeben werden.
          Klassisch heißt das: Umzugsfirma, Küchenmonteur, Bodenleger und
          Entrümpler getrennt beauftragen und vier Termine koordinieren. Bei
          uns ist das ein Auftrag mit einem Terminplan – die leere Wohnung
          nutzen wir direkt für{" "}
          <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">neuen Boden</Link>,
          die Küche übernimmt unsere{" "}
          <Link to="/kuechenmontage-in-wilhelmshaven" className="font-medium text-accent hover:underline">Küchenmontage</Link>,
          und was nicht mitkommt, geht über unsere{" "}
          <Link to="/entruempelung-entsorgung-in-wilhelmshaven" className="font-medium text-accent hover:underline">Entrümpelung</Link>.
          Malerarbeiten koordinieren wir über unseren Partnerbetrieb{" "}
          <Link to="/partner" className="font-medium text-accent hover:underline">Maler Manufaktur Wand &amp; Wirkung</Link>.
        </p>
      </Section>

      <Section eyebrow="Preisfaktoren" title="Was den Preis beeinflusst">
        <div className="grid gap-4 sm:grid-cols-2">
          <Bullet title="Umfang und Volumen">Zimmerzahl, Möbelmenge und ob de- und remontiert werden soll.</Bullet>
          <Bullet title="Zugänge">Etagen, Aufzug, Trageweg und Parkmöglichkeit vor der Tür.</Bullet>
          <Bullet title="Strecke">Umzug innerhalb Wilhelmshavens oder in die Region – die Entfernung fließt in den Festpreis ein.</Bullet>
          <Bullet title="Zusatzleistungen">Küchenumzug mit Anpassung, neuer Boden vor dem Einzug oder besenreine Übergabe der alten Wohnung.</Bullet>
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Häufige Fragen zu Umzügen" bordered>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section eyebrow="Grenzen & nächste Schritte" title="Was vorab geklärt sein muss">
        <div className="grid gap-6 lg:grid-cols-2">
          <LimitsBox
            title="Grenzen und Sonderfälle"
            items={[
              "Klavier-, Tresor- und andere Schwerlasttransporte prüfen wir vorab einzeln – nicht jeder Spezialtransport ist ohne Weiteres machbar.",
              "Fernumzüge über die Region hinaus stimmen wir individuell ab.",
              "Eine Halteverbotszone vor der Tür muss bei der Stadt beantragt werden – wir sagen Ihnen, worauf zu achten ist.",
            ]}
          />
          <InternalLinks
            links={[
              { to: "/kueche-umzug-checkliste", label: "Ratgeber: Küche beim Umzug – die Checkliste" },
              { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Alte Wohnung entrümpeln & besenrein übergeben" },
              { to: "/bodenverlegung-wilhelmshaven", label: "Neuer Boden vor dem Einzug" },
              { to: "/kontakt", label: "Umzug mit Eckdaten anfragen" },
            ]}
          />
        </div>
      </Section>

      <CtaBlock
        title="Umzug in Wilhelmshaven anfragen"
        text="Schicken Sie uns Zimmerzahl, Etagen, Strecke und Wunschtermin – Sie erhalten eine ehrliche Einschätzung und nach kostenloser Besichtigung ein verbindliches Festpreis-Angebot."
      />
    </>
  );
}
