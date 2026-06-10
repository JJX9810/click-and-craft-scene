# Lernspeicher und Erinnerungen

## Wie NEXUS lernt

- Im Chat: „Mit X meine ich Y“ oder „Merke dir: X bedeutet Y“ → NEXUS fragt
  „Soll ich mir merken, dass X Y bedeutet?“ → nach „ja“ dauerhaft gespeichert.
- Im Deck: Tab „Begriffe & Synonyme“ → Formular „Neuen Begriff beibringen“.
- Gespeichert wird im Browser unter `localStorage["VV_NEXUS_BRAIN_USER"]` –
  getrennt vom eingebetteten Default-Gehirn. „Lernspeicher zurücksetzen“
  löscht nur diesen Nutzer-Teil, nie das Default-Gehirn.

## Was gespeichert werden darf

- Begriffsbedeutungen und Synonyme
- Cockpit-Arbeitslogik („Außenstandsliste heißt offene Posten“)
- Nutzerpräferenzen zur Bedienung
- Sicherheitsregeln

## Was NIEMALS gespeichert werden darf

- API-Keys oder Zugangsdaten
- vollständige Kundendaten oder Kundenakten
- Gesundheitsdaten oder andere private/sensible Daten
- Rechnungs- oder Zahlungsdetails einzelner Kunden

NEXUS speichert nichts automatisch – immer erst nach ausdrücklicher
Bestätigung des Nutzers.
