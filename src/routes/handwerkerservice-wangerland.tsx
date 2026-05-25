import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wangerland")({
  component: () => (
    <OrtsSeite
      ort="Wangerland"
      umgebung={["Hooksiel", "Wilhelmshaven", "Schortens", "Jever", "Varel"]}
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
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice im Wangerland" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung im Wangerland." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-wangerland" }],
  }),
});
