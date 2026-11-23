begin;

create extension if not exists pgtap with schema extensions;
set local search_path to public, extensions;

select plan(12);

insert into public.trails (
  slug, name, description, location, region, difficulty,
  distance_km, elevation_gain_m, duration_minutes, published_at
)
values
  ('pgtap-published-trail', 'Published trail', 'Fixture description', 'Town', 'Region', 'easy', 4.5, 120, 90, now()),
  ('pgtap-draft-trail', 'Draft trail', 'Fixture description', 'Town', 'Region', 'moderate', 6, 240, 120, null),
  ('pgtap-scheduled-trail', 'Scheduled trail', 'Fixture description', 'Town', 'Region', 'hard', 9, 500, 180, now() + interval '1 day');

set local role anon;

select results_eq(
  $$select slug from public.trails
    where slug in ('pgtap-published-trail', 'pgtap-draft-trail', 'pgtap-scheduled-trail')
    order by slug$$,
  array['pgtap-published-trail'],
  'anon can list the published trail but not draft or scheduled trails'
);

select is(
  (select count(*) from public.trails where slug = 'pgtap-draft-trail'),
  0::bigint,
  'anon cannot fetch a draft directly by slug'
);

select throws_ok(
  $$insert into public.trails (
      slug, name, description, location, region, difficulty,
      distance_km, elevation_gain_m, duration_minutes
    ) values ('pgtap-anon-insert', 'Other trail', 'Fixture description', 'Town', 'Region', 'easy', 2, 0, 30)$$,
  '42501', null, 'anon cannot insert a trail'
);

select throws_ok(
  $$update public.trails set name = 'Changed' where slug = 'pgtap-published-trail'$$,
  '42501', null, 'anon cannot update a published trail'
);

select throws_ok(
  $$delete from public.trails where slug = 'pgtap-published-trail'$$,
  '42501', null, 'anon cannot delete a published trail'
);

reset role;
set local role authenticated;

select throws_ok(
  $$select slug from public.trails where slug = 'pgtap-published-trail'$$,
  '42501', null, 'authenticated has no direct read grant'
);

select throws_ok(
  $$insert into public.trails (
      slug, name, description, location, region, difficulty,
      distance_km, elevation_gain_m, duration_minutes
    ) values ('pgtap-authenticated-insert', 'Other trail', 'Fixture description', 'Town', 'Region', 'easy', 2, 0, 30)$$,
  '42501', null, 'authenticated cannot insert a trail'
);

select throws_ok(
  $$update public.trails set name = 'Changed' where slug = 'pgtap-published-trail'$$,
  '42501', null, 'authenticated cannot update a published trail'
);

select throws_ok(
  $$delete from public.trails where slug = 'pgtap-published-trail'$$,
  '42501', null, 'authenticated cannot delete a published trail'
);

reset role;

select ok(
  not has_sequence_privilege('anon', 'public.trails_id_seq', 'USAGE, SELECT, UPDATE'),
  'anon cannot access the identity sequence'
);

select ok(
  not has_sequence_privilege('authenticated', 'public.trails_id_seq', 'USAGE, SELECT, UPDATE'),
  'authenticated cannot access the identity sequence'
);

select results_eq(
  $$select slug, name from public.trails
    where slug in (
      'pgtap-published-trail', 'pgtap-draft-trail', 'pgtap-scheduled-trail',
      'pgtap-anon-insert', 'pgtap-authenticated-insert'
    )
    order by slug$$,
  $$values
    ('pgtap-draft-trail'::text, 'Draft trail'::text),
    ('pgtap-published-trail', 'Published trail'),
    ('pgtap-scheduled-trail', 'Scheduled trail')$$,
  'denied writes leave all fixture rows unchanged'
);

select * from finish();

rollback;
