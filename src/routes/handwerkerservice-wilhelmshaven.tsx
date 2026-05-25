import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
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
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Wilhelmshaven" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Wilhelmshaven – ehrliches Handwerk." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" }],
    scripts: [
      jsonLdScript([
        webPageNode({ url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven", name: 'Handwerkerservice in Wilhelmshaven', description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven – Verlegt & Verschraubt aus Wilhelmshaven.' }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven",
          name: 'Handwerkerservice in Wilhelmshaven',
          description: 'Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven und Umgebung. Lokal, sauber und planbar.',
          serviceType: "Handwerkerservice",
          areaServed: ["Wilhelmshaven", "Schortens", "Sande", "Jever", "Varel", "Wangerland", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: 'Handwerkerservice in Wilhelmshaven', url: "https://verlegt-verschraubt.de/handwerkerservice-wilhelmshaven" },
        ]),
      ]),
    ],
  }),
});
