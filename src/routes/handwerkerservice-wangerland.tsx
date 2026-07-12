import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wangerland")({
  component: () => (
    <OrtsSeite
      ort="Wangerland"
      umgebung={["Hooksiel", "Wilhelmshaven", "Schortens", "Jever", "Varel", "Wittmund"]}
      projectSlugs={["kuechenfolierung-hooksiel"]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Wangerland – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung im Wangerland – mit kurzer Anfahrt aus Wilhelmshaven." },
      { property: "og:title", content: "Handwerkerservice im Wangerland" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung im Wangerland." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-wangerland" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Handwerkerservice im Wangerland für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice im Wangerland" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung im Wangerland." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Handwerkerservice im Wangerland für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-wangerland" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-wangerland", name: 'Handwerkerservice im Wangerland', description: 'Bodenverlegung, Küchenmontage und Entrümpelung im Wangerland – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-wangerland",
          name: 'Handwerkerservice im Wangerland',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung im Wangerland und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Wangerland", "Hooksiel", "Wilhelmshaven", "Schortens", "Jever", "Varel", "Wittmund", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice im Wangerland', url: "https://verlegt-verschraubt.de/handwerkerservice-wangerland" },
        ]),
      ]),
    ],
  }),
});
