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
      { property: "og:url", content: "/handwerkerservice-wangerland" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-wangerland" }],
  }),
});
