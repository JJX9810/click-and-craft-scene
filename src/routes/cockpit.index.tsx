import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { db } from "@/cockpit/lib/db";
import { eur, fmtDate, todayISO } from "@/cockpit/lib/format";
import type { Customer, OpenItem, Project, Task } from "@/cockpit/lib/types";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Euro, PiggyBank, ListChecks, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cockpit/")({
  component: Dashboard,
});

function monthStartISO(): string {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

function Dashboard() {
  const [openItems, setOpenItems] = useState<OpenItem[]>([]);
  const [paidMonth, setPaidMonth] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const [oi, pay, tk, cust, proj] = await Promise.all([
        db.from("open_items").select("*").order("days_overdue", { ascending: false }),
        db
          .from("payments")
          .select("amount, paid_at")
          .is("deleted_at", null)
          .gte("paid_at", monthStartISO()),
        db
          .from("tasks")
          .select("*")
          .eq("status", "offen")
          .is("deleted_at", null)
          .lte("due_date", todayISO())
          .order("due_date"),
        db
          .from("customers")
          .select("*")
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(5),
        db
          .from("projects")
          .select("*")
          .is("deleted_at", null)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      if (!active) return;
      setOpenItems((oi.data as OpenItem[]) ?? []);
      setPaidMonth(
        ((pay.data as { amount: number }[]) ?? []).reduce((s, p) => s + Number(p.amount || 0), 0),
      );
      setTasks((tk.data as Task[]) ?? []);
      setCustomers((cust.data as Customer[]) ?? []);
      setProjects((proj.data as Project[]) ?? []);
    };
    load();
    const ch = db
      .channel("rt-dashboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "invoices" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "payments" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "customers" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, load)
      .subscribe();
    return () => {
      active = false;
      db.removeChannel(ch);
    };
  }, []);

  const openSum = openItems.reduce((s, o) => s + Number(o.open_amount || 0), 0);
  const overdue = openItems.filter((o) => o.days_overdue > 0);
  const taxReserve = paidMonth * 0.35;

  const stats = [
    {
      label: "Offene Posten",
      value: eur(openSum),
      hint: `${openItems.length} Rechnung(en)`,
      icon: Euro,
    },
    {
      label: "Überfällig",
      value: String(overdue.length),
      hint: overdue.length ? "bitte prüfen" : "alles im Plan",
      icon: AlertTriangle,
    },
    {
      label: "Umsatz (Monat)",
      value: eur(paidMonth),
      hint: "bezahlt seit Monatsanfang",
      icon: Euro,
    },
    {
      label: "Steuerrücklage 35 %",
      value: eur(taxReserve),
      hint: "auf Monatsumsatz",
      icon: PiggyBank,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live-Überblick · aktualisiert automatisch.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-xl font-semibold tabular-nums">{s.value}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{s.hint}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            <h2 className="text-sm font-semibold">Heutige Aufgaben</h2>
          </div>
          {tasks.length === 0 && (
            <div className="text-sm text-muted-foreground">Keine offenen Aufgaben für heute.</div>
          )}
          <ul className="space-y-2">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between text-sm">
                <span>{t.title}</span>
                <span className="text-xs text-muted-foreground">{fmtDate(t.due_date)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Offene Rechnungen</h2>
            <Link to="/cockpit/rechnungen" className="flex items-center gap-1 text-xs text-primary">
              alle <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {openItems.length === 0 && (
            <div className="text-sm text-muted-foreground">Keine offenen Posten. 🎉</div>
          )}
          <ul className="space-y-2">
            {openItems.slice(0, 6).map((o) => (
              <li key={o.invoice_id} className="flex items-center justify-between text-sm">
                <span className="font-mono text-xs">{o.invoice_no ?? "—"}</span>
                <span className="flex items-center gap-2">
                  {o.days_overdue > 0 && (
                    <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] text-destructive">
                      {o.days_overdue} T. überfällig
                    </span>
                  )}
                  <span className="font-medium tabular-nums">{eur(o.open_amount)}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-semibold">Letzte Kunden</h2>
          {customers.length === 0 && (
            <div className="text-sm text-muted-foreground">Noch keine Kunden.</div>
          )}
          <ul className="space-y-2">
            {customers.map((c) => (
              <li key={c.id}>
                <Link
                  to="/cockpit/kunden/$id"
                  params={{ id: c.id }}
                  className="flex items-center justify-between text-sm hover:text-primary"
                >
                  <span>{c.display_name}</span>
                  <span className="text-xs text-muted-foreground">{c.city ?? ""}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 text-sm font-semibold">Letzte Aufträge</h2>
          {projects.length === 0 && (
            <div className="text-sm text-muted-foreground">Noch keine Aufträge.</div>
          )}
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  to="/cockpit/auftraege/$id"
                  params={{ id: p.id }}
                  className="flex items-center justify-between text-sm hover:text-primary"
                >
                  <span>{p.title}</span>
                  <span className="text-xs text-muted-foreground">{p.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
