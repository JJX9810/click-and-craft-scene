import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/cockpit/lib/db";
import { PROJECT_STATUS, PROJECT_STATUS_LABEL, type Project } from "@/cockpit/lib/types";
import { eur, parseMoney } from "@/cockpit/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft, Trash2, Loader2, User } from "lucide-react";

export const Route = createFileRoute("/cockpit/auftraege/$id")({
  component: ProjectDetail,
});

type ProjectFull = Project & { customer?: { id: string; display_name: string } | null };

function ProjectDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [p, setP] = useState<ProjectFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await db
        .from("projects")
        .select("*, customer:customers(id, display_name)")
        .eq("id", id)
        .single();
      setP((data as ProjectFull) ?? null);
      setLoading(false);
    })();
  }, [id]);

  const set = (patch: Partial<ProjectFull>) =>
    setP((prev) => (prev ? { ...prev, ...patch } : prev));

  const save = async () => {
    if (!p) return;
    setSaving(true);
    try {
      const { error } = await db
        .from("projects")
        .update({
          title: p.title,
          service_type: p.service_type,
          status: p.status,
          description: p.description,
          start_date: p.start_date || null,
          due_date: p.due_date || null,
          progress_pct: p.progress_pct,
          internal_notes: p.internal_notes,
          next_step: p.next_step,
          calc_cost: p.calc_cost,
          calc_revenue: p.calc_revenue,
        })
        .eq("id", id);
      if (error) throw error;
      toast.success("Gespeichert");
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  const softDelete = async () => {
    const { error } = await db
      .from("projects")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Auftrag gelöscht");
    navigate({ to: "/cockpit/auftraege" });
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!p) {
    return (
      <div className="space-y-3">
        <Link
          to="/cockpit/auftraege"
          className="flex items-center gap-1 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Auftrag nicht gefunden.
        </Card>
      </div>
    );
  }

  const margin = (p.calc_revenue ?? 0) - (p.calc_cost ?? 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/cockpit/auftraege"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Aufträge
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Auftrag löschen?</AlertDialogTitle>
              <AlertDialogDescription>
                Der Auftrag wird ausgeblendet (Soft Delete).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={softDelete}>Löschen</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div>
        <Input
          className="border-0 px-0 text-2xl font-semibold shadow-none focus-visible:ring-0"
          value={p.title}
          onChange={(e) => set({ title: e.target.value })}
        />
        {p.customer && (
          <Link
            to="/cockpit/kunden/$id"
            params={{ id: p.customer.id }}
            className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
          >
            <User className="h-3 w-3" /> {p.customer.display_name}
          </Link>
        )}
      </div>

      <Card className="space-y-4 p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Status</Label>
            <Select value={p.status} onValueChange={(v) => set({ status: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {PROJECT_STATUS_LABEL[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="se">Leistung</Label>
            <Input
              id="se"
              value={p.service_type ?? ""}
              onChange={(e) => set({ service_type: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="sd">Start</Label>
            <Input
              id="sd"
              type="date"
              value={p.start_date ?? ""}
              onChange={(e) => set({ start_date: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="dd">Fällig</Label>
            <Input
              id="dd"
              type="date"
              value={p.due_date ?? ""}
              onChange={(e) => set({ due_date: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="pp">Fortschritt: {p.progress_pct}%</Label>
          <input
            id="pp"
            type="range"
            min={0}
            max={100}
            step={5}
            value={p.progress_pct}
            onChange={(e) => set({ progress_pct: Number(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <Label htmlFor="ns">Nächster Schritt</Label>
          <Input
            id="ns"
            value={p.next_step ?? ""}
            onChange={(e) => set({ next_step: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="in">Interne Notizen</Label>
          <Textarea
            id="in"
            rows={3}
            value={p.internal_notes ?? ""}
            onChange={(e) => set({ internal_notes: e.target.value })}
          />
        </div>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold">Nachkalkulation</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="cc">Kosten</Label>
            <Input
              id="cc"
              inputMode="decimal"
              defaultValue={p.calc_cost ?? ""}
              onBlur={(e) => set({ calc_cost: parseMoney(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="cr">Erlös</Label>
            <Input
              id="cr"
              inputMode="decimal"
              defaultValue={p.calc_revenue ?? ""}
              onBlur={(e) => set({ calc_revenue: parseMoney(e.target.value) })}
            />
          </div>
          <div>
            <Label>Marge</Label>
            <div
              className={`mt-2 text-lg font-semibold tabular-nums ${margin < 0 ? "text-destructive" : ""}`}
            >
              {eur(margin)}
            </div>
          </div>
        </div>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? "Speichern …" : "Speichern"}
      </Button>
    </div>
  );
}
