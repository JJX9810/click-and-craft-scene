# V&V Cockpit – Cloudflare-Pages-Deploy

Eigenständiges Single-File-Tool (kein Teil der TanStack-Website im `src/`-Ordner).

## Dateien
- `vvcockpit.html` – die Anwendung (eine Datei, alles inline).
- `index.html` – identische Kopie von `vvcockpit.html` (Einstiegspunkt für Cloudflare Pages).
- `_headers` – Sicherheits-Header (CSP, noindex, no-store …) für Cloudflare Pages.

`index.html` und `vvcockpit.html` müssen inhaltsgleich bleiben.

## Angebotsmodul – Reparatur (Juni 2026)
Behoben wurde ausschließlich das Angebotsmodul:
- Positionszeile (`.item-row`) auf vollständiges, nicht abgeschnittenes Spaltenraster
  umgestellt; Feld „Gesamt (€)“ ist jetzt vollständig sichtbar und im Modus
  „Gesamtbetrag direkt“ editierbar.
- Berechnungsart je Position: `Menge × Einzelpreis` (`quantity_unit_price`) und
  `Gesamtbetrag direkt` (`direct_total`).
- Pauschalpositionen mit leerer Menge erzeugen keine stille 0,00 € mehr
  (Menge automatisch 1 bzw. klarer Hinweis).
- Untere Endsumme: automatisch oder manuell (`totalMode` = `automatic`/`manual`)
  mit transparenter Abweichungsanzeige.
- Anzahlung, Restzahlung, Vorschau, PDF und erzeugte Rechnung rechnen mit der
  tatsächlichen Endsumme (`finalTotal`).
- Bestehende Angebote werden automatisch migriert (kompatibel).

Kundenkartei, Login, NEXUS, Speicherung und Sicherheitslogik wurden nicht verändert.
