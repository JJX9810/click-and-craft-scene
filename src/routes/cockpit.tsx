import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { db } from "@/cockpit/lib/db";
import { useCockpitAuth } from "@/cockpit/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  LogOut,
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Receipt,
  Settings as SettingsIcon,
} from "lucide-react";

export const Route = createFileRoute("/cockpit")({
  head: () => ({
    meta: [{ title: "V&V Cockpit" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: CockpitLayout,
});

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  adminOnly?: boolean;
  primary?: boolean; // erscheint in der mobilen Bottom-Nav
}

const NAV: NavItem[] = [
  { to: "/cockpit", label: "Start", icon: LayoutDashboard, exact: true, primary: true },
  { to: "/cockpit/kunden", label: "Kunden", icon: Users, primary: true },
  { to: "/cockpit/auftraege", label: "Aufträge", icon: Briefcase, primary: true },
  { to: "/cockpit/angebote", label: "Angebote", icon: FileText, primary: true },
  { to: "/cockpit/rechnungen", label: "Rechnungen", icon: Receipt, primary: true },
  { to: "/cockpit/einstellungen", label: "Einstellungen", icon: SettingsIcon, adminOnly: true },
];

function isActive(pathname: string, item: NavItem): boolean {
  return item.exact
    ? pathname === item.to
    : pathname === item.to || pathname.startsWith(item.to + "/");
}

function CockpitLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const auth = useCockpitAuth();

  const logout = async () => {
    await db.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  // Nicht angemeldet -> zum Login (im Effect, nicht im Render).
  useEffect(() => {
    if (auth.status === "anon") navigate({ to: "/login", replace: true });
  }, [auth.status, navigate]);

  if (auth.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (auth.status === "anon") {
    return null;
  }

  const items = NAV.filter((i) => !i.adminOnly || auth.isAdmin);
  const primary = items.filter((i) => i.primary);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop-Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r bg-card md:flex md:flex-col">
        <div className="border-b px-5 py-4">
          <div className="text-sm font-semibold">V&amp;V Cockpit</div>
          <div className="text-xs text-muted-foreground">{auth.email}</div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <Button onClick={logout} variant="outline" size="sm" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile-Header */}
        <header className="flex items-center justify-between border-b bg-card px-4 py-3 md:hidden">
          <div className="text-sm font-semibold">V&amp;V Cockpit</div>
          <div className="flex items-center gap-1">
            {auth.isAdmin && (
              <Link
                to="/cockpit/einstellungen"
                className="rounded-md p-2 hover:bg-muted"
                aria-label="Einstellungen"
              >
                <SettingsIcon className="h-4 w-4" />
              </Link>
            )}
            <button onClick={logout} className="rounded-md p-2 hover:bg-muted" aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>

        {/* Mobile-Bottom-Nav */}
        <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t bg-card md:hidden">
          {primary.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
