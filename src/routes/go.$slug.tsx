import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SHORTLINKS, SITE_BASE } from "@/lib/marketingLinks";

/**
 * Kurzlinks /go/<slug> → Weiterleitung auf /preise mit UTM-Parametern.
 * Liste der Slugs siehe src/lib/marketingLinks.ts.
 *
 * Server-Handler liefert 302 für Bots/Crawler/Direktaufrufe,
 * Client-Komponente fängt SPA-Navigation ab.
 */
export const Route = createFileRoute("/go/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const target = SHORTLINKS[params.slug] ?? "/preise";
        return new Response(null, {
          status: 302,
          headers: {
            Location: SITE_BASE + target,
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
  component: GoRedirect,
});

function GoRedirect() {
  const { slug } = Route.useParams();
  const target = SHORTLINKS[slug] ?? "/preise";
  if (typeof window !== "undefined") {
    window.location.replace(target);
    return null;
  }
  return <Navigate to="/preise" replace />;
}
