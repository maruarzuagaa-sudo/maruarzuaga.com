/* =========================================================
   Core — shared chrome (nav, menu, cursor, footer), smooth scroll,
   page transitions and scroll reveals. Used by every page.
   ========================================================= */
(() => {
  const html = document.documentElement;
  const body = document.body;
  const isTouch = matchMedia('(hover: none)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHome = body.dataset.page === 'home';
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  gsap.registerPlugin(ScrollTrigger);

  const EMAIL = 'maruarzuagaa@gmail.com';
  const WHATSAPP = '59891345926'; // +598 91 345 926
  const SOCIAL = [
    ['Instagram', 'https://www.instagram.com/maruarzu/'],
    ['Behance', 'https://www.behance.net/maruarzuaga'],
    ['LinkedIn', 'https://www.linkedin.com/in/mariaeugeniaarzuaga/'],
  ];
  const LINKS = [[t('nav.work'), '#work'], [t('nav.about'), '#about'], [t('nav.exp'), '#experience'], [t('nav.contact'), '#contact']];
  const base = isHome ? '' : 'index.html';

  const APP = (window.APP = { isTouch, reduced, isHome, EMAIL, WHATSAPP, leaving: false });

  const el = (tag, cls, inner = '') => {
    const n = document.createElement(tag);
    n.className = cls;
    n.innerHTML = inner;
    return n;
  };

  /* ---------- Nav ---------- */
  const nav = el('header', 'nav', `
    <a class="nav__brand micro" href="${isHome ? '#top' : 'index.html'}"><span data-roll>Maru Arzuaga</span></a>
    <span class="nav__role micro">${t('nav.role')}</span>
    <nav class="nav__links micro" aria-label="Main">
      ${LINKS.map(([label, h], i) => `<a href="${base}${h}"><sup>0${i + 1}</sup><span data-roll>${label}</span></a>`).join('')}
    </nav>
    <div class="nav__lang micro" role="group" aria-label="Idioma / Language">
      ${['es', 'en'].map((l) => `<button type="button" data-lang="${l}" lang="${l}" aria-pressed="${l === window.LANG}" class="${l === window.LANG ? 'is-active' : ''}"><span data-roll>${l.toUpperCase()}</span></button>`).join('<span class="nav__lang-sep">/</span>')}
    </div>
    <button class="nav__btn micro" type="button" aria-expanded="false" aria-controls="menu">
      <span class="nav__btn-open">${t('nav.menu')}</span><span class="nav__btn-close">${t('nav.close')}</span>
    </button>`);

  /* ---------- Menu overlay ---------- */
  const menu = el('div', 'menu', `
    <nav class="menu__links" aria-label="Menu">
      ${LINKS.map(([label, h], i) => `<a class="menu__link" href="${base}${h}"><span class="micro">0${i + 1}</span><span class="line"><span>${label}</span></span></a>`).join('')}
    </nav>
    <div class="menu__foot micro">
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <span>${SOCIAL.map(([name, u]) => `<a href="${u}" target="_blank" rel="noopener">${name}</a>`).join(' — ')}</span>
      <span>Maldonado — <span data-time></span></span>
    </div>`);
  menu.id = 'menu';


  /* ---------- Footer: rights + legal links + credit ---------- */
  const legal = body.dataset.page === 'legal' ? '' : 'legal.html';
  const footer = el('footer', 'footer', `
    <div class="footer__row grid micro">
      <span class="c1">© ${new Date().getFullYear()} Maru Arzuaga. ${t('foot.rights')}</span>
      <nav class="c2" aria-label="Legal">
        <a href="${legal}#privacidad" data-label="${t('legal.privacy')}"><span data-roll>${t('legal.privacy')}</span></a>
        <a href="${legal}#derechos" data-label="${t('legal.copyright')}"><span data-roll>${t('legal.copyright')}</span></a>
      </nav>
      <span class="c3">${t('foot.made')}</span>
    </div>`);
  footer.dataset.theme = 'dark';

  body.append(nav, menu);
  document.querySelector('main').after(footer);

  /* ---------- Hover text roll ---------- */
  const roll = (n) => {
    if (n.classList.contains('roll')) return;
    const t = n.textContent;
    n.classList.add('roll');
    n.innerHTML = `<span class="roll__in"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
  };

  /* ---------- Local time ---------- */
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Montevideo' });
  const tick = () => document.querySelectorAll('[data-time]').forEach((n) => (n.textContent = fmt.format(new Date())));
  tick();
  setInterval(tick, 15000);

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  APP.lenis = lenis;

  APP.scrollTo = (target, opts = {}) => {
    let y = target;
    if (typeof target === 'string') {
      if (target === '#top' || target === '#') y = 0;
      else {
        const n = document.querySelector(target);
        if (!n) return;
        y = n.getBoundingClientRect().top + (lenis ? lenis.scroll : scrollY);
      }
    }
    if (lenis) lenis.scrollTo(y, { immediate: !!opts.immediate, duration: opts.duration || 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), force: true });
    else window.scrollTo({ top: y, behavior: opts.immediate || reduced ? 'auto' : 'smooth' });
  };

  /* ---------- Nav: hide on scroll down, show on scroll up ---------- */
  let lastY = 0;
  let menuOpen = false;
  const onScroll = (y) => {
    const d = y - lastY;
    if (Math.abs(d) < 4) return;
    nav.classList.toggle('is-hidden', d > 0 && y > innerHeight * 0.4 && !menuOpen);
    lastY = y;
  };
  if (lenis) lenis.on('scroll', (l) => onScroll(l.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  /* ---------- Menu ---------- */
  const btn = nav.querySelector('.nav__btn');
  const setMenu = (open) => {
    menuOpen = open;
    menu.classList.toggle('is-open', open);
    nav.classList.toggle('is-menu', open);
    btn.setAttribute('aria-expanded', open);
    if (open) {
      lenis && lenis.stop();
      nav.classList.remove('is-hidden');
      gsap.fromTo(menu.querySelectorAll('.menu__link .line > span'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.25 });
    } else lenis && lenis.start();
  };
  btn.addEventListener('click', () => setMenu(!menuOpen));
  addEventListener('keydown', (e) => e.key === 'Escape' && menuOpen && setMenu(false));

  /* ---------- Cursor ---------- */
  if (!isTouch) {
    const cursor = el('div', 'cursor is-out', '<span class="cursor__dot"></span><span class="cursor__label micro"></span>');
    const label = cursor.querySelector('.cursor__label');
    body.append(cursor);
    html.classList.add('has-cursor');
    let mx = 0, my = 0, cx = 0, cy = 0, seen = false;
    addEventListener('pointermove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!seen) { cx = mx; cy = my; seen = true; cursor.classList.remove('is-out'); }
    }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.add('is-out'));
    document.addEventListener('mouseenter', () => seen && cursor.classList.remove('is-out'));
    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    });
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) { label.textContent = t.dataset.cursor; cursor.classList.add('is-label'); }
      else cursor.classList.remove('is-label');
      cursor.classList.toggle('is-link', !t && !!e.target.closest('a, button'));
    });
  }

  /* ---------- Page transitions ---------- */
  const panel = document.querySelector('.pt__panel');
  const ptLabel = panel.querySelector('.pt__label');

  APP.go = (url, label = '') => {
    if (APP.leaving) return;
    APP.leaving = true;
    lenis && lenis.stop();
    ptLabel.textContent = label;
    gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('pt', 'panel');
        // Same URL (e.g. language switch) — a hash-only change would not reload
        if (url === location.href) location.reload();
        else location.href = url;
      },
    })
      .fromTo(panel, { y: 0, yPercent: 101 }, { yPercent: 0, duration: 0.95, ease: 'expo.inOut' })
      .to('main', { y: -innerHeight * 0.12, duration: 0.95, ease: 'expo.inOut' }, 0)
      .fromTo(ptLabel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.55);
  };

  // Image → fullscreen expansion (work scene / next project → project hero)
  APP.expand = (fromEl, src, url) => {
    if (APP.leaving) return;
    APP.leaving = true;
    lenis && lenis.stop();
    const r = fromEl.getBoundingClientRect();
    const c = el('div', 'pt-clone', `<img src="${src}" alt="">`);
    Object.assign(c.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', background: getComputedStyle(fromEl).backgroundColor });
    body.append(c);
    gsap.timeline({ onComplete: () => { sessionStorage.setItem('pt', 'expand'); location.href = url; } })
      .to(c, { left: 0, top: 0, width: innerWidth, height: innerHeight, duration: 1.15, ease: 'expo.inOut' })
      .to('main, .footer', { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0.15);
  };

  // Called by each page once its content is built. Returns the delay to wait before intro animations.
  APP.enter = () => {
    const mode = sessionStorage.getItem('pt');
    sessionStorage.removeItem('pt');
    if (mode === 'panel') {
      gsap.set(panel, { y: 0, yPercent: 0 });
      html.classList.remove('pt-panel');
      gsap.to(panel, { yPercent: -101, duration: 1.1, ease: 'expo.inOut', delay: 0.1 });
      return 0.5;
    }
    html.classList.remove('pt-expand');
    return mode === 'expand' ? 0.05 : 0;
  };

  // Restore state when coming back via browser history (bfcache)
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    APP.leaving = false;
    gsap.set(panel, { yPercent: 101 });
    gsap.set('main, .footer', { clearProps: 'opacity,transform' });
    document.querySelectorAll('.pt-clone').forEach((n) => n.remove());
    lenis && lenis.start();
  });

  /* ---------- Link handling ---------- */
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return;
    const a = e.target.closest('a');
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (menuOpen) setMenu(false);
    if (href.startsWith('#')) {
      e.preventDefault();
      APP.scrollTo(href);
      return;
    }
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) {
      e.preventDefault();
      APP.scrollTo(url.hash);
      return;
    }
    e.preventDefault();
    APP.go(url.href, a.dataset.label || t('pt.home'));
  });

  /* ---------- Language switch (ES default) ---------- */
  nav.querySelectorAll('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      const l = b.dataset.lang;
      if (l === window.LANG || APP.leaving) return;
      try { localStorage.setItem('lang', l); } catch (e) {}
      sessionStorage.setItem('restoreY', String(Math.round(lenis ? lenis.scroll : scrollY)));
      if (menuOpen) setMenu(false);
      APP.go(location.href, l === 'es' ? 'Español' : 'English');
    }));

  // Restore the scroll position after a language switch. Re-applied after late
  // layout refreshes (fonts, images) until the user scrolls. Returns true if restored.
  APP.restore = (after) => {
    const saved = sessionStorage.getItem('restoreY');
    if (saved === null) return false;
    sessionStorage.removeItem('restoreY');
    let active = true;
    const apply = () => {
      if (!active) return;
      lenis ? lenis.scrollTo(+saved, { immediate: true, force: true }) : window.scrollTo(0, +saved);
      ScrollTrigger.update();
      after && after();
    };
    apply();
    ScrollTrigger.addEventListener('refresh', apply);
    const release = () => (active = false);
    ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, release, { once: true, passive: true }));
    setTimeout(release, 4000);
    return true;
  };

  /* ---------- Reveals ---------- */
  APP.splitWords = (n) => {
    if (!n.dataset.split) {
      n.dataset.split = '1';
      n.innerHTML = n.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
    }
    return n.querySelectorAll('.w');
  };

  APP.reveals = (root = document) => {
    root.querySelectorAll('[data-reveal="lines"]').forEach((n) =>
      gsap.from(n.querySelectorAll('.line > span'), { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: n, start: 'top 88%' } }));
    root.querySelectorAll('[data-reveal="fade"]').forEach((n) =>
      gsap.from(n, { y: 34, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: n, start: 'top 90%' } }));
    root.querySelectorAll('[data-reveal="words"]').forEach((n) =>
      gsap.fromTo(APP.splitWords(n), { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: n, start: 'top 85%', end: 'bottom 55%', scrub: true } }));
    root.querySelectorAll('.media[data-reveal]').forEach((m) =>
      gsap.fromTo(m, { clipPath: 'inset(10% 7% 10% 7%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: m, start: 'top 98%', end: 'top 40%', scrub: true } }));
    root.querySelectorAll('.media[data-parallax] img').forEach((img) =>
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  };

  // Light / dark background per section
  APP.themes = () => {
    document.querySelectorAll('[data-theme]').forEach((s) =>
      ScrollTrigger.create({
        trigger: s, start: s.dataset.themeStart || 'top 50%', end: s.dataset.themeEnd || 'bottom 50%',
        refreshPriority: -1, // after the pins inside these sections, so their spacers are measured
        onToggle: (st) => st.isActive && body.classList.toggle('is-dark', s.dataset.theme === 'dark'),
      }));
  };

  // Final step every page calls after building its own scroll scenes
  APP.start = () => {
    document.querySelectorAll('[data-roll]').forEach(roll);
    tick();
    APP.reveals();
    APP.themes();
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
    addEventListener('load', () => ScrollTrigger.refresh());
  };
})();
