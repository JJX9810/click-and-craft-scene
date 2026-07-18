import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Section, CtaBlock } from "@/components/site/PageShell";
import { QuickAnswer } from "@/components/site/InfoBlocks";
import { breadcrumbNode, jsonLdScript, webPageNode } from "@/lib/schema";

const URL = "https://verlegt-verschraubt.de/vinyl-oder-laminat";

const vergleich = [
  {
    frage: "Welcher Boden verträgt Feuchtigkeit besser?",
    antwort:
      "Vinyl. Klick-Vinyl und verklebtes Vinyl sind wasserabweisend und eignen sich für Küche, Flur und – als verklebte Variante – auch fürs Bad. Laminat hat einen Holzfaserkern, der bei stehender Nässe aufquellen kann; für Feuchträume ist es daher nur bedingt geeignet.",
  },
  {
    frage: "Welcher Boden fühlt sich wärmer und leiser an?",
    antwort:
      "Vinyl ist fußwärmer und deutlich leiser beim Gehen – gerade in Mietwohnungen und Obergeschossen ein spürbarer Vorteil. Laminat klingt härter; mit einer guten Trittschalldämmung lässt sich das aber deutlich verbessern.",
  },
  {
    frage: "Welcher Boden ist robuster im Alltag?",
    antwort:
      "Beide sind alltagstauglich. Laminat mit hoher Nutzungsklasse ist sehr kratzfest, etwa bei Stuhlrollen und Tierkrallen. Vinyl ist elastischer und verzeiht Stöße besser, dafür können schwere Möbel bei minderer Qualität Druckstellen hinterlassen.",
  },
  {
    frage: "Was ist bei niedriger Aufbauhöhe die bessere Wahl?",
    antwort:
      "Vinyl. Verklebtes Vinyl trägt nur wenige Millimeter auf – ideal bei Renovierungen, wenn Türen nicht gekürzt werden sollen oder eine Fußbodenheizung schnell reagieren soll. Laminat baut mit Dämmung meist 8 bis 12 Millimeter auf.",
  },
  {
    frage: "Was kostet das Verlegen im Vergleich?",
    antwort:
      "Bei uns kostet Laminat verlegen 16 €/m², Vinyl schwimmend 18 €/m² und Vinyl verklebt 22 €/m² (jeweils Arbeitslohn). Dazu kommen je nach Zustand Untergrundvorbereitung (Spachteln 19 €/m²), Sockelleisten (5 €/lfm) und die Entfernung des Altbelags (ab 4 €/m²). Das Material wählen Sie selbst – oder wir übernehmen die Beschaffung als Service.",
  },
  {
    frage: "Welcher Untergrund ist nötig?",
    antwort:
      "Beide Beläge brauchen einen ebenen, trockenen und tragfähigen Untergrund – Vinyl reagiert dabei empfindlicher auf Unebenheiten, weil es dünner ist und sich jede Kante abzeichnen kann. Deshalb prüfen wir vor jeder Verlegung den Untergrund und spachteln bei Bedarf.",
  },
];

export const Route = createFileRoute("/vinyl-oder-laminat")({
  component: RatgeberVinylLaminat,
  head: () => ({
    meta: [
      { title: "Vinyl oder Laminat? Ehrlicher Vergleich vom Bodenleger" },
      {
        name: "description",
        content:
          "Vinyl oder Laminat – was passt zu welchem Raum? Ehrlicher Vergleich vom Bodenleger aus Wilhelmshaven: Feuchtigkeit, Trittschall, Aufbauhöhe, Kosten (16–22 €/m² Arbeitslohn) und klare Empfehlungen je Raum.",
      },
      { property: "og:title", content: "Vinyl oder Laminat? Ehrlicher Vergleich vom Bodenleger" },
      {
        property: "og:description",
        content:
          "Feuchtigkeit, Trittschall, Aufbauhöhe, Kosten: der ehrliche Vergleich vom Bodenleger aus Wilhelmshaven – mit klaren Empfehlungen je Raum.",
      },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Vinyl oder Laminat – Vergleich vom Bodenleger aus Wilhelmshaven" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vinyl oder Laminat? Ehrlicher Vergleich vom Bodenleger" },
      {
        name: "twitter:description",
        content:
          "Feuchtigkeit, Trittschall, Aufbauhöhe, Kosten: der ehrliche Vergleich vom Bodenleger aus Wilhelmshaven.",
      },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: URL,
          name: "Vinyl oder Laminat? Ehrlicher Vergleich vom Bodenleger",
          description:
            "Vergleich von Vinyl und Laminat für Wohnräume: Feuchtigkeit, Trittschall, Aufbauhöhe, Haltbarkeit und Verlegekosten – mit Empfehlungen je Raum vom Bodenleger aus Wilhelmshaven.",
        }),
        breadcrumbNode([
          { name: "Start", url: "https://verlegt-verschraubt.de/" },
          { name: "Vinyl oder Laminat?", url: URL },
        ]),
      ]),
    ],
  }),
});

function RatgeberVinylLaminat() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Vinyl oder Laminat? Der ehrliche Vergleich vom Bodenleger."
        intro="Die häufigste Frage vor einer Bodenverlegung – und die Antwort hängt vom Raum ab, nicht vom Trend. Hier ist der Vergleich, den wir unseren Kunden in Wilhelmshaven und Umgebung auch persönlich geben: ohne Fachchinesisch, mit echten Preisen."
      />

      <Section eyebrow="Kurzfassung" title="Die Antwort in drei Sätzen">
        <QuickAnswer>
          Vinyl ist die bessere Wahl für Küche, Flur, Bad und überall dort, wo
          es leise, fußwarm und flach sein soll. Laminat punktet in Wohn- und
          Schlafräumen mit Kratzfestigkeit und dem günstigsten Verlegepreis
          (16 €/m² Arbeitslohn bei uns, Vinyl 18–22 €/m²). Entscheidend ist in
          beiden Fällen ein ebener Untergrund – den prüfen wir vor jeder
          Verlegung.
        </QuickAnswer>
      </Section>

      <Section eyebrow="Vergleich" title="Vinyl oder Laminat – die sechs entscheidenden Fragen" bordered>
        <div className="space-y-8">
          {vergleich.map((v, i) => (
            <div key={v.frage} className="border-t border-border/60 pt-6">
              <h3 className="font-display text-lg font-semibold">
                <span className="mr-3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                {v.frage}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{v.antwort}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Empfehlung" title="Welcher Boden für welchen Raum?">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
            <h3 className="font-display text-lg font-semibold text-accent">Vinyl empfehlen wir für:</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Küche und Flur (feuchtigkeitsunempfindlich, strapazierfähig), Bad
              (nur verklebt), Kinderzimmer und Schlafzimmer im Obergeschoss
              (leise, fußwarm) sowie Renovierungen mit wenig Aufbauhöhe – etwa
              wenn Türen nicht gekürzt werden sollen.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card/40 p-6">
            <h3 className="font-display text-lg font-semibold text-accent">Laminat empfehlen wir für:</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Wohnzimmer, Schlafzimmer, Arbeitszimmer und Flure ohne
              Nässerisiko – überall dort, wo Kratzfestigkeit zählt und das
              Budget im Blick bleiben soll. Mit guter Trittschalldämmung auch
              in der Etagenwohnung eine solide Wahl.
            </p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Unsicher, was zu Ihrem Raum passt? Schicken Sie uns Fotos und grobe
          Maße per WhatsApp – Sie bekommen eine ehrliche Empfehlung samt
          Kosteneinschätzung, meist noch am selben Werktag. Mehr zur Verlegung
          selbst finden Sie auf unserer Seite{" "}
          <Link to="/bodenverlegung-wilhelmshaven" className="font-medium text-accent hover:underline">
            Bodenleger &amp; Bodenverlegung in Wilhelmshaven
          </Link>
          , eine erste Kalkulation liefert der{" "}
          <Link to="/preise" className="font-medium text-accent hover:underline">
            Kostenrechner
          </Link>
          .
        </p>
      </Section>

      <CtaBlock
        title="Boden gefunden? Dann verlegen wir ihn."
        text="Fotos und Maße per WhatsApp schicken – ehrliche Einschätzung meist am selben Werktag."
      />
    </>
  );
}
