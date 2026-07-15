-- =====================================================================
-- Five Fingers — contact form submissions
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
--
-- Write path: browser → Make.com webhook → Supabase (service_role key).
-- The table is never exposed to the browser; RLS is locked deny-all and
-- only the service_role key (which bypasses RLS) can insert.
-- =====================================================================

create table if not exists public.contact_submissions (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- core (always present)
  name          text        not null,
  phone         text        not null,
  email         text        not null,
  product_type  text        not null,          -- chip or raw deep-link value (free text, e.g. "Boost")

  -- job-role extras (מאמן/ת, הדרכה בהזנק, צוות מטה, הדרכה במכינה)
  residence     text,
  birth_date    text,                           -- DD/MM/YYYY as sent by the form
  experience    text,
  certificates  text,

  -- youth-group extras (קבוצות הנוער)
  child_gender  text,                           -- 'זכר' | 'נקבה'
  child_name    text,
  child_city    text,
  child_grade   text,                           -- ה׳ … י״ב
  notes         text,

  -- partnership extras (שיתוף פעולה)
  org_name      text,
  org_role      text,
  target_date   text,                           -- DD/MM/YYYY as sent by the form

  -- shared (alumni יואב + partnership)
  inquiry_details text,

  -- envelope metadata from the payload
  submitted_at  timestamptz,                    -- payload.submittedAt (ISO string)
  source        text,                           -- 'fivefingers-website'
  page_url      text,

  -- safety net: the entire original JSON. Optional — the typed columns above
  -- are the source of truth; defaults to '{}' if Make doesn't map it.
  raw_payload   jsonb       default '{}'::jsonb
);

comment on table public.contact_submissions is
  'Contact modal submissions, inserted by the Make.com scenario via service_role.';

-- Helpful indexes for the dashboard
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
create index if not exists contact_submissions_product_type_idx
  on public.contact_submissions (product_type);
create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

-- =====================================================================
-- Lock it down. RLS on + zero policies = deny-all to anon/authenticated.
-- The service_role key (used by Make.com) bypasses RLS entirely, so it
-- can still insert. The public anon key can do nothing here.
-- =====================================================================
alter table public.contact_submissions enable row level security;

-- Defense in depth: remove baseline table grants from the public roles.
revoke all on public.contact_submissions from anon, authenticated;
