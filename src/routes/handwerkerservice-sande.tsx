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
      { property: "og:url", content: "/handwerkerservice-sande" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-sande" }],
  }),
});
