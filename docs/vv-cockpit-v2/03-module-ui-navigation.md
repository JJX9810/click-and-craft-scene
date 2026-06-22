# 03 — Module, Mobile-First-UI & Navigation

---

## 1. Die 11 Module (konkrete Spezifikation)

Legende: **V1** = im MVP, **V1.1** = kurz danach, **V2** = später.

### 1. Dashboard — **V1**
- **Inhalt:** offene Posten (Summe + Liste überfällig), heutige Aufgaben (`tasks` mit `due_date = heute`),
  wichtige Warnungen (überfällige Rechnungen, Angebote kurz vor Ablauf, fehlende Belege),
  letzte 5 Kunden/Aufträge, Umsatz- & Liquiditätsüberblick (Monat: bezahlt vs. offen, Steuerrücklage 35 %).
- **Datenquellen:** `open_items`, `tasks`, `invoices`, `customers`, `projects`, `bookings`.
- **Mobile:** gestapelte Karten, wichtigste Zahl groß; Pull-to-refresh; Realtime-Aktualisierung.
- **Aktionen:** Schnellzugriff „+ Kunde", „+ Angebot", „Zahlung erfassen".

### 2. Kundenkartei — **V1**
- **Liste:** Suche (Name/Tel/Ort), Filter (aktiv, Tags), Sortierung. Mobile: Suchfeld oben, Karten-Liste.
- **Detail (Tabs):** Stammdaten · Adresse/Kontakt · Notizen · Projekte/Aufträge · Dateien/Fotos · Kommunikation.
- **Aktionen:** anrufen (tel:-Link), Maps öffnen, neues Projekt/Angebot starten.
- **Daten:** `customers` (+ verknüpfte `projects`, `files`).
- **Kommunikation V1:** einfache Notiz-Timeline; E-Mail/WhatsApp-Verlauf = **V2**.

### 3. Aufträge/Projekte — **V1**
- **Felder:** Leistung, Status (Anfrage→…→Abgeschlossen), Termine, Material, Fortschritt (%),
  interne Notizen, Nachkalkulation (Kosten vs. Erlös).
- **Detail (Tabs):** Übersicht · Aufmaß · Angebote · Rechnungen · Dateien · Notizen.
- **Daten:** `projects` (+ `measurements`, `offers`, `invoices`, `files`).
- **Mobile:** Statuswechsel per großem Button; Fortschritt per Slider.

### 4. Aufmaß — **V1.1** (Basis in V1)
- **V1 (Basis):** Räume erfassen (Name, m², lfm Sockelleisten, Altboden ja/nein, Zusatzleistungen), Summen,
  Fotos je Raum (Handy-Kamera → Storage).
- **V1.1:** PDF-/Druckansicht, direkte Übernahme ins Angebot (Mengen → `offer_items` via `price_rules`).
- **Daten:** `measurements`, `measurement_rooms`, `files`.
- **Mobile-First:** Kamera-Button prominent; Zahlen-Eingabe mit großen Feldern; offline lesbar, Upload bei Verbindung.

### 5. Angebote — **V1**
- **Felder:** Angebotsnummer (Nummernkreis), Positionen, Preise, Status (Entwurf/gesendet/angenommen/abgelehnt).
- **Aktionen:** Position aus Preisliste wählen, PDF erzeugen (Edge Function), als „gesendet" markieren,
  **in Rechnung umwandeln** (kopiert Positionen → `invoices`/`invoice_items`, setzt `converted_invoice_id`).
- **Daten:** `offers`, `offer_items`, `price_rules`, `settings`.
- **Regel:** nach „gesendet" Positionen sperren (neue Version statt Änderung).

### 6. Rechnungen — **V1**
- **Felder:** Rechnungsnummer (lückenlos), Positionen, Zahlungsstatus, Teilzahlungen, Mahnungen (Level),
  PDF-Erzeugung, **§19-UStG-Hinweis** (aus `settings`).
- **Aktionen:** PDF erzeugen, „gesendet", Zahlung erfassen (→ `payments`), Storno (→ Korrekturrechnung).
- **Daten:** `invoices`, `invoice_items`, `payments`, `settings`.
- **Regeln:** ab „gesendet" unveränderlich; jede Änderung → `audit_log`; kein Hard Delete (10 J.).

### 7. Offene Posten / Zahlungen — **V1**
- **Inhalt:** offene Beträge, Teilzahlungen, Fälligkeit, Mahnstatus, Zahlungszuordnung.
- **Kernregel:** offene Posten sind **berechnet** (`invoices` − `payments`), **nie** handgepflegt →
  keine widersprüchlichen Quellen.
- **Aktionen:** Zahlung erfassen/zuordnen, Mahnstufe erhöhen (automatisches Mahn-PDF = **V2**).
- **Daten:** `open_items` (View/Trigger), `payments`, `invoices`.

### 8. Buchhaltung — **V1.1 / V2**
- **Inhalt:** Einnahmen, Ausgaben, Belege, Kategorien, Steuer-Rücklage 35 %, Betriebsausgaben,
  Privatentnahmen/-einlagen, Export für Steuerberater/EÜR.
- **V1.1:** Ausgaben + Belege erfassen, 35 %-Rücklage je Einnahme anzeigen.
- **V2:** Kategorien-Auswertung, EÜR-Export (CSV/PDF), Privatbuchungen vollständig.
- **Daten:** `bookings`, `expenses`, `files`, `invoices`/`payments`.
- **Sicherheit:** **nur Admin (Justus)**; festgeschriebene Buchungen unveränderlich.

### 9. Dateien — **V1**
- **Inhalt:** Fotos, PDFs, Belege, Aufmaßbilder, Angebots-/Rechnungskopien.
- **Regel:** alles in Storage; in DB nur `files`-Metadaten; **keine Base64-Dopplungen** (Dedup über `sha256`).
- **Aktionen:** Upload (Handy-Kamera/Datei), Vorschau (signierte URL), Zuordnung zu Kunde/Projekt.
- **Mobile:** „Foto aufnehmen" als Hauptaktion; Galerie je Projekt.

### 10. NEXUS — **V1.5 / V2**
- **V1.5 (ohne KI):** globale Such-/Befehlsleiste (⌘K): „offene Posten", „Kunde Müller", „Aufgabe erstellen …".
- **V2 (KI-Agenten):** Content, Marketing, Kundenkommunikation.
- **Daten:** `nexus_memory` (+ pgvector später).
- **Sicherheit:** **keine API-Keys im Browser**; KI-Aufrufe nur über **Edge Functions mit Secrets**;
  Eingaben/Ausgaben protokollieren; keine sensiblen Kundendaten ungefiltert an externe Modelle.

### 11. Einstellungen — **V1**
- **Inhalt:** Firmendaten, Leistungs-/Preislisten (`price_rules`), Nummernkreise, Steuerrücklagenquote (35 %),
  Standard-Anzahlung, Benutzer/Rollen/Rechte, Backup-Einstellungen.
- **Sicherheit:** **nur Admin**; Nutzerrollen-Verwaltung mit Bestätigung; Nummernkreis-Änderung protokolliert.

---

## 2. Mobile-First-UI-Struktur

**Grundprinzipien**
- **Mobile zuerst entworfen**, Desktop ist die Erweiterung (nicht umgekehrt).
- **Daumen-Reichweite:** Primäraktionen unten; Tap-Ziele ≥ 44 px.
- **Eine Hauptaktion pro Screen** klar hervorgehoben (FAB: „+").
- **Offline-Verhalten:** Lesen aus Cache erlaubt; **Schreiben nur online** (klarer Hinweis „keine Verbindung").
- **Realtime:** Änderung auf PC erscheint automatisch auf dem Handy (und umgekehrt) — sichtbarer „aktualisiert"-Hinweis.
- **Kamera-Integration:** Foto-Upload direkt aus der Handy-Kamera in Aufmaß/Projekt/Beleg.
- **Große Zahlen, klare Status-Badges** (Farbe + Text, nicht nur Farbe → Barrierefreiheit).

**Layout**
| Gerät | Navigation | Inhalt |
|---|---|---|
| **Handy** | **Bottom-Tab-Bar** (Dashboard · Kunden · Aufträge · Mehr) + ⌘K-Suche oben | einspaltig, Karten, Tabs scrollbar |
| **Tablet** | Sidebar (eingeklappt) | zweispaltig möglich |
| **Desktop** | **Sidebar** (Module) + Topbar (Suche, Profil) | Listen-/Detail-Splitview |

**UI-Bausteine:** bereits im Repo vorhanden (shadcn/ui: Card, Dialog, Drawer, Tabs, Table, Sonner-Toasts,
Command/⌘K, Form). → Wiederverwenden, keine neue Komponentenbibliothek.

---

## 3. Seitenstruktur / Navigation (Routen)

```
/login                      (Supabase Auth)
/app                        → Dashboard
/app/kunden                 Liste
/app/kunden/:id             Detail (Tabs: Stammdaten·Notizen·Projekte·Dateien·Kommunikation)
/app/auftraege              Liste
/app/auftraege/:id          Detail (Tabs: Übersicht·Aufmaß·Angebote·Rechnungen·Dateien·Notizen)
/app/auftraege/:id/aufmass  Aufmaß-Erfassung
/app/angebote               Liste
/app/angebote/:id           Detail / Editor (PDF, → Rechnung)
/app/rechnungen             Liste
/app/rechnungen/:id         Detail (PDF, Zahlung erfassen, Storno)
/app/offene-posten          Offene Posten + Zahlungen
/app/buchhaltung            (V1.1) Einnahmen/Ausgaben/Belege/Export
/app/dateien                Datei-Browser
/app/einstellungen          Firmendaten·Preise·Nummernkreise·Benutzer·Backup   (nur Admin)
                            ⌘K NEXUS-Suche global (overlay)
```

**Navigationslogik**
- Auth-Guard: `/app/**` nur authentifiziert (server-seitig geprüft, vorhandenes `auth-middleware`-Muster).
- Rollen-Guard: `/app/einstellungen` und `/app/buchhaltung` nur `admin`.
- Tiefenlinks: jede Entität hat eine teilbare URL (z. B. Rechnung direkt öffnen).
- Breadcrumbs auf Desktop; „Zurück"-Geste/Button auf Mobile.
