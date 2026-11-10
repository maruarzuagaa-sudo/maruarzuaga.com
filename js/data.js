/* =========================================================
   Work data.
   CATEGORIES → one cover each in the home "Selected Work" scene,
   and a page per category (category.html?c=slug) that holds its projects.
   PROJECTS  → shown inside their category page. `layout` picks the presentation:
     'carousel' → swipeable carousel of slides (e.g. Instagram carousel)
     'posts'    → feed posts side by side
     'stories'  → row of 9:16 stories
     'piece'    → main image + format/context + 3 more images (null = placeholder)
     'case'     → main image + what was done / my role / context (only those present) + 3 more images
   Social Media and Papelería don't name clients: they show the pieces with context.
   Translatable fields are { es, en } and read with L() (js/i18n.js).
   Images live in /images/<category>/.
   ========================================================= */

// Social media images have transparent backgrounds: shown on white
const WHITE = '#ffffff';

window.CATEGORIES = [
  {
    slug: 'social-media',
    name: { es: 'Social Media', en: 'Social Media' },
    cover: 'images/social-media/portada.jpg',
  },
  {
    slug: 'branding',
    name: { es: 'Branding', en: 'Branding' },
    cover: 'images/branding/oryen.webp',
  },
  {
    slug: 'papeleria',
    name: { es: 'Papelería', en: 'Print' },
    cover: 'images/brochure/brochure-residencial.jpg',
  },
];

// Real copy
const ROLE_FULL = {
  es: 'Participé en todo el proceso: desde las reuniones iniciales para comprender la marca y su contexto, hasta la ejecución y la presentación final.',
  en: 'I was involved throughout the whole process: from the initial meetings to understand the brand and its context, to execution and the final presentation.',
};

window.PROJECTS = [
  // ---------- Social Media (by format, no client names) ----------
  {
    slug: 'carrusel',
    category: 'social-media',
    layout: 'carousel',
    title: { es: 'Carrusel', en: 'Carousel' },
    format: { es: 'Carrusel · 5 placas · 3:4', en: 'Carousel · 5 slides · 3:4' },
    context: {
      es: 'Carrusel para el lanzamiento de una edición limitada de cápsulas habitables. Cada placa avanza el relato: el producto, el lugar, la oferta, los beneficios y el cierre con llamado a la acción, alternando fotografía nocturna y placas blancas.',
      en: 'Carousel for the launch of a limited edition of living capsules. Each slide moves the story forward: the product, the place, the offer, the benefits and a closing call to action, alternating night photography and white slides.',
    },
    images: [1, 2, 3, 4, 5].map((n) => ({ src: `images/social-media/carrusel/0${n}.jpg`, ratio: '3/4' })),
  },
  {
    slug: 'posts',
    category: 'social-media',
    layout: 'posts',
    title: { es: 'Posts', en: 'Posts' },
    format: { es: 'Posts de feed · 4:5', en: 'Feed posts · 4:5' },
    context: {
      es: 'Piezas de feed para un desarrollo inmobiliario en Punta del Este y una marca de energía solar. Dos lenguajes distintos con la misma búsqueda: un mensaje principal claro, fotografía recortada en formas propias y mucho aire.',
      en: 'Feed pieces for a real estate development in Punta del Este and a solar energy brand. Two different languages with the same aim: one clear main message, photography cut into custom shapes and plenty of space.',
    },
    images: [
      { src: 'images/social-media/posts/01.jpg', ratio: '3/4' },
      { src: 'images/social-media/posts/02.jpg', ratio: '4/5' },
    ],
  },
  {
    slug: 'historias',
    category: 'social-media',
    layout: 'stories',
    title: { es: 'Historias', en: 'Stories' },
    format: { es: 'Historias · 9:16', en: 'Stories · 9:16' },
    context: {
      es: 'Historias para un hotel & residences y un desarrollo inmobiliario en Punta del Este: precios, amenities y planes de financiación presentados con marcos, tipografía serif y ornamentos que traducen la identidad de cada proyecto al formato vertical.',
      en: 'Stories for a hotel & residences and a real estate development in Punta del Este: prices, amenities and financing plans presented with frames, serif typography and ornaments that bring each project’s identity to the vertical format.',
    },
    images: [1, 2, 3, 4, 5].map((n) => ({ src: `images/social-media/historias/0${n}.jpg`, ratio: '9/16' })),
  },

  // ---------- Branding ----------
  {
    slug: 'oryen',
    category: 'branding',
    layout: 'case',
    title: 'Oryen',
    client: 'Oryen',
    year: '2025',
    role: ROLE_FULL,
    images: [
      { src: 'images/branding/oryen.webp', ratio: '16/9' },
      { src: 'images/branding/oryen/paleta.jpg', ratio: '2000/1143' },
      { src: 'images/branding/oryen/logo-negro.jpg', ratio: '1479/2000' },
      { src: 'images/branding/oryen/grilla.jpg', ratio: '2000/1143' },
      { src: 'images/branding/oryen/graficas.jpg', ratio: '2000/1143', label: { es: 'Gráficas', en: 'Charts' }, caption: {
        es: 'Diseño de gráficas para la marca: paneles, indicadores y visualizaciones de datos que traducen información compleja en una lectura clara y ordenada, manteniendo la paleta y el tono tecnológico de la identidad.',
        en: 'Chart design for the brand: panels, indicators and data visualisations that turn complex information into a clear, orderly read, keeping the identity’s palette and technological tone.',
      } },
      { src: 'images/branding/oryen/logo-degradado.jpg', ratio: '2000/1143', label: { es: 'Aplicación', en: 'Application' }, caption: {
        es: 'Aplicación del logotipo sobre un degradado que combina los azules y verdes de la paleta. El fondo suma profundidad y un carácter tecnológico, sin competir con la marca.',
        en: 'The logotype on a gradient that blends the blues and greens of the palette. The background adds depth and a technological feel without competing with the brand.',
      } },
    ],
  },
  {
    slug: 'alvear-plaza',
    category: 'branding',
    layout: 'case',
    title: 'Alvear Plaza',
    client: 'Alvear Plaza, City Bell',
    year: '2025',
    role: ROLE_FULL,
    images: [
      { src: 'images/branding/alvear-plaza.webp', ratio: '16/9' },
      { src: 'images/branding/alvear-plaza/brochure.jpg', ratio: '2000/1333' },
      { src: 'images/branding/alvear-plaza/logo-claro.jpg', ratio: '16/9' },
      { src: 'images/branding/alvear-plaza/moodboard.jpg', ratio: '16/9' },
      // Relato: análisis de audiencia
      { src: 'images/branding/alvear-plaza/audiencia.jpg', ratio: '16/9',
        chapter: { es: 'Análisis de audiencia', en: 'Audience analysis' },
        label: { es: 'Estrategia', en: 'Strategy' },
        caption: {
          es: 'Antes de diseñar, realicé un análisis del público objetivo para el branding: definí perfiles, motivaciones y puntos de dolor que funcionaron como base para cada decisión de la identidad.',
          en: 'Before designing, I carried out a target audience analysis for the branding: I defined profiles, motivations and pain points that became the basis for every identity decision.',
        } },
      // Los dos perfiles, juntos y sin texto
      { src: 'images/branding/alvear-plaza/publico-01.jpg', ratio: '16/9', cls: 'cp__pair-a' },
      { src: 'images/branding/alvear-plaza/publico-02.jpg', ratio: '16/9', cls: 'cp__pair-b' },
      // Relato: identidad visual y aplicaciones
      { src: 'images/branding/alvear-plaza/direccion-de-diseno.jpg', ratio: '16/9',
        chapter: { es: 'Identidad visual y aplicaciones', en: 'Visual identity and applications' },
        label: { es: 'Dirección de diseño', en: 'Design direction' },
        caption: {
          es: 'Definí la dirección de diseño a partir de ese análisis: una identidad que pone en diálogo la memoria residencial de City Bell con una mirada actual sobre la forma de habitar. Armé el moodboard con luz filtrada, texturas naturales y composiciones amplias para construir una atmósfera cálida y atemporal.',
          en: 'I defined the design direction based on that analysis: an identity that brings City Bell’s residential memory into dialogue with a contemporary way of living. I built the moodboard around filtered light, natural textures and open compositions to create a warm, timeless atmosphere.',
        } },
      { src: 'images/branding/alvear-plaza/paleta.jpg', ratio: '16/9',
        label: { es: 'Paleta de colores', en: 'Colour palette' },
        caption: {
          es: 'Construí una paleta de tonos cálidos, neutros y profundos, inspirada en materiales nobles y sombras naturales. Elegí marrones, crudos y tonos tierra para transmitir calma, permanencia y elegancia, alejando la marca de una estética fría.',
          en: 'I built a palette of warm, neutral and deep tones inspired by noble materials and natural shadows. I chose browns, off-whites and earth tones to convey calm, permanence and elegance, keeping the brand away from a cold look.',
        } },
      { src: 'images/branding/alvear-plaza/aplicaciones.jpg', ratio: '16/9',
        label: { es: 'Aplicaciones', en: 'Applications' },
        caption: {
          es: 'Llevé el sistema a sus aplicaciones: diseñé el isotipo para el perfil en redes sociales y apliqué el logotipo sobre madera para mostrar cómo la marca se integra al espacio físico.',
          en: 'I carried the system into its applications: I designed the monogram for the social media profile and applied the logotype on wood to show how the brand integrates into the physical space.',
        } },
      { src: 'images/branding/alvear-plaza/coctel-vertical.jpg', ratio: '1600/2000',
        label: { es: 'La marca en contexto', en: 'The brand in context' },
        caption: {
          es: 'Cerré la presentación con escenas que muestran el tono de la marca en contexto: materiales cálidos, luz baja y el logotipo en una pieza editorial, anticipando la experiencia de vivir en Alvear Plaza.',
          en: 'I closed the presentation with scenes that show the brand’s tone in context: warm materials, low light and the logotype on an editorial piece, anticipating the experience of living at Alvear Plaza.',
        } },
    ],
  },
  {
    slug: 'sportshot',
    category: 'branding',
    layout: 'case',
    title: 'Sportshot',
    client: 'Sportshot',
    year: '2026',
    role: ROLE_FULL,
    images: [
      { src: 'images/branding/sportshot/logotipo.jpg', ratio: '16/9' },
      // Presentación de identidad visual
      { src: 'images/branding/sportshot/portada.jpg', ratio: '16/9', cls: 'cp__pair-a',
        chapter: { es: 'Presentación de identidad visual', en: 'Visual identity presentation' } },
      { src: 'images/branding/sportshot/indice.jpg', ratio: '16/9', cls: 'cp__pair-b' },
      { src: 'images/branding/sportshot/quienes-somos.jpg', ratio: '16/9',
        label: { es: 'Punto de partida', en: 'Starting point' },
        caption: {
          es: 'Partí de entender quién es Sportshot: una empresa familiar uruguaya con diez años de oficio que da el salto a la importación de equipamiento de caza y tiro de precisión. Su diferencial es el asesoramiento de quien practica, y ese respaldo humano fue la base de toda la identidad.',
          en: 'I started by understanding who Sportshot is: a Uruguayan family business with ten years of experience that is stepping into importing hunting and precision shooting equipment. Its edge is advice from people who actually practise, and that human backing became the foundation of the whole identity.',
        } },
      { src: 'images/branding/sportshot/aplicacion-principal.jpg', ratio: '16/9',
        label: { es: 'Aplicación', en: 'Application' },
        caption: {
          es: 'Llevé la identidad a una primera aplicación: el producto en primer plano, un titular en mayúsculas en Gancode Mono y la retícula como recurso para dirigir la mirada.',
          en: 'I took the identity into a first application: the product up front, an uppercase headline in Gancode Mono and the reticle as the device that guides the eye.',
        } },
      { src: 'images/branding/sportshot/papeleria.jpg', ratio: '16/9',
        label: { es: 'Papelería', en: 'Stationery' },
        caption: {
          es: 'Apliqué el degradé y el logotipo a la papelería: cuadernos y tarjetas donde la marca se vuelve un objeto, sobria y reconocible.',
          en: 'I applied the gradient and the logotype to the stationery: notebooks and business cards where the brand becomes an object, sober and recognisable.',
        } },
      { src: 'images/branding/sportshot/web.jpg', ratio: '16/9',
        label: { es: 'Web', en: 'Web' },
        caption: {
          es: 'Llevé el sistema a la web: una home con hero oscuro y secciones claras, el producto como protagonista y los recursos de precisión ordenando la información.',
          en: 'I brought the system to the web: a home page with a dark hero and light sections, the product as the protagonist and the precision devices organising the information.',
        } },
      // Manual de marca: las láminas juntas, como un documento
      { src: 'images/branding/sportshot/objetivo-comunicacion.jpg', ratio: '16/9', cls: 'cp__slide cp__slide--full',
        chapter: { es: 'Manual de marca', en: 'Brand manual' },
        chapterText: {
          es: 'Armé el manual de marca para ordenar cómo se comunica y cómo se ve Sportshot: primero la estrategia, con el objetivo y los momentos de comunicación, y después el sistema visual, con la paleta, el degradé y la tipografía.',
          en: 'I put together the brand manual to set out how Sportshot communicates and how it looks: first the strategy, with the communication goal and moments, and then the visual system, with the palette, the gradient and the typography.',
        } },
      { src: 'images/branding/sportshot/momentos-comunicacion.jpg', ratio: '16/9', cls: 'cp__slide' },
      { src: 'images/branding/sportshot/zafra-del-jabali.jpg', ratio: '16/9', cls: 'cp__slide' },
      { src: 'images/branding/sportshot/paleta.jpg', ratio: '16/9', cls: 'cp__slide' },
      { src: 'images/branding/sportshot/degrade.jpg', ratio: '16/9', cls: 'cp__slide' },
      { src: 'images/branding/sportshot/tipografia-gancode-mono.jpg', ratio: '16/9', cls: 'cp__slide' },
      { src: 'images/branding/sportshot/tipografia-ibm-plex-sans.jpg', ratio: '16/9', cls: 'cp__slide' },
    ],
  },

  // ---------- Papelería (by piece, no client names) ----------
  {
    slug: 'brochure',
    category: 'papeleria',
    layout: 'piece',
    title: { es: 'Brochure', en: 'Brochure' },
    format: { es: 'Brochure apaisado · impreso', en: 'Landscape brochure · print' },
    context: {
      es: 'Brochure para un desarrollo residencial en entorno natural. Fotografía a sangre, titulares en serif con énfasis en cursiva y una lista numerada que ordena la información de seguridad y servicios.',
      en: 'Brochure for a residential development in a natural setting. Full-bleed photography, serif headlines with italic emphasis and a numbered list that organises security and services information.',
    },
    images: [{ src: 'images/brochure/brochure-residencial.jpg', ratio: '3/2' }, null, null, null],
  },
  {
    slug: 'flyer',
    category: 'papeleria',
    layout: 'piece',
    title: { es: 'Flyer', en: 'Flyer' },
    format: { es: 'Flyer e invitación · impreso', en: 'Flyer & invitation · print' },
    context: {
      es: 'Flyer e invitación para una exhibición de polo de alto handicap en Punta del Este. La fotografía protagoniza la pieza y una franja inferior organiza la agenda del evento, la invitación al cóctel y los sponsors.',
      en: 'Flyer and invitation for a high handicap polo exhibition in Punta del Este. Photography leads the piece and a lower band organises the event schedule, the cocktail invitation and the sponsors.',
    },
    images: [{ src: 'images/flyer/sls-polo.jpg', ratio: '3/2' }, null, null, null],
  },
  {
    slug: 'cartel',
    category: 'papeleria',
    layout: 'piece',
    title: { es: 'Cartel', en: 'Billboard' },
    format: { es: 'Cartel de vía pública · impreso', en: 'Outdoor billboard · print' },
    context: {
      es: 'Diseñé un cartel de vía pública para un proyecto residencial en Paysandú. Usé un recorte curvo para dividir la composición entre la vista aérea del desarrollo y los elementos informativos: un headline en serif, tres beneficios con iconografía propia y contacto, pensados para leerse de un vistazo y desde la distancia.',
      en: 'I designed an outdoor billboard for a residential project in Paysandú. I used a curved cut to divide the composition between the aerial view of the development and the information elements: a serif headline, three benefits with custom iconography and contact details, designed to be read at a glance and from a distance.',
    },
    images: [{ src: 'images/papeleria/cartel-residencial.webp', ratio: '3/2' }, null, null, null],
  },
  {
    slug: 'catalogo',
    category: 'papeleria',
    layout: 'piece',
    title: { es: 'Catálogo', en: 'Catalog' },
    format: { es: 'Catálogo de producto · impreso', en: 'Product catalog · print' },
    context: {
      es: 'Realicé un catálogo técnico para sistemas de energía solar. Organicé la información en dos secciones principales que presentan cada sistema con especificaciones claras, visualización del producto y detalles de instalación, manteniendo un equilibrio entre la estética y la claridad de datos.',
      en: 'I created a technical catalog for solar energy systems. I organized the information into two main sections presenting each system with clear specifications, product visualization and installation details, maintaining a balance between aesthetics and data clarity.',
    },
    images: [{ src: 'images/papeleria/catalogo-energia.webp', ratio: '3/2' }, null, null, null],
  },
];
