@echo off
chcp 65001 >nul
title V&V Cockpit 2026
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0_cockpit-server.ps1"
if errorlevel 1 (
  echo.
  echo Der Starter konnte nicht ausgefuehrt werden.
  echo Tipp: Cockpit per Doppelklick auf vvcockpit_26.html oeffnen
  echo       (dann ohne Mikrofon).
  pause
)
