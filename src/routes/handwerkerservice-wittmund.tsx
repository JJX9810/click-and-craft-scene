import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wittmund")({
  component: () => (
    <OrtsSeite
      ort="Wittmund"
      umgebung={["Jever", "Wangerland", "Wilhelmshaven", "Schortens"]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Wittmund | Verlegt & Verschraubt" },
      {
        name: "description",
        content:
          "Bodenverlegung, Küchenmontage und Entrümpelung in Wittmund und Umgebung. Verlegt & Verschraubt aus Wilhelmshaven unterstützt sauber und zuverlässig.",
      },
      { property: "og:title", content: "Handwerkerservice in Wittmund" },
      { property: "og:description", content: "Boden, Küche, Entrümpelung in Wittmund – aus Wilhelmshaven." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-wittmund" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { property: "og:image:alt", content: "Handwerkerservice in Wittmund für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Wittmund" },
      { name: "twitter:description", content: "Boden, Küche, Entrümpelung in Wittmund – aus Wilhelmshaven." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/hero-flooring.png" },
      { name: "twitter:image:alt", content: "Handwerkerservice in Wittmund für Bodenverlegung, Küchenmontage und Entrümpelung" },
    ],
    links: [{ rel: "canonical", href: "https://verlegt-verschraubt.de/handwerkerservice-wittmund" }],
    scripts: [
      jsonLdScript([
        webPageNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-wittmund",
          name: "Handwerkerservice in Wittmund",
          description:
            "Bodenverlegung, Küchenmontage und Entrümpelung in Wittmund – Verlegt & Verschraubt aus Wilhelmshaven.",
        }),
        serviceNode({
          url: "https://verlegt-verschraubt.de/handwerkerservice-wittmund",
          name: "Handwerkerservice in Wittmund",
          description:
            "Bodenverlegung, Küchenmontage und Entrümpelung in Wittmund und Umgebung. Lokal, sauber und planbar.",
          serviceType: "Handwerkerservice",
          areaServed: ["Wittmund", "Jever", "Wangerland", "Wilhelmshaven", "Schortens", "Umgebung"],
        }),
        breadcrumbNode([
          { name: "Startseite", url: "https://verlegt-verschraubt.de/" },
          { name: "Handwerkerservice in Wittmund", url: "https://verlegt-verschraubt.de/handwerkerservice-wittmund" },
        ]),
      ]),
    ],
  }),
});
