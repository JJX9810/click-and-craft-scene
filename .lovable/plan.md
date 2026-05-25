## Sprint 2A – Plan

Strikt nur zwei Themen: (1) Telefonnummer siteweit korrigieren, (2) Kontaktformular funktionsfähig machen. Keine SEO-/Meta-/Schema-/Routing-/Design-Änderungen. Keine neuen Seiten, keine Slug-Änderungen.

### 1. Telefonnummer korrigieren

**Problem:** Die meisten `tel:`-Links nutzen `+4916347992866` (eine Ziffer zu viel). Korrekt ist `+491634799286`. Auch die JSON-LD-`telephone`-Felder und der WhatsApp-Link enthalten die falsche Nummer.

**Konstanten zentral nicht erforderlich** – ich passe die Werte in-place an, ohne Refactor.

Zu korrigierende Dateien (gefunden via ripgrep):
- `src/components/site/Header.tsx` – 2× `tel:+4916347992866`
- `src/components/site/Footer.tsx` – 1× `tel:`
- `src/components/site/PageShell.tsx` – 2× `tel:`
- `src/routes/index.tsx` – 2× `tel:`, 1× `wa.me/4916347992866`, 1× JSON-LD `telephone: "+49 163 4799286"` (Anzeige korrekt, Schema ggf. an `+491634799286` angleichen – nur Ziffernkorrektur, keine sonstige Schema-Änderung)
- `src/routes/kontakt.tsx` – 1× `tel:`, 1× `wa.me/4916347992866`
- `src/routes/impressum.tsx` – 1× `tel:`
- `src/routes/showroom.index.tsx` – 1× `tel:`
- `ionos-export/src/IonosKontakt.tsx` – `TEL = "+4916347992866"`, `WA = "4916347992866"`
- `ionos-export/src/RootLayout.tsx` – `telephone: "+49 163 4799286"` (nur Ziffernkorrektur)

**Nicht ändern:** `src/routes/partner.tsx` (`+4915757941442` ist eine andere, korrekte Partnernummer).

**Mobile Sichtbarkeit:** Header-Anruf-Button zeigt aktuell auf Mobile nur das Icon. Ich ergänze sichtbaren Text/Nummer auf kleinen Viewports und ein `aria-label="Verlegt & Verschraubt anrufen"` am Icon-Button. Das Mobile-Menü zeigt die Nummer bereits sichtbar.

**Resultat überall:**
- Sichtbar: `0163 4799286`
- Link: `tel:+491634799286`
- WhatsApp: `https://wa.me/491634799286`

### 2. Kontaktformular funktionsfähig machen

**Aktuell:** `src/routes/kontakt.tsx` macht nur `e.preventDefault(); setSent(true)` – keine echte Übertragung.

**Backend-Check:** Es gibt kein konfiguriertes Lovable-Cloud-/Supabase-/Edge-Function-Setup für Mailversand. Ich erfinde keines. → **Priorität B: mailto-Fallback + WhatsApp + Anruf-Button.**

**Umsetzung in `src/routes/kontakt.tsx`:**

- State für alle Felder (Name, Telefon, E-Mail, Ort, Leistung, Zeitraum, Budget, Beschreibung, Datenschutz).
- Validierung clientseitig:
  - Name nicht leer (`trim`)
  - Mindestens E-Mail ODER Telefon ausgefüllt
  - E-Mail nur wenn vorhanden: enthält `@` und Punkt danach
  - Telefon nur wenn vorhanden: nach Strip von Leerzeichen/`+`/`/`/`-`/`()` mindestens 5 Ziffern
  - Datenschutz-Checkbox angehakt
  - Fehler erscheinen direkt unter dem jeweiligen Feld (rotes Hint-Text), Submit blockiert
- Leistung optional; wenn leer → im Body „Leistung: nicht ausgewählt / allgemeine Anfrage“
- Nachrichten-Body-Funktion baut strukturierten Text laut Vorgabe (Name / Telefon / E-Mail / Ort / Leistung / Nachricht / Hinweis).
- Hauptaktion: **zwei sichtbare Buttons** statt „Anfrage senden“:
  - „Per E-Mail vorbereiten“ → öffnet `mailto:justus.brosch@verlegt-verschraubt.de?subject=<enc>&body=<enc>` via `window.location.href`. Subject + Body **getrennt** mit `encodeURIComponent` codiert.
  - „Per WhatsApp vorbereiten“ → öffnet `https://wa.me/491634799286?text=<enc>` in neuem Tab.
- Tertiär: „Direkt anrufen“ → `tel:+491634799286`.
- Nach Klick wird je nach Aktion eine ehrliche Meldung gesetzt:
  - mailto: „Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Anfrage ab.“
  - WhatsApp: „Die WhatsApp-Nachricht wurde vorbereitet. Bitte senden Sie sie in WhatsApp ab.“
  - Kein „Anfrage wurde gesendet“.
- Datei-Upload-Feld bleibt visuell, aber mit Hinweistext „Fotos bitte per E-Mail/WhatsApp anhängen“ (mailto/WhatsApp können keine Dateien anhängen – ehrliche Kommunikation, keine Funktionsänderung der Seite).
- Pflichtfeld-Sterne und `aria-invalid` setzen; Datenschutz-Hinweis bleibt sichtbar.
- Keine Änderung an Meta/Hero/Map/Aside-Direktkontakt (außer Telefonnummer-Korrektur).

**`ionos-export/src/IonosKontakt.tsx`:** Telefon-/WA-Konstanten korrigieren. Logik bleibt (ist bereits ein mailto/WA-Fallback).

### Nicht im Scope
Keine Änderungen an Schema-Typen, Canonicals, og:image, 404-Seite, OrtsSeiten, Slugs, Bildern oder Design. Keine neuen Routen. Keine neuen Pakete.

### Abschlussbericht
Nach Implementierung liefere ich den geforderten 14-Punkte-Bericht.
