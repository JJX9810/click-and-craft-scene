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
      { property: "og:url", content: "/handwerkerservice-varel" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-varel" }],
  }),
});
