/* harness.js: shared motion for the Why / What / How tabs. Vanilla, no dependencies.
   Content never stays hidden: reduced motion, ?static=1 or no IntersectionObserver = final state.
   Review hook: ?s=<sectionId> shows only that section (for screenshots). */
(function () {
  var Q = new URLSearchParams(location.search);
  var root = document.documentElement;
  var RM = Q.has('static') || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || !('IntersectionObserver' in window);
  window.HX = { RM: RM };
  if (RM) root.classList.add('static'); else root.classList.add('mo-on');

  // hero headline word by word
  var h1 = document.querySelector('.hero h1');
  if (h1) {
    (function split(el) { [].slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) { var f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(function (t) {
        if (!t) return; if (/^\s+$/.test(t)) f.appendChild(document.createTextNode(t)); else { var s = document.createElement('span'); s.className = 'w'; s.textContent = t; f.appendChild(s); } }); n.replaceWith(f);
      } else split(n); }); })(h1);
    [].slice.call(h1.querySelectorAll('.w')).forEach(function (w, i) { w.style.transitionDelay = (120 + i * 45) + 'ms'; });
    requestAnimationFrame(function () { requestAnimationFrame(function () { h1.classList.add('go'); }); });
    setTimeout(function () { h1.classList.add('go'); }, 400);
  }

  // reveals
  var rvs = [].slice.call(document.querySelectorAll('.rv'));
  if (!RM) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    rvs.forEach(function (el) {
      var sib = el.parentElement ? [].slice.call(el.parentElement.children).filter(function (x) { return x.classList.contains('rv'); }) : [];
      el.style.transitionDelay = Math.min(sib.indexOf(el), 6) * 80 + 'ms'; io.observe(el);
    });
    setTimeout(function () { if (!document.querySelector('.rv.in')) rvs.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  }

  // spotlight
  [].slice.call(document.querySelectorAll('.spot')).forEach(function (c) {
    c.addEventListener('pointermove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
  });

  // flow items light up in sequence when the diagram comes into view
  var flow = document.querySelector('.flow');
  if (flow && !RM) {
    var fo = new IntersectionObserver(function (es) { if (!es[0].isIntersecting) return; fo.disconnect();
      ['a', 'b', 'c'].forEach(function (g, gi) { var els = flow.querySelectorAll('.it[data-g="' + g + '"]');
        [].slice.call(els).forEach(function (el, i) { setTimeout(function () { el.classList.add('lit'); }, gi * 800 + i * 90); setTimeout(function () { el.classList.remove('lit'); }, gi * 800 + 1500); }); });
    }, { threshold: 0.4 }); fo.observe(flow);
  }

  // timeline fill on scroll
  var tl = document.querySelector('.tl');
  function tlUpdate() { if (!tl) return; var r = tl.getBoundingClientRect(), vh = innerHeight;
    var p = RM ? 1 : Math.max(0, Math.min(1, (vh * 0.8 - r.top) / (r.height + vh * 0.25)));
    tl.style.setProperty('--p', p); var cards = tl.querySelectorAll('.card');
    [].slice.call(cards).forEach(function (c, i) { c.classList.toggle('reached', p >= i / (cards.length - 1) - 0.02); }); }

  // count-ups
  var nums = [].slice.call(document.querySelectorAll('[data-count]'));
  if (!RM) {
    var no = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; no.unobserve(e.target);
      var el = e.target, to = +el.dataset.count, t0 = performance.now();
      (function tick(t) { var k = Math.min(1, (t - t0) / 1300), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.textContent = v; if (k < 1) requestAnimationFrame(tick); })(t0);
    }); }, { threshold: 0.6 }); nums.forEach(function (n) { no.observe(n); });
  }

  // progress + nav theme
  var prog = document.querySelector('.prog'), nav = document.querySelector('nav.top'), secs = [].slice.call(document.querySelectorAll('section.s'));
  function onScroll() { var h = document.documentElement;
    if (prog) prog.style.transform = 'scaleX(' + (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) + ')';
    var light = false; secs.forEach(function (s) { var r = s.getBoundingClientRect(); if (r.top <= 44 && r.bottom > 44) light = s.dataset.s === 'light'; });
    if (nav) nav.classList.toggle('lightbar', light); tlUpdate(); }
  addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();

  // review hook
  if (Q.get('s')) { var t = document.getElementById(Q.get('s')); if (t) { secs.forEach(function (x) { if (x !== t) x.style.display = 'none'; }); t.style.marginTop = '0'; t.style.borderRadius = '0'; } }
})();
