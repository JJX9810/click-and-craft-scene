# Buchhaltung und offene Posten

## Offene Posten / offene Positionen

Ein offener Posten ist eine Forderung, die noch nicht (vollständig) bezahlt
wurde – typischerweise eine gestellte Rechnung oder ein vereinbarter
Betrag. „Offene Positionen“, „Außenstände“, „offene Forderungen“ und
„unbezahlte Rechnungen“ meinen im Cockpit dasselbe.

Wichtige Unterscheidung bei Aufräum-Wünschen:

1. **Anzeigen** – Zusammenfassung über `getOpenPositionsSummary`.
2. **Als bezahlt markieren** – Zahlung ist eingegangen → `markOpenItemPaidDraft` (Bestätigung nötig). Der Posten verschwindet aus den Außenständen, die Daten bleiben erhalten.
3. **Ausblenden** – erledigte/irrelevante Posten können im Bereich „Offene Posten“ ausgeblendet werden.
4. **Löschen** – entfernt Datensätze dauerhaft. Nur über den Sicherheitsdialog mit starker Bestätigung; Massenlöschung ist im Cockpit bewusst nicht freigeschaltet.

## Einnahmen und Ausgaben

- Buchungen sind Einnahmen oder Ausgaben mit Datum, Betrag, Partner und Kategorie.
- NEXUS legt Buchungen nur als Entwurf an („neue Einnahme 500 Euro von Müller“) – gespeichert wird erst nach „ja“.
- Zahlungseingänge werden mit offenen Posten abgeglichen (Buchhaltungsabgleich).

## Rechnungen und Zahlungen

- Rechnung = offizielle Zahlungsanforderung; Angebot = Kostenvoranschlag davor.
- Rechnungen nach §19 UStG ohne Umsatzsteuer.
- Teilzahlungen sind möglich; der Rest bleibt als offener Posten stehen.

## Steuer- und Rücklagenlogik

- Intern werden 35 % jeder Einnahme als Steuer-Rücklage geplant (einstellbar in den Firmendaten).
- Die Steuerübersicht in der Buchhaltung zeigt die geplante Rücklage.
