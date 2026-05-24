import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wilhelmshaven")({
  component: () => (
    <OrtsSeite
      ort="Wilhelmshaven"
      umgebung={["Schortens", "Sande", "Jever", "Varel", "Wangerland"]}
      projectSlugs={[
        "bodenverlegung-coldewei-wilhelmshaven",
        "bodenverlegung-wohnbereich-wilhelmshaven",
        "treppenbelag-wilhelmshaven",
        "vinylboden-uebergang-wilhelmshaven",
        "kueche-holzarbeitsplatte-wilhelmshaven",
        "vinylboden-wohnraum-wilhelmshaven",
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Wilhelmshaven – Boden, Küche, Entrümpelung" },
      { name: "description", content: "Handwerkerservice in Wilhelmshaven: Bodenverlegung, Küchenmontage und Entrümpelung. Lokal, sauber und planbar." },
      { property: "og:title", content: "Handwerkerservice in Wilhelmshaven" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Wilhelmshaven – ehrliches Handwerk." },
      { property: "og:url", content: "/handwerkerservice-wilhelmshaven" },
    ],
    links: [{ rel: "canonical", href: "/handwerkerservice-wilhelmshaven" }],
  }),
});
