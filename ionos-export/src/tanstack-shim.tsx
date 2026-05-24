/**
 * Shim für @tanstack/react-router & @tanstack/react-start.
 *
 * Wird im IONOS-Build via Vite-Alias als Ersatz für die echten TanStack-Pakete
 * geladen, damit alle existierenden Route-Dateien aus ../../src/routes/ ohne
 * Änderung wiederverwendet werden können. Im Hauptprojekt (Lovable/Cloudflare)
 * bleibt das echte TanStack Start aktiv – dieser Shim wird dort nie geladen.
 *
 * Unterstützt nur die im Projekt tatsächlich genutzte API-Oberfläche.
 */
import * as React from "react";
import {
  Link as RRLink,
  Outlet as RROutlet,
  useLocation,
  useNavigate as useRRNavigate,
  useParams as useRRParams,
  useSearchParams,
} from "react-router-dom";

// ---------- Loader / Head Context ----------

type LoaderData = unknown;
const LoaderDataContext = React.createContext<LoaderData>(null);

export function LoaderDataProvider({ value, children }: { value: LoaderData; children: React.ReactNode }) {
  return <LoaderDataContext.Provider value={value}>{children}</LoaderDataContext.Provider>;
}

const RouteContextContext = React.createContext<any>({});
export function RouteContextProvider({ value, children }: { value: any; children: React.ReactNode }) {
  return <RouteContextContext.Provider value={value}>{children}</RouteContextContext.Provider>;
}

// ---------- Route registry ----------

export type RouteRecord = {
  path: string;
  component?: React.ComponentType<any>;
  head?: (args: { params: any; loaderData: any }) => any;
  loader?: (args: { params: any; context?: any }) => any;
  notFoundComponent?: React.ComponentType<any>;
  errorComponent?: React.ComponentType<any>;
  shellComponent?: React.ComponentType<any>;
  useLoaderData?: <T = any>() => T;
  useParams?: () => any;
  useSearch?: () => any;
  useRouteContext?: () => any;
  __isRoot?: boolean;
};

export const routeRegistry: RouteRecord[] = [];

// ---------- createFileRoute ----------

export function createFileRoute(path: string) {
  return (config: Omit<RouteRecord, "path">): RouteRecord => {
    const route: RouteRecord = {
      path,
      ...config,
      useLoaderData: <T,>() => React.useContext(LoaderDataContext) as T,
      useParams: () => useRRParams() as any,
      useSearch: () => Object.fromEntries(useSearchParams()[0].entries()),
      useRouteContext: () => React.useContext(RouteContextContext),
    };
    routeRegistry.push(route);
    return route;
  };
}

// ---------- createRootRoute (unused at runtime, but route file imports it) ----------

export function createRootRouteWithContext<_TContext = any>() {
  return (config: Omit<RouteRecord, "path">): RouteRecord => {
    const route: RouteRecord = {
      path: "__root__",
      ...config,
      __isRoot: true,
      useRouteContext: () => React.useContext(RouteContextContext),
    };
    return route;
  };
}

export const createRootRoute = createRootRouteWithContext;

// ---------- notFound ----------

export class NotFoundError extends Error {
  isNotFound = true;
  constructor() {
    super("notFound");
  }
}
export function notFound(): NotFoundError {
  return new NotFoundError();
}

// ---------- redirect (stub) ----------

export function redirect(opts: { to: string }): never {
  if (typeof window !== "undefined") window.location.href = opts.to;
  throw new Error(`redirect:${opts.to}`);
}

// ---------- Outlet ----------

export const Outlet = RROutlet;

// ---------- HeadContent / Scripts (no-ops; SSR uses Helmet directly) ----------

export function HeadContent() {
  return null;
}
export function Scripts() {
  return null;
}

// ---------- useRouter (stub – good enough for error component) ----------

export function useRouter() {
  const navigate = useRRNavigate();
  return {
    invalidate: () => {},
    navigate: (opts: any) => navigate(typeof opts === "string" ? opts : opts.to ?? "/"),
    history: { back: () => navigate(-1) },
  };
}

// ---------- Link ----------

type TanStackLinkProps = {
  to?: string;
  params?: Record<string, string | number>;
  search?: Record<string, any>;
  hash?: string;
  href?: string;
  className?: string;
  activeProps?: { className?: string };
  inactiveProps?: { className?: string };
  activeOptions?: { exact?: boolean };
  preload?: any;
  from?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export function Link({
  to,
  params,
  search,
  hash,
  href,
  className,
  activeProps,
  inactiveProps,
  activeOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preload,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  from,
  children,
  ...rest
}: TanStackLinkProps) {
  const loc = useLocation();
  let resolved = href ?? to ?? "/";
  if (params && resolved.includes("$")) {
    resolved = resolved.replace(/\$([A-Za-z0-9_]+)/g, (_, k) => String(params[k] ?? ""));
  }
  if (search) {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(search)) qs.set(k, String(v));
    resolved += (resolved.includes("?") ? "&" : "?") + qs.toString();
  }
  if (hash) resolved += `#${hash}`;

  const isActive = activeOptions?.exact
    ? loc.pathname === resolved
    : resolved !== "/" && loc.pathname.startsWith(resolved);
  const extra = isActive ? activeProps?.className : inactiveProps?.className;
  const finalClass = [className, extra].filter(Boolean).join(" ");

  // External / mailto / tel: render <a>
  if (/^(https?:|mailto:|tel:)/.test(resolved)) {
    return (
      <a href={resolved} className={finalClass} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <RRLink to={resolved} className={finalClass} {...(rest as any)}>
      {children}
    </RRLink>
  );
}

// ---------- useNavigate / useParams / useSearch passthroughs ----------

export const useNavigate = useRRNavigate;
export const useParams = useRRParams;
export function useSearch() {
  return Object.fromEntries(useSearchParams()[0].entries());
}

// ---------- Misc placeholders that some routes might import ----------

export function Navigate({ to }: { to: string }) {
  const navigate = useRRNavigate();
  React.useEffect(() => {
    navigate(to, { replace: true });
  }, [to, navigate]);
  return null;
}

// Server-fn stubs so any accidental import doesn't crash the bundle.
export function createServerFn() {
  return {
    inputValidator: () => ({
      handler: () => async () => {
        throw new Error("Server functions are not available in the IONOS static build.");
      },
    }),
    handler: () => async () => {
      throw new Error("Server functions are not available in the IONOS static build.");
    },
    middleware: () => createServerFn(),
  } as any;
}
export function createMiddleware() {
  return { server: () => ({}) } as any;
}
export function createStart() {
  return { getOptions: async () => ({}) } as any;
}
