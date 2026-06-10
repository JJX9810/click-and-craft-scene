<#
  Beendet NUR den lokalen Cockpit-Server (python -m http.server).
  Ollama bleibt unangetastet.
#>
$ErrorActionPreference = 'SilentlyContinue'
function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){   Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }

Info "Suche laufenden Cockpit-Server (python http.server) und Gemini-Proxy (node server.js) ..."
$py = Get-CimInstance Win32_Process -Filter "Name='python.exe' OR Name='pythonw.exe' OR Name='py.exe'" |
      Where-Object { $_.CommandLine -and ($_.CommandLine -match 'http\.server') }
$node = Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
        Where-Object { $_.CommandLine -and ($_.CommandLine -match 'gemini-proxy') }
$procs = @($py) + @($node) | Where-Object { $_ }

if(-not $procs){ Warn "Kein laufender Cockpit-Server / Gemini-Proxy gefunden."; exit 0 }

foreach($p in $procs){
  try{ Stop-Process -Id $p.ProcessId -Force; Ok ("Beendet: PID " + $p.ProcessId + "  (" + $p.CommandLine + ")") }
  catch{ Warn ("Konnte PID " + $p.ProcessId + " nicht beenden: " + $_.Exception.Message) }
}
Ok "Cockpit-Server (und ggf. Gemini-Proxy) gestoppt. Ollama wurde NICHT beendet."
