# 04 — Sicherheit, Rollen/Rechte, Backup/Restore, Testplan, Risiken

---

## 1. Sicherheitskonzept

### 1.1 Identität & Zugriff
- **Server-seitige Identitätsprüfung:** JWT-Validierung im Server (vorhandenes Muster `auth-middleware.ts`,
  Bearer-Token). Kein Vertrauen auf Client-Angaben.
- **Row Level Security (RLS)** auf **jeder** Cockpit-Tabelle, **Default-Deny**. `anon` hat **keinen** Zugriff.
- **Zwei Client-Typen** (Muster vorhanden):
  - Browser: **Publishable/Anon-Key** (nur durch RLS abgesichert).
  - Server: **Service-Role-Key** (umgeht RLS) — **ausschließlich** server-seitig, nie im Bundle.
- **MFA** für Admin optional aktivieren (Supabase Auth).

### 1.2 Secrets / API-Keys
- **Keine API-Keys im Frontend.** NEXUS-KI-Keys (OpenAI/Anthropic) liegen in **Edge-Function-Secrets**.
- **Befund aus diesem Repo:** `.env` ist **in Git eingecheckt** → Maßnahme: in `.gitignore` aufnehmen,
  nur `.env.example` (ohne Werte) tracken; lokale Secrets in `.dev.vars` (ist bereits gitignored).
  Aktuell betrifft das nur Public-/Anon-Keys (durch RLS gedeckt) — dennoch korrigieren. Service-Role-Key
  **niemals** committen; falls je geschehen → **sofort rotieren**.

### 1.3 Finanzdaten-Integrität (Kernanforderung)
- **Keine stille Überschreibung** von Rechnungen/Zahlungen/Buchungen.
- **Immutability:** ab Status `gesendet`/`festgeschrieben` keine inhaltliche Änderung; Korrektur nur per
  **Storno + Korrekturrechnung**.
- **`audit_log`** (append-only) via DB-Trigger für `invoices`, `payments`, `bookings`, `expenses`,
  `settings`, `price_rules`, `user_roles`: speichert `old_values`/`new_values`/`changed_by`/`changed_at`.
- **Offene Posten berechnet** (nicht handgepflegt) → keine widersprüchlichen Quellen.

### 1.4 Dateien
- **Private Buckets**; Zugriff nur über **kurzlebige signierte URLs**.
- RLS/Policies spiegeln die Owner-Rechte (wer den Datensatz sehen darf, sieht die Datei).
- Kein Base64 in Fachtabellen; Dedup über `sha256`.

### 1.5 Datenschutz / DSGVO (deutsches Kleinunternehmen)
- **EU-Region (Frankfurt)** bei Supabase; **AVV/DPA** mit Supabase abschließen.
- **Datenminimierung:** nur nötige Kundendaten; Notizen sachlich.
- **Betroffenenrechte:** Auskunft (Kundendaten-Export) und Löschung umsetzbar — aber:
- **Aufbewahrungspflicht:** Rechnungen/Belege **10 Jahre** (GoBD/§147 AO) → **kein Hard Delete**;
  „Löschen" = Soft Delete + ggf. Legal Hold bis Fristablauf.
- **Soft Delete** als Standard (`deleted_at`); harte Löschung nur kontrolliert nach Fristen.
- **Transport:** ausschließlich HTTPS/TLS.

---

## 2. Rollen- & Rechtekonzept

**Rollen (ENUM `app_role`, vorhanden):** `admin` (Justus), `user` (Justin).
> Erweiterbar um `mitarbeiter`/`buchhaltung`, falls später nötig — Muster (`user_roles`+`has_role`) bleibt.

**Regel „Justin nicht automatisch Admin":** Trigger `handle_new_user_role()` vergibt dem **ersten** Nutzer `admin`,
allen weiteren `user`. → **Justus zuerst registrieren, Justin danach.** Rollenwechsel nur durch Admin in Einstellungen.

### Rechte-Matrix
| Bereich | admin (Justus) | user (Justin) |
|---|---|---|
| Kunden anlegen/bearbeiten | ✅ | ✅ |
| Kunden löschen (soft) | ✅ | ⚠️ nur eigene Anlage / oder gesperrt |
| Projekte/Aufmaß | ✅ | ✅ |
| Angebote erstellen/senden | ✅ | ✅ |
| Rechnungen erstellen/senden | ✅ | ✅ (anlegen) |
| Rechnung stornieren | ✅ | ❌ |
| Zahlungen erfassen | ✅ | ✅ |
| Zahlungen löschen/stornieren | ✅ | ❌ |
| **Buchhaltung** (Einnahmen/Ausgaben/EÜR) | ✅ | ❌ |
| **Einstellungen** (Firma, Preise, Nummernkreise) | ✅ | ❌ |
| **Benutzer & Rollen verwalten** | ✅ | ❌ |
| Backup/Restore auslösen | ✅ | ❌ |
| Dateien hochladen/ansehen | ✅ | ✅ |
| `audit_log` einsehen | ✅ | ❌ |

Durchsetzung: **doppelt** — RLS-Policies in Postgres (verbindlich) **und** UI-Guards (Komfort). RLS ist die Wahrheit.

---

## 3. Backup-/Restore-Konzept

**Leitsatz:** Die **DB ist der Speicher**. Backup ist **nur Notfall-Sicherung**, kein täglicher Speicherort.

### Drei Ebenen
1. **Plattform-Backup (primär):** Supabase **automatische tägliche Backups** (Pro) bzw. **PITR**
   (Point-in-Time-Recovery) für die Postgres-DB. Restore über Supabase.
2. **App-Export (sekundär, Notfall):** geplante **Edge Function (nightly cron)** exportiert **pro Tabelle**
   strukturierte JSON/CSV + ein `manifest.json` (Zeitpunkt, Zeilenzahlen, Schema-Version) in einen
   **privaten Storage-Bucket** `backups/`. **Kein** großer App-State-Blob — getrennte, normalisierte Exporte.
   Zusätzlich On-Demand-Export-Button (Admin).
3. **Dateien:** Storage-Objekte separat sichern (Bucket-Versionierung bzw. periodische Kopie).

### Restore
- **Standard:** Plattform-Restore/PITR (schnellster, vollständigster Weg).
- **Notfall (Teil-Restore):** dokumentiertes Skript liest die per-Tabelle-Exporte in eine **Staging-DB**,
  Prüfung, dann selektive Übernahme. **Restore ist DB-Wiederherstellung, kein „JSON in die App laden".**
- **Restore-Probe:** mindestens 1× vor Go-Live testen (siehe Testplan), danach halbjährlich.

### Was bewusst NICHT mehr passiert
- ❌ Backup als täglicher Speicher · ❌ Voll-State-JSON als Wahrheit · ❌ manuelles „Cloud-Stand"-Hochladen
  · ❌ Geräte-zu-Geräte-Backup-Austausch.

---

## 4. Testplan (PC und Handy)

### 4.1 Auth & Rollen
- [ ] Justus registriert zuerst → erhält `admin`. Justin danach → erhält `user` (nicht admin).
- [ ] Justin sieht **keine** Einstellungen/Buchhaltung; Direkt-URL wird server-seitig geblockt (RLS + Guard).
- [ ] Logout auf Handy beendet Session sauber.

### 4.2 CRUD-Grundfunktionen
- [ ] Kunde anlegen/bearbeiten/soft-löschen; gelöschter Kunde verschwindet aus Standardliste.
- [ ] Projekt + Aufmaß (m²/lfm) erfassen; Summen korrekt.
- [ ] Angebot mit Positionen aus Preisliste → PDF → in Rechnung umwandeln.
- [ ] Rechnung senden → unveränderlich; Änderungsversuch wird blockiert + im `audit_log` sichtbar.

### 4.3 **Realtime-Sync (Kern-Test PC↔Handy)**
- [ ] Auf **PC** Zahlung erfassen → erscheint **ohne Reload** auf dem **Handy** (offene Posten sinkt).
- [ ] Auf **Handy** Kunde anlegen → erscheint sofort auf dem PC.
- [ ] Zwei Geräte gleichzeitig: letzter Schreibvorgang gewinnt; keine Geister-Duplikate.

### 4.4 Dateien
- [ ] Foto **mit Handy-Kamera** aufnehmen → landet in Storage, am Projekt sichtbar, **kein Base64 in DB**.
- [ ] Gleiches Bild zweimal → Dedup (gleicher `sha256`, keine Doppel-Datei).
- [ ] PDF-Vorschau über signierte URL; URL läuft ab.

### 4.5 Finanz-Integrität
- [ ] Offene Posten = Rechnungen − Zahlungen (stichprobenhaft nachrechnen).
- [ ] Storno erzeugt Korrekturrechnung; Originalrechnung bleibt erhalten.
- [ ] Teilzahlung → Status `teilbezahlt`, Restbetrag korrekt.

### 4.6 Offline-/Netzverhalten
- [ ] Handy offline: Lesen aus Cache funktioniert; Schreiben zeigt klaren „keine Verbindung"-Hinweis,
      kein stiller Datenverlust.
- [ ] Nach Reconnect: erneuter Schreibversuch erfolgreich.

### 4.7 Backup/Restore-Probe
- [ ] Nightly-Export erzeugt per-Tabelle-Dateien + Manifest im `backups/`-Bucket.
- [ ] Test-Restore in Staging stellt Kunden/Rechnungen korrekt wieder her.

### 4.8 Geräte/Browser-Matrix
- [ ] iPhone Safari · Android Chrome · Desktop Chrome/Firefox/Safari · Tablet.
- [ ] Mobile: Tap-Ziele, Bottom-Nav, Kamera, Tastatur verdeckt keine Eingabefelder.

---

## 5. Risiken & offene Entscheidungen

### Risiken
| Risiko | Auswirkung | Gegenmaßnahme |
|---|---|---|
| **Backup-Datei fehlt aktuell** | Migration blockiert | Datei bereitstellen (Repo/Chat) → echte Analyse |
| **Lovable-Cloud-Lock-in** bei Supabase | Eigentum/Portabilität unklar | direkten Projekt-Zugang sichern; EU-Region verifizieren |
| Falsche **Region** (nicht EU) | DSGVO-Verstoß | Region beim Projekt-Setup prüfen/neu anlegen |
| **Nummernkreis-Dubletten** bei Parallelnutzung | Rechtsproblem | Postgres-Sequenz/transaktionaler Zähler |
| **PDF-Erzeugung** Aufwand | Verzögerung | Ansatz früh festlegen (s. offene Entscheidungen) |
| Offline-Schreiben gewünscht | Sync-Konflikte (alte Falle) | in V1 **bewusst weglassen** |
| GoBD-Anforderungen unterschätzt | Steuerprüfung | Rechnungen unveränderlich + 10 J. + audit_log |
| `.env` in Git | Key-Exposure | gitignore + ggf. rotieren |

### Offene Entscheidungen (bitte klären)
1. **Eigenes Supabase-Projekt** fürs Cockpit (empfohlen) oder geteilt mit der Website?
2. **PDF-Erzeugung:** server-seitig (Edge Function, sauberes Layout — empfohlen) oder im Browser?
3. **Aufmaß in V1** als Basis (m²/lfm + Fotos) ausreichend, oder PDF-Aufmaß sofort nötig?
4. **Buchhaltung/EÜR-Export** schon in V1.1 oder erst V2?
5. **NEXUS:** V1.5 nur Suche/Befehle ohne KI — wann KI-Agenten, mit welchem Anbieter (Anthropic empfohlen)?
6. **Wer ist Admin** beim ersten Start? (→ Justus zuerst registrieren.)
7. **Domain/Hosting:** Cockpit unter eigener Subdomain (z. B. `cockpit.verlegt-verschraubt.de`)?
8. **Datenfreigabe an KI:** dürfen Kundendaten an externe Modelle? (Empfehlung: nur anonymisiert/aggregiert.)
