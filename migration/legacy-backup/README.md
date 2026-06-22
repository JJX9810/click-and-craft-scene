# Alt-Backup hier ablegen

Lege die Datei **`vv-cockpit-backup-2026-06-22-2018.json`** (oder das jeweils aktuellste Alt-Cockpit-Backup)
in **diesen Ordner** und committe sie. Danach kann eine datensatzgenaue Analyse und das Feld-Mapping erstellt
werden (siehe `docs/vv-cockpit-v2/01-backup-analyse-und-migration.md`).

Hinweis:
- Die Datei enthält personenbezogene Kundendaten und ggf. Base64-Fotos → **nicht öffentlich** machen.
- Falls API-Keys (z. B. NEXUS) enthalten sind: diese werden bei der Migration **verworfen und rotiert**,
  nicht übernommen.
