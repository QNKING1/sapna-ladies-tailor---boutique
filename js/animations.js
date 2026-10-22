/* ============================================================
   ANIMATIONS — GSAP, ScrollTrigger, Lenis, interactions
   Everything is optional: without the CDN scripts the page is
   still readable and every action still works.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || reduce) {
      document.documentElement.classList.add("static-motion");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("motion");

    /* ---------- smooth scroll ---------- */
    var lenis = null;
    if (window.Lenis) {
      lenis = new window.Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.4
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    /* ---------- anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -64, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    /* ---------- hero entrance ---------- */
    var hero = document.querySelector(".hero");
    var heroLines = gsap.utils.toArray(".hero-line-inner");
    var heroFades = gsap.utils.toArray("[data-hero='fade']");

    if (heroLines.length) {
      gsap.set(heroLines, { yPercent: 112 });
      gsap.set(heroFades, { opacity: 0, y: 18 });
    }

    var heroPlayed = false;
    function playHero() {
      if (heroPlayed) return;
      heroPlayed = true;
      var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (heroLines.length) {
        tl.to(heroLines, { yPercent: 0, duration: 1.1, stagger: 0.09 }, 0);
        tl.to(
          heroFades,
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 },
          0.35
        );
      }
    }

    if (document.readyState === "complete") {
      gsap.delayedCall(0.55, playHero);
    } else {
      window.addEventListener("load", function () {
        gsap.delayedCall(0.55, playHero);
      }, { once: true });
    }
    /* safety: never leave hero text hidden */
    gsap.delayedCall(3.2, playHero);

    /* ---------- hero fallback parallax ---------- */
    if (hero && !hero.classList.contains("webgl-active")) {
      gsap.to(".hero-media", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }
    if (hero) {
      gsap.to(".hero-copy", {
        y: -36,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    /* ---------- generic reveals ---------- */
    gsap.utils.toArray("[data-reveal]").forEach(function (node) {
      var type = node.getAttribute("data-reveal");

      if (type === "lines") {
        var lines = node.querySelectorAll(":scope > span > span");
        if (!lines.length) return;
        gsap.set(lines, { yPercent: 112 });
        gsap.to(lines, {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 84%", once: true }
        });
        return;
      }

      gsap.fromTo(
        node,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true }
        }
      );
    });

    /* section headers that are not wrapped in data-reveal */
    gsap.from(".collections-head > div:first-child", {
      opacity: 0,
      x: -24,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".collections-head", start: "top 88%", once: true }
    });
    gsap.from(".process-head > *", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".process-head", start: "top 86%", once: true }
    });
    gsap.from(".reviews-head .section-title", {
      opacity: 0,
      y: 20,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".reviews-head", start: "top 86%", once: true }
    });

    /* ---------- statement: masked lines + champagne fill ---------- */
    var statement = document.querySelector(".statement");
    var statementFills = gsap.utils.toArray(".statement-fill");
    if (statement && statementFills.length) {
      gsap.set(statementFills, { yPercent: 112 });
      gsap.to(statementFills, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: statement, start: "top 82%", once: true }
      });
      gsap.to(statementFills, {
        "--statement-fill": "100%",
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: statement,
          start: "top 72%",
          end: "bottom 45%",
          scrub: 0.6
        }
      });
    }

    /* ---------- marquee ---------- */
    var marqueeTrack = document.getElementById("marquee-track");
    if (marqueeTrack && marqueeTrack.children.length) {
      var marqueeTween = gsap.to(marqueeTrack, {
        xPercent: -50,
        duration: 46,
        ease: "none",
        repeat: -1
      });
      var marqueeVelocity = 1;
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: function (self) {
          marqueeVelocity = 1 + Math.min(2.4, Math.abs(self.getVelocity()) / 2200);
        }
      });
      gsap.ticker.add(function () {
        marqueeTween.timeScale(marqueeVelocity);
        marqueeVelocity += (1 - marqueeVelocity) * 0.04;
      });
      ["mouseenter", "focusin"].forEach(function (evt) {
        marqueeTrack.parentElement.addEventListener(evt, function () {
          gsap.to(marqueeTween, { timeScale: 0, duration: 0.35 });
        });
      });
      ["mouseleave", "focusout"].forEach(function (evt) {
        marqueeTrack.parentElement.addEventListener(evt, function () {
          gsap.to(marqueeTween, { timeScale: 1, duration: 0.5 });
        });
      });
    }

    /* ---------- collections: pin + horizontal scrub (desktop) ---------- */
    var mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", function () {
      var section = document.querySelector(".collections");
      var track = document.getElementById("collections-track");
      if (!section || !track) return;

      var distance = function () {
        return Math.max(0, track.scrollWidth - window.innerWidth + 80);
      };

      var tween = gsap.to(track, {
        x: function () { return -distance(); },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: function () { return "+=" + distance(); },
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      var cards = gsap.utils.toArray(".collection", track);
      cards.forEach(function (card) {
        var artwork = card.querySelector(".collection-art svg");
        if (!artwork) return;
        gsap.fromTo(
          artwork,
          { xPercent: 3.5, scale: 1.04 },
          {
            xPercent: -3.5,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          }
        );
      });

      return function () {
        gsap.set(track, { clearProps: "transform" });
      };
    });

    /* mobile: gentle reveal for the first cards */
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", function () {
      var cards = gsap.utils.toArray(".collection");
      cards.forEach(function (card, index) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: Math.min(index * 0.04, 0.16),
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 94%",
              once: true
            }
          }
        );
      });
    });

    /* ---------- steps ---------- */
    var steps = gsap.utils.toArray(".step");
    if (steps.length) {
      gsap.fromTo(
        steps,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: ".steps", start: "top 84%", once: true }
        }
      );
    }

    /* ---------- rating counter ---------- */
    var ratingEl = document.getElementById("rating-value");
    if (ratingEl) {
      var target = parseFloat(ratingEl.getAttribute("data-rating")) || 4.4;
      var ratingState = { value: 0 };
      ScrollTrigger.create({
        trigger: ".rating-panel",
        start: "top 78%",
        once: true,
        onEnter: function () {
          gsap.to(ratingState, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: function () {
              ratingEl.textContent = ratingState.value.toFixed(1);
            }
          });
          gsap.from(".rating-panel .stars", {
            opacity: 0,
            scale: 0.82,
            transformOrigin: "0 50%",
            duration: 1.1,
            delay: 0.25,
            ease: "power3.out"
          });
        }
      });
    }

    /* ---------- reviews: gentle card entrance ---------- */
    gsap.from(".review-card", {
      opacity: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: { trigger: ".reviews-wrap", start: "top 82%", once: true }
    });

    /* ---------- WhatsApp chat sequence ---------- */
    var chat = document.getElementById("chat-phone");
    if (chat) {
      var b1 = chat.querySelector('[data-chat="1"]');
      var typing = chat.querySelector('[data-chat="2"]');
      var b3 = chat.querySelector('[data-chat="3"]');
      var chatPlayed = false;

      gsap.set([b1, b3], { opacity: 0, y: 10, scale: 0.98 });
      gsap.set(typing, { opacity: 0, y: 6 });
      if (b1) gsap.set(b1, { transformOrigin: "100% 100%" });
      if (b3) gsap.set(b3, { transformOrigin: "0% 100%" });

      function playChat() {
        if (chatPlayed) return;
        chatPlayed = true;
        var tl = gsap.timeline({ delay: 0.2 });
        tl.to(b1, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" })
          .to(typing, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "+=0.55")
          .to(typing, { opacity: 0, duration: 0.25 }, "+=0.9")
          .to(b3, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
      }

      ScrollTrigger.create({
        trigger: chat,
        start: "top 80%",
        once: true,
        onEnter: playChat
      });
      /* if the section is already on screen at load */
      window.setTimeout(function () {
        var rect = chat.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) playChat();
      }, 1800);
    }

    /* ---------- footer logo draw ---------- */
    var footerPaths = gsap.utils.toArray(".footer-draw");
    if (footerPaths.length) {
      footerPaths.forEach(function (path) {
        var length = 0;
        try { length = path.getTotalLength(); } catch (err) { length = 280; }
        gsap.set(path, {
          strokeDasharray: length + " " + length,
          strokeDashoffset: length
        });
      });
      gsap.to(footerPaths, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".site-footer", start: "top 82%", once: true }
      });
    }

    /* ---------- magnetic buttons ---------- */
    if (finePointer) {
      gsap.utils.toArray(".magnetic").forEach(function (button) {
        var xTo = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
        var yTo = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });

        button.addEventListener("pointermove", function (event) {
          var rect = button.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.16);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.2);
        });
        button.addEventListener("pointerleave", function () {
          xTo(0);
          yTo(0);
        });
      });
    }

    /* ---------- soft custom cursor ---------- */
    var dot = document.getElementById("cursor-dot");
    var ring = document.getElementById("cursor-ring");
    if (finePointer && dot && ring) {
      document.documentElement.classList.add("has-cursor");
      var dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
      var dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
      var ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      var ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      window.addEventListener("pointermove", function (event) {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
      }, { passive: true });

      document.addEventListener("pointerover", function (event) {
        var hot = event.target.closest("a, button, input, select, textarea, .collection");
        ring.classList.toggle("is-link", !!hot);
        dot.classList.toggle("is-link", !!hot);
      });

      document.addEventListener("pointerdown", function () {
        gsap.to(ring, { scale: 0.78, duration: 0.2 });
      });
      document.addEventListener("pointerup", function () {
        gsap.to(ring, { scale: 1, duration: 0.35 });
      });
      document.addEventListener("mouseleave", function () {
        gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
      });
      document.addEventListener("mouseenter", function () {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      });
    }

    /* ---------- refresh after fonts / images ---------- */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        ScrollTrigger.refresh();
      });
    }
    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    }, { once: true });

    /* ---------- keep Lenis + triggers in sync on resize ---------- */
    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        if (lenis) lenis.resize();
        ScrollTrigger.refresh();
      }, 220);
    });

    /* expose a tiny hook for scene.js to refresh after WebGL starts */
    window.SapnaMotion = {
      refresh: function () { ScrollTrigger.refresh(); },
      lenis: lenis
    };
  });
})();
