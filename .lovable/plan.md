## Plan: Google-Kalender-Verknüpfung aktivieren

### Ziel
Den bereitgestellten Google-Kalender-Buchungslink (`https://calendar.app.google/MbCnvoSqYjuLSAfY9`) in den Kostenrechner und auf die /wunschtermin-Seite einbinden. Termin bleibt unverbindliche Anfrage. Keine Preisänderungen, keine öffentlichen Einzelpreise.

---

### Geänderte Dateien

1. **`src/components/site/Kostenrechner.tsx`**
2. **`src/routes/wunschtermin.tsx`**

---

### Änderung 1 — Zentrale Variable

In `src/components/site/Kostenrechner.tsx` am Dateianfang ergänzen:
```ts
const GOOGLE_CALENDAR_BOOKING_URL = "https://calendar.app.google/MbCnvoSqYjuLSAfY9";
```

---

### Änderung 2 — `KalenderPlatzhalter` überarbeiten (Kostenrechner)

Die `KalenderPlatzhalter`-Komponente (exportiert, wird auch von /wunschtermin importiert) ersetzen durch einen funktionalen Block mit Button:

- **Button-Text:** „Verfügbarkeit prüfen“
- **Link:** `GOOGLE_CALENDAR_BOOKING_URL`
- **Öffnung:** `target="_blank" rel="noopener noreferrer"`
- **Hinweis unter Button:** „Der Kalender dient zur unverbindlichen Terminanfrage. Der endgültige Termin wird nach Prüfung von Aufwand, Einsatzort, Materialverfügbarkeit und bestehender Planung bestätigt.“
- **Datenschutz-Hinweis bleibt:** Keine Kundennamen, Adressen oder Auftragsdetails im Kalender sichtbar.

Da `KalenderPlatzhalter` von `/wunschtermin.tsx` importiert wird, muss die Komponente dort ebenfalls korrekt rendern.

---

### Änderung 3 — Kostenrechner Step 3 (Ergebnis)

Die `<KalenderPlatzhalter />`-Einbindung in Step 3 (ca. Zeile 617) bleibt bestehen – die überarbeitete Komponente rendert dort automatisch den neuen Button.

---

### Änderung 4 — Kostenrechner `TerminBlock` (Step 2)

Der bestehende `TerminBlock` mit Wunschdatum, Wunschzeitraum, Fertigstellung, Dringlichkeit und Hinweise bleibt unverändert. Keine Änderung.

---

### Änderung 5 — `/wunschtermin.tsx` anpassen

**Section „Verfügbarkeit / Kalender“ überarbeiten:**

- Titel bleibt oder wird auf „Kalender“ gesetzt.
- Text: „Prüfen Sie verfügbare Zeiträume und senden Sie uns Ihren bevorzugten Termin. Der Termin wird erst nach Rückbestätigung verbindlich.“
- Button: „Wunschtermin im Kalender auswählen“ → `GOOGLE_CALENDAR_BOOKING_URL`, `target="_blank" rel="noopener noreferrer"`
- Hinweis darunter: Unverbindlichkeit + Datenschutz (keine Kundendaten sichtbar).
- Import `Calendar` icon von lucide-react ergänzen falls nötig.

Die WhatsApp-Anfrage (Formular, Button, Vorschau) bleibt vollständig erhalten.

---

### Was NICHT geändert wird

- Keine Preislogik-Änderungen
- Keine öffentlichen Einzelpreise sichtbar machen
- Keine API-Schlüssel im Frontend
- Keine verbindliche Online-Buchung
- TerminBlock-Struktur, WhatsApp-Übergabe, Stepper, Formularfelder, Schema, Footer, Header, Routen

---

### Ergebnis-Check nach Umsetzung

- `GOOGLE_CALENDAR_BOOKING_URL` als Konstante gesetzt
- Button „Verfügbarkeit prüfen“ in überarbeitetem `KalenderPlatzhalter`
- Button „Wunschtermin im Kalender auswählen“ auf /wunschtermin
- Überall Unverbindlichkeit klargestellt
- Keine Preise wieder öffentlich
- Keine API-Zugangsdaten im Frontend