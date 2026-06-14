# V&V WhatsApp-Worker (optional, automatischer Versand)

Separater Cloudflare Worker für den **automatischen** Versand von Angebots- und
Rechnungs-PDFs über die offizielle **WhatsApp-Business-API** (Meta Graph API).

> Dieser Worker ist **vorbereitet, aber nicht aktiv**. Er wird **nicht automatisch
> deployt**. Ohne hinterlegte Worker-URL nutzt das Cockpit den **manuellen
> WhatsApp-Fallback** (Link + PDF-Download) – dieser funktioniert sofort.

## Sicherheitsgrundsätze

- **Keine Meta-Zugangsdaten** im Browser, im Cockpit (`vvcockpit.html`), in `deploy/`,
  in Git, im Backup oder in der IndexedDB. Alle Geheimnisse liegen ausschließlich als
  **Worker-Secrets**.
- Im Cockpit wird nur die **öffentliche Worker-URL** gespeichert (Firmendaten →
  „WhatsApp-Worker-URL“). Das ist kein Geheimnis.
- Der Worker akzeptiert nur Anfragen von der konfigurierten **Cockpit-Origin**
  (`ALLOWED_ORIGIN`) und – sofern vorgeschaltet – prüft die **Cloudflare-Access**-Identität.
- Es werden **keine PDF-Inhalte und keine personenbezogenen Daten geloggt**.
- **Idempotenz** (KV) verhindert Doppelsendungen, ein einfaches **Rate-Limit** bremst Missbrauch.

## Endpunkte

| Methode | Pfad | Zweck |
|--------|------|-------|
| GET  | `/api/whatsapp/health`        | Liveness-Check |
| GET  | `/api/whatsapp/config-status` | Welche Secrets gesetzt sind (true/false, **keine Werte**) |
| POST | `/api/whatsapp/send-document` | `multipart/form-data`: PDF hochladen + senden |
| GET  | `/api/whatsapp/status?id=...` | Zustellstatus zu einer Message-ID (aus KV) |
| GET  | `/api/whatsapp/webhook`       | Meta-Verifizierung (`hub.challenge`) |
| POST | `/api/whatsapp/webhook`       | Statusupdates (HMAC-`X-Hub-Signature-256` wird geprüft) |

### `POST /api/whatsapp/send-document` – Felder (multipart)
`file` (PDF), `customerId`, `normalizedPhone` (E.164, `+49…`), `documentType`
(`offer|invoice`), `documentNumber`, `fileName`, `messageText`,
`templateName` (optional), `idempotencyId`, `optInConfirmed` (`1`/`0`).

## Benötigte Secrets

```
WHATSAPP_ACCESS_TOKEN          # System-User-/permanenter Token
WHATSAPP_PHONE_NUMBER_ID       # Phone Number ID der WhatsApp-Business-Nummer
WHATSAPP_BUSINESS_ACCOUNT_ID   # WABA-ID
WHATSAPP_APP_SECRET            # App-Secret (Webhook-Signaturprüfung)
WHATSAPP_WEBHOOK_VERIFY_TOKEN  # frei gewählter Verify-Token
WHATSAPP_TEMPLATE_OFFER        # genehmigter Template-Name, z. B. vv_angebot_dokument
WHATSAPP_TEMPLATE_INVOICE      # genehmigter Template-Name, z. B. vv_rechnung_dokument
```

Setzen (Beispiel):
```bash
cp wrangler.toml.example wrangler.toml
wrangler secret put WHATSAPP_ACCESS_TOKEN
wrangler secret put WHATSAPP_PHONE_NUMBER_ID
# … restliche Secrets analog
# optional KV anlegen und in wrangler.toml eintragen:
wrangler kv:namespace create IDEMPOTENCY
wrangler kv:namespace create STATUS
wrangler kv:namespace create RATE
```

## Kundenservice-Zeitfenster & Templates

WhatsApp erlaubt **freie Dokumentnachrichten** nur innerhalb des **24‑h‑Kundenservice‑
Zeitfensters** (Kunde hat zuletzt geschrieben). Außerhalb bzw. bei unbekanntem Fenster
ist eine **genehmigte Template-Nachricht** nötig.

- Ist `templateName` gesetzt **oder** ein passendes Template-Secret konfiguriert, sendet
  der Worker als **Template** mit dem PDF als Dokument-Header-Komponente.
- Ist **kein** passendes Template konfiguriert und das Fenster unklar, sollte der
  automatische Versand **blockiert** und der **manuelle Fallback** genutzt werden
  (das Cockpit bietet diesen ohnehin an).

### Templates (im WhatsApp Business Manager genehmigen lassen)

1. **`vv_angebot_dokument`**
   > Guten Tag {{1}}, anbei erhalten Sie unser Angebot {{2}} von Verlegt & Verschraubt.
   > Bei Fragen oder Änderungswünschen können Sie sich gerne bei uns melden.

2. **`vv_rechnung_dokument`**
   > Guten Tag {{1}}, anbei erhalten Sie unsere Rechnung {{2}}.
   > Das Zahlungsziel und alle weiteren Angaben finden Sie im Dokument.

Beide mit **PDF als Dokument-/Medienkomponente** (Header) anlegen. Templates werden hier
**nicht automatisch** bei Meta erstellt – das geschieht manuell im Business Manager und
muss von Meta **genehmigt** werden.

## Manuell nötige Schritte (Meta/WhatsApp)

1. Meta-App + WhatsApp-Produkt anlegen, WABA + Telefonnummer verifizieren.
2. Permanenten Access-Token (System-User) erzeugen.
3. Templates `vv_angebot_dokument` / `vv_rechnung_dokument` anlegen und genehmigen lassen.
4. Webhook-URL (`/api/whatsapp/webhook`) + Verify-Token in der Meta-App eintragen,
   Felder `messages` abonnieren.
5. Secrets per `wrangler secret put` setzen, dann `wrangler deploy`.
6. Im Cockpit unter **Firmendaten → WhatsApp-Worker-URL** die Worker-URL eintragen.

## Hinweis zum PDF

Das Cockpit erzeugt Dokumente als **Druckansicht (Print-to-PDF)**. Für den manuellen
Versand speichert der Nutzer die PDF aus der Druckansicht. Für den automatischen Versand
sollte eine echte PDF-Datei übergeben werden; bis ein clientseitiger PDF-Renderer ergänzt
ist, kann der Worker die HTML-Repräsentation entgegennehmen – für produktive Templates
ist jedoch eine echte PDF dringend empfohlen.

## Status-Werte

`prepared · awaiting_confirmation · uploading · accepted · sent · delivered · read · failed · cancelled · manual_handoff_opened`
