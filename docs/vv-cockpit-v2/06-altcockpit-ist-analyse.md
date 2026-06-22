# 06 — Ist-Analyse des alten Cockpits (Grundwahrheit, Funktionsvorlage)

> Quelle: hochgeladenes `vvcockpitv2cloudflaredeploy_2.zip` (das **echte** Alt-Cockpit).
> Diese Analyse ersetzt alle vorherigen Annahmen. Sie ist die verbindliche **Funktionsvorlage** für V2.

---

## 1. Aufbau der Alt-Anwendung

| Bestandteil | Realität |
|---|---|
| App | **Eine HTML-Datei** `vvcockpit.html` (= `index.html`, identisch), **~1,03 MB, 12.400 Zeilen**, 2 `<script>`-Blöcke |
| Titel | „Verlegt & Verschraubt – Cockpit 2026" |
| Hosting | **Cloudflare Pages** + **Pages Functions** unter `functions/api/*` |
| Cloud-Sync-API | `GET/POST /api/state`, `/api/init-db`, `/api/export-state`, `/api/health` → **Cloudflare D1** |
| Auth am Rand | **Cloudflare Access** (`Cf-Access-Authenticated-User-Email`, serverseitig maskiert) |
| Lokaler Speicher | **IndexedDB** `VVCockpitDB` v2 + `localStorage`-Fallback |
| Sicherheits-Header | `_headers`: strikte CSP, `X-Frame-Options: DENY`, `noindex`, `Permissions-Policy: microphone=(self)` |

**Wichtig:** Die ZIP enthält den **App-Code**, **nicht** die Geschäftsdaten. Die echten Datensätze leben in
IndexedDB (Gerät) bzw. in der D1-Tabelle `cockpit_state` (Cloud) und werden als **Backup-JSON** exportiert.

---

## 2. Speicher- & Sync-Architektur (IST) — und die exakten Instabilitätsursachen

### So funktioniert es heute
- Globale Variable **`data`** (alle Geschäftsobjekte) + `settings` + `nexusBrainUser` werden zu **einem**
  State-Objekt gebündelt: `{ appId, schemaVersion:1, savedAt, data, settings, nexusBrainUser }`.
- Gespeichert wird **das ganze Objekt** unter IndexedDB `appState/main` (Store `appState`), Fallback `localStorage`.
- Cloud-Sync (`POST /api/state`) schickt **den kompletten State als einen JSON-Blob** an D1
  (Tabelle `cockpit_state`, eine Zeile, Spalte `state_json`).
- Nebenläufigkeit über **eine einzige `revision`-Zahl** (optimistic locking).

### Die belegten Ursachen für „instabil / Backup & Sync unzuverlässig"
| # | Ursache (im Code belegt) | Wirkung |
|---|---|---|
| 1 | **Ganzer State als ein Blob** in einer D1-Zeile (`state.js`) | jede Änderung schreibt alles neu; nicht skalierbar |
| 2 | **Eine `revision`** als Sperre: `serverRev > clientRev` → **HTTP 409 conflict** | PC und Handy gleichzeitig → Konflikt, einer verliert/muss neu laden |
| 3 | **`MAX_STATE_BYTES = 4 MB`** (`_common.js`); bei Überschreitung **HTTP 413** | sobald Fotos/PDFs im State → **Speichern schlägt fehl** |
| 4 | **Fotos/Base64 im State** (`measurementDrafts`, `documents`) | treibt den State über 4 MB → Ursache #3 |
| 5 | **30 Vollversionen** (`cockpit_state_versions`, `KEEP_VERSIONS=30`) | jede Speicherung dupliziert MB-State → D1 bläht auf |
| 6 | **`openItemOverrides`** (manuelle Übersteuerung offener Posten) | widersprüchliche offene Posten aus mehreren Quellen |
| 7 | **AI-Keys clientseitig** (`VV_AI_KEY_*` in localStorage) | Schlüssel im Browser (CSP erlaubt direkte Calls zu OpenAI/Anthropic/Groq/Gemini) |
| 8 | **Zwei Sync-Welten parallel** (D1 + begonnener Supabase-Umstieg `vvSupabase*`) | halbfertige Migration, doppelte „Cloud-Stand"-Logik |

> **Fazit:** Genau die in Ihrer Aufgabenstellung verbotenen Muster sind hier die Fehlerquelle:
> Voll-State-JSON als Hauptspeicher, manuelle Cloud-Stand-Logik, Base64 im Datenbestand, handgepflegte
> offene Posten, Keys im Frontend. **V2 vermeidet alle acht.**

### Bereits begonnen: Supabase-Umstieg
Der Code enthält schon `vvSupabaseLoadCloudState`, `vvSupabasePrepareCloudState`, `vvSupabaseSaveCloudState`
und die `_headers`-CSP erlaubt `https://*.supabase.co` (Phase 1, **noch ohne Realtime**).
→ **Die Richtung Supabase war bereits eingeschlagen.** V2 führt das konsequent zu Ende — **mit** Realtime,
**ohne** Voll-State-Blob.

---

## 3. Das echte Datenmodell (globales `data`-Objekt, 22 + 3 Schlüssel)

```js
let data = {
  leads:[], customers:[], measurements:[], projects:[], mileage:[],
  offers:[], invoices:[], bookings:[], openItems:[], materials:[], recurring:[],
  marketingAssets:[], materialCalcs:[], priceCalculations:[], payments:[], timeline:[], documents:[],
  marketingCampaigns:[], contentDrafts:[], publishLog:[], approvalRequests:[],
  staff:[],
  openItemOverrides:{}, counters:{}, meta:{}
};
```

| Collection | Bedeutung | → V2 |
|---|---|---|
| `leads` | Anfragen/Interessenten | in `customers` mit `stage='lead'` (oder schlanke `leads`) |
| `customers` | Kunden (Felder: name, phone/contact, address/place, status, nextStep, createdAt, WhatsApp) | `customers` |
| `measurements` | Aufmaße (top-level, `customerId`, `totalSkirting`/`totalPerimeter`, Räume, Fotos) | `measurements` + `measurement_rooms` |
| `projects` | Projekte/Aufträge | `projects` |
| `mileage` | **Fahrtenbuch** (km) | neue Tabelle `mileage_log` (EÜR-relevant) |
| `offers` | Angebote (`number`/`no`, `customerId`, Positionen, Status) | `offers` + `offer_items` |
| `invoices` | Rechnungen | `invoices` + `invoice_items` |
| `bookings` | Buchungen (Einnahmen/Ausgaben) | `bookings` |
| `openItems` | offene Posten | **`open_items` als berechnete View** |
| `materials` | Material(katalog/-positionen) | `materials` (+ projektbezogene Positionen) |
| `recurring` | wiederkehrende Posten/Rechnungen | `recurring` (V2) |
| `marketingAssets` | Marketing-Medien | Content-/Marketing-Modul (V2) |
| `materialCalcs` | Materialkalkulationen | optional → `calculations` (V2) |
| `priceCalculations` | gespeicherte Preisrechner-Ergebnisse | → Angebotsentwürfe/`calculations` (V2) |
| `payments` | Zahlungen (auch via **Bank-CSV-Import**) | `payments` |
| `timeline` | Aktivitäts-/Kommunikations-Timeline | `activity`/Timeline (V1.1) |
| `documents` | Dokumente/Dateien (teils Base64!) | **`files` + Storage** |
| `marketingCampaigns` | Kampagnen | Content-Modul (V2) |
| `contentDrafts` | KI-Content-Entwürfe (NEXUS) | `nexus_*`/Content (V2) |
| `publishLog` | Veröffentlichungs-Log | Content-Modul (V2) |
| `approvalRequests` | Freigabe-Workflow | Content-Modul (V2) |
| `staff` | Mitarbeiter | `profiles`/`users` |
| `openItemOverrides` | **manuelle Übersteuerung offener Posten** | ❌ **streichen** (Anti-Pattern) |
| `counters` | Nummernkreis-Zähler | `settings` + **Postgres-Sequenz** |
| `meta` | Metadaten | `settings`/`meta` |

> Das Modell ist deutlich **größer** als eine reine Kunden-/Rechnungs-App: Fahrtenbuch, Material,
> wiederkehrende Posten, Bank-CSV-Abgleich, Marketing-/Content-Pipeline, Mitarbeiter, Timeline.
> V2 bildet den **MVP-Kern** ab und reserviert die übrigen für V1.1/V2 (siehe Datei 05).

---

## 4. Firmendaten & Nummernkreise (real, als Seed übernehmen)

`SETTINGS_DEFAULTS` (localStorage `VV_SETTINGS_2026`):
```
company: "Verlegt & Verschraubt Handwerkerservice"
owner:   "Justus Brosch"
address: "Weichselstraße 12, 26388 Wilhelmshaven"
phone:   "0163 4799286"
email:   "justus.brosch@verlegt-verschraubt.de"
web:     "verlegt-verschraubt.de"
tax:     ""          (Steuernummer NICHT gesetzt → in V2 nachtragen)
iban:    ""          (IBAN NICHT gesetzt → in V2 nachtragen)
legal:   "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet."
taxReserve: 35       (Steuerrücklage 35 %)
defaultDepositPercent: 40   (Standard-Anzahlung 40 %)
whatsappWorkerUrl: ""       (WhatsApp via Cloudflare Worker, optional)
```
- Nummernkreise: **`counters`-Objekt** mit Präfixen (Angebot/Rechnung) — in V2 durch **konkurrenzsichere
  Postgres-Sequenz** ersetzen; höchsten vergebenen Wert übernehmen.

---

## 5. Preislogik (real) — inkl. Abweichungen zur Website

Aus `FLOOR_PRICES` / `REMOVAL_PRICES` / Berechnungsfunktionen:
- Boden €/m²: Laminat schw. **16**, PVC schw. **12**, PVC verkl. **15**, Vinyl schw. **18**,
  Vinyl verkl. **22**, Teppich lose **10**, Teppich vollfl. **12**.
- Altbelag: schwimmend **4 €/m²**, Teppich lose **7 €/m² (min 120 €)**, Teppich verkl. **12 €/m² (min 180 €)**.
- Sockelleisten: **5 €/lfm** normal, **7 €/lfm** auf Gehrung.
- Dämmung **1,5 €/m²**; Spachteln Default **8 €/m²** (frei eingebbar).
- Anfahrt: **frei bis 35 km**, danach **0,70 €/km**.

> ⚠️ **Abweichungen zur Marketing-Website** (`Kostenrechner.tsx`): Website nutzt **Anfahrt frei 30 km**
> (Cockpit 35 km) und **Spachteln 19 €/m²** (Cockpit Default 8 €/m²), zusätzlich Materialservice 15 % (min 150 €).
> → In V2 **eine** verbindliche Preisliste (`price_rules`) festlegen und Differenzen mit Justus klären.

---

## 6. NEXUS (KI) — deutlich umfangreicher als „Suche/Befehle"

- **Multi-Provider:** Gemini (`generativelanguage`), **Groq**, **OpenAI**, **Anthropic**, **Ollama (lokal, llama3)**.
- **Sprachsteuerung:** Mikrofon-/Voice-States (`NX_VOICE_STATE`, `nxMicPermissionState`) — Permissions-Policy erlaubt Mikrofon.
- **„NEXUS-Brain":** personalisiertes Gedächtnis (`nexusBrainUser`, `getNexusBrainStored`, Brain-Export/Import).
- **Content-/Marketing-Pipeline:** `contentDrafts`, `marketingCampaigns`, `publishLog`, `approvalRequests`.
- **Keys:** `VV_AI_KEY_*` clientseitig in localStorage — beim Export **strikt entfernt** (gut), aber zur
  Laufzeit im Browser (Risiko). → **V2: alle KI-Calls server-seitig über Edge Functions, Keys in Secrets.**

---

## 7. Auth (IST)

- **Zwei Schichten:** (1) **Cloudflare Access** am Rand (`Cf-Access-Authenticated-User-Email`),
  (2) **In-App-Login mit Passwort + PIN** und **Sperr-Logik** (`vvAuthFailState`, PBKDF2-artig mit Salt/Verifier).
- Login-Geheimnisse leben getrennt (`meta`-Store/Fallback), **nie** im State/Backup.
→ **V2:** durch **Supabase Auth** (server-verifiziertes JWT) + Rollen ersetzen; In-App-Passwort/PIN entfällt.

---

## 8. Backup-/Export-Format (jetzt exakt bekannt)

`doExport()` erzeugt die Datei **`vv-cockpit-backup-YYYY-MM-DD-HHMM.json`**
(→ die ursprünglich genannte `vv-cockpit-backup-2026-06-22-2018.json` ist ein Export vom **22.06.2026, 20:18 Uhr**).
Exakte Struktur:
```jsonc
{
  "version": "VV_COCKPIT_2026",
  "exportedAt": "<ISO>",
  "keyNote": "… API-Keys und Login-Geheimnisse werden nicht exportiert.",
  "data":     { /* die 22+3 Collections aus §3 */ },
  "settings": { /* Firmendaten aus §4, OHNE api/keys */ },
  "nexusBrainUser": { /* NEXUS-Gehirn */ }
}
```
- **API-Keys & Login-Geheimnisse sind NICHT enthalten** (durch `stripKeysForExport` + `vvScrubSecrets`).
- **Fotos/Dokumente können als Base64 enthalten sein** (in `data.documents` / `data.measurements`) → bei der
  Migration nach Storage auslagern.
- Weitere Ein-/Ausgänge: `/api/export-state` (D1-Stand als Download), Snapshots (IndexedDB `snapshots`),
  `importBankCsvFiles` (Bank-CSV → Zahlungen), `nxBrainExportJson`/`Import` (NEXUS-Gehirn).

---

## 9. Weitere Funktionen (Funktionsvorlage, nicht im MVP)
Fahrtenbuch (`mileage`), Materialkalkulation (`materials`/`materialCalcs`), wiederkehrende Posten
(`recurring`), **Bank-CSV-Import** für Zahlungsabgleich, **WhatsApp** (über öffentliche Worker-URL),
Snapshots/Migrationslog, Marketing-/Content-/Freigabe-Workflow, Sprach-Assistent.

---

## 10. Altlasten-Bewertung — übernehmen / NICHT übernehmen

**✅ Übernehmen (gut/wertvoll):**
- Firmendaten, §19-Hinweis, Steuerrücklage 35 %, Anzahlung 40 %.
- Preislogik (als eine verbindliche `price_rules`, Differenzen klären).
- Sekret-Scrubbing-Idee (Keys nie in Export) — in V2 ohnehin Keys nur server-seitig.
- Fachliche Felder/Status der Entitäten (als Mapping-Vorlage, siehe Datei 01).
- Funktionsideen: Bank-CSV-Abgleich, Fahrtenbuch, Snapshots (als Konzept).

**❌ NICHT übernehmen (Altlast/kritisch):**
- Voll-State-JSON als Hauptspeicher (`/api/state`-Blob, `cockpit_state.state_json`).
- Einzel-`revision`-Sperre / 409-Konfliktlogik / manuelle „Cloud-Stand"-Sync.
- 4-MB-Grenze + 30 Vollversionen (Write-Amplification).
- Base64-Fotos/PDFs im State/Backup.
- `openItemOverrides` (manuelle offene Posten).
- Clientseitige AI-Keys (`VV_AI_KEY_*`) + Direktaufrufe der KI-APIs aus dem Browser.
- In-App-Passwort/PIN-Gate + Cloudflare Access als App-Login (→ Supabase Auth).
- Halbfertige parallele Sync-Pfade (D1 **und** Supabase gleichzeitig).

---

## 11. Konsequenzen für die V2-Spezifikation
1. **Datenmodell erweitern** um `mileage_log`, `materials`, `recurring`, Timeline/Activity, Content-/Marketing-
   Tabellen (V2) — siehe Addendum in Datei 02.
2. **Settings/Preise** mit den realen Werten aus §4/§5 seeden.
3. **Migration** kennt jetzt die **exakte** Backup-Struktur (§8) und die Feld-Mappings (Datei 01).
4. **NEXUS** als Multi-Provider-KI + Voice einplanen, aber **server-seitig** und erst nach MVP.
5. **Auth** = Supabase Auth (kein In-App-Passwort, kein Access-Gate).
