-- =====================================================================
-- Five Fingers — newsletters (ניוזלטר להורים ולחניכים)
-- Run once in the Supabase SQL Editor, AFTER dashboard.sql and lectures.sql
-- (it uses ff_is_dashboard() from lectures.sql). Safe to re-run.
--
-- Staff upload a finished HTML page (e.g. a Claude artifact saved as .html)
-- at /newslaterprep. Each row gets a short `slug` and is shared as
--   https://5fingers.org.il/newsletter/<slug>
--
-- Access:
--   dashboard@…  → full control (same login as the staff dashboard).
--   anon         → NO direct table access. The public page reads ONE published
--                  newsletter by slug through the two functions below, so
--                  nobody can list every newsletter or read unpublished drafts.
-- =====================================================================

create table if not exists public.newsletters (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  slug          text        not null unique
                  check (slug ~ '^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$'),
  title         text        not null check (char_length(title) between 1 and 200),
  -- The line under the title in a WhatsApp / social link preview.
  description   text        check (char_length(description) <= 300),
  html          text        not null check (char_length(html) <= 12000000),
  is_published  boolean     not null default true,
  views         integer     not null default 0
);

-- The picture in the WhatsApp / social link preview. A 1200×630 JPEG, cropped
-- and compressed in the browser (≈300 KB, WhatsApp skips bigger images),
-- stored as base64 and served at /newsletter/<slug>/cover.jpg. Null = the
-- generic Five Fingers image.
alter table public.newsletters
  add column if not exists cover text check (cover is null or char_length(cover) <= 1500000);

create index if not exists newsletters_created_idx on public.newsletters (created_at desc);

alter table public.newsletters enable row level security;
revoke all on public.newsletters from anon, authenticated;

grant select, insert, update, delete on public.newsletters to authenticated;
drop policy if exists "dashboard staff manage newsletters" on public.newsletters;
create policy "dashboard staff manage newsletters"
  on public.newsletters for all
  to authenticated
  using (public.ff_is_dashboard())
  with check (public.ff_is_dashboard());

create or replace function public.newsletters_touch()
returns trigger language plpgsql as $$
begin
  if new.html is distinct from old.html
     or new.title is distinct from old.title
     or new.description is distinct from old.description
     or new.cover is distinct from old.cover then
    new.updated_at := now();
  end if;
  return new;
end $$;

drop trigger if exists newsletters_touch on public.newsletters;
create trigger newsletters_touch before update on public.newsletters
  for each row execute function public.newsletters_touch();

-- ---------------------------------------------------------------------
-- Public read path.
-- newsletter_meta: title + description for the link preview. Called by the
--   server (api/newsletter.js) when WhatsApp / a browser asks for the page.
-- newsletter_cover: the preview picture (base64 JPEG), for the same crawlers.
-- open_newsletter: the HTML itself. Called by the visitor's browser, and
--   counts the open — link-preview crawlers don't run JS, so they don't count.
-- ---------------------------------------------------------------------
-- Dropped first: an older version returned fewer columns, and Postgres can't
-- change a function's return type in place.
drop function if exists public.newsletter_meta(text);
create function public.newsletter_meta(p_slug text)
returns table (title text, description text, updated_at timestamptz, has_cover boolean)
language sql stable security definer set search_path = public as $$
  select n.title, n.description, n.updated_at, n.cover is not null
  from public.newsletters n
  where n.slug = p_slug and n.is_published
$$;

create or replace function public.newsletter_cover(p_slug text)
returns text
language sql stable security definer set search_path = public as $$
  select n.cover
  from public.newsletters n
  where n.slug = p_slug and n.is_published
$$;

create or replace function public.open_newsletter(p_slug text)
returns text
language sql volatile security definer set search_path = public as $$
  update public.newsletters n
     set views = n.views + 1
   where n.slug = p_slug and n.is_published
  returning n.html
$$;

revoke all on function public.newsletter_meta(text) from public;
revoke all on function public.newsletter_cover(text) from public;
revoke all on function public.open_newsletter(text) from public;
grant execute on function public.newsletter_meta(text) to anon, authenticated;
grant execute on function public.newsletter_cover(text) to anon, authenticated;
grant execute on function public.open_newsletter(text) to anon, authenticated;
