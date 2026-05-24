import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Seite nicht gefunden – Verlegt &amp; Verschraubt</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Diese Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
