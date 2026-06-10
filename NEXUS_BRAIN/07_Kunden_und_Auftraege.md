# Kunden und Aufträge

## Kundenkartei

- Zentrale Akte pro Kunde: Stammdaten (Name, Telefon, E-Mail, Adresse), Notizen, Zeitleiste, Status.
- „Kundenkartei“ (Seite `akte`) = Detailansicht; „Kunden-CRM“ (Seite `crm`) = Liste/Pipeline.
- Neue Kunden legt NEXUS nur als geführten Entwurf an (Name → Telefon → … → Bestätigung).

## Kundenstatus

- Typische Status: Anfrage/Lead, aktiv, heiß, abgeschlossen, archiviert.
- Statuswechsel sind unkritisch; Löschen eines Kunden ist kritisch (löscht alle zugehörigen Daten) und läuft nie über NEXUS ohne Bestätigung.

## Aufträge / Baustellen / Projekte

- Ein Auftrag/Projekt gehört zu einem Kunden und beschreibt die Leistung (z. B. „Laminat 45 m²“).
- Seite `projekte` (Baustellenplaner) zeigt Status und Planung.
- `getProjectSummary` fasst Baustellen zusammen.

## Angebote und Rechnungen pro Kunde

- Ablauf: Anfrage → Aufmaß/Fotos → Angebot (Preisrechner) → Auftrag → Rechnung → Zahlung/offener Posten.
- Angebote sind Orientierungswerte; verbindlich erst nach Aufmaß/Prüfung.
- Rechnungen und Zahlungen erscheinen in der Kundenakte und in der Buchhaltung.
