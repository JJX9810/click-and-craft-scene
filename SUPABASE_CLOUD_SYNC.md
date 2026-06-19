# Supabase Cloud-Synchronisation – Phase 1 (Mirror-/Testmodus)

Kontrollierte Anbindung von Supabase als **gemeinsamer Cloud-Spiegel**. IndexedDB
bleibt lokaler Hauptspeicher; Supabase wird **nicht** ungefragt zur Hauptquelle.

## Architektur

- **Variante B – direkte `fetch`-Aufrufe** gegen die offiziellen Supabase-REST-/Auth-
  Endpunkte. Kein externes CDN-Skript (CSP bleibt streng: nur `connect-src` ergänzt,
  kein `script-src`-CDN, keine gebündelte Fremdbibliothek).
- Eigene, klar abgegrenzte Schicht `vvSupabase*` in `vvcockpit.html`
  (Config, Client, Auth, Workspace, Cloud-State, Sync, Konflikt, Status, Log, UI, NEXUS).
- Config/Session liegen **getrennt** vom Geschäftsdaten-State in eigenen
  localStorage-Schlüsseln (`VV_SUPABASE_CONFIG`, `VV_SUPABASE_SESSION`, `VV_SUPABASE_META`,
  `VV_SUPABASE_SYNCLOG`) – nie im `appState`/Backup.

## Dateien

- `vvcockpit.html` – Supabase-Schicht + UI (Einstellungen → Backup/Datenspeicher →
  „☁️ Supabase Cloud-Synchronisation“) + NEXUS-Statusbefehle.
- `deploy/index.html`, `deploy/vvcockpit.html` – synchronisiert.
- `deploy/_headers` – `connect-src` um `https://*.supabase.co` ergänzt (siehe CSP-Hinweis).
- `supabase/migrations/20260619_vv_cockpit_cloud_sync.sql` – idempotente Migration
  (Tabellen, RLS, Policies, Funktionen). **Nicht** automatisch ausgeführt.
- `supabase/verify_vv_cockpit_cloud_sync.sql` – nur-lesendes Prüfskript.

## Sicherheit

- Im Browser nur **Project URL**, **Publishable Key**, **Workspace-ID** (+ Session-Token
  des offiziellen Auth-Flows). **Niemals** service_role/Secret Key/DB-Passwort/JWT-Secret.
- **Supabase-Passwort** wird nie gespeichert, geloggt, ins appState/Backup/Debug übernommen.
- Der **Secret-Scrubber** ist EINE Quelle (`vvScrubSecrets`/`vvStripSecretsFromState`),
  erweitert um Session-/Service-/JWT-Muster. `vvSupabasePrepareCloudState()` baut darauf auf.
- **RLS** auf allen drei Tabellen; `anon` erhält keine Rechte; Schreibzugriff nur über die
  SECURITY-DEFINER-Funktion `save_cockpit_state` (Revision/Owner-Partner-Prüfung).
- Publishable Key wird nur **maskiert** angezeigt und nicht vorgelesen.

## Mirror-Modus & Schutz vor Datenverlust

- Kein automatisches Überschreiben. Leerer Cloud-Stand wird **nie** automatisch lokal
  übernommen – stattdessen Hinweis + Erstimport-Assistent mit Bestätigungsphrase
  „Lokalen Stand erstmals in Supabase speichern“.
- **Revisions-/Konfliktschutz**: geladene Revision → `expected_revision`; bei neuerer
  Cloud-Revision `revision_conflict` (kein Last-Write-Wins). Konfliktmodal mit Optionen;
  „Lokalen Stand als neue Version speichern“ erfordert starke Bestätigung.
- **Doppel-Save-Schutz**: `_vvSupaSyncInFlight` wird synchron gesetzt – keine parallelen Saves.
- **Fotos/PDFs/Base64** werden in Phase 1 nicht übertragen, sondern als `__omitted`
  (nur lokal) markiert. Payload-Obergrenze ~6 MB.
- Vor Erstimport / Cloud-Übernahme / Force-Local wird ein lokaler **Snapshot** erstellt.
- Auto-Sync ist standardmäßig **aus** (manueller Mirror); aktivierbar mit Verzögerung
  (Standard 8 s). Auto-Sync pausiert bei Sperre, offline oder fehlender Session.

## NEXUS-Befehle (nur sichere Statusabfragen direkt)

„Cloud-Speicher öffnen“, „Supabase-Status“, „bin ich angemeldet?“, „wann zuletzt
synchronisiert?“, „Cloud-Revision“, „Supabase-Verbindung prüfen“, „von Supabase abmelden“,
„gibt es einen Konflikt?“. Cloud-Speichern/Erstimport erfordern Vorschau + Bestätigung im
Panel – NEXUS überschreibt nie automatisch.

## CSP-Hinweis

`connect-src` enthält aktuell `https://*.supabase.co` (Wildcard), damit die Projekt-URL
frei eingetragen werden kann. **Sobald die konkrete Projekt-Ref feststeht**, sollte die
**exakte** Origin `https://<projektref>.supabase.co` eingetragen werden. Kein Realtime in
Phase 1 (sonst zusätzlich `wss://<projektref>.supabase.co`).

## Manuell nötig (vom Nutzer / im Supabase-Dashboard)

1. Migration `20260619_vv_cockpit_cloud_sync.sql` im SQL-Editor einspielen, danach
   `verify_vv_cockpit_cloud_sync.sql` zur Kontrolle ausführen.
2. Supabase-Benutzer (Justus) anlegen / E-Mail bestätigen.
3. Workspace anlegen und Mitgliedschaft `owner` eintragen (Justin später `partner`).
4. Im Cockpit: Project URL, Publishable Key, Workspace-ID, E-Mail eintragen, speichern,
   „Verbindung testen“, „Bei Supabase anmelden“, „Cloud-Stand prüfen“, dann bewusst
   „Lokalen Stand erstmals in Supabase speichern“.
5. Optional: exakte Projekt-Origin in `deploy/_headers` setzen und neu deployen.

## Tests

`/tmp/supabase_test.js`: **80 Assertions grün** (Config/Validierung, Maskierung, Auth inkl.
fehlerhafter Logins/Refresh/Logout, Workspace-Rollen owner/partner/viewer/kein Mitglied,
Cloud-State leer/vorhanden, Revision/Konflikt, offline/Rate-Limit/Payload, Secret-Scrubber
+ Blob-Auslassung, Doppel-Save-Schutz, Auto-Sync-Pausen, secret-freies Log mit Cap,
Fehlerübersetzungen). Bestandssuiten unverändert grün (insgesamt 748 Assertions).
