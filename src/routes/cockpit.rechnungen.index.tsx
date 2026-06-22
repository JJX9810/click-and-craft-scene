import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { db } from "@/cockpit/lib/db";
import { useRealtimeQuery } from "@/cockpit/lib/useRealtimeQuery";
import { INVOICE_STATUS_LABEL, type Customer, type Invoice } from "@/cockpit/lib/types";
import { eur, fmtDate, parseMoney, todayISO } from "@/cockpit/lib/format";
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
import { Plus, Send, Ban, Euro } from "lucide-react";

export const Route = createFileRoute("/cockpit/rechnungen/")({
  component: InvoicesList,
});

type InvoiceRow = Invoice & { customer?: { display_name: string } | null };

const STATUS_COLORS: Record<string, string> = {
  entwurf: "bg-muted text-muted-foreground",
  gesendet: "bg-blue-500/10 text-blue-700",
  teilbezahlt: "bg-amber-500/10 text-amber-700",
  bezahlt: "bg-emerald-500/10 text-emerald-700",
  storniert: "bg-muted text-muted-foreground line-through",
  mahnung: "bg-destructive/10 text-destructive",
};

function InvoicesList() {
  const { rows, loading } = useRealtimeQuery<InvoiceRow>("invoices", async () => {
    const { data } = await db
      .from("invoices")
      .select("*, customer:customers(display_name)")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    return (data as InvoiceRow[]) ?? [];
  });

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState({ customer_id: "", description: "", amount: "" });

  const [payFor, setPayFor] = useState<InvoiceRow | null>(null);
  const [pay, setPay] = useState({ amount: "", paid_at: todayISO() });

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
      const { data: no } = await db.rpc("cockpit_next_number", { kind: "invoice" });
      const { data: inv, error } = await db
        .from("invoices")
        .insert({
          invoice_no: no,
          customer_id: form.customer_id,
          status: "entwurf",
          subtotal: amount,
          tax_rate: 0,
          tax_amount: 0,
          total: amount,
          is_kleinunternehmer: true,
        })
        .select("id")
        .single();
      if (error) throw error;
      await db.from("invoice_items").insert({
        invoice_id: (inv as { id: string }).id,
        position: 1,
        description: form.description.trim() || "Leistung",
        qty: 1,
        unit: "psch",
        unit_price: amount,
        line_total: amount,
      });
      toast.success(`Rechnung ${no} angelegt`);
      setForm({ customer_id: "", description: "", amount: "" });
      setOpen(false);
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  const send = async (inv: InvoiceRow) => {
    const due = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const { error } = await db
      .from("invoices")
      .update({ status: "gesendet", due_date: inv.due_date ?? due })
      .eq("id", inv.id);
    if (error) toast.error(error.message);
    else toast.success("Als gesendet markiert");
  };

  const storno = async (inv: InvoiceRow) => {
    const { error } = await db.from("invoices").update({ status: "storniert" }).eq("id", inv.id);
    if (error) toast.error(error.message);
    else toast.success("Storniert");
  };

  const savePayment = async () => {
    if (!payFor) return;
    const amount = parseMoney(pay.amount);
    if (amount <= 0) {
      toast.error("Betrag ungültig.");
      return;
    }
    const { error } = await db
      .from("payments")
      .insert({ invoice_id: payFor.id, amount, paid_at: pay.paid_at });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Zahlung erfasst");
    setPayFor(null);
    setPay({ amount: "", paid_at: todayISO() });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Rechnungen</h1>
          <p className="text-sm text-muted-foreground">{rows.length} Rechnung(en)</p>
        </div>
        <Dialog open={open} onOpenChange={(o) => (o ? openCreate() : setOpen(false))}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" /> Neu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Rechnung</DialogTitle>
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
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
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
        <Card className="p-6 text-center text-sm text-muted-foreground">
          Noch keine Rechnungen.
        </Card>
      )}

      <div className="grid gap-2">
        {rows.map((inv) => {
          const offen = Number(inv.total) - Number(inv.paid_total);
          return (
            <Card key={inv.id} className="p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="font-mono text-xs text-muted-foreground">{inv.invoice_no}</div>
                  <div className="truncate font-medium">{inv.customer?.display_name ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">{fmtDate(inv.issue_date)}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold tabular-nums">{eur(inv.total)}</span>
                  {inv.paid_total > 0 && inv.status !== "bezahlt" && (
                    <span className="text-[10px] text-muted-foreground">offen {eur(offen)}</span>
                  )}
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] ${STATUS_COLORS[inv.status] ?? "bg-muted"}`}
                  >
                    {INVOICE_STATUS_LABEL[inv.status] ?? inv.status}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {inv.status === "entwurf" && (
                  <Button size="sm" variant="outline" onClick={() => send(inv)}>
                    <Send className="mr-1 h-4 w-4" /> Senden
                  </Button>
                )}
                {["gesendet", "teilbezahlt", "mahnung"].includes(inv.status) && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setPayFor(inv);
                      setPay({ amount: String(offen > 0 ? offen : ""), paid_at: todayISO() });
                    }}
                  >
                    <Euro className="mr-1 h-4 w-4" /> Zahlung
                  </Button>
                )}
                {inv.status !== "entwurf" &&
                  inv.status !== "storniert" &&
                  inv.status !== "bezahlt" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => storno(inv)}
                    >
                      <Ban className="mr-1 h-4 w-4" /> Storno
                    </Button>
                  )}
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!payFor} onOpenChange={(o) => !o && setPayFor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zahlung erfassen · {payFor?.invoice_no}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="pa">Betrag (€)</Label>
              <Input
                id="pa"
                inputMode="decimal"
                value={pay.amount}
                onChange={(e) => setPay({ ...pay, amount: e.target.value })}
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="pd">Datum</Label>
              <Input
                id="pd"
                type="date"
                value={pay.paid_at}
                onChange={(e) => setPay({ ...pay, paid_at: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={savePayment}>Zahlung speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
