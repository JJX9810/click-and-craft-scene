# V&V Cockpit – Zentrale D1-State-Synchronisation (Phase 1)

PC und Handy laden/speichern automatisch denselben Cockpit-Stand über
Cloudflare Pages Functions (`/api/...`) und die D1-Datenbank (Binding `DB`).
IndexedDB bleibt lokaler Cache. Kein Neuaufbau des Cockpits.

## 1) Geänderte Dateien
- `vvcockpit.html` – additiv: D1-Sync-Client (`vvD1Init`, `vvD1PullNow`, `vvD1FlushSave`,
  `vvD1MergeOmitted`, Status-Badge unten rechts), Autosave-Hook ruft zusätzlich
  `vvD1MarkDirty()`, Start in `vvPostBoot` via `vvD1Init()`. Die alte manuelle
  Supabase-Cloud-Oberfläche wird nur **ausgeblendet** (`vvSupabaseRenderPanel`),
  der Code bleibt erhalten. Login, NEXUS, Kundenkartei, Angebote, Buchhaltung
  unverändert.
- `deploy/index.html`, `deploy/vvcockpit.html` – mit der Hauptdatei synchronisiert.
- `deploy/_headers` – unverändert; `connect-src 'self'` erlaubt `/api` (same-origin).

## 2) Neue Dateien
- `deploy/functions/api/_common.js` – gemeinsame Helfer (Schema, Actor maskiert, JSON).
- `deploy/functions/api/health.js` – `GET /api/health`.
- `deploy/functions/api/init-db.js` – `POST` (und `GET`) `/api/init-db` (idempotent).
- `deploy/functions/api/state.js` – `GET`/`POST /api/state` (Revision + 409-Konflikt).
- `deploy/functions/api/export-state.js` – `GET /api/export-state` (JSON-Download).
- `dist/vv-cockpit-v2-cloudflare-deploy.zip` – fertiges Direct-Upload-Paket
  (enthält `index.html`, `vvcockpit.html`, `_headers`, `functions/api/*`).

> Wichtig: Für Cloudflare Pages muss der Ordner **`functions/`** im Upload-Root
> liegen (parallel zu `index.html`). Genau so ist das ZIP aufgebaut.

## 3) Neu bei Cloudflare Pages hochladen (Direct Upload)
1. Cloudflare Dashboard → Workers & Pages → Projekt **vv-cockpit-v2**.
2. Sicherstellen, dass das D1-Binding gesetzt ist: Settings → Functions →
   D1 database bindings → Variable **`DB`** → Datenbank **vv_cockpit_state**.
   (Für Production und Preview setzen.)
3. „Create deployment“ / „Upload assets“ → die **Dateien aus `deploy/`**
   bzw. den Inhalt von `dist/vv-cockpit-v2-cloudflare-deploy.zip` hochladen,
   sodass im Root `index.html` und der Ordner `functions/` liegen.
4. Deployment starten. Cloudflare Access bleibt davor aktiv.

## 4) `/api/health` testen
- Im Browser (eingeloggt über Access): `https://vv-cockpit-v2.pages.dev/api/health`
- Erwartet: `{"ok":true,"timestamp":"…","db":"erreichbar"}`.
- Kommt `db:"D1-Binding 'DB' nicht gefunden"`, ist das Binding nicht gesetzt (siehe 3.2).

## 5) `/api/init-db` ausführen (einmalig, idempotent)
- Bequem im Browser: `https://vv-cockpit-v2.pages.dev/api/init-db` aufrufen (GET),
  oder per `POST`:
  `curl -X POST https://vv-cockpit-v2.pages.dev/api/init-db` (nur möglich, wenn der
  Access-Schutz das zulässt – sonst einfach die URL im eingeloggten Browser öffnen).
- Erwartet: `{"ok":true,"message":"Tabellen vorhanden oder neu angelegt (idempotent)."}`
- Danach `https://vv-cockpit-v2.pages.dev/api/state` → `{"ok":true,"revision":0,...}`.

## 6) PC ↔ Handy testen
1. Am PC einloggen, eine Kleinigkeit ändern (z. B. Kundennotiz). Unten rechts
   erscheint kurz „⏳ Speichert …“, dann „✓ Synchronisiert“.
2. Am Handy dieselbe Seite öffnen (über Access einloggen). Innerhalb weniger
   Sekunden (Auto-Poll alle 5 s bzw. beim Tab-Fokus) erscheint der PC-Stand.
3. Am Handy etwas ändern → „✓ Synchronisiert“; am PC erscheint die Änderung.
4. Konfliktfall (beide gleichzeitig offline geändert): Badge zeigt
   „⚠ Neuere Version vorhanden – tippen zum Neuladen“. Antippen lädt den
   Cloud-Stand (nach Rückfrage). Es wird nichts blind überschrieben.

## 7) Rollback
- **Schnell (nur Frontend):** in `vvPostBoot` die Zeile `try{ vvD1Init(); }catch(e){}`
  entfernen oder auskommentieren und neu deployen → kein Auto-Sync, Cockpit läuft
  rein lokal wie zuvor (IndexedDB).
- **Komplett:** in Cloudflare Pages → Deployments das vorherige Deployment
  „Rollback“/„Restore“ wählen.
- **Daten:** Es werden keine Daten gelöscht. Frühere Stände liegen in D1 in
  `cockpit_state_versions`; lokal zusätzlich in den IndexedDB-Snapshots.
- Die alte Supabase-Sync-Oberfläche ist nur ausgeblendet (`_vvSupabaseUiHidden=true`)
  und kann durch Setzen auf `false` wieder eingeblendet werden.

## Sicherheit / Grenzen (Phase 1)
- Keine Secrets in der API-Antwort; fehlendes `DB`-Binding wird sauber gemeldet.
- `updated_by` wird – falls vorhanden – aus dem von Cloudflare Access verifizierten
  Header `Cf-Access-Authenticated-User-Email` **maskiert** abgeleitet; sonst „cockpit“.
  Keine vom Browser gelieferte E-Mail wird vertraut.
- Der Client sendet nur den bereits **secret-bereinigten** State; große Base64-Fotos/
  PDFs werden ausgeklammert (`{__omitted:true}`) und bleiben lokal. Server-Limit 4 MB.
- Es werden keine API-Keys, Passwörter, Hashes oder Tokens gespeichert/exportiert/geloggt.
