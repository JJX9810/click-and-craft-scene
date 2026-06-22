# 01 — Backup-Analyse & Migrationsplan

---

## 1. Status der Backup-Datei

**Datei:** `vv-cockpit-backup-2026-06-22-2018.json`
**Auffindbar in dieser Umgebung:** **Nein** (systemweite Suche, Git-Historie, Repo-Scan — nicht vorhanden).

Deshalb folgt **keine erfundene Datensatzanalyse**. Stattdessen:
- **Teil A:** strukturelle Erwartungsanalyse (was so ein Export mit hoher Sicherheit enthält — abgeleitet aus
  der von Ihnen beschriebenen Alt-Architektur und der realen Preislogik im Repo).
- **Teil B:** ein **maschinelles Analyse-Framework**, das ich auf die echte Datei anwende, sobald sie vorliegt.
- **Teil C:** der **Migrationsplan** (robust gegen die noch unbekannte konkrete Struktur).

> **So liefern Sie die Datei:** in `migration/legacy-backup/` committen **oder** Inhalt in den Chat einfügen.
> Dann erstelle ich ein datensatzgenaues Inventar (Zählung je Entität, Feldliste, Dubletten, Widersprüche).

---

## Teil A — Strukturelle Erwartungsanalyse (Hypothese, zu verifizieren)

Ein Voll-State-Export aus einer Single-HTML/IndexedDB-App ist fast immer **ein großes verschachteltes JSON-Objekt**
mit Top-Level-Schlüsseln pro „Sammlung" plus eingebetteten Binärdaten. Erwartete Form:

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

### Beispiel-Mapping (zu konkretisieren, sobald echte Felder bekannt)
| Alt (vermutet) | Neu | Transformation |
|---|---|---|
| `customers[].name` | `customers.display_name` | trim; ggf. in Vor-/Nachname splitten |
| `customers[].adresse` | `customers.street/zip/city` | Objekt/Freitext zerlegen |
| `invoices[].positionen[]` | `invoice_items` (n Zeilen) | je Position eine Zeile; Beträge → `numeric(12,2)` |
| `invoices[].bezahlt` (bool) | abgeleitet aus `payments` | **nicht** als Wahrheit übernehmen |
| `files[].data` (base64) | Storage-Objekt + `files`-Zeile | dekodieren, hashen, hochladen |
| `settings.preise` | `price_rules` | mit `Kostenrechner.tsx` abgleichen, Differenzen melden |
| `nexus.apiKeys` | — | **verwerfen + rotieren** |

### Altlasten, die NICHT 1:1 übernommen werden (kritisch markiert)
- 🚩 **`offeneposten` als Quelle** — nur Referenz, neu berechnen.
- 🚩 **`bezahlt`-Flags** an Rechnungen — aus Zahlungen ableiten.
- 🚩 **Base64-Felder** — niemals in DB, immer Storage.
- 🚩 **NEXUS-API-Keys** — verwerfen + rotieren.
- 🚩 **Doppelte Kunden** — zusammenführen (Merge), nicht beide blind importieren.
- 🚩 **Voll-State-Struktur** — wird zerlegt in normalisierte Tabellen, nicht als Blob abgelegt.
