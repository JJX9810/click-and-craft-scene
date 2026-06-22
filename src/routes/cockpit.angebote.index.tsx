import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/cockpit/lib/db";
import { useRealtimeQuery } from "@/cockpit/lib/useRealtimeQuery";
import { OFFER_STATUS_LABEL, type Customer, type Offer } from "@/cockpit/lib/types";
import { eur, fmtDate, parseMoney } from "@/cockpit/lib/format";
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
import { Plus, ArrowRightCircle } from "lucide-react";

export const Route = createFileRoute("/cockpit/angebote/")({
  component: OffersList,
});

type OfferRow = Offer & { customer?: { display_name: string } | null };

function OffersList() {
  const navigate = useNavigate();
  const { rows, loading } = useRealtimeQuery<OfferRow>("offers", async () => {
    const { data } = await db
      .from("offers")
      .select("*, customer:customers(display_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    return (data as OfferRow[]) ?? [];
  });

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ customer_id: "", description: "", amount: "" });

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
      toast.error("Bitte Kunde wählen.");
      return;
    }
    const amount = parseMoney(form.amount);
    setSaving(true);
    try {
      const { data: no } = await db.rpc("cockpit_next_number", { kind: "offer" });
      const { data: offer, error } = await db
        .from("offers")
        .insert({
          offer_no: no,
          customer_id: form.customer_id,
          status: "entwurf",
          subtotal: amount,
          tax_rate: 0,
          tax_amount: 0,
          total: amount,
        })
        .select("id")
        .single();
      if (error) throw error;
      await db.from("offer_items").insert({
        offer_id: (offer as { id: string }).id,
        position: 1,
        description: form.description.trim() || "Leistung",
        qty: 1,
        unit: "psch",
        unit_price: amount,
        line_total: amount,
      });
      toast.success(`Angebot ${no} angelegt`);
      setForm({ customer_id: "", description: "", amount: "" });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  const setStatus = async (o: OfferRow, status: string) => {
    const patch: Record<string, unknown> = { status };
    if (status === "angenommen") patch.accepted_at = new Date().toISOString();
    const { error } = await db.from("offers").update(patch).eq("id", o.id);
    if (error) toast.error(error.message);
  };

  const toInvoice = async (o: OfferRow) => {
    try {
      const { data: no } = await db.rpc("cockpit_next_number", { kind: "invoice" });
      const { data: items } = await db
        .from("offer_items")
        .select("*")
        .eq("offer_id", o.id)
        .order("position");
      const { data: inv, error } = await db
        .from("invoices")
        .insert({
          invoice_no: no,
          customer_id: o.customer_id,
          project_id: o.project_id,
          offer_id: o.id,
          status: "entwurf",
          subtotal: o.subtotal,
          tax_rate: o.tax_rate,
          tax_amount: o.tax_amount,
          total: o.total,
        })
        .select("id")
        .single();
      if (error) throw error;
      const invId = (inv as { id: string }).id;
      const rows = ((items as any[]) ?? []).map((it) => ({
        invoice_id: invId,
        position: it.position,
        description: it.description,
        qty: it.qty,
        unit: it.unit,
        unit_price: it.unit_price,
        line_total: it.line_total,
      }));
      if (rows.length) await db.from("invoice_items").insert(rows);
      await db
        .from("offers")
        .update({
          status: "angenommen",
          converted_invoice_id: invId,
          accepted_at: new Date().toISOString(),
        })
        .eq("id", o.id);
      toast.success(`Rechnung ${no} erstellt`);
      navigate({ to: "/cockpit/rechnungen" });
    } catch (e: any) {
      toast.error(e?.message ?? "Umwandlung fehlgeschlagen");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Angebote</h1>
          <p className="text-sm text-muted-foreground">{rows.length} Angebot(e)</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => (o ? openCreate() : setOpen(false))}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Neu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Angebot</DialogTitle>
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
                <Label htmlFor="de">Bezeichnung</Label>
                <Input
                  id="de"
                  placeholder="z. B. Bodenverlegung Wohnzimmer"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="am">Betrag (€)</Label>
                <Input
                  id="am"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Kleinunternehmer §19 UStG – ohne Umsatzsteuer. Detaillierte Positionen folgen in
                V1.1.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={create} disabled={saving}>
                {saving ? "Speichern …" : "Anlegen"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading && <div className="text-sm text-muted-foreground">Lädt …</div>}
      {!loading && rows.length === 0 && (
        <Card className="p-6 text-center text-sm text-muted-foreground">Noch keine Angebote.</Card>
      )}

      <div className="grid gap-2">
        {rows.map((o) => (
          <Card key={o.id} className="p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-mono text-xs text-muted-foreground">{o.offer_no}</div>
                <div className="truncate font-medium">{o.customer?.display_name ?? "—"}</div>
                <div className="text-xs text-muted-foreground">{fmtDate(o.issue_date)}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-semibold tabular-nums">{eur(o.total)}</span>
                <span className="rounded bg-muted px-2 py-0.5 text-[10px]">
                  {OFFER_STATUS_LABEL[o.status] ?? o.status}
                </span>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {o.status === "entwurf" && (
                <Button size="sm" variant="outline" onClick={() => setStatus(o, "gesendet")}>
                  Gesendet
                </Button>
              )}
              {o.status === "gesendet" && (
                <Button size="sm" variant="outline" onClick={() => setStatus(o, "angenommen")}>
                  Angenommen
                </Button>
              )}
              {o.status === "gesendet" && (
                <Button size="sm" variant="outline" onClick={() => setStatus(o, "abgelehnt")}>
                  Abgelehnt
                </Button>
              )}
              {!o.converted_invoice_id && o.status !== "abgelehnt" && (
                <Button size="sm" onClick={() => toInvoice(o)}>
                  <ArrowRightCircle className="mr-1 h-4 w-4" /> In Rechnung
                </Button>
              )}
              {o.converted_invoice_id && (
                <span className="self-center text-xs text-muted-foreground">
                  → Rechnung erstellt
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
