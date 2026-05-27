import { createFileRoute, Navigate } from "@tanstack/react-router";

const TARGET = "https://verlegt-verschraubt.de/kuechenmontage-in-wilhelmshaven";

export const Route = createFileRoute("/kuechenmontage-wilhelmshaven")({
  server: {
    handlers: {
      GET: async () =>
        new Response(null, {
          status: 301,
          headers: { Location: TARGET, "Cache-Control": "public, max-age=3600" },
        }),
    },
  },
  component: () => <Navigate to="/kuechenmontage-in-wilhelmshaven" replace />,
});
