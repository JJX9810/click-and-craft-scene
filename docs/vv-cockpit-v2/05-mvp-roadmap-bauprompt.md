# 05 — MVP, Roadmap & konkreter Claude-Bauprompt

---

## 1. MVP-Plan Version 1 (Ziel: stabiler Ersatz des Alt-Cockpits)

**Leitgedanke:** V1 ist das **kleinste vollständige System**, das den unzuverlässigen Alt-Stand sicher ersetzt:
zentrale DB, Auto-Speichern, automatische PC/Handy-Aktualisierung, Dateien in Storage, Notfall-Backup.

### Bau-Reihenfolge (Schritte)
1. **Projekt-Setup:** eigenes Supabase-Projekt (EU), Auth an, Realtime an, `.env` korrekt (gitignored).
2. **Auth + Rollen:** Muster aus dem Repo übernehmen (`user_roles`, `has_role`, first-user-admin). Login-Seite.
3. **Schema (Migrationen):** alle Tabellen aus Datei 02 + RLS-Policies + Audit-Trigger + Nummernkreis-Sequenz.
4. **Einstellungen:** Firmendaten, Nummernkreise, §19-Hinweis; `price_rules` aus `Kostenrechner.tsx` seeden.
5. **Kunden** (CRUD, Suche, Soft Delete).
6. **Projekte** (CRUD, Status, Tabs).
7. **Angebote** (Positionen aus Preisliste, PDF, → Rechnung).
8. **Rechnungen** (PDF, §19, Status, Immutability, audit_log).
9. **Zahlungen + Offene Posten** (berechnet/View).
10. **Dateien** (Storage-Upload, Handy-Kamera, Dedup, signierte URLs).
11. **Dashboard** (offene Posten, heutige Aufgaben, Warnungen, letzte Kunden/Aufträge, Umsatz/Liquidität).
12. **Notfall-Export** (nightly Edge Function + On-Demand-Button).
13. **Migration** aus Alt-Backup (Staging → Prüfung → Promotion).

## 2. Funktionsumfang Version 1 (enthalten)
- Login (2 Nutzer, Rollen admin/user), server-seitige Prüfung, RLS.
- Kundenkartei, Aufträge/Projekte (inkl. Basis-Aufmaß: Räume, m², lfm, Fotos).
- Angebote → PDF → Umwandlung in Rechnung.
- Rechnungen → PDF, §19-Hinweis, Zahlungsstatus, Teilzahlung, Storno.
- Zahlungen + **berechnete** offene Posten.
- Dateien in Storage (kein Base64), Handy-Kamera-Upload.
- Dashboard, Einstellungen (Firma/Preise/Nummernkreise/Benutzer/Backup).
- Realtime PC↔Handy, automatisches Speichern.
- Notfall-Backup/Export + getestetes Restore.
- Migration des Alt-Datenbestands.

## 3. Bewusst NICHT in Version 1
- ❌ Volle Buchhaltung/EÜR-Export (→ V1.1/V2), Privatentnahmen-Auswertung.
- ❌ Automatisches Mahnwesen mit Mahn-PDFs (→ V2; in V1 nur Mahnstatus manuell).
- ❌ NEXUS-**KI**-Agenten (V1.5 nur Suche/Befehle; KI → V2).
- ❌ Aufmaß-Hochglanz-PDF (→ V1.1).
- ❌ **Offline-Schreiben/Sync-Merge** (bewusst vermieden — alte Falle).
- ❌ Kundenportal, E-Mail-Versand aus der App, WhatsApp-Integration.
- ❌ Mehrmandanten/weitere Firmen.

## 4. Roadmap nach V1
- **V1.1:** Aufmaß-PDF + Übernahme ins Angebot · Ausgaben/Belege + 35 %-Rücklage-Anzeige.
- **V1.5:** NEXUS-Suche/Befehle (⌘K) ohne KI · automatisches Mahnwesen (PDF).
- **V2:** Buchhaltung/EÜR-Export · NEXUS-KI-Agenten (Anthropic, server-seitig) · Kommunikations-Timeline.

---

## 5. Konkreter Claude-Bauprompt (für die spätere Umsetzung)

> Kopiervorlage für die nächste Session, in der **gebaut** wird. Setzt diese Spezifikation voraus.

```
ROLLE: Du baust das V&V Cockpit V2 als echte Web-App. Halte dich strikt an die Spezifikation
in docs/vv-cockpit-v2/ (Dateien 00–05). Baue in kleinen, testbaren Schritten. Nach jedem Modul
committen.

STACK (vorhandenes Repo wiederverwenden, nichts Neues erfinden):
- Frontend: TanStack Start (React 19), Vite, Tailwind 4, shadcn/ui — bereits vorhanden.
- Backend: Supabase (Postgres + Auth + Realtime + Storage + Edge Functions), EU-Region.
- Hosting: Cloudflare Pages/Workers (wie heute).
- Wiederverwenden: user_roles + has_role() + first-user-admin-Trigger + RLS-Muster +
  auth-middleware.ts (server-seitige JWT-Prüfung) + client.ts/client.server.ts.

HARTE REGELN (nicht verhandelbar):
1. Postgres ist einzige verbindliche Quelle. Kein lokaler Voll-State als Wahrheit.
2. Realtime für PC/Handy-Sync nutzen. KEINEN eigenen Sync-/„Cloud-Stand"-Code bauen.
3. Fotos/PDFs NUR in Supabase Storage (private Buckets, signierte URLs). NIE Base64 in Tabellen.
   Dedup über sha256.
4. Geld als numeric(12,2). RLS auf jeder Tabelle, Default-Deny, anon kein Zugriff.
5. Rechnungen/Zahlungen/Buchungen ab „gesendet/festgeschrieben" unveränderlich; Korrektur nur per
   Storno. Jede Finanzänderung in audit_log (append-only, per Trigger).
6. Offene Posten BERECHNET (View/Trigger aus invoices−payments), nie handgepflegt.
7. Soft Delete (deleted_at). Audit-Spalten created_at/updated_at/created_by/updated_by überall (Trigger).
8. Nummernkreise konkurrenzsicher (Postgres-Sequenz/transaktionaler Zähler) — keine Dubletten/Lücken.
9. API-Keys nur in Edge-Function-Secrets, nie im Frontend. .env NICHT committen (gitignore + .env.example).
10. Justin bekommt NICHT automatisch admin: Justus zuerst registrieren (wird admin), Justin = user.

DATENMODELL: exakt wie in 02-architektur-und-datenmodell.md (users/profiles, roles, user_roles,
customers, projects, measurements, measurement_rooms, offers, offer_items, invoices, invoice_items,
payments, open_items[VIEW], bookings, expenses, files, tasks, settings, price_rules, nexus_memory,
audit_log). Alle mit RLS + Audit-Spalten + Soft Delete.

BAU-REIHENFOLGE (V1, je Schritt testen + committen):
1) Supabase-Projekt (EU) + Auth + Realtime + Storage-Buckets (files privat, backups privat).
2) SQL-Migrationen: Schema + RLS + Trigger (audit, set_updated_at) + Nummernkreis-Sequenz.
3) Login + Auth-Guard + Rollen-Guard (admin-only für Einstellungen/Buchhaltung).
4) Einstellungen + price_rules seeden mit den realen Werten aus src/components/site/Kostenrechner.tsx
   (Laminat 16, Vinyl verklebt 22, Sockel 5/lfm, Altboden 4/7, Spachteln 19, Küche 189/lfm, Anfahrt 0,70/km,
   Materialservice 15 %/min 150, …).
5) Kunden (CRUD, Suche, Soft Delete) — mobile-first.
6) Projekte (Status-Workflow, Tabs) + Basis-Aufmaß (Räume m²/lfm + Foto-Upload).
7) Angebote (Positionen aus price_rules) + PDF (Edge Function) + Umwandlung in Rechnung.
8) Rechnungen (PDF, §19-Hinweis aus settings, Status, Teilzahlung, Storno, audit_log, kein Hard Delete).
9) Zahlungen + offene-Posten-View + Dashboard.
10) Dateien-Modul (Kamera-Upload, Galerie, signierte URLs).
11) Notfall-Export (nightly Edge Function pro Tabelle als JSON/CSV + manifest in backups-Bucket; On-Demand-Button).

MOBILE-FIRST: Bottom-Tab-Nav auf Handy, Sidebar auf Desktop, Tap-Ziele ≥44px, Kamera-Upload,
Realtime-Aktualisierung sichtbar. Offline: nur lesen (Cache), Schreiben nur online mit klarem Hinweis.

MIGRATION: erst NACHDEM Schema steht und die Backup-Datei vorliegt (migration/legacy-backup/).
Einmaliges server-seitiges Skript, Staging-Schema, idempotent (legacy_id), Base64→Storage extrahieren,
offene Posten neu berechnen (Alt-Werte nur als Differenzbericht), menschliche Freigabe vor Promotion.

LIEFERN: lauffähige App + Migrationen + kurze README je Modul. NICHT bauen: Offline-Schreiben,
KI-Agenten, EÜR-Export, Mahn-Automatik, Kundenportal (spätere Versionen).
```

---

## 6. Schluss-Empfehlung (kompakt)
- **Technik:** **Supabase** (Postgres + Auth + Realtime + Storage), Frontend weiter auf **Cloudflare**.
  Eigenes Supabase-Projekt in **EU-Region**. Kein D1, kein Sync-Eigenbau.
- **Module zuerst:** Auth/Rollen → Einstellungen/Preise → Kunden → Projekte → Angebote → Rechnungen →
  Zahlungen/offene Posten → Dateien → Dashboard → Notfall-Export.
- **Daten zuerst migrieren:** Kunden → Projekte → Angebote/Rechnungen/Zahlungen → Dateien.
  Offene Posten **neu berechnen**, nicht übernehmen.
- **Nicht übernehmen:** Voll-State-JSON-Speicher, IndexedDB-als-Wahrheit, Eigenbau-Sync/„Cloud-Stand",
  Base64-Dateien, handgepflegte offene Posten, Cloudflare Access als App-Login, NEXUS-API-Keys.
- **Sicherster Weg gegen erneutes Chaos:** eine verbindliche DB, Realtime verteilt automatisch,
  Schreiben nur online, Dateien in Storage, Finanzdaten unveränderlich + protokolliert, Backup nur als Notfall.

**Nächster offener Punkt von Ihrer Seite:** die Backup-Datei `vv-cockpit-backup-2026-06-22-2018.json`
bereitstellen (Repo-Ordner `migration/legacy-backup/` oder Chat) — dann liefere ich die datensatzgenaue
Analyse und das fertige Feld-Mapping.
