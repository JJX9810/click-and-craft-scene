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
const serverEntry = await import(pathToFileURL(serverEntryPath).href);
const { render } = serverEntry;

// --- registry import ---
const registryPath = path.join(serverDir, "route-registry.js");
let getPrerenderPaths;
if (typeof serverEntry.getPrerenderPaths === "function") {
  ({ getPrerenderPaths } = serverEntry);
} else if (fs.existsSync(registryPath)) {
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
    "/handwerkerservice-wittmund",
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
  if (htmlAttrs) {
    const attrs = htmlAttrs.includes('lang=') ? htmlAttrs : `lang="de" ${htmlAttrs}`;
    out = out.replace('<html lang="de">', `<html ${attrs}>`);
  }
  // Explizites robots-Meta für alle Seiten, die keins setzen (Impressum/Datenschutz behalten ihr noindex)
  if (!out.includes('name="robots"')) {
    out = out.replace(
      "</head>",
      '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/></head>',
    );
  }

  const targetDir = p === "/" ? distDir : path.join(distDir, p);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), out, "utf-8");
  // Zusätzlich <pfad>.html schreiben: GitHub Pages liefert damit auch die
  // slashlose URL (Canonical-/Sitemap-Form) direkt mit 200 aus – ohne Redirect.
  if (p !== "/" && !p.endsWith("/")) {
    fs.writeFileSync(path.join(distDir, `${p.replace(/^\//, "")}.html`), out, "utf-8");
  }
  console.log(`  ✓ ${p}`);
}

// --- sitemap.xml ---
const today = new Date().toISOString().slice(0, 10);
// Prioritäten: Leistungsseiten sind das Profil der Domain (0.9),
// Ortsseiten 0.8, leistungsnahe Unterseiten 0.6, reine Ratgeber bewusst
// niedrig (0.4) – die Domain soll als lokaler Betrieb gelesen werden,
// nicht als Ratgeber-Portal.
const PRIO = {
  "/bodenverlegung-wilhelmshaven": "0.9",
  "/kuechenmontage-in-wilhelmshaven": "0.9",
  "/entruempelung-entsorgung-in-wilhelmshaven": "0.9",
  "/umzuege-wilhelmshaven": "0.9",
  "/haushaltsaufloesung-nachlass": "0.6",
  "/messie-wohnung-raeumen": "0.6",
  "/ikea-kueche-montieren-lassen": "0.6",
  "/ratgeber": "0.5",
  "/bodenverlegung-kosten": "0.4",
  "/entruempelung-kosten": "0.4",
  "/vinyl-oder-laminat": "0.4",
  "/renovierung-reihenfolge": "0.4",
  "/altbau-renovieren-wilhelmshaven": "0.4",
  "/kueche-umzug-checkliste": "0.4",
  "/kuechenmontage-steuerlich-absetzen": "0.4",
  "/gebrauchte-kueche-kaufen": "0.4",
  "/boden-selbst-verlegen": "0.4",
  "/bodenverlegung-fussbodenheizung": "0.4",
  "/vinyl-kueche-bad": "0.4",
  "/impressum": "0.3",
  "/datenschutz": "0.3",
};
const urls = paths.map((p) => {
  const loc = SITE + (p === "/" ? "/" : p);
  const priority = p === "/" ? "1.0" : PRIO[p] ?? (p.startsWith("/showroom/") ? "0.7" : "0.8");
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
  `# 2) www → non-www (Hauptdomain ist verlegt-verschraubt.de ohne www)\nRewriteCond %{HTTP_HOST} ^www\\.verlegt-verschraubt\\.de [NC]\nRewriteRule ^ https://verlegt-verschraubt.de%{REQUEST_URI} [L,R=301]\n\n` +
  `# 3) Wenn URL ohne Trailing Slash auf einen Ordner mit index.html zeigt → diese ausliefern\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}/index.html -f\nRewriteRule ^(.*)$ /$1/index.html [L]\n\n` +
  `# 4) SPA-Fallback: alles andere ohne Datei → /index.html (Client-Routing übernimmt)\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteCond %{REQUEST_FILENAME} !-d\nRewriteRule . /index.html [L]\n\n` +
  `# Cache-Header für Assets\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresByType image/png "access plus 1 year"\n  ExpiresByType image/jpeg "access plus 1 year"\n  ExpiresByType image/webp "access plus 1 year"\n  ExpiresByType image/svg+xml "access plus 1 year"\n  ExpiresByType text/css "access plus 1 month"\n  ExpiresByType application/javascript "access plus 1 month"\n  ExpiresByType font/woff2 "access plus 1 year"\n</IfModule>\n\n` +
  `# Gzip\n<IfModule mod_deflate.c>\n  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml\n</IfModule>\n`,
);

// --- llms.txt ---
const rootDir = path.resolve(process.cwd(), "..");
const llmsBasePath = path.resolve(rootDir, "public/llms.txt");
const llmsBase = fs.existsSync(llmsBasePath)
  ? fs.readFileSync(llmsBasePath, "utf8").trimEnd()
  : "# Verlegt & Verschraubt Handwerkerservice\n\n> Bodenverlegung, Küchenmontage und Entrümpelung in Wilhelmshaven & Umgebung.";
const llms = `${llmsBase}\n\n## Seiten\n${paths.map((p) => `- [${p}](${SITE}${p === "/" ? "/" : p})`).join("\n")}\n`;
fs.writeFileSync(path.join(distDir, "llms.txt"), llms);

console.log("[prerender] fertig.");
