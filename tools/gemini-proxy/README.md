# NEXUS Gemini-Proxy (lokal)

Kleiner lokaler Server, der dem Cockpit **Gemini** als optionalen Intent-Router/Fallback
bereitstellt – **ohne** dass der API-Key jemals in den Browser gelangt.

```
Browser-Cockpit  ──POST /intent──▶  Gemini-Proxy (localhost:8787)  ──▶  Gemini API
   (kein Key)                          (Key nur hier, aus .env)
```

Der Proxy gibt an das Cockpit **nur** ein geprüftes Intent-JSON zurück. Er führt selbst
keine Cockpit-Aktionen aus. Es wird **nur minimaler Kontext** gesendet (aktuelle Seite,
Anzahl offener Posten/Kunden, erlaubte Tools) – **keine** Kundenakten.

## Einrichtung

1. **Node.js ≥ 18** installieren (<https://nodejs.org>). Keine npm-Pakete nötig.
2. Key hinterlegen – **eine** der beiden Varianten:
   - **Variante A (.env):** Datei `.env.example` zu `.env` kopieren und Key eintragen:
     ```
     GEMINI_API_KEY=DEIN_ECHTER_KEY
     ```
   - **Variante B (Umgebungsvariable):** in Windows `GEMINI_API_KEY` setzen
     (z. B. `setx GEMINI_API_KEY "DEIN_ECHTER_KEY"`, danach neue Konsole öffnen).
3. Starten – **drei Wege**:
   - **Empfohlen:** den One-Click-Starter `start-vv-cockpit.bat` nutzen (startet den Proxy automatisch mit).
   - **Nur der Proxy (zum Testen):** Doppelklick auf `start-gemini-proxy.bat` in diesem Ordner.
   - **Manuell:**
     ```
     node server.js
     ```

## Endpunkte

- `GET /health` → `{ "ok": true, "provider": "gemini", "hasKey": true, "model": "..." }`
- `POST /intent`
  ```json
  // Request
  { "userText": "Nexus, wer schuldet mir noch Geld?",
    "context": { "currentPage": "dashboard", "availableTools": ["..."],
                 "openItemsCount": 3, "customersCount": 12 } }
  ```
  ```json
  // Response (geprüft, Whitelist erzwungen)
  { "intent": "open_items_summary", "tool": "getOpenPositionsSummary",
    "confidence": 0.92, "requiresConfirmation": false,
    "entities": { "customerName": null, "amount": null, "date": null,
                  "category": null, "service": null, "page": null },
    "spokenResponse": "Ich prüfe die offenen Positionen.", "clarifyingQuestion": null }
  ```

## Sicherheit

- Key liegt **nur** in `.env` bzw. als Umgebungsvariable – nie im Browser, nie in localStorage.
- `.env` ist über `.gitignore` vom Commit ausgeschlossen; eingecheckt wird nur `.env.example`.
- Logs enthalten den Key **nur maskiert** (`AB...YZ`), niemals vollständig.
- Server bindet nur an `127.0.0.1` und erlaubt nur localhost-Origins (CORS).
- Unbekannte Tools/Intents von Gemini werden **verworfen** (Whitelist) und als Rückfrage beantwortet.

## Konfiguration (optional, über .env)

| Variable | Standard | Zweck |
|----------|----------|-------|
| `GEMINI_API_KEY` | – | dein Key (Pflicht für /intent) |
| `GEMINI_MODEL` | `gemini-2.0-flash` | Modell |
| `GEMINI_PROXY_PORT` | `8787` | Port |
| `GEMINI_ALLOW_ORIGINS` | localhost:8000/8001/8002/8765 | erlaubte Cockpit-Origins |
