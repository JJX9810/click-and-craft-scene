import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouteContextProvider } from "./tanstack-shim";
import { RootLayout } from "./RootLayout";
import "./styles.css";
// Routen-Registry importieren, damit alle Routen sich selbst beim Modul-Load registrieren.
import "./route-registry";

export function App({ helmetContext }: { helmetContext?: any }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <RouteContextProvider value={{ queryClient }}>
          <Routes>
            {/* Catch-all – RootLayout entscheidet anhand useLocation, was gerendert wird. */}
            <Route path="*" element={<RootLayout />} />
          </Routes>
        </RouteContextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
