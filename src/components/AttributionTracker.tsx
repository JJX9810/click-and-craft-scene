import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { captureAttribution } from "@/lib/attribution";

/**
 * Erfasst bei jedem Routenwechsel UTM-Parameter und Referrer. Speichert
 * first_touch / last_touch im localStorage (siehe lib/attribution.ts).
 * Rendert nichts.
 */
export function AttributionTracker() {
  const location = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    captureAttribution();
  }, [location]);

  return null;
}
