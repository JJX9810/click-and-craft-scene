import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/cockpit/lib/db";
import { useRealtimeQuery } from "@/cockpit/lib/useRealtimeQuery";
import {
  PROJECT_STATUS,
  PROJECT_STATUS_LABEL,
  type Customer,
  type Project,
} from "@/cockpit/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/cockpit/auftraege/")({
  component: ProjectsList,
});

type ProjectRow = Project & { customer?: { display_name: string } | null };

function ProjectsList() {
  const { rows, loading } = useRealtimeQuery<ProjectRow>("projects", async () => {
    const { data } = await db
      .from("projects")
      .select("*, customer:customers(display_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    return (data as ProjectRow[]) ?? [];
  });

  const [statusFilter, setStatusFilter] = useState<string>("alle");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ customer_id: "", title: "", service_type: "" });

  const openCreate = async () => {
    const { data } = await db
      .from("customers")
      .select("id, display_name")
      .is("deleted_at", null)
      .order("display_name");
    setCustomers((data as Customer[]) ?? []);
    setOpen(true);
  };

  const create = async () => {
    if (!form.customer_id) {
      toast.error("Bitte einen Kunden wählen.");
      return;
    }
    if (!form.title.trim()) {
      toast.error("Bitte einen Titel angeben.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await db.from("projects").insert({
        customer_id: form.customer_id,
        title: form.title.trim(),
        service_type: form.service_type.trim() || null,
      });
      if (error) throw error;
      toast.success("Auftrag angelegt");
      setForm({ customer_id: "", title: "", service_type: "" });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  const filtered = rows.filter((p) => statusFilter === "alle" || p.status === statusFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Aufträge</h1>
          <p className="text-sm text-muted-foreground">{rows.length} Auftrag/Aufträge</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => (o ? openCreate() : setOpen(false))}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Neu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuer Auftrag</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Kunde *</Label>
                <Select
                  value={form.customer_id}
                  onValueChange={(v) => setForm({ ...form, customer_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kunde wählen …" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.display_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ti">Titel *</Label>
                <Input
                  id="ti"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="se">Leistung</Label>
                <Input
                  id="se"
                  placeholder="z. B. Bodenverlegung"
                  value={form.service_type}
                  onChange={(e) => setForm({ ...form, service_type: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={create} disabled={saving}>
                {saving ? "Speichern …" : "Anlegen"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-1">
        {["alle", ...PROJECT_STATUS].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1 text-xs ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {s === "alle" ? "Alle" : (PROJECT_STATUS_LABEL[s] ?? s)}
          </button>
        ))}
      </div>

      {loading && <div className="text-sm text-muted-foreground">Lädt …</div>}
      {!loading && filtered.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">Keine Aufträge.</Card>
      )}

      <div className="grid gap-2">
        {filtered.map((p) => (
          <Link key={p.id} to="/cockpit/auftraege/$id" params={{ id: p.id }}>
            <Card className="flex items-center justify-between p-3 transition-colors hover:bg-muted/50">
              <div className="min-w-0">
                <div className="truncate font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">
                  {p.customer?.display_name ?? ""}
                  {p.service_type ? ` · ${p.service_type}` : ""}
                </div>
              </div>
              <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-[10px]">
                {PROJECT_STATUS_LABEL[p.status] ?? p.status}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
