/* =========================================================
   Legal page — legal.html (#privacidad, #derechos)
   Base text for a personal portfolio without analytics or accounts.
   Review it before publishing if the site adds tracking, forms or a new domain.
   ========================================================= */
(() => {
  const UPDATED = { es: 'Última actualización: septiembre de 2026', en: 'Last updated: September 2026' };

  const PRIVACY = {
    es: `
      <p>Este sitio es el portfolio personal de Maru Arzuaga (María Eugenia Arzuaga), diseñadora con base en Maldonado, Uruguay. Esta política explica qué datos se tratan cuando lo visitás, en línea con la Ley N.º 18.331 de Protección de Datos Personales de Uruguay.</p>
      <h3 class="micro">Qué datos se recogen</h3>
      <p>El sitio no tiene registro de usuarios, no usa cookies publicitarias ni herramientas de analítica o seguimiento. Solo guarda en tu navegador el idioma que elegiste (almacenamiento local) y datos temporales para las transiciones entre páginas. Esa información no sale de tu dispositivo.</p>
      <h3 class="micro">Contacto por WhatsApp o email</h3>
      <p>El mensaje que escribís en la sección de contacto no se envía ni se guarda en este sitio: se abre WhatsApp con tu texto y sos vos quien decide enviarlo. Si me escribís por WhatsApp o email, uso tu nombre, número o dirección solo para responderte y no los comparto con terceros. Esos servicios aplican sus propias políticas de privacidad.</p>
      <h3 class="micro">Servicios de terceros</h3>
      <p>Para funcionar, el sitio carga tipografías desde Google Fonts y librerías desde jsDelivr. Al cargar esos recursos, esos proveedores pueden recibir datos técnicos como tu dirección IP y tu navegador.</p>
      <h3 class="micro">Tus derechos</h3>
      <p>Podés pedir acceder, rectificar o eliminar cualquier dato personal que me hayas enviado escribiendo a <a href="mailto:maruarzuagaa@gmail.com">maruarzuagaa@gmail.com</a>.</p>`,
    en: `
      <p>This site is the personal portfolio of Maru Arzuaga (María Eugenia Arzuaga), a designer based in Maldonado, Uruguay. This policy explains what data is processed when you visit it, in line with Uruguay’s Personal Data Protection Law No. 18,331.</p>
      <h3 class="micro">What data is collected</h3>
      <p>The site has no user accounts and uses no advertising cookies, analytics or tracking tools. It only stores the language you chose in your browser (local storage) and temporary data for page transitions. That information never leaves your device.</p>
      <h3 class="micro">Contact via WhatsApp or email</h3>
      <p>The message you type in the contact section is not sent or stored by this site: WhatsApp opens with your text and you decide whether to send it. If you write to me via WhatsApp or email, I only use your name, number or address to reply and I don’t share them with third parties. Those services apply their own privacy policies.</p>
      <h3 class="micro">Third-party services</h3>
      <p>To work, the site loads fonts from Google Fonts and libraries from jsDelivr. When loading those resources, these providers may receive technical data such as your IP address and browser.</p>
      <h3 class="micro">Your rights</h3>
      <p>You can ask to access, correct or delete any personal data you sent me by writing to <a href="mailto:maruarzuagaa@gmail.com">maruarzuagaa@gmail.com</a>.</p>`,
  };

  const COPYRIGHT = {
    es: `
      <p>© ${new Date().getFullYear()} Maru Arzuaga. Todos los derechos reservados.</p>
      <p>El diseño de este sitio y los trabajos que se muestran (identidades, piezas gráficas, redes sociales, papelería y demás material) son obra de Maru Arzuaga y se publican con fines de portfolio profesional.</p>
      <p>Las marcas, logotipos y nombres comerciales que aparecen en los proyectos pertenecen a sus respectivos titulares y se muestran solo como parte del trabajo realizado para ellos. Algunas fotografías e imágenes utilizadas dentro de las piezas pueden pertenecer a los clientes o a terceros.</p>
      <p>No está permitido reproducir, copiar, distribuir ni modificar el contenido de este sitio, total o parcialmente, sin autorización previa por escrito. Para consultas sobre el uso de algún material, escribí a <a href="mailto:maruarzuagaa@gmail.com">maruarzuagaa@gmail.com</a>.</p>`,
    en: `
      <p>© ${new Date().getFullYear()} Maru Arzuaga. All rights reserved.</p>
      <p>The design of this site and the work shown (identities, graphic pieces, social media, print and other material) are the work of Maru Arzuaga and are published as a professional portfolio.</p>
      <p>The brands, logos and trade names shown in the projects belong to their respective owners and appear only as part of the work done for them. Some photographs and images used within the pieces may belong to the clients or to third parties.</p>
      <p>Reproducing, copying, distributing or modifying the content of this site, in whole or in part, is not permitted without prior written permission. For questions about using any material, write to <a href="mailto:maruarzuagaa@gmail.com">maruarzuagaa@gmail.com</a>.</p>`,
  };

  document.getElementById('legal').innerHTML = `
    <section class="legal" data-theme="light">
      <h1 class="legal__title t-xxl grid" data-reveal="lines"><span class="line"><span>${t('legal.title')}</span></span></h1>

      <article class="legal__sec grid" id="privacidad">
        <div class="legal__head micro"><span>{ 01 }</span><span>${t('legal.privacy')}</span></div>
        <h2 class="t-l">${t('legal.privacy')}</h2>
        <div class="legal__body t-s">${L(PRIVACY)}</div>
      </article>

      <article class="legal__sec grid" id="derechos">
        <div class="legal__head micro"><span>{ 02 }</span><span>${t('legal.copyright')}</span></div>
        <h2 class="t-l">${t('legal.copyright')}</h2>
        <div class="legal__body t-s">${L(COPYRIGHT)}</div>
        <p class="legal__updated micro mute">${L(UPDATED)}</p>
      </article>
    </section>`;

  document.title = `${t('legal.title')} — Maru Arzuaga`;
  document.body.classList.remove('is-dark');

  APP.start();
  if (!APP.restore() && location.hash) APP.scrollTo(location.hash, { immediate: true });
  APP.enter();
})();
