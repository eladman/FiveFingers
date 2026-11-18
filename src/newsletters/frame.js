/**
 * Prepares uploaded newsletter HTML for a sandboxed `srcdoc` iframe. Used by
 * both the public page (api/newsletter.js inlines it via toString(), so it must
 * stay self-contained ES5-ish with no imports) and the staff preview.
 *
 * It injects one click handler into the newsletter:
 *   - Links to other pages open in a new tab. Most sites refuse to load inside
 *     a frame, and a family tapping "register" shouldn't lose the newsletter.
 *   - In-page links (#section) scroll in place. Inside srcdoc they would
 *     otherwise resolve against the PARENT page's URL and reload the whole
 *     shell inside the frame.
 */
export function withFrameHelpers(html) {
  var helper =
    '<script>document.addEventListener("click",function(e){' +
    'var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a||e.defaultPrevented)return;' +
    'var h=a.getAttribute("href")||"";' +
    'if(h.charAt(0)==="#"){e.preventDefault();var id=decodeURIComponent(h.slice(1));' +
    'var el=id?(document.getElementById(id)||document.getElementsByName(id)[0]):null;' +
    'if(el)el.scrollIntoView({behavior:"smooth"});else if(!id)window.scrollTo({top:0,behavior:"smooth"});return}' +
    'if(!a.target||a.target==="_self"||a.target==="_top"||a.target==="_parent"){a.target="_blank";a.rel="noopener"}' +
    '});<' + '/script>'
  if (/<head[^>]*>/i.test(html)) return html.replace(/<head[^>]*>/i, function (m) { return m + helper })
  if (/<body[^>]*>/i.test(html)) return html.replace(/<body[^>]*>/i, function (m) { return m + helper })
  return helper + html
}
