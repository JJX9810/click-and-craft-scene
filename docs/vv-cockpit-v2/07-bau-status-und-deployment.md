# 07 — Bau-Status & Deployment (V1-Grundlage)

> Stand dieser Session: Die **lauffähige V1-Grundlage** wurde gebaut und in diese App integriert
> (Cockpit unter `/cockpit/*`, gleiche Supabase-/Cloudflare-Basis wie die Website).

## Was gebaut wurde

**Datenbank (Migrationen in `supabase/migrations/`):**
- `20260622120000_vv_cockpit_v2_core.sql` — Trigger (`updated_at`, Actor, Audit), `audit_log`,
  `profiles` (+ Auto-Anlage), `settings` (Singleton, **echte Firmendaten geseedet**),
  konkurrenzsichere Nummernkreise (`cockpit_next_number`), `price_rules` (**echte Preise geseedet**).
- `20260622120001_vv_cockpit_v2_business.sql` — alle Geschäftstabellen (customers, projects, measurements,
  measurement_rooms, offers, offer_items, invoices, invoice_items, payments, bookings, expenses, files,
  tasks, materials, mileage_log, nexus_memory), **RLS-Policies**, **Audit-Trigger** auf Finanztabellen,
  **Rechnungs-Immutabilität**, **automatische Zahlungsverrechnung**, **`open_items` als berechnete View**,
  **Realtime-Publication** für PC/Handy-Sync.

**Frontend (`src/cockpit/` + `src/routes/cockpit.*`):**
- Datenschicht: `lib/db.ts` (gemeinsamer Supabase-Client), `lib/types.ts`, `lib/format.ts` (de-DE €),
  `lib/auth.ts` (Nutzer/Rolle), `lib/useRealtimeQuery.ts` (Liste + Realtime).
- `cockpit.tsx` — Mobile-First-Layout: Auth-Guard, Desktop-Sidebar, **fixierte Bottom-Nav** fürs Handy.
- `cockpit.index.tsx` — Dashboard (offene Posten, Überfällig, Monatsumsatz, **Steuerrücklage 35 %**,
  heutige Aufgaben, offene Rechnungen, letzte Kunden/Aufträge) mit Realtime.
- `cockpit.kunden.index.tsx` / `.$id.tsx` — Kundenliste (Suche, Anlegen) + Detail (bearbeiten,
  Aufträge, Soft-Delete, Anruf-Link).
- `cockpit.auftraege.index.tsx` / `.$id.tsx` — Aufträge (Status-Filter, Anlegen) + Detail
  (Status-Workflow, Fortschritt, Termine, Notizen, Nachkalkulation).
- `cockpit.angebote.index.tsx` — Angebote (Anlegen mit Nummernkreis, Status, **Umwandlung in Rechnung**).
- `cockpit.rechnungen.index.tsx` — Rechnungen (§19-Hinweis, Senden, **Zahlung erfassen**, Storno;
  Status/paid_total werden automatisch verrechnet).
- `cockpit.einstellungen.tsx` (nur Admin) — Firmendaten, Steuerrücklage/Anzahlung, Nummernkreise, Preisliste.

## So nimmst du es in Betrieb (3 Schritte)

1. **Migrationen anwenden** (im Supabase-Projekt):
   - Lovable/Supabase: die zwei SQL-Dateien aus `supabase/migrations/` ausführen
     (Supabase Studio → SQL Editor, oder `supabase db push`).
   - Reihenfolge: erst `…120000_core`, dann `…120001_business`.
2. **Nutzer anlegen** (Reihenfolge wichtig):
   - **Justus zuerst** unter `/login` registrieren → wird automatisch **Admin**.
   - **Justin danach** → wird **user** (eingeschränkt; keine Einstellungen/Buchhaltung). Erfüllt
     „Justin nicht automatisch Admin".
3. **Öffnen:** Cockpit unter **`/cockpit`** aufrufen (Handy & PC, gleicher Login).

## Wichtige Hinweise

- **Routen-Generierung:** TanStack Router erzeugt `src/routeTree.gen.ts` automatisch bei `vite build`/
  `vite dev`. Die neuen `/cockpit`-Routen werden dabei registriert. **In dieser Sandbox konnte der Build
  nicht laufen** (einige npm-Pakete waren blockiert/403), daher wurde der Routen-Tree hier **nicht**
  regeneriert — das passiert beim nächsten Build in der Lovable-/Deploy-Pipeline automatisch.
- **Typen:** Die Cockpit-Tabellen sind noch nicht in `src/integrations/supabase/types.ts`. Nach dem
  Anwenden der Migrationen können die Typen via Supabase-CLI neu generiert werden; bis dahin nutzt die
  Datenschicht denselben Client ungetypt (`lib/db.ts`).
- **PC/Handy-Sync:** läuft über Supabase Realtime (kein eigener Sync-Code). Test: auf dem PC eine Zahlung
  erfassen → erscheint ohne Reload auf dem Handy.

## Bewusst noch NICHT enthalten (nächste Iterationen)
- Aufmaß-Modul (UI), Datei-/Foto-Upload-UI (Storage-Bucket `cockpit` anlegen), PDF-Erzeugung,
  Positions-Editor für Angebote/Rechnungen (aktuell eine Sammelposition), Buchhaltung-UI, NEXUS,
  Notfall-Export-UI. Schema dafür ist teils schon vorhanden.

## Offene Punkte
- Storage-Bucket `cockpit` (privat) für Dateien anlegen, sobald das Datei-Modul gebaut wird.
- `.env` aus Git nehmen (siehe Sicherheitskonzept, Datei 04).
- Eigenes Supabase-Projekt fürs Cockpit erwägen (Trennung von Website-Daten, Datei 02).
