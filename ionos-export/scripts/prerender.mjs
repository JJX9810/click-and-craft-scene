/**
 * Prerender + Asset-Generator für IONOS-Static-Build.
 *
 * Ablauf:
 *   1. vite build (client) hat dist/ erzeugt (inkl. index.html + assets)
 *   2. vite build --ssr hat dist-server/entry-server.js erzeugt
 *   3. Dieses Skript: pro Pfad SSR-render → dist/<pfad>/index.html
 *   4. Schreibt sitemap.xml, robots.txt, .htaccess, llms.txt
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const SITE = "https://verlegt-verschraubt.de";

// --- entry-server importieren (ESM) ---
const serverEntryPath = path.join(serverDir, "entry-server.js");
if (!fs.existsSync(serverEntryPath)) {
  console.error(`[prerender] Missing ${serverEntryPath}. Run 'npm run build:server' first.`);
  process.exit(1);
}
const { render } = await import(pathToFileURL(serverEntryPath).href);

// --- registry import ---
const registryPath = path.join(serverDir, "route-registry.js");
let getPrerenderPaths;
if (fs.existsSync(registryPath)) {
  ({ getPrerenderPaths } = await import(pathToFileURL(registryPath).href));
} else {
  // Fallback statische Liste, falls registry nicht im SSR-Bundle separat liegt
  getPrerenderPaths = () => [
    "/",
    "/bodenverlegung-wilhelmshaven",
    "/kuechenmontage-in-wilhelmshaven",
    "/entruempelung-entsorgung-in-wilhelmshaven",
    "/showroom",
    "/preise",
    "/faq",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/referenzen",
    "/ueber-uns",
    "/partner",
    "/wir-unterstuetzen",
    "/handwerkerservice-wilhelmshaven",
    "/handwerkerservice-schortens",
    "/handwerkerservice-sande",
    "/handwerkerservice-jever",
    "/handwerkerservice-varel",
    "/handwerkerservice-wangerland",
  ];
}

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
const paths = getPrerenderPaths();

console.log(`[prerender] ${paths.length} Pfade…`);

for (const p of paths) {
  let html = "", head = "", htmlAttrs = "";
  try {
    ({ html, head, htmlAttrs } = render(p));
  } catch (err) {
    console.error(`[prerender] FAILED ${p}:`, err.message);
    continue;
  }
  let out = template
    .replace("<!--app-html-->", html)
    .replace("<!--app-head-->", head);
  if (htmlAttrs) out = out.replace("<html lang=\"de\">", `<html lang="de" ${htmlAttrs}>`);

  const targetDir = p === "/" ? distDir : path.join(distDir, p);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), out, "utf-8");
  console.log(`  ✓ ${p}`);
}

// --- sitemap.xml ---
const today = new Date().toISOString().slice(0, 10);
const urls = paths.map((p) => {
  const loc = SITE + (p === "/" ? "/" : p);
  const priority = p === "/" ? "1.0" : p.startsWith("/showroom/") ? "0.7" : "0.8";
  const changefreq = p === "/" ? "weekly" : "monthly";
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n");
fs.writeFileSync(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log("[prerender] sitemap.xml geschrieben");

// --- robots.txt ---
fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
);

// --- .htaccess: HTTPS + www + SPA-Fallback ---
fs.writeFileSync(
  path.join(distDir, ".htaccess"),
  `# IONOS / Apache config für Verlegt & Verschraubt (statischer Build)\n` +
  `Options -MultiViews\nRewriteEngine On\n\n` +
  `# 1) HTTP → HTTPS\nRewriteCond %{HTTPS} !=on\nRewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n` +
  `# 2) non-www → www (Hauptdomain ist www.verlegt-verschraubt.de)\nRewriteCond %{HTTP_HOST} ^verlegt-verschraubt\\.de [NC]\nRewriteRule ^ https://verlegt-verschraubt.de%{REQUEST_URI} [L,R=301]\n\n` +
  `# 3) Wenn URL ohne Trailing Slash auf einen Ordner mit index.html zeigt → diese ausliefern\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}/index.html -f\nRewriteRule ^(.*)$ /$1/index.html [L]\n\n` +
  `# 4) SPA-Fallback: alles andere ohne Datei → /index.html (Client-Routing übernimmt)\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]\n\n` +
  `# Cache-Header für Assets\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType image/png "access plus 1 year"\n  ExpiresByType image/jpeg "access plus 1 year"\n  ExpiresByType image/webp "access plus 1 year"\n  ExpiresByType image/svg+xml "access plus 1 year"\n  ExpiresByType text/css "access plus 1 month"\n  ExpiresByType application/javascript "access plus 1 month"\n  ExpiresByType font/woff2 "access plus 1 year"\n</IfModule>\n\n` +
  `# Gzip\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml\n</IfModule>\n`,
);

// --- llms.txt ---
const llms = `# Verlegt & Verschraubt Handwerkerservice\n\n> Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung.\n\n## Seiten\n${paths.map((p) => `- [${p}](${SITE}${p === "/" ? "/" : p})`).join("\n")}\n`;
fs.writeFileSync(path.join(distDir, "llms.txt"), llms);

console.log("[prerender] fertig.");
