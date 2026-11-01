-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Design: browsers can WRITE a rounded position, but can never READ raw positions.
-- The only read path is train_status(), which returns counts and averages.

create table if not exists public.train_pings (
  id          bigint generated always as identity primary key,
  train_key   text not null check (char_length(train_key) between 1 and 60),
  -- Bangladesh bounding box, to reject obviously bad coordinates
  lat         double precision not null check (lat between 20.5 and 26.7),
  lng         double precision not null check (lng between 88.0 and 92.7),
  speed_kmh   real check (speed_kmh is null or speed_kmh between 0 and 200),
  created_at  timestamptz not null default now()
);

alter table public.train_pings enable row level security;

-- Anyone (anonymous visitors included) may insert a report.
drop policy if exists "anyone can report a position" on public.train_pings;
create policy "anyone can report a position"
  on public.train_pings for insert
  to anon, authenticated
  with check (true);

-- No select policy: the public cannot read individual rows.

-- Aggregate-only status for one train over the last 10 minutes.
create or replace function public.train_status(p_key text)
returns table (report_count int, last_seen timestamptz, avg_speed_kmh real)
language sql
security definer
set search_path = public
stable
as $$
  select count(*)::int,
         max(created_at),
         avg(speed_kmh)::real
  from public.train_pings
  where train_key = p_key
    and created_at > now() - interval '10 minutes';
$$;

grant execute on function public.train_status(text) to anon, authenticated;

-- Explicit privileges, so the setup works whether or not Supabase auto-exposes new tables.
-- Browsers may insert, but never read the table directly (RLS has no select policy either).
grant insert on public.train_pings to anon, authenticated;
grant usage on sequence public.train_pings_id_seq to anon, authenticated;
revoke select on public.train_pings from anon, authenticated;

-- Optional cleanup: delete reports older than 1 hour.
-- Run this manually from time to time, or enable pg_cron and schedule it:
-- delete from public.train_pings where created_at < now() - interval '1 hour';
