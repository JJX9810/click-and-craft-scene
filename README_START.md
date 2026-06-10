# V&V Cockpit 2026 – Schnellstart (Windows)

## So startest du das Cockpit

**Doppelklick auf `start-vv-cockpit.bat`** – fertig.

Der Starter erledigt automatisch:

1. **Ollama** prüfen und – falls installiert und noch nicht aktiv – starten
2. Ollama für das Cockpit erreichbar machen (`OLLAMA_ORIGINS` für localhost)
3. **Lokalen HTTP-Server** für das Cockpit starten (Python)
4. Cockpit **im Browser öffnen** über `http://localhost:8000/cockpit/vvcockpit_26.html`
5. **Kein `file://`** mehr → Mikrofon, NEXUS und der Ollama-Intent-Router funktionieren

> Das schwarze Fenster **offen lassen**, solange du arbeitest. Zum Beenden das Fenster
> schließen oder `stop-vv-cockpit.bat` (im Hauptordner) doppelklicken (beendet Cockpit-Server
> und Gemini-Proxy, **nicht** Ollama).

---

## Ordnerstruktur (muss so bleiben)

```
<Projektordner>\
├─ start-vv-cockpit.bat          ← DAS doppelklicken
├─ stop-vv-cockpit.bat           ← beendet Server + Gemini-Proxy
├─ README_START.md
├─ .gitignore
├─ nexus-local-config.json       ← wird beim Start erzeugt (informativ)
├─ cockpit\
│   └─ vvcockpit_26.html         ← die Cockpit-App
└─ tools\
    ├─ start-vv-cockpit.ps1      ← Startlogik
    ├─ stop-vv-cockpit.ps1
    └─ gemini-proxy\
        ├─ server.js             ← lokaler Gemini-Proxy (Key bleibt serverseitig)
        ├─ package.json
        ├─ README.md
        ├─ .env.example          ← zu .env kopieren und Key eintragen
        └─ start-gemini-proxy.bat  (optional, nur Proxy testen)
```

Der Starter sucht die Cockpit-Datei automatisch (u. a. `cockpit/vvcockpit_26.html`,
`vvcockpit_26.html`, `vv-cockpit.html`). Wird keine gefunden, erscheint eine klare
Fehlermeldung statt eines stillen Absturzes.

---

## Häufige Fragen / Probleme

### „Python wurde nicht gefunden"
Python installieren: <https://www.python.org/downloads/> – beim Setup **„Add python.exe to PATH"** anhaken.
Danach `start-vv-cockpit.bat` erneut doppelklicken. (Alternativ mit Node: `npx serve -l 8000`.)

### „Ollama wurde nicht gefunden"
Das Cockpit startet trotzdem; NEXUS nutzt dann nur die **lokale Befehlslogik** (ohne KI-Verständnis).
Für den Intent-Router: Ollama installieren (<https://ollama.com>) und ein Modell laden, z. B.:
```
ollama pull gemma4
```
(Der Starter lädt **kein** Modell automatisch herunter.)

### „Modell gemma4:latest wurde nicht gefunden"
Im Cockpit unter **Einstellungen → NEXUS Intent-Router** ein vorhandenes Modell eintragen,
oder im Terminal `ollama pull <modell>` ausführen. Der Starter listet die vorhandenen Modelle auf.

### „Port 8000 belegt"
Der Starter sucht automatisch den nächsten freien Port (8001, 8002, …) und öffnet den Browser
mit der richtigen Adresse.

### CUDA-Fehler (`device kernel image is invalid`)
Der Starter setzt für ein **selbst gestartetes** Ollama den CPU-Modus (`CUDA_VISIBLE_DEVICES=-1`).
Läuft Ollama bereits, kann das nicht nachträglich erzwungen werden – dann Ollama komplett
beenden und den Starter erneut öffnen. (Der Starter beendet von sich aus **keine** Ollama-Prozesse.)

### PowerShell „kann nicht ausgeführt werden"
Die `.bat` startet PowerShell bereits mit `-ExecutionPolicy Bypass`. Falls eine Unternehmens-
Richtlinie das blockiert, PowerShell als Admin einmalig:
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

---

## NEXUS-Einstellungen im Cockpit (Empfehlung)

Unter **Einstellungen → 🔮 NEXUS Intent-Router (Ollama, lokal)**:

| Feld | Wert |
|------|------|
| Intent-Router aktivieren | **Ja** |
| Base URL | `http://localhost:11434` |
| Modell | `gemma4:latest` (oder ein vorhandenes) |
| Timeout (ms) | `30000` |
| Fallback auf lokale Befehle | **Ja** |

> Wird das Cockpit über diesen Starter geöffnet, werden diese Werte beim **allerersten** Start
> automatisch aus `nexus-local-config.json` vorbelegt – **bereits vorhandene Einstellungen werden
> nie überschrieben**.
