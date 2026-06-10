<#
  ============================================================
  V&V COCKPIT 2026 – One-Click-Starter (Windows, PowerShell)
  ------------------------------------------------------------
  - prüft/startet Ollama (lokal), optional CPU-Modus
  - startet lokalen HTTP-Server (Python) für das Cockpit
  - öffnet das Cockpit im Browser über http://localhost  (KEIN file://)
  - schreibt nexus-local-config.json (informativ, optional vom Cockpit ladbar)
  Aufruf: über start-vv-cockpit.bat (Doppelklick)
  ============================================================
#>
$ErrorActionPreference = 'Stop'

# ---------------- Konfiguration (bei Bedarf anpassen) ----------------
$CockpitFile   = "cockpit/vvcockpit_26.html"
$CockpitPort   = 8000
$OllamaBaseUrl = "http://localhost:11434"
$OllamaModel   = "gemma4:latest"
$OpenBrowser   = $true
$UseChromeIfAvailable = $true
$ForceOllamaCpu = $true
$RestartOllamaIfCudaModeRequired = $false   # Standard: KEINE Prozess-Kills
$EnableGeminiProxy = $true                  # optionaler Gemini-Fallback (nur wenn Key+Node vorhanden)
$GeminiProxyPort   = 8787
$AllowOrigins = @(
  "http://localhost:8000","http://127.0.0.1:8000",
  "http://localhost:8765","http://127.0.0.1:8765"
)

# ---------------- Ausgabe-Helfer ----------------
function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Ok($m){   Write-Host $m -ForegroundColor Green }
function Warn($m){ Write-Host $m -ForegroundColor Yellow }
function Err($m){  Write-Host $m -ForegroundColor Red }

function Test-PortFree([int]$p){
  try{ $l=[System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback,$p); $l.Start(); $l.Stop(); return $true }
  catch{ return $false }
}
function Test-HttpOk([string]$url){
  try{ Invoke-RestMethod -Uri $url -TimeoutSec 3 -ErrorAction Stop | Out-Null; return $true }
  catch{ return $false }
}

# Projektwurzel = übergeordneter Ordner von tools\
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $ProjectRoot

Write-Host ""
Write-Host "==================  V&V COCKPIT STARTER  ==================" -ForegroundColor Magenta
Info "Projektordner: $ProjectRoot"

# ---------------- 1) Cockpit-Datei finden ----------------
$candidates = @(
  $CockpitFile,
  "vvcockpit_26.html",
  "vv-cockpit.html",
  "vvcockpit.html",
  "vvcockpit (25).html",
  "cockpit/vv-cockpit.html"
)
$foundRel = $null
foreach($c in $candidates){
  if(Test-Path -LiteralPath (Join-Path $ProjectRoot $c)){ $foundRel = $c; break }
}
if(-not $foundRel){
  Err "Cockpit-Datei NICHT gefunden. Gesucht (relativ zu Projektordner):"
  $candidates | ForEach-Object { Err "   - $_" }
  Err "Bitte die Cockpit-HTML in diesen Ordner legen oder oben im Script `$CockpitFile anpassen."
  exit 1
}
$CockpitFile = $foundRel.Replace('\','/')
Ok "Cockpit-Datei gefunden: $CockpitFile"

# ---------------- 2) Freien Cockpit-Port wählen ----------------
$port = $CockpitPort
if(-not (Test-PortFree $port)){
  Warn "Port $port ist belegt. Suche freien Port ..."
  $found=$false
  for($p=$CockpitPort+1; $p -le $CockpitPort+20; $p++){ if(Test-PortFree $p){ $port=$p; $found=$true; break } }
  if(-not $found){ Err "Kein freier Port zwischen $CockpitPort und $($CockpitPort+20) gefunden."; exit 1 }
}
Ok "Cockpit-Port: $port"

# Erlaubte Origins inkl. tatsächlich genutztem Port
$origins = @("http://localhost:$port","http://127.0.0.1:$port") + $AllowOrigins | Select-Object -Unique

# ---------------- 3) Ollama prüfen / starten ----------------
Info "Prüfe Ollama ..."
$ollamaCmd   = Get-Command ollama -ErrorAction SilentlyContinue
$ollamaApiUp = Test-HttpOk "$OllamaBaseUrl/api/tags"

if($ollamaApiUp){
  Ok "Ollama API erreichbar ($OllamaBaseUrl) – läuft bereits."
  if($ForceOllamaCpu){
    Warn "Ollama läuft bereits. Falls CUDA-Fehler auftreten, Ollama komplett beenden und den Starter erneut öffnen (CPU-Modus wirkt nur bei einem vom Starter gestarteten Ollama)."
    if($RestartOllamaIfCudaModeRequired){ Warn "RestartOllamaIfCudaModeRequired=true gesetzt – wird aus Sicherheitsgründen NICHT automatisch ausgeführt." }
  }
}
elseif($ollamaCmd){
  Info "Ollama gefunden, API nicht erreichbar -> starte Ollama-Server ..."
  if($ForceOllamaCpu){ $env:CUDA_VISIBLE_DEVICES = "-1"; Info "   CPU-Modus aktiv: CUDA_VISIBLE_DEVICES=-1" }
  $env:OLLAMA_ORIGINS = ($origins -join ",")
  Info "   OLLAMA_ORIGINS=$($env:OLLAMA_ORIGINS)"
  try{ Start-Process -FilePath $ollamaCmd.Source -ArgumentList "serve" -WindowStyle Hidden | Out-Null }
  catch{ Warn "Konnte 'ollama serve' nicht starten: $($_.Exception.Message)" }
  $up=$false
  for($i=0;$i -lt 10;$i++){ Start-Sleep -Seconds 1; if(Test-HttpOk "$OllamaBaseUrl/api/tags"){ $up=$true; break } }
  if($up){ Ok "Ollama API ist jetzt erreichbar."; $ollamaApiUp=$true }
  else{ Warn "Ollama-Server reagiert noch nicht. Cockpit startet trotzdem – NEXUS nutzt dann den lokalen Fallback." }
}
else{
  Warn "Ollama wurde nicht gefunden (Get-Command ollama)."
  Warn "Das Cockpit startet trotzdem. NEXUS nutzt dann nur die lokale Befehlslogik."
  Warn "Ollama installieren: https://ollama.com  – danach Starter erneut ausführen."
}

# ---------------- 4) Ollama-Modell prüfen (kein Auto-Download) ----------------
if($ollamaApiUp){
  try{
    $tags = Invoke-RestMethod -Uri "$OllamaBaseUrl/api/tags" -TimeoutSec 5
    $models = @(); if($tags.models){ $models = @($tags.models | ForEach-Object { $_.name }) }
    $base = ($OllamaModel -split ":")[0]
    $has  = $models | Where-Object { $_ -eq $OllamaModel -or (($_ -split ":")[0] -eq $base) }
    if($has){ Ok "Modell gefunden: $OllamaModel" }
    else{
      Warn "Modell '$OllamaModel' wurde nicht gefunden."
      if($models.Count){ Info ("Vorhandene Modelle: " + ($models -join ", ")) } else { Info "Aktuell sind keine Modelle installiert." }
      Warn "Im Cockpit ein vorhandenes Modell wählen ODER im Terminal laden: ollama pull $base"
      Warn "(Es wird KEIN Modell automatisch heruntergeladen.)"
    }
  }catch{ Warn "Modell-Liste konnte nicht gelesen werden: $($_.Exception.Message)" }
}

# ---------------- 4b) Gemini-Proxy (optional, Key bleibt serverseitig) ----------------
$geminiUp = $false
if($EnableGeminiProxy){
  Info "Prüfe Gemini-Proxy ..."
  $proxyDir = Join-Path $ProjectRoot "tools\gemini-proxy"
  $proxyJs  = Join-Path $proxyDir "server.js"
  $node = Get-Command node -ErrorAction SilentlyContinue
  # Key aus Umgebungsvariable ODER .env (Platzhalter zählen NICHT als Key)
  $placeholder = 'your_gemini_api_key_here|HIER_KEY_EINTRAGEN'
  $hasKey = $false
  if($env:GEMINI_API_KEY -and $env:GEMINI_API_KEY.Trim() -ne "" -and $env:GEMINI_API_KEY -notmatch $placeholder){ $hasKey=$true }
  $envFile = Join-Path $proxyDir ".env"
  if(-not $hasKey -and (Test-Path -LiteralPath $envFile)){
    $line = Select-String -Path $envFile -Pattern '^\s*GEMINI_API_KEY\s*=\s*(.+)$' -ErrorAction SilentlyContinue | Select-Object -First 1
    if($line){ $v = $line.Matches[0].Groups[1].Value.Trim().Trim('"').Trim("'"); if($v -and $v -notmatch $placeholder){ $hasKey=$true } }
  }

  if(Test-HttpOk "http://localhost:$GeminiProxyPort/health"){ Ok "Gemini-Proxy läuft bereits (Port $GeminiProxyPort)."; $geminiUp=$true }
  elseif(-not (Test-Path -LiteralPath $proxyJs)){ Warn "Gemini-Proxy-Datei nicht gefunden – übersprungen. (Cockpit nutzt Ollama/lokal.)" }
  elseif(-not $node){ Warn "Node.js nicht gefunden – Gemini-Proxy übersprungen. Ollama/lokaler Fallback bleibt aktiv." }
  elseif(-not $hasKey){ Warn "Gemini-Key nicht gefunden. Gemini-Fallback deaktiviert. Ollama/lokaler Fallback bleibt aktiv." }
  else{
    Info "Starte Gemini-Proxy (node server.js, Port $GeminiProxyPort) ..."
    $env:GEMINI_ALLOW_ORIGINS = ($origins -join ",")
    if(-not $env:GEMINI_PROXY_PORT){ $env:GEMINI_PROXY_PORT = "$GeminiProxyPort" }
    try{ Start-Process -FilePath $node.Source -ArgumentList "server.js" -WorkingDirectory $proxyDir -WindowStyle Hidden | Out-Null }
    catch{ Warn "Konnte Gemini-Proxy nicht starten: $($_.Exception.Message)" }
    for($i=0;$i -lt 8;$i++){ Start-Sleep -Milliseconds 500; if(Test-HttpOk "http://localhost:$GeminiProxyPort/health"){ $geminiUp=$true; break } }
    if($geminiUp){ Ok "Gemini-Proxy erreichbar (http://localhost:$GeminiProxyPort)." } else { Warn "Gemini-Proxy reagiert noch nicht – Cockpit startet trotzdem." }
  }
}

# ---------------- 5) Python-Server starten ----------------
$pyExe=$null
$pc  = Get-Command python -ErrorAction SilentlyContinue
$pyc = Get-Command py -ErrorAction SilentlyContinue
if($pc){ $pyExe=$pc.Source } elseif($pyc){ $pyExe=$pyc.Source }
if(-not $pyExe){
  Err "Python wurde nicht gefunden (weder 'python' noch 'py')."
  Err "Bitte Python installieren: https://www.python.org/downloads/  (beim Setup 'Add python.exe to PATH' anhaken)."
  $npx = Get-Command npx -ErrorAction SilentlyContinue
  if($npx){ Warn "Alternative (Node erkannt): in diesem Ordner manuell starten ->  npx serve -l $port" }
  exit 1
}

$cockpitUrl = "http://localhost:$port/$CockpitFile"
Info "Starte Cockpit-Server: `"$pyExe`" -m http.server $port   (Ordner: $ProjectRoot)"
$srv = Start-Process -FilePath $pyExe -ArgumentList @("-m","http.server","$port") -WorkingDirectory $ProjectRoot -NoNewWindow -PassThru

$ready=$false
for($i=0;$i -lt 15;$i++){ Start-Sleep -Milliseconds 400; if(Test-HttpOk "http://localhost:$port/"){ $ready=$true; break } }
if($ready){ Ok "Cockpit-Server läuft auf Port $port." } else { Warn "Server antwortet noch nicht ganz – Browser wird trotzdem geöffnet." }

# ---------------- 6) Konfigurationsdatei schreiben ----------------
try{
  $cfg = [ordered]@{ ollamaBaseUrl=$OllamaBaseUrl; ollamaModel=$OllamaModel; cockpitUrl=$cockpitUrl;
                     geminiProxyUrl=("http://localhost:$GeminiProxyPort"); geminiEnabled=$geminiUp }
  ($cfg | ConvertTo-Json) | Set-Content -LiteralPath (Join-Path $ProjectRoot "nexus-local-config.json") -Encoding UTF8
  Info "Konfiguration geschrieben: nexus-local-config.json"
}catch{ Warn "Konnte nexus-local-config.json nicht schreiben: $($_.Exception.Message)" }

# ---------------- 7) Browser öffnen ----------------
if($OpenBrowser){
  Info "Öffne Browser: $cockpitUrl"
  $opened=$false
  if($UseChromeIfAvailable){
    $chrome = @(
      "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
      "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
      "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1
    if($chrome){ Start-Process $chrome $cockpitUrl; $opened=$true }
  }
  if(-not $opened){ Start-Process $cockpitUrl }
}

Write-Host ""
Ok "FERTIG. Cockpit läuft: $cockpitUrl"
Info "• Dieses Fenster OFFEN lassen, solange du arbeitest."
Info "• Mikrofon & NEXUS funktionieren hier (localhost = sicherer Kontext)."
Info "• Zum Beenden: dieses Fenster schließen (oder tools\stop-vv-cockpit.bat)."
Write-Host ""

# Blockiert, bis der Server-Prozess endet (Fenster schließen beendet ihn).
try{ Wait-Process -Id $srv.Id }catch{}
