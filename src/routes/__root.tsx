import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { AttributionTracker } from "@/components/AttributionTracker";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";


function NotFoundComponent() {
  const links: { to: string; label: string }[] = [
    { to: "/", label: "Startseite" },
    { to: "/bodenverlegung-wilhelmshaven", label: "Bodenverlegung" },
    { to: "/kuechenmontage-in-wilhelmshaven", label: "Küchenmontage" },
    { to: "/entruempelung-entsorgung-in-wilhelmshaven", label: "Entrümpelung" },
    { to: "/preise", label: "Preise / Kostenrechner" },
    { to: "/kontakt", label: "Kontakt" },
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="max-w-lg text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben. Vielleicht hilft einer der folgenden Links weiter:
        </p>
        <ul className="mt-6 grid gap-2 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-accent hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Direkter Draht:{" "}
          <a href="tel:+491634799286" className="font-medium text-foreground hover:text-accent">
            0163 4799286
          </a>
        </p>
        <div className="mt-6">
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Projekt trotzdem anfragen
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "TDh9EUozWlH9ooXcek1xTUxdzAmmLgSj9dY6jk3OVng" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "publisher", content: "Verlegt & Verschraubt Handwerkerservice" },
      { title: "Verlegt & Verschraubt Handwerkerservice – Wilhelmshaven" },
      {
        name: "description",
        content:
          "Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung. Z.O.Z. – Zuverlässig. Ordentlich. Zügig.",
      },
      { name: "author", content: "Verlegt & Verschraubt Handwerkerservice" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Verlegt & Verschraubt Handwerkerservice" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:title", content: "Verlegt & Verschraubt Handwerkerservice – Wilhelmshaven" },
      {
        property: "og:description",
        content:
          "Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung. Z.O.Z. – Zuverlässig. Ordentlich. Zügig.",
      },
      { property: "og:url", content: "https://verlegt-verschraubt.de/" },
      { property: "og:image:alt", content: "Verlegt & Verschraubt – Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven" },
      { name: "twitter:title", content: "Verlegt & Verschraubt Handwerkerservice – Wilhelmshaven" },
      { name: "twitter:description", content: "Z.O.Z. – Zuverlässig. Ordentlich. Zügig. Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image:alt", content: "Verlegt & Verschraubt – Handwerkerservice Wilhelmshaven" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isAdminArea = pathname.startsWith("/admin") || pathname.startsWith("/login");

  if (isAdminArea) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-wood-grain relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
        {!isHome && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.95 0.015 70 / 0.10), oklch(0.95 0.015 70 / 0.06) 60%, oklch(0.95 0.015 70 / 0.10))",
            }}
          />
        )}
        <Header />
        <main className="relative z-10 flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        <AttributionTracker />
        <AnalyticsTracker />
      </div>
    </QueryClientProvider>
  );
}


