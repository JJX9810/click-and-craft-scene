import { breadcrumbNode, faqPageNode, jsonLdScript, ortFaqItems, serviceNode, webPageNode } from "@/lib/schema";
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
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Schortens – sauber und zuverlässig aus Wilhelmshaven." },
      { property: "og:title", content: "Handwerkerservice in Schortens" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Schortens." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/handwerkerservice-schortens" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Schortens" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Schortens." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/handwerkerservice-schortens" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://www.verlegt-verschraubt.de/handwerkerservice-schortens", name: 'Handwerkerservice in Schortens', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Schortens – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://www.verlegt-verschraubt.de/handwerkerservice-schortens",
          name: 'Handwerkerservice in Schortens',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Schortens und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Schortens", "Wilhelmshaven", "Sande", "Jever", "Wangerland", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Schortens', url: "https://www.verlegt-verschraubt.de/handwerkerservice-schortens" },
        ]),
        faqPageNode(ortFaqItems("Schortens")),
      ]),
    ],
  }),
});
