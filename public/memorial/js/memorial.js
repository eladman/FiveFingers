/* ===========================================================================
   היכל הזיכרון · חמש אצבעות — app logic (v2)
   Data source: window.FALLEN / window.ORDER / window.ROSTER (fallen-data.js)
   Routing: hash-based. #hall (or empty) → the hall; #n<index> → person N.
   =========================================================================== */
(function () {
  "use strict";

  var FALLEN = window.FALLEN || {};
  var ROSTER = window.ROSTER || [];
  var IMG = "img/";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny helpers ------------------------------------------------ */
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function ltr(s) { return '<span class="ltr num">' + esc(s) + "</span>"; }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  /* ---------- memorial flame / candle (SVG, unique gradient ids) --------- */
  var uidCounter = 0;
  function flameDefs(u) {
    return "<defs>" +
      '<radialGradient id="h' + u + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#ffa03c" stop-opacity=".5"/>' +
        '<stop offset="45%" stop-color="#ff8714" stop-opacity=".16"/>' +
        '<stop offset="100%" stop-color="#ff8714" stop-opacity="0"/>' +
      "</radialGradient>" +
      '<linearGradient id="f' + u + '" x1="0" y1="1" x2="0" y2="0">' +
        '<stop offset="0%" stop-color="#ff7a00"/>' +
        '<stop offset="55%" stop-color="#ffb73f"/>' +
        '<stop offset="100%" stop-color="#ffe9b8"/>' +
      "</linearGradient>" +
      '<linearGradient id="c' + u + '" x1="0" y1="1" x2="0" y2="0">' +
        '<stop offset="0%" stop-color="#ffd070"/>' +
        '<stop offset="100%" stop-color="#fffdf5"/>' +
      "</linearGradient>" +
      '<linearGradient id="w' + u + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#efe3c9"/>' +
        '<stop offset="100%" stop-color="#d4c3a0"/>' +
      "</linearGradient>" +
      "</defs>";
  }

  /* full memorial candle: flame + wick + slender wax pillar */
  function candle(cls) {
    var u = "u" + (++uidCounter);
    return '<span class="candle ' + (cls || "") + '" aria-hidden="true">' +
      '<svg viewBox="0 0 56 96" role="presentation" focusable="false">' +
        flameDefs(u) +
        '<circle class="halo" cx="28" cy="24" r="24" fill="url(#h' + u + ')"/>' +
        '<g class="fl">' +
          '<path d="M28 5 C 24.4 12.4, 21.4 16.8, 21.4 23.4 C 21.4 30, 24.2 34, 28 34 C 31.8 34, 34.6 30, 34.6 23.4 C 34.6 16.8, 31.6 12.4, 28 5 Z" fill="url(#f' + u + ')"/>' +
          '<path d="M28 16 C 26.3 19.8, 25.1 22.4, 25.1 26.2 C 25.1 29.9, 26.4 32, 28 32 C 29.6 32, 30.9 29.9, 30.9 26.2 C 30.9 22.4, 29.7 19.8, 28 16 Z" fill="url(#c' + u + ')"/>' +
        "</g>" +
        '<rect x="27.3" y="33.6" width="1.4" height="6.6" rx=".7" fill="#4a3520"/>' +
        '<ellipse cx="28" cy="41" rx="9.4" ry="2.7" fill="#f8f1e2"/>' +
        '<rect x="18.6" y="41" width="18.8" height="50" rx="3" fill="url(#w' + u + ')"/>' +
        '<rect x="18.6" y="44.6" width="3.2" height="10" rx="1.6" fill="#f8f1e2" opacity=".85"/>' +
      "</svg></span>";
  }

  /* =========================================================================
     LAYER 2 — THE HALL (memorial register)
     ====================================================================== */
  /* the 19 fallen portraits, in roster order */
  function fallenPhotos() {
    var photos = [];
    ROSTER.forEach(function (entry) {
      var data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null;
      if (data && data.photo) photos.push(IMG + data.photo);
    });
    return photos;
  }

  /* Opening "wall of faces" (desktop) — the 19 portraits, tiled to fill the hero
     and dissolved into the paper by .opening__scrim. Decorative (aria-hidden). */
  function buildOpeningMosaic() {
    var m = document.getElementById("opening-mosaic");
    if (!m) return;
    var photos = fallenPhotos();
    if (!photos.length) return;
    var TILES = 48;
    var stride = 7; // coprime with 19 → spreads duplicates, no adjacent repeats
    var html = "";
    for (var i = 0; i < TILES; i++) {
      html += '<img src="' + esc(photos[(i * stride) % photos.length]) +
              '" alt="" loading="lazy" decoding="async">';
    }
    m.innerHTML = html;
  }

  /* Living wall (mobile) — on small screens the grid holds fewer distinct faces,
     so we crossfade individual tiles to new portraits at staggered times. Over a
     minute or so every one of the 19 is shown across the tiles. ≤700px only. */
  function startMosaicCycle() {
    var m = document.getElementById("opening-mosaic");
    if (!m || reduceMotion) return;
    var photos = fallenPhotos();
    if (photos.length < 2) return;
    var tiles = m.querySelectorAll("img");
    if (!tiles.length) return;

    function rand(n) { return (Math.random() * n) | 0; }
    function swap() {
      var img = tiles[rand(tiles.length)];
      if (img.classList.contains("is-fading")) return; // already mid-swap
      var next = photos[rand(photos.length)];
      if (img.getAttribute("src") === next) return;    // would be a no-op
      img.classList.add("is-fading");                  // fade this tile out
      setTimeout(function () {
        img.src = next;                                // photos are already cached
        img.classList.remove("is-fading");             // fade the new face in
      }, 800);                                          // matches the CSS transition
    }

    var mq = window.matchMedia("(max-width: 700px)");
    var timer = null;
    function start() { if (!timer) timer = setInterval(swap, 1300); }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      tiles.forEach(function (t) { t.classList.remove("is-fading"); });
    }
    function sync() { if (mq.matches) start(); else stop(); }
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else if (mq.addListener) mq.addListener(sync); // older Safari
  }

  function buildHall() {
    var wall = document.getElementById("wall");
    wall.innerHTML = "";
    ROSTER.forEach(function (entry, i) {
      var data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null;
      var node;
      if (data) {
        node = el(
          '<a class="niche niche--featured reveal" role="listitem" href="#n' + i + '" ' +
            'aria-label="' + esc(data.name) + ", " + esc(data.rank) + '. למסע חייו">' +
            '<span class="niche__photo-wrap">' +
              '<img class="niche__photo" src="' + IMG + esc(data.photo) + '" alt="' + esc(data.name) + '" loading="lazy" decoding="async">' +
            "</span>" +
            '<span class="niche__meta">' +
              '<span class="niche__name">' + esc(data.name) + "</span>" +
              '<span class="niche__dates">בן ' + ltr(data.age) + " · נפל ב־" + ltr(data.date) + "</span>" +
              '<span class="niche__cta">למסע חייו ←</span>' +
            "</span>" +
          "</a>"
        );
      } else {
        node = el(
          '<a class="niche niche--plaque reveal" role="listitem" href="#n' + i + '" ' +
            'aria-label="' + esc(entry.n) + ' — לעמוד הזיכרון">' +
            '<span class="niche__plaque-inner">' +
              '<span class="niche__name">' + esc(entry.n) + "</span>" +
              '<span class="niche__tick"></span>' +
              '<span class="niche__held">לזכרם</span>' +
            "</span>" +
          "</a>"
        );
      }
      node.style.setProperty("--reveal-delay", Math.min(i * 45, 360) + "ms");
      wall.appendChild(node);
    });
    observeReveals(wall);
  }

  /* =========================================================================
     LAYER 3 — PERSONAL PAGE
     ====================================================================== */
  function navButtons(i) {
    var prev = ROSTER[i - 1], next = ROSTER[i + 1];
    function link(entry, idx, dirLabel, mod) {
      if (!entry) {
        return '<span class="pnav__link pnav__spacer ' + mod + '" aria-hidden="true"></span>';
      }
      var data = entry.id && FALLEN[entry.id] ? FALLEN[entry.id] : null;
      var thumb = data && data.photo
        ? '<span class="pnav__thumb"><img src="' + IMG + esc(data.photo) + '" alt="" loading="lazy" decoding="async"></span>'
        : "";
      return '<a class="pnav__link ' + mod + '" href="#n' + idx + '">' +
        thumb +
        '<span class="pnav__txt">' +
          '<span class="pnav__dir">' + dirLabel + "</span>" +
          '<span class="pnav__name">' + esc(entry.n) + "</span>" +
        "</span></a>";
    }
    /* RTL: previous sits on the right, next on the left */
    return '<nav class="pnav" aria-label="ניווט בין הנופלים">' +
      link(prev, i - 1, "הקודם →", "pnav__link--prev") +
      '<a class="pnav__all" href="#hall"><span class="dot" aria-hidden="true"></span>כל הנופלים</a>' +
      link(next, i + 1, "← הבא", "pnav__link--next") +
      "</nav>";
  }

  function siteNav() {
    return '<nav class="sitenav" aria-label="ניווט ראשי">' +
      '<a class="sitenav__logo" href="/" aria-label="חמש אצבעות — דף הבית"><img src="assets/logo.png" alt="חמש אצבעות"></a>' +
      '<div class="sitenav__links">' +
        '<a class="sitenav__link" href="/#liabah">ליבה</a>' +
        '<a class="sitenav__link" href="/#academy">אקדמיה</a>' +
        '<a class="sitenav__link" href="/#collabs">פרויקטים</a>' +
        '<a class="sitenav__link is-active" href="#hall" aria-current="page">יזכור</a>' +
        '<a class="sitenav__link" href="/#alumni">בוגרים</a>' +
        '<a class="sitenav__link" href="/#team">צוות</a>' +
        '<a class="sitenav__link" href="/#amir">עמיר מנחם</a>' +
      '</div>' +
      '<a class="sitenav__cta" href="/#contact">יצירת קשר</a>' +
    '</nav>';
  }

  function topBar(i, total) {
    return siteNav() +
      '<div class="pbar">' +
      '<a class="pbar__back" href="#hall"><span class="arr" aria-hidden="true">→</span> חזרה להיכל</a>' +
      '<span class="pbar__idx mono"><span class="ltr">' + pad(i + 1) + " / " + total + "</span></span>" +
      "</div>";
  }

  function metaItem(k, vHtml) {
    return '<div class="meta-strip__item"><span class="meta-strip__k">' + esc(k) + "</span>" +
      '<span class="meta-strip__v">' + vHtml + "</span></div>";
  }

  function renderFull(id, i) {
    var d = FALLEN[id];
    var total = ROSTER.length;
    var html = "";

    html += topBar(i, total);

    /* hero */
    html +=
      '<header class="phero">' +
        '<div class="phero__grid">' +
          '<div class="phero__text">' +
            '<div class="phero__eyebrow"><span class="ln"></span>' + ltr(d.idx) + (d.feminine ? " · בוגרת התנועה</div>" : " · בוגר התנועה</div>") +
            '<h1 class="phero__name">' + esc(d.name) + "</h1>" +
            '<p class="phero__rank">' + esc(d.rank) + "</p>" +
            '<div class="meta-strip">' +
              metaItem("גיל בנופלו", "בן " + ltr(d.age)) +
              metaItem("יום הנפילה", ltr(d.date)) +
              metaItem("בתאריך העברי", esc(d.dateHe)) +
            "</div>" +
            '<figure class="phero__quote">' +
              '<figcaption class="phero__quote-label">במילותיו</figcaption>' +
              '<blockquote class="phero__quote-text">״' + esc(d.quote) + '״</blockquote>' +
            "</figure>" +
          "</div>" +
          '<div class="phero__media">' +
            '<figure class="phero__frame" id="heroFrame">' +
              '<img class="phero__portrait" src="' + IMG + esc(d.photo) + '" alt="' + esc(d.name) + '" decoding="async">' +
            "</figure>" +
          "</div>" +
        "</div>" +
      "</header>";

    /* story chapters */
    html +=
      '<section class="psec psec--dots">' +
        '<div class="psec__inner">' +
          secHead("הסיפור", "מסע של חיים") +
          chapter("01", "שורשים", d.roots) +
          chapter("02", "השירות", d.service) +
          chapter("03", "הנפילה", d.fall) +
        "</div>" +
      "</section>";

    /* legacy pull-quote */
    if (d.legacy) {
      html +=
        '<section class="psec legacy reveal">' +
          '<span class="legacy__label">המורשת שהשאיר אחריו</span>' +
          '<p class="legacy__text">' + esc(d.legacy) + "</p>" +
        "</section>";
    }

    /* traits — מי שהיה */
    if (d.traits && d.traits.length) {
      html +=
        '<section class="psec psec--tint">' +
          '<div class="psec__inner psec__inner--wide">' +
            secHead("מי שהיה", "התכונות שנשארו איתנו") +
            '<div class="traits">' +
              d.traits.map(function (t) {
                return '<article class="trait reveal">' +
                  '<div class="trait__img"><img src="' + IMG + esc(t.p) + '" alt="' + esc(t.t) + '" loading="lazy" decoding="async"></div>' +
                  '<div class="trait__body">' +
                    '<h3 class="trait__t">' + esc(t.t) + "</h3>" +
                    '<p class="trait__x">' + esc(t.x) + "</p>" +
                  "</div></article>";
              }).join("") +
            "</div>" +
          "</div>" +
        "</section>";
    }

    /* extra block */
    if (d.extra) {
      html +=
        '<section class="psec">' +
          '<div class="psec__inner">' +
            '<div class="extra reveal">' +
              '<div class="extra__eyebrow">' + esc(d.extra.eyebrow) + "</div>" +
              '<h3 class="extra__title">' + esc(d.extra.title) + "</h3>" +
              '<div class="prose">' + d.extra.paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
            "</div>" +
          "</div>" +
        "</section>";
    }

    /* gallery */
    if (d.gallery && d.gallery.length) {
      html +=
        '<section class="psec psec--tint psec--dots">' +
          '<div class="psec__inner psec__inner--wide">' +
            secHead("אלבום", "רגעים") +
            '<div class="gallery">' +
              d.gallery.map(function (g) {
                return '<figure class="gallery__item reveal"><img src="' + IMG + esc(g) + '" alt="' + esc(d.name) + ' — תמונה" loading="lazy" decoding="async"></figure>';
              }).join("") +
            "</div>" +
          "</div>" +
        "</section>";
    }

    /* song + links */
    html +=
      '<section class="psec song reveal">' +
        '<div class="psec__inner">' +
          secHeadCentered("השיר שלו", esc(d.song.t) + " · " + esc(d.song.a)) +
          '<div class="song__frame">' +
            '<iframe src="' + esc(d.song.embed) + '" width="100%" height="152" frameborder="0" ' +
              'allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" ' +
              'title="' + esc(d.song.t) + '"></iframe>' +
          "</div>" +
          (d.links && d.links.length
            ? '<div class="plinks">' + d.links.map(function (lk) {
                return '<a class="plink" href="' + esc(lk.h) + '" target="_blank" rel="noopener noreferrer">' +
                  esc(lk.l) + ' <span class="ext" aria-hidden="true">↗</span></a>';
              }).join("") + "</div>"
            : "") +
        "</div>" +
      "</section>";

    /* closing + nav */
    html +=
      '<section class="closing">' +
        candle("closing__candle") +
        '<div class="closing__orn" aria-hidden="true"><span></span><span class="d"></span><span></span></div>' +
        '<p class="closing__bless">' + (d.feminine ? "יהי זכרה ברוך" : "יהי זכרו ברוך") + "</p>" +
        navButtons(i) +
      "</section>";

    html += footer();
    return html;
  }

  function renderPlaceholder(entry, i) {
    var total = ROSTER.length;
    return topBar(i, total) +
      '<header class="phero">' +
        '<div class="placeholder">' +
          '<div class="placeholder__inner">' +
            candle("placeholder__candle") +
            '<div class="phero__eyebrow" style="justify-content:center">' + ltr(pad(i + 1)) + " · בוגר/ת התנועה</div>" +
            '<h1 class="placeholder__name">' + esc(entry.n) + "</h1>" +
            '<p class="placeholder__role">נר נשמה דולק לזכרו/ה</p>' +
            '<p class="placeholder__msg">מקום שמור בכבוד. מסע חייו/ה — שורשים, שירות ומורשת — ייכתב כאן בקרוב, כדי שזכרו/ה ימשיך/תמשיך להאיר.</p>' +
          "</div>" +
        "</div>" +
      "</header>" +
      '<section class="closing">' +
        '<p class="closing__bless">יהי זכרם ברוך</p>' +
        navButtons(i) +
      "</section>" +
      footer();
  }

  /* ---------- person sub-templates --------------------------------------- */
  function secHead(label, title) {
    return '<div class="sec-head reveal">' +
      '<span class="sec-head__label">' + esc(label) + "</span>" +
      '<h2 class="sec-head__title">' + esc(title) + "</h2>" +
      '<div class="accent-bar sec-head__bar"></div>' +
      "</div>";
  }
  function secHeadCentered(label, title) {
    return '<div class="sec-head reveal" style="text-align:center">' +
      '<span class="sec-head__label">' + esc(label) + "</span>" +
      '<h2 class="sec-head__title">' + title + "</h2>" +
      '<div class="accent-bar sec-head__bar" style="margin-inline:auto"></div>' +
      "</div>";
  }
  function chapter(num, title, paras) {
    if (!paras || !paras.length) return "";
    return '<div class="chapter reveal">' +
      '<div class="chapter__head">' +
        '<span class="chapter__num">' + ltr(num) + "</span>" +
        '<h3 class="chapter__title">' + esc(title) + "</h3>" +
        '<span class="chapter__line"></span>' +
      "</div>" +
      '<div class="prose">' + paras.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
      "</div>";
  }
  function footer() {
    return '<footer class="sitefoot">' +
      '<div class="sitefoot__inner">' +
        '<div class="sitefoot__grid">' +
          '<div class="sitefoot__brand">' +
            '<img src="assets/logo.png" alt="חמש אצבעות">' +
            '<p class="sitefoot__desc">מפתחים את הדור הבא של מנהיגי ישראל דרך מצוינות ערכית, חוויות אתגריות וקהילה תומכת — מאז 2014.</p>' +
            '<div class="sitefoot__status"><span class="sitefoot__dot" aria-hidden="true"></span><span class="t">המערכת פועלת תקין</span></div>' +
          "</div>" +
          '<div class="sitefoot__col"><h4>תנועה</h4><ul>' +
            '<li><a href="/#liabah">ליבה</a></li>' +
            '<li><a href="/#programs">אקדמיה</a></li>' +
            '<li><a href="/#programs">שת&quot;פ</a></li>' +
            '<li><a href="/#programs">בוגרים</a></li>' +
          "</ul></div>" +
          '<div class="sitefoot__col"><h4>אודות</h4><ul>' +
            '<li><a href="/#who-we-are">עמיר מנחם</a></li>' +
            '<li><a href="/#belief">ערכים</a></li>' +
            '<li><a href="/#who-we-are">חזון</a></li>' +
            '<li><a href="/#who-we-are">מה אנחנו</a></li>' +
          "</ul></div>" +
          '<div class="sitefoot__col"><h4>הצטרף</h4><ul>' +
            '<li><a href="/#contact">הרשמה</a></li>' +
            '<li><a href="/#contact">מתנדבים</a></li>' +
            '<li><a href="/#contact">תרומות</a></li>' +
            '<li><a href="/#contact">יצירת קשר</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="sitefoot__bottom"><p>© 2026 תנועת חמש אצבעות — אמיר מנחם ויורם מנחם. כל הזכויות שמורות.</p></div>' +
      "</div>" +
      "</footer>";
  }

  /* =========================================================================
     REVEAL OBSERVER
     ====================================================================== */
  var io = null;
  function observeReveals(scope) {
    var nodes = (scope || document).querySelectorAll(".reveal:not(.is-in)");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* =========================================================================
     ROUTING
     ====================================================================== */
  var hallView = document.getElementById("view-hall");
  var personView = document.getElementById("view-person");

  function showHall(scrollMode) {
    personView.classList.remove("is-active");
    personView.innerHTML = "";
    hallView.classList.add("is-active");
    document.title = "היכל הזיכרון · חמש אצבעות";
    var opening = hallView.querySelector(".opening");
    if (opening) { requestAnimationFrame(function () { opening.classList.add("is-ready"); }); }
    if (scrollMode === "wall") {
      var w = document.getElementById("hall");
      window.scrollTo({ top: w ? w.offsetTop : 0, behavior: reduceMotion ? "auto" : "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
    observeReveals(hallView);
  }

  function showPerson(i) {
    var entry = ROSTER[i];
    if (!entry) { location.hash = "#hall"; return; }
    var id = entry.id && FALLEN[entry.id] ? entry.id : null;
    personView.innerHTML = id ? renderFull(id, i) : renderPlaceholder(entry, i);
    hallView.classList.remove("is-active");
    personView.classList.add("is-active");
    window.scrollTo(0, 0);
    document.title = entry.n + " · היכל הזיכרון";

    var frame = document.getElementById("heroFrame");
    if (frame) {
      if (reduceMotion) { frame.classList.add("is-alive"); }
      else { requestAnimationFrame(function () { setTimeout(function () { frame.classList.add("is-alive"); }, 220); }); }
    }
    observeReveals(personView);
  }

  function route() {
    var h = location.hash.replace(/^#/, "");
    var m = h.match(/^n(\d+)$/);
    if (m) { showPerson(parseInt(m[1], 10)); }
    else { showHall(h === "hall" ? "wall" : "top"); }
  }

  /* =========================================================================
     INIT
     ====================================================================== */
  buildOpeningMosaic();
  startMosaicCycle();
  buildHall();

  /* ---------- mobile nav drawer (mirrors the React <Navbar> menu) --------- */
  (function initNav() {
    var nav = document.querySelector(".sitenav");
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("navDrawer");
    if (!nav || !toggle || !drawer) { return; }

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      drawer.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () {
      setOpen(!drawer.classList.contains("is-open"));
    });
    // Close after choosing a destination, on Escape, or when clicking away.
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) { setOpen(false); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setOpen(false); }
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) { setOpen(false); }
    });
  })();

  window.addEventListener("hashchange", route);
  route();
})();
