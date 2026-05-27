import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { projects } from "@/data/projects";

const BASE_URL = "https://www.verlegt-verschraubt.de";
const LAST_MOD = "2026-05-25";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/bodenverlegung-wilhelmshaven", changefreq: "monthly", priority: "0.9" },
          { path: "/kuechenmontage-in-wilhelmshaven", changefreq: "monthly", priority: "0.9" },
          { path: "/kuechenmontage-wilhelmshaven", changefreq: "monthly", priority: "1.0" },
          { path: "/entruempelung-entsorgung-in-wilhelmshaven", changefreq: "monthly", priority: "0.9" },
          { path: "/entruempelung-wilhelmshaven", changefreq: "monthly", priority: "1.0" },
          { path: "/handwerkerservice-wilhelmshaven", changefreq: "monthly", priority: "0.8" },
          { path: "/wilhelmshaven", changefreq: "monthly", priority: "1.0" },
          { path: "/handwerkerservice-jever", changefreq: "monthly", priority: "0.8" },
          { path: "/handwerkerservice-sande", changefreq: "monthly", priority: "0.8" },
          { path: "/handwerkerservice-schortens", changefreq: "monthly", priority: "0.8" },
          { path: "/handwerkerservice-varel", changefreq: "monthly", priority: "0.8" },
          { path: "/handwerkerservice-wangerland", changefreq: "monthly", priority: "0.8" },
          { path: "/handwerkerservice-wittmund", changefreq: "monthly", priority: "0.8" },
          { path: "/showroom", changefreq: "weekly", priority: "0.8" },
          { path: "/referenzen", changefreq: "monthly", priority: "0.7" },
          { path: "/preise", changefreq: "monthly", priority: "0.7" },
          { path: "/ueber-uns", changefreq: "yearly", priority: "0.6" },
          { path: "/partner", changefreq: "yearly", priority: "0.5" },
          { path: "/wir-unterstuetzen", changefreq: "yearly", priority: "0.5" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/kontakt", changefreq: "yearly", priority: "0.7" },
          { path: "/wunschtermin", changefreq: "monthly", priority: "0.7" },
          { path: "/impressum", changefreq: "yearly", priority: "0.4" },
          { path: "/datenschutz", changefreq: "yearly", priority: "0.4" },
        ];

        const projectEntries: SitemapEntry[] = projects.map((p) => ({
          path: `/showroom/${p.slug}`,
          changefreq: "monthly",
          priority: "0.6",
        }));

        const entries = [...staticPaths, ...projectEntries];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${LAST_MOD}</lastmod>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
