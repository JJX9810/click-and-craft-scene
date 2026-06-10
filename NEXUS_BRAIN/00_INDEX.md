# NEXUS-Gehirn – Index

Das NEXUS-Gehirn ist die lokale Wissensbasis des V&V-Cockpits. Es liegt als
Markdown-Vault (Obsidian-kompatibel) in diesem Ordner und wird mit
`node tools/build-nexus-brain.js` zu einer kompakten JSON-/JS-Wissensbasis
exportiert, die direkt in die Cockpit-HTML eingebettet wird
(`--embed`). Das Browser-Cockpit liest **nie** automatisch diesen Ordner –
es nutzt nur den eingebetteten Export plus den Nutzer-Lernspeicher im
Browser (`localStorage["VV_NEXUS_BRAIN_USER"]`).

## So funktioniert das Gehirn

1. Markdown hier pflegen (von Hand oder mit Claude Code).
2. `node tools/build-nexus-brain.js --embed` ausführen.
3. Cockpit neu laden – NEXUS kennt die Begriffe sofort.
4. Im Cockpit Gelerntes landet getrennt im Nutzer-Lernspeicher und kann als
   JSON exportiert/importiert werden.

**Sicherheit:** In diesem Vault stehen niemals API-Keys, Kundendaten oder
sensible Daten – nur Begriffe, Regeln, Seiten, Tools und Arbeitslogik.

## Wissensbereiche

- [[01_Begriffe_und_Synonyme]] – Glossar, Synonyme, Standard-Intents/-Tools, Gefahrenregeln
- [[02_Cockpit_Seiten]] – alle Seiten mit IDs, Anzeigenamen und Synonymen
- [[03_Cockpit_Tools]] – Tool-Registry mit Sicherheitsklassen
- [[04_Sicherheitsregeln]] – Löschschutz, Massenaktionen, Veröffentlichungsschutz
- [[05_VV_Unternehmenswissen]] – Unternehmen, Leistungen, Grenzen, Recht/Steuern
- [[06_Buchhaltung_und_offene_Posten]] – offene Posten, Einnahmen/Ausgaben, Rücklagen
- [[07_Kunden_und_Auftraege]] – Kundenkartei, Status, Aufträge, Baustellen
- [[08_Marketing_und_Content]] – Anzeigen, Posts, Veröffentlichungsregeln
- [[09_Agentenrollen]] – NEXUS-Agenten, Aufgaben, Grenzen
- [[10_Beispielbefehle]] – Few-Shot-Beispiele für Groq/Gemini
- [[11_Lernspeicher_und_Erinnerungen]] – Regeln für das Lernen neuer Begriffe
