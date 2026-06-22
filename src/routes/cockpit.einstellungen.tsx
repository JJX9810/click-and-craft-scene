import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/cockpit/lib/db";
import { useCockpitAuth } from "@/cockpit/lib/auth";
import type { PriceRule, Settings } from "@/cockpit/lib/types";
import { eur } from "@/cockpit/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/cockpit/einstellungen")({
  component: SettingsPage,
});

function SettingsPage() {
  const auth = useCockpitAuth();
  const [s, setS] = useState<Settings | null>(null);
  const [prices, setPrices] = useState<PriceRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const [st, pr] = await Promise.all([
        db.from("settings").select("*").limit(1).single(),
        db.from("price_rules").select("*").order("sort_index"),
      ]);
      setS((st.data as Settings) ?? null);
      setPrices((pr.data as PriceRule[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const set = (patch: Partial<Settings>) => setS((prev) => (prev ? { ...prev, ...patch } : prev));

  const save = async () => {
    if (!s) return;
    setSaving(true);
    try {
      const { error } = await db
        .from("settings")
        .update({
          company_name: s.company_name,
          owner_name: s.owner_name,
          address: s.address,
          phone: s.phone,
          email: s.email,
          web: s.web,
          tax_number: s.tax_number,
          iban: s.iban,
          bic: s.bic,
          legal_note: s.legal_note,
          tax_reserve_pct: s.tax_reserve_pct,
          default_deposit_pct: s.default_deposit_pct,
          default_valid_days: s.default_valid_days,
          default_due_days: s.default_due_days,
          offer_no_prefix: s.offer_no_prefix,
          invoice_no_prefix: s.invoice_no_prefix,
        })
        .eq("id", s.id);
      if (error) throw error;
      toast.success("Einstellungen gespeichert");
    } catch (e: any) {
      toast.error(e?.message ?? "Konnte nicht speichern");
    } finally {
      setSaving(false);
    }
  };

  const updatePrice = async (id: string, unit_price: number) => {
    const { error } = await db.from("price_rules").update({ unit_price }).eq("id", id);
    if (error) toast.error(error.message);
  };

  if (auth.status === "loading" || loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!auth.isAdmin) {
    return (
      <Card className="p-6 text-center text-sm text-muted-foreground">
        Nur Administratoren haben Zugriff auf die Einstellungen.
      </Card>
    );
  }
  if (!s) {
    return (
      <Card className="p-6 text-center text-sm text-muted-foreground">
        Keine Einstellungen gefunden. Bitte Migration anwenden.
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Einstellungen</h1>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold">Firmendaten</h2>
        <div>
          <Label htmlFor="cn">Firma</Label>
          <Input
            id="cn"
            value={s.company_name}
            onChange={(e) => set({ company_name: e.target.value })}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="on">Inhaber</Label>
            <Input
              id="on"
              value={s.owner_name ?? ""}
              onChange={(e) => set({ owner_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="ph">Telefon</Label>
            <Input id="ph" value={s.phone ?? ""} onChange={(e) => set({ phone: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="ad">Adresse</Label>
          <Input
            id="ad"
            value={s.address ?? ""}
            onChange={(e) => set({ address: e.target.value })}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="em">E-Mail</Label>
            <Input id="em" value={s.email ?? ""} onChange={(e) => set({ email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="we">Web</Label>
            <Input id="we" value={s.web ?? ""} onChange={(e) => set({ web: e.target.value })} />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="tx">Steuernummer</Label>
            <Input
              id="tx"
              value={s.tax_number ?? ""}
              onChange={(e) => set({ tax_number: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="ib">IBAN</Label>
            <Input id="ib" value={s.iban ?? ""} onChange={(e) => set({ iban: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="bi">BIC</Label>
            <Input id="bi" value={s.bic ?? ""} onChange={(e) => set({ bic: e.target.value })} />
          </div>
        </div>
        {(!s.tax_number || !s.iban) && (
          <p className="text-xs text-amber-600">
            Hinweis: Steuernummer und/oder IBAN sind noch leer – für Rechnungen bitte ergänzen.
          </p>
        )}
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold">Beträge & Nummernkreise</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="tr">Steuerrücklage (%)</Label>
            <Input
              id="tr"
              type="number"
              value={s.tax_reserve_pct}
              onChange={(e) => set({ tax_reserve_pct: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="dp">Standard-Anzahlung (%)</Label>
            <Input
              id="dp"
              type="number"
              value={s.default_deposit_pct}
              onChange={(e) => set({ default_deposit_pct: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="op">Präfix Angebote</Label>
            <Input
              id="op"
              value={s.offer_no_prefix}
              onChange={(e) => set({ offer_no_prefix: e.target.value })}
            />
            <p className="mt-1 text-[11px] text-muted-foreground">nächste Nr.: {s.offer_no_next}</p>
          </div>
          <div>
            <Label htmlFor="ip">Präfix Rechnungen</Label>
            <Input
              id="ip"
              value={s.invoice_no_prefix}
              onChange={(e) => set({ invoice_no_prefix: e.target.value })}
            />
            <p className="mt-1 text-[11px] text-muted-foreground">
              nächste Nr.: {s.invoice_no_next}
            </p>
          </div>
        </div>
        <div>
          <Label htmlFor="lg">Rechtshinweis (§19)</Label>
          <Input
            id="lg"
            value={s.legal_note}
            onChange={(e) => set({ legal_note: e.target.value })}
          />
        </div>
      </Card>

      <Button onClick={save} disabled={saving}>
        {saving ? "Speichern …" : "Speichern"}
      </Button>

      <Card className="space-y-3 p-5">
        <h2 className="text-sm font-semibold">Preisliste</h2>
        <p className="text-xs text-muted-foreground">
          Preise je Einheit. Änderung wird sofort gespeichert.
        </p>
        <div className="divide-y">
          {prices.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{p.label}</div>
                <div className="text-[11px] text-muted-foreground">
                  {p.category} · {p.unit}
                  {p.min_amount ? ` · min ${eur(p.min_amount)}` : ""}
                </div>
              </div>
              <div className="w-28">
                <Input
                  inputMode="decimal"
                  defaultValue={p.unit_price ?? ""}
                  placeholder="auf Anfrage"
                  onBlur={(e) => {
                    const v = e.target.value.trim();
                    if (v === "") return;
                    updatePrice(p.id, Number(v.replace(",", ".")));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
