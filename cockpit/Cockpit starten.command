#!/bin/bash
# =============================================================
#  V&V Cockpit – Starter fuer macOS
#  Liefert vvcockpit_26.html ueber http://localhost aus, damit
#  Chrome/Safari das Mikrofon erlaubt (sicherer Kontext).
# =============================================================
cd "$(dirname "$0")" || exit 1
PORT=8765

if ! [ -f "vvcockpit_26.html" ]; then
  echo "FEHLER: vvcockpit_26.html nicht neben diesem Starter gefunden."
  read -r -p "Enter zum Schliessen "
  exit 1
fi

if command -v python3 >/dev/null 2>&1; then PY=python3
elif command -v python >/dev/null 2>&1; then PY=python
else
  echo "Python wurde nicht gefunden. Bitte python3 installieren."
  read -r -p "Enter zum Schliessen "
  exit 1
fi

# freien Port suchen
while lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT+1)); done

echo ""
echo "  V&V Cockpit laeuft auf: http://localhost:$PORT/vvcockpit_26.html"
echo "  Mikrofon funktioniert hier (localhost = sicherer Kontext)."
echo "  Dieses Fenster offen lassen. Zum Beenden: Strg+C oder Fenster schliessen."
echo ""

( sleep 1; open "http://localhost:$PORT/vvcockpit_26.html" ) &
exec "$PY" -m http.server "$PORT"
