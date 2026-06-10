# =============================================================
#  V&V Cockpit – lokaler Mini-Server (Windows-Bordmittel)
#  Liefert vvcockpit_26.html ueber http://localhost aus, damit
#  Chrome das Mikrofon erlaubt (sicherer Kontext).
#  Keine Admin-Rechte noetig, kein Python noetig, nur localhost.
# =============================================================
$ErrorActionPreference = 'Stop'
$port = 8765
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$htmlFile = Join-Path $root 'vvcockpit_26.html'

if (-not (Test-Path $htmlFile)) {
  Write-Host ""
  Write-Host "  FEHLER: 'vvcockpit_26.html' wurde neben diesem Starter nicht gefunden."
  Write-Host "  Bitte Starter und Cockpit-Datei im selben Ordner lassen."
  Write-Host ""
  Read-Host "  Enter zum Schliessen"
  exit 1
}

# Freien Port suchen (falls 8765 belegt ist)
$listener = $null
for ($i = 0; $i -lt 30; $i++) {
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $port)
    $listener.Start()
    break
  } catch {
    $listener = $null
    $port++
  }
}
if (-not $listener) {
  Write-Host "  Kein freier Port gefunden (8765-8794 belegt)."
  Read-Host "  Enter zum Schliessen"
  exit 1
}

$url = "http://localhost:$port/"
Write-Host ""
Write-Host "  ============================================================"
Write-Host "   V&V COCKPIT laeuft jetzt auf:  $url"
Write-Host "  ------------------------------------------------------------"
Write-Host "   - Das Mikrofon funktioniert hier (localhost = sicher)."
Write-Host "   - Dieses schwarze Fenster OFFEN lassen, solange du arbeitest."
Write-Host "   - Zum Beenden einfach dieses Fenster schliessen."
Write-Host "  ============================================================"
Write-Host ""

# Browser oeffnen (Chrome falls vorhanden, sonst Standardbrowser)
$chrome = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if ($chrome) { Start-Process $chrome $url } else { Start-Process $url }

$enc = [System.Text.Encoding]::ASCII
while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $stream.ReadTimeout = 2000
    # Anfrage grob lesen/verwerfen (verhindert Haengen bei Preconnect)
    try {
      $buf = New-Object byte[] 8192
      [void]$stream.Read($buf, 0, $buf.Length)
    } catch {}
    # Datei bei jeder Anfrage frisch laden -> Aenderungen wirken nach Reload sofort
    $body = [System.IO.File]::ReadAllBytes($htmlFile)
    $header = "HTTP/1.1 200 OK`r`n" +
              "Content-Type: text/html; charset=utf-8`r`n" +
              "Content-Length: $($body.Length)`r`n" +
              "Cache-Control: no-store`r`n" +
              "Connection: close`r`n`r`n"
    $hb = $enc.GetBytes($header)
    $stream.Write($hb, 0, $hb.Length)
    $stream.Write($body, 0, $body.Length)
    $stream.Flush()
  } catch {
  } finally {
    try { $client.Close() } catch {}
  }
}
