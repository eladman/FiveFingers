-- =====================================================================
-- Five Fingers — Facebook Instant Form leads in contact_submissions
-- Run once in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- Safe to re-run.
--
-- The Make.com scenario "לידים מפייסבוק (Instant Forms)" writes Facebook
-- lead-ad submissions into contact_submissions next to website leads, with
-- source = 'facebook-instant-form', lead_id = 'fb-<leadgen id>' and
-- attribution = { utm_source: 'facebook', utm_medium: 'instant_form',
-- utm_campaign, utm_content, utm_term, fb_ad_id, fb_form_id, fb_lead_id,
-- fb_platform }.
--
-- The youth-groups and coach-recruitment Instant Forms don't ask for an
-- email, so email can no longer be required.
-- =====================================================================

alter table public.contact_submissions
  alter column email drop not null;

comment on column public.contact_submissions.email is
  'Always set for website leads. Null for Facebook Instant Form leads whose form does not ask for it.';
