
## Ziel

Attribution-System verifizieren, ohne externe Analytics/Consent/GA4 anzufassen. Zusätzlich ein internes Debug-Panel auf `/preise?debug=1` einbauen, damit QR-Codes und Kurzlinks vor Ort schnell überprüfbar sind.

## Umsetzung

### 1. Neue Komponente: `src/components/site/AttributionDebugPanel.tsx`
- Liest `?debug=1` aus der URL (über `useSearch` / `window.location.search`).
- Rendert `null`, wenn `debug` nicht gesetzt → normale Besucher sehen nichts.
- Zeigt sonst eine schlichte, gerahmte Box (Tailwind, Design-Tokens, kein Eingriff ins bestehende Layout) mit:
  - first_touch_* (source, medium, campaign, content, landing_page, timestamp)
  - last_touch_* (source, medium, campaign, content, landing_page, timestamp)
  - current_page
  - menschenlesbare Quelle (`formatSource(last.source)`) + Kampagne (`formatCampaign`)
  - Ablaufdatum: `stored_at + 90 Tage` (aus `localStorage`, da `getAttribution()` heute kein `stored_at` zurückgibt → wird mit ausgelesen)
- Buttons:
  - „Attribution zurücksetzen" → `localStorage.removeItem("vv_attribution_v1")` + Reload
  - „Aktualisieren" → forciert Re-Render
- Aktualisiert sich bei Mount und bei Klick auf Reset.

### 2. Einbindung auf der Preisseite
- In `src/routes/preise.tsx` ganz unten (nach `CtaBlock`) `<AttributionDebugPanel />` einfügen.
- Komponente entscheidet selbst, ob sie sichtbar ist → keine Änderung am normalen Design.

### 3. Live-Test (browser tool)
Nach Build prüfe ich in der Vorschau:
- `/go/kleinanzeigen`, `/go/facebook`, `/go/flyer`, `/go/visitenkarte`, `/go/google`, `/go/myhammer` → muss auf `/preise?...` weiterleiten.
- Direkte UTM-URLs (`/preise?utm_source=...`) → Debug-Panel zeigt korrekte Werte.
- Interne Navigation (z. B. zu `/kontakt` und zurück zu `/preise?debug=1`) → first_touch bleibt, last_touch unverändert.
- Neuer UTM-Link → last_touch aktualisiert, first_touch unverändert.
- Direktaufruf ohne UTM nach Reset → Quelle „Direkter Websitebesuch".
- Preisrechner → WhatsApp-Klick: Nachricht enthält „Anfrage über: …", „Kampagne: Preisrechner", „Einstiegsseite: /preise…". (Test ohne Versand: WhatsApp-Link-URL lesen, `text`-Parameter dekodieren.)

### 4. Keine Eingriffe
- Kein GA4/GTM/Plausible.
- Kein Consent-Banner.
- Keine Änderungen an `attribution.ts`, `tracking.ts`, `Kostenrechner.tsx`, `kontakt.tsx`, `go.$slug.tsx` außer falls beim Test ein konkreter Bug auftritt.

### 5. Abschlussbericht
Strukturierter Report mit den 11 Punkten aus der Aufgabe inkl. konkreter Beobachtungen aus dem Live-Test und Stichproben aus dem Debug-Panel.

## Technische Details

- `useSearch({ strict: false })` aus TanStack Router, fallback `window.location.search`, damit die Komponente unabhängig von Route-Search-Schema funktioniert.
- Werte werden über `getAttributionFields()` gelesen → keine Duplizierung der Logik.
- Für TTL: Rohzugriff `JSON.parse(localStorage.getItem("vv_attribution_v1"))?.stored_at`, +90 Tage, als ISO-Datum anzeigen.
- Styling: `border border-border bg-muted/50 text-xs font-mono p-4 rounded-md` o. ä., in `Section`-Container eingebettet. Kein Einfluss auf das Hero/Layout.
