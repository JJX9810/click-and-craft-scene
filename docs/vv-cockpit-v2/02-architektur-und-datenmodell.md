# 02 — Zielarchitektur, Technik-Vergleich & Datenmodell

---

## 1. Zielarchitektur (Überblick)

```
   ┌──────────────────────────┐         ┌──────────────────────────────────────────┐
   │  Browser (PC & Handy)    │         │  Supabase (EU-Region, Frankfurt)           │
   │  React/TanStack Start    │  HTTPS  │  ┌────────────┐  ┌──────────┐  ┌────────┐  │
   │  - UI (Mobile-First)     │ ───────▶│  │ Auth (JWT) │  │ Postgres │  │Storage │  │
   │  - TanStack Query Cache  │         │  └────────────┘  │ + RLS    │  │(Fotos/ │  │
   │  - Realtime-Abo          │◀────────│  Realtime ◀──────┤ + Trigger│  │ PDFs)  │  │
   └──────────────────────────┘  Push   │                  └──────────┘  └────────┘  │
            ▲                            │  Edge Functions (Secrets: PDF, NEXUS-KI)   │
            │ Hosting/CDN/Edge           └──────────────────────────────────────────┘
   ┌────────┴───────────┐
   │ Cloudflare Pages/  │   ← hostet nur das Frontend (wie heute)
   │ Workers            │
   └────────────────────┘
```

- **Frontend:** Browser-App, Mobile-First, gehostet auf Cloudflare (Status quo beibehalten).
- **Backend/API:** Supabase (Postgres + Auto-API) + Edge Functions für PDF-Erzeugung und NEXUS-KI.
- **Zentrale DB:** Postgres = **einzige verbindliche Quelle**.
- **Dateispeicher:** Supabase Storage (private Buckets, signierte URLs).
- **Automatisches Speichern:** jede Mutation schreibt sofort in die DB (kein lokaler Voll-State).
- **Automatische PC/Handy-Aktualisierung:** Supabase Realtime (DB-Änderung → Push an alle Geräte).
- **Benutzer/Rollen:** Supabase Auth + `user_roles`/`has_role()` (bereits im Repo vorhanden).

---

## 2. Technik-Vergleich: Variante A vs. Variante B

| Kriterium | **A: Cloudflare** (Pages, Access, Workers, D1, R2) | **B: Supabase** (Auth, Postgres, Storage) |
|---|---|---|
| **Einrichtungsaufwand** | Mittel–hoch: Access-Policies, Worker-Bindings, D1-Migrationen via Wrangler-CLI | **Niedrig:** im Projekt bereits eingerichtet; Studio-UI statt CLI |
| **Stabilität** | D1 noch jung; SQLite-Limits bei Parallelität | **Hoch:** Postgres ist ausgereift, transaktionssicher, echte Constraints |
| **PC/Handy-Sync** | ❌ **Kein** eingebautes Realtime → Eigenbau (Polling/Durable Objects) nötig | ✅ **Realtime eingebaut**, im Repo bereits aktiv |
| **Datei-Handling (Foto/PDF)** | R2 sehr gut (S3-kompatibel) | ✅ Storage sehr gut: Policies, signierte URLs, Bild-Transformationen |
| **Datenschutz/DSGVO** | EU möglich, aber Daten-Residency bei D1/Edge granular schwieriger | ✅ **EU-Region (Frankfurt)** + AVV/DPA klar wählbar |
| **Kosten** | Sehr niedrig (großzügige Free-Tiers) | Free-Tier reicht für Start; Pro ~25 $/Monat bei Bedarf |
| **Erweiterbarkeit (KI/NEXUS)** | Workers + Bindings, mehr Eigenbau | ✅ Edge Functions + pgvector (KI-Memory) nativ |
| **Wartung durch Nicht-Entwickler** | ⚠️ CLI-lastig, weniger UI | ✅ **Studio:** Tabellen/Nutzer/Dateien/Logs per Klick |
| **Risiko: erneutes Sync-/Backup-Chaos** | ⚠️ **Hoch** (Sync-Eigenbau = alte Falle) | ✅ **Niedrig** (DB = einzige Quelle, Realtime verteilt) |
| **Vorhandene Substanz im Projekt** | nur Hosting (Wrangler) | ✅ **Auth, Rollen, RLS, Realtime, Preislogik schon da** |

### Empfehlung: **Variante B (Supabase)** — eindeutig.
**Entscheidender Grund:** Ihr Kernproblem war selbstgebauter Sync und Backup-als-Speicher. Supabase liefert
**Realtime-Sync und eine echte zentrale DB** fertig — D1 nicht. Mit A würden Sie den Sync erneut bauen.
Zusätzlich ist B im Projekt bereits vorhanden, EU-DSGVO-tauglich und ohne Entwickler wartbar.

> **Cloudflare wird nicht ersetzt:** Es bleibt der **Hoster** des Frontends. Sie nutzen also weiter
> Cloudflare-Hosting **und** Supabase-Backend — das ist die heutige, bewährte Aufstellung.

### Wichtige Architektur-Entscheidung: **eigenes Supabase-Projekt fürs Cockpit**
Die Marketing-Website erlaubt `anon`-INSERTs (Tracking). Finanz-/Kundendaten gehören **nicht** in dieselbe DB.
**Empfehlung:** ein **separates Supabase-Projekt** „vv-cockpit" (EU-Region), das die bewährten Auth-/RLS-Muster
**wiederverwendet**, aber eine saubere Sicherheitsgrenze zur öffentlichen Website zieht. (2 Nutzer → ein Login
je Projekt ist akzeptabel.)

---

## 3. Feste technische Regeln (verbindlich)

1. **Postgres = Hauptspeicher.** Kein lokaler Voll-State als Wahrheit. UI-Cache (TanStack Query) ist nur Cache.
2. **Schreiben nur online.** Kein Offline-Schreib-Merge in V1 (vermeidet Konfliktauflösung = alte Falle).
   Offline werden Daten **lesbar** (Cache), Schreiben erfordert Verbindung.
3. **Geld als `numeric(12,2)`**, niemals Float. Steuer/Beträge nachvollziehbar gerundet.
4. **Soft Delete:** `deleted_at timestamptz NULL`. Standard-Queries filtern `deleted_at IS NULL`.
5. **Audit-Spalten überall:** `created_at`, `updated_at`, `created_by`, `updated_by` (über Trigger gesetzt).
6. **Finanz-Immutability:** gesendete/bezahlte Rechnungen sind unveränderlich → Korrektur nur per Storno/
   Korrekturrechnung. Jede Finanzänderung → `audit_log`.
7. **RLS auf jeder Tabelle**, Default-Deny. `anon` hat **keinen** Zugriff auf Cockpit-Tabellen.
8. **Dateien nur als Referenz** (`files.storage_path`), nie als Base64/BLOB in Fachtabellen.
9. **Nummernkreise konkurrenzsicher** über Postgres-Sequenz/transaktionalen Zähler (keine Lücken-/Dublettengefahr).
10. **Secrets serverseitig** (Edge-Function-Secrets/Env), nie im Frontend-Bundle.

---

## 4. Datenmodell

**Konventionen für alle Tabellen:** `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`,
Audit-Spalten (`created_at`, `updated_at`, `created_by`, `updated_by`), `deleted_at` für Soft Delete,
optional `legacy_id text` (Migrationsherkunft). RLS aktiv. Beträge `numeric(12,2)`.

### Beziehungsübersicht
```
roles ─< user_roles >─ users(=auth.users) ─1:1─ profiles
customers ─< projects ─< measurements ─< measurement_rooms
projects ─< offers ─< offer_items
offers 1─0..1 invoices ─< invoice_items
invoices ─< payments
invoices 1─0..1 open_items        (open_items: ABGELEITET, nicht handgepflegt)
projects/customers ─< files        (polymorph: owner_type/owner_id)
bookings (Einnahmen/Ausgaben) ─0..1 invoices ; expenses ─0..1 files(Beleg)
tasks ─ optional an customer/project
settings (Singleton) ; price_rules (Preisliste) ; nexus_memory ; audit_log (append-only)
```

---

### 4.1 `users` (= `auth.users`) & `profiles`
- **Zweck:** Identität von Justus & Justin. `auth.users` verwaltet Supabase Auth; eigene Stammdaten in `profiles`.
- **profiles-Felder:** `id` (= auth.users.id, PK/FK), `display_name`, `phone`, `is_active bool`, Audit-Spalten.
- **Beziehungen:** 1:1 zu `auth.users`; 1:n zu allen `created_by/updated_by`.
- **Pflicht:** `id`, `display_name`.
- **Status:** `is_active`.
- **Sicherheit:** RLS: jeder sieht/ändert nur sein Profil; Admin sieht alle. Keine Passwörter hier (in Auth).

### 4.2 `roles`
- **Zweck:** Rollendefinition. Bereits als ENUM `app_role ('admin','user')` vorhanden.
- **Empfehlung:** ENUM beibehalten; optional zu `roles`-Tabelle (`key`, `label`, `description`) erweitern,
  falls feinere Rollen (`mitarbeiter`, `buchhaltung`) später nötig.
- **Pflicht:** `key`.
- **Sicherheit:** nur Admin/Service darf Rollen vergeben.

### 4.3 `user_roles` (vorhanden — wiederverwenden)
- **Zweck:** Zuordnung Nutzer↔Rolle.
- **Felder:** `id`, `user_id` (FK auth.users), `role app_role`, `created_at`. UNIQUE(user_id, role).
- **Regel:** Trigger `handle_new_user_role()` macht **ersten** Nutzer = `admin`, alle weiteren = `user`.
  → **Justus zuerst registrieren** (wird admin), **Justin danach** (wird `user`). Erfüllt „Justin nicht automatisch Admin".
- **Sicherheit:** RLS vorhanden; `EXECUTE` auf `has_role()` nur für `authenticated/service_role`.

### 4.4 `customers`
- **Zweck:** Kundenkartei.
- **Wichtige Felder:** `customer_no` (eindeutig), `type` (privat/gewerblich), `display_name`, `company`,
  `first_name`, `last_name`, `email`, `phone`, `street`, `zip`, `city`, `notes`, `tags text[]`, Audit, `deleted_at`.
- **Beziehungen:** 1:n `projects`, `offers`, `invoices`, `files`.
- **Pflicht:** `display_name`; (mind. eine Kontaktangabe empfohlen).
- **Status:** `is_active` / `deleted_at`.
- **Datenschutz:** **personenbezogen** → Auskunfts-/Löschpflicht (DSGVO); Löschung als Soft Delete, harte Löschung
  nur nach Ablauf gesetzlicher Aufbewahrung verknüpfter Rechnungen. Zugriff nur authentifiziert.

### 4.5 `projects` (Aufträge/Projekte)
- **Zweck:** Auftrag/Projekt zu einem Kunden.
- **Felder:** `project_no`, `customer_id` (FK), `title`, `service_type` (Bodenverlegung/Küche/…),
  `status` (siehe unten), `description`, `address_override` (falls Baustelle ≠ Kundenadresse),
  `start_date`, `due_date`, `done_date`, `internal_notes`, `progress_pct`,
  `calc_cost numeric`, `calc_revenue numeric` (Nachkalkulation), Audit, `deleted_at`.
- **Beziehungen:** n:1 `customers`; 1:n `measurements`, `offers`, `invoices`, `files`, `tasks`.
- **Pflicht:** `customer_id`, `title`.
- **Status:** `anfrage` → `besichtigung` → `angebot` → `beauftragt` → `in_arbeit` → `abgeschlossen` → `storniert`.
- **Sicherheit:** RLS authentifiziert; `internal_notes` für Kunden nie sichtbar (kein Kundenportal in V1).

### 4.6 `measurements` (Aufmaß) & 4.7 `measurement_rooms`
- **`measurements`-Zweck:** Ein Aufmaß-Dokument je Projekt/Termin.
- **measurements-Felder:** `project_id` (FK), `measured_at`, `measured_by`, `note`, `total_qm`, `total_lfm`,
  `pdf_file_id` (FK files), Audit, `deleted_at`.
- **`measurement_rooms`-Zweck:** Räume innerhalb eines Aufmaßes.
- **rooms-Felder:** `measurement_id` (FK), `room_name`, `area_qm numeric`, `skirting_lfm numeric` (Sockelleisten),
  `old_floor_type`, `old_floor_remove bool`, `extras jsonb` (Zusatzleistungen: Dämmung, Spachteln…),
  `sort_index int`, Audit.
- **Beziehungen:** `measurements` n:1 `projects`; `measurement_rooms` n:1 `measurements`; Fotos via `files`.
- **Pflicht:** `project_id` (measurement), `measurement_id` + `room_name` (room).
- **Status:** Aufmaß ist Datenerfassung; „abgeschlossen" über Projekt-Status.
- **Hinweis:** Preise/Zusatzleistungen referenzieren `price_rules` (Werte aus `Kostenrechner.tsx`).

### 4.8 `offers` (Angebote) & 4.9 `offer_items`
- **`offers`-Zweck:** Angebot.
- **offers-Felder:** `offer_no` (Nummernkreis), `customer_id`, `project_id` (nullable),
  `status` (`entwurf`/`gesendet`/`angenommen`/`abgelehnt`/`abgelaufen`), `issue_date`, `valid_until`,
  `subtotal`, `tax_rate` (bei §19 = 0), `tax_amount`, `total`, `note`, `pdf_file_id`, `accepted_at`,
  `converted_invoice_id` (FK), Audit, `deleted_at`.
- **`offer_items`-Felder:** `offer_id`, `position`, `description`, `qty numeric`, `unit` (m²/lfm/Stk/psch),
  `unit_price`, `line_total`, `price_rule_id` (nullable), Audit.
- **Beziehungen:** `offers` n:1 `customers`/`projects`; 1:n `offer_items`; 0..1 → `invoices` (Umwandlung).
- **Pflicht:** `offer_no`, `customer_id`, mind. 1 Position.
- **Status:** s. o.; nach `gesendet` Positionen sperren (Änderung → neue Version).
- **Sicherheit:** §19-Hinweis (keine USt.) zentral aus `settings`. PDF in Storage.

### 4.10 `invoices` (Rechnungen) & 4.11 `invoice_items`
- **`invoices`-Zweck:** Rechnung. **Rechtsrelevant, unveränderlich nach Versand.**
- **invoices-Felder:** `invoice_no` (lückenloser Nummernkreis!), `customer_id`, `project_id`, `offer_id` (Herkunft),
  `status` (`entwurf`/`gesendet`/`teilbezahlt`/`bezahlt`/`storniert`/`mahnung`),
  `issue_date`, `due_date`, `subtotal`, `tax_rate` (0 bei §19), `tax_amount`, `total`,
  `paid_total` (abgeleitet aus payments), `is_kleinunternehmer bool` (Default aus settings),
  `cancels_invoice_id` (Storno-Referenz), `pdf_file_id`, `dunning_level int`, Audit, `deleted_at`.
- **`invoice_items`-Felder:** wie `offer_items`, plus `invoice_id`.
- **Beziehungen:** n:1 `customers`/`projects`/`offers`; 1:n `invoice_items`, `payments`; 1:0..1 `open_items`.
- **Pflicht:** `invoice_no`, `customer_id`, `issue_date`, mind. 1 Position.
- **Status:** s. o. **Regel:** ab `gesendet` keine inhaltliche Änderung; Korrektur nur per Storno + Neu.
- **Sicherheit/Recht:** §19 UStG-Hinweis im PDF („Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."),
  **GoBD/§147 AO: 10 Jahre Aufbewahrung** → **kein Hard Delete** vor Fristablauf; jede Änderung → `audit_log`.

### 4.12 `payments` (Zahlungen)
- **Zweck:** Zahlungseingänge (auch Teilzahlungen, Anzahlungen).
- **Felder:** `invoice_id` (FK, nullable für Anzahlung ohne Rechnung), `amount`, `paid_at`, `method`
  (überweisung/bar/…), `reference`, `is_deposit bool`, `note`, Audit, `deleted_at`.
- **Beziehungen:** n:1 `invoices`.
- **Pflicht:** `amount`, `paid_at`.
- **Sicherheit:** Finanzdaten → `audit_log`; Stornierung statt Löschung bevorzugt.

### 4.13 `open_items` (Offene Posten) — **ABGELEITET, nicht handgepflegt**
- **Zweck:** Single-Source-Übersicht offener Beträge. **Erfüllt „keine widersprüchlichen offenen Posten".**
- **Empfehlung:** als **VIEW** oder per-Trigger gepflegte Tabelle aus `invoices.total − Σ payments.amount`.
  **Nie manuell editierbar.**
- **Felder (falls Tabelle):** `invoice_id` (unique), `open_amount`, `due_date`, `days_overdue`,
  `dunning_level`, `last_payment_at` — alle via Trigger berechnet.
- **Status:** `offen`/`teilbezahlt`/`überfällig`/`ausgeglichen`.
- **Sicherheit:** read-only für Nutzer; Schreibrecht nur Trigger/Service.

### 4.14 `bookings` (Buchhaltung: Einnahmen/Ausgaben)
- **Zweck:** EÜR-Grundlage: Einnahmen & Ausgaben, Kategorien, Steuer-/Privatbuchungen.
- **Felder:** `booking_date`, `type` (`einnahme`/`ausgabe`/`privatentnahme`/`privateinlage`/`steuerruecklage`),
  `category` (FK/Enum), `amount`, `description`, `invoice_id` (nullable), `expense_id` (nullable),
  `tax_reserve_amount` (35 %-Rücklage), Audit, `deleted_at`.
- **Beziehungen:** 0..1 `invoices`, 0..1 `expenses`.
- **Pflicht:** `booking_date`, `type`, `amount`.
- **Status:** ggf. `vorlaeufig`/`festgeschrieben`.
- **Sicherheit:** **nur Admin** (Justus); jede Änderung → `audit_log`; nach Festschreibung unveränderlich.

### 4.15 `expenses` (Ausgaben/Belege)
- **Zweck:** Betriebsausgaben mit Beleg.
- **Felder:** `expense_date`, `vendor`, `category`, `net_amount`, `gross_amount`, `description`,
  `receipt_file_id` (FK files), `is_deductible bool`, Audit, `deleted_at`.
- **Beziehungen:** 1:0..1 `files` (Beleg); 0..1 `bookings`.
- **Pflicht:** `expense_date`, `gross_amount`, `receipt_file_id` (Beleg empfohlen).
- **Sicherheit:** nur Admin; Beleg in Storage; 10 Jahre Aufbewahrung.

### 4.16 `files` (Dateien — Metadaten, **keine Blobs**)
- **Zweck:** Zentrale Datei-Registry für Fotos, PDFs, Belege, Aufmaßbilder.
- **Felder:** `bucket`, `storage_path` (eindeutig), `original_name`, `mime_type`, `size_bytes`,
  `sha256` (Dedup), `owner_type` (`customer`/`project`/`offer`/`invoice`/`measurement`/`expense`),
  `owner_id` (uuid), `kind` (`foto`/`pdf`/`beleg`/`aufmass`/`sonstige`), `width`/`height` (Bilder),
  Audit, `deleted_at`.
- **Beziehungen:** polymorph über `owner_type`/`owner_id`.
- **Pflicht:** `bucket`, `storage_path`, `mime_type`, `owner_type`, `owner_id`.
- **Regel:** **keine Base64-Dopplungen** — bei gleichem `sha256` Referenz wiederverwenden.
- **Sicherheit:** **private Buckets**, Zugriff nur über **kurzlebige signierte URLs**; RLS spiegelt Owner-Rechte.

### 4.17 `tasks` (Aufgaben)
- **Zweck:** To-dos / heutige Aufgaben fürs Dashboard; auch von NEXUS erzeugbar.
- **Felder:** `title`, `due_date`, `status` (`offen`/`erledigt`/`verschoben`), `priority`,
  `assignee_id` (FK profiles), `customer_id`/`project_id` (nullable), `source` (`manuell`/`nexus`/`system`),
  Audit, `deleted_at`.
- **Beziehungen:** 0..1 `customers`/`projects`; n:1 `profiles` (assignee).
- **Pflicht:** `title`.
- **Status:** s. o.
- **Sicherheit:** Nutzer sehen eigene + zugewiesene; Admin sieht alle.

### 4.18 `settings` (Einstellungen — Singleton)
- **Zweck:** Firmendaten, Nummernkreise, Quoten, Defaults.
- **Felder:** `company_name`, `owner_name`, `address`, `tax_number`, `iban`, `bic`, `logo_file_id`,
  `is_kleinunternehmer bool`, `kleinunternehmer_note text`, `tax_reserve_pct numeric` (Default 0.35),
  `default_deposit_pct numeric`, `offer_no_prefix`/`offer_no_next`, `invoice_no_prefix`/`invoice_no_next`,
  `default_valid_days`, `default_due_days`, Audit.
- **Beziehungen:** referenziert von Angeboten/Rechnungen (Defaults).
- **Pflicht:** `company_name`, Nummernkreis-Felder.
- **Sicherheit:** **nur Admin** schreibt; Nummernkreis-Vergabe über **transaktionssichere Sequenz** (keine Dubletten).

### 4.19 `price_rules` (Preis-/Leistungslisten)
- **Zweck:** Zentrale Preisliste; Seed aus `Kostenrechner.tsx`.
- **Felder:** `key`, `label`, `category` (boden/sockel/zusatz/küche/anfahrt), `unit` (m²/lfm/Stk/psch/%),
  `unit_price numeric NULL` (null = „auf Anfrage"), `min_amount numeric NULL`, `is_active bool`,
  `valid_from`, `sort_index`, Audit.
- **Seed-Beispiele (real):** `laminat_schwimmend` 16 €/m², `vinyl_verklebt` 22 €/m², `pvc_schwimmend` 12 €/m²,
  `sockel` 5 €/lfm, `sockel_gehrung` 7 €/lfm, `altboden_schwimmend` 4 €/m², `altboden_verklebt` 7 €/m²,
  `daemmung` 1,5 €/m², `spachteln` 19 €/m², `kueche_montage` 189 €/lfm, `anfahrt_pro_km` 0,70 €,
  `materialservice` 15 % (min 150 €).
- **Pflicht:** `key`, `label`, `unit`.
- **Sicherheit:** nur Admin ändert Preise; Historie über `valid_from`/`audit_log`.

### 4.20 `nexus_memory` (KI-/Such-Gedächtnis)
- **Zweck:** Speicher für NEXUS (Befehle, Kontext, später KI-Agenten-Memory).
- **Felder:** `kind` (`note`/`command`/`embedding`), `content text`, `embedding vector` (pgvector, später),
  `related_type`/`related_id`, `created_by`, Audit, `deleted_at`.
- **Beziehungen:** optional polymorph zu Fachobjekten.
- **Pflicht:** `kind`, `content`.
- **Sicherheit:** **keine API-Keys hier** — Keys in Edge-Function-Secrets. RLS: nur Eigentümer/Admin.

### 4.21 `audit_log` (Protokoll — append-only)
- **Zweck:** Nachvollziehbarkeit kritischer (v. a. Finanz-)Änderungen.
- **Felder:** `table_name`, `record_id`, `action` (`insert`/`update`/`delete`/`status_change`),
  `old_values jsonb`, `new_values jsonb`, `changed_by`, `changed_at`, `ip`/`user_agent` (optional).
- **Beziehungen:** zeigt logisch auf beliebige Tabelle (`table_name`/`record_id`).
- **Pflicht:** `table_name`, `record_id`, `action`, `changed_by`, `changed_at`.
- **Sicherheit:** **append-only** (kein UPDATE/DELETE, auch nicht Admin); per Trigger gefüllt für
  `invoices`, `payments`, `bookings`, `expenses`, `settings`, `price_rules`, `user_roles`.

---

## 5. Addendum: Abgleich mit dem echten Alt-Datenmodell

Das echte Alt-`data`-Objekt hat **22 Collections** (s. `06-altcockpit-ist-analyse.md` §3). Die Kerntabellen
oben decken den MVP ab. Zusätzlich aus dem Altbestand abgeleitet:

### Neue Tabellen (über die Pflichtliste hinaus)
- **`mileage_log`** (aus `mileage`) — Fahrtenbuch: `date`, `from`, `to`, `km`, `purpose`, `project_id?`,
  `rate numeric`, Audit. EÜR-relevant. **V1.1**.
- **`materials`** (aus `materials`/`materialCalcs`) — Materialkatalog/-positionen: `name`, `unit`, `unit_price`,
  `supplier?`, `project_id?` (Verbrauch), Audit. **V1.1**.
- **`recurring`** (aus `recurring`) — wiederkehrende Posten/Rechnungen: `template jsonb`, `interval`,
  `next_run`, `active`. **V2**.
- **`activities`** (aus `timeline`) — Kommunikations-/Aktivitäts-Timeline je Kunde/Projekt:
  `owner_type`, `owner_id`, `kind`, `note`, `at`. **V1.1**.
- **Content-/Marketing-Tabellen** (aus `marketingAssets`, `marketingCampaigns`, `contentDrafts`,
  `publishLog`, `approvalRequests`) — NEXUS-/Content-Pipeline. **V2** (eigenes Modul).

### Mapping-Übersicht (alt → V2)
| Alt-Collection | V2 | Phase |
|---|---|---|
| `leads` | `customers.stage='lead'` | V1 |
| `customers` | `customers` | V1 |
| `measurements` + Räume | `measurements` + `measurement_rooms` | V1 |
| `projects` | `projects` | V1 |
| `offers` | `offers` + `offer_items` | V1 |
| `invoices` | `invoices` + `invoice_items` | V1 |
| `payments` (inkl. Bank-CSV) | `payments` | V1 |
| `openItems` | `open_items` (**View**) | V1 |
| `bookings` | `bookings` | V1.1 |
| `documents` (Base64!) | `files` + Storage | V1 |
| `staff` | `profiles` | V1 |
| `counters` | `settings` + Sequenz | V1 |
| `mileage` | `mileage_log` | V1.1 |
| `materials`/`materialCalcs` | `materials` | V1.1 |
| `timeline` | `activities` | V1.1 |
| `recurring` | `recurring` | V2 |
| `marketing*`/`contentDrafts`/`publishLog`/`approvalRequests` | Content-Modul | V2 |
| `priceCalculations` | Angebotsentwürfe/`calculations` | V2 |
| `nexusBrainUser` | `nexus_memory` | V2 |
| `openItemOverrides` | ❌ **gestrichen** (Anti-Pattern) | — |

### Settings/Preise-Seed (real)
`settings` mit den echten Werten seeden (Datei 06 §4): §19-Hinweis, `tax_reserve_pct=0.35`,
`default_deposit_pct=0.40`; `tax_number`/`iban` sind im Alt-System **leer** → nachtragen.
`price_rules` aus `FLOOR_PRICES`/`REMOVAL_PRICES` (Datei 06 §5); **Differenzen zur Website klären**
(Anfahrt 35↔30 km, Spachtel 8↔19 €/m²) → **eine** verbindliche Preisliste.
