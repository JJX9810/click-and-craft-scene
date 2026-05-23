import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-jever")({
  component: () => <OrtsSeite ort="Jever" umgebung={["Wilhelmshaven", "Schortens", "Sande", "Wangerland"]} />,
  head: () => ({
    meta: [
      { title: "Handwerkerservice Jever – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Bodenverlegung, Küchenmontage und Entrümpelung in Jever – aus Wilhelmshaven mit kurzer Anfahrt." },
      { property: "og:title", content: "Handwerkerservice in Jever" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Jever." },
      { property: "og:url", content: "/handwerkerservice-jever" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-jever" }],
  }),
});
