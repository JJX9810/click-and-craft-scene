import { breadcrumbNode, faqPageNode, jsonLdScript, ortFaqItems, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-sande")({
  component: () => <OrtsSeite ort="Sande" umgebung={["Wilhelmshaven", "Schortens", "Jever", "Varel"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Sande – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Sande – schnell aus Wilhelmshaven erreichbar." },
      { property: "og:title", content: "Handwerkerservice in Sande" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Sande." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/handwerkerservice-sande" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Sande" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Sande." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/handwerkerservice-sande" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://www.verlegt-verschraubt.de/handwerkerservice-sande", name: 'Handwerkerservice in Sande', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Sande – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://www.verlegt-verschraubt.de/handwerkerservice-sande",
          name: 'Handwerkerservice in Sande',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Sande und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Sande", "Wilhelmshaven", "Schortens", "Jever", "Varel", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Sande', url: "https://www.verlegt-verschraubt.de/handwerkerservice-sande" },
        ]),
        faqPageNode(ortFaqItems("Sande")),
      ]),
    ],
  }),
});
