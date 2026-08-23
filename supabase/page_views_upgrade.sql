-- =====================================================================
-- Five Fingers — page_views upgrade: unique visitors + internal filtering
-- Run once in the Supabase SQL Editor on an EXISTING install
-- (it's the delta already folded into dashboard.sql for fresh installs).
--
-- Adds anonymous, cookieless IDs so the dashboard can count UNIQUE visitors
-- and sessions instead of raw hits, plus an internal flag to exclude
-- staff/collaborator traffic. Safe to re-run.
-- =====================================================================

alter table public.page_views
  add column if not exists visitor_id  text,   -- persistent per browser (localStorage UUID)
  add column if not exists session_id  text,   -- resets each tab session (sessionStorage UUID)
  add column if not exists is_internal boolean not null default false;

create index if not exists page_views_visitor_idx on public.page_views (visitor_id);

-- Let the public site write the new columns too (grants are additive).
grant insert (path, referrer, visitor_id, session_id, is_internal)
  on public.page_views to anon;

-- NOTE on historical rows: everything logged BEFORE this upgrade has a null
-- visitor_id and is_internal=false. The dashboard treats null-visitor rows as
-- "legacy" for unique counts (they can't be de-duplicated). Unique-visitor
-- numbers become accurate for traffic logged from now on.
