# Begriffe & Synonyme

Glossar des V&V-Cockpits. Jeder Begriff ist ein `##`-Abschnitt mit
`- schlüssel: wert`-Zeilen. Das Build-Script übernimmt: `bedeutung`,
`intent`, `tool`, `seite`, `synonyme` (Komma-getrennt), `gefahr`
(Komma-getrennt), `nicht-gemeint` (Komma-getrennt), `regel`.

## offene Positionen
- bedeutung: Im V&V Cockpit bedeutet „offene Positionen“ standardmäßig offene Posten, offene Forderungen, unbezahlte Rechnungen oder Außenstände im Buchhaltungsbereich.
- intent: open_items_summary
- tool: getOpenPositionsSummary
- seite: openitems
- synonyme: offene positionen, offene posten, offene rechnungen, außenstände, aussenstände, aussenstaende, unbezahlte rechnungen, offene forderungen, offene beträge, offene betraege, zahlung offen, wer schuldet mir geld, wer schuldet mir noch geld, schuldet mir geld, wer muss noch zahlen, kunden schulden geld, wer hat noch nicht bezahlt, welche rechnungen sind offen, welche kunden müssen noch zahlen
- nicht-gemeint: offene Stellen, Jobangebote, Personalpositionen, freie Arbeitsplätze
- gefahr: löschen, entfernen, zurücksetzen, bereinigen, wegmachen, alles löschen, alle löschen, endgültig
- regel: Wenn der Nutzer offene Positionen löschen will, darf NEXUS niemals sofort löschen. Pflicht-Rückfrage: „Meinst du wirklich löschen oder nur als bezahlt/erledigt markieren? Löschen entfernt Datensätze dauerhaft.“ Bei Massenlöschung starke Bestätigung („Ja, endgültig löschen“) – normales „ja“ reicht nicht. Nur bei eindeutigem Personal-/HR-Kontext darf „Positionen“ als Stelle/Job verstanden werden.

## Buchhaltung
- bedeutung: Einnahmen, Ausgaben, Belege, Rechnungen, offene Posten, Steuerübersicht.
- intent: navigate
- tool: navigateTo
- seite: bookkeeping
- synonyme: buchhaltung, finanzen, einnahmen, ausgaben, kasse, buchungen, belegübersicht, geldübersicht

## Kundenkartei
- bedeutung: Kundendaten, Kundennotizen, Projekte, Kommunikation, Angebote/Rechnungen pro Kunde.
- intent: navigate
- tool: navigateTo
- seite: akte
- synonyme: kundenkartei, kundenakte, kundendaten, kundenübersicht, kundenliste

## Rechnung
- bedeutung: Offizielle Zahlungsanforderung an Kunden.
- intent: navigate
- tool: navigateTo
- seite: rechnungen
- synonyme: rechnung, rechnungen, zahlungsanforderung, kundenrechnung

## Angebot
- bedeutung: Kostenvoranschlag / Angebot für Kunden, noch nicht Rechnung.
- intent: navigate
- tool: navigateTo
- seite: angebote
- synonyme: angebot, angebote, kostenvoranschlag, preisangebot, kundenangebot

## Baustelle / Projekt / Auftrag
- bedeutung: Kundenauftrag bzw. Baustellenplanung.
- intent: project_summary
- tool: getProjectSummary
- seite: projekte
- synonyme: baustelle, baustellen, projekt, projekte, auftrag, aufträge, auftraege, baustellenplaner

## bezahlt
- bedeutung: Eine offene Rechnung / ein offener Posten soll als bezahlt markiert werden, nicht gelöscht.
- intent: mark_open_item_paid_draft
- tool: markOpenItemPaidDraft
- seite: openitems
- synonyme: als bezahlt markieren, bezahlt markieren, auf bezahlt setzen, als bezahlt, auf bezahlt, ist bezahlt, wurde bezahlt, hat bezahlt
- regel: Bestätigung nötig (Ja/Nein), niemals löschen.

## löschen
- bedeutung: Kritische Aktion, niemals sofort ausführen – immer Bestätigung nötig, bei Massenlöschung starke Bestätigung.
- synonyme: löschen, loeschen, entfernen

## zurücksetzen
- bedeutung: Kritische Aktion, sehr gefährlich, immer Extra-Bestätigung.
- synonyme: zurücksetzen, zuruecksetzen, reset

## veröffentlichen
- bedeutung: Externe Aktion (Post, Anzeige, Google-Beitrag, Social-Media-Inhalt). Niemals ohne ausdrückliche Bestätigung veröffentlichen.
- synonyme: veröffentlichen, veroeffentlichen, posten, publizieren

## Steuer-Rücklage
- bedeutung: Bei V&V werden intern 35 % jeder Einnahme als Steuer-Rücklage geplant.
- seite: bookkeeping
- synonyme: steuerrücklage, steuer-rücklage, steuerruecklage, rücklage, ruecklage

## Kleinunternehmer
- bedeutung: V&V arbeitet mit Kleinunternehmerregelung nach §19 UStG. Rechnungen weisen keine Umsatzsteuer aus.
- synonyme: kleinunternehmer, kleinunternehmerregelung, §19, paragraph 19, umsatzsteuer
