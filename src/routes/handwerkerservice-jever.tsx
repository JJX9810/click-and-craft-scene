import { breadcrumbNode, faqPageNode, jsonLdScript, ortFaqItems, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-jever")({
  component: () => <OrtsSeite ort="Jever" umgebung={["Wilhelmshaven", "Schortens", "Sande", "Wangerland", "Wittmund"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Jever – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Jever – aus Wilhelmshaven mit kurzer Anfahrt." },
      { property: "og:title", content: "Handwerkerservice in Jever" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Jever." },
      { property: "og:url", content: "https://www.verlegt-verschraubt.de/handwerkerservice-jever" },
      { property: "og:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Jever" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Jever." },
      { name: "twitter:image", content: "https://www.verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.verlegt-verschraubt.de/handwerkerservice-jever" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://www.verlegt-verschraubt.de/handwerkerservice-jever", name: 'Handwerkerservice in Jever', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Jever – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://www.verlegt-verschraubt.de/handwerkerservice-jever",
          name: 'Handwerkerservice in Jever',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Jever und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Jever", "Wilhelmshaven", "Schortens", "Sande", "Wangerland", "Wittmund", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://www.verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Jever', url: "https://www.verlegt-verschraubt.de/handwerkerservice-jever" },
        ]),
        faqPageNode(ortFaqItems("Jever")),
      ]),
    ],
  }),
});
