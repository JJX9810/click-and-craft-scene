# Cockpit-Tools

NEXUS-Tool-Registry. `sicherheit`: `safe` (frei nutzbar), `confirm`
(Entwurf + Ja/Nein-Bestätigung) oder `strong` (zusätzlich starke
Bestätigung wie „Ja, endgültig löschen“ / „Ja, veröffentlichen“).
KI-Provider wählen nur Tools aus – ausgeführt wird ausschließlich lokal.

## navigateTo
- label: Seite öffnen
- beschreibung: Öffnet eine Cockpit-Seite.
- sicherheit: safe
- params: page

## getOpenPositionsSummary
- label: Offene Posten anzeigen
- beschreibung: Zeigt offene Posten, unbezahlte Rechnungen und Außenstände.
- sicherheit: safe
- seite: openitems

## getFinanceSummary
- label: Finanzübersicht
- beschreibung: Zeigt Einnahmen/Ausgaben/Gewinn aus der Buchhaltung.
- sicherheit: safe
- seite: bookkeeping

## searchCustomer
- label: Kunde suchen
- beschreibung: Sucht Kunden in der Kundenkartei.
- sicherheit: safe
- params: customerName

## getProjectSummary
- label: Baustellen anzeigen
- beschreibung: Zeigt Baustellen/Projekte.
- sicherheit: safe
- seite: projekte

## createCustomerDraft
- label: Kundenentwurf erstellen
- beschreibung: Bereitet einen neuen Kunden als Entwurf vor.
- sicherheit: confirm

## createBookingDraft
- label: Buchungsentwurf erstellen
- beschreibung: Bereitet Einnahme oder Ausgabe als Entwurf vor.
- sicherheit: confirm

## createOfferDraft
- label: Angebotsentwurf erstellen
- beschreibung: Bereitet ein Angebot als Entwurf vor.
- sicherheit: confirm

## createInvoiceDraft
- label: Rechnungsentwurf erstellen
- beschreibung: Bereitet eine Rechnung als Entwurf vor.
- sicherheit: confirm

## markOpenItemPaidDraft
- label: Offenen Posten als bezahlt markieren
- beschreibung: Bereitet vor, einen offenen Posten als bezahlt zu markieren.
- sicherheit: confirm

## deleteOpenItemsDraft
- label: Offene Posten löschen vorbereiten
- beschreibung: Bereitet das Löschen offener Posten vor.
- sicherheit: strong

## createMarketingDraft
- label: Marketingentwurf erstellen
- beschreibung: Bereitet Anzeigen, Posts oder Beiträge vor.
- sicherheit: confirm

## publishMarketingDraft
- label: Marketing veröffentlichen
- beschreibung: Veröffentlicht vorbereitete Inhalte extern.
- sicherheit: strong

## openAgent
- label: KI-Mitarbeiter öffnen
- beschreibung: Öffnet einen KI-Mitarbeiter.
- sicherheit: safe

## stopSpeaking
- label: Sprachausgabe stoppen
- beschreibung: Stoppt die Sprachausgabe.
- sicherheit: safe

## confirmPendingAction
- label: Aktion bestätigen
- beschreibung: Bestätigt die wartende Aktion (lokal).
- sicherheit: safe

## cancelPendingAction
- label: Aktion abbrechen
- beschreibung: Bricht die wartende Aktion ab (lokal).
- sicherheit: safe

## askClarifyingQuestion
- label: Rückfrage stellen
- beschreibung: Stellt eine Rückfrage, wenn der Befehl unklar oder riskant ist.
- sicherheit: safe
