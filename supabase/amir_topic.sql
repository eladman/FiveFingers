-- =====================================================================
-- "קשר עם עמיר" category — run once in the Supabase SQL Editor.
--
-- The contact form now asks people reaching out to עמיר what it's about
-- (הרצאות / סדנאות / ליווי אישי), so his assistant knows before calling.
-- The Make scenario maps payload.amirTopic → amir_topic. The optional free
-- text ("ספרו לנו עוד") reuses the existing inquiry_details column.
--
-- Additive + nullable: safe to run on the live table, old rows stay NULL.
-- =====================================================================

alter table public.contact_submissions
  add column if not exists amir_topic text;   -- 'הרצאות' | 'סדנאות' | 'ליווי אישי'

comment on column public.contact_submissions.amir_topic is
  'קשר עם עמיר: the category picked in the form (הרצאות / סדנאות / ליווי אישי).';
