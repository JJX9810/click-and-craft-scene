import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/tracking";

/**
 * Erfasst bei jedem Routenwechsel UTM-Parameter und Referrer. Speichert
 * first_touch / last_touch im localStorage (siehe lib/attribution.ts).
 * Trackt zusätzlich global Klicks auf Telefon- und WhatsApp-Links.
 */
export function AttributionTracker() {
  const location = useRouterState({ select: (s) => s.location.href });

  useEffect(() => {
    captureAttribution();
  }, [location]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_click", {
          current_page: window.location.pathname,
          href,
        });
      } else if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href)) {
        // Preisrechner-eigene Klicks tracken sich selbst zusätzlich – hier global
        if (anchor.dataset.trackScope !== "preisrechner") {
          trackEvent("whatsapp_click_global", {
            current_page: window.location.pathname,
          });
        }
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
