import { createFileRoute, Navigate } from "@tanstack/react-router";

const TARGET = "https://www.verlegt-verschraubt.de/handwerkerservice-wilhelmshaven";

export const Route = createFileRoute("/wilhelmshaven")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: TARGET, "Cache-Control": "public, max-age=3600" },
        }),
    },
  },
  component: () => <Navigate to="/handwerkerservice-wilhelmshaven" replace />,
});
