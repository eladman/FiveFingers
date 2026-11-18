/**
 * Public newsletter page: /newsletter/<slug>  (rewritten here by vercel.json,
 * and by the dev middleware in vite.config.js).
 *
 * The response is a small shell, not the newsletter itself:
 *   - <head> carries the newsletter's own title/description, so a link pasted
 *     into WhatsApp previews as the newsletter, not as the generic site.
 *   - The body fetches the uploaded HTML straight from Supabase in the browser
 *     and shows it full-screen in a sandboxed iframe. Two reasons:
 *       1. Size. Vercel caps a function response at 4.5 MB; a Claude artifact
 *          with embedded images can be bigger. The browser fetch has no cap.
 *       2. Isolation. The uploaded page runs scripts we didn't write. The
 *          sandbox (no allow-same-origin) keeps it off 5fingers.org.il's origin,
 *          so it can't read the staff login stored there.
 *
 * Data comes through two security-definer functions (supabase/newsletters.sql)
 * that only return a newsletter that is published and whose slug you know.
 */

import { withFrameHelpers } from '../src/newsletters/frame.js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,58}[a-z0-9]$/

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

async function fetchMeta(slug) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/newsletter_meta`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_slug: slug }),
  })
  if (!r.ok) throw new Error(`newsletter_meta ${r.status}`)
  const rows = await r.json()
  return rows[0] || null
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://x')
  const slug = String(req.query?.slug ?? url.searchParams.get('slug') ?? '').toLowerCase()
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // Sent to families, not meant for search engines.
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  if (!SUPABASE_URL || !ANON_KEY) {
    res.statusCode = 500
    return res.end(messagePage('הדף לא מוגדר', 'חסרים משתני הסביבה של Supabase.'))
  }

  let meta = null
  if (SLUG_RE.test(slug)) {
    try {
      meta = await fetchMeta(slug)
    } catch (err) {
      console.error(err)
      res.statusCode = 502
      return res.end(messagePage('משהו השתבש', 'לא הצלחנו לטעון את הניוזלטר. נסו לרענן בעוד רגע.'))
    }
  }

  if (!meta) {
    res.statusCode = 404
    res.setHeader('Cache-Control', 'public, s-maxage=30')
    return res.end(messagePage('הניוזלטר לא נמצא', 'ייתכן שהקישור שגוי או שהניוזלטר הוסר.'))
  }

  // Short edge cache: a re-upload shows up within a minute.
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
  res.statusCode = 200
  res.end(shellPage({ slug, meta, origin }))
}

function head({ title, description, canonical, origin }) {
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex, nofollow" />
<title>${esc(title)}</title>
${description ? `<meta name="description" content="${esc(description)}" />` : ''}
<meta property="og:type" content="article" />
<meta property="og:site_name" content="חמש אצבעות" />
<meta property="og:title" content="${esc(title)}" />
${description ? `<meta property="og:description" content="${esc(description)}" />` : ''}
${canonical ? `<meta property="og:url" content="${esc(canonical)}" />` : ''}
<meta property="og:image" content="${esc(origin)}/new_link_logo.jpg" />
<meta property="og:image:width" content="1672" />
<meta property="og:image:height" content="941" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#ffffff" />
<link rel="icon" type="image/png" href="/logo.png" />`
}

const BASE_CSS = `
html,body{margin:0;height:100%;background:#fff;color:#0d1b4b;font-family:Heebo,system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
.msg{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;box-sizing:border-box}
.msg img{height:44px;margin-bottom:8px}
.msg h1{margin:0;font-size:22px}
.msg p{margin:0;font-size:15px;opacity:.6}
.msg a{color:#c25a00;font-weight:700}
.pulse{animation:p 1.4s ease-in-out infinite}@keyframes p{50%{opacity:.35}}
`

function messagePage(title, body) {
  return `<!doctype html><html lang="he" dir="rtl"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" /><title>${esc(title)} — חמש אצבעות</title>
<link rel="icon" type="image/png" href="/logo.png" /><style>${BASE_CSS}</style></head>
<body><main class="msg"><img src="/logo.png" alt="חמש אצבעות" /><h1>${esc(title)}</h1><p>${esc(body)}</p>
<p><a href="/">לאתר חמש אצבעות</a></p></main></body></html>`
}

function shellPage({ slug, meta, origin }) {
  const canonical = `${origin}/newsletter/${slug}`
  const config = JSON.stringify({ url: SUPABASE_URL, key: ANON_KEY, slug }).replace(/</g, '\\u003c')
  return `<!doctype html><html lang="he" dir="rtl"><head>
${head({ title: meta.title, description: meta.description, canonical, origin })}
<style>${BASE_CSS}
#nl{position:fixed;inset:0;width:100%;height:100%;border:0;display:block;background:#fff}
</style></head>
<body>
<main class="msg" id="msg"><img src="/logo.png" alt="חמש אצבעות" class="pulse" /><p>טוען את הניוזלטר…</p></main>
<iframe id="nl" title="${esc(meta.title)}" hidden
  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms allow-modals allow-downloads"></iframe>
<script>
(function () {
  var C = ${config};
  var msg = document.getElementById('msg');
  var frame = document.getElementById('nl');

  ${withFrameHelpers.toString()}

  function fail(text) {
    msg.innerHTML = '<img src="/logo.png" alt="חמש אצבעות" /><h1>' + text + '</h1><p><a href="">נסו לרענן</a></p>';
  }

  fetch(C.url + '/rest/v1/rpc/open_newsletter', {
    method: 'POST',
    headers: { apikey: C.key, Authorization: 'Bearer ' + C.key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_slug: C.slug })
  })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (html) {
      if (!html) return fail('הניוזלטר לא נמצא');
      frame.srcdoc = withFrameHelpers(html);
      frame.hidden = false;
      msg.remove();
    })
    .catch(function () { fail('לא הצלחנו לטעון את הניוזלטר'); });
})();
</script>
</body></html>`
}
