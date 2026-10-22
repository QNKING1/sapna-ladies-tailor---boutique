/* ============================================================
   MAIN — renders site data, builds links, header + preloader
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var data = window.SITE_DATA || {};
  var business = data.business || {};
  var WA_NUMBER = cfg.WHATSAPP_NUMBER || "923112424038";
  var BUSINESS_NAME = cfg.BUSINESS_NAME || "Sapna Ladies Tailor & Boutique";

  function waLink(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function generalMessage() {
    return (
      cfg.GENERAL_WA_TEXT ||
      "Assalam o Alaikum, I would like to ask about your collection / book an appointment at " +
        BUSINESS_NAME +
        "."
    );
  }

  function topicMessage(topic) {
    return (
      "Assalam o Alaikum, I would like to ask about " +
      topic +
      " at " +
      BUSINESS_NAME +
      "."
    );
  }

  /* ---------- SVG collection artwork (faces-free garment line art) ---------- */

  var art = {
    custom:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artCustom" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F0E1"/><stop offset="1" stop-color="#E4D3B3"/></linearGradient>' +
      '<linearGradient id="artCustomGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D8BE8A" stop-opacity="0"/><stop offset=".5" stop-color="#D8BE8A"/><stop offset="1" stop-color="#D8BE8A" stop-opacity="0"/></linearGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artCustom)"/>' +
      '<circle cx="470" cy="92" r="84" fill="#D8BE8A" opacity=".16"/>' +
      '<g fill="none" stroke="#0C302A" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M300 42c-11 0-18 8-18 17 0 8 6 14 14 14"/><path d="M298 71 192 124M298 71l106 53"/>' +
      '<path d="M300 128c-14 0-26 5-36 14l-68 42 34 58 30-16v132c0 12 8 18 20 18h120c12 0 20-6 20-18V226l30 16 34-58-68-42c-10-9-22-14-36-14Z"/>' +
      '<path d="M278 132c2 16 10 26 22 26s20-10 22-26"/>' +
      '<path d="M300 158v194" opacity=".65"/>' +
      '<path d="M282 148c-12 2-21 8-29 14l-51 31 24 41 22-13" stroke-dasharray="2 8" opacity=".5"/>' +
      '<path d="M318 148c12 2 21 8 29 14l51 31-24 41-22-13" stroke-dasharray="2 8" opacity=".5"/>' +
      '<path d="M238 328c0 8 4 12 12 12M362 328c0 8-4 12-12 12" stroke-dasharray="2 7" opacity=".55"/>' +
      '</g>' +
      '<g fill="#0C302A"><circle cx="300" cy="190" r="2.4"/><circle cx="300" cy="214" r="2.4"/><circle cx="300" cy="238" r="2.4"/><circle cx="300" cy="262" r="2.4"/></g>' +
      '<g fill="none" stroke="#16463C" opacity=".45">' +
      '<path d="M300 132c6 8 14 10 22 8" stroke-width="1.2"/>' +
      '<path d="M198 140c10 24 25 41 45 51M402 140c-10 24-25 41-45 51" stroke-width="1.2" stroke-dasharray="1 6"/>' +
      '</g>' +
      '<path d="M55 392c86-30 138 18 220-6s126-32 270-10" fill="none" stroke="#0C302A" stroke-width="20" opacity=".1"/>' +
      '<path d="M55 392c86-30 138 18 220-6s126-32 270-10" fill="none" stroke="#16463C" stroke-width="1" stroke-dasharray="2 10" opacity=".5"/>' +
      '<g stroke="#0C302A" stroke-width="1" opacity=".3">' +
      '<path d="M92 374v10M118 367v10M144 361v10M170 356v10M196 353v10M222 354v10M248 356v10M274 361v10M300 367v10M326 368v10M352 367v10M378 363v10M404 358v10M430 352v10M456 347v10M482 343v10M508 342v10"/>' +
      '</g>' +
      '<circle cx="466" cy="132" r="3" fill="#D8BE8A"/><circle cx="120" cy="300" r="2.4" fill="#D8BE8A"/>' +
      '</svg>',

    bridal:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artBridal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123F35"/><stop offset=".6" stop-color="#0A2721"/><stop offset="1" stop-color="#041511"/></linearGradient>' +
      '<radialGradient id="artBridalGlow" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#D8BE8A" stop-opacity=".22"/><stop offset="1" stop-color="#D8BE8A" stop-opacity="0"/></radialGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artBridal)"/><rect width="600" height="420" fill="url(#artBridalGlow)"/>' +
      '<g fill="none" stroke="#E3CBA0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M300 34c-11 0-18 8-18 17 0 8 6 14 14 14"/><path d="M298 63 206 108M298 63l92 45"/>' +
      '<path d="M264 116h72l16 74-25 9-9-40h-36l-9 40-25-9z"/>' +
      '<path d="M280 120c2 12 9 19 20 19s18-7 20-19"/>' +
      '<path d="M258 202h84l64 152c4 10-2 16-12 16H206c-10 0-16-6-12-16z"/>' +
      '<path d="M272 204v162M300 204v162M328 204v162" opacity=".38" stroke-dasharray="2 7"/>' +
      '<path d="M206 358c14 10 26-6 40 3s26-6 40 3 26-6 40 3 26-6 40 3 26-6 40 3" opacity=".9"/>' +
      '<path d="M224 338c14 9 25-5 38 3s25-5 38 3 25-5 38 3 25-5 38 3" opacity=".4" stroke-dasharray="1 6"/>' +
      '<path d="M246 130c-46 40-64 94-34 132 24 30 12 54-22 80" stroke-dasharray="2 6" opacity=".5"/>' +
      '</g>' +
      '<g fill="#D8BE8A" opacity=".9"><circle cx="300" cy="178" r="2.2"/><circle cx="270" cy="252" r="2"/><circle cx="330" cy="252" r="2"/><circle cx="250" cy="300" r="2"/><circle cx="350" cy="300" r="2"/><circle cx="300" cy="338" r="2.2"/><circle cx="232" cy="346" r="1.8"/><circle cx="368" cy="346" r="1.8"/></g>' +
      '<g stroke="#D8BE8A" fill="none" stroke-width="1" opacity=".7">' +
      '<path d="M300 318c-8-13-24-13-30 0 6 13 22 13 30 0Z"/><path d="M300 318v-14"/>' +
      '<path d="M238 286c-6-10-19-10-24 0 5 10 18 10 24 0Z"/><path d="M362 286c6-10 19-10 24 0-5 10-18 10-24 0Z"/>' +
      '<path d="M300 244c-6-10-19-10-24 0 5 10 18 10 24 0Z"/>' +
      '</g>' +
      '<g fill="#D8BE8A" opacity=".45"><circle cx="96" cy="82" r="2"/><circle cx="120" cy="110" r="1.4"/><circle cx="488" cy="76" r="2"/><circle cx="508" cy="112" r="1.4"/><circle cx="500" cy="330" r="2"/><circle cx="82" cy="318" r="1.6"/></g>' +
      '</svg>',

    party:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artParty" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EAD8AF"/><stop offset="1" stop-color="#CFAF77"/></linearGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artParty)"/>' +
      '<circle cx="118" cy="330" r="118" fill="#F5E8C9" opacity=".35"/>' +
      '<g fill="none" stroke="#0C302A" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M300 34c-11 0-18 8-18 17 0 8 6 14 14 14"/><path d="M298 63 200 110M298 63l98 47"/>' +
      '<path d="M264 126c8-10 21-16 36-16s28 6 36 16l-13 76h-46z"/>' +
      '<path d="M280 130c3 13 10 20 20 20s17-7 20-20"/>' +
      '<path d="M273 202h54l62 146c4 10-4 18-14 18H225c-10 0-18-8-14-18z"/>' +
      '<path d="M300 204v158" stroke-dasharray="2 7" opacity=".45"/>' +
      '<path d="M218 346c22-12 42 8 64-2s40 8 62-2 40 6 58-2" opacity=".8"/>' +
      '<path d="M330 216c28 26 50 58 40 94" stroke-dasharray="2 6" opacity=".4"/>' +
      '</g>' +
      '<g fill="#0C302A" opacity=".75">' +
      '<circle cx="288" cy="238" r="2"/><circle cx="320" cy="252" r="1.6"/><circle cx="274" cy="272" r="1.7"/><circle cx="336" cy="288" r="2"/><circle cx="258" cy="304" r="1.6"/><circle cx="316" cy="320" r="1.5"/><circle cx="350" cy="330" r="1.8"/><circle cx="240" cy="336" r="1.6"/><circle cx="294" cy="300" r="1.4"/><circle cx="382" cy="344" r="1.5"/>' +
      '</g>' +
      '<g fill="none" stroke="#FBF7EE" stroke-width="1.1" opacity=".65">' +
      '<path d="M252 246c-6-9-18-9-22 0 4 9 16 9 22 0Z"/><path d="M348 260c6-9 18-9 22 0-4 9-16 9-22 0Z"/><path d="M300 292c-5-8-15-8-18 0 3 8 13 8 18 0Z"/>' +
      '</g>' +
      '<g fill="#0C302A" opacity=".5"><circle cx="80" cy="92" r="2"/><circle cx="94" cy="118" r="1.3"/><circle cx="512" cy="110" r="1.8"/><circle cx="530" cy="140" r="1.2"/></g>' +
      '</svg>',

    pret:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artPret" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F0E1"/><stop offset="1" stop-color="#E9DCC4"/></linearGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artPret)"/>' +
      '<circle cx="484" cy="100" r="72" fill="#D8BE8A" opacity=".16"/>' +
      '<g stroke="#0C302A" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M300 42c-11 0-18 8-18 17 0 8 6 14 14 14"/><path d="M298 71 214 112M298 71l84 41"/>' +
      '<path d="M300 116c-20 0-36 6-48 18l-42 30 28 42 24-16v78h-58c-8 0-14 5-14 12l8 22h256l8-22c0-7-6-12-14-12h-58v-78l24 16 28-42-42-30c-12-12-28-18-48-18Z"/>' +
      '<path d="M280 122c3 13 10 20 20 20s17-7 20-20"/>' +
      '<path d="M300 200v68" stroke-dasharray="2 7" opacity=".45"/>' +
      '<path d="M212 330c22-8 42 6 62 0s40 6 60 0 44 6 64 0" opacity=".55"/>' +
      '</g>' +
      '<g stroke="#0C302A" fill="none" stroke-width="1.4" opacity=".8">' +
      '<path d="M272 232c-8-12-24-12-30 0 6 12 22 12 30 0Z"/><path d="M272 232v-13"/>' +
      '<path d="M340 256c8-12 24-12 30 0-6 12-22 12-30 0Z"/><path d="M340 256v-13"/>' +
      '<path d="M300 288c-7-10-20-10-25 0 5 10 18 10 25 0Z"/>' +
      '</g>' +
      '<path d="M72 354c80-16 130 14 210 0s120-18 246 2" fill="none" stroke="#0C302A" stroke-width="16" opacity=".09"/>' +
      '<g stroke="#16463C" stroke-width="1" opacity=".4">' +
      '<path d="M96 344v8M120 341v8M144 339v8M168 338v8M192 339v8M216 341v8M240 343v8M264 345v8M288 346v8M312 346v8M336 345v8M360 343v8M384 341v8M408 339v8M432 338v8M456 339v8M480 341v8M504 344v8"/>' +
      '</g>' +
      '<g stroke="#C6A46C" fill="none" stroke-width="1" opacity=".7"><path d="M140 270c-6-9-18-9-22 0 4 9 16 9 22 0Z"/><path d="M462 250c6-9 18-9 22 0-4 9-16 9-22 0Z"/></g>' +
      '</svg>',

    dupatta:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artDup" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123F35"/><stop offset="1" stop-color="#041511"/></linearGradient>' +
      '<linearGradient id="artDupGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4E6C4"/><stop offset=".45" stop-color="#D8BE8A"/><stop offset="1" stop-color="#A98651"/></linearGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artDup)"/>' +
      '<path d="M68 96c64-42 132-18 140 26 8 44-34 66-2 100 32 34 98 18 134 44 36 26 30 78-14 92" fill="none" stroke="#D8BE8A" stroke-width="1" stroke-dasharray="2 8" opacity=".45"/>' +
      '<g>' +
      '<path d="M104 72c86-16 122 38 92 86-26 42-6 66 34 76 66 16 118-12 154 24 30 30 18 78-26 94l-72 26c-38 14-80-8-82-48-2-44 34-62 12-94-20-30-64-24-92-46-34-26-36-78-20-118Z" fill="url(#artDupGold)" opacity=".92"/>' +
      '<path d="M120 82c74-12 106 36 78 80-24 38-2 60 38 72 58 18 108-8 140 24 24 24 14 64-22 78" fill="none" stroke="#FFF4D8" stroke-width="1.4" opacity=".6"/>' +
      '<path d="M96 260c54 26 122 20 168 46 36 20 48 52 32 82" fill="none" stroke="#8C6938" stroke-width="1.2" opacity=".55"/>' +
      '</g>' +
      '<g fill="none" stroke="#7B5A2E" stroke-width="1.3" opacity=".85">' +
      '<path d="M156 122c-9-14-28-14-35 0 7 14 26 14 35 0Z"/><path d="M156 122v-16"/>' +
      '<path d="M252 178c-8-13-25-13-31 0 6 13 23 13 31 0Z"/><path d="M252 178v-15"/>' +
      '<path d="M342 222c-9-14-28-14-35 0 7 14 26 14 35 0Z"/>' +
      '<path d="M414 292c-8-13-25-13-31 0 6 13 23 13 31 0Z"/><path d="M414 292v-15"/>' +
      '</g>' +
      '<g fill="#0C302A" opacity=".55"><circle cx="172" cy="146" r="2"/><circle cx="268" cy="202" r="2"/><circle cx="358" cy="246" r="2"/><circle cx="430" cy="316" r="2"/></g>' +
      '<g fill="#FBF7EE"><circle cx="146" cy="356" r="12"/><circle cx="174" cy="366" r="8"/><circle cx="122" cy="372" r="6"/></g>' +
      '<g fill="none" stroke="#C9B181" stroke-width="1"><circle cx="146" cy="356" r="4"/><circle cx="174" cy="366" r="2.6"/></g>' +
      '</svg>',

    alterations:
      '<svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<defs><linearGradient id="artAlt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F0E1"/><stop offset="1" stop-color="#E7D6B6"/></linearGradient></defs>' +
      '<rect width="600" height="420" fill="url(#artAlt)"/>' +
      '<circle cx="132" cy="90" r="88" fill="#D8BE8A" opacity=".18"/>' +
      '<g fill="none" stroke="#0C302A" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M86 110c58 0 58 66 0 66s-58 66 0 66 58 66 0 66" stroke="#D8BE8A" stroke-width="30" opacity=".85"/>' +
      '<path d="M86 110c58 0 58 66 0 66s-58 66 0 66 58 66 0 66" stroke="#8C6938" stroke-width="30" stroke-dasharray="1 16" opacity=".45"/>' +
      '<path d="M86 98c58 0 58 66 0 66s-58 66 0 66 58 66 0 66" stroke="#6F5129" stroke-width="1" opacity=".5"/>' +
      '<path d="M402 122 310 256M402 258 310 148" stroke-width="2.2"/>' +
      '<circle cx="300" cy="276" r="17" stroke-width="2"/><circle cx="300" cy="128" r="17" stroke-width="2"/>' +
      '<circle cx="368" cy="190" r="4" fill="#0C302A"/>' +
      '<path d="M408 112 436 94M408 268l28 18" stroke-width="1.6" opacity=".5"/>' +
      '<path d="M470 336c-52-14-96 18-148 2" stroke-width="1.6" stroke-dasharray="3 8" opacity=".6"/>' +
      '<path d="M492 342 546 316" stroke-width="2.6"/><ellipse cx="496" cy="340" rx="6" ry="2.4" transform="rotate(-25 496 340)" stroke-width="1.4"/>' +
      '<path d="M496 340c-30 12-54-2-80 6" stroke-width="1.2" opacity=".7"/>' +
      '</g>' +
      '<g stroke="#0C302A" stroke-width="1" opacity=".3">' +
      '<path d="M94 110h12M94 176h12M94 242h12M94 308h12"/>' +
      '</g>' +
      '<g fill="#0C302A" opacity=".5"><circle cx="458" cy="124" r="2"/><circle cx="486" cy="150" r="1.4"/><circle cx="508" cy="108" r="1.6"/></g>' +
      '<path d="M230 384c32-12 64 8 96-2s60 4 92-4" fill="none" stroke="#D8BE8A" stroke-width="14" opacity=".5"/>' +
      '</svg>'
  };

  /* ---------- tiny helpers ---------- */

  function el(id) { return document.getElementById(id); }

  function scrollDocHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
  }

  /* ---------- render: links + mode ---------- */

  function applyLinks(root) {
    (root || document).querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = a.dataset.waTopic
        ? waLink(topicMessage(a.dataset.waTopic))
        : waLink(generalMessage());
      a.target = "_blank";
      a.rel = "noopener";
    });

    (root || document).querySelectorAll("[data-maps]").forEach(function (a) {
      if (cfg.MAPS_URL) a.href = cfg.MAPS_URL;
      a.target = "_blank";
      a.rel = "noopener";
    });

    (root || document).querySelectorAll("[data-map-embed]").forEach(function (frame) {
      if (cfg.MAPS_EMBED_URL) frame.src = cfg.MAPS_EMBED_URL;
    });
  }

  function applyMode() {
    var ribbon = el("demo-ribbon");
    var demoLine = el("demo-footer-line");
    var credit = el("credit-line");

    if (cfg.DEMO_MODE) {
      if (ribbon) {
        ribbon.hidden = false;
        ribbon.textContent = "Demo preview - made for " + BUSINESS_NAME;
      }
      if (demoLine) {
        demoLine.hidden = false;
        demoLine.textContent =
          "Demo preview. Final photos, services and timings will be set together with you.";
      }
      if (credit) credit.hidden = true;
    } else {
      if (ribbon) ribbon.hidden = true;
      if (demoLine) demoLine.hidden = true;
      if (credit) credit.hidden = false;
    }

    syncRibbonHeight();
  }

  /* The ribbon sits above the hero in the flow. Tell the CSS how tall it is so
     the hero still fills exactly one screen instead of pushing its bottom off. */
  function syncRibbonHeight() {
    var ribbon = el("demo-ribbon");
    var h = ribbon && !ribbon.hidden ? ribbon.offsetHeight : 0;
    document.documentElement.style.setProperty("--demo-ribbon-h", h + "px");
  }

  window.addEventListener("resize", syncRibbonHeight, { passive: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncRibbonHeight).catch(function () {});
  }
  if ("ResizeObserver" in window) {
    var ribbonEl = el("demo-ribbon");
    if (ribbonEl) new ResizeObserver(syncRibbonHeight).observe(ribbonEl);
  }

  /* ---------- render: marquee ---------- */

  function renderMarquee() {
    var track = el("marquee-track");
    if (!track || !data.marquee) return;
    var set = data.marquee
      .map(function (item) {
        return (
          '<span class="marquee-item">' +
          item +
          '<span class="marquee-dot" aria-hidden="true"></span></span>'
        );
      })
      .join("");
    track.innerHTML = set + set + set + set;
  }

  /* ---------- render: collections ---------- */

  function renderCollections() {
    var track = el("collections-track");
    if (!track || !data.collections) return;

    track.innerHTML = data.collections
      .map(function (item) {
        var href = waLink(topicMessage(item.ask || item.title));
        return (
          '<article class="collection collection--' +
          item.tone +
          '" data-collection="' +
          item.id +
          '">' +
          '<div class="collection-art">' +
          (art[item.art] || art.custom) +
          "</div>" +
          '<div class="collection-copy">' +
          '<p class="collection-line">' +
          item.line +
          "</p>" +
          '<h3 class="collection-title">' +
          item.title +
          "</h3>" +
          "<p>" +
          item.copy +
          "</p>" +
          '<a class="collection-ask" href="' +
          href +
          '" target="_blank" rel="noopener" aria-label="Ask about ' +
          item.title +
          ' on WhatsApp">Ask on WhatsApp <span aria-hidden="true">↗</span></a>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    /* keyboard scrolling on the native carousel */
    track.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      var card = track.querySelector(".collection");
      if (!card) return;
      var step = card.getBoundingClientRect().width + 16;
      event.preventDefault();
      track.scrollBy({
        left: event.key === "ArrowRight" ? step : -step,
        behavior: "smooth"
      });
    });

    var hint = document.querySelector(".swipe-hint");
    if (hint) {
      track.addEventListener("scroll", function () {
        if (window.matchMedia("(min-width: 1024px)").matches) return;
        if (track.scrollLeft > 24) hint.style.opacity = "0.25";
        else hint.style.opacity = "1";
      }, { passive: true });
    }
  }

  /* ---------- render: reviews ---------- */

  function renderReviews() {
    var track = el("reviews-track");
    if (!track || !data.reviews) return;

    track.innerHTML = data.reviews
      .map(function (review) {
        return (
          '<article class="review-card">' +
          '<span class="review-mark" aria-hidden="true">“</span>' +
          '<p class="review-text">' +
          review.text +
          "</p>" +
          '<div class="review-meta">' +
          '<span class="review-name">' +
          review.name +
          "</span>" +
          '<span class="review-dot" aria-hidden="true"></span>' +
          "<span>" +
          review.meta +
          "</span>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    var prev = el("reviews-prev");
    var next = el("reviews-next");
    var bar = el("reviews-progress-bar");

    function step() {
      var card = track.querySelector(".review-card");
      return card ? card.getBoundingClientRect().width + 14 : 320;
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      if (bar) {
        var scale = 0.2 + ratio * 0.8;
        bar.style.transform = "scaleX(" + scale.toFixed(4) + ")";
      }
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max - 2;
      if (prev) prev.style.opacity = prev.disabled ? "0.35" : "1";
      if (next) next.style.opacity = next.disabled ? "0.35" : "1";
    }

    if (prev) prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    if (next) next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    /* desktop drag with pointer events; touch keeps native scrolling */
    var drag = null;
    track.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse") return;
      drag = { x: event.clientX, left: track.scrollLeft };
      track.classList.add("is-dragging");
      track.setPointerCapture(event.pointerId);
    });
    track.addEventListener("pointermove", function (event) {
      if (!drag) return;
      track.scrollLeft = drag.left - (event.clientX - drag.x);
    });
    function endDrag() {
      if (!drag) return;
      drag = null;
      track.classList.remove("is-dragging");
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", endDrag);

    track.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      track.scrollBy({
        left: event.key === "ArrowRight" ? step() : -step(),
        behavior: "smooth"
      });
    });
  }

  /* ---------- render: steps ---------- */

  function renderSteps() {
    var list = el("steps");
    if (!list || !data.steps) return;
    list.innerHTML = data.steps
      .map(function (step, index) {
        return (
          "<li class=\"step\">" +
          '<span class="step-number" aria-hidden="true">0' +
          (index + 1) +
          "</span>" +
          '<div class="step-body"><h3>' +
          step.title +
          "</h3><p>" +
          step.copy +
          "</p></div>" +
          "</li>"
        );
      })
      .join("");
  }

  /* ---------- render: form options ---------- */

  function renderFormOptions() {
    var interest = el("bf-interest");
    if (interest && data.collections) {
      interest.innerHTML =
        '<option value="" selected disabled></option>' +
        data.collections
          .map(function (item) {
            return '<option value="' + item.title + '">' + item.title + "</option>";
          })
          .join("") +
        '<option value="Something else">Something else</option>';
    }

    var time = el("bf-time");
    if (time && data.form && data.form.times) {
      time.innerHTML =
        '<option value="" selected disabled></option>' +
        data.form.times
          .map(function (item) {
            return '<option value="' + item + '">' + item + "</option>";
          })
          .join("");
    }

    var day = el("bf-day");
    if (day) {
      var today = new Date();
      var iso =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");
      day.min = iso;
    }
  }

  /* ---------- header, progress, thread ---------- */

  function setupScrollUI() {
    var header = el("site-header");
    var bar = el("scroll-progress-bar");
    var threadPath = el("side-thread-path");
    var threadNeedle = el("side-thread-needle");
    var lastY = window.scrollY || 0;
    var ticking = false;

    var threadLength = 0;
    if (threadPath && threadPath.getTotalLength) {
      threadLength = threadPath.getTotalLength();
      threadPath.style.strokeDasharray = threadLength + " " + threadLength;
      threadPath.style.strokeDashoffset = threadLength;
    }

    function paint() {
      var y = window.scrollY || 0;
      var max = scrollDocHeight() - window.innerHeight;
      var progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      if (header) {
        header.classList.toggle("is-scrolled", y > 54);
        if (y > 180 && y > lastY + 3) header.classList.add("is-hidden");
        else if (y < lastY - 3 || y < 120) header.classList.remove("is-hidden");
      }

      if (bar) bar.style.transform = "scaleX(" + progress.toFixed(4) + ")";

      if (threadPath && threadLength) {
        threadPath.style.strokeDashoffset = threadLength * (1 - progress);
        if (threadNeedle) {
          threadNeedle.setAttribute("cy", String(2 + progress * 596));
        }
      }

      lastY = y;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(paint);
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", function () {
      window.requestAnimationFrame(paint);
    });
    paint();
  }

  /* ---------- preloader ---------- */

  function setupPreloader() {
    var preloader = el("preloader");
    if (!preloader) return;
    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      preloader.classList.add("is-done");
      preloader.setAttribute("aria-hidden", "true");
      window.setTimeout(function () {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 1100);
    }

    preloader.addEventListener("click", finish);
    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Enter") finish();
    });

    if (document.readyState === "complete") {
      window.setTimeout(finish, 720);
    } else {
      window.addEventListener("load", function () {
        window.setTimeout(finish, 720);
      }, { once: true });
    }

    /* absolute fallback so the overlay can never trap the page */
    window.setTimeout(finish, 2400);
  }

  /* ---------- init ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyMode();
    applyLinks(document);
    renderMarquee();
    renderCollections();
    renderReviews();
    renderSteps();
    renderFormOptions();

    var year = el("year");
    if (year) year.textContent = String(new Date().getFullYear());

    setupScrollUI();
    setupPreloader();

    /* computed styles rely on the shell being present */
    window.dispatchEvent(new Event("sapna:rendered"));
  });
})();
