# V&V Cockpit V2 — Technische & fachliche Spezifikation

> Planungsdokument. **Noch kein Code.** Diese Spezifikation ist die verbindliche Grundlage für den späteren Bau.
> Stand: 2026-06-22 · Auftraggeber: Verlegt & Verschraubt Handwerkerservice (Justus, Justin)

---

## 0. Lesereihenfolge

| Datei | Inhalt |
|---|---|
| `00-README-und-Zusammenfassung.md` | Dieses Dokument: Management-Summary, Entscheidungen, kritische Befunde |
| `01-backup-analyse-und-migration.md` | Analyse des Alt-Backups + Migrationsplan |
| `02-architektur-und-datenmodell.md` | Variante A vs. B, Empfehlung, vollständiges Datenmodell, feste Regeln |
| `03-module-ui-navigation.md` | Die 11 Module, Mobile-First-UI, Seitenstruktur/Navigation |
| `04-sicherheit-rollen-backup-test.md` | Sicherheitskonzept, Rollen/Rechte, Backup/Restore, Testplan, Risiken |
| `05-mvp-roadmap-bauprompt.md` | MVP V1, V1-Scope, Roadmap, **fertiger Claude-Bauprompt** |
| `06-altcockpit-ist-analyse.md` | **Ist-Analyse des echten Alt-Cockpits** (Datenmodell, Sync-Fehlerursachen, NEXUS, Backup-Format) — Funktionsvorlage |

---

## 1. Stand der Quellenlage (aktualisiert nach Upload des Alt-Cockpits)

Das **echte Alt-Cockpit** wurde als ZIP bereitgestellt und vollständig analysiert
(`vvcockpit.html`, ~1 MB, 12.400 Zeilen + Cloudflare Pages Functions). Ergebnis: **`06-altcockpit-ist-analyse.md`**.
Damit ist die **exakte Struktur** der Backup-Datei `vv-cockpit-backup-2026-06-22-2018.json` **bekannt**
(erzeugt von der Funktion `doExport()`; der Dateiname = Export vom 22.06.2026, 20:18 Uhr).

**Noch ausstehend für die Datenmigration:** die **Datensätze** selbst. Die ZIP enthält den **App-Code**,
nicht die Geschäftsdaten (die lebten zur Laufzeit in IndexedDB bzw. der D1-Cloud). Ich liefere daher
**keine erfundene** Inhaltsanalyse („47 Kunden…"). Für das datensatzgenaue Inventar brauche ich **eine** Quelle:

1. die Backup-JSON `vv-cockpit-backup-2026-06-22-2018.json` (aus „Backup exportieren"), **oder**
2. den D1-Cloud-Stand über `GET /api/export-state` (lädt `vv-cockpit-state.json`), **oder**
3. einen IndexedDB-Snapshot.

→ Datei nach `migration/legacy-backup/` committen oder Inhalt einfügen (bei großen Base64-Fotos vorher
herausnehmen). **Das Feld-Mapping liegt dank Code-Analyse bereits fertig vor** (Datei 01 + 06).

---

## 2. Management-Summary (die wichtigsten Entscheidungen)

### 2.1 Technik-Empfehlung: **Variante B — Supabase** (Begründung in Datei 02)
**Warum klar B:**
- Das Projekt läuft **heute schon** auf Supabase (Postgres + Auth + Realtime + RLS) und wird auf Cloudflare gehostet.
  Variante B ist kein Neuland, sondern erprobte, bereits vorhandene Substanz.
- **Supabase Realtime** liefert die automatische PC↔Handy-Aktualisierung **out of the box** — genau die Funktion,
  deren Eigenbau Ihr bisheriges Chaos verursacht hat. Im Repo ist Realtime bereits aktiviert.
- **Supabase Storage** löst das Foto/PDF-Problem (kein Base64 mehr im Datenbestand).
- **Supabase Studio** ist für Nicht-Entwickler bedienbar (Tabellen, Nutzer, Dateien, Logs per Klick).
- **DSGVO:** EU-Region (Frankfurt) + AVV/DPA verfügbar.

Cloudflare bleibt **Host/CDN/Edge** für das Frontend (wie heute). Es ist also nicht „A oder B" als Hosting,
sondern: **Supabase ist das System of Record + Auth + Dateien + Sync; Cloudflare ist der Hoster.**

> Variante A (Cloudflare D1 + R2 + Access) wird **nicht** empfohlen — Hauptgrund: D1 hat **kein** eingebautes
> Realtime. Sie müssten Sync erneut selbst bauen → genau die Falle, aus der Sie raus wollen.

### 2.2 Welche Module zuerst (MVP V1)
Reihenfolge nach Geschäftsnutzen und Abhängigkeit:
1. **Auth + Rollen** (Justus = admin, Justin = eingeschränkt)
2. **Einstellungen** (Firmendaten, Nummernkreise, Preisliste — aus `Kostenrechner.tsx` übernommen)
3. **Kundenkartei**
4. **Aufträge/Projekte**
5. **Angebote** (PDF) → **Umwandlung in Rechnung**
6. **Rechnungen** (PDF, §19-Hinweis, Zahlungsstatus)
7. **Zahlungen + Offene Posten** (offene Posten **berechnet**, nicht handgepflegt!)
8. **Dateien** (Foto/PDF-Upload in Storage)
9. **Dashboard**
10. **Notfall-Export** (Backup als Sicherung, nicht als Speicher)

**Bewusst NICHT in V1:** volle Buchhaltung/EÜR-Export, automatisches Mahnwesen, NEXUS-KI-Agenten,
Aufmaß-Hochglanz-PDF, Offline-Schreiben. Details in Datei 05.

### 2.3 Welche Daten zuerst migrieren
1. **Stammdaten zuerst:** Kunden → Projekte (risikoarm, hoher Nutzen).
2. **Dann Finanzdaten:** Angebote → Rechnungen → Zahlungen. Offene Posten werden **neu berechnet**,
   nicht aus dem Alt-Backup übernommen (Alt-Werte gelten nur als Abgleich-Referenz).
3. **Dateien zuletzt:** Base64-Blobs aus dem JSON extrahieren → Storage → Referenzen setzen.

### 2.4 Welche Alt-Funktionen NICHT übernehmen
- ❌ Kompletter App-State als eine große JSON-Datei als Hauptspeicher
- ❌ IndexedDB als „Wahrheit"
- ❌ Jeder Eigenbau-Sync / „Cloud-Stand"-Logik / manuelles Backup-als-Speicher
- ❌ Base64-Fotos/PDFs im Datenbestand
- ❌ Handgepflegte „offene Posten" aus mehreren Quellen (führte zu Widersprüchen)
- ❌ Cloudflare Access als App-Login (durch Supabase Auth ersetzen)

### 2.5 Sicherster Weg gegen erneutes Speicher-/Sync-Chaos (Kernprinzip)
> **Eine einzige verbindliche Quelle (Postgres). Realtime verteilt automatisch.
> Schreiben nur online. Backup ist Notfall-Sicherung, nicht der Speicher.
> Dateien in Storage, nie als Base64. Finanzdaten werden nie still überschrieben, sondern protokolliert.**

---

## 3. Verbindliche Grundregeln (gelten für das gesamte Projekt)

1. **Datenbank (Postgres) ist Hauptspeicher.** Kein lokaler Voll-State als Wahrheit.
2. **Backup ist nur Notfall-Export.** Tägliche Speicherung passiert in der DB, nicht im Backup.
3. **Fotos/PDFs in den Dateispeicher (Storage)** — nie mehrfach als Base64 ins JSON.
4. **Rechnungen/Zahlungen/Buchungen werden nicht still überschrieben** (Immutability + Storno-Logik).
5. **Änderungen an kritischen Finanzdaten werden protokolliert** (`audit_log`).
6. **Benutzeridentität wird serverseitig geprüft** (JWT-Validierung im Server, RLS in der DB).
7. **Justin bekommt nicht automatisch alle Adminrechte** (Default-Rolle `user`, nicht `admin`).
8. **API-Keys gehören serverseitig in sichere Secrets**, nicht ins Frontend.
9. **Löschungen sind zunächst Soft Deletes** (`deleted_at`).
10. **Jede wichtige Änderung bekommt** `created_at`, `updated_at`, `created_by`, `updated_by`.

---

## 4. Kritische Befunde aus dem aktuellen Repo (Altlasten / To-fix)

| Befund | Bewertung | Maßnahme |
|---|---|---|
| `.env` ist **in Git eingecheckt** | ⚠️ riskant (nur Public-/Anon-Keys betroffen, kein Service-Key — aber schlechte Praxis) | `.env` in `.gitignore`, nur `.env.example` tracken; Keys rotieren falls je Service-Key drin war |
| Supabase ist via **Lovable Cloud** provisioniert | ⚠️ Lock-in-Risiko | Direkten Eigentums-Zugang zum Supabase-Projekt sichern; **EU-Region** verifizieren |
| Marketing-Analytics (`page_views`, `active_sessions`, `calculator_*`) erlauben **anon INSERT** | OK fürs Marketing, aber **nicht** mit Finanzdaten mischen | **Eigenes Supabase-Projekt** fürs Cockpit (saubere Sicherheitsgrenze) |
| Bestehende Muster `user_roles` / `has_role()` / RLS / first-user-admin | ✅ sehr gut | **Wiederverwenden**, nicht neu erfinden |
| Realtime bereits aktiviert | ✅ | Als Sync-Mechanismus fürs Cockpit nutzen |
| Echte Preise in `Kostenrechner.tsx` | ✅ wertvoll | Als Seed für `price_rules` übernehmen |

Siehe Detail-Bewertung und alle offenen Entscheidungen in `04-sicherheit-rollen-backup-test.md`.
