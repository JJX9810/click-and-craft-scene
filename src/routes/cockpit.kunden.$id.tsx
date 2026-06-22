import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/cockpit/lib/db";
import type { Customer, Project } from "@/cockpit/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
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
import { ArrowLeft, Phone, Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/cockpit/kunden/$id")({
  component: CustomerDetail,
});

function CustomerDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [c, setC] = useState<Customer | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newProject, setNewProject] = useState("");

  const load = async () => {
    const [cust, proj] = await Promise.all([
      db.from("customers").select("*").eq("id", id).single(),
      db
        .from("projects")
        .select("*")
        .eq("customer_id", id)
        .is("deleted_at", null)
        .order("created_at", { ascending: false }),
    ]);
    setC((cust.data as Customer) ?? null);
    setProjects((proj.data as Project[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = db
      .channel(`rt-customer-${id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects", filter: `customer_id=eq.${id}` },
        load,
      )
      .subscribe();
    return () => {
      db.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const set = (patch: Partial<Customer>) => setC((prev) => (prev ? { ...prev, ...patch } : prev));

  const save = async () => {
    if (!c) return;
    if (!c.display_name.trim()) {
      toast.error("Name darf nicht leer sein.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await db
        .from("customers")
        .update({
          display_name: c.display_name,
          type: c.type,
          stage: c.stage,
          status: c.status,
          phone: c.phone,
          email: c.email,
          street: c.street,
          zip: c.zip,
          city: c.city,
          notes: c.notes,
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

  const addProject = async () => {
    if (!newProject.trim()) return;
    const { error } = await db
      .from("projects")
      .insert({ customer_id: id, title: newProject.trim() });
    if (error) {
      toast.error(error.message);
      return;
    }
    setNewProject("");
    toast.success("Auftrag angelegt");
  };

  const softDelete = async () => {
    const { error } = await db
      .from("customers")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Kunde gelöscht");
    navigate({ to: "/cockpit/kunden" });
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!c) {
    return (
      <div className="space-y-3">
        <Link
          to="/cockpit/kunden"
          className="flex items-center gap-1 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
        <Card className="p-6 text-center text-sm text-muted-foreground">Kunde nicht gefunden.</Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/cockpit/kunden"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Kunden
        </Link>
        <div className="flex items-center gap-2">
          {c.phone && (
            <a
              href={`tel:${c.phone}`}
              className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <Phone className="h-4 w-4" /> Anrufen
            </a>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kunde löschen?</AlertDialogTitle>
                <AlertDialogDescription>
                  Der Kunde wird ausgeblendet (Soft Delete). Verknüpfte Rechnungen bleiben erhalten.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction onClick={softDelete}>Löschen</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{c.display_name}</h1>
        <p className="text-sm text-muted-foreground">
          {c.type === "gewerblich" ? "Gewerblich" : "Privat"} ·{" "}
          {c.stage === "lead" ? "Lead" : "Kunde"}
        </p>
      </div>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold">Stammdaten</h2>
        <div>
          <Label htmlFor="dn">Name</Label>
          <Input
            id="dn"
            value={c.display_name}
            onChange={(e) => set({ display_name: e.target.value })}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="ph">Telefon</Label>
            <Input id="ph" value={c.phone ?? ""} onChange={(e) => set({ phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="em">E-Mail</Label>
            <Input
              id="em"
              type="email"
              value={c.email ?? ""}
              onChange={(e) => set({ email: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="st">Straße</Label>
            <Input
              id="st"
              value={c.street ?? ""}
              onChange={(e) => set({ street: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="zp">PLZ</Label>
            <Input id="zp" value={c.zip ?? ""} onChange={(e) => set({ zip: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="ci">Ort</Label>
            <Input id="ci" value={c.city ?? ""} onChange={(e) => set({ city: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="no">Notizen</Label>
          <Textarea
            id="no"
            rows={3}
            value={c.notes ?? ""}
            onChange={(e) => set({ notes: e.target.value })}
          />
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? "Speichern …" : "Speichern"}
        </Button>
      </Card>

      <Card className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Aufträge ({projects.length})</h2>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Neuer Auftrag (Titel) …"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addProject();
            }}
          />
          <Button onClick={addProject} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-2">
          {projects.map((p) => (
            <Link key={p.id} to="/cockpit/auftraege/$id" params={{ id: p.id }}>
              <div className="flex items-center justify-between rounded-md border p-2 text-sm transition-colors hover:bg-muted/50">
                <span>{p.title}</span>
                <span className="text-xs text-muted-foreground">{p.status}</span>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <div className="text-sm text-muted-foreground">Noch keine Aufträge.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
