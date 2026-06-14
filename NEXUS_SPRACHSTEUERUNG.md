# NEXUS Sprach- & Textsteuerung – Ausbau

Erweitert die NEXUS-Steuerung um eine zentrale **Intent-Registry**, einen
durchsuchbaren **Sprachbefehl-Katalog**, robuste **Synonym-/Navigationserkennung**,
**Entity-Normalisierung** und eine generische **Pending-Action-Registry**. Alle
Ergänzungen sind **additiv** – bestehende Brain-, Provider-, Bestätigungs- und
Mikrofon-Logik bleibt unverändert.

## Neue Bausteine (in `vvcockpit.html`)

- `NEXUS_INTENTS` – Intent-Katalog (Navigation je Seite + funktionale Intents) mit
  `id, description, category, tool, safetyLevel (safe|confirm|strong_confirm),
  aliases, examples, implemented`.
- `NEXUS_SYNONYMS` – Synonymgruppen (navigation, create, send, search, delete,
  open_items, customer, invoice, offer).
- `NEXUS_STRONG_CONFIRMATIONS` + `nxStrongConfirmationMatches()` – exakte
  Zuordnung starker Bestätigungsphrasen je kritischer Aktion.
- `NX_PENDING_ACTIONS` + Helfer (`nxRegisterPendingAction`, `nxActivePendingActions`,
  `nxMatchPendingByPhrase`, `nxClearPendingAction`) – generische wartende Aktionen
  mit Ablaufzeit, Sperr-Pause und Phrasenbindung.
- Entity-Normalisierung: `nxNormalizeAmount` / `nxWordsToNumberDe`
  (z. B. „fünfhundert Euro“ → 500; „1.250,50 €“ → 1250.5) und
  `nxNormalizeRelativeDate` („heute/morgen/übermorgen/in 2 Wochen/nächsten Montag“).
- `nxIsNavigationCommand()` – lokale Navigations­erkennung für alle Verb-Synonyme
  („geh mal zu / bring mich zu / wechsle zu / navigiere zu …“); in
  `preResolveNexusCommand` eingebunden → klare Navigation läuft **ohne KI-Aufruf**.
- Sicherheits-Responder: erkannte, aber **nicht angebundene** Tools antworten ehrlich
  mit „… noch nicht vollständig mit dem Cockpit verbunden.“ (keine falsche Erfolgsmeldung).

## UI: „🎙 Sprachbefehle“

Neuer Tab im NEXUS-Deck (Gehirn-Panel): durchsuchbarer, kategorisierter Katalog mit
Sicherheitsstufe, Status **verbunden/geplant**, Tool, Beispiel sowie Buttons
**„In Eingabe übernehmen“** und **„Testen“** (Dry-Run der Erkennung, keine Seiteneffekte).

## Sicherheitsstufen

- **A/safe** – direkt (öffnen, anzeigen, suchen, zusammenfassen, rechnen ohne Speichern).
- **B/confirm** – Entwurf + normale Bestätigung („Nexus, ja.“).
- **C/strong_confirm** – Vorschau + exakte Phrase, z. B. „Ja, Angebot finalisieren.“,
  „Ja, Rechnung stornieren.“, „Ja, per WhatsApp senden.“, „Ja, endgültig löschen.“
  Ein einfaches „ja“ genügt nicht; ohne passende wartende Aktion löst eine
  Bestätigungsphrase nichts aus; die Phrase muss zur wartenden Aktion passen.

## Tests

`/tmp/nexus_registry_test.js` (gegen die echten, extrahierten Funktionen):
**570 Assertions grün** – Registry-Integrität, Sicherheitsstufen, Synonyme,
starke-Bestätigungs-Matching (inkl. Kreuz-Ausschluss), Pending-Registry
(Ablauf/Sperre/Phrase), Betrags-/Datums-Normalisierung, Navigations-Synonyme
(verbunden mit `nxNavTarget`) und Nicht-Navigations-Ausschluss.
Zusammen mit den Bestandssuiten: **668 Assertions** grün.

## Hinweis Brain-Embed

Die Registry ist Code (kein Markdown-Vault-Inhalt). Der Vault `NEXUS_BRAIN/` kann
bei Bedarf weiterhin via `node tools/build-nexus-brain.js --embed` neu eingebettet
werden; für diesen Ausbau ist das nicht erforderlich.
