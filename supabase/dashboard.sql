-- =====================================================================
-- Five Fingers — staff dashboard SQL
-- Run once in the Supabase SQL Editor, AFTER schema.sql.
--
-- Adds lead-management (status + notes) to contact_submissions, opens
-- read/limited-write to logged-in staff (Supabase Auth), and creates a
-- cookieless page_views table for the traffic counter.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1a. Extend contact_submissions for status + internal notes
-- ---------------------------------------------------------------------
alter table public.contact_submissions
  add column if not exists status      text        not null default 'new'
    check (status in ('new','in_progress','handled')),
  add column if not exists staff_notes text,
  add column if not exists updated_at  timestamptz not null default now();

create index if not exists contact_submissions_status_idx
  on public.contact_submissions (status);

-- ---------------------------------------------------------------------
-- 1b. Let logged-in staff READ every submission, and UPDATE only
--     status / staff_notes / updated_at.
--     (schema.sql revoked grants from `authenticated`, so re-grant precisely.)
--     The column-level UPDATE grant is what actually confines edits —
--     staff can never alter a lead's name/phone/email.
-- ---------------------------------------------------------------------
grant select on public.contact_submissions to authenticated;
grant update (status, staff_notes, updated_at) on public.contact_submissions to authenticated;

drop policy if exists "staff read submissions" on public.contact_submissions;
create policy "staff read submissions"
  on public.contact_submissions for select
  to authenticated
  using (true);

drop policy if exists "staff update status/notes" on public.contact_submissions;
create policy "staff update status/notes"
  on public.contact_submissions for update
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------
-- 1c. Page views — cookieless, no PII, minimal.
--     The public site beacon inserts with the anon key (path + referrer
--     only) and cannot read. Staff read for the dashboard.
-- ---------------------------------------------------------------------
create table if not exists public.page_views (
  id          bigint      generated always as identity primary key,
  created_at  timestamptz not null default now(),
  path        text        not null,         -- e.g. '/#liabah'
  referrer    text,                          -- document.referrer, may be null
  -- Anonymous, cookieless IDs (random UUIDs, no PII) so we can count UNIQUE
  -- visitors instead of raw hits. Nullable: legacy rows + storage-blocked browsers.
  visitor_id  text,                          -- persistent per browser (localStorage)
  session_id  text,                          -- resets each tab session (sessionStorage)
  is_internal boolean     not null default false  -- staff/collaborator traffic, excluded by default
);

-- Existing installs: add the new columns if the table predates this change.
alter table public.page_views
  add column if not exists visitor_id  text,
  add column if not exists session_id  text,
  add column if not exists is_internal boolean not null default false;

create index if not exists page_views_created_at_idx on public.page_views (created_at desc);
create index if not exists page_views_path_idx       on public.page_views (path);
create index if not exists page_views_visitor_idx    on public.page_views (visitor_id);

alter table public.page_views enable row level security;

-- anon (public site) may INSERT only these columns, nothing else, and cannot read.
grant insert (path, referrer, visitor_id, session_id, is_internal) on public.page_views to anon;

drop policy if exists "anyone can log a view" on public.page_views;
create policy "anyone can log a view"
  on public.page_views for insert
  to anon
  with check (true);

-- staff read for the dashboard.
grant select on public.page_views to authenticated;

drop policy if exists "staff read views" on public.page_views;
create policy "staff read views"
  on public.page_views for select
  to authenticated
  using (true);

-- NOTE: an anon insert endpoint is inherently spammable. Acceptable for a
-- page-view counter (low sensitivity, no PII). Harden later if needed
-- (edge function / rate limit).

-- ---------------------------------------------------------------------
-- 1d. Staff accounts — NOT created here. Add them in the dashboard:
--     Authentication → Users → Add user (email + password), one per staff.
--     Then Authentication → Providers/Settings → disable public sign-ups
--     so only invited staff can exist.
-- ---------------------------------------------------------------------
