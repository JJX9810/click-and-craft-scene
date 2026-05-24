import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type NavItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string }[] };

const nav: NavItem[] = [
  { label: "Start", to: "/" },
  { label: "Bodenverlegung", to: "/bodenverlegung-wilhelmshaven" },
  { label: "Küchenmontage", to: "/kuechenmontage-in-wilhelmshaven" },
  { label: "Entrümpelung", to: "/entruempelung-entsorgung-in-wilhelmshaven" },
  { label: "Showroom", to: "/showroom" },
  { label: "Preise", to: "/preise" },
  { label: "FAQ", to: "/faq" },
  { label: "Kontakt", to: "/kontakt" },
  {
    label: "Mehr",
    children: [
      { label: "Über uns", to: "/ueber-uns" },
      { label: "Referenzen", to: "/referenzen" },
      { label: "Wilhelmshaven", to: "/handwerkerservice-wilhelmshaven" },
      { label: "Schortens", to: "/handwerkerservice-schortens" },
      { label: "Sande", to: "/handwerkerservice-sande" },
      { label: "Jever", to: "/handwerkerservice-jever" },
      { label: "Varel", to: "/handwerkerservice-varel" },
      { label: "Wangerland", to: "/handwerkerservice-wangerland" },
      { label: "Wir unterstützen", to: "/wir-unterstuetzen" },
      { label: "Partner", to: "/partner" },
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Verlegt & Verschraubt Handwerkerservice"
            className="h-10 w-auto sm:h-12"
            width={120}
            height={48}
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Verlegt &amp; Verschraubt
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Handwerkerservice
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            "to" in item ? (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-2 text-[13px] font-medium tracking-wide hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium tracking-wide text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[230px] overflow-hidden rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-2xl backdrop-blur-xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="mailto:justus.brosch@verlegt-verschraubt.de"
            aria-label="E-Mail schreiben"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground sm:flex"
          >
            <Mail className="h-4 w-4" />
          </a>
          <Button
            asChild
            size="sm"
            className="h-10 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90"
          >
            <a href="tel:+4916347992866" className="gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Anrufen</span>
            </a>
          </Button>
          <button
            aria-label="Menü öffnen"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent/25 lg:hidden"
          >
            <Menu className="h-4 w-4" />
            <span>Menü</span>
          </button>
        </div>
      </div>

      {/* Mobile menu – inline dropdown unter dem Header */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <nav className="flex flex-col gap-1">
              {nav.map((item) =>
                "to" in item ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium hover:bg-accent/10"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div key={item.label} className="rounded-md">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenus((s) => ({ ...s, [item.label]: !s[item.label] }))
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium hover:bg-accent/10"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${openMenus[item.label] ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openMenus[item.label] && (
                      <div className="ml-3 flex flex-col border-l border-border/60 pl-3">
                        {item.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </nav>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                asChild
                className="h-11 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href="tel:+4916347992866">
                  <Phone className="mr-2 h-4 w-4" /> 0163 4799286
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-border bg-transparent"
              >
                <Link to="/kontakt" onClick={() => setMobileOpen(false)}>
                  Anfrage senden
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
