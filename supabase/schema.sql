-- Aerizen realtime/offline database schema for Supabase
-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- This simple policy allows any logged-in user in your Supabase project to read/write the same workspace.
-- For production, restrict users by company/workspace membership.

create extension if not exists pgcrypto;

create table if not exists public.assets (
  id text primary key,
  workspace_id text not null default 'aerizen-main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create table if not exists public.work_orders (
  id text primary key,
  workspace_id text not null default 'aerizen-main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create index if not exists assets_workspace_idx on public.assets (workspace_id, updated_at desc);
create index if not exists work_orders_workspace_idx on public.work_orders (workspace_id, updated_at desc);

alter table public.assets enable row level security;
alter table public.work_orders enable row level security;

drop policy if exists "authenticated users can read assets" on public.assets;
drop policy if exists "authenticated users can write assets" on public.assets;
drop policy if exists "authenticated users can read work orders" on public.work_orders;
drop policy if exists "authenticated users can write work orders" on public.work_orders;

create policy "authenticated users can read assets"
  on public.assets for select
  to authenticated
  using (true);

create policy "authenticated users can write assets"
  on public.assets for all
  to authenticated
  using (true)
  with check (true);

create policy "authenticated users can read work orders"
  on public.work_orders for select
  to authenticated
  using (true);

create policy "authenticated users can write work orders"
  on public.work_orders for all
  to authenticated
  using (true)
  with check (true);

-- Enable realtime publication for both tables. Safe to run multiple times.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'assets'
  ) then
    execute 'alter publication supabase_realtime add table public.assets';
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'work_orders'
  ) then
    execute 'alter publication supabase_realtime add table public.work_orders';
  end if;
end $$;
