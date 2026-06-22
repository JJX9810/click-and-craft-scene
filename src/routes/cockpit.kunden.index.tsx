import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/cockpit/lib/db";
import { useRealtimeQuery } from "@/cockpit/lib/useRealtimeQuery";
import type { Customer } from "@/cockpit/lib/types";
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
import { toast } from "sonner";
import { Plus, Search, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/cockpit/kunden/")({
  component: CustomersList,
});

function CustomersList() {
  const { rows, loading } = useRealtimeQuery<Customer>("customers", async () => {
    const { data } = await db
      .from("customers")
      .select("*")
      .is("deleted_at", null)
      .order("display_name");
    return (data as Customer[]) ?? [];
  });

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    display_name: "",
    phone: "",
    email: "",
    city: "",
    type: "privat",
  });

  const filtered = rows.filter((c) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [c.display_name, c.phone, c.city, c.email, c.company]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(s));
  });

  const create = async () => {
    if (!form.display_name.trim()) {
      toast.error("Bitte einen Namen angeben.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await db.from("customers").insert({
        display_name: form.display_name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        city: form.city.trim() || null,
        type: form.type,
      });
      if (error) throw error;
      toast.success("Kunde angelegt");
      setForm({ display_name: "", phone: "", email: "", city: "", type: "privat" });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Kunden</h1>
          <p className="text-sm text-muted-foreground">{rows.length} Kunde(n)</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Neu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuer Kunde</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="dn">Name *</Label>
                <Input
                  id="dn"
                  value={form.display_name}
                  onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="ph">Telefon</Label>
                  <Input
                    id="ph"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="ci">Ort</Label>
                  <Input
                    id="ci"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="em">E-Mail</Label>
                <Input
                  id="em"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Suche Name, Telefon, Ort …"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading && <div className="text-sm text-muted-foreground">Lädt …</div>}
      {!loading && filtered.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Keine Kunden gefunden.
        </Card>
      )}

      <div className="grid gap-2">
        {filtered.map((c) => (
          <Link key={c.id} to="/cockpit/kunden/$id" params={{ id: c.id }}>
            <Card className="flex items-center justify-between p-3 transition-colors hover:bg-muted/50">
              <div className="min-w-0">
                <div className="truncate font-medium">{c.display_name}</div>
                <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                  {c.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {c.phone}
                    </span>
                  )}
                  {c.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {c.city}
                    </span>
                  )}
                </div>
              </div>
              {c.stage === "lead" && (
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] text-accent-foreground">
                  Lead
                </span>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
