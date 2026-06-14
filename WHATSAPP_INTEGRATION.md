# NEXUS WhatsApp-Dokumentversand – Integration

Versand von **Angeboten/Rechnungen als PDF** über WhatsApp, gesteuert per NEXUS-
Sprach-/Textbefehl. Zwei Betriebsarten:

1. **Manueller Fallback** (sofort nutzbar): öffnet WhatsApp/WhatsApp Web mit Empfänger +
   vorbereitetem Text, lädt das Dokument herunter; der Nutzer hängt die PDF selbst an.
2. **Cloudflare-Worker** (vorbereitet, optional): lädt die PDF hoch und sendet automatisch
   über die WhatsApp-Business-API. Wird **nicht automatisch deployt**.

## Projektstruktur

```
vvcockpit.html                      # produktive Hauptdatei (hier wird entwickelt)
deploy/index.html                   # Deploy-Kopie (= vvcockpit.html)
deploy/vvcockpit.html               # Deploy-Kopie (= vvcockpit.html)
deploy/_headers                     # Cloudflare-Pages-Header (CSP etc.)
cloudflare/whatsapp-worker/         # optionaler Worker (separat, nicht deployt)
dist/vv-cockpit-deploy-*.zip        # erzeugtes Deploy-Paket (gitignored)
```

`vvcockpit.html`, `deploy/index.html` und `deploy/vvcockpit.html` sind inhaltsgleich.

## Sicherheitsmodell

- Die KI erzeugt **nur Intent + Dokumententwurf**. Der Versand passiert ausschließlich
  lokal über kontrollierte Funktionen.
- Automatischer Versand braucht die **starke, aktionsspezifische Bestätigung**
  **„Ja, per WhatsApp senden“**. „ja/ok/mach“ genügen nicht. Ohne wartenden Versand löst
  die Phrase nichts aus.
- Vor dem Versand zeigt ein **Vorschau-Modal**: Empfänger, **maskierte** Nummer
  (z. B. `+49 15***4567`), Dokumentart, Nummer, Betrag, Dateiname, Nachrichtentext,
  Versandart und Einwilligungsstatus.
- **Ohne dokumentierte Einwilligung** (`customer.whatsapp.optIn`) kein automatischer Versand.
- Pending-Versand **läuft nach 10 Minuten ab**, **pausiert bei Cockpit-Sperre**, wird bei
  Abbruch vollständig gelöscht; **Doppelbestätigung sendet nicht doppelt** (idempotencyId).
- Telefonnummern erscheinen in Status-/Debugausgaben nur **maskiert**.
- **Keine Meta-Zugangsdaten** im Browser/Repo/Backup/IndexedDB – nur im Worker als Secret.

## NEXUS – neue Intents & Tools

Intents: `create_offer_whatsapp_draft`, `create_invoice_whatsapp_draft`,
`send_existing_offer_whatsapp_draft`, `send_existing_invoice_whatsapp_draft`,
`prepare_whatsapp_document`, `confirm_whatsapp_send`, `cancel_whatsapp_send`,
`whatsapp_customer_lookup`, `whatsapp_manual_fallback`, `whatsapp_delivery_status`.

Tools: `resolveCustomerForDocument`, `resolveOfferForCustomer`, `resolveInvoiceForCustomer`,
`createOfferDraftForWhatsApp`, `createInvoiceDraftForWhatsApp`, `renderDocumentPdf`,
`prepareWhatsAppDocumentSend`, `confirmWhatsAppDocumentSend`, `cancelWhatsAppDocumentSend`,
`openWhatsAppManualFallback`, `sendWhatsAppDocumentViaWorker`, `getWhatsAppDeliveryStatus`,
`askWhatsAppClarifyingQuestion`. Unbekannte Tools werden nicht ausgeführt.

## Beispielbefehle

- „Nexus, schick Frau Söllinger das zuletzt erstellte Angebot per WhatsApp.“
- „Nexus, sende die Rechnung 2026-004 an den Kunden per WhatsApp.“
- „Nexus, öffne WhatsApp mit dem Angebot für Söllinger.“
- „Nexus, erstelle für Katrin Söllinger ein Angebot und schick es ihr per WhatsApp.“
  (öffnet den Angebotsentwurf; Positionen/Preise werden **nicht** erfunden – nach dem
  Speichern „schick das Angebot per WhatsApp“.)

## Kundenkartei

Neuer Block „WhatsApp / Kommunikation“: Nummer, Kommunikation erlaubt (ja/nein),
Einwilligung (Opt-in), Datum + Herkunft der Einwilligung, bevorzugter Kanal. Die
Einwilligung wird nur gespeichert, wenn ausdrücklich „Ja“ gewählt ist (nie automatisch).

## Worker

Siehe `cloudflare/whatsapp-worker/README.md`. Im Cockpit nur die **öffentliche Worker-URL**
unter *Firmendaten → WhatsApp-Worker-URL* hinterlegen. Leer = manueller Fallback.

> Hinweis CSP: `deploy/_headers` erlaubt `connect-src … https://*.workers.dev`. Bei einer
> **eigenen Worker-Domain** muss diese dort ergänzt werden.

## Deployment

1. In `vvcockpit.html` entwickeln/testen.
2. `deploy/index.html` und `deploy/vvcockpit.html` mit `vvcockpit.html` synchronisieren.
3. `deploy/` auf Secrets/Kundendaten prüfen.
4. ZIP erzeugen: `cd deploy && zip -X ../dist/vv-cockpit-deploy-<datum>.zip index.html vvcockpit.html _headers`.
5. **Nicht** automatisch deployen – Upload/Worker/Meta-Setup erfolgt manuell.
