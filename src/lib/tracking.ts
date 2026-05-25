// Zentrale Tracking-Funktion. Mergt Attribution + Standardfelder.
// Sendet an window.dataLayer (GTM) und gtag, wenn vorhanden – sonst console.log.
// Es werden KEINE personenbezogenen Daten erfasst.

import { getAttributionFields } from "./attribution";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const attribution = getAttributionFields();
  const payload: Record<string, unknown> = {
    event: eventName,
    ...attribution,
    ...params,
    timestamp: new Date().toISOString(),
  };

  // GTM dataLayer
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push(payload);
    } catch {
      /* ignore */
    }
  }
  // GA4 / gtag
  if (typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, payload);
    } catch {
      /* ignore */
    }
  }

  // Fallback: console.log, damit man im DevTools sieht was getrackt würde
  if (typeof console !== "undefined") {
    // eslint-disable-next-line no-console
    console.debug("[track]", eventName, payload);
  }
}
