-- =====================================================================
-- Five Fingers — campaign attribution on contact submissions
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run.
--
-- Since the ad campaign, both contact forms send two extra payload keys:
--   leadId       — random id, also on the GTM `lead_submitted` event, so a
--                  future server-side copy (Meta Conversions API) can be
--                  matched to the browser event.
--   attribution  — the ad link's UTM tags + click id, or null for leads that
--                  didn't arrive from a tagged link:
--                  { utm_source, utm_medium, utm_campaign, utm_content,
--                    utm_term, fbclid, gclid, landing_page, captured_at }
--
-- After running this, map them in the Make.com scenario's Supabase
-- "Create a Row" module (see README → "Campaign attribution"):
--   leadId       → lead_id
--   attribution  → attribution
-- =====================================================================

alter table public.contact_submissions
  add column if not exists lead_id     text,
  add column if not exists attribution jsonb;

comment on column public.contact_submissions.attribution is
  'UTM tags + click id from the ad link that brought the visitor (payload.attribution). Null = not from a tagged link.';
comment on column public.contact_submissions.lead_id is
  'Random id shared with the GTM lead_submitted event (payload.leadId).';

-- Leads-per-campaign reports filter on this.
create index if not exists contact_submissions_utm_campaign_idx
  on public.contact_submissions ((attribution ->> 'utm_campaign'));
