/* =========================================================
   Category page — category.html?c=slug
   Each project of the category is an editorial chapter:
   title + client/year, main image, what was done / my role / context,
   and 3 more images (placeholders while images are missing).
   ========================================================= */
(() => {
  const C = window.CATEGORIES;
  const pad2 = (n) => String(n).padStart(2, '0');
  const slug = new URLSearchParams(location.search).get('c');
  const idx = Math.max(0, C.findIndex((c) => c.slug === slug));
  const cat = C[idx];
  const next = C[(idx + 1) % C.length];
  const list = window.PROJECTS.filter((p) => p.category === cat.slug);
  const countOf = (c) => window.PROJECTS.filter((p) => p.category === c.slug).length;
  sessionStorage.setItem('lastCategory', idx);
  document.title = `${L(cat.name)} — Maru Arzuaga`;

  const bgStyle = (bg) => (bg ? ` style="background:${bg}"` : '');

  // One image slot: nothing is shown while an image is missing
  const slot = (img, n, ratio, cls, p) => {
    if (!img) return '';
    return `<figure class="${cls}">
      <div class="media media--natural" data-reveal style="aspect-ratio:${img.ratio || ratio}${img.bg ? `;background:${img.bg}` : ''}">
        <img src="${img.src}" alt="${L(p.title)} — ${pad2(n)}" loading="lazy">
      </div>
    </figure>`;
  };

  // Extra images below the main one. The first three keep the original asymmetric
  // composition; further images are laid out as a staggered side-by-side pair.
  const GALLERY = [['cp__g1', '4/3'], ['cp__g2', '3/4'], ['cp__g3', '16/9']];
  const MORE = ['cp__g4', 'cp__g5'];
  const gallery = (p) => {
    const extras = p.images.slice(1);
    if (!extras.some(Boolean)) return '';
    let features = 0;
    return `<div class="cp__gallery grid">${extras.map((img, i) => {
      // Images with text are shown as a block: image + text side by side, alternating sides
      if (img && img.caption) {
        const alt = features++ % 2 === 1;
        const tall = img.ratio && (() => { const [w, h] = img.ratio.split('/').map(Number); return h > w; })();
        return `${img.chapter ? `<h3 class="cp__chapter t-l" data-reveal="fade">${L(img.chapter)}</h3>` : ''}
        <div class="cp__feature ${alt ? 'is-alt' : ''} ${tall ? 'is-tall' : ''}">
          ${slot(img, i + 2, img.ratio || '16/9', 'cp__feature-fig', p)}
          <div class="cp__feature-text" data-reveal="fade">
            ${img.label ? `<p class="micro mute">{ ${L(img.label)} }</p>` : ''}
            <p class="t-s">${L(img.caption)}</p>
          </div>
        </div>`;
      }
      if (img && img.cls) return slot(img, i + 2, img.ratio || '16/9', img.cls, p);
      const [cls, ratio] = GALLERY[i] || [MORE[(i - GALLERY.length) % MORE.length], '16/9'];
      return slot(img, i + 2, ratio, cls, p);
    }).join('')}</div>`;
  };

  const realImages = (p) => p.images.filter(Boolean);
  const plainFig = (img, cls, p, n) => `<figure class="${cls}">
      <div class="media media--natural" data-reveal style="aspect-ratio:${img.ratio}${img.bg ? `;background:${img.bg}` : ''}">
        <img src="${img.src}" alt="${L(p.title)} — ${pad2(n)}" loading="lazy">
      </div>
    </figure>`;

  const head = (p, i) => {
    const right = p.layout === 'case' ? p.year : ['carousel', 'posts', 'stories'].includes(p.layout) ? `( ${pad2(realImages(p).length)} ) ${t('c.slides')}` : '';
    return `
      <div class="sec-head grid micro">
        <span>{ ${pad2(i + 1)} / ${pad2(list.length)} }</span>
        <span>${p.layout === 'case' ? L(p.client) : L(p.format)}</span>
        <span class="r">${right}</span>
      </div>
      <h2 class="cp__title t-xl grid" data-reveal="lines"><span class="line"><span>${L(p.title)}</span></span></h2>`;
  };

  // Format + context (pieces shown without client names)
  const info = (p) => `
      <div class="cp__info cp__info--short grid">
        <div class="cp__col" data-reveal="fade"><p class="micro mute">${t('c.format')}</p><p class="t-s">${L(p.format)}</p></div>
        <div class="cp__col cp__col--wide" data-reveal="fade"><p class="micro mute">${t('c.context')}</p><p class="t-s">${L(p.context)}</p></div>
      </div>`;

  const LAYOUTS = {
    // Swipeable carousel, presented like an Instagram carousel
    carousel: (p) => `${info(p)}
      <div class="cr" data-carousel>
        <div class="cr__track" data-cursor="${t('c.drag')}">
          ${realImages(p).map((img, n) => `<figure class="cr__slide">
            <div class="media media--natural" style="aspect-ratio:${img.ratio}"><img src="${img.src}" alt="${L(p.title)} — ${pad2(n + 1)}" loading="lazy" draggable="false"></div>
          </figure>`).join('')}
        </div>
        <div class="cr__ui grid micro">
          <span class="cr__count">01 / ${pad2(realImages(p).length)}</span>
          <div class="cr__bar"><span></span></div>
          <div class="cr__nav">
            <button type="button" class="cr__prev" aria-label="${t('c.prev')}">←</button>
            <button type="button" class="cr__next" aria-label="${t('c.next1')}">→</button>
          </div>
        </div>
      </div>`,
    posts: (p) => `${info(p)}
      <div class="cp__posts grid">${realImages(p).map((img, n) => plainFig(img, `cp__post cp__post--${n + 1}`, p, n + 1)).join('')}</div>`,
    stories: (p) => `${info(p)}
      <div class="cp__stories">${realImages(p).map((img, n) => plainFig(img, 'cp__story', p, n + 1)).join('')}</div>`,
    piece: (p) => {
      const [main] = p.images;
      return `
      <div class="cp__main grid">${slot(main, 1, '16/9', 'cp__main-fig', p)}</div>
      ${info(p)}
      ${gallery(p)}`;
    },
    case: (p) => {
      const [main] = p.images;
      return `
      <div class="cp__main grid">${slot(main, 1, '16/9', 'cp__main-fig', p)}</div>
      <div class="cp__info grid">
        ${[['c.did', p.did], ['c.role', p.role], ['c.context', p.context]].filter(([, v]) => v)
          .map(([k, v]) => `<div class="cp__col" data-reveal="fade"><p class="micro mute">${t(k)}</p><p class="t-s">${L(v)}</p></div>`).join('')}
      </div>
      ${gallery(p)}`;
    },
  };

  const chapter = (p, i) => `
    <article class="cp cp--${p.layout}" id="${p.slug}">
      ${head(p, i)}
      ${LAYOUTS[p.layout](p)}
    </article>`;

  document.getElementById('category').innerHTML = `
    <section class="p-hero" id="top" data-theme="dark">
      <div class="p-hero__media"${bgStyle(cat.bg)}><img src="${cat.cover}" alt=""></div>
      <div class="p-hero__shade"></div>
      <div class="p-hero__top grid micro">
        <span class="c1">{ N.${pad2(idx + 1)} }</span>
        <span class="c2">${t('c.label')}</span>
        <span class="c3">( ${pad2(list.length)} ) ${t('work.projects')}</span>
        <a class="c4" href="index.html#work" data-label="${t('pt.work')}"><span data-roll>${t('c.back')}</span></a>
      </div>
      <h1 class="p-hero__title t-xxl"><span class="line"><span>${L(cat.name)}</span></span></h1>
      <p class="p-hero__scroll micro">${t('p.scroll')}</p>
    </section>

    <div class="cp-wrap" data-theme="light">
      <section class="p-intro grid">
        <p class="p-intro__label micro">{ ${L(cat.name)} }</p>
        ${cat.intro ? `<p class="p-intro__text t-l" data-reveal="words">${L(cat.intro)}</p>` : ''}
        <ol class="cp__toc micro">
          ${list.map((p, i) => `<li><a href="#${p.slug}"><span class="mute">${pad2(i + 1)}</span><span data-roll>${L(p.title)}</span></a></li>`).join('')}
        </ol>
      </section>
      ${list.map(chapter).join('')}
    </div>

    <section class="p-next" data-theme="dark">
      <div class="p-next__head grid micro">
        <span class="c1">${t('c.next')}</span>
        <span class="c2">N.${pad2(C.indexOf(next) + 1)}</span>
        <span class="c3">( ${pad2(countOf(next))} ) ${t('work.projects')}</span>
      </div>
      <a class="p-next__link" href="category.html?c=${next.slug}" data-cursor="${t('c.nextCursor')}">
        <div class="p-next__media"${bgStyle(next.bg)}><img src="${next.cover}" alt=""></div>
        <h2 class="p-next__title t-xxl"><span class="line"><span>${L(next.name)}</span></span></h2>
      </a>
    </section>`;

  /* ---------- Hero: image framed between the text bands, so text never sits on the image ---------- */
  const hero = document.querySelector('.p-hero');
  const heroMedia = hero.querySelector('.p-hero__media');
  const frame = () => {
    const topRow = hero.querySelector('.p-hero__top');
    const title = hero.querySelector('.p-hero__title');
    const top = topRow.offsetTop + topRow.offsetHeight + 18;
    const bottom = hero.offsetHeight - title.offsetTop + 18;
    return `inset(${top}px 0px ${bottom}px 0px)`;
  };
  addEventListener('resize', () => gsap.set(heroMedia, { clipPath: frame() }));

  /* ---------- Hero on scroll ---------- */
  const heroST = { trigger: '.p-hero', start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('.p-hero__media img', { yPercent: 14, scale: 1.08, ease: 'none', scrollTrigger: heroST });
  gsap.to('.p-hero__title', { yPercent: -60, opacity: 0, ease: 'none', scrollTrigger: heroST });

  /* ---------- Next category ---------- */
  gsap.fromTo('.p-next__media', { scale: 0.55 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.p-next', start: 'top bottom', end: 'center center', scrub: true } });
  gsap.from('.p-next__title .line > span', { yPercent: 110, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.p-next__link', start: 'top 70%' } });
  const nextLink = document.querySelector('.p-next__link');
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    const img = nextLink.querySelector('img');
    gsap.to('.p-next__title', { opacity: 0, duration: 0.3 });
    APP.expand(nextLink.querySelector('.p-next__media'), img.currentSrc || img.src, nextLink.href);
  });

  /* ---------- Carousels: drag / swipe, arrows, counter ---------- */
  document.querySelectorAll('[data-carousel]').forEach((cr) => {
    const track = cr.querySelector('.cr__track');
    const slides = [...track.children];
    const count = cr.querySelector('.cr__count');
    const bar = cr.querySelector('.cr__bar span');
    const step = () => slides[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0);
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const i = Math.round(track.scrollLeft / step());
      count.textContent = `${pad2(Math.min(i, slides.length - 1) + 1)} / ${pad2(slides.length)}`;
      bar.style.transform = `scaleX(${max > 0 ? track.scrollLeft / max : 1})`;
    };
    track.addEventListener('scroll', update, { passive: true });
    cr.querySelector('.cr__prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    cr.querySelector('.cr__next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    // Mouse drag (touch uses native swipe)
    let down = false, startX = 0, startLeft = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    addEventListener('pointermove', (e) => { if (down) track.scrollLeft = startLeft - (e.clientX - startX); });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      track.scrollTo({ left: Math.round(track.scrollLeft / step()) * step(), behavior: 'smooth' });
    });
    update();
  });

  APP.start();
  if (!APP.restore() && location.hash) APP.scrollTo(location.hash, { immediate: true });

  /* ---------- Entry ---------- */
  const intro = gsap.timeline({ paused: true })
    .from('.p-hero__title .line > span', { yPercent: 110, duration: 1.5, ease: 'expo.out' })
    .from('.p-hero__top > *, .p-hero__scroll', { opacity: 0, y: 12, duration: 1, ease: 'expo.out', stagger: 0.06 }, '-=1.2')
    .fromTo(heroMedia, { clipPath: 'inset(0px 0px 0px 0px)' }, { clipPath: frame(), duration: 1.3, ease: 'expo.inOut' }, 0);
  const delay = APP.enter();
  gsap.delayedCall(delay + 0.1, () => intro.play());
})();
