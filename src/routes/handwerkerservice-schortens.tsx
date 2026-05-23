import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-schortens")({
  component: () => <OrtsSeite ort="Schortens" umgebung={["Wilhelmshaven", "Sande", "Jever", "Wangerland"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Schortens – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Schortens – sauber und zuverlässig aus Wilhelmshaven." },
      { property: "og:title", content: "Handwerkerservice in Schortens" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Schortens." },
      { property: "og:url", content: "/handwerkerservice-schortens" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-schortens" }],
  }),
});
