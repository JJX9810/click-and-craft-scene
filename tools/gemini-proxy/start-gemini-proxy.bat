@echo off
chcp 65001 >nul
title NEXUS Gemini-Proxy
cd /d "%~dp0"

echo ============================================================
echo  Starte NEXUS Gemini-Proxy (node server.js)
echo  Fenster offen lassen. Beenden: dieses Fenster schliessen.
echo ============================================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [FEHLER] Node.js wurde nicht gefunden.
  echo Bitte installieren: https://nodejs.org  ^(danach neue Konsole oeffnen^)
  echo.
  pause
  exit /b 1
)

if not exist "%~dp0.env" (
  echo [HINWEIS] Keine .env gefunden.
  echo Kopiere .env.example zu .env und trage GEMINI_API_KEY ein,
  echo oder setze die Umgebungsvariable GEMINI_API_KEY.
  echo Der Proxy startet trotzdem ^(antwortet dann mit Rueckfrage statt Intent^).
  echo.
)

node "%~dp0server.js"

echo.
echo [Proxy beendet]
pause
