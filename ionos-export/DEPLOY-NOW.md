# IONOS Deploy Now – Build-Einstellungen

Automatisches Deployment: jeder Push auf `main` baut und veröffentlicht die Website.

Beim Verbinden des Repos im Deploy-Now-Assistenten diese Werte eintragen:

- **Framework/Preset:** Custom / Static Site
- **Build command:**
  `cd ionos-export && npm ci && npm run build`
- **Publish directory / Dist folder:**
  `ionos-export/dist`
- **Node version:** 22

Hinweise:
- `.npmrc` in `ionos-export/` setzt `legacy-peer-deps` (React-19-Peer-Konflikt von react-helmet-async) und die npmjs-Registry.
- Das `prebuild`-Script verlinkt `node_modules` an die Projektwurzel, damit Vite die Route-Dateien aus `../src` auflösen kann.
- Die `.htaccess` (HTTPS-, www→non-www-Redirects) liegt im Build-Output und wird mit deployt.
