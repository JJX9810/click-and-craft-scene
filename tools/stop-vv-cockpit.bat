@echo off
chcp 65001 >nul
title V&V Cockpit - Stop
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop-vv-cockpit.ps1"
echo.
pause
