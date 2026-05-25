## Prüfungsergebnisse

**1. Großbuchstaben-URLs (`/Kontakt`, `/Preise`, `/Referenzen`)**
Grep über `src/`, `public/`, `ionos-export/` → **keine Treffer**. Alle Links sind bereits kleingeschrieben. Keine Korrektur nötig.

**2. `prefers-reduced-motion`**
Bereits in `src/styles.css` (Zeilen 214–221) korrekt implementiert:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-hero-float, .animate-marquee,
  .animate-aurora-shift, .animate-shimmer,
  .animate-fade-up { animation: none; }
  .tile-shader::after { animation: none; }
}
```
Hero-Aurora wird automatisch deaktiviert. Keine Änderung nötig.

**3. www → non-www (302)**
Hosting-/Domain-Aufgabe (Cloudflare/Lovable-Custom-Domain). Im Code nicht lösbar. Bleibt offen.

---

## Geplante Mini-Änderungen

### Änderung A — `public/llms.txt`
Zwei Zeilen entfernen (rechtliche Pflichtseiten, keine AEO-Zielseiten):
- `- [Impressum](/impressum): …`
- `- [Datenschutz](/datenschutz): …`

Beide Seiten bleiben normal erreichbar; keine noindex-/Sitemap-Änderung.

### Änderung B — `src/routes/sitemap[.]xml.ts`
Einheitliches `<lastmod>` pro URL ergänzen, basierend auf einem einzigen Build-Konstanten-Datum (kein künstlich rotierendes Datum). Vorgehen:
- Konstante `const LAST_MOD = "2026-05-25";` (heutiges Build-Datum) am Dateianfang.
- Im URL-Block direkt nach `<loc>` ein `<lastmod>${LAST_MOD}</lastmod>` einfügen.
- Gleicher Wert für alle Einträge → ehrliche Aussage „Site zuletzt zum Build-Datum aktualisiert".

Keine weiteren Änderungen an Prioritäten, Pfaden oder Struktur.

---

## Bestätigung Out-of-Scope
Keine Slug-Änderungen, keine Routen, keine Meta-/Canonical-/OG-/Schema-Änderungen, keine Header/Footer/Kontaktformular-Änderungen, keine Design-System-Änderung, keine neuen Libraries.
