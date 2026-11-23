create table public.trails (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (name ~ '[^[:space:]]'),
  description text not null check (description ~ '[^[:space:]]'),
  location text not null check (location ~ '[^[:space:]]'),
  region text not null check (region ~ '[^[:space:]]'),
  difficulty text not null check (difficulty in ('easy', 'moderate', 'hard')),
  distance_km numeric(7, 2) not null
    check (distance_km > 0 and distance_km <> 'NaN'::numeric),
  elevation_gain_m integer not null check (elevation_gain_m >= 0),
  duration_minutes integer not null check (duration_minutes > 0),
  route_url text check (route_url ~ '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'),
  image_url text check (image_url ~ '^https?://[^[:space:]/?#]+([/?#][^[:space:]]*)?$'),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.trails enable row level security;

revoke all on table public.trails from public, anon, authenticated;
revoke all on sequence public.trails_id_seq from public, anon, authenticated;
grant select on table public.trails to anon;

create policy "Anonymous visitors can read published trails"
on public.trails
for select
to anon
using (published_at <= now());
