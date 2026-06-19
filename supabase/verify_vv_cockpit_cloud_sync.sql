-- ============================================================================
-- V&V Cockpit – Cloud-Sync: PRÜF-/VERIFY-Skript (NUR LESEND)
-- Datei: supabase/verify_vv_cockpit_cloud_sync.sql
-- ----------------------------------------------------------------------------
-- Dieses Skript verändert NICHTS. Es prüft nur, ob die Migration korrekt
-- eingespielt wurde. Im Supabase-SQL-Editor abschnittsweise ausführen.
-- Es enthält keine Keys, Passwörter, User-IDs oder Workspace-IDs.
-- ============================================================================

-- 1) Tabellen vorhanden?
select 'tables' as check, table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('workspaces','workspace_members','cockpit_state')
order by table_name;
-- Erwartung: genau 3 Zeilen.

-- 2) RLS auf allen drei Tabellen aktiv?
select 'rls_enabled' as check, c.relname as table_name, c.relrowsecurity as rls_on
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('workspaces','workspace_members','cockpit_state')
order by c.relname;
-- Erwartung: rls_on = true für alle drei.

-- 3) Policies vorhanden?
select 'policies' as check, schemaname, tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
  and tablename in ('workspaces','workspace_members','cockpit_state')
order by tablename, policyname;
-- Erwartung: je eine SELECT-Policy (authenticated) pro Tabelle; KEINE write-Policy
-- auf cockpit_state (Schreiben nur über save_cockpit_state).

-- 4) Funktionen vorhanden?
select 'functions' as check, p.proname, pg_get_function_identity_arguments(p.oid) as args, p.prosecdef as security_definer
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('is_workspace_member','can_edit_workspace','save_cockpit_state')
order by p.proname;
-- Erwartung: 3 Funktionen, save_cockpit_state mit security_definer = true.

-- 5) Keine Tabellenrechte für anon?
select 'anon_table_grants' as check, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee = 'anon'
  and table_name in ('workspaces','workspace_members','cockpit_state')
order by table_name, privilege_type;
-- Erwartung: 0 Zeilen.

-- 6) Keine Funktions-Ausführungsrechte für anon?
select 'anon_function_grants' as check, p.proname
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('is_workspace_member','can_edit_workspace','save_cockpit_state')
  and has_function_privilege('anon', p.oid, 'EXECUTE');
-- Erwartung: 0 Zeilen.

-- 7) Benötigte Rechte für authenticated vorhanden?
select 'authenticated_table_grants' as check, table_name, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee = 'authenticated'
  and table_name in ('workspaces','workspace_members','cockpit_state')
order by table_name, privilege_type;
-- Erwartung: SELECT auf allen drei Tabellen.

select 'authenticated_function_exec' as check, p.proname,
       has_function_privilege('authenticated', p.oid, 'EXECUTE') as can_execute
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('is_workspace_member','can_edit_workspace','save_cockpit_state')
order by p.proname;
-- Erwartung: can_execute = true für alle drei.

-- 8) Existiert mindestens ein Workspace und (optional) ein Cockpit-State?
select 'workspace_count' as check, count(*) as workspaces from public.workspaces;
select 'member_count'    as check, count(*) as members    from public.workspace_members;
select 'state_rows'      as check, count(*) as states,
       coalesce(max(revision),0) as max_revision
from public.cockpit_state;
-- Erwartung Phase 1: >= 1 Workspace, >= 1 Mitglied (owner); state_rows kann 0 sein,
-- bis der erste lokale Stand übertragen wurde.
