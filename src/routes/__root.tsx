import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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

const PROFILE_URLS = [
  "https://share.google/47AcEDNTSDkltR1un",
  "https://www.facebook.com/profile.php?id=61579455697023",
  "https://www.my-hammer.de/auftragnehmer/justus-1",
  "https://www.kleinanzeigen.de/s-bestandsliste.html?userId=162496234",
  "https://www.gelbeseiten.de/gsbiz/cb6b8b66-db85-4b56-8397-4a920963c6d1",
  "https://www.11880.com/branchenbuch/wilhelmshaven/060690823B113934961/verlegt-verschraubt-handwerkerservice.html",
  "https://adresse.dastelefonbuch.de/Wilhelmshaven/2-Holzfu%C3%9Fb%C3%B6den-Verlegt-Verschraubt-Handwerkerservice-Wilhelmshaven-Weichselstr.html",
  "https://www.golocal.de/wilhelmshaven/bodenbelaege/verlegtverschraubt-handwerkerservice-YVD9o/",
];

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Verlegt & Verschraubt Handwerkerservice",
  description:
    "Bodenverlegung, Küchenmontage, Entrümpelung und kleine Reparaturen in Wilhelmshaven & Umgebung.",
  url: "https://verlegt-verschraubt.de/",
  image: "https://verlegt-verschraubt.de/wp-content/uploads/2026/05/image003.png",
  logo: "https://verlegt-verschraubt.de/wp-content/uploads/2026/05/image003.png",
  areaServed: "Wilhelmshaven und Umgebung",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wilhelmshaven",
    addressRegion: "Niedersachsen",
    addressCountry: "DE",
  },
  sameAs: PROFILE_URLS,
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
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
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-wood-grain relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
