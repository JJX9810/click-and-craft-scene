/**
 * Verlinkt ionos-export/node_modules auf die Projektwurzel (../node_modules),
 * damit Vite/Rollup Pakete auch für Dateien aus ../src auflösen kann.
 * Nötig in CI-Umgebungen (z. B. IONOS Deploy Now), wo nur in ionos-export
 * installiert wird. Läuft automatisch als "prebuild".
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const exportDir = path.resolve(here, "..");
const rootDir = path.resolve(exportDir, "..");
const target = path.join(exportDir, "node_modules");
const link = path.join(rootDir, "node_modules");

if (!fs.existsSync(link) && fs.existsSync(target)) {
  fs.symlinkSync(target, link, "junction");
  console.log("[link-root-modules] node_modules an Projektwurzel verlinkt");
} else {
  console.log("[link-root-modules] nichts zu tun");
}
