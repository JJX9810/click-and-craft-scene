# 01 — Backup-Analyse & Migrationsplan

---

## 1. Status der Backup-Datei

**Datei:** `vv-cockpit-backup-2026-06-22-2018.json`
**Quelle inzwischen analysiert:** Das echte Alt-Cockpit wurde als ZIP bereitgestellt → siehe
`06-altcockpit-ist-analyse.md`. Damit ist die **exakte Struktur** dieser Backup-Datei **bekannt**
(erzeugt von `doExport()`; Name `vv-cockpit-backup-YYYY-MM-DD-HHMM.json` = Export vom 22.06.2026, 20:18 Uhr).

**Noch ausstehend:** die **Datensätze** selbst. Die ZIP enthält den App-Code, nicht die Geschäftsdaten.
Für die datensatzgenaue Migration brauche ich **eine** dieser Quellen:
- die Backup-JSON `vv-cockpit-backup-2026-06-22-2018.json` (von `doExport()`), **oder**
- den D1-Cloud-Stand über `GET /api/export-state` (lädt `vv-cockpit-state.json`), **oder**
- einen IndexedDB-Snapshot aus der laufenden App.

> Datei nach `migration/legacy-backup/` committen oder Inhalt einfügen; dann liefere ich Inventar
> (Zählung je Entität), Dubletten-/Widerspruchsbericht und das finale Feld-Mapping.

**Bekannte exakte Backup-Struktur** (aus dem Code verifiziert):
```jsonc
{
  "version": "VV_COCKPIT_2026",
  "exportedAt": "<ISO>",
  "keyNote": "… API-Keys und Login-Geheimnisse werden nicht exportiert.",
  "data":     { /* 22+3 Collections, s. Datei 06 §3 */ },
  "settings": { /* Firmendaten, OHNE api/keys */ },
  "nexusBrainUser": { /* NEXUS-Gehirn */ }
}
```
API-Keys/Login-Geheimnisse sind **nicht** enthalten (gut). **Fotos/Dokumente können als Base64** in
`data.documents`/`data.measurements` stecken → bei Migration nach Storage auslagern.

---

## Teil A — Struktur (durch Code-Analyse BESTÄTIGT)

> Die folgende Form ist **nicht mehr Hypothese**, sondern aus dem echten Alt-Cockpit verifiziert
> (Details: `06-altcockpit-ist-analyse.md`). Maßgeblich ist `backup.data.<collection>`.
> Die ursprüngliche Skizze unten bleibt als grobe Orientierung; die **verbindlichen** Schlüssel/Felder
> stehen in Datei 06 §3–§8.

```jsonc
{
  "meta":      { "version": "...", "exportedAt": "2026-06-22T20:18:...", "device": "PC|Handy" },
  "settings":  { "firma": {...}, "steuerruecklage": 0.35, "nummernkreise": {...}, "preise": {...} },
  "customers": [ { "id": "...", "name": "...", "adresse": {...}, "telefon": "...", "notizen": "..." } ],
  "projects":  [ { "id": "...", "kundeId": "...", "status": "...", "leistung": "..." } ],
  "aufmass":   [ { "projektId": "...", "raeume": [ { "name": "...", "qm": 0, "lfm": 0 } ] } ],
  "offers":    [ { "nr": "...", "kundeId": "...", "positionen": [...], "status": "..." } ],
  "invoices":  [ { "nr": "...", "kundeId": "...", "positionen": [...], "bezahlt": false } ],
  "payments":  [ { "rechnungId": "...", "betrag": 0, "datum": "..." } ],
  "offeneposten": [ ... ],            // ⚠️ vermutlich redundant/abgeleitet — siehe unten
  "bookings":  [ ... ],               // Einnahmen/Ausgaben
  "expenses":  [ ... ],
  "files":     [ { "name": "...", "type": "image/jpeg", "data": "data:image/jpeg;base64,/9j/4AAQ..." } ],
  "nexus":     { "memory": [...], "befehle": [...], "apiKeys": { ... } }   // ⚠️ Keys = Sicherheitsrisiko
}
```

**Erwartete Datenarten und ihre Behandlung:**

| Datenart | Erwartet | Migrieren? | Besondere Behandlung |
|---|---|---|---|
| Firmen-/Einstellungsdaten | ja | ✅ ja | nach `settings` |
| Preis-/Leistungslisten | ja | ✅ ja | nach `price_rules`; mit `Kostenrechner.tsx` abgleichen |
| Nummernkreise (Angebot/Rechnung) | ja | ✅ ja | **wichtig**: höchsten vergebenen Wert übernehmen, Sequenz fortsetzen |
| Kunden | ja | ✅ ja | personenbezogen → DSGVO (siehe §3) |
| Projekte/Aufträge | ja | ✅ ja | Verknüpfung zu Kunde prüfen |
| Aufmaß/Räume | evtl. | ✅ ja | als `measurements` + `measurement_rooms` |
| Angebote + Positionen | ja | ✅ ja | Status normalisieren |
| Rechnungen + Positionen | ja | ✅ ja | **rechtsrelevant** → unveränderlich behandeln, 10 J. Aufbewahrung |
| Zahlungen | ja | ✅ ja | Zuordnung zu Rechnung prüfen |
| **Offene Posten** | ja | ⚠️ **nur als Referenz** | **neu berechnen** aus Rechnungen−Zahlungen, nicht 1:1 übernehmen |
| Buchungen/Ausgaben | evtl. | ✅ ja (falls vorhanden) | Belegbezug → Datei in Storage |
| Dateien (Base64) | ja | ✅ ja, aber **transformiert** | aus JSON extrahieren → Storage, **nie** als Base64 importieren |
| NEXUS-Memory | evtl. | ⚠️ kuratiert | nur unkritische Inhalte; **keine** Keys |
| NEXUS API-Keys | evtl. | ❌ **niemals** in DB/Frontend | sofort als kompromittiert behandeln, **rotieren**, in Secrets neu hinterlegen |

---

## Teil B — Analyse-Framework für die echte Datei

Sobald die Datei vorliegt, laufe ich diese Schritte (read-only, kein Auto-Import):

1. **Inventar:** Top-Level-Schlüssel auflisten, je Sammlung Anzahl Datensätze, Gesamtgröße, größte Felder.
2. **Schema-Sniffing:** je Sammlung die Feldnamen + Typen + Beispielwerte (anonymisiert) erfassen.
3. **Große Felder finden:** alle Felder > 8 KB, alle `data:`/Base64-Strings → Kandidaten für Storage
   (Postgres-Spalten sind nicht für Megabyte-Blobs gedacht; siehe „Zu große Daten").
4. **Redundanz-/Widerspruchscheck:**
   - doppelte Kunden (gleiche Tel./Adresse, unterschiedliche ID),
   - „offene Posten", die nicht zu Rechnungen−Zahlungen passen,
   - Rechnungs-/Angebotsnummern doppelt,
   - verwaiste Referenzen (Projekt ohne Kunde, Zahlung ohne Rechnung).
5. **Sicherheitsscan:** API-Keys, Passwörter, Tokens, personenbezogene Sonderdaten.
6. **Report:** Tabelle „migrieren / transformieren / verwerfen / manuell prüfen" je Sammlung.

### Zu große Daten für eine normale DB-Spalte (gehören in Storage, nicht in die Tabelle)
- **Fotos** (Aufmaß, Baustelle, Vorher/Nachher) — typ. 0,5–8 MB je Bild.
- **PDFs** (Angebote, Rechnungen, Belege) — typ. 50 KB–2 MB.
- **Base64-Strings** jeglicher Art (≈ +33 % größer als das Original).
- **Große HTML-Dokumente** (z. B. gerenderte Angebots-/Rechnungs-HTML aus der Alt-App).
→ Diese werden in **Supabase Storage** abgelegt; in der DB steht nur **Metadaten + Pfad** (Tabelle `files`).

---

## Teil C — Migrationsplan (robust, idempotent, prüfbar)

### Grundsätze
- **Einmaliges, server-seitiges Skript** (Service-Role), kein Live-App-Import.
- **Staging zuerst:** Import in ein `staging`-Schema/separate Tabellen → menschliche Prüfung → Promotion.
- **Idempotent:** jeder Alt-Datensatz bekommt `legacy_id`/`external_id`; erneuter Lauf überschreibt nicht doppelt.
- **Herkunft erhalten:** `created_at` = Original-Zeitstempel falls vorhanden, sonst Importzeit; `created_by` = Justus.
- **Finanzen nie blind übernehmen:** offene Posten **neu berechnen**, Alt-Werte nur als Abgleich.

### Ablauf in 7 Schritten
1. **Bereitstellen & sichern:** Datei nach `migration/legacy-backup/` (nicht öffentlich), Kopie wegsichern.
2. **Inventar & Mapping-Tabelle** erstellen (Alt-Feld → Neu-Spalte; Beispiel siehe unten).
3. **Stammdaten importieren:** `customers`, dann `projects` (Referenzen auflösen, Dubletten markieren statt löschen).
4. **Dateien extrahieren:** Base64/`data:`-Blobs dekodieren → Hash (SHA-256) → Storage-Upload →
   `files`-Zeile → Referenz am jeweiligen Datensatz. **Dedup über Hash** (keine Doppel-Uploads).
5. **Finanzdaten importieren:** `offers`+`offer_items`, `invoices`+`invoice_items`, `payments`.
   Rechnungen als **abgeschlossen/unveränderlich** markieren. Nummernkreise auf Maximum + 1 setzen.
6. **Offene Posten ableiten:** `open_items` aus `invoices` − `payments` **berechnen**;
   Abweichungen zu Alt-„offeneposten" in einen **Differenzbericht** schreiben (nicht still angleichen).
7. **Verifikation (manuell):** Stichproben Kunde/Rechnung/Foto; Summen-Abgleich (Anzahl, Umsatz, offene Summe);
   Differenzbericht mit Justus durchgehen → Freigabe → Promotion ins Live-Schema.

### Feld-Mapping (aus dem echten Code `migrateOldData()` abgeleitet — verbindlich)
Das Alt-Cockpit besitzt bereits eine interne Migration `migrateOldData(d)`; deren reale Mappings sind die
Grundlage für V2 (`backup.data.<collection>` → V2-Tabelle):

| Alt (real) | Neu | Transformation |
|---|---|---|
| `customers[].name` | `customers.display_name` | trim; ggf. Vor-/Nachname splitten |
| `customers[].contact` | `customers.phone` | Feld-Rename (`contact`→`phone`) |
| `customers[].place` | `customers.city`/`street` | `place`→`address` zerlegen |
| `customers[].next` / `.currentStage` | `projects.next_step`/Status | `next`/`currentStage`→`nextStep` |
| `customers[].status` | `customers.status` | `active`→`aktiv`, `done`→`abgeschlossen`, `problem`→`aktiv` |
| `customers[].created` | `customers.created_at` | `created`→`createdAt` |
| verschachtelte `customers[].measurements/offers/invoices` | Top-Level + `customer_id` | flach ziehen, `customerId`/`customerName` setzen |
| `measurements[].totalPerimeter` | `measurements.total_skirting` | `totalPerimeter`→`totalSkirting` |
| `offers[].no` | `offers.offer_no` | `no`→`number`; `customer`→`customerName` |
| `offers[]/invoices[].positionen[]` | `offer_items`/`invoice_items` | je Position eine Zeile; Beträge → `numeric(12,2)` |
| `invoices[]` „bezahlt" | abgeleitet aus `payments` | **nicht** als Wahrheit übernehmen |
| `documents[].data` / Base64 in `measurements` | Storage + `files`-Zeile | dekodieren, hashen, hochladen |
| `settings` (Firmendaten, `taxReserve`, `defaultDepositPercent`, `legal`) | `settings` | 1:1 (s. Datei 06 §4); `tax`/`iban` nachtragen |
| `FLOOR_PRICES`/`REMOVAL_PRICES` | `price_rules` | mit `Kostenrechner.tsx` abgleichen (Differenzen: Anfahrt 35 vs 30 km, Spachtel 8 vs 19 €) |
| `counters` (Nummernkreise) | `settings` + Postgres-Sequenz | höchsten Wert übernehmen, Sequenz fortsetzen |
| `openItemOverrides` | — | ❌ **verwerfen** (Anti-Pattern) |
| `nexusBrainUser` | `nexus_memory` (kuratiert) | nur unkritische Inhalte; **keine** Keys |
| `staff` | `profiles` | Justus/Justin |
| `mileage` / `materials` / `recurring` | `mileage_log`/`materials`/`recurring` | V1.1/V2 (s. Datei 02 Addendum) |

### Altlasten, die NICHT 1:1 übernommen werden (kritisch markiert)
- 🚩 **`offeneposten` als Quelle** — nur Referenz, neu berechnen.
- 🚩 **`bezahlt`-Flags** an Rechnungen — aus Zahlungen ableiten.
- 🚩 **Base64-Felder** — niemals in DB, immer Storage.
- 🚩 **NEXUS-API-Keys** — verwerfen + rotieren.
- 🚩 **Doppelte Kunden** — zusammenführen (Merge), nicht beide blind importieren.
- 🚩 **Voll-State-Struktur** — wird zerlegt in normalisierte Tabellen, nicht als Blob abgelegt.
