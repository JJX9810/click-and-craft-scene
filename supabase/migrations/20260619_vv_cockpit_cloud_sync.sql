-- ============================================================================
-- V&V Cockpit – Cloud-Sync (Phase 1)  –  reproduzierbare, idempotente Migration
-- Datei: supabase/migrations/20260619_vv_cockpit_cloud_sync.sql
-- ----------------------------------------------------------------------------
-- WICHTIG:
--   * Diese Migration wird NICHT automatisch ausgeführt. Sie ist zum manuellen
--     Einspielen im Supabase-SQL-Editor bzw. via `supabase db push` gedacht.
--   * Sie ist idempotent: mehrfaches Ausführen verändert das Ergebnis nicht.
--   * Sie enthält KEINE echten Keys, Passwörter, User-IDs oder Workspace-IDs.
--   * Row Level Security ist auf allen drei Tabellen aktiv. `anon` erhält KEINE
--     Tabellenrechte; nur `authenticated` darf – streng über RLS gefiltert – lesen
--     und über die SECURITY DEFINER Funktion save_cockpit_state schreiben.
-- ============================================================================

begin;

-- ---------------------------------------------------------------------------
-- 1) Tabellen
-- ---------------------------------------------------------------------------
create table if not exists public.workspaces (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default 'Workspace',
  created_at  timestamptz not null default now()
);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  role         text not null default 'viewer' check (role in ('owner','partner','viewer')),
  created_at   timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table if not exists public.cockpit_state (
  workspace_id uuid primary key references public.workspaces(id) on delete cascade,
  state        jsonb not null default '{}'::jsonb,
  revision     bigint not null default 0,
  updated_at   timestamptz not null default now(),
  updated_by   uuid
);

create index if not exists workspace_members_user_idx on public.workspace_members(user_id);

-- ---------------------------------------------------------------------------
-- 2) Hilfsfunktionen (SECURITY DEFINER, search_path fixiert)
-- ---------------------------------------------------------------------------
create or replace function public.is_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members m
    where m.workspace_id = p_workspace_id
      and m.user_id = auth.uid()
  );
$$;

create or replace function public.can_edit_workspace(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members m
    where m.workspace_id = p_workspace_id
      and m.user_id = auth.uid()
      and m.role in ('owner','partner')
  );
$$;

-- ---------------------------------------------------------------------------
-- 3) Atomarer, konfliktgeschützter Save (optimistic concurrency per revision)
-- ---------------------------------------------------------------------------
create or replace function public.save_cockpit_state(
  p_workspace_id uuid,
  p_state jsonb,
  p_expected_revision bigint
)
returns table (workspace_id uuid, revision bigint, updated_at timestamptz, updated_by uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_current bigint;
begin
  if v_uid is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if not public.is_workspace_member(p_workspace_id) then
    raise exception 'workspace_access_denied' using errcode = '42501';
  end if;

  if not public.can_edit_workspace(p_workspace_id) then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  -- aktuelle Revision sperren (oder 0, falls noch nichts existiert)
  select c.revision into v_current
    from public.cockpit_state c
   where c.workspace_id = p_workspace_id
   for update;

  if v_current is null then
    -- Erststand: nur anlegen, wenn der Aufrufer Revision 0 erwartet
    if coalesce(p_expected_revision, 0) <> 0 then
      raise exception 'revision_conflict' using errcode = 'P0001';
    end if;
    insert into public.cockpit_state(workspace_id, state, revision, updated_at, updated_by)
    values (p_workspace_id, p_state, 1, now(), v_uid);
    return query select p_workspace_id, 1::bigint, now(), v_uid;
    return;
  end if;

  if v_current <> p_expected_revision then
    raise exception 'revision_conflict' using errcode = 'P0001';
  end if;

  update public.cockpit_state c
     set state = p_state,
         revision = c.revision + 1,
         updated_at = now(),
         updated_by = v_uid
   where c.workspace_id = p_workspace_id;

  return query
    select c.workspace_id, c.revision, c.updated_at, c.updated_by
      from public.cockpit_state c
     where c.workspace_id = p_workspace_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- 4) Row Level Security
-- ---------------------------------------------------------------------------
alter table public.workspaces        enable row level security;
alter table public.workspace_members enable row level security;
alter table public.cockpit_state     enable row level security;

-- Saubere, idempotente (Re-)Erstellung der Policies
drop policy if exists workspaces_select_member on public.workspaces;
create policy workspaces_select_member on public.workspaces
  for select to authenticated
  using (public.is_workspace_member(id));

drop policy if exists members_select_self_ws on public.workspace_members;
create policy members_select_self_ws on public.workspace_members
  for select to authenticated
  using (public.is_workspace_member(workspace_id));

drop policy if exists cockpit_state_select_member on public.cockpit_state;
create policy cockpit_state_select_member on public.cockpit_state
  for select to authenticated
  using (public.is_workspace_member(workspace_id));

-- Bewusst KEINE direkten INSERT/UPDATE/DELETE-Policies auf cockpit_state:
-- Schreibzugriff ausschließlich über save_cockpit_state() (SECURITY DEFINER).

-- ---------------------------------------------------------------------------
-- 5) Rechtevergabe – anon bleibt komplett ohne Tabellenrechte
-- ---------------------------------------------------------------------------
revoke all on public.workspaces        from anon;
revoke all on public.workspace_members from anon;
revoke all on public.cockpit_state     from anon;
revoke all on function public.is_workspace_member(uuid)  from anon;
revoke all on function public.can_edit_workspace(uuid)   from anon;
revoke all on function public.save_cockpit_state(uuid, jsonb, bigint) from anon;

grant select on public.workspaces        to authenticated;
grant select on public.workspace_members to authenticated;
grant select on public.cockpit_state     to authenticated;
grant execute on function public.is_workspace_member(uuid)  to authenticated;
grant execute on function public.can_edit_workspace(uuid)   to authenticated;
grant execute on function public.save_cockpit_state(uuid, jsonb, bigint) to authenticated;

commit;

-- ============================================================================
-- MANUELLE FOLGESCHRITTE (nicht Teil dieser Migration – im Dashboard ausführen):
--   1. Supabase-Benutzer (Justus) anlegen / E-Mail bestätigen.
--   2. Einen Workspace anlegen:
--        insert into public.workspaces(name) values ('V&V Cockpit') returning id;
--   3. Mitgliedschaft als owner eintragen (UUIDs einsetzen):
--        insert into public.workspace_members(workspace_id, user_id, role)
--        values ('<WORKSPACE_UUID>', '<USER_UUID>', 'owner');
--   4. Workspace-ID, Project URL und Publishable Key im Cockpit hinterlegen.
--   (Justin später analog mit role = 'partner'.)
-- ============================================================================
