# IONOS Self-Hosting – Verlegt & Verschraubt

Dieser Ordner ist ein **eigenständiger statischer Build** der Website für IONOS-Webhosting. Er ist **vollständig getrennt** vom Lovable-/Cloudflare-/TanStack-Start-Setup im Hauptordner. Lovable wird nicht beeinflusst, kein Cloudflare Worker, kein Backend zur Laufzeit, kein Vercel.

## Was hier passiert (in 60 Sekunden)

- Routen und Komponenten werden **aus dem Hauptprojekt wiederverwendet** (`../src/`).
- Ein Vite-Alias mappt `@tanstack/react-router` auf einen kleinen Shim (`src/tanstack-shim.tsx`), der intern `react-router-dom` + `react-helmet-async` nutzt – so kompilieren die existierenden Route-Dateien unverändert.
- Beim Build wird **jede wichtige Route zu einer eigenen `index.html` prerendert**, inklusive Title, Description, Open-Graph-Tags, Canonical, JSON-LD und sichtbarem HTML-Inhalt.
- Das Kontaktformular läuft ohne Backend: **mailto:**, **WhatsApp** und **tel:**-Buttons. CTAs: Anrufen / WhatsApp / E-Mail / Projekt mit Bildern und Maßen.
- Die kanonische Hauptdomain ist **`https://verlegt-verschraubt.de`** (OHNE www). www → 301 auf non-www, HTTP → HTTPS, beides via `.htaccess`.

## Build erzeugen

```bash
cd ionos-export
npm install        # oder: bun install
npm run build
```

Das erzeugt **`ionos-export/dist/`** mit:

```
dist/
  index.html                                    # Startseite, voll prerendert
  bodenverlegung-wilhelmshaven/index.html
  kuechenmontage-in-wilhelmshaven/index.html
  entruempelung-entsorgung-in-wilhelmshaven/index.html
  showroom/index.html
  showroom/<slug>/index.html                    # eine HTML-Datei pro Showroom-Projekt
  preise/index.html
  faq/index.html
  kontakt/index.html
  impressum/index.html
  datenschutz/index.html
  referenzen/index.html
  ueber-uns/index.html
  partner/index.html
  wir-unterstuetzen/index.html
  handwerkerservice-wilhelmshaven/index.html
  handwerkerservice-schortens/index.html
  handwerkerservice-sande/index.html
  handwerkerservice-jever/index.html
  handwerkerservice-varel/index.html
  handwerkerservice-wangerland/index.html
  assets/<hash>.js / .css                       # gebündelte Assets
  logo.png, wood-bg.png, projects/...           # statische Bilder aus public/
  robots.txt
  sitemap.xml
  llms.txt
  .htaccess                                     # HTTPS + www + SPA-Fallback
```

## Lokal testen

```bash
npm run preview
```

Öffnet `http://localhost:4173`. Alle Routen sollten direkt funktionieren – auch nach Reload (durch die einzelnen `index.html`-Dateien). Quelltext im Browser prüfen: jede Seite hat ihren eigenen `<title>`, `<meta name="description">`, OG-Tags und `<link rel="canonical">` mit `https://verlegt-verschraubt.de/...`.

## Upload zu IONOS

### Variante A — IONOS Webhosting (klassisch via SFTP / WebDAV)

1. Im IONOS-Kundencenter: **Hosting → Webspace → SFTP/SSH-Zugangsdaten** notieren (Host, Benutzer, Passwort).
2. Mit FileZilla, Cyberduck oder `rsync` verbinden.
3. **Inhalt von `ionos-export/dist/`** (NICHT der Ordner selbst, sondern alles **darin**) ins Webroot der Domain hochladen.
   - Das Webroot heißt bei IONOS typischerweise:
     - `/` direkt nach Login, oder
     - `/clickandbuilds/<projekt>/` bzw. `/homepages/.../htdocs/` — je nach Tarif.
     - Faustregel: Der Ordner, in dem aktuell schon eine `index.html` oder eine Standard-IONOS-Platzhalterseite liegt.
4. Nach dem Upload muss im Webroot diese Struktur stehen:
   ```
   /index.html
   /.htaccess
   /robots.txt
   /sitemap.xml
   /assets/...
   /bodenverlegung-wilhelmshaven/index.html
   ...
   ```
5. **Wichtig:** `.htaccess` mit hochladen (manche FTP-Clients verstecken Punkt-Dateien — Anzeige aktivieren).

### Variante B — IONOS Deploy Now (GitHub-Auto-Deploy)

1. Im IONOS-Kundencenter: **Deploy Now → Projekt erstellen** → mit GitHub-Repo verbinden.
2. Build-Konfiguration:
   - **Build command:** `cd ionos-export && npm install && npm run build`
   - **Output directory:** `ionos-export/dist`
3. Domain `verlegt-verschraubt.de` und `www.verlegt-verschraubt.de` im Deploy-Now-Projekt mit dem gewünschten Branch verknüpfen.
4. Deploy Now generiert SSL-Zertifikat automatisch.

## DNS-Einträge bei IONOS

Hauptdomain ist **www.verlegt-verschraubt.de** (Canonical). Im IONOS DNS-Manager:

| Typ | Name | Wert | TTL |
|---|---|---|---|
| `A` | `@` (verlegt-verschraubt.de) | IONOS-Webspace-IP (steht in der Hosting-Übersicht; meist `217.160.x.x`) | 3600 |
| `AAAA` | `@` | IPv6 des Webspace (falls vorhanden) | 3600 |
| `CNAME` | `www` | `verlegt-verschraubt.de.` | 3600 |
| `MX` | `@` | bestehende IONOS-Mail-Einträge **unverändert lassen** | — |
| `TXT` | `@` | bestehende SPF/DKIM-Einträge **unverändert lassen** | — |

Bei Deploy Now zeigt IONOS die exakten Werte direkt im Projekt an — einfach 1:1 übernehmen.

## Was vorher entfernt werden muss

- **Vercel-Projekt:** `click-and-craft-scene.vercel.app` im Vercel-Dashboard löschen oder zumindest die Domain-Verknüpfung mit `verlegt-verschraubt.de` entfernen, damit DNS sauber auf IONOS zeigt.
- **Alte DNS-Einträge bei IONOS:** falls noch ein A-Record oder CNAME auf Vercel/Cloudflare zeigt → ersetzen durch IONOS-Webspace-Werte (siehe oben).
- **Lovable-Custom-Domain:** in den Lovable-Projekteinstellungen die Custom-Domain entfernen, sobald IONOS live und getestet ist. Solange das Lovable-Pro-Abo läuft, kann es als Backup koexistieren.

## Funktionstest nach Upload

1. **HTTPS + www-Redirect:** Aufrufen von `http://verlegt-verschraubt.de` → muss landen bei `https://verlegt-verschraubt.de/`.
2. **Direkter Aufruf einer Unterseite per URL:** `https://verlegt-verschraubt.de/bodenverlegung-wilhelmshaven` → muss sofort die Seite zeigen, nicht 404.
3. **Reload auf Unterseite:** Auf `/showroom` F5 drücken → Seite bleibt da.
4. **SEO-Quelltext:** Rechtsklick → Seitenquelltext anzeigen. Im `<head>` müssen Title und Description **dieser konkreten Seite** stehen (nicht der Startseite).
5. **Canonicals:** `<link rel="canonical" href="https://verlegt-verschraubt.de/...">` auf jeder Seite passend zur URL.
6. **robots.txt:** `https://verlegt-verschraubt.de/robots.txt` zeigt Sitemap-Verweis.
7. **sitemap.xml:** `https://verlegt-verschraubt.de/sitemap.xml` listet alle Seiten.
8. **Kontaktformular:** Auf `/kontakt` Felder ausfüllen → „Per E-Mail senden" öffnet Mail-Programm mit vorbefüllter Anfrage. „Per WhatsApp" öffnet WhatsApp Web/App.
9. **In Search Console**: neue Sitemap einreichen unter `https://verlegt-verschraubt.de/sitemap.xml`.

## Wenn später ein echtes Kontaktformular gewünscht ist

Optionen, die mit IONOS-Webhosting kompatibel sind (jeweils eine kleine Codeänderung in `src/IonosKontakt.tsx`):

- **Formspree** (`https://formspree.io`) — kostenloser Tier, einfach `<form action="https://formspree.io/f/<id>" method="POST">`.
- **IONOS-eigenes PHP-Skript** im `dist/api/`-Ordner (PHP läuft bei IONOS-Webhosting nativ).
- **Web3Forms** oder **Getform** als Alternative zu Formspree.

Für die erste Inbetriebnahme reichen die jetzigen mailto:- und WhatsApp-CTAs.

## Was sich technisch unterscheidet vom Lovable-Setup

| Lovable / Cloudflare | IONOS-Export |
|---|---|
| TanStack Router | react-router-dom (via Shim transparent) |
| SSR im Cloudflare Worker | Statisches Prerendering zur Buildzeit |
| `src/routes/sitemap[.]xml.ts` (Server-Route) | Statische `sitemap.xml` (vom Build erzeugt) |
| `head()` mit live `loaderData` | `head()` mit zur Buildzeit aufgelöstem `loaderData` |
| Lovable Cloud / Edge Functions | Nicht verfügbar — nur statische Dateien |
| `.lovable.app` / Cloudflare Edge | IONOS Apache-Webspace |

## Wichtig: Lovable bleibt unangetastet

- Es wurde **keine Datei** im Hauptprojekt geändert.
- Der Cloudflare-Worker-Build, `wrangler.jsonc`, `vite.config.ts`, `src/server.ts` etc. bleiben funktionsfähig.
- Du kannst weiterhin in Lovable arbeiten, Preview-URLs nutzen und publishen.
- Für IONOS einfach den Build in `ionos-export/` neu erzeugen und hochladen.
