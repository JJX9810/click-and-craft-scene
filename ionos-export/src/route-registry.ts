/**
 * Zentrales Verzeichnis aller Routen, die im IONOS-Build prerendert werden.
 *
 * Quelle der Wahrheit für Inhalte sind die Route-Dateien in ../../src/routes/.
 * Hier wird nur der Pfad-Mapping-Layer aufgebaut sowie der Kontakt-Component
 * mit dem statischen IONOS-Override (mailto/WhatsApp/Tel) ersetzt.
 */
import type { RouteRecord } from "./tanstack-shim";

// Alle Page-Routen importieren – Reihenfolge egal, sie registrieren sich selbst
// im routeRegistry beim Importieren.
import { Route as IndexRoute } from "@/routes/index";
import { Route as BodenRoute } from "@/routes/bodenverlegung-wilhelmshaven";
import { Route as KuecheRoute } from "@/routes/kuechenmontage-in-wilhelmshaven";
import { Route as EntRoute } from "@/routes/entruempelung-entsorgung-in-wilhelmshaven";
import { Route as ShowroomIndexRoute } from "@/routes/showroom.index";
import { Route as ShowroomSlugRoute } from "@/routes/showroom.$slug";
import { Route as PreiseRoute } from "@/routes/preise";
import { Route as FaqRoute } from "@/routes/faq";
import { Route as KontaktRoute } from "@/routes/kontakt";
import { Route as ImpressumRoute } from "@/routes/impressum";
import { Route as DatenschutzRoute } from "@/routes/datenschutz";
import { Route as ReferenzenRoute } from "@/routes/referenzen";
import { Route as UeberUnsRoute } from "@/routes/ueber-uns";
import { Route as PartnerRoute } from "@/routes/partner";
import { Route as WirUnterstuetzenRoute } from "@/routes/wir-unterstuetzen";
import { Route as HwsWilhelmshavenRoute } from "@/routes/handwerkerservice-wilhelmshaven";
import { Route as HwsSchortensRoute } from "@/routes/handwerkerservice-schortens";
import { Route as HwsSandeRoute } from "@/routes/handwerkerservice-sande";
import { Route as HwsJeverRoute } from "@/routes/handwerkerservice-jever";
import { Route as HwsVarelRoute } from "@/routes/handwerkerservice-varel";
import { Route as HwsWangerlandRoute } from "@/routes/handwerkerservice-wangerland";
import { Route as HwsWittmundRoute } from "@/routes/handwerkerservice-wittmund";
import { Route as VinylOderLaminatRoute } from "@/routes/vinyl-oder-laminat";
import { Route as EntruempelungKostenRoute } from "@/routes/entruempelung-kosten";
import { Route as RatgeberRoute } from "@/routes/ratgeber";
import { Route as KuecheUmzugRoute } from "@/routes/kueche-umzug-checkliste";
import { Route as G0Route } from "@/routes/renovierung-reihenfolge";
import { Route as G1Route } from "@/routes/boden-selbst-verlegen";
import { Route as G2Route } from "@/routes/gebrauchte-kueche-kaufen";
import { Route as G3Route } from "@/routes/haushaltsaufloesung-nachlass";
import { Route as G4Route } from "@/routes/bodenverlegung-kosten";

// IONOS-Override: Kontaktformular ohne Backend (mailto/WhatsApp/Tel)
import { IonosKontakt } from "./IonosKontakt";

// Original-Component vom Kontakt-Route durch IONOS-Variante ersetzen
KontaktRoute.component = IonosKontakt;

import { projects } from "@/data/projects";

export const routes: RouteRecord[] = [
  IndexRoute,
  BodenRoute,
  KuecheRoute,
  EntRoute,
  ShowroomIndexRoute,
  ShowroomSlugRoute,
  PreiseRoute,
  FaqRoute,
  KontaktRoute,
  ImpressumRoute,
  DatenschutzRoute,
  ReferenzenRoute,
  UeberUnsRoute,
  PartnerRoute,
  WirUnterstuetzenRoute,
  HwsWilhelmshavenRoute,
  HwsSchortensRoute,
  HwsSandeRoute,
  HwsJeverRoute,
  HwsVarelRoute,
  HwsWangerlandRoute,
  HwsWittmundRoute,
  VinylOderLaminatRoute,
  EntruempelungKostenRoute,
  RatgeberRoute,
  KuecheUmzugRoute,
  G0Route,
  G1Route,
  G2Route,
  G3Route,
  G4Route,
];

/** Liste aller Pfade, die prerendert werden sollen (inkl. Showroom-Slugs). */
export function getPrerenderPaths(): string[] {
  const staticPaths = routes
    .map((r) => r.path)
    .filter((p) => !p.includes("$"))
    .map((p) => (p === "/showroom/" ? "/showroom" : p));
  const slugPaths = projects.map((p) => `/showroom/${p.slug}`);
  return Array.from(new Set([...staticPaths, ...slugPaths]));
}

/** Ermittelt den passenden Route-Record für eine konkrete URL. */
export function matchRoute(pathname: string): { route: RouteRecord; params: Record<string, string> } | null {
  // 1. exakter Pfad
  for (const r of routes) {
    if (r.path === pathname) return { route: r, params: {} };
  }
  // 2. /showroom → /showroom/
  if (pathname === "/showroom") {
    const r = routes.find((x) => x.path === "/showroom/");
    if (r) return { route: r, params: {} };
  }
  // 3. dynamische Routen ($slug)
  for (const r of routes) {
    if (!r.path.includes("$")) continue;
    const regex = new RegExp("^" + r.path.replace(/\$([A-Za-z0-9_]+)/g, "(?<$1>[^/]+)") + "$");
    const m = pathname.match(regex);
    if (m) return { route: r, params: m.groups ?? {} };
  }
  return null;
}
