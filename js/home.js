/* =========================================================
   Home — loader, hero, about, selected work scene,
   experience, tools, contact.
   ========================================================= */
(() => {
  const html = document.documentElement;
  const { lenis } = APP;
  // The Selected Work scene shows one cover per category
  const P = window.CATEGORIES;
  const N = P.length;
  const countIn = (c) => window.PROJECTS.filter((x) => x.category === c.slug).length;
  const pad2 = (n) => String(n).padStart(2, '0');
  const mm = gsap.matchMedia();

  /* ---------- Hero: tools marquee ---------- */
  const TOOLS = window.TOOL_LOGOS;
  const track = document.querySelector('.marquee__track');
  document.querySelector('.marquee').setAttribute('aria-label', TOOLS.map((x) => x.name).join(', '));
  const set = TOOLS.map((x, i) => `<span class="marquee__item" title="${x.name}"><sup>${pad2(i + 1)}</sup><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${x.path}"/></svg></span>`).join('');
  track.innerHTML = `<div class="marquee__group">${set}${set}</div><div class="marquee__group" aria-hidden="true">${set}${set}</div>`;

  let mx = 0, mdir = -1, gw = 0;
  const measure = () => (gw = track.firstElementChild.offsetWidth);
  measure();
  addEventListener('resize', measure);
  document.fonts && document.fonts.ready.then(measure);
  gsap.ticker.add((t, dt) => {
    const v = lenis ? lenis.velocity : 0;
    if (lenis && lenis.direction) mdir = lenis.direction > 0 ? -1 : 1;
    // continuous drift, accelerated by scroll velocity, direction follows scroll
    mx += mdir * (0.7 + Math.min(Math.abs(v), 60) * 0.28) * (dt / 16.67);
    if (gw) { if (mx <= -gw) mx += gw; else if (mx > 0) mx -= gw; }
    track.style.transform = `translate3d(${mx}px,0,0)`;
  });

  /* ---------- Hero: photos that follow the cursor ---------- */
  if (!APP.isTouch && !APP.reduced) {
    const hero = document.querySelector('.hero');
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.setAttribute('aria-hidden', 'true');
    hero.prepend(trail);
    const PHOTOS = [1, 2, 3, 4, 5].map((n) => `images/me/0${n}.jpg`);
    PHOTOS.forEach((src) => { const i = new Image(); i.src = src; }); // preload
    const pool = Array.from({ length: 5 }, () => {
      const img = document.createElement('img');
      img.className = 'trail__img';
      img.alt = '';
      trail.appendChild(img);
      return img;
    });
    let last = null, n = 0, z = 1;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (last && Math.hypot(x - last.x, y - last.y) < 150) return; // new photo every ~150px of movement
      last = { x, y };
      const img = pool[n % pool.length];
      img.src = PHOTOS[n % PHOTOS.length];
      n++;
      gsap.killTweensOf(img);
      gsap.set(img, { x, y, xPercent: -50, yPercent: -50, zIndex: z++, opacity: 0, scale: 0.9, rotate: gsap.utils.random(-2, 2) });
      gsap.to(img, { opacity: 0.9, scale: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(img, { opacity: 0, scale: 0.97, duration: 0.4, delay: 0.3, ease: 'power1.in' });
    });
    hero.addEventListener('pointerleave', () => (last = null));
  }

  /* ---------- Hero: intro + scroll out ---------- */
  const heroTl = gsap.timeline({ paused: true })
    .from('.hero__hi .line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out' })
    .from('.hero__title .line > span', { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: 0.09 }, '-=.8')
    .from('.hero__tools', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.3, ease: 'expo.inOut' }, '-=1.2')
    .from('.marquee__track', { xPercent: 8, duration: 1.8, ease: 'expo.out' }, '<')
    .from('.nav', { opacity: 0, duration: 1 }, '-=1.4');

  gsap.to('.hero__main', { yPercent: -14, opacity: 0.25, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- Loader ---------- */
  const loaderEl = document.querySelector('.loader');
  const runLoader = () => new Promise((resolve) => {
    sessionStorage.setItem('seen', '1');
    lenis && lenis.stop();
    const num = loaderEl.querySelector('.loader__count');
    const c = { v: 0 };
    gsap.timeline({ onComplete: () => { loaderEl.remove(); lenis && lenis.start(); } })
      .to(c, { v: 100, duration: 2, ease: 'power2.inOut', onUpdate: () => (num.textContent = String(Math.round(c.v)).padStart(3, '0')) })
      .fromTo('.loader__bar span', { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
      .to('.loader__inner > *', { opacity: 0, y: -16, duration: 0.5, ease: 'power2.in', stagger: 0.04 })
      .to(loaderEl, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut', onStart: () => gsap.delayedCall(0.35, resolve) }, '-=.1');
  });

  /* ---------- About: pinned composition (desktop) ---------- */
  const words = APP.splitWords(document.querySelector('.about__statement'));
  // When the breakpoint changes, matchMedia recreates the About pin after the Work pin.
  // Re-sort so every trigger is refreshed in page order (otherwise Work overlaps About
  // and an empty dark spacer appears after Work).
  const resort = () => requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
  mm.add('(min-width: 800px)', () => {
    resort();
    gsap.timeline({ scrollTrigger: { trigger: '.about__pin', start: 'top top', end: '+=150%', pin: true, scrub: true, refreshPriority: 1 } })
      .fromTo('.about__visual', { clipPath: 'inset(16% 22% 16% 22%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, 0)
      .fromTo('.about__visual img', { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1.3 }, 0)
      .fromTo('.about__card', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.35)
      .fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.025, duration: 0.2, ease: 'none' }, 0.1);
  });
  mm.add('(max-width: 799px)', () => {
    resort();
    gsap.fromTo('.about__visual img', { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.about__card', { yPercent: 30, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.about__visual', start: 'top 60%' } });
    gsap.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: '.about__statement', start: 'top 85%', end: 'bottom 55%', scrub: true } });
  });

  /* ---------- Selected Work: scroll-driven 3D scene ---------- */
  const world = document.querySelector('.work__world');
  const stage = document.querySelector('.work__stage');
  world.innerHTML = P.map((p, i) => `
    <a class="work__plane" href="category.html?c=${p.slug}" data-i="${i}" aria-label="${L(p.name)} — ${countIn(p)} ${t('work.projects')}">
      <div class="work__img"${p.bg ? ` style="background:${p.bg}"` : ''}><img src="${p.cover}" alt=""></div>
    </a>`).join('');
  document.querySelector('.work__title-track').innerHTML = P.map((p) => `<span>${L(p.name)}</span>`).join('');
  document.querySelector('.work__meta-track').innerHTML = P.map((p) => `<span>( ${pad2(countIn(p))} ) ${t('work.projects')}</span>`).join('');
  document.querySelector('.work__num-track').innerHTML = P.map((_, i) => `<span>${i + 1}</span>`).join('');
  document.querySelector('.work__count').textContent = `( ${pad2(N)} ) ${t('work.categories')}`;
  const indexEl = document.querySelector('.work__index');
  indexEl.innerHTML = P.map((p, i) => `<li><a href="category.html?c=${p.slug}" data-i="${i}"><span class="n">N.${pad2(i + 1)}</span><span>${L(p.name)}</span></a></li>`).join('');

  const planes = [...world.children].map((el) => ({ el, img: el.querySelector('img') }));
  const indexItems = [...indexEl.children];
  const uiTracks = document.querySelectorAll('.work__title-track, .work__meta-track, .work__num-track');
  const progressBar = document.querySelector('.work__progress span');

  let target = 0, prog = 0, active = -1, opening = false;
  const pin = ScrollTrigger.create({
    trigger: '.work',
    pin: '.work__pin',
    start: 'top top',
    end: () => '+=' + (N - 1) * innerHeight * 0.9,
    invalidateOnRefresh: true,
    onUpdate: (s) => (target = s.progress * (N - 1)),
  });
  const posFor = (i) => pin.start + (i / (N - 1)) * (pin.end - pin.start);

  // Each project sits at a different position/depth; scroll moves the camera through them
  const SIDES = [[-1, 0.3], [1, -0.25], [-0.85, -0.3], [0.9, 0.3], [-1, 0.2], [1, -0.35]];
  let rx = 0, ry = 0, tx = 0, ty = 0;
  if (!APP.isTouch) stage.addEventListener('pointermove', (e) => {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  });

  const render = () => {
    prog += (target - prog) * 0.14;
    if (Math.abs(target - prog) < 0.0005) prog = target;
    const vw = innerWidth, vh = innerHeight, mob = vw < 800;
    const depth = mob ? 900 : 1150;

    rx += (ty - rx) * 0.06; ry += (tx - ry) * 0.06;
    world.style.transform = `rotateX(${-rx * 2.5}deg) rotateY(${ry * 3.5}deg)`;

    planes.forEach(({ el, img }, i) => {
      const d = i - prog;
      const s = SIDES[i % SIDES.length];
      const x = s[0] * d * vw * (mob ? 0.45 : 0.34);
      const y = s[1] * d * vh * 0.5;
      const z = -d * depth;
      const rot = -s[0] * d * 9;
      let o = d < 0 ? 1 + d * 1.9 : 1 - Math.max(0, d - 1.4) * 0.55;
      o = Math.max(0, Math.min(1, o));
      el.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,${z}px) rotateY(${rot}deg)`;
      el.style.opacity = o;
      el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      el.style.zIndex = 1000 - Math.round(d * 100);
      el.style.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none';
      img.style.transform = `scale(${1 + Math.min(Math.abs(d), 1) * 0.28})`;
    });

    uiTracks.forEach((t) => t.style.setProperty('--p', prog));
    progressBar.style.transform = `scaleX(${prog / (N - 1)})`;
    const a = Math.round(prog);
    if (a !== active) {
      active = a;
      indexItems.forEach((li, i) => li.classList.toggle('is-active', i === a));
    }
  };
  gsap.ticker.add(render);

  // Soft snap to the nearest project once scrolling settles
  if (lenis) {
    let snapTimer;
    lenis.on('scroll', () => {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        // Never snap at the edges, so leaving the scene never feels stuck
        if (opening || !pin.isActive || pin.progress < 0.03 || pin.progress > 0.97) return;
        const y = posFor(Math.round(pin.progress * (N - 1)));
        if (Math.abs(lenis.scroll - y) > 2) lenis.scrollTo(y, { duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }, 160);
    });
  }

  const openProject = (i) => {
    if (opening) return;
    opening = true;
    const p = P[i];
    gsap.to('.work__ui', { opacity: 0, duration: 0.4 });
    APP.expand(planes[i].el.querySelector('.work__img'), planes[i].img.currentSrc || planes[i].img.src, `category.html?c=${p.slug}`);
  };

  stage.addEventListener('click', (e) => {
    e.preventDefault();
    const plane = e.target.closest('.work__plane');
    openProject(plane ? +plane.dataset.i : Math.round(prog));
  });
  indexEl.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    const i = +a.dataset.i;
    if (i === active && Math.abs(prog - i) < 0.1) openProject(i);
    else if (lenis) lenis.scrollTo(posFor(i), { duration: 1.2 });
    else scrollTo(0, posFor(i));
  });

  /* ---------- Experience: sticky rolling year ---------- */
  const yearTrack = document.querySelector('.exp__year-track');
  const expItems = gsap.utils.toArray('.exp__item');
  expItems.forEach((it, i) => {
    ScrollTrigger.create({
      trigger: it, start: 'top 60%', end: 'bottom 60%',
      onToggle: (s) => s.isActive && gsap.to(yearTrack, { yPercent: (-100 / expItems.length) * i, duration: 1, ease: 'expo.out' }),
    });
    gsap.from(it.children, { y: 30, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: it, start: 'top 85%' } });
  });

  /* ---------- Tools: drifting typographic composition ---------- */
  gsap.utils.toArray('.tool').forEach((t, i) => {
    const dir = i % 2 ? 1 : -1;
    gsap.fromTo(t.querySelector('.tool__name'),
      { x: () => -dir * innerWidth * 0.05 },
      { x: () => dir * innerWidth * 0.05, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
    ScrollTrigger.create({ trigger: t, start: 'top 58%', end: 'bottom 42%', toggleClass: 'is-active' });
  });

  /* ---------- Contact ---------- */
  const copyBtn = document.querySelector('.contact__copy');
  copyBtn.addEventListener('click', () => {
    const done = () => { copyBtn.textContent = t('contact.copied'); setTimeout(() => (copyBtn.textContent = t('contact.copy')), 1800); };
    navigator.clipboard ? navigator.clipboard.writeText(APP.EMAIL).then(done, done) : done();
  });
  // Message box → opens WhatsApp with the typed message
  const form = document.querySelector('.contact__form');
  const msg = form.querySelector('textarea');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = msg.value.trim();
    const field = msg.closest('.field');
    field.classList.toggle('is-error', !text);
    if (!text) {
      gsap.fromTo(field, { x: -6 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, .3)' });
      msg.focus();
      return;
    }
    window.open(`https://wa.me/${APP.WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  /* ---------- Shared reveals, themes, footer ---------- */
  APP.start();

  /* ---------- Entry sequence ---------- */
  // Coming back from a project: land on the Selected Work scene at that project.
  // Re-applied after late layout refreshes (fonts, images) until the user scrolls.
  let landIdx = null;
  const landWork = () => {
    if (landIdx === null) return;
    const y = posFor(landIdx);
    lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y);
    ScrollTrigger.update();
    target = prog = landIdx;
  };
  const land = () => {
    if (location.hash === '#work') {
      landIdx = Math.min(N - 1, +sessionStorage.getItem('lastCategory') || 0);
      landWork();
      ScrollTrigger.addEventListener('refresh', landWork);
      const release = () => (landIdx = null);
      ['wheel', 'touchstart', 'keydown'].forEach((ev) => addEventListener(ev, release, { once: true, passive: true }));
      setTimeout(release, 4000);
    } else if (location.hash) APP.scrollTo(location.hash, { immediate: true });
  };

  const delay = APP.enter();
  if (!html.classList.contains('no-loader')) runLoader().then(() => heroTl.play());
  else {
    // Language switch keeps the scroll position; otherwise honour the hash
    const restored = APP.restore(() => { prog = target; });
    if (!restored) land();
    const skipIntro = restored || !!location.hash;
    gsap.delayedCall(delay + 0.15, () => heroTl.play(skipIntro ? heroTl.duration() - 0.01 : 0));
  }
})();
