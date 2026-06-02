import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, Calculator, FileText, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const ACTIVE_WINDOW_SECONDS = 60;

function AdminDashboard() {
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [liveCalcs, setLiveCalcs] = useState<number | null>(null);
  const [submissionsTotal, setSubmissionsTotal] = useState<number | null>(null);
  const [pageViews24h, setPageViews24h] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const sinceActive = new Date(Date.now() - ACTIVE_WINDOW_SECONDS * 1000).toISOString();
      const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const sinceLiveCalc = new Date(Date.now() - 5 * 60 * 1000).toISOString();

      const [active, calc, subs, views] = await Promise.all([
        supabase.from("active_sessions").select("session_id", { count: "exact", head: true }).gte("last_seen_at", sinceActive),
        supabase.from("calculator_sessions").select("session_id", { count: "exact", head: true }).gte("updated_at", sinceLiveCalc),
        supabase.from("calculator_submissions").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", since24h),
      ]);
      if (!mounted) return;
      setActiveCount(active.count ?? 0);
      setLiveCalcs(calc.count ?? 0);
      setSubmissionsTotal(subs.count ?? 0);
      setPageViews24h(views.count ?? 0);
    };
    load();
    const id = window.setInterval(load, 10000);
    return () => { mounted = false; window.clearInterval(id); };
  }, []);

  const stats = [
    { label: "Aktive Besucher (jetzt)", value: activeCount, icon: Users, hint: "letzte 60 Sek." },
    { label: "Aktive Kostenrechner", value: liveCalcs, icon: Calculator, hint: "letzte 5 Min." },
    { label: "Seitenaufrufe (24h)", value: pageViews24h, icon: Eye, hint: "letzte 24 Std." },
    { label: "Berechnungen gesamt", value: submissionsTotal, icon: FileText, hint: "alle abgeschlossen" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live-Übersicht der Website-Aktivität.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-3 text-3xl font-semibold tabular-nums">
                {s.value === null ? "–" : s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.hint}</div>
            </Card>
          );
        })}
      </div>
      <Card className="p-5 text-sm text-muted-foreground">
        Automatische Aktualisierung alle 10 Sekunden. Für Echtzeit-Eingaben siehe „Live-Rechner".
      </Card>
    </div>
  );
}
