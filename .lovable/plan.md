## Plan: Logo, Einsatzgebietskreis, erweiterter Kostenrechner mit WhatsApp-Lead

### 1. Firmenlogo integrieren
- Logo-URL: `https://verlegt-verschraubt.de/wp-content/uploads/2026/05/image003.png`
- Lokal speichern unter `src/assets/logo.png` (für stabilen Build & Bundling).
- `src/components/site/Header.tsx`: Wortmarke durch `<img src={logo}>` ersetzen, Höhe ~40–48px, daneben optional kompakter Schriftzug für SEO/Accessibility (`alt="Verlegt & Verschraubt Handwerkerservice"`).
- `src/components/site/Footer.tsx`: Logo links oben einsetzen (heller Hintergrund-fähig, ggf. invertierte Variante via CSS-Filter falls nötig).
- `src/routes/__root.tsx`: Favicon/og:image Verweis aktualisieren auf das Logo.

### 2. Einsatzgebietskreis auf der Karte
- Karte befindet sich aktuell vermutlich auf `kontakt.tsx` und/oder Ortsseiten als iframe (Google Maps embed). Da iframe-Embeds keine Overlays erlauben, Lösung:
  - Auf der Kontakt-/Startseite die Karte um eine **visuelle Einsatzgebiets-Darstellung** ergänzen: Google Maps Static API ist nicht ohne Key, daher Alternative: Verwendung von **Leaflet + OpenStreetMap** (lib `react-leaflet` + `leaflet`) mit:
    - Zentrum: Wilhelmshaven (53.5285° N, 8.1083° E)
    - `<Circle>` Radius ~30 km in Markenfarbe (transparente Füllung, akzentuierter Rand)
    - Marker auf Wilhelmshaven
  - Unter der Karte Liste der Einsatzorte: Wilhelmshaven, Schortens, Sande, Jever, Varel, Wangerland, Hooksiel.
- Komponente: `src/components/site/EinsatzgebietMap.tsx`, eingebunden in `kontakt.tsx`, `index.tsx` (Trust-Bereich) und Ortsseiten-Template.

### 3. Bodenverlegung-Leistungen erweitern
- `src/routes/bodenverlegung-wilhelmshaven.tsx`: Leistungs-Bullets ergänzen
  - „Boden ausgleichen / Untergrundvorbereitung (Spachteln, Ausgleichsmasse)"
  - „Verlegung von Designböden (Designvinyl, Klick-Vinyl, SPC, LVT)"
- Auch in Header-Dropdown / interner Navigation und FAQ-Snippets entsprechend ergänzen.

### 4. Kostenrechner-Ausbau (`src/routes/preise.tsx`) → neuer Lead-Rechner
Kompletter Rewrite des bestehenden Rechners zu einem **mehrstufigen, mobile-first Rechner mit WhatsApp-Lead**.

#### Architektur
- Neue Komponente: `src/components/site/Kostenrechner.tsx`
- Eingebunden auf `/preise` und als Sektion auf `/` und `/kontakt`.
- State-Management: lokaler `useState` mit Wizard-Schritten (1→2→3→4).

#### Schritt 1 – Leistungsauswahl
Große Karten-Buttons: Bodenverlegung · Küchenmontage · Entrümpelung · Sonstiges Projekt.

#### Schritt 2 – Dynamische Felder

**Bodenverlegung** (erweitert):
- Bodenart (Vinyl, Laminat, Designboden, PVC, Teppich, Sonstiges)
- Fläche m²
- Altbelag entfernen (Ja/Nein)
- Untergrundvorbereitung (Nein / Leicht ausgleichen / Vollflächig spachteln / Unsicher)
- Sockelleisten (Keine / Mit Eckstücken / Auf Gehrung)
- Türen kürzen (Ja/Nein/Unsicher)
- Räume leer (Ja/Nein)
- Ort / PLZ *
- Wunschzeitraum
- Zusatznachricht

**Küchenmontage**:
- Projektart (Neue / Gebrauchte / Umbau / Abbau)
- Laufmeter
- Arbeitsplatte zuschneiden, Geräte einbauen, Spüle montieren (Ja/Nein/Unsicher)
- Demontage alte Küche (Ja/Nein)
- Transport (Ja/Nein)
- Ort/PLZ *, Wunschzeitraum, Zusatznachricht

**Entrümpelung**:
- Objektart, Menge (klein/mittel/groß/sehr groß), Etage, Aufzug, Entsorgung nötig, Ort/PLZ *, Wunschzeitraum, Zusatznachricht

**Sonstiges**: Freitextfeld + Ort/PLZ + Wunschzeitraum.

#### Schritt 3 – Preisspanne
Berechnungslogik (erweitert ggü. heute):
- Boden: Basisrate × m² je Bodenart; Aufschläge für Altbelag, Untergrund (leicht/voll), Sockelleisten (Eckstücke günstiger als Gehrung), Türen kürzen.
- Küche: bestehende Logik + Demontage- und Transportpauschalen.
- Entrümpelung: Volumen-/Mengenklassen × Raumart, Etagenfaktor wenn kein Aufzug.
- Sonstiges: keine Preisspanne, direkt Hinweis „individuelles Angebot".
- Anzeige: „Ihre grobe Ersteinschätzung liegt bei ca. **X – Y €**" + Hinweis Unverbindlichkeit.

#### Schritt 4 – Lead-Box mit WhatsApp
- Telefonnummer: `+49 163 4799286` → wa.me Link `491634799286`.
- Nachricht via `encodeURIComponent`, leere Felder werden ausgelassen (Helper `appendIfSet`).
- Buttons:
  - Primär: „Jetzt per WhatsApp anfragen" (öffnet `wa.me/...?text=...` in neuem Tab → mobile = App, desktop = Web).
  - Sekundär: „Angaben bearbeiten" (zurück zu Schritt 2).
  - Tertiär: „Nachricht kopieren" (Clipboard API + Toast via vorhandenem `sonner`).
  - Telefon-Button: `tel:+491634799286`.
- DSGVO-Hinweis direkt unter den Buttons.
- Trust-Chips: „Kostenlose Ersteinschätzung", „Schnelle Rückmeldung", „Bilder per WhatsApp ergänzbar", „Regional Wilhelmshaven & Umgebung".

#### Validierung
- Pflichtfelder: Leistung, Ort/PLZ, Größe/Fläche/Menge.
- Bei fehlendem Feld: freundliche Inline-Fehlermeldung, kein Schritt-Wechsel.
- Eingaben mit `zod`-Schema validiert (max. Längen, PLZ Pattern `^\d{5}$` optional, Freitext ≤1000 Zeichen).

#### Design
- Holz-/Beige-/Schwarz-Tokens aus `src/styles.css` wiederverwenden, Gold-Akzent über `--accent`.
- Großzügige Touch-Targets (≥48px), klare Schritt-Indikator-Leiste oben.
- Stepper: 1 Leistung · 2 Details · 3 Ergebnis.

### 5. Technische Details
- Neue Dependencies: `leaflet`, `react-leaflet` (für Karte mit Radius). Alternativ ohne lib: SVG-Overlay über statisches OSM-Tile. → Plan: `react-leaflet` (bewährt, klein, edge-kompatibel).
- Logo als `import logo from "@/assets/logo.png"` für Hash-basiertes Asset-Bundling.
- Keine Server-Funktionen nötig (rein clientseitig, WhatsApp Deep-Link).

### 6. Geänderte/neue Dateien
- `src/assets/logo.png` (neu, von URL)
- `src/components/site/Header.tsx` (Logo)
- `src/components/site/Footer.tsx` (Logo)
- `src/routes/__root.tsx` (Favicon/OG)
- `src/components/site/EinsatzgebietMap.tsx` (neu)
- `src/components/site/Kostenrechner.tsx` (neu, ersetzt alte Logik)
- `src/routes/preise.tsx` (nutzt neuen Kostenrechner)
- `src/routes/kontakt.tsx` (Karte + Rechner-Teaser)
- `src/routes/index.tsx` (Karte + Rechner-Sektion)
- `src/routes/bodenverlegung-wilhelmshaven.tsx` (Boden ausgleichen + Designböden)
- `src/components/site/OrtsSeite.tsx` (optional: Karte)
- `package.json` (leaflet, react-leaflet)

### Offene Frage
Soll die Karte (Einsatzgebietskreis) **nur** auf der Kontaktseite erscheinen oder zusätzlich auf der Startseite und allen Ortsseiten? Standardmäßig plane ich: Startseite (kompakt) + Kontaktseite (groß) + Ortsseiten (kompakt mit jeweiligem Ort als Marker).
