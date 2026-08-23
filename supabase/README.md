# Supabase — Contact submissions

Durable storage for the website's contact form. The site has **one** submitting form
(`src/components/ContactModal.jsx`); every interest type feeds the same table.

## Data flow

```
Browser (ContactModal)  →  Make.com webhook  →  Supabase.contact_submissions
        POST JSON               (existing)         INSERT via service_role key
```

The website does **not** talk to Supabase directly — no frontend change is needed. The table is
locked with RLS (deny-all to the public/anon roles); only Make.com, using the **service_role** key,
can insert. That key bypasses RLS.

## Setup

1. **Create the table** — open the Supabase Dashboard → **SQL Editor** → **New query**, paste the
   contents of [`schema.sql`](./schema.sql), and run it.
2. **Verify** — under **Table Editor** you should see `contact_submissions` with a green lock (RLS on).
3. **Wire Make.com** — in your existing scenario, after the Webhook module add a
   **Supabase → Create a Row** step (or an HTTP → *Make a request* POST to
   `https://<project-ref>.supabase.co/rest/v1/contact_submissions` with headers
   `apikey: <service_role>`, `Authorization: Bearer <service_role>`,
   `Content-Type: application/json`, `Prefer: return=minimal`).
   Use the **service_role** key from **Settings → API** — never the anon key — and store it as a
   Make connection secret.

## Payload → column mapping

The form POSTs camelCase keys; the table uses snake_case. Map them like this in the Make module:

| Payload key      | Column            | Notes                                        |
|------------------|-------------------|----------------------------------------------|
| `name`           | `name`            | **required**                                 |
| `phone`          | `phone`           | **required**                                 |
| `email`          | `email`           | **required**                                 |
| `productType`    | `product_type`    | **required** — free text (chip or deep-link) |
| `residence`      | `residence`       | job roles                                    |
| `birthDate`      | `birth_date`      | job roles — `DD/MM/YYYY` string              |
| `experience`     | `experience`      | job roles                                    |
| `certificates`   | `certificates`    | job roles                                    |
| `childGender`    | `child_gender`    | youth — `זכר` / `נקבה`                        |
| `childName`      | `child_name`      | youth                                        |
| `childCity`      | `child_city`      | youth                                        |
| `childGrade`     | `child_grade`     | youth — `ה׳` … `י״ב`                          |
| `notes`          | `notes`           | youth                                        |
| `orgName`        | `org_name`        | partnership                                  |
| `orgRole`        | `org_role`        | partnership                                  |
| `targetDate`     | `target_date`     | partnership — `DD/MM/YYYY` string            |
| `inquiryDetails` | `inquiry_details` | alumni + partnership (shared)                |
| `submittedAt`    | `submitted_at`    | ISO 8601 timestamp                           |
| `source`         | `source`          | always `fivefingers-website`                 |
| `pageUrl`        | `page_url`        |                                              |
| *(entire body)*  | `raw_payload`     | optional backstop — see below                |

Only `name`, `phone`, `email`, `product_type` are `NOT NULL`. Leave the rest unmapped
for interests that don't use them — the form sends `''` (not `undefined`) for absent extras.

### `raw_payload` (optional)

`raw_payload` is a full-JSON safety net, not the source of truth — the typed columns already hold every
value. It defaults to `'{}'`, so **you can leave it unmapped** and inserts still succeed. If you want the
backstop, map it to the entire webhook body: in the Make Supabase module, click the `raw_payload` field
and select the Webhook module's whole output (the top-level `{{1}}` item, not an individual field).

### Which extras each interest sends

| Interest (`product_type`)                         | Extra columns populated                                  |
|---------------------------------------------------|----------------------------------------------------------|
| Youth — `קבוצות הנוער`                             | `child_gender`, `child_name`, `child_city`, `child_grade`, `notes` |
| Job roles — `מאמן/ת`, `הדרכה בהזנק`, `צוות מטה`, `הדרכה במכינה` | `residence`, `birth_date`, `experience`, `certificates`  |
| Partnership — `שיתוף פעולה`                        | `org_name`, `org_role`, `inquiry_details`, `target_date` |
| Alumni — `יואב`                                    | `inquiry_details`                                        |
| `מכינה`, `הזנק`, `כרמל`, `קשר עם עמיר`             | *(core fields only)*                                     |

> `product_type` is intentionally free text — deep links can send unmapped values such as `Boost`
> (from `src/data/academyData.js`). That's why there's no CHECK/enum constraint.

## Smoke test

Run in the SQL Editor to confirm inserts work and the shape is right, then clean up:

```sql
insert into public.contact_submissions (name, phone, email, product_type, raw_payload)
values ('בדיקה', '050-0000000', 'test@example.com', 'יואב', '{"source":"manual-test"}'::jsonb);

select id, created_at, name, product_type, raw_payload
from public.contact_submissions
order by created_at desc
limit 1;

-- cleanup:
delete from public.contact_submissions where email = 'test@example.com';
```

An insert attempted with the **anon** key (e.g. a public REST call) must fail — that confirms RLS is
locked correctly.

## Reading submissions

Browse rows in the **Table Editor**, or query. Common views:

```sql
-- latest 50
select created_at, name, phone, email, product_type
from public.contact_submissions
order by created_at desc
limit 50;

-- count by interest
select product_type, count(*)
from public.contact_submissions
group by product_type
order by count(*) desc;

-- youth-group signups with the child's details
select created_at, name, phone, child_name, child_city, child_grade, notes
from public.contact_submissions
where product_type = 'קבוצות הנוער'
order by created_at desc;
```

---

# Email templates (`emails/`)

HTML for the auto-reply emails the Make.com scenario sends back to the person who submitted the
form. These are **source of truth** copies — the live email body lives inside the Make email module;
edit here, then paste into Make.

| File | Purpose |
|------|---------|
| [`emails/youth-group-confirmation.html`](./emails/youth-group-confirmation.html) | Production template — thank-you for `קבוצות הנוער` (youth) sign-ups. Uses Make tokens. |
| [`emails/youth-group-confirmation.preview.html`](./emails/youth-group-confirmation.preview.html) | Same email with example data filled in — open in a browser to see how it looks. |

## Wire it into Make.com

1. In the scenario, after the Webhook, add/open the email module (**Email → Send an email**, or your
   ESP module) that replies to the submitter. Set the recipient to `{{1.email}}`.
2. Set **Content type = HTML**, then paste the contents of `youth-group-confirmation.html` into the
   HTML body. Suggested subject: `קיבלנו אתכם — קבוצות הנוער של חמש אצבעות 🔥`.
3. The template references the Webhook module as `{{1.…}}`. If your webhook isn't module **1**, change
   the number (fields: `name`, `childName`, `childCity`, `childGrade`, `phone`). To greet by first
   name only, swap `{{1.name}}` in the header line for `{{split(1.name; " ")[1]}}`.
4. The logo loads from Supabase Storage (public `assets` bucket) —
   `…/storage/v1/object/public/assets/Five-Finger-LOGO.png`. Email clients (Gmail/Outlook) block
   base64 `data:` images, so a hosted `https://` URL is required; the header `<img>` points at it.
   When the site gets a domain, this can move to the site's own `/logo.png`.

> This template is for the youth (`קבוצות הנוער`) interest only. Other interests (jobs, partnership,
> alumni) can either share a generic version or get their own file here later.

---

# Staff dashboard (`/dashboard.html`)

A standalone, password-protected Hebrew dashboard for the team to view/manage leads and see basic
site traffic. Built as a separate Vite entry — not linked from the public site.

## One-time setup

1. **Run [`dashboard.sql`](./dashboard.sql)** in the SQL Editor (after `schema.sql`). It adds
   `status` + `staff_notes` to `contact_submissions`, opens read/limited-write to logged-in staff,
   and creates the `page_views` table.
   - **Already have `page_views` from before?** Run [`page_views_upgrade.sql`](./page_views_upgrade.sql)
     once — it adds the `visitor_id` / `session_id` / `is_internal` columns used for unique-visitor
     counting and internal-traffic filtering. (`dashboard.sql` is idempotent and includes the same
     delta, so re-running it works too.)
2. **Create staff accounts** — Supabase Dashboard → **Authentication → Users → Add user** (email +
   password), one per team member. Then **Authentication → Sign In / Providers** → turn **off**
   "Allow new users to sign up" so only invited staff exist.
3. **Set env vars** in `.env` (see `.env.example`):
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project → Settings → API). The **anon** key —
   never service_role. Rebuild after setting them (`npm run build`).
4. **Reach it** at `/dashboard.html`. For a clean `/dashboard` URL, add a host rewrite once a deploy
   host is chosen (e.g. Netlify `_redirects`: `/dashboard  /dashboard.html  200`).

## How security works

- Staff log in with Supabase Auth. RLS policy `staff read submissions` lets any logged-in user read;
  the column-scoped grant `update (status, staff_notes, updated_at)` means staff can change **only**
  status and notes — never a lead's name/phone/email.
- The anon key ships in the browser (that's expected and safe) — RLS is what protects the data. An
  un-logged-in visitor reads nothing.

## Traffic counter

`src/lib/analytics.js` fires a cookieless beacon on each page/route view → `page_views`. It logs the
path, the referrer, and two **anonymous random ids** (no PII, no cookies — they live in
localStorage/sessionStorage): a persistent `visitor_id` (one per browser) and a per-session
`session_id`. It's a no-op until the Supabase env vars are set.

The dashboard's "תנועה באתר" tab now leads with **unique visitors** (today / 7d / 30d) alongside raw
page views, plus sessions, pages-per-visit, returning visitors, a daily chart (toggle
visitors ↔ views), top pages, and traffic sources (grouped from the referrer).

**Internal traffic:** opening the staff dashboard marks that browser as internal
(`localStorage.ff_internal`), so the team's own visits are flagged `is_internal` and **excluded by
default** — with a checkbox to include them. This is why real numbers drop once staff/collaborators
have opened the dashboard: their hits stop inflating the count.

> **Why counts looked high before:** the site is a single page with hash sections (`#liabah`,
> `#team`, …). Every hash change fired a view, so one person browsing all sections logged ~8 "views",
> and repeat visits from the small review circle stacked up — with no unique-visitor de-duplication
> and no internal filter. Both are fixed now; unique numbers are accurate for traffic logged from the
> upgrade onward (older rows have no `visitor_id`, so each legacy hit counts as its own visit).

> The `page_views` insert is open to the anon role (necessary for a client beacon) and therefore
> spammable. Fine for a counter; harden with an edge function / rate limit if abuse appears.

## Notes / future options

- **Direct write (skip Make):** if you later want the site to insert submissions straight into
  Supabase, that needs an anon INSERT-only RLS policy **plus** a code change in `ContactModal.jsx`.
- **Real date columns:** `birth_date` / `target_date` are stored as `DD/MM/YYYY` text for robustness
  against partial input. To make them real `date` columns, have Make reformat to `YYYY-MM-DD` first.
