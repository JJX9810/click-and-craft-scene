-- ============================================================================
-- V&V Cockpit V2 — Geschaeftstabellen (V1)
-- Voraussetzung: 20260622120000_vv_cockpit_v2_core.sql
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------
create table if not exists public.customers (
  id           uuid primary key default gen_random_uuid(),
  customer_no  text,
  type         text not null default 'privat',     -- privat | gewerblich
  stage        text not null default 'kunde',       -- lead | kunde
  display_name text not null,
  company      text,
  first_name   text,
  last_name    text,
  email        text,
  phone        text,
  street       text,
  zip          text,
  city         text,
  notes        text,
  status       text not null default 'aktiv',
  tags         text[] not null default '{}',
  legacy_id    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid,
  updated_by   uuid,
  deleted_at   timestamptz
);

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  project_no    text,
  customer_id   uuid not null references public.customers(id),
  title         text not null,
  service_type  text,
  status        text not null default 'anfrage',
  description   text,
  address_override text,
  start_date    date,
  due_date      date,
  done_date     date,
  internal_notes text,
  next_step     text,
  progress_pct  integer not null default 0,
  calc_cost     numeric(12,2),
  calc_revenue  numeric(12,2),
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);
create index if not exists projects_customer_idx on public.projects(customer_id);

create table if not exists public.measurements (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid references public.projects(id),
  customer_id   uuid references public.customers(id),
  measured_at   date not null default current_date,
  note          text,
  total_qm      numeric(12,2) not null default 0,
  total_skirting numeric(12,2) not null default 0,
  pdf_file_id   uuid,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.measurement_rooms (
  id              uuid primary key default gen_random_uuid(),
  measurement_id  uuid not null references public.measurements(id) on delete cascade,
  room_name       text not null,
  area_qm         numeric(12,2) not null default 0,
  skirting_lfm    numeric(12,2) not null default 0,
  old_floor_type  text,
  old_floor_remove boolean not null default false,
  extras          jsonb not null default '{}',
  sort_index      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  created_by      uuid, updated_by uuid
);

create table if not exists public.offers (
  id            uuid primary key default gen_random_uuid(),
  offer_no      text unique,
  customer_id   uuid not null references public.customers(id),
  project_id    uuid references public.projects(id),
  status        text not null default 'entwurf',     -- entwurf|gesendet|angenommen|abgelehnt|abgelaufen
  issue_date    date not null default current_date,
  valid_until   date,
  subtotal      numeric(12,2) not null default 0,
  tax_rate      numeric(5,2) not null default 0,
  tax_amount    numeric(12,2) not null default 0,
  total         numeric(12,2) not null default 0,
  note          text,
  pdf_file_id   uuid,
  accepted_at   timestamptz,
  converted_invoice_id uuid,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);
create index if not exists offers_customer_idx on public.offers(customer_id);

create table if not exists public.offer_items (
  id            uuid primary key default gen_random_uuid(),
  offer_id      uuid not null references public.offers(id) on delete cascade,
  position      integer not null default 1,
  description   text not null default '',
  qty           numeric(12,2) not null default 1,
  unit          text not null default 'Stk',
  unit_price    numeric(12,2) not null default 0,
  line_total    numeric(12,2) not null default 0,
  price_rule_id uuid,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid
);

create table if not exists public.invoices (
  id            uuid primary key default gen_random_uuid(),
  invoice_no    text unique,
  customer_id   uuid not null references public.customers(id),
  project_id    uuid references public.projects(id),
  offer_id      uuid references public.offers(id),
  status        text not null default 'entwurf',     -- entwurf|gesendet|teilbezahlt|bezahlt|storniert|mahnung
  issue_date    date not null default current_date,
  due_date      date,
  subtotal      numeric(12,2) not null default 0,
  tax_rate      numeric(5,2) not null default 0,
  tax_amount    numeric(12,2) not null default 0,
  total         numeric(12,2) not null default 0,
  paid_total    numeric(12,2) not null default 0,
  is_kleinunternehmer boolean not null default true,
  cancels_invoice_id uuid,
  pdf_file_id   uuid,
  dunning_level integer not null default 0,
  note          text,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);
create index if not exists invoices_customer_idx on public.invoices(customer_id);

create table if not exists public.invoice_items (
  id            uuid primary key default gen_random_uuid(),
  invoice_id    uuid not null references public.invoices(id) on delete cascade,
  position      integer not null default 1,
  description   text not null default '',
  qty           numeric(12,2) not null default 1,
  unit          text not null default 'Stk',
  unit_price    numeric(12,2) not null default 0,
  line_total    numeric(12,2) not null default 0,
  price_rule_id uuid,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid
);

create table if not exists public.payments (
  id            uuid primary key default gen_random_uuid(),
  invoice_id    uuid references public.invoices(id),
  amount        numeric(12,2) not null,
  paid_at       date not null default current_date,
  method        text,
  reference     text,
  is_deposit    boolean not null default false,
  note          text,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);
create index if not exists payments_invoice_idx on public.payments(invoice_id);

create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  booking_date  date not null default current_date,
  type          text not null,                       -- einnahme|ausgabe|privatentnahme|privateinlage|steuerruecklage
  category      text,
  amount        numeric(12,2) not null,
  description   text,
  invoice_id    uuid references public.invoices(id),
  expense_id    uuid,
  tax_reserve_amount numeric(12,2),
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.expenses (
  id            uuid primary key default gen_random_uuid(),
  expense_date  date not null default current_date,
  vendor        text,
  category      text,
  net_amount    numeric(12,2),
  gross_amount  numeric(12,2) not null,
  description   text,
  receipt_file_id uuid,
  is_deductible boolean not null default true,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.files (
  id            uuid primary key default gen_random_uuid(),
  bucket        text not null default 'cockpit',
  storage_path  text not null unique,
  original_name text,
  mime_type     text,
  size_bytes    bigint,
  sha256        text,
  owner_type    text not null,                       -- customer|project|offer|invoice|measurement|expense
  owner_id      uuid not null,
  kind          text not null default 'sonstige',    -- foto|pdf|beleg|aufmass|sonstige
  width         integer, height integer,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);
create index if not exists files_owner_idx on public.files(owner_type, owner_id);

create table if not exists public.tasks (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  due_date      date,
  status        text not null default 'offen',       -- offen|erledigt|verschoben
  priority      text not null default 'normal',
  assignee_id   uuid,
  customer_id   uuid references public.customers(id),
  project_id    uuid references public.projects(id),
  source        text not null default 'manuell',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.materials (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  unit          text not null default 'Stk',
  unit_price    numeric(12,2),
  supplier      text,
  project_id    uuid references public.projects(id),
  qty           numeric(12,2),
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.mileage_log (
  id            uuid primary key default gen_random_uuid(),
  drive_date    date not null default current_date,
  from_loc      text, to_loc text,
  km            numeric(12,2) not null default 0,
  purpose       text,
  project_id    uuid references public.projects(id),
  rate          numeric(6,2) not null default 0.30,
  legacy_id     text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

create table if not exists public.nexus_memory (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null default 'note',
  content       text not null,
  related_type  text, related_id uuid,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    uuid, updated_by uuid, deleted_at timestamptz
);

-- ---------------------------------------------------------------------------
-- updated_at + actor Trigger fuer alle Tabellen
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['customers','projects','measurements','measurement_rooms','offers',
    'offer_items','invoices','invoice_items','payments','bookings','expenses','files','tasks',
    'materials','mileage_log','nexus_memory'] loop
    execute format('drop trigger if exists %1$s_updated on public.%1$I', t);
    execute format('create trigger %1$s_updated before update on public.%1$I for each row execute function public.cockpit_set_updated_at()', t);
    execute format('drop trigger if exists %1$s_actor on public.%1$I', t);
    execute format('create trigger %1$s_actor before insert or update on public.%1$I for each row execute function public.cockpit_set_actor()', t);
  end loop;
end $$;

-- Audit-Trigger fuer Finanztabellen
do $$
declare t text;
begin
  foreach t in array array['invoices','invoice_items','payments','bookings','expenses'] loop
    execute format('drop trigger if exists %1$s_audit on public.%1$I', t);
    execute format('create trigger %1$s_audit after insert or update or delete on public.%1$I for each row execute function public.cockpit_audit()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Rechnungs-Immutabilitaet: gesendete Rechnung nicht inhaltlich aendern
-- ---------------------------------------------------------------------------
create or replace function public.cockpit_protect_invoice()
returns trigger language plpgsql as $$
begin
  if old.status <> 'entwurf' then
    if new.subtotal <> old.subtotal or new.total <> old.total or new.tax_amount <> old.tax_amount
       or new.customer_id <> old.customer_id or new.issue_date <> old.issue_date then
      raise exception 'Rechnung % ist gesendet und damit unveränderlich. Bitte stornieren und neu erstellen.', old.invoice_no;
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists invoices_protect on public.invoices;
create trigger invoices_protect before update on public.invoices
  for each row execute function public.cockpit_protect_invoice();

-- ---------------------------------------------------------------------------
-- Automatische Zahlungsverrechnung: paid_total + Status aus payments ableiten
-- ---------------------------------------------------------------------------
create or replace function public.cockpit_recalc_invoice()
returns trigger language plpgsql security definer set search_path = public as $$
declare inv uuid; paid numeric(12,2); tot numeric(12,2); st text;
begin
  inv := coalesce(new.invoice_id, old.invoice_id);
  if inv is null then return coalesce(new, old); end if;
  select coalesce(sum(amount),0) into paid from public.payments where invoice_id = inv and deleted_at is null;
  select total, status into tot, st from public.invoices where id = inv;
  if st in ('entwurf','storniert') then
    update public.invoices set paid_total = paid where id = inv;
  elsif paid <= 0 then
    update public.invoices set paid_total = 0, status = 'gesendet' where id = inv;
  elsif paid >= tot then
    update public.invoices set paid_total = paid, status = 'bezahlt' where id = inv;
  else
    update public.invoices set paid_total = paid, status = 'teilbezahlt' where id = inv;
  end if;
  return coalesce(new, old);
end;
$$;
drop trigger if exists payments_recalc on public.payments;
create trigger payments_recalc after insert or update or delete on public.payments
  for each row execute function public.cockpit_recalc_invoice();

-- ---------------------------------------------------------------------------
-- RLS + Policies
-- ---------------------------------------------------------------------------
-- Standard-Tabellen: authenticated darf lesen/schreiben, hartes DELETE nur admin
do $$
declare t text;
begin
  foreach t in array array['customers','projects','measurements','measurement_rooms','offers',
    'offer_items','invoice_items','files','tasks','materials','mileage_log','nexus_memory'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists auth_select on public.%I', t);
    execute format('create policy auth_select on public.%I for select to authenticated using (auth.uid() is not null)', t);
    execute format('drop policy if exists auth_insert on public.%I', t);
    execute format('create policy auth_insert on public.%I for insert to authenticated with check (auth.uid() is not null)', t);
    execute format('drop policy if exists auth_update on public.%I', t);
    execute format('create policy auth_update on public.%I for update to authenticated using (auth.uid() is not null)', t);
    execute format('drop policy if exists admin_delete on public.%I', t);
    execute format('create policy admin_delete on public.%I for delete to authenticated using (public.has_role(auth.uid(),''admin''))', t);
  end loop;
end $$;

-- Finanztabellen invoices/payments: lesen/schreiben authenticated, KEIN hartes Delete
do $$
declare t text;
begin
  foreach t in array array['invoices','payments'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select, insert, update on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists auth_select on public.%I', t);
    execute format('create policy auth_select on public.%I for select to authenticated using (auth.uid() is not null)', t);
    execute format('drop policy if exists auth_insert on public.%I', t);
    execute format('create policy auth_insert on public.%I for insert to authenticated with check (auth.uid() is not null)', t);
    execute format('drop policy if exists auth_update on public.%I', t);
    execute format('create policy auth_update on public.%I for update to authenticated using (auth.uid() is not null)', t);
  end loop;
end $$;

-- Buchhaltung bookings/expenses: nur admin
do $$
declare t text;
begin
  foreach t in array array['bookings','expenses'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('drop policy if exists admin_all on public.%I', t);
    execute format('create policy admin_all on public.%I for all to authenticated using (public.has_role(auth.uid(),''admin'')) with check (public.has_role(auth.uid(),''admin''))', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Offene Posten = berechnete VIEW (Single Source, nie handgepflegt)
-- ---------------------------------------------------------------------------
create or replace view public.open_items
with (security_invoker = true) as
select
  i.id                       as invoice_id,
  i.invoice_no,
  i.customer_id,
  i.total,
  coalesce(i.paid_total,0)   as paid,
  i.total - coalesce(i.paid_total,0) as open_amount,
  i.issue_date,
  i.due_date,
  greatest(0, current_date - i.due_date) as days_overdue,
  i.status,
  i.dunning_level
from public.invoices i
where i.deleted_at is null
  and i.status not in ('entwurf','storniert','bezahlt');
grant select on public.open_items to authenticated;

-- ---------------------------------------------------------------------------
-- Realtime: Aenderungen automatisch an alle Geraete (PC/Handy)
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['customers','projects','measurements','measurement_rooms','offers',
    'offer_items','invoices','invoice_items','payments','tasks','files','settings','price_rules',
    'bookings','expenses','materials','mileage_log'] loop
    execute format('alter table public.%I replica identity full', t);
    begin
      execute format('alter publication supabase_realtime add table public.%I', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;
