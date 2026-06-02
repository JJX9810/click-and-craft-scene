
# Admin-Bereich mit Live-Tracking

## Ziel
Geschützter Admin-Bereich (nur du), erreichbar über `/admin`, mit Login per E-Mail+Passwort. Dort: aktive Besucher live, Kostenrechner-Eingaben live, Historie aller Berechnungen mit Export & Löschen, Seitenaufruf-Statistiken.

## Voraussetzung
Lovable Cloud aktivieren (PostgreSQL + Auth + Realtime). Nur dein einziger Admin-Account wird angelegt; Public-Signup bleibt deaktiviert.

## Datenmodell (neue Tabellen)
- `admin_users` – Whitelist deiner User-ID (RLS: nur eigene Zeile lesbar). Bestimmt, wer Admin ist.
- `page_views` – id, path, referrer, user_agent, country (optional), session_id, created_at. Anonym, keine IP.
- `active_sessions` – session_id, path, last_seen_at. TTL 60 s → „aktive Besucher".
- `calculator_sessions` – session_id, aktueller Snapshot (Fläche, Optionen, Zwischensumme), updated_at. Live-Eingaben.
- `calculator_submissions` – komplette Berechnung beim Klick auf „Anfrage senden" oder beim Verlassen, mit Endpreis, Optionen JSON, created_at.

RLS:
- Public/anon: nur INSERT/UPDATE eigener Session-Zeile (key = session_id).
- Admin (über `has_role`-Funktion + `admin_users`): SELECT/DELETE auf allen Tabellen.

## Tracking (Frontend)
- Anonyme `session_id` in `sessionStorage` (UUID).
- Globaler Tracker im Root: bei jedem Routenwechsel `page_views` + `active_sessions` upsert; Heartbeat alle 20 s.
- Kostenrechner: bei jeder Änderung debounced (500 ms) Upsert in `calculator_sessions`; bei Reset/Absenden Insert in `calculator_submissions`.
- Keine IP-Adressen, keine personenbezogenen Daten – DSGVO-konform.

## Admin-Bereich (Routen)
- `/login` – Login-Formular (E-Mail+Passwort). Bei Erfolg → `/admin`.
- `/_authenticated/admin` – Layout-Route, prüft Admin-Status via `has_role`. Nicht-Admins → 404.
- `/_authenticated/admin/index` – Dashboard (aktive Besucher zählen, neueste Berechnungen, Stats-Karten).
- `/_authenticated/admin/live` – Live-Kostenrechner-Sessions (Realtime-Subscription auf `calculator_sessions`).
- `/_authenticated/admin/berechnungen` – Tabelle aller Submissions mit Filter, **CSV-Export**, **Löschen** (einzeln + alle).
- `/_authenticated/admin/statistiken` – Top-Seiten, Aufrufe pro Tag (Chart).

Realtime: Supabase Realtime-Channels für `active_sessions` und `calculator_sessions` → Updates ohne Reload.

## Sicherheit
- Login nur via Supabase Auth.
- Public-Signup in Cloud-Settings deaktiviert (nur dein Account existiert).
- Admin-Check serverseitig über Security-Definer-Funktion `has_role`.
- Admin-Routen über `_authenticated` Layout + Child-Gate mit `has_role`-Check.
- `/admin` taucht nicht in Navigation/Footer/Sitemap auf.

## Bestehende Seite
Keine Änderungen am Design, an Texten, am Kostenrechner-UI oder an bestehenden Routen. Nur ein unsichtbarer Tracking-Hook wird im Root ergänzt und der Kostenrechner bekommt einen Tracking-Hook für Eingaben.

## Technische Details
- Stack: TanStack Start + Lovable Cloud (Supabase).
- Server-Functions mit `requireSupabaseAuth` + Admin-Check für alle Admin-Datenabrufe.
- Realtime via `supabase.channel(...).on('postgres_changes', ...)` im Client.
- CSV-Export client-seitig aus geladenen Daten.
- Aktive-Besucher-Cleanup via TanStack Query Refetch alle 30 s (kein Cron nötig).
