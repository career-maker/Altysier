/* ==========================================================================
   ALTYSIER GROUP — Homepage
   Vanilla JS reproduction of the MVP reference site's motion system: no
   external animation library. Every feature below is wrapped in its own
   try/catch and gated behind a "ready" class the script itself adds, so a
   failure in one feature (or in none of them) can never leave content
   invisible or scrolling locked — worst case, that one effect is just
   static instead of animated.
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(fn) {
    try { fn(); } catch (err) { if (window.console) console.error('[Altysier]', err); }
  }

  /* ---------------------------------------------------------------------
     Char-split helper — only ever used on elements that contain nothing
     but plain text (nav labels, preloader label), so it never destroys
     nested markup.
     --------------------------------------------------------------------- */
  function splitChars(el) {
    var text = el.textContent;
    el.textContent = '';
    var frag = document.createDocumentFragment();
    var i = 0;
    for (var w = 0; w < text.length; w++) {
      var ch = text[w];
      if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
      var span = document.createElement('span');
      span.className = 'char';
      span.style.setProperty('--i', i++);
      span.textContent = ch;
      frag.appendChild(span);
    }
    el.appendChild(frag);
  }

  run(function () {
    document.querySelectorAll('.text-hover__elem-1, .text-hover__elem-2').forEach(splitChars);
  });

  /* ---------------------------------------------------------------------
     Preloader — char reveal, counted percentage, hard failsafe.
     --------------------------------------------------------------------- */
  var headerEl = document.querySelector('.header');

  function revealHeader() {
    if (headerEl) headerEl.classList.add('is-visible');
  }

  run(function () {
    var preloader = document.querySelector('.preloader');
    var textEl = preloader && preloader.querySelector('.preloader__text');
    var numberEl = preloader && preloader.querySelector('.preloader__progress-number');
    var done = false;

    function finish() {
      if (done) return;
      done = true;
      document.documentElement.style.overflow = '';
      revealHeader();
      if (preloader) {
        preloader.classList.add('is-done');
        window.setTimeout(function () {
          if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 650);
      }
    }

    if (!preloader) { finish(); return; }

    document.documentElement.style.overflow = 'hidden';
    // Absolute worst case: never let the page stay stuck longer than this.
    window.setTimeout(finish, 4500);

    if (prefersReducedMotion) { finish(); return; }

    if (textEl) { splitChars(textEl); textEl.classList.add('js-split'); }

    var begin = function () {
      preloader.classList.add('is-revealing');
      window.setTimeout(function () {
        preloader.classList.add('is-counting');
        var target = numberEl ? Number(numberEl.getAttribute('data-num') || 100) : 100;
        var start = performance.now();
        var duration = 1400;
        function tick(now) {
          var p = Math.min(1, (now - start) / duration);
          if (numberEl) numberEl.textContent = String(Math.ceil(p * target));
          if (p < 1) window.requestAnimationFrame(tick);
          else window.setTimeout(finish, 250);
        }
        window.requestAnimationFrame(tick);
      }, 650);
    };

    if (document.readyState === 'complete') begin();
    else window.addEventListener('load', begin);
  });

  /* ---------------------------------------------------------------------
     Header — hide on scroll down, show on scroll up
     --------------------------------------------------------------------- */
  run(function () {
    if (!headerEl) return;
    var lastY = window.scrollY;
    var ticking = false;
    var THRESHOLD = 90;
    function onScroll() {
      var y = window.scrollY;
      if (y > THRESHOLD && y > lastY) headerEl.classList.add('is-hidden-scroll');
      else headerEl.classList.remove('is-hidden-scroll');
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  });

  /* ---------------------------------------------------------------------
     Mobile hamburger menu
     --------------------------------------------------------------------- */
  run(function () {
    var btn = document.querySelector('.header__hamburger-btn');
    var panel = document.querySelector('.header__hamburger');
    if (!btn || !panel) return;
    function setOpen(open) {
      btn.classList.toggle('active', open);
      panel.classList.toggle('active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }
    btn.addEventListener('click', function () { setOpen(!btn.classList.contains('active')); });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
  });

  /* ---------------------------------------------------------------------
     Scroll reveal — IntersectionObserver
     --------------------------------------------------------------------- */
  run(function () {
    if (!('IntersectionObserver' in window)) return;
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    items.forEach(function (el) { el.classList.add('js-reveal-ready'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  });

  /* ---------------------------------------------------------------------
     Sector explorer tabs
     --------------------------------------------------------------------- */
  run(function () {
    var tabs = document.querySelectorAll('.sector-tab');
    var panelIcon = document.querySelector('[data-panel-icon]');
    var panelIndex = document.querySelector('[data-panel-index]');
    var panelName = document.querySelector('[data-panel-name]');
    var panelCopy = document.querySelector('[data-panel-copy]');
    var panelPhotos = document.querySelectorAll('.sectors__panel-photo');
    if (!tabs.length || !panelName) return;
    function activateTab(tab) {
      tabs.forEach(function (t) {
        t.setAttribute('data-active', 'false');
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
      });
      tab.setAttribute('data-active', 'true');
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      var index = tab.getAttribute('data-index');
      var name = tab.getAttribute('data-name');
      var copy = tab.getAttribute('data-copy');
      var icon = tab.getAttribute('data-icon-target');
      if (panelIndex) panelIndex.textContent = index;
      if (panelName) panelName.textContent = name;
      if (panelCopy) panelCopy.textContent = copy;
      if (panelIcon && icon) {
        panelIcon.querySelectorAll('svg').forEach(function (svg) {
          svg.classList.toggle('hidden', svg.getAttribute('data-icon') !== icon);
        });
      }
      if (icon) {
        panelPhotos.forEach(function (img) {
          img.classList.toggle('is-active', img.getAttribute('data-icon') === icon);
        });
      }
    }
    tabs.forEach(function (tab, i) {
      tab.tabIndex = tab.getAttribute('data-active') === 'true' ? 0 : -1;
      tab.addEventListener('click', function () { activateTab(tab); });
      tab.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1
          : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = tabs[(i + dir + tabs.length) % tabs.length];
        activateTab(next);
        next.focus();
      });
    });
  });

  /* ---------------------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------------------- */
  run(function () {
    document.querySelectorAll('.faq__item').forEach(function (item) {
      var trigger = item.querySelector('.faq__trigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        document.querySelectorAll('.faq__item').forEach(function (i) {
          i.setAttribute('data-open', 'false');
          var t = i.querySelector('.faq__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        item.setAttribute('data-open', isOpen ? 'false' : 'true');
        trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  });

  /* ---------------------------------------------------------------------
     Horizontal scroll-snap strips ("How We Create Value", "Our Business
     Ecosystem") — native CSS scroll-snap does the actual scrolling, so
     this works even without JS. JS only adds prev/next buttons and a
     "01/05" counter that tracks the nearest snapped card.
     --------------------------------------------------------------------- */
  run(function () {
    document.querySelectorAll('[data-strip]').forEach(function (track) {
      var key = track.getAttribute('data-strip');
      var cards = track.children;
      var total = cards.length;
      if (!total) return;

      var prevBtn = document.querySelector('[data-strip-prev="' + key + '"]');
      var nextBtn = document.querySelector('[data-strip-next="' + key + '"]');
      var currentEl = document.querySelector('[data-strip-current="' + key + '"]');

      function step(dir) {
        var card = cards[0];
        var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
        var amount = card.getBoundingClientRect().width + gap;
        track.scrollBy({ left: dir * amount, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
      if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });

      var ticking = false;
      function updateState() {
        ticking = false;
        var atStart = track.scrollLeft <= 1;
        var atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
        if (currentEl) {
          // At either end, the nearest-card-to-left heuristic below can miss
          // by a card or two when the last card can't reach the snap-left
          // position (its width leaves it short of the container edge) —
          // the counter should still read 01 / total there.
          var shown;
          if (atStart) shown = 0;
          else if (atEnd) shown = total - 1;
          else {
            var trackLeft = track.getBoundingClientRect().left;
            shown = 0;
            var closestDist = Infinity;
            for (var i = 0; i < total; i++) {
              var dist = Math.abs(cards[i].getBoundingClientRect().left - trackLeft);
              if (dist < closestDist) { closestDist = dist; shown = i; }
            }
          }
          currentEl.textContent = String(shown + 1).padStart(2, '0');
        }
        if (prevBtn) { prevBtn.disabled = atStart; prevBtn.setAttribute('aria-disabled', String(atStart)); }
        if (nextBtn) { nextBtn.disabled = atEnd; nextBtn.setAttribute('aria-disabled', String(atEnd)); }
      }
      track.addEventListener('scroll', function () {
        if (!ticking) { window.requestAnimationFrame(updateState); ticking = true; }
      }, { passive: true });
      window.addEventListener('resize', updateState);
      updateState();
    });
  });

  /* ---------------------------------------------------------------------
     Misc: back-to-top, footer year
     --------------------------------------------------------------------- */
  run(function () {
    document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.getAttribute('data-scroll-to'));
        if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  });

  run(function () {
    var yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
