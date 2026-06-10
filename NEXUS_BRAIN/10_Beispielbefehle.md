# Beispielbefehle (Few-Shot für Groq/Gemini)

Jedes Beispiel: `## Beispiel`-Abschnitt mit `User:`-Zeile und einem
```json-Block mit dem erwarteten Intent-JSON.

## Beispiel 1

User: Nexus wer schuldet mir noch Geld

```json
{
  "intent": "open_items_summary",
  "tool": "getOpenPositionsSummary",
  "confidence": 0.95,
  "requiresConfirmation": false,
  "requiresStrongConfirmation": false,
  "entities": { "customerName": null, "amount": null, "date": null, "category": null, "service": null, "page": "openitems", "target": "offene_posten", "actionType": "summary" },
  "spokenResponse": "Ich öffne die offenen Posten.",
  "clarifyingQuestion": null
}
```

## Beispiel 2

User: Nexus öffne offene Positionen

```json
{
  "intent": "navigate",
  "tool": "navigateTo",
  "confidence": 0.95,
  "requiresConfirmation": false,
  "requiresStrongConfirmation": false,
  "entities": { "customerName": null, "amount": null, "date": null, "category": null, "service": null, "page": "openitems", "target": "offene_posten", "actionType": "open" },
  "spokenResponse": "Ich öffne die offenen Posten.",
  "clarifyingQuestion": null
}
```

## Beispiel 3

User: Nexus lösche offene Positionen

```json
{
  "intent": "delete_open_items_draft",
  "tool": "askClarifyingQuestion",
  "confidence": 0.9,
  "requiresConfirmation": true,
  "requiresStrongConfirmation": true,
  "entities": { "customerName": null, "amount": null, "date": null, "category": null, "service": null, "page": "openitems", "target": "offene_posten", "actionType": "delete" },
  "spokenResponse": "",
  "clarifyingQuestion": "Meinst du wirklich löschen oder nur als bezahlt/erledigt markieren? Löschen entfernt Datensätze dauerhaft."
}
```

## Beispiel 4

User: Nexus markiere Müller als bezahlt

```json
{
  "intent": "mark_open_item_paid_draft",
  "tool": "markOpenItemPaidDraft",
  "confidence": 0.9,
  "requiresConfirmation": true,
  "requiresStrongConfirmation": false,
  "entities": { "customerName": "Müller", "amount": null, "date": null, "category": null, "service": null, "page": "openitems", "target": "offene_posten", "actionType": "mark_paid" },
  "spokenResponse": "Ich bereite vor, den offenen Posten von Müller als bezahlt zu markieren.",
  "clarifyingQuestion": null
}
```

## Beispiel 5

User: Nexus lösche alle offenen Posten

```json
{
  "intent": "delete_open_items_draft",
  "tool": "askClarifyingQuestion",
  "confidence": 0.95,
  "requiresConfirmation": true,
  "requiresStrongConfirmation": true,
  "entities": { "customerName": null, "amount": null, "date": null, "category": null, "service": null, "page": "openitems", "target": "offene_posten", "actionType": "mass_delete" },
  "spokenResponse": "",
  "clarifyingQuestion": "Das ist eine Massenlöschung. Meinst du wirklich endgültig löschen? Normales Ja reicht dafür nicht. Antworte mit: Ja, endgültig löschen."
}
```

## Beispiel 6

User: Nexus neue Einnahme 500 Euro von Müller

```json
{
  "intent": "create_booking_draft",
  "tool": "createBookingDraft",
  "confidence": 0.92,
  "requiresConfirmation": true,
  "requiresStrongConfirmation": false,
  "entities": { "customerName": "Müller", "amount": 500, "date": null, "category": "Kundenzahlung", "service": null, "page": "bookkeeping", "target": "buchung", "actionType": "create" },
  "spokenResponse": "Einnahme über 500 Euro von Müller – bitte bestätigen.",
  "clarifyingQuestion": null
}
```
