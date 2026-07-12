import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wilhelmshaven")({
  component: () => (
    <OrtsSeite
      ort="Wilhelmshaven"
      umgebung={["Schortens", "Sande", "Jever", "Varel", "Wangerland"]}
      projectSlugs={[
        "bodenverlegung-coldewei-wilhelmshaven",
        "bodenverlegung-wohnbereich-wilhelmshaven",
        "treppenbelag-wilhelmshaven",
        "vinylboden-uebergang-wilhelmshaven",
        "kueche-holzarbeitsplatte-wilhelmshaven",
        "vinylboden-wohnraum-wilhelmshaven",
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Wilhelmshaven – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:title", content: "Handwerkerservice in Wilhelmshaven" },
      { property: "og:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Handwerkerservice in Wilhelmshaven für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Wilhelmshaven" },
      { name: "twitter:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wilhelmshaven – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Handwerkerservice in Wilhelmshaven für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven", name: 'Handwerkerservice in Wilhelmshaven', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven",
          name: 'Handwerkerservice in Wilhelmshaven',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Wilhelmshaven', url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" },
        ]),
      ]),
    ],
  }),
});
