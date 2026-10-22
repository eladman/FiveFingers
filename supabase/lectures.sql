-- =====================================================================
-- Five Fingers — lecture feedback (משוב הרצאות של עמיר מנחם)
-- Run once in the Supabase SQL Editor, AFTER schema.sql and dashboard.sql.
-- Safe to re-run.
--
-- Two tables:
--   lectures          — created by Amir's assistant in /lectures.html.
--                       Each row has a short `code` → the QR link /f/<code>.
--   lecture_feedback  — one row per listener response, written by the
--                       public form (/f/<code>) with the anon key.
--
-- Access is split by WHICH staff account is logged in, not just "logged in":
--   dashboard@…  → contact leads + traffic (as before). No lecture data.
--   lectures@…   → lectures + their feedback only. No contact leads.
-- The two never see each other's data.
--
-- MANUAL STEP (not done by this file): create the assistant's account in
--   Authentication → Users → Add user
--     email:    lectures@fivefingers.co.il   (or VITE_LECTURES_LOGIN_EMAIL)
--     password: the team's chosen password    — never commit it to the repo
--     ✔ Auto Confirm User
-- Rotate the password on the same screen later; no code change needed.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Who is who. Edit the addresses HERE if the login emails ever change
--    (they must match VITE_DASHBOARD_LOGIN_EMAIL / VITE_LECTURES_LOGIN_EMAIL).
-- ---------------------------------------------------------------------
create or replace function public.ff_is_dashboard()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'dashboard@fivefingers.co.il'
$$;

create or replace function public.ff_is_lecture_staff()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'lectures@fivefingers.co.il'
$$;

-- ---------------------------------------------------------------------
-- 1. Lectures
-- ---------------------------------------------------------------------
create table if not exists public.lectures (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  code          text        not null unique
                  check (code ~ '^[a-z0-9]{4,12}$'),
  title         text        not null check (char_length(title) between 1 and 200),
  lecture_date  date        not null,
  -- Keys mirror src/feedback/taxonomy.js. Labels live in the UI only.
  audience      text        not null
                  check (audience in ('pre_army', 'army', 'business', 'other')),
  category      text        not null
                  check (category in ('leadership', 'education', 'entrepreneurship',
                                      'personal_growth', 'israeli_society')),
  is_open       boolean     not null default true
);

create index if not exists lectures_date_idx on public.lectures (lecture_date desc);

alter table public.lectures enable row level security;
revoke all on public.lectures from anon, authenticated;

-- Public form: may look a lecture up by code — only what it needs to render.
grant select (id, code, title, lecture_date, audience, is_open) on public.lectures to anon;
drop policy if exists "public reads lecture by code" on public.lectures;
create policy "public reads lecture by code"
  on public.lectures for select
  to anon
  using (true);

-- Staff: full control.
grant select, insert, update, delete on public.lectures to authenticated;
drop policy if exists "lecture staff manage lectures" on public.lectures;
create policy "lecture staff manage lectures"
  on public.lectures for all
  to authenticated
  using (public.ff_is_lecture_staff())
  with check (public.ff_is_lecture_staff());

-- ---------------------------------------------------------------------
-- 2. Responses
--    Typed columns (not one JSON blob) so analysis is plain SQL / CSV.
--    Option answers are stored as stable keys (see src/feedback/questions.js).
-- ---------------------------------------------------------------------
create table if not exists public.lecture_feedback (
  id               bigint      generated always as identity primary key,
  created_at       timestamptz not null default now(),
  lecture_id       uuid        not null references public.lectures (id) on delete cascade,

  -- General questions (every lecture)
  meaningful       smallint    not null check (meaningful between 1 and 5),
  takeaways        text[]      not null check (cardinality(takeaways) between 1 and 2),
  key_insight      text        check (char_length(key_insight) <= 1000),
  topic            text        not null check (char_length(topic) <= 60),
  topic_other      text        check (char_length(topic_other) <= 200),
  recommend        smallint    not null check (recommend between 1 and 5),
  wants_more       boolean     not null,
  email            text        check (char_length(email) <= 254),

  -- Audience-specific (null when the lecture's audience didn't ask them)
  action_intent    text        check (char_length(action_intent) <= 60),   -- pre_army
  army_relevance   smallint    check (army_relevance between 1 and 5),     -- army
  army_leadership  text        check (char_length(army_leadership) <= 60), -- army

  check (not wants_more or email is not null)
);

create index if not exists lecture_feedback_lecture_idx
  on public.lecture_feedback (lecture_id, created_at desc);

alter table public.lecture_feedback enable row level security;
revoke all on public.lecture_feedback from anon, authenticated;

-- Public form: INSERT only (no read-back — emails stay private), and only
-- into a lecture that exists and is still open.
grant insert (lecture_id, meaningful, takeaways, key_insight, topic, topic_other,
              recommend, wants_more, email, action_intent, army_relevance, army_leadership)
  on public.lecture_feedback to anon;
drop policy if exists "public submits feedback to open lecture" on public.lecture_feedback;
create policy "public submits feedback to open lecture"
  on public.lecture_feedback for insert
  to anon
  with check (
    exists (select 1 from public.lectures l where l.id = lecture_id and l.is_open)
  );

-- Staff: read + delete (e.g. remove a test response). No editing answers.
grant select, delete on public.lecture_feedback to authenticated;
drop policy if exists "lecture staff read feedback" on public.lecture_feedback;
create policy "lecture staff read feedback"
  on public.lecture_feedback for select
  to authenticated
  using (public.ff_is_lecture_staff());
drop policy if exists "lecture staff delete feedback" on public.lecture_feedback;
create policy "lecture staff delete feedback"
  on public.lecture_feedback for delete
  to authenticated
  using (public.ff_is_lecture_staff());

-- NOTE: like page_views, an anon insert endpoint can be spammed. The form adds
-- a soft one-response-per-device guard; harden later (edge function / captcha)
-- if it ever becomes a problem.

-- ---------------------------------------------------------------------
-- 3. Tighten the EXISTING dashboard policies (from dashboard.sql).
--    They allowed ANY logged-in user; with a second staff account that would
--    let the lectures login read contact leads. Now: dashboard account only.
-- ---------------------------------------------------------------------
drop policy if exists "staff read submissions" on public.contact_submissions;
create policy "staff read submissions"
  on public.contact_submissions for select
  to authenticated
  using (public.ff_is_dashboard());

drop policy if exists "staff update status/notes" on public.contact_submissions;
create policy "staff update status/notes"
  on public.contact_submissions for update
  to authenticated
  using (public.ff_is_dashboard())
  with check (public.ff_is_dashboard());

drop policy if exists "staff read views" on public.page_views;
create policy "staff read views"
  on public.page_views for select
  to authenticated
  using (public.ff_is_dashboard());
