import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-sande")({
  component: () => <OrtsSeite ort="Sande" umgebung={["Wilhelmshaven", "Schortens", "Jever", "Varel"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Sande – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Sande – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:title", content: "Handwerkerservice in Sande" },
      { property: "og:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Sande – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-sande" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Handwerkerservice in Sande für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Sande" },
      { name: "twitter:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Sande – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { name: "twitter:image:alt", content: "Handwerkerservice in Sande für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-sande" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-sande", name: 'Handwerkerservice in Sande', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Sande – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-sande",
          name: 'Handwerkerservice in Sande',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Sande und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Sande", "Wilhelmshaven", "Schortens", "Jever", "Varel", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Sande', url: "https://verlegt-verschraubt.de/handwerkerservice-sande" },
        ]),
      ]),
    ],
  }),
});
