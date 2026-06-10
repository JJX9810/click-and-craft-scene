<#
  Stoppt die lokalen Cockpit-Server (Ports) und optional den Gemini-Proxy.
  Ollama wird standardmäßig NICHT beendet.
#>
$ErrorActionPreference = 'SilentlyContinue'

# ---------------- Konfiguration ----------------
$StopGeminiProxy = $true
$StopOllama      = $false
$PortsToStop     = @(8000, 8001, 8002, 8003, 8787)

function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){   Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }

# Wenn der Gemini-Proxy bleiben soll, Port 8787 aus der Liste nehmen
if(-not $StopGeminiProxy){ $PortsToStop = $PortsToStop | Where-Object { $_ -ne 8787 } }

Info ("Suche lauschende Prozesse auf Ports: " + ($PortsToStop -join ', ') + " ...")

# PID -> Port sammeln (nur lauschende Sockets)
$pidMap = @{}
foreach($port in $PortsToStop){
  $conns = Get-NetTCPConnection -State Listen -LocalPort $port -ErrorAction SilentlyContinue
  foreach($c in $conns){ if($c.OwningProcess){ $pidMap[[int]$c.OwningProcess] = $port } }
}

if($pidMap.Count -eq 0){
  Warn "Keine lauschenden Cockpit-/Proxy-Prozesse gefunden."
} else {
  foreach($procId in $pidMap.Keys){
    $p = Get-Process -Id $procId -ErrorAction SilentlyContinue
    $name = if($p){ $p.ProcessName } else { "?" }
    # Sicherheit: nur erwartete Serverprozesse beenden (kein aggressives Kill-All)
    if($name -match '^(python|pythonw|py|node)$'){
      try{ Stop-Process -Id $procId -Force; Ok ("Beendet: " + $name + " (PID " + $procId + ", Port " + $pidMap[$procId] + ")") }
      catch{ Warn ("Konnte PID " + $procId + " nicht beenden: " + $_.Exception.Message) }
    } else {
      Warn ("Übersprungen (kein erwarteter Server): " + $name + " (PID " + $procId + ", Port " + $pidMap[$procId] + ")")
    }
  }
}

# Ollama nur auf ausdrücklichen Wunsch beenden
if($StopOllama){
  Get-Process ollama -ErrorAction SilentlyContinue | ForEach-Object {
    try{ Stop-Process -Id $_.Id -Force; Ok ("Ollama beendet (PID " + $_.Id + ")") }catch{}
  }
} else {
  Info "Ollama wurde NICHT beendet (Standard: \$StopOllama=\$false)."
}

Ok "Stop abgeschlossen."
