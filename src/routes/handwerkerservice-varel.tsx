import { breadcrumbNode, faqPageNode, jsonLdScript, ortFaqItems, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-varel")({
  component: () => <OrtsSeite ort="Varel" umgebung={["Wilhelmshaven", "Sande", "Jever", "Wangerland"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Varel – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Varel – sauber und planbar." },
      { property: "og:title", content: "Handwerkerservice in Varel" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Varel." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-varel" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Handwerkerservice in Varel für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Varel" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Varel." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Handwerkerservice in Varel für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-varel" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-varel", name: 'Handwerkerservice in Varel', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Varel – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-varel",
          name: 'Handwerkerservice in Varel',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Varel und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Varel", "Wilhelmshaven", "Sande", "Jever", "Wangerland", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Varel', url: "https://verlegt-verschraubt.de/handwerkerservice-varel" },
        ]),
        faqPageNode(ortFaqItems("Varel")),
      ]),
    ],
  }),
});
