import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/admin/statistiken")({
  component: AdminStats,
});

interface Row { path: string; count: number; }

function AdminStats() {
  const [topPages, setTopPages] = useState<Row[]>([]);
  const [perDay, setPerDay] = useState<{ day: string; count: number }[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    (async () => {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("page_views")
        .select("path, created_at")
        .gte("created_at", since)
        .limit(10000);
      const rows = data ?? [];
      setTotalViews(rows.length);

      const byPath = new Map<string, number>();
      const byDay = new Map<string, number>();
      for (const r of rows) {
        byPath.set(r.path, (byPath.get(r.path) ?? 0) + 1);
        const day = new Date(r.created_at).toISOString().slice(0, 10);
        byDay.set(day, (byDay.get(day) ?? 0) + 1);
      }
      setTopPages([...byPath.entries()].map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count).slice(0, 20));
      setPerDay([...byDay.entries()].map(([day, count]) => ({ day, count })).sort((a, b) => a.day.localeCompare(b.day)));
    })();
  }, []);

  const maxDay = Math.max(1, ...perDay.map((d) => d.count));
  const maxPath = Math.max(1, ...topPages.map((p) => p.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Statistiken</h1>
        <p className="text-sm text-muted-foreground">Letzte 30 Tage · {totalViews} Aufrufe</p>
      </div>

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold">Aufrufe pro Tag</h2>
        <div className="flex h-40 items-end gap-1">
          {perDay.length === 0 && <div className="text-sm text-muted-foreground">Noch keine Daten.</div>}
          {perDay.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1" title={`${d.day}: ${d.count}`}>
              <div className="w-full rounded-t bg-primary" style={{ height: `${(d.count / maxDay) * 100}%`, minHeight: 2 }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>{perDay[0]?.day ?? ""}</span>
          <span>{perDay[perDay.length - 1]?.day ?? ""}</span>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold">Top-Seiten</h2>
        <div className="space-y-2">
          {topPages.length === 0 && <div className="text-sm text-muted-foreground">Noch keine Daten.</div>}
          {topPages.map((p) => (
            <div key={p.path} className="flex items-center gap-3 text-sm">
              <div className="w-64 truncate font-mono text-xs text-muted-foreground">{p.path}</div>
              <div className="relative h-5 flex-1 overflow-hidden rounded bg-muted">
                <div className="absolute inset-y-0 left-0 bg-primary/70" style={{ width: `${(p.count / maxPath) * 100}%` }} />
              </div>
              <div className="w-12 text-right font-medium tabular-nums">{p.count}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
