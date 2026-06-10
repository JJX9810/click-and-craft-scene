@echo off
chcp 65001 >nul
title V&V Cockpit 2026 - Stop
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\stop-vv-cockpit.ps1"
echo.
pause
