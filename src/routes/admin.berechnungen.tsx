import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/berechnungen")({
  component: AdminBerechnungen,
});

interface Submission {
  id: string;
  session_id: string | null;
  snapshot: any;
  total_estimate: number | null;
  created_at: string;
}

const eur = (n: number | null | undefined) =>
  n == null ? "–" : new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
const dt = (iso: string) => new Date(iso).toLocaleString("de-DE");

function toCsv(rows: Submission[]): string {
  const headers = ["id", "datum", "session", "leistung", "ort", "qm", "variante", "kueche_lfm", "ent_menge", "anfahrt_km", "dringlichkeit", "summe_eur", "snapshot_json"];
  const esc = (v: any) => {
    const s = v == null ? "" : String(v);
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(";")];
  for (const r of rows) {
    const s = r.snapshot ?? {};
    lines.push([
      r.id, dt(r.created_at), r.session_id ?? "", s.service ?? "", s.ort ?? "",
      s.qm ?? "", s.bodenVariante ?? "", s.kueMeter ?? "", s.entMenge ?? "",
      s.anfahrtKm ?? "", s.dringlichkeit ?? "", r.total_estimate ?? "",
      JSON.stringify(s),
    ].map(esc).join(";"));
  }
  return lines.join("\n");
}

function AdminBerechnungen() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("calculator_submissions")
      .select("id, session_id, snapshot, total_estimate, created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    setRows((data ?? []) as Submission[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = rows.filter((r) => {
    if (!filter) return true;
    const blob = `${r.snapshot?.service ?? ""} ${r.snapshot?.ort ?? ""} ${r.snapshot?.bodenVariante ?? ""} ${r.session_id ?? ""}`.toLowerCase();
    return blob.includes(filter.toLowerCase());
  });

  const exportCsv = () => {
    const csv = "\uFEFF" + toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `berechnungen_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteOne = async (id: string) => {
    if (!confirm("Diese Berechnung wirklich löschen?")) return;
    const { error } = await supabase.from("calculator_submissions").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Gelöscht");
      setRows((r) => r.filter((x) => x.id !== id));
    }
  };

  const deleteAll = async () => {
    if (!confirm(`Wirklich ALLE ${filtered.length} angezeigten Berechnungen unwiderruflich löschen?`)) return;
    const ids = filtered.map((r) => r.id);
    const { error } = await supabase.from("calculator_submissions").delete().in("id", ids);
    if (error) toast.error(error.message);
    else {
      toast.success(`${ids.length} gelöscht`);
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Berechnungen</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} von {rows.length} Einträgen</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Input placeholder="Filter (Ort, Leistung, …)" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-56" />
          <Button onClick={exportCsv} variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> CSV-Export</Button>
          <Button onClick={deleteAll} variant="destructive" size="sm" disabled={filtered.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" /> Alle löschen
          </Button>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left">
            <tr>
              <th className="p-3">Datum</th>
              <th className="p-3">Leistung</th>
              <th className="p-3">Ort</th>
              <th className="p-3">Details</th>
              <th className="p-3 text-right">Summe</th>
              <th className="p-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {loading && (<tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Lädt …</td></tr>)}
            {!loading && filtered.length === 0 && (<tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Keine Einträge.</td></tr>)}
            {filtered.map((r) => {
              const s = r.snapshot ?? {};
              const details = [
                s.qm && `${s.qm} m²`,
                s.bodenVariante,
                s.kueMeter && `${s.kueMeter} lfm`,
                s.entMenge,
                s.anfahrtKm && `${s.anfahrtKm} km Anfahrt`,
                s.dringlichkeit,
              ].filter(Boolean).join(" · ");
              return (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">{dt(r.created_at)}</td>
                  <td className="p-3"><Badge variant="secondary">{s.service ?? "—"}</Badge></td>
                  <td className="p-3">{s.ort ?? "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground max-w-md">{details || "—"}</td>
                  <td className="p-3 text-right font-semibold tabular-nums">{eur(r.total_estimate)}</td>
                  <td className="p-3">
                    <Button onClick={() => deleteOne(r.id)} variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
