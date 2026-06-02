import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { trackPageView, heartbeat } from "@/lib/admin-tracking";

/**
 * Globaler, unsichtbarer Tracker für Seitenaufrufe + aktive-Besucher-Heartbeat.
 * Speichert keine IP, keine personenbezogenen Daten – nur anonyme Session-ID.
 * Tracking auf /admin und /login wird unterdrückt.
 */
export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return;
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    void trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return;
    const interval = window.setInterval(() => {
      void heartbeat(pathname);
    }, 20000);
    return () => window.clearInterval(interval);
  }, [pathname]);

  return null;
}
