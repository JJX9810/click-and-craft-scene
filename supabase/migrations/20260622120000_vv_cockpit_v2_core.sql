-- ============================================================================
-- V&V Cockpit V2 — Kern-Schema (V1)
-- Baut auf bestehender Auth-/Rollen-Infrastruktur auf:
--   - ENUM public.app_role ('admin','user')      (bereits vorhanden)
--   - public.user_roles + public.has_role(...)    (bereits vorhanden)
--   - Trigger "erster Nutzer wird admin"          (bereits vorhanden)
--
-- Grundregeln (verbindlich):
--   * Postgres ist einzige Quelle. Geld = numeric(12,2).
--   * Audit-Spalten created_at/updated_at/created_by/updated_by ueberall.
--   * Soft Delete via deleted_at.
--   * Finanzaenderungen werden in audit_log protokolliert (append-only).
--   * RLS auf allen Tabellen, Default-Deny, anon kein Zugriff.
--   * Offene Posten = berechnete VIEW (nie handgepflegt).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Gemeinsame Trigger-Funktionen
-- ---------------------------------------------------------------------------

-- setzt updated_at bei jedem UPDATE
create or replace function public.cockpit_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- setzt created_by/updated_by aus auth.uid() (server-verifiziert)
create or replace function public.cockpit_set_actor()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if new.created_by is null then new.created_by := auth.uid(); end if;
    new.updated_by := auth.uid();
  elsif tg_op = 'UPDATE' then
    new.updated_by := auth.uid();
  end if;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Audit-Log (append-only)
-- ---------------------------------------------------------------------------
create table if not exists public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  table_name  text not null,
  record_id   uuid,
  action      text not null,            -- insert | update | delete | status_change
  old_values  jsonb,
  new_values  jsonb,
  changed_by  uuid,
  changed_at  timestamptz not null default now()
);
create index if not exists audit_log_table_idx on public.audit_log(table_name, record_id);
create index if not exists audit_log_changed_at_idx on public.audit_log(changed_at desc);

alter table public.audit_log enable row level security;
grant select on public.audit_log to authenticated;
grant all on public.audit_log to service_role;

drop policy if exists "audit admins read" on public.audit_log;
create policy "audit admins read" on public.audit_log
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- generischer Audit-Trigger fuer Finanztabellen
create or replace function public.cockpit_audit()
returns trigger language plpgsql security definer set search_path = public as $$
declare rid uuid;
begin
  if tg_op = 'DELETE' then rid := old.id; else rid := new.id; end if;
  insert into public.audit_log(table_name, record_id, action, old_values, new_values, changed_by)
  values (
    tg_table_name, rid, lower(tg_op),
    case when tg_op in ('UPDATE','DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('UPDATE','INSERT') then to_jsonb(new) else null end,
    auth.uid()
  );
  if tg_op = 'DELETE' then return old; else return new; end if;
end;
$$;

-- ---------------------------------------------------------------------------
-- profiles (1:1 zu auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  phone        text,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
alter table public.profiles enable row level security;
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles
  for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));

-- Profil automatisch anlegen, wenn ein Auth-Nutzer entsteht
create or replace function public.handle_new_user_profile()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles(id, display_name)
  values (new.id, coalesce(split_part(new.email,'@',1),''))
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

-- ---------------------------------------------------------------------------
-- settings (Singleton) + Nummernkreise
-- ---------------------------------------------------------------------------
create table if not exists public.settings (
  id                   uuid primary key default gen_random_uuid(),
  singleton            boolean not null default true unique,   -- erzwingt eine Zeile
  company_name         text not null default '',
  owner_name           text,
  address              text,
  phone                text,
  email                text,
  web                  text,
  tax_number           text,
  iban                 text,
  bic                  text,
  is_kleinunternehmer  boolean not null default true,
  legal_note           text not null default 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.',
  tax_reserve_pct      numeric(5,2) not null default 35.00,
  default_deposit_pct  numeric(5,2) not null default 40.00,
  default_valid_days   integer not null default 21,
  default_due_days     integer not null default 14,
  offer_no_prefix      text not null default 'AN-',
  offer_no_next        integer not null default 1,
  invoice_no_prefix    text not null default 'RE-',
  invoice_no_next      integer not null default 1,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  created_by           uuid,
  updated_by           uuid
);
alter table public.settings enable row level security;
grant select on public.settings to authenticated;
grant all on public.settings to service_role;

drop policy if exists "settings read" on public.settings;
create policy "settings read" on public.settings
  for select to authenticated using (auth.uid() is not null);
drop policy if exists "settings admin write" on public.settings;
create policy "settings admin write" on public.settings
  for all to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

create trigger settings_updated before update on public.settings
  for each row execute function public.cockpit_set_updated_at();

-- Seed (echte Firmendaten aus Alt-Cockpit; tax/iban absichtlich leer -> nachtragen)
insert into public.settings (singleton, company_name, owner_name, address, phone, email, web,
                             is_kleinunternehmer, tax_reserve_pct, default_deposit_pct)
values (true, 'Verlegt & Verschraubt Handwerkerservice', 'Justus Brosch',
        'Weichselstraße 12, 26388 Wilhelmshaven', '0163 4799286',
        'justus.brosch@verlegt-verschraubt.de', 'verlegt-verschraubt.de',
        true, 35.00, 40.00)
on conflict (singleton) do nothing;

-- konkurrenzsichere Nummernvergabe (eine settings-Zeile, atomar)
create or replace function public.cockpit_next_number(kind text)
returns text language plpgsql security definer set search_path = public as $$
declare n integer; pfx text; yr text := to_char(now(),'YYYY');
begin
  if kind = 'offer' then
    update public.settings set offer_no_next = offer_no_next + 1
      where singleton = true returning offer_no_next - 1, offer_no_prefix into n, pfx;
  elsif kind = 'invoice' then
    update public.settings set invoice_no_next = invoice_no_next + 1
      where singleton = true returning invoice_no_next - 1, invoice_no_prefix into n, pfx;
  else
    raise exception 'unknown number kind: %', kind;
  end if;
  return pfx || yr || '-' || lpad(n::text, 4, '0');
end;
$$;
revoke execute on function public.cockpit_next_number(text) from public, anon;
grant execute on function public.cockpit_next_number(text) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- price_rules (Preisliste) + Seed aus echtem Cockpit / Kostenrechner
-- ---------------------------------------------------------------------------
create table if not exists public.price_rules (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  label       text not null,
  category    text not null default 'sonstige',   -- boden|sockel|altboden|zusatz|kueche|anfahrt
  unit        text not null default 'm²',          -- m²|lfm|Stk|psch|%|km
  unit_price  numeric(12,2),                        -- null = auf Anfrage
  min_amount  numeric(12,2),
  is_active   boolean not null default true,
  sort_index  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  created_by  uuid,
  updated_by  uuid
);
alter table public.price_rules enable row level security;
grant select on public.price_rules to authenticated;
grant all on public.price_rules to service_role;

drop policy if exists "price read" on public.price_rules;
create policy "price read" on public.price_rules
  for select to authenticated using (auth.uid() is not null);
drop policy if exists "price admin write" on public.price_rules;
create policy "price admin write" on public.price_rules
  for all to authenticated
  using (public.has_role(auth.uid(),'admin'))
  with check (public.has_role(auth.uid(),'admin'));

create trigger price_rules_updated before update on public.price_rules
  for each row execute function public.cockpit_set_updated_at();

insert into public.price_rules (key, label, category, unit, unit_price, min_amount, sort_index) values
  ('laminat_schwimmend','Laminat schwimmend','boden','m²',16,null,10),
  ('pvc_schwimmend','PVC schwimmend','boden','m²',12,null,20),
  ('pvc_verklebt','PVC verklebt','boden','m²',15,null,30),
  ('vinyl_schwimmend','Vinyl schwimmend','boden','m²',18,null,40),
  ('vinyl_verklebt','Vinyl verklebt','boden','m²',22,null,50),
  ('teppich_lose','Teppich lose verlegt','boden','m²',10,null,60),
  ('teppich_vollflaechig','Teppich vollflächig verklebt','boden','m²',12,null,70),
  ('sockel','Sockelleisten montieren','sockel','lfm',5,null,80),
  ('sockel_gehrung','Sockelleisten auf Gehrung','sockel','lfm',7,null,90),
  ('altboden_schwimmend','Altbelag entfernen (schwimmend)','altboden','m²',4,null,100),
  ('altboden_teppich_lose','Altbelag Teppich lose entfernen','altboden','m²',7,120,110),
  ('altboden_teppich_verklebt','Altbelag Teppich verklebt entfernen','altboden','m²',12,180,120),
  ('daemmung','Dämmung / Unterlage','zusatz','m²',1.5,null,130),
  ('spachteln','Untergrund spachteln/ausgleichen','zusatz','m²',19,null,140),
  ('kueche_montage','Küchenmontage','kueche','lfm',189,null,150),
  ('kueche_demontage','Küchendemontage','kueche','lfm',100,null,160),
  ('kueche_arbeitsplatte','Arbeitsplatte','kueche','lfm',119,null,170),
  ('anfahrt_pro_km','Anfahrt je km (über Freigrenze)','anfahrt','km',0.7,null,180),
  ('materialservice','Materialservice','zusatz','%',15,150,190)
on conflict (key) do nothing;
