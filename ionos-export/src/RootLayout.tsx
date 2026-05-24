import { Helmet } from "react-helmet-async";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RouteRenderer } from "./RouteRenderer";

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
  url: "https://www.verlegt-verschraubt.de/",
  image: "https://www.verlegt-verschraubt.de/logo.png",
  logo: "https://www.verlegt-verschraubt.de/logo.png",
  telephone: "+49 163 4799286",
  email: "justus.brosch@verlegt-verschraubt.de",
  areaServed: "Wilhelmshaven und Umgebung",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Weichselstraße 12",
    postalCode: "26388",
    addressLocality: "Wilhelmshaven",
    addressRegion: "Niedersachsen",
    addressCountry: "DE",
  },
  sameAs: PROFILE_URLS,
};

/**
 * Sitewide layout für IONOS-Build.
 * Bewusst NICHT das __root.tsx aus dem Hauptprojekt importiert —
 * die TanStack-Shell (HeadContent/Scripts/html-Wrapping) wird hier nicht gebraucht.
 */
export function RootLayout() {
  return (
    <>
      <Helmet>
        <html lang="de" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="TDh9EUozWlH9ooXcek1xTUxdzAmmLgSj9dY6jk3OVng" />
        <meta name="author" content="Verlegt & Verschraubt Handwerkerservice" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Verlegt & Verschraubt Handwerkerservice" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ORG_JSONLD)}</script>
      </Helmet>
      <div className="bg-wood-grain relative flex min-h-screen flex-col overflow-x-hidden text-foreground">
        <Header />
        <main className="flex-1">
          <RouteRenderer />
        </main>
        <Footer />
      </div>
    </>
  );
}
