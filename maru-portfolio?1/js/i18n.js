/* =========================================================
   i18n — ES (default) / EN.
   Static texts use data-i18n="key" (innerHTML), data-i18n-ph (placeholder)
   and data-i18n-cursor (cursor label). Project data uses { es, en } objects via L().
   ========================================================= */
(() => {
  let lang = 'es';
  try { lang = localStorage.getItem('lang') || 'es'; } catch (e) {}
  if (lang !== 'es' && lang !== 'en') lang = 'es';
  window.LANG = lang;
  document.documentElement.lang = lang;

  const D = {
    // Meta
    'meta.title': ['Maru Arzuaga — Diseñadora de marca y visual', 'Maru Arzuaga — Brand &amp; Visual Designer'],

    // Nav / menu / footer
    'nav.work': ['Trabajos', 'Work'],
    'nav.about': ['Sobre mí', 'About'],
    'nav.exp': ['Experiencia', 'Experience'],
    'nav.contact': ['Contacto', 'Contact'],
    'nav.role': ['Diseñadora de marca y visual', 'Brand &amp; Visual Designer'],
    'nav.menu': ['Menú', 'Menu'],
    'nav.close': ['Cerrar', 'Close'],
    'foot.talk': ['{ Hablemos }', '{ Let’s talk }'],
    'foot.proto': ['Portfolio v0.2 — prototipo de estructura', 'Portfolio v0.2 — structure prototype'],
    'foot.back': ['Volver arriba ↑', 'Back to top ↑'],
    'foot.rights': ['Todos los derechos reservados.', 'All rights reserved.'],
    'foot.made': ['Creado por Maru Arzuaga', 'Created by Maru Arzuaga'],
    'legal.privacy': ['Política de privacidad', 'Privacy policy'],
    'legal.copyright': ['Derechos de autor', 'Copyright'],
    'legal.title': ['Legal', 'Legal'],
    'pt.home': ['Maru Arzuaga — Portfolio', 'Maru Arzuaga — Portfolio'],
    'pt.work': ['Trabajos seleccionados', 'Selected Work'],

    // Loader
    'loader.role': ['Diseñadora de marca y visual', 'Brand &amp; Visual Designer'],

    // Hero
    'hero.hi': ['Hola, soy Maru Arzuaga', 'Hi, I’m Maru Arzuaga'],
    'hero.l1': ['Construyo', 'I build'],
    'hero.l2': ['narrativas a través', 'narratives through'],
    'hero.l3': ['del diseño', 'design'],
    'hero.i2': ['Diseñadora de marca y visual', 'Brand &amp; Visual Designer'],
    'hero.i3': ['Desde Maldonado, UY', 'Based in Maldonado, UY'],
    'hero.i4': ['Herramientas ( 06 ) ↓', 'Tools in use ( 06 ) ↓'],

    // About
    'about.head': ['Sobre mí', 'About'],
    'about.headR': ['Maru Arzuaga — Diseñadora visual', 'Maru Arzuaga — Visual Designer'],
    'about.alt': ['Retrato de Maru Arzuaga', 'Portrait of Maru Arzuaga'],
    'about.cardLoc': ['Desde Uruguay', 'Based in Uruguay'],
    'about.cardRole': ['Diseñadora de marca y visual', 'Brand &amp; Visual Designer'],
    'about.cardT1': ['Disfruto involucrarme en el proceso, entendiendo que ahí está gran parte del valor de un proyecto.', 'I enjoy being involved in the process, knowing that’s where much of a project’s value lies.'],
    'about.label': ['Sobre mí como diseñadora', 'About me as a designer'],
    'about.statement': ['Diseñadora y comunicadora visual con más de tres años de experiencia en branding, campañas y contenido editorial, trabajando en diseño y redes sociales para distintos clientes.', 'Visual designer and communicator with over three years of experience in branding, campaigns and editorial content, working on design and social media for a range of clients.'],

    // Work
    'work.head': ['Trabajos seleccionados', 'Selected Work'],
    'work.projects': ['Proyectos', 'Projects'],
    'work.scroll': ['Scrolleá para explorar ↓', 'Scroll to explore ↓'],
    'work.cta': ['( Click para ver la categoría )', '( Click to see the category )'],
    'work.cursor': ['Ver proyecto', 'View project'],
    'work.categories': ['Categorías', 'Categories'],
    'work.catCursor': ['Ver categoría', 'View category'],

    // Category page
    'c.label': ['{ Categoría }', '{ Category }'],
    'c.back': ['( Volver — Trabajos )', '( Back — Work )'],
    'c.view': ['( Ver proyecto → )', '( View project → )'],
    'c.next': ['{ Siguiente categoría }', '{ Next category }'],
    'c.nextCursor': ['Siguiente categoría', 'Next category'],
    'c.did': ['{ Qué se hizo }', '{ What was done }'],
    'c.role': ['{ Mi rol }', '{ My role }'],
    'c.context': ['{ Contexto }', '{ Context }'],
    'c.imagePh': ['Imagen', 'Image'],
    'c.format': ['{ Formato }', '{ Format }'],
    'c.slides': ['Placas', 'Pieces'],
    'c.drag': ['Arrastrá', 'Drag'],
    'c.prev': ['Placa anterior', 'Previous slide'],
    'c.next1': ['Placa siguiente', 'Next slide'],

    // Experience
    'exp.head': ['Experiencia', 'Experience'],
    'exp.headR': ['( 03 ) Capítulos', '( 03 ) Chapters'],
    'exp.l1': ['Más de tres años entre branding,', 'Over three years across branding,'],
    'exp.l2': ['campañas y redes sociales.', 'campaigns and social media.'],
    'exp.yearLabel': ['{ Año de inicio }', '{ Year started }'],

    'exp.w1': ['Oct 2025 — Actualidad', 'Oct 2025 — Present'],
    'exp.r1': ['Diseñadora Creativa', 'Creative Designer'],
    'exp.o1': ['W Media', 'W Media'],
    'exp.d1': ['Desarrollo la comunicación visual de proyectos inmobiliarios y marcas vinculadas al real estate, trabajando para clientes como SLS, Nativo José Ignacio y View Brava.', 'I develop the visual communication of real estate developments and property brands, working for clients such as SLS, Nativo José Ignacio and View Brava.'],
    'exp.p1': ['<li>Gestión de proyectos desde el brief hasta la entrega de archivos finales.</li><li>Diseño de identidades visuales, campañas, brochures y presentaciones comerciales.</li><li>Producción de contenido mensual para redes sociales, incluyendo piezas gráficas, animaciones y edición de video.</li>',
               '<li>Project management from brief to final file delivery.</li><li>Visual identities, campaigns, brochures and sales presentations.</li><li>Monthly social media content, including graphic pieces, animation and video editing.</li>'],

    'exp.w2': ['Oct 2024 — Jun 2025', 'Oct 2024 — Jun 2025'],
    'exp.r2': ['Diseñadora gráfica', 'Graphic Designer'],
    'exp.o2': ['AD Media Solution', 'AD Media Solution'],
    'exp.d2': ['Diseñé piezas para redes sociales, campañas publicitarias y proyectos digitales, adaptando cada propuesta a la identidad y los objetivos de diferentes marcas.', 'I designed pieces for social media, advertising campaigns and digital projects, adapting each proposal to the identity and goals of different brands.'],
    'exp.p2': ['<li>Desarrollo de sistemas visuales y contenidos mensuales para redes sociales.</li><li>Diseño de anuncios digitales, campañas de paid media y piezas orientadas a conversión.</li><li>Creación de interfaces para sitios web y landing pages.</li>',
               '<li>Visual systems and monthly content for social media.</li><li>Digital ads, paid media campaigns and conversion-oriented pieces.</li><li>Interfaces for websites and landing pages.</li>'],

    'exp.w3': ['Feb 2022 — Jul 2023', 'Feb 2022 — Jul 2023'],
    'exp.r3': ['Community manager', 'Community Manager'],
    'exp.o3': ['Emporio de los Sándwiches', 'Emporio de los Sándwiches'],
    'exp.d3': ['Gestioné la comunicación digital de la marca, integrando planificación, creación de contenidos, fotografía y atención de la comunidad.', 'I managed the brand’s digital communication, combining planning, content creation, photography and community management.'],
    'exp.p3': ['<li>Planificación y gestión del calendario de publicaciones.</li><li>Producción de fotografías de producto y piezas gráficas para redes sociales.</li><li>Gestión de mensajes, consultas y comunicación de promociones.</li>',
               '<li>Planning and managing the publishing calendar.</li><li>Product photography and graphic pieces for social media.</li><li>Handling messages, enquiries and promotions.</li>'],

    // Tools
    'tools.head': ['Herramientas', 'Tools'],
    'tools.headR': ['( 06 ) De uso diario', '( 06 ) In daily use'],
    'tools.m1': ['Interfaces y sistemas', 'Interfaces &amp; systems'],
    'tools.m2': ['Identidad y vector', 'Identity &amp; vector'],
    'tools.m3': ['Imagen y retoque', 'Image &amp; retouch'],
    'tools.m4': ['Editorial y maquetación', 'Editorial &amp; layout'],
    'tools.m5': ['Edición de video', 'Video editing'],
    'tools.m6': ['Exploración y proceso', 'Exploration &amp; process'],
    'tools.ai': ['IA', 'AI'],
    'tools.daily': ['Diario', 'Daily'],
    'tools.weekly': ['Semanal', 'Weekly'],
    'tools.perProject': ['Por proyecto', 'Per project'],

    // Contact
    'contact.head': ['Contacto', 'Contact'],
    'contact.headR': ['Disponible para proyectos — 2026', 'Available for projects — 2026'],
    'contact.l1': ['Contacto', 'Contact'],
    'contact.cursor': ['Escribime', 'Write me'],
    'contact.copy': ['( Copiar email )', '( Copy email )'],
    'contact.copied': ['( Copiado )', '( Copied )'],
    'form.name': ['( Nombre )', '( Name )'],
    'form.namePh': ['Tu nombre', 'Your name'],
    'form.email': ['( Email )', '( Email )'],
    'form.emailPh': ['vos@email.com', 'you@email.com'],
    'form.int': ['( Me interesa )', '( Interested in )'],
    'form.other': ['Otro', 'Other'],
    'form.msg': ['( Tu mensaje )', '( Your message )'],
    'form.msgPh': ['Hola Maru, quería contarte sobre…', 'Hi Maru, I wanted to tell you about…'],
    'form.send': ['Enviar por WhatsApp', 'Send via WhatsApp'],
    'form.via': ['Se abre WhatsApp con tu mensaje', 'Opens WhatsApp with your message'],
    'form.note': ['Prototipo visual — todavía sin conectar', 'Visual prototype — not connected yet'],
    'form.thanks': ['Gracias.', 'Thank you.'],
    'form.thanks2': ['Te respondo pronto.', 'I’ll get back to you soon.'],

    // Project page
    'p.close': ['( Cerrar — Índice )', '( Close — Index )'],
    'p.back': ['Volver', 'Back'],
    'p.scroll': ['Scroll ↓', 'Scroll ↓'],
    'p.intro': ['{ Intro }', '{ Intro }'],
    'p.client': ['Cliente', 'Client'],
    'p.category': ['Categoría', 'Category'],
    'p.year': ['Año', 'Year'],
    'p.role': ['Rol', 'Role'],
    'p.detail': ['Detalle', 'Detail'],
    'p.next': ['{ Siguiente proyecto }', '{ Next project }'],
    'p.nextCursor': ['Siguiente proyecto', 'Next project'],
  };

  const i = lang === 'es' ? 0 : 1;
  window.t = (k) => (D[k] ? D[k][i] : k);
  window.L = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] ?? v.en) : v);

  window.applyI18n = (root = document) => {
    root.querySelectorAll('[data-i18n]').forEach((n) => (n.innerHTML = t(n.dataset.i18n)));
    root.querySelectorAll('[data-i18n-ph]').forEach((n) => (n.placeholder = t(n.dataset.i18nPh)));
    root.querySelectorAll('[data-i18n-alt]').forEach((n) => (n.alt = t(n.dataset.i18nAlt)));
    root.querySelectorAll('[data-i18n-cursor]').forEach((n) => (n.dataset.cursor = t(n.dataset.i18nCursor)));
  };
  applyI18n();
  if (document.body.dataset.page === 'home') document.title = t('meta.title').replace('&amp;', '&');
})();
