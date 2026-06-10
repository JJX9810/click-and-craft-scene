@echo off
chcp 65001 >nul
title V&V Cockpit 2026 - Starter
cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\start-vv-cockpit.ps1"
set "RC=%errorlevel%"

if not "%RC%"=="0" (
  echo.
  echo ============================================================
  echo  Der Start wurde mit einem Fehler beendet ^(Code %RC%^).
  echo  Bitte die roten Meldungen oben lesen.
  echo.
  echo  Haeufige Loesungen:
  echo   - Python fehlt:  https://www.python.org/downloads/  ^(Add to PATH^)
  echo   - Ollama fehlt:  https://ollama.com
  echo   - Cockpit-Datei: muss unter cockpit\vvcockpit_26.html liegen
  echo ============================================================
  echo.
  pause
)
