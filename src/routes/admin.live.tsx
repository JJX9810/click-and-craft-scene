import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/live")({
  component: AdminLive,
});

interface CalcSession {
  session_id: string;
  snapshot: any;
  total_estimate: number | null;
  updated_at: string;
}

const eur = (n: number | null | undefined) =>
  n == null ? "–" : new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function timeAgo(iso: string) {
  const sec = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)}min`;
  return `${Math.floor(sec / 3600)}h`;
}

function AdminLive() {
  const [rows, setRows] = useState<CalcSession[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const load = async () => {
      const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
      const { data } = await supabase
        .from("calculator_sessions")
        .select("session_id, snapshot, total_estimate, updated_at")
        .gte("updated_at", since)
        .order("updated_at", { ascending: false })
        .limit(50);
      setRows((data ?? []) as CalcSession[]);
    };
    load();

    const channel = supabase
      .channel("calc-sessions-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "calculator_sessions" }, () => {
        load();
      })
      .subscribe();

    const refresh = window.setInterval(load, 8000);
    const ticker = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      supabase.removeChannel(channel);
      window.clearInterval(refresh);
      window.clearInterval(ticker);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Live-Kostenrechner</h1>
        <p className="text-sm text-muted-foreground">
          Aktuelle Eingaben in Echtzeit – letzte 30 Minuten ({rows.length} aktiv).
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.length === 0 && (
          <Card className="p-6 text-sm text-muted-foreground md:col-span-2 xl:col-span-3">
            Aktuell keine aktiven Kostenrechner-Sitzungen.
          </Card>
        )}
        {rows.map((r) => {
          const s = r.snapshot ?? {};
          return (
            <Card key={r.session_id} className="p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-mono">{r.session_id.slice(0, 8)}</span>
                <span suppressHydrationWarning data-tick={tick}>vor {timeAgo(r.updated_at)}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <Badge variant="secondary">{s.service ?? "—"}</Badge>
                <div className="text-lg font-semibold tabular-nums">{eur(r.total_estimate)}</div>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                {s.ort && (<><dt className="text-muted-foreground">Ort</dt><dd className="truncate">{s.ort}</dd></>)}
                {s.qm && (<><dt className="text-muted-foreground">Fläche</dt><dd>{s.qm} m²</dd></>)}
                {s.bodenVariante && (<><dt className="text-muted-foreground">Variante</dt><dd className="truncate">{s.bodenVariante}</dd></>)}
                {s.kueMeter && (<><dt className="text-muted-foreground">Küche</dt><dd>{s.kueMeter} lfm</dd></>)}
                {s.entMenge && (<><dt className="text-muted-foreground">Menge</dt><dd className="truncate">{s.entMenge}</dd></>)}
                {s.anfahrtKm && (<><dt className="text-muted-foreground">Anfahrt</dt><dd>{s.anfahrtKm} km</dd></>)}
                {s.dringlichkeit && (<><dt className="text-muted-foreground">Termin</dt><dd className="truncate">{s.dringlichkeit}</dd></>)}
              </dl>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
