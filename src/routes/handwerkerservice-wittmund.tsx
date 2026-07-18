import { breadcrumbNode, jsonLdScript, serviceNode, webPageNode } from "@/lib/schema";
import { createFileRoute } from "@tanstack/react-router";
import { OrtsSeite } from "@/components/site/OrtsSeite";

export const Route = createFileRoute("/handwerkerservice-wittmund")({
  component: () => (
    <OrtsSeite
      ort="Wittmund"
      umgebung={["Jever", "Wangerland", "Wilhelmshaven", "Schortens"]}
      projekt={{
        src: "/projects/laminat-wittmund-01.webp",
        alt: "Frisch verlegtes Laminat in Eiche-Optik in einem hellen Altbauzimmer mit Bogenfenster in Wittmund",
        caption: "Laminat in Eiche-Optik, durchgehend über zwei Räume – Altbau in Wittmund.",
        slug: "laminatverlegung-wittmund",
      }}
    />
  ),
  head: () => ({
    meta: [
      { title: "Handwerkerservice Wittmund | Verlegt & Verschraubt" },
      {
        name: "description",
        content:
          "Bodenverlegung, Küchenmontage & Entrümpelung in Wittmund – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner.",
      },
      { property: "og:title", content: "Handwerkerservice in Wittmund" },
      { property: "og:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wittmund – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { property: "og:url", content: "https://verlegt-verschraubt.de/handwerkerservice-wittmund" },
      { property: "og:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
      { property: "og:image:alt", content: "Handwerkerservice in Wittmund für Bodenverlegung, Küchenmontage und Entrümpelung" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Handwerkerservice in Wittmund" },
      { name: "twitter:description", content: "Bodenverlegung, Küchenmontage & Entrümpelung in Wittmund – ehrliche Preise, Rückmeldung noch am selben Tag. Auf Wunsch Koordination weiterer Gewerke über geprüfte Partner." },
      { name: "twitter:image", content: "https://verlegt-verschraubt.de/og-image.jpg" },
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
