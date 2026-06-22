# Altes V&V Cockpit — Referenz (NUR Funktionsvorlage, nicht weiterentwickeln)

Quelle: `vvcockpitv2cloudflaredeploy_2.zip` (vom Auftraggeber bereitgestellt).
Inhalt: das echte alte Cockpit als **Funktions- und Datenmodell-Vorlage** für V2.

- `vvcockpit.html` — die ~1 MB Single-HTML-App (12.400 Zeilen). Enthält Datenmodell (`data`),
  Settings, Preislogik, NEXUS, Auth, Backup-Export. **Enthält keine Live-Secrets** (Keys lebten zur
  Laufzeit in localStorage `VV_AI_KEY_*` und werden aus Exporten entfernt).
- `functions/api/*.js` — Cloudflare Pages Functions des alten **D1-State-Sync** (`/api/state` etc.).
- `_headers` — CSP/Sicherheits-Header der Alt-App.

**Verbindliche Analyse dieser Dateien:** `docs/vv-cockpit-v2/06-altcockpit-ist-analyse.md`.

> ⚠️ Dieser Code wird **nicht** übernommen oder fortgeführt. Er dient ausschließlich als Vorlage für
> Datenmodell, Felder, Preise und Funktionsumfang. Die zu vermeidenden Altlasten (Voll-State-Blob,
> Einzel-Revision-Sync, Base64 im State, clientseitige Keys) sind in Datei 06 §2 und §10 markiert.
