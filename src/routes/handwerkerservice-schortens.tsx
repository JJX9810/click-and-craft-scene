import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-schortens")({
  component: () => (
    <OrtsSeite
      ort="Schortens"
      umgebung={["Wilhelmshaven", "Sande", "Jever", "Wangerland"]}
      projectSlugs={["kuechenmontage-schortens", "weisse-einbaukueche-schortens"]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Schortens – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Schortens – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:title", content: "Handwerkerservice in Schortens" },
      { property: "og:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Schortens – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-schortens" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Handwerkerservice in Schortens für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Schortens" },
      { name: "twitter:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Schortens – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Handwerkerservice in Schortens für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-schortens" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-schortens", name: 'Handwerkerservice in Schortens', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Schortens – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-schortens",
          name: 'Handwerkerservice in Schortens',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Schortens und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Schortens", "Wilhelmshaven", "Sande", "Jever", "Wangerland", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Schortens', url: "https://verlegt-verschraubt.de/handwerkerservice-schortens" },
        ]),
      ]),
    ],
  }),
});
