(() => {
  const canvas = document.getElementById('orb');
  const ctx = canvas.getContext('2d');
  const sitesCanvas = document.getElementById('sites-field');
  const sitesCtx = sitesCanvas.getContext('2d');
  const wrapper = canvas.parentElement;
  const stage = wrapper.closest('.stage');
  const menu = document.querySelector('.menu');
  const content = document.getElementById('section-content');
  const backButton = document.querySelector('.back-button');
  const greeting = document.getElementById('greeting');
  const points = [];
  const sitesDots = Array.from({ length: 2200 }, () => ({ x: Math.random(), y: Math.random(), speed: .0025 + Math.random() * .0045, size: .35 + Math.random() * 1.05, alpha: .2 + Math.random() * .7, glint: Math.random() > .965 }));
  const ABOUT_PORTRAIT = 'assets/tomas-profile.webp';
  const GITHUB_URL = 'https://github.com/tomazit';
  const EMAIL_URL = 'https://mail.google.com/mail/?view=cm&fs=1&to=rainbow85612@gmail.com&su=Consulta%20por%20un%20sitio%20web&body=Hola%20Tom%C3%A1s%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20consultarte%20por%20un%20sitio%20web.';
  const WHATSAPP_URL = 'https://wa.me/5493413690901?text=Hola%20Tom%C3%A1s%2C%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20consultarte%20por%20un%20sitio%20web.';
  const languageStorageKey = 'tomas-portfolio-language';
  const preferredLocale = navigator.languages?.[0] || navigator.language || 'es';
  const localeRegion = preferredLocale.match(/-(?:([a-z]{2})|(\d{3}))$/i)?.[1]?.toUpperCase() || preferredLocale.match(/-(\d{3})$/)?.[1];
  const spanishRegions = new Set(['AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'UY', 'VE', '419']);
  let language = localeRegion ? (spanishRegions.has(localeRegion) ? 'es' : 'en') : (/^es(?:-|$)/i.test(preferredLocale) ? 'es' : 'en');
  try {
    const savedLanguage = localStorage.getItem(languageStorageKey);
    if (savedLanguage === 'es' || savedLanguage === 'en') language = savedLanguage;
  } catch {}
  const englishText = [
    ['¿Qué madrugador, no? Buenos días.', 'An early bird, huh? Good morning.'], ['Buenos días.', 'Good morning.'],
    ['Buenas tardes.', 'Good afternoon.'], ['Buenas noches.', 'Good evening.'],
    ['Es muy tarde para seguir despierto. Buenas noches.', 'It’s very late to still be awake. Good night.'],
    ['En serio, andá a dormir. Buenas noches.', 'Seriously, go to sleep. Good night.'],
    ['A esta altura no sé si decirte buenas noches o buenos días.', 'At this point, I’m not sure whether to say good night or good morning.'],
    ['SITIOS WEB', 'WEBSITES'], ['Sitios web', 'Websites'], ['Sobre mi', 'About me'], ['SOBRE MÍ', 'ABOUT ME'],
    ['Ejemplos', 'Examples'], ['Trabajo en proceso', 'Work in progress'], ['Contacto', 'Contact'], ['CONTACTO', 'CONTACT'], ['VOLVER AL MENÚ', 'BACK TO MENU'],
    ['Desarrollador web.', 'Web developer.'], ['Hablemos', 'Let’s talk'], ['Hablemos<span>.</span>', 'Let’s talk<span>.</span>'], ['Hola, soy<br>Tomás.', 'Hi, I’m<br>Tomás.'], ['Estudio  ·  Servicios  ·  Contacto', 'Studio  ·  Services  ·  Contact'], ['Estudio  ·  Servicios  ·  Proyectos', 'Studio  ·  Services  ·  Projects'], ['Objetos  ·  Colecciones  ·  Bolsa (0)', 'Objects  ·  Collections  ·  Bag (0)'],
    ['¿Tenés una idea en mente?', 'Have an idea in mind?'], ['Contame qué querés crear. Estoy listo para darle forma.', 'Tell me what you’d like to create. I’m ready to help shape it.'],
    ['VER EJEMPLOS', 'VIEW EXAMPLES'], ['Correo', 'Email'], ['Disponible para proyectos', 'Available for projects'],
    ['Desarrollo sitios web a medida: claros, rápidos y bien cuidados.', 'I build custom websites that are clear, fast, and thoughtfully made.'],
    ['Estudiante en la Universidad Tecnológica Nacional y desarrollador web. Empecé a aprender por mi cuenta en 2022 con HTML, CSS y JavaScript, y desde entonces no paré de sumar herramientas. Trabajo con distintos lenguajes, frameworks y modelos para encontrar la solución adecuada para cada proyecto. Hoy armo sitios a medida, cuidando el diseño y los detalles.', 'I study at the National Technological University and work as a web developer. I started learning on my own in 2022 with HTML, CSS, and JavaScript, and have kept adding tools ever since. I work with different languages, frameworks, and models to find the right solution for each project. Today, I build custom websites with care for design and detail.'],
    ['Ejemplos seleccionados', 'Selected examples'], ['Algunas cosas hechas con intención.', 'A few things made with intention.'], ['Ejemplos de sitios web', 'Website examples'], ['Tipos de sitio web', 'Website types'], ['Estado y ubicación', 'Status and location'], ['Mapa de Argentina con Santa Fe resaltada', 'Map of Argentina with Santa Fe highlighted'],
    ['Tienda de ropa', 'Clothing store'], ['Una experiencia de compra simple y cuidada.', 'A simple, thoughtful shopping experience.'], ['Vista conceptual de una tienda de ropa, proyecto próximamente.', 'Concept preview of a clothing store, coming soon.'], ['Próximamente', 'Coming soon'],
    ['Estudio creativo', 'Creative studio'], ['Un sitio visual para un estudio independiente.', 'A visual website for an independent studio.'], ['Vista conceptual de un sitio para un estudio creativo, proyecto próximamente.', 'Concept preview of a creative studio website, coming soon.'], ['Identidad', 'Brand identity'], ['Desarrollo web', 'Web development'],
    ['Panel de métricas', 'Metrics dashboard'], ['Datos importantes, claros de un vistazo.', 'Important data, clear at a glance.'], ['Vista conceptual de un panel de métricas, proyecto próximamente.', 'Concept preview of a metrics dashboard, coming soon.'], ['Panel de datos', 'Data dashboard'], ['Visualización', 'Data visualization'], ['En curso', 'In progress'],
    ['Portfolio interactivo', 'Interactive portfolio'], ['Una presentación digital con movimiento sutil.', 'A digital showcase with subtle motion.'], ['Vista conceptual de un portfolio interactivo, proyecto próximamente.', 'Concept preview of an interactive portfolio, coming soon.'], ['Interacción', 'Interaction'], ['Diseño web', 'Web design'], ['E-commerce', 'E-commerce'],
    ['Landing page', 'Landing page'], ['Sitio corporativo', 'Corporate website'], ['Una página. Un objetivo claro.', 'One page. One clear goal.'], ['Una página enfocada en presentar una propuesta y llevar a una acción concreta: consultar, reservar o comprar.', 'A focused page that presents an offer and guides visitors toward one clear action: inquire, book, or buy.'],
    ['Lanzamientos, campañas, servicios puntuales o una nueva marca que necesita darse a conocer.', 'Launches, campaigns, focused services, or a new brand building awareness.'], ['Presentación, beneficios, prueba social y un llamado a la acción directo.', 'An introduction, benefits, social proof, and a clear call to action.'], ['Baja', 'Low'], ['Menos páginas y un recorrido simple. Puede crecer con integraciones o contenido especial.', 'Fewer pages and a simple journey. It can grow with integrations or custom content.'],
    ['Toda tu marca, bien presentada.', 'Your brand, presented with clarity.'], ['Un sitio con varias secciones para explicar quién sos, qué ofrecés y por qué elegirte, con una presencia sólida y profesional.', 'A multi-section website that explains who you are, what you offer, and why people should choose you—with a confident, professional presence.'], ['Empresas, profesionales, estudios y organizaciones con varios servicios o proyectos para mostrar.', 'Businesses, professionals, studios, and organizations with multiple services or projects to showcase.'], ['Inicio, servicios, equipo o historia, trabajos destacados y formas de contacto.', 'Home, services, team or story, featured work, and ways to get in touch.'], ['Media', 'Medium'], ['Requiere organizar varias secciones. Idiomas, formularios e integraciones suman alcance.', 'Several sections need planning. Languages, forms, and integrations add scope.'],
    ['Tu catálogo, listo para vender.', 'Your catalog, ready to sell.'], ['Una tienda online que organiza tus productos y acompaña a cada cliente desde el descubrimiento hasta la compra.', 'An online store that organizes your products and guides customers from discovery to checkout.'], ['Marcas y comercios que quieren vender productos por internet y gestionar pedidos.', 'Brands and retailers looking to sell products online and manage orders.'], ['Catálogo, fichas de producto, carrito y conexión con pagos y envíos según el proyecto.', 'Catalog, product pages, cart, and payment and shipping integrations tailored to the project.'], ['Alta', 'High'], ['Productos, pagos, logística y gestión requieren más configuración e integración.', 'Products, payments, logistics, and order management require more setup and integration.'],
    ['GUÍA PARA ELEGIR', 'A GUIDE TO CHOOSING'], ['IDEAL PARA', 'IDEAL FOR'], ['SUELE INCLUIR', 'USUALLY INCLUDES'], ['COMPLEJIDAD', 'COMPLEXITY'], ['Complejidad orientativa:', 'Estimated complexity:'], ['nivel', 'level'], ['de 3', 'out of 3'],
    ['Expandir demostración', 'Expand demo'], ['Ver en pantalla completa', 'View full screen'], ['Expandir', 'Expand'], ['Volver a la vista previa', 'Back to preview'], ['Desmaximizar ventana', 'Exit full screen'], ['Ver más de la demostración', 'See more of the demo'], ['Ver más', 'See more'],
    ['Cada sitio se diseña a medida. Estos ejemplos muestran distintas formas de presentar tu proyecto.', 'Every website is custom designed. These examples show different ways to present your project.'], ['Dominio y DNS', 'Domain & DNS'], ['Hosting', 'Hosting'], ['Redes y contacto', 'Social & contact'], ['Correo electrónico', 'Email'], ['Demostración a pantalla completa:', 'Full-screen demo:'], ['sitio web', 'website'],
    ['Empezar', 'Get started'], ['Diseñado con intención · Rosario, Argentina', 'Thoughtfully designed · Rosario, Argentina'], ['UNA SOLA PÁGINA · UNA IDEA CLARA', 'ONE PAGE · ONE CLEAR IDEA'], ['Tu próxima idea merece espacio.', 'Your next idea deserves room.'], ['Una página directa, pensada para presentar un producto, servicio o lanzamiento.', 'A focused page to introduce a product, service, or launch.'], ['Conocer el proyecto', 'Explore the project'], ['Una experiencia para descubrir sin apuro.', 'An experience to explore at your own pace.'], ['01 — Una idea', '01 — One idea'], ['02 — Un nuevo comienzo', '02 — A fresh start'], ['EL FUTURO', 'THE FUTURE'], ['SE SIENTE', 'FEELS CLOSER'], ['DESLIZÁ PARA DESCUBRIR', 'SCROLL TO DISCOVER'],
    ['UNA PÁGINA. UNA HISTORIA.', 'ONE PAGE. ONE STORY.'], ['Todo empieza con una buena primera impresión.', 'It all starts with a great first impression.'], ['Una landing page reúne lo esencial en un recorrido claro: presenta una propuesta, despierta interés y acompaña a cada persona hacia el siguiente paso.', 'A landing page brings everything together in a clear journey: it presents an offer, sparks interest, and guides visitors to the next step.'], ['Mensaje claro', 'A clear message'], ['Una propuesta concreta que se entiende desde el primer vistazo.', 'A focused offer people understand at a glance.'], ['Diseño con intención', 'Intentional design'], ['Jerarquía visual para destacar lo que hace única a tu idea.', 'Visual hierarchy that highlights what makes your idea unique.'], ['Acción sencilla', 'A simple next step'], ['Un camino directo para conocer, consultar o empezar.', 'A direct path to learn more, ask a question, or get started.'],
    ['COLECCIÓN 01', 'COLLECTION 01'], ['Un momento<br>para vos.', 'A moment<br>for yourself.'], ['HECHA PARA TU LANZAMIENTO', 'MADE FOR YOUR LAUNCH'], ['Una experiencia que deja huella.', 'An experience that leaves a mark.'], ['Desde una nueva marca hasta un servicio especial, cada detalle de la página acompaña la personalidad de tu proyecto. Contenido breve, visuales expresivos y una invitación a dar el próximo paso.', 'From a new brand to a special service, every detail reflects your project’s personality. Concise copy, expressive visuals, and an invitation to take the next step.'], ['Contanos tu idea', 'Tell us your idea'], ['Una idea merece un espacio propio para crecer.', 'Every idea deserves room to grow.'], ['UNA LANDING PAGE PENSADA PARA CONECTAR', 'A LANDING PAGE MADE TO CONNECT'], ['EL PRIMER PASO PUEDE SER SIMPLE', 'THE FIRST STEP CAN BE SIMPLE'], ['Hagamos lugar<br>a tu próxima idea.', 'Make room<br>for your next idea.'], ['Empezar una conversación', 'Start a conversation'],
    ['Ideas digitales', 'Digital ideas'], ['UNA PRESENCIA SÓLIDA PARA TU MARCA', 'A STRONG PRESENCE FOR YOUR BRAND'], ['Espacios que cuentan historias.', 'Spaces that tell stories.'], ['Una web para explicar quién sos, qué hacés y por qué elegirte.', 'A website to explain who you are, what you do, and why people should choose you.'], ['Ver proyectos', 'View projects'], ['ROSARIO, ARGENTINA', 'ROSARIO, ARGENTINA'], ['DISEÑO CON INTENCIÓN', 'INTENTIONAL DESIGN'], ['EL ESTUDIO', 'THE STUDIO'], ['Ideas sólidas.<br>Espacios que inspiran.', 'Solid ideas.<br>Spaces that inspire.'], ['Somos un equipo independiente que conecta arquitectura, paisaje y vida cotidiana. Trabajamos de forma cercana, desde la primera conversación hasta el último detalle.', 'We are an independent team connecting architecture, landscape, and everyday life. We work closely with clients, from the first conversation to the final detail.'], ['AÑOS DE OFICIO', 'YEARS OF EXPERIENCE'], ['PROYECTOS REALIZADOS', 'PROJECTS COMPLETED'], ['CIUDADES', 'CITIES'], ['QUÉ HACEMOS', 'WHAT WE DO'], ['Un proceso completo,<br>con una mirada común.', 'A complete process,<br>guided by one vision.'], ['Arquitectura', 'Architecture'], ['Proyectos residenciales y comerciales pensados para durar.', 'Residential and commercial projects built to last.'], ['Interiorismo', 'Interior design'], ['Materiales, luz y proporciones en equilibrio.', 'Materials, light, and proportion in balance.'], ['Dirección de obra', 'Project management'], ['Seguimiento cercano para que cada idea llegue a buen puerto.', 'Hands-on guidance to bring every idea to life.'], ['PROYECTO DESTACADO', 'FEATURED PROJECT'], ['CASA ENTRE ÁRBOLES · 2025', 'HOUSE AMONG TREES · 2025'], ['Una casa abierta<br>a la luz del norte.', 'A home open<br>to the northern light.'], ['Materiales honestos y una relación directa con el paisaje crean un refugio simple para vivir mejor.', 'Honest materials and a close connection to the landscape create a simple retreat for better living.'], ['Ver el proyecto', 'View project'], ['¿Imaginamos<br>algo juntos?', 'Shall we imagine<br>something together?'], ['Nos gusta escuchar ideas nuevas.', 'We love hearing new ideas.'], ['Escribir al estudio', 'Contact the studio'], ['HABLEMOS', 'LET’S TALK'],
    ['TU TIENDA, ABIERTA TODOS LOS DÍAS', 'YOUR STORE, OPEN EVERY DAY'], ['Pequeños objetos, grandes momentos.', 'Small objects, meaningful moments.'], ['Una tienda simple de recorrer, con productos, detalles y una compra clara.', 'An easy-to-browse shop with considered products, thoughtful details, and a clear checkout.'], ['Explorar colección', 'Explore the collection'], ['HECHO EN ARGENTINA · ENVÍOS A TODO EL PAÍS', 'MADE IN ARGENTINA · SHIPPING NATIONWIDE'], ['OBJETOS<br>PARA HABITAR', 'OBJECTS<br>TO LIVE WITH'], ['PIEZAS ÚNICAS', 'ONE-OF-A-KIND PIECES'], ['DISEÑO LOCAL', 'LOCAL DESIGN'], ['MATERIALES NOBLES', 'NATURAL MATERIALS'], ['HECHO CON CALMA', 'MADE WITH CARE'], ['DESCUBRÍ CASA BOSQUE', 'DISCOVER CASA BOSQUE'], ['Objetos para cada rincón.', 'Objects for every corner.'], ['VER TODAS LAS CATEGORÍAS →', 'VIEW ALL CATEGORIES →'], ['CERÁMICA', 'CERAMICS'], ['ILUMINACIÓN', 'LIGHTING'], ['TEXTILES', 'TEXTILES'], ['SELECCIÓN DE LA CASA', 'THE HOUSE EDIT'], ['Favoritos de temporada.', 'Seasonal favorites.'], ['VER COLECCIÓN →', 'VIEW COLLECTION →'], ['Jarrón Arcilla', 'Clay Vase'], ['Lámpara Alba', 'Alba Lamp'], ['Cuenco Río', 'Río Bowl'], ['Textil Siesta', 'Siesta Throw'], ['HECHO A MANO<br>EN PEQUEÑAS SERIES', 'HANDMADE<br>IN SMALL BATCHES'], ['EL VALOR DE LO HECHO DESPACIO', 'THE VALUE OF SLOW MAKING'], ['Diseño que se queda.', 'Design that stays.'], ['Elegimos piezas que encuentran su lugar en tu casa y te acompañan por mucho tiempo. Producción local, materiales nobles y cuidado en cada terminación.', 'We choose pieces that feel at home and stay with you for years. Local production, natural materials, and care in every finish.'], ['Conocer nuestra historia', 'Our story'], ['UNA CARTA DESDE CASA', 'A LETTER FROM HOME'], ['Novedades, ideas<br>y pequeños hallazgos.', 'News, ideas,<br>and little discoveries.'], ['Recibí novedades de la tienda y una nota de inspiración de vez en cuando.', 'Get shop updates and an occasional note of inspiration.'], ['Tu correo electrónico', 'Your email address'], ['SUMARME →', 'SIGN ME UP →']
  ];
  function localizeMarkup(markup) {
    if (language !== 'en') return markup;
    let result = englishText.slice().sort((a, b) => b[0].length - a[0].length).reduce((html, [source, target]) => html.split(source).join(target), markup);
    const email = 'https://mail.google.com/mail/?view=cm&fs=1&to=rainbow85612@gmail.com&su=Website%20inquiry&body=Hi%20Tom%C3%A1s%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20ask%20you%20about%20a%20website.';
    const whatsapp = 'https://wa.me/5493413690901?text=Hi%20Tom%C3%A1s%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20ask%20you%20about%20a%20website.';
    return result.split(EMAIL_URL).join(email).split(WHATSAPP_URL).join(whatsapp);
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canParallax = !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const projectPreview = document.getElementById('project-preview');
  const count = 1400;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  let width = 0, height = 0, dpr = 1, rotation = 0, lastTime = 0, baseOrbWidth = 0, canvasCapacityWidth = 0;
  let sitesWidth = 0, sitesHeight = 0, sitesDpr = 1;
  let pointer = { x: 0, y: 0, targetX: 0, targetY: 0, hover: 0, targetHover: 0 };

  const projects = [
    { title: 'Tienda de ropa', description: 'Una experiencia de compra simple y cuidada.', technologies: ['Diseño web', 'E-commerce'], yearOrStatus: 'Próximamente', image: 'assets/projects/tienda-de-ropa.webp', url: 'https://example.com/tienda-de-ropa', alt: 'Vista conceptual de una tienda de ropa, proyecto próximamente.' },
    { title: 'Estudio creativo', description: 'Un sitio visual para un estudio independiente.', technologies: ['Identidad', 'Desarrollo web'], yearOrStatus: 'Próximamente', image: 'assets/projects/estudio-creativo.webp', url: 'https://example.com/estudio-creativo', alt: 'Vista conceptual de un sitio para un estudio creativo, proyecto próximamente.' },
    { title: 'Panel de métricas', description: 'Datos importantes, claros de un vistazo.', technologies: ['Panel de datos', 'Visualización'], yearOrStatus: 'En curso', image: 'assets/projects/panel-de-metricas.webp', url: 'https://example.com/panel-de-metricas', alt: 'Vista conceptual de un panel de métricas, proyecto próximamente.' },
    { title: 'Portfolio interactivo', description: 'Una presentación digital con movimiento sutil.', technologies: ['Portfolio', 'Interacción'], yearOrStatus: 'Próximamente', image: 'assets/projects/portfolio-interactivo.webp', url: 'https://example.com/portfolio-interactivo', alt: 'Vista conceptual de un portfolio interactivo, proyecto próximamente.' }
  ];
  let activePreviewIndex = 0;
  let expandedPreviewTrigger = null;

  const websiteExamples = [
    { id: 'landing', label: 'Landing page', icon: 'spark', guideTitle: 'Una página. Un objetivo claro.', guideSummary: 'Una página enfocada en presentar una propuesta y llevar a una acción concreta: consultar, reservar o comprar.', idealFor: 'Lanzamientos, campañas, servicios puntuales o una nueva marca que necesita darse a conocer.', includes: 'Presentación, beneficios, prueba social y un llamado a la acción directo.', complexity: 'Baja', complexityLevel: 1, complexityNote: 'Menos páginas y un recorrido simple. Puede crecer con integraciones o contenido especial.', eyebrow: 'UNA SOLA PÁGINA · UNA IDEA CLARA', brand: 'AURA', navigation: 'Estudio  ·  Servicios  ·  Contacto', title: 'Tu próxima idea merece espacio.', description: 'Una página directa, pensada para presentar un producto, servicio o lanzamiento.', action: 'Conocer el proyecto', kind: 'landing' },
    { id: 'corporate', label: 'Sitio corporativo', icon: 'building', guideTitle: 'Toda tu marca, bien presentada.', guideSummary: 'Un sitio con varias secciones para explicar quién sos, qué ofrecés y por qué elegirte, con una presencia sólida y profesional.', idealFor: 'Empresas, profesionales, estudios y organizaciones con varios servicios o proyectos para mostrar.', includes: 'Inicio, servicios, equipo o historia, trabajos destacados y formas de contacto.', complexity: 'Media', complexityLevel: 2, complexityNote: 'Requiere organizar varias secciones. Idiomas, formularios e integraciones suman alcance.', eyebrow: 'UNA PRESENCIA SÓLIDA PARA TU MARCA', brand: 'ESTUDIO NORTE', navigation: 'Estudio  ·  Servicios  ·  Proyectos', title: 'Espacios que cuentan historias.', description: 'Una web para explicar quién sos, qué hacés y por qué elegirte.', action: 'Ver proyectos', kind: 'corporate' },
    { id: 'commerce', label: 'eCommerce', icon: 'bag', guideTitle: 'Tu catálogo, listo para vender.', guideSummary: 'Una tienda online que organiza tus productos y acompaña a cada cliente desde el descubrimiento hasta la compra.', idealFor: 'Marcas y comercios que quieren vender productos por internet y gestionar pedidos.', includes: 'Catálogo, fichas de producto, carrito y conexión con pagos y envíos según el proyecto.', complexity: 'Alta', complexityLevel: 3, complexityNote: 'Productos, pagos, logística y gestión requieren más configuración e integración.', eyebrow: 'TU TIENDA, ABIERTA TODOS LOS DÍAS', brand: 'CASA BOSQUE', navigation: 'Objetos  ·  Colecciones  ·  Bolsa (0)', title: 'Pequeños objetos, grandes momentos.', description: 'Una tienda simple de recorrer, con productos, detalles y una compra clara.', action: 'Explorar colección', kind: 'commerce' }
  ];

  const sections = {
    sites: renderSites(),
    about: `<div class="about-section"><p class="content-kicker">01 &nbsp; / &nbsp; SOBRE MÍ</p><div class="about-portrait"><img src="${ABOUT_PORTRAIT}" alt="Retrato de Tomás" loading="lazy" decoding="async"></div><h1 class="about-title">Hola, soy<br>Tomás.</h1><p class="content-lead about-lead">Desarrollo sitios web a medida: claros, rápidos y bien cuidados.</p><p class="content-detail about-detail">Estudiante en la Universidad Tecnológica Nacional y desarrollador web. Empecé a aprender por mi cuenta en 2022 con HTML, CSS y JavaScript, y desde entonces no paré de sumar herramientas. Trabajo con distintos lenguajes, frameworks y modelos para encontrar la solución adecuada para cada proyecto. Hoy armo sitios a medida, cuidando el diseño y los detalles.</p><div class="about-links"><button class="text-action is-disabled" type="button" disabled aria-disabled="true">VER EJEMPLOS <span>→</span></button><a class="about-link" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer">GitHub</a><a class="about-link" href="${EMAIL_URL}" target="_blank" rel="noopener noreferrer">Correo</a></div><aside class="about-status" aria-label="Estado y ubicación"><span>Rosario, Argentina</span><span class="availability"><i aria-hidden="true"></i>Disponible para proyectos</span></aside></div>`,
    projects: renderProjects(),
    contact: `<div class="contact-section"><p class="content-kicker">03 &nbsp; / &nbsp; CONTACTO</p><h1>Hablemos<span>.</span></h1><p class="content-lead">¿Tenés una idea en mente?</p><p class="content-detail">Contame qué querés crear. Estoy listo para darle forma.</p><div class="contact-actions"><a class="contact-action" href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 21v-3.3c0-1 .1-1.7-.5-2.3 3.3-.4 6.8-1.6 6.8-7.4a5.8 5.8 0 0 0-1.5-4A5.4 5.4 0 0 0 19.7 0S18.5-.4 15 2a13.5 13.5 0 0 0-7 0C4.5-.4 3.3 0 3.3 0a5.4 5.4 0 0 0-.1 4A5.8 5.8 0 0 0 1.7 8c0 5.8 3.5 7 6.8 7.4-.6.6-.6 1.2-.5 2.3V21"></path></svg><span>GitHub</span></a><a class="contact-action" href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"></path><path d="M9 9.2c.3 2.3 2 4 4.3 4.6l1.2-1.1 2 .9c-.1 1.1-.9 1.8-2 1.8-3.5-.2-6.9-3.6-7-7.1 0-1.1.7-1.9 1.8-2l.9 2L9 9.2Z"></path></svg><span>WhatsApp</span></a><a class="contact-action" href="${EMAIL_URL}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"></rect><path d="m4.5 7 7.5 5.5L19.5 7"></path></svg><span>Correo</span></a></div></div>`
  };

  function iconMarkup(icon) {
    const paths = {
      spark: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"></path><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"></path>',
      building: '<path d="M4 20V5l8-2v17M12 8h8v12M2 20h20M7 7h2M7 11h2M7 15h2M15 11h2M15 15h2"></path>',
      bag: '<path d="M4 8h16l-1 12H5L4 8Z"></path><path d="M9 9V6a3 3 0 0 1 6 0v3"></path>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[icon] || paths.spark}</svg>`;
  }

  function renderSites() {
    const tabs = websiteExamples.map((example, index) => `<button class="site-type${index === 0 ? ' is-active' : ''}" type="button" role="tab" id="site-tab-${example.id}" aria-selected="${index === 0}" aria-controls="site-preview" tabindex="${index === 0 ? '0' : '-1'}" data-site-type="${example.id}"><span class="site-icon" aria-hidden="true">${iconMarkup(example.icon)}</span>${example.label}</button>`).join('');
    return `<div class="sites-section">
      <div class="sites-topbar">
        <div class="site-tabs" role="tablist" aria-label="Tipos de sitio web">${tabs}</div>
        <div class="sites-heading"><p class="content-kicker">00 &nbsp; / &nbsp; SITIOS WEB</p><h1>Ideas digitales<span>.</span></h1><button class="sites-contact" type="button" data-target="contact"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg><span>Hablemos</span><i>↗</i></button></div>
      </div>
      ${renderSiteGuide(websiteExamples[0], 0)}
      <div class="site-preview" id="site-preview" role="tabpanel" aria-labelledby="site-tab-landing">
        <div class="site-browser-bar"><span class="browser-dots" aria-hidden="true"><i></i><i></i><i></i></span><button class="site-expand" type="button" aria-label="Expandir demostración" aria-expanded="false" aria-controls="site-preview" title="Ver en pantalla completa"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M21 15v4a2 2 0 0 1-2 2h-4M9 21H5a2 2 0 0 1-2-2v-4"></path></svg><span>Expandir</span></button></div>
        <button class="site-collapse" type="button" aria-label="Volver a la vista previa" title="Desmaximizar ventana"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3v5H3M16 3v5h5M3 16h5v5M21 16h-5v5"></path></svg><span>Volver a la vista previa</span></button>
        <div class="site-mockup" data-site-kind="landing" data-light="1"></div>
        <div class="site-preview-fade" aria-hidden="true"></div>
        <button class="site-more" type="button" aria-label="Ver más de la demostración" aria-expanded="false" aria-controls="site-preview"><span>Ver más</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg></button>
      </div>
      <div class="site-footer"><div class="site-footer-copy"><p class="site-note">Cada sitio se diseña a medida. Estos ejemplos muestran distintas formas de presentar tu proyecto.</p><p class="site-infrastructure"><span>Dominio y DNS</span> Cloudflare <i aria-hidden="true">·</i> <span>Hosting</span> GitHub Pages</p></div><nav class="site-social" aria-label="Redes y contacto"><a href="${GITHUB_URL}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 21v-3.3c0-1 .1-1.7-.5-2.3 3.3-.4 6.8-1.6 6.8-7.4a5.8 5.8 0 0 0-1.5-4A5.4 5.4 0 0 0 19.7 0S18.5-.4 15 2a13.5 13.5 0 0 0-7 0C4.5-.4 3.3 0 3.3 0a5.4 5.4 0 0 0-.1 4A5.8 5.8 0 0 0 1.7 8c0 5.8 3.5 7 6.8 7.4-.6.6-.6 1.2-.5 2.3V21"></path></svg></a><a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"></path><path d="M9 9.2c.3 2.3 2 4 4.3 4.6l1.2-1.1 2 .9c-.1 1.1-.9 1.8-2 1.8-3.5-.2-6.9-3.6-7-7.1 0-1.1.7-1.9 1.8-2l.9 2L9 9.2Z"></path></svg></a><a href="${EMAIL_URL}" aria-label="Correo electrónico" title="Correo"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg></a></nav></div>
    </div>`;
  }

  function renderSiteGuide(example, index) {
    const bars = [0, 1, 2].map(level => `<i${level < example.complexityLevel ? ' class="is-filled"' : ''}></i>`).join('');
    return `<section class="site-guide" aria-labelledby="site-guide-title" aria-live="polite">
      <div class="site-guide-main"><p class="site-guide-kicker"><span>GUÍA PARA ELEGIR</span><span>${String(index + 1).padStart(2, '0')} / 03</span></p><h2 id="site-guide-title">${example.guideTitle}</h2><p class="site-guide-summary">${example.guideSummary}</p></div>
      <div class="site-guide-facts"><article><span>IDEAL PARA</span><p>${example.idealFor}</p></article><article><span>SUELE INCLUIR</span><p>${example.includes}</p></article></div>
      <aside class="site-guide-complexity" aria-label="Complejidad orientativa: ${example.complexity}, nivel ${example.complexityLevel} de 3"><div class="site-guide-level"><span>COMPLEJIDAD</span><strong>${example.complexity}</strong></div><div class="site-guide-meter" aria-hidden="true">${bars}</div><p>${example.complexityNote}</p></aside>
    </section>`;
  }

  function renderWebsiteExample(example) {
    const nav = `<header class="mock-nav"><span class="mock-brand">${example.brand}</span><span class="mock-links">${example.navigation}</span><span class="mock-menu" aria-hidden="true">☰</span><span class="mock-nav-action">Empezar <b>↗</b></span></header>`;
    const footer = `<footer class="demo-footer"><span class="mock-brand">${example.brand}</span><span>Diseñado con intención · Rosario, Argentina</span><span>© 2026</span></footer>`;
    const button = label => `<button class="demo-button" type="button" tabindex="-1" aria-disabled="true">${label}<span aria-hidden="true">↗</span></button>`;

    if (example.kind === 'landing') return `<main class="demo-page demo-landing">${nav}
      <section class="mock-landing demo-hero"><div class="demo-wrap demo-hero-grid"><div class="mock-copy"><p class="mock-eyebrow">${example.eyebrow}</p><h1>${example.title}</h1><p>${example.description}</p><div class="demo-actions">${button(example.action)}<span class="demo-caption">Una experiencia para descubrir sin apuro.</span></div><div class="demo-proof"><span>01 — Una idea</span><span>02 — Un nuevo comienzo</span></div></div><div class="mock-art mock-art-landing" aria-hidden="true"><div class="art-orbit"></div><div class="art-sun"></div><div class="art-object"></div><span>01<br>—<br>24</span><small>EL FUTURO<br>SE SIENTE</small></div></div><div class="demo-scroll-hint">DESLIZÁ PARA DESCUBRIR <span>↓</span></div></section>
      <section class="demo-intro demo-wrap"><p class="mock-eyebrow">UNA PÁGINA. UNA HISTORIA.</p><h2>Todo empieza con una buena primera impresión.</h2><p class="demo-section-copy">Una landing page reúne lo esencial en un recorrido claro: presenta una propuesta, despierta interés y acompaña a cada persona hacia el siguiente paso.</p><div class="demo-feature-grid"><article><span>01</span><h3>Mensaje claro</h3><p>Una propuesta concreta que se entiende desde el primer vistazo.</p></article><article><span>02</span><h3>Diseño con intención</h3><p>Jerarquía visual para destacar lo que hace única a tu idea.</p></article><article><span>03</span><h3>Acción sencilla</h3><p>Un camino directo para conocer, consultar o empezar.</p></article></div></section>
      <section class="demo-story"><div class="demo-wrap demo-story-grid"><div class="demo-story-art" aria-hidden="true"><div class="story-sun"></div><div class="story-card"><span>COLECCIÓN 01</span><b>Un momento<br>para vos.</b><i>✳</i></div></div><div><p class="mock-eyebrow">HECHA PARA TU LANZAMIENTO</p><h2>Una experiencia que deja huella.</h2><p class="demo-section-copy">Desde una nueva marca hasta un servicio especial, cada detalle de la página acompaña la personalidad de tu proyecto. Contenido breve, visuales expresivos y una invitación a dar el próximo paso.</p>${button('Contanos tu idea')}</div></div></section>
      <section class="demo-quote demo-wrap"><span class="demo-quote-mark">“</span><p>Una idea merece un espacio propio para crecer.</p><small>UNA LANDING PAGE PENSADA PARA CONECTAR</small></section>
      <section class="demo-cta"><div class="demo-wrap demo-cta-inner"><p class="mock-eyebrow">EL PRIMER PASO PUEDE SER SIMPLE</p><h2>Hagamos lugar<br>a tu próxima idea.</h2>${button('Empezar una conversación')}</div></section>${footer}</main>`;

    if (example.kind === 'corporate') return `<main class="demo-page demo-corporate">${nav}
      <section class="mock-corporate demo-corp-hero"><div class="demo-wrap demo-corp-hero-inner"><p class="mock-eyebrow">${example.eyebrow}</p><h1>${example.title}</h1><div class="demo-corp-intro"><p>${example.description}</p>${button('Conocer el estudio')}</div><div class="mock-building" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b><span>NORTE<br>ESTUDIO</span></div><small class="demo-location">ROSARIO, ARGENTINA <span>·</span> DISEÑO CON INTENCIÓN</small></div></section>
      <section class="demo-corp-about"><div class="demo-wrap demo-corp-about-grid"><p class="mock-eyebrow">01 / EL ESTUDIO</p><h2>Ideas sólidas.<br>Espacios que inspiran.</h2><p class="demo-section-copy">Somos un equipo independiente que conecta arquitectura, paisaje y vida cotidiana. Trabajamos de forma cercana, desde la primera conversación hasta el último detalle.</p><div class="demo-corp-stats"><div><b>12</b><span>AÑOS DE OFICIO</span></div><div><b>38</b><span>PROYECTOS REALIZADOS</span></div><div><b>04</b><span>CIUDADES</span></div></div></div></section>
      <section class="demo-corp-services"><div class="demo-wrap"><div class="demo-corp-section-heading"><p class="mock-eyebrow">02 / QUÉ HACEMOS</p><h2>Un proceso completo,<br>con una mirada común.</h2></div><div class="demo-service-list"><article><span>01</span><div><h3>Arquitectura</h3><p>Proyectos residenciales y comerciales pensados para durar.</p></div><b>↗</b></article><article><span>02</span><div><h3>Interiorismo</h3><p>Materiales, luz y proporciones en equilibrio.</p></div><b>↗</b></article><article><span>03</span><div><h3>Dirección de obra</h3><p>Seguimiento cercano para que cada idea llegue a buen puerto.</p></div><b>↗</b></article></div></div></section>
      <section class="demo-corp-project"><div class="demo-wrap demo-project-grid"><div class="demo-project-image" aria-hidden="true"><div class="project-building"><i></i><i></i><b></b></div><span>CASA ENTRE ÁRBOLES · 2025</span></div><div><p class="mock-eyebrow">03 / PROYECTO DESTACADO</p><h2>Una casa abierta<br>a la luz del norte.</h2><p class="demo-section-copy">Materiales honestos y una relación directa con el paisaje crean un refugio simple para vivir mejor.</p>${button('Ver el proyecto')}</div></div></section>
      <section class="demo-corp-contact"><div class="demo-wrap"><p class="mock-eyebrow">04 / HABLEMOS</p><h2>¿Imaginamos<br>algo juntos?</h2><p>Nos gusta escuchar ideas nuevas.</p>${button('Escribir al estudio')}</div></section>${footer}</main>`;

    return `<main class="demo-page demo-commerce">${nav}
      <section class="mock-shop demo-shop-hero"><div class="demo-wrap demo-shop-grid"><div class="mock-shop-copy"><p class="mock-eyebrow">${example.eyebrow}</p><h1>${example.title}</h1><p>${example.description}</p>${button('Explorar objetos')}<small>HECHO EN ARGENTINA · ENVÍOS A TODO EL PAÍS</small></div><div class="shop-hero-art" aria-hidden="true"><div class="shop-sun"></div><div class="shop-vase vase-large"></div><div class="shop-vase vase-small"></div><span>OBJETOS<br>PARA HABITAR</span></div></div><div class="demo-wrap demo-marquee">PIEZAS ÚNICAS <i>✳</i> DISEÑO LOCAL <i>✳</i> MATERIALES NOBLES <i>✳</i> HECHO CON CALMA</div></section>
      <section class="demo-shop-categories demo-wrap"><div class="demo-shop-heading"><div><p class="mock-eyebrow">DESCUBRÍ CASA BOSQUE</p><h2>Objetos para cada rincón.</h2></div><span>VER TODAS LAS CATEGORÍAS →</span></div><div class="demo-category-grid"><article class="category category-ceramics"><div aria-hidden="true"><i></i><b></b></div><span>CERÁMICA</span></article><article class="category category-light"><div aria-hidden="true"><i></i><b></b></div><span>ILUMINACIÓN</span></article><article class="category category-textile"><div aria-hidden="true"><i></i><b></b></div><span>TEXTILES</span></article></div></section>
      <section class="demo-shop-products"><div class="demo-wrap"><div class="demo-shop-heading"><div><p class="mock-eyebrow">SELECCIÓN DE LA CASA</p><h2>Favoritos de temporada.</h2></div><span>VER COLECCIÓN →</span></div><div class="mock-products demo-product-grid" aria-hidden="true"><article class="mock-product product-one"><i></i><span>Jarrón Arcilla</span><small>$ 28.000</small></article><article class="mock-product product-two"><i></i><span>Lámpara Alba</span><small>$ 42.000</small></article><article class="mock-product product-three"><i></i><span>Cuenco Río</span><small>$ 19.500</small></article><article class="mock-product product-four"><i></i><span>Textil Siesta</span><small>$ 34.000</small></article></div></div></section>
      <section class="demo-shop-editorial"><div class="demo-wrap demo-editorial-grid"><div class="demo-editorial-art" aria-hidden="true"><div class="editorial-object"></div><span>HECHO A MANO<br>EN PEQUEÑAS SERIES</span></div><div><p class="mock-eyebrow">EL VALOR DE LO HECHO DESPACIO</p><h2>Diseño que se queda.</h2><p class="demo-section-copy">Elegimos piezas que encuentran su lugar en tu casa y te acompañan por mucho tiempo. Producción local, materiales nobles y cuidado en cada terminación.</p>${button('Conocer nuestra historia')}</div></div></section>
      <section class="demo-shop-newsletter"><div class="demo-wrap"><p class="mock-eyebrow">UNA CARTA DESDE CASA</p><h2>Novedades, ideas<br>y pequeños hallazgos.</h2><p>Recibí novedades de la tienda y una nota de inspiración de vez en cuando.</p><div class="demo-newsletter-field"><span>Tu correo electrónico</span><b>SUMARME →</b></div></div></section>${footer}</main>`;
  }

  function initializeSitesDemo() {
    const mockup = content.querySelector('.site-mockup');
    if (!mockup) return;
    const example = websiteExamples[0];
    mockup.innerHTML = localizeMarkup(renderWebsiteExample(example));
    const panel = content.querySelector('#site-preview');
    panel?.setAttribute('aria-labelledby', `site-tab-${example.id}`);
  }

  function selectWebsiteExample(id) {
    const example = websiteExamples.find(item => item.id === id);
    if (!example) return;
    content.querySelectorAll('.site-type').forEach(tab => {
      const selected = tab.dataset.siteType === id;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const guide = content.querySelector('.site-guide');
    if (guide) guide.classList.add('is-changing');
    const mockup = content.querySelector('.site-mockup');
    const panel = content.querySelector('#site-preview');
    if (!mockup || !panel) {
      if (guide) guide.classList.remove('is-changing');
      return;
    }
    mockup.classList.add('is-changing');
    window.setTimeout(() => {
      guide?.replaceWith(document.createRange().createContextualFragment(localizeMarkup(renderSiteGuide(example, websiteExamples.indexOf(example)))));
      const updatedGuide = content.querySelector('.site-guide');
      mockup.dataset.siteKind = example.kind;
      mockup.dataset.light = String(websiteExamples.findIndex(item => item.id === id) + 1);
      mockup.innerHTML = localizeMarkup(renderWebsiteExample(example));
      panel.setAttribute('aria-labelledby', `site-tab-${example.id}`);
      requestAnimationFrame(() => updatedGuide?.classList.remove('is-changing'));
      requestAnimationFrame(() => mockup.classList.remove('is-changing'));
    }, reduceMotion ? 0 : 150);
  }

  function expandWebsiteExample(trigger) {
    const panel = content.querySelector('.site-preview');
    if (!panel || panel.classList.contains('is-expanded')) return;
    expandedPreviewTrigger = trigger;
    const activeExample = websiteExamples.find(item => item.id === content.querySelector('.site-type.is-active')?.dataset.siteType);
    panel.classList.add('is-expanded');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', language === 'en' ? `Full-screen demo: ${localizeMarkup(activeExample?.label || 'sitio web')}` : `Demostración a pantalla completa: ${activeExample?.label || 'sitio web'}`);
    panel.scrollTop = 0;
    panel.querySelectorAll('.site-expand, .site-more').forEach(button => button.setAttribute('aria-expanded', 'true'));
    document.body.classList.add('has-expanded-site');
    content.querySelector('.site-collapse')?.focus();
  }

  function collapseWebsiteExample() {
    const panel = content.querySelector('.site-preview.is-expanded');
    if (!panel) return;
    panel.classList.remove('is-expanded');
    panel.setAttribute('role', 'tabpanel');
    panel.removeAttribute('aria-modal');
    panel.removeAttribute('aria-label');
    document.body.classList.remove('has-expanded-site');
    const trigger = expandedPreviewTrigger;
    expandedPreviewTrigger = null;
    panel.querySelectorAll('.site-expand, .site-more').forEach(button => button.setAttribute('aria-expanded', 'false'));
    trigger?.focus();
  }

  function renderProjects() {
    const rows = projects.map((project, index) => `<a class="project-row" href="${project.url}" target="_blank" rel="noopener noreferrer" data-project-index="${index}" style="--row-delay:${index * 75}ms"><span class="project-thumb"><img src="${project.image}" alt="${project.alt}" width="1200" height="750" decoding="async"></span><span class="project-copy"><span class="project-title"><span class="project-title-text">${project.title}</span><span class="project-arrow" aria-hidden="true">→</span></span><span class="project-description">${project.description}</span><span class="project-technologies">${project.technologies.join(' · ')}</span></span><span class="project-meta">${project.yearOrStatus}</span></a>`).join('');
    return `<div class="projects-section"><p class="content-kicker">02 &nbsp; / &nbsp; Ejemplos seleccionados</p><h1>Ejemplos<span>.</span></h1><p class="content-lead">Algunas cosas hechas con intención.</p><div class="project-list" aria-label="Ejemplos de sitios web">${rows}</div></div>`;
  }

  function initializeProjectPreview() {
    projectPreview.innerHTML = projects.map((project, index) => `<img class="project-preview-image${index === 0 ? ' is-active' : ''}" src="${project.image}" alt="" width="1200" height="750" decoding="async">`).join('');
    projects.forEach(project => {
      const preload = new Image();
      preload.src = project.image;
      if (preload.decode) preload.decode().catch(() => {});
    });
  }
  initializeProjectPreview();

  function activateProjectPreview(index) {
    if (!Number.isInteger(index) || index < 0 || index >= projects.length || index === activePreviewIndex) return;
    activePreviewIndex = index;
    projectPreview.querySelectorAll('.project-preview-image').forEach((image, imageIndex) => {
      image.classList.toggle('is-active', imageIndex === index);
    });
  }

  function updateGreeting() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    let message;

    if (minutes >= 300 && minutes <= 480) message = language === 'es' ? '¿Qué madrugador, no? Buenos días.' : 'An early bird, huh? Good morning.';
    else if (minutes >= 481 && minutes <= 719) message = language === 'es' ? 'Buenos días.' : 'Good morning.';
    else if (minutes >= 720 && minutes <= 1139) {
      const weekday = new Intl.DateTimeFormat(language === 'es' ? 'es-AR' : 'en-US', { weekday: 'long' }).format(now);
      message = language === 'es' ? `Buen ${weekday}.` : `Have a good ${weekday}.`;
    }
    else if (minutes >= 1140 && minutes <= 1349) message = language === 'es' ? 'Buenas noches.' : 'Good evening.';
    else if (minutes >= 1350 || minutes <= 59) message = language === 'es' ? 'Es muy tarde para seguir despierto. Buenas noches.' : 'It’s very late to still be awake. Good night.';
    else if (minutes <= 179) message = language === 'es' ? 'En serio, andá a dormir. Buenas noches.' : 'Seriously, go to sleep. Good night.';
    else message = language === 'es' ? 'A esta altura no sé si decirte buenas noches o buenos días.' : 'At this point, I’m not sure whether to say good night or good morning.';

    greeting.textContent = message;
  }
  updateGreeting();

  function applyLanguage() {
    const isEnglish = language === 'en';
    document.documentElement.lang = language;
    document.title = isEnglish ? 'Tomás Daniel Flores | Web developer in Rosario, Argentina' : 'Tomás Daniel Flores | Desarrollador web en Rosario, Santa Fe';
    document.querySelector('meta[name="description"]')?.setAttribute('content', isEnglish
      ? 'Tomás Daniel Flores, web developer in Rosario, Argentina. I design custom landing pages, corporate websites, and online stores.'
      : 'Tomás Daniel Flores, desarrollador web en Rosario, Santa Fe. Diseño sitios a medida: landing pages, sitios corporativos y tiendas online.');
    const toggle = document.getElementById('language-toggle');
    toggle.setAttribute('aria-label', isEnglish ? 'Change language, currently English' : 'Cambiar idioma, actualmente español');
    toggle.setAttribute('aria-pressed', String(isEnglish));
    toggle.querySelectorAll('span').forEach(option => {
      const selected = option.textContent.toLowerCase() === language;
      option.setAttribute('aria-current', String(selected));
    });
    menu.setAttribute('aria-label', isEnglish ? 'Main sections' : 'Secciones principales');
    menu.querySelector('.menu-intro-subtitle').textContent = isEnglish ? 'Tomás Daniel Flores. Web developer.' : 'Tomás Daniel Flores. Desarrollador web.';
    menu.querySelector('[data-target="sites"] .menu-label').textContent = isEnglish ? 'Websites' : 'Sitios web';
    menu.querySelector('[data-target="about"] .menu-label').textContent = isEnglish ? 'About me' : 'Sobre mí';
    menu.querySelector('.menu-status').textContent = isEnglish ? 'Work in progress' : 'Trabajo en proceso';
    menu.querySelector('[data-target="contact"] .menu-label').textContent = isEnglish ? 'Contact' : 'Contacto';
    backButton.innerHTML = `<span>←</span> ${isEnglish ? 'BACK TO MENU' : 'VOLVER AL MENÚ'}`;
    wrapper.setAttribute('aria-label', isEnglish ? 'Show menu' : 'Mostrar menú');
    stage.querySelector('.hero')?.setAttribute('aria-label', isEnglish ? 'Interactive sphere' : 'Esfera interactiva');
    stage.querySelector('.hint').innerHTML = isEnglish ? 'TOMÁS DANIEL FLORES <span>·</span> CLICK TO EXPLORE' : 'TOMÁS DANIEL FLORES <span>·</span> CLICK PARA EXPLORAR';
    stage.querySelector('.about-map img')?.setAttribute('alt', isEnglish ? 'Map of Argentina with Santa Fe highlighted' : 'Mapa de Argentina con Santa Fe resaltada');
    greeting.setAttribute('lang', language);
    updateGreeting();
  }

  document.getElementById('language-toggle').addEventListener('click', () => {
    language = language === 'es' ? 'en' : 'es';
    try { localStorage.setItem(languageStorageKey, language); } catch {}
    applyLanguage();
    const section = stage.dataset.section;
    if (!stage.classList.contains('content-open') || !sections[section]) return;
    const selectedSite = content.querySelector('.site-type.is-active')?.dataset.siteType || 'landing';
    if (content.querySelector('.site-preview.is-expanded')) collapseWebsiteExample();
    content.innerHTML = localizeMarkup(sections[section]);
    if (section === 'sites') {
      initializeSitesDemo();
      if (selectedSite !== 'landing') selectWebsiteExample(selectedSite);
    }
    if (section === 'about') syncAboutStatus();
  });
  applyLanguage();

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, seed: Math.random() * Math.PI * 2, sparkle: Math.random(), sparklePhase: Math.random(), size: .48 + Math.random() * .78 });
  }

  function resize() {
    const rect = wrapper.getBoundingClientRect();
    width = rect.width; height = rect.height;
    if (!baseOrbWidth && width > 0) baseOrbWidth = width;
    ensureCanvasCapacity(width);
    canvas.style.width = '100%'; canvas.style.height = '100%';
  }

  function resizeSitesUniverse() {
    const rect = stage.getBoundingClientRect();
    sitesWidth = rect.width;
    sitesHeight = rect.height;
    sitesDpr = Math.min(window.devicePixelRatio || 1, 2);
    sitesCanvas.width = Math.round(sitesWidth * sitesDpr);
    sitesCanvas.height = Math.round(sitesHeight * sitesDpr);
    sitesCtx.setTransform(sitesDpr, 0, 0, sitesDpr, 0, 0);
  }

  function drawSitesUniverse(dt) {
    const active = stage.dataset.section === 'sites' && (stage.classList.contains('sites-entering') || stage.classList.contains('sites-landing') || stage.classList.contains('content-open'));
    if (!active || !sitesWidth || !sitesHeight) return;
    sitesCtx.clearRect(0, 0, sitesWidth, sitesHeight);
    const orbColor = getComputedStyle(stage).getPropertyValue('--orb-front').trim() || '205, 205, 214';
    for (const dot of sitesDots) {
      if (!reduceMotion) {
        dot.x = (dot.x + dot.speed * dt) % 1;
        dot.y = (dot.y - dot.speed * .32 * dt + 1) % 1;
      }
      const x = dot.x * sitesWidth;
      const y = dot.y * sitesHeight;
      const alpha = dot.glint ? dot.alpha * .82 : dot.alpha * .48;
      sitesCtx.beginPath();
      sitesCtx.arc(x, y, dot.size, 0, Math.PI * 2);
      sitesCtx.fillStyle = `rgba(${orbColor}, ${alpha})`;
      sitesCtx.fill();
    }
  }

  function ensureCanvasCapacity(requiredWidth) {
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextCapacity = Math.max(canvasCapacityWidth, requiredWidth);
    const nextPixels = Math.round(nextCapacity * nextDpr);
    if (nextPixels === canvas.width && nextDpr === dpr) return;
    dpr = nextDpr;
    canvasCapacityWidth = nextCapacity;
    canvas.width = nextPixels;
    canvas.height = nextPixels;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function targetOrbWidth(state, section) {
    const vw = window.innerWidth, vh = window.innerHeight;
    const mobile = vw <= 700;
    if (state === 'home') return mobile ? Math.min(vw * .88, vh * .67) : Math.min(vh * .78, vw * .78, 940);
    if (state === 'menu') return mobile ? (vw <= 390 ? vw * .56 : Math.min(vh * .58, vw * .63)) : Math.min(vh * .64, vw * .64, 760);
    if (section === 'contact') return mobile ? Math.min(vw * 2.4, vh * 1.7, 1100) : Math.min(vw * 2.4, vh * 2.1, 5000);
    if (mobile) return vw <= 390 ? vw * 1.45 : Math.min(vw * 1.38, vh * 1.1);
    if (vw <= 1250) return Math.min(vh * 1.12, vw * 1.12, 1200);
    return Math.min(vh * 1.38, vw * 1.38, 1600);
  }

  function draw(time) {
    requestAnimationFrame(draw);
    const dt = Math.min((time - (lastTime || time)) / 1000, .05); lastTime = time;
    drawSitesUniverse(dt);
    const isAbout = stage.dataset.section === 'about';
    const isContact = stage.dataset.section === 'contact';
    if (!reduceMotion) rotation += dt * (isAbout ? Math.PI * 2 / 120 : isContact ? .24 : .12);
    const ease = 1 - Math.exp(-dt * 2.3);
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;
    pointer.hover += (pointer.targetHover - pointer.hover) * (1 - Math.exp(-dt * 1.8));
    const renderScale = canvasCapacityWidth / Math.max(width, 1);
    ctx.setTransform(dpr * renderScale, 0, 0, dpr * renderScale, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2, cy = height / 2;
    const radius = Math.min(width, height) * .385;
    const dotScale = baseOrbWidth ? width / baseOrbWidth : 1;
    const cos = Math.cos(rotation), sin = Math.sin(rotation);
    const tilt = -.17 + (canParallax && isAbout ? pointer.y * .015 : pointer.y * .09);
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const frontColor = getComputedStyle(stage).getPropertyValue('--orb-front').trim() || '205, 205, 214';
    const backColor = getComputedStyle(stage).getPropertyValue('--orb-back').trim() || '145, 147, 158';
    const frontRgb = frontColor.split(',').map(Number);
    const backRgb = backColor.split(',').map(Number);
    const projected = [];
    const hoverSpread = pointer.hover * .045;
    const hoverScale = 1 + pointer.hover * .045;
    const heartbeat = reduceMotion ? .5 : stage.classList.contains('menu-open') ? .5 + .5 * Math.sin(time * Math.PI * 2 / 2.4) : .5 + .5 * Math.sin(time * Math.PI * 2 / 4.2);
    const parallaxX = canParallax && isAbout ? pointer.x * 12 : 0;
    const parallaxY = canParallax && isAbout ? pointer.y * 12 : 0;
    const orbScale = isAbout ? 1.15 : 1;

    for (const p of points) {
      const x = p.x * cos - p.z * sin;
      const z = p.x * sin + p.z * cos;
      const y = p.y * ct - z * st;
      const depth = p.y * st + z * ct;
      const spread = 1 + hoverSpread * (.65 + (p.seed % 1) * .7);
      const parallax = isAbout ? 0 : pointer.x * 4;
      projected.push({ x: cx + x * radius * orbScale * hoverScale * spread + parallaxX + parallax, y: cy + y * radius * orbScale * hoverScale * spread + parallaxY, depth, size: p.size, seed: p.seed });
    }
    projected.sort((a, b) => a.depth - b.depth);
    for (const p of projected) {
      const front = (p.depth + 1) / 2;
      const alpha = .12 + front * .8;
      const size = p.size * (.55 + front * .72) * dotScale;
      const pulse = reduceMotion ? 1 : .84 + .16 * Math.sin(time * .001 + p.seed);
      const whiteBeat = reduceMotion ? 0 : stage.classList.contains('menu-open') ? .12 + heartbeat * .24 : heartbeat * .07;
      ctx.beginPath(); ctx.arc(p.x, p.y, size * pulse * (1 + whiteBeat * .1), 0, Math.PI * 2);
      const surfaceMix = Math.max(0, Math.min(1, (front + .12) / .78));
      const whiteMix = Math.max(0, Math.min(.78, Math.max(0, (front - .68) * 1.65) + whiteBeat * .42));
      const dotColor = backRgb.map((channel, index) => {
        const surfaceChannel = channel + (frontRgb[index] - channel) * surfaceMix;
        return Math.round(surfaceChannel + (255 - surfaceChannel) * whiteMix);
      });
      ctx.fillStyle = `rgba(${dotColor.join(',')}, ${Math.min(1, alpha * pulse + whiteBeat * .06)})`;
      ctx.fill();
      if (isContact && !reduceMotion && p.y > cy && front > .58 && p.sparkle < .045) {
        const sparkleAge = (time / 1000 + p.sparklePhase * 16) % 16;
        if (sparkleAge < 2.8) {
          const sparkle = Math.pow(Math.sin(Math.PI * sparkleAge / 2.8), 1.4);
          ctx.save();
          ctx.globalAlpha = sparkle;
          ctx.shadowColor = 'rgba(92, 171, 255, .95)';
          ctx.shadowBlur = 7 * dotScale;
          ctx.fillStyle = 'rgba(205, 232, 255, .98)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * (1 + sparkle * 1.2), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }
  }

  function setState(state, section = 'home') {
    stage.classList.remove('menu-open', 'content-open');
    stage.dataset.section = section;
    if (state === 'menu') stage.classList.add('menu-open');
    if (state === 'content') stage.classList.add('content-open');
    ensureCanvasCapacity(targetOrbWidth(state, section));
    const inContent = state === 'content';
    wrapper.setAttribute('aria-pressed', String(state !== 'home'));
    wrapper.setAttribute('aria-label', language === 'en' ? (state === 'home' ? 'Show menu' : state === 'menu' ? 'Close menu' : 'Return to menu') : state === 'home' ? 'Mostrar menú' : state === 'menu' ? 'Cerrar menú' : 'Volver al menú');
    menu.setAttribute('aria-hidden', String(state !== 'menu'));
    document.querySelector('.content').setAttribute('aria-hidden', String(!inContent));
    if (section !== 'about') stage.querySelector('.hero > .about-status')?.remove();
  }

  function toggleMenu() {
    if (stage.classList.contains('content-open')) {
      setState('menu', stage.dataset.section);
      return;
    }
    setState(stage.classList.contains('menu-open') ? 'home' : 'menu');
  }

  wrapper.addEventListener('click', toggleMenu);
  wrapper.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
  });
  menu.addEventListener('click', e => {
    const button = e.target.closest('[data-target]');
    if (!button) return;
    openSection(button.dataset.target);
  });
  content.addEventListener('click', e => {
    const expandButton = e.target.closest('.site-expand, .site-more');
    if (expandButton) {
      expandWebsiteExample(expandButton);
      return;
    }
    if (e.target.closest('.site-collapse')) {
      collapseWebsiteExample();
      return;
    }
    const siteTab = e.target.closest('[data-site-type]');
    if (siteTab) {
      selectWebsiteExample(siteTab.dataset.siteType);
      return;
    }
    const button = e.target.closest('[data-target]');
    if (button) openSection(button.dataset.target);
  });
  window.addEventListener('keydown', e => {
    const panel = content.querySelector('.site-preview.is-expanded');
    if (!panel) return;
    if (e.key === 'Escape') {
      collapseWebsiteExample();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      panel.querySelector('.site-collapse')?.focus();
    }
  });
  content.addEventListener('keydown', e => {
    const currentTab = e.target.closest('[data-site-type]');
    if (!currentTab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const tabs = [...content.querySelectorAll('[data-site-type]')];
    let index = tabs.indexOf(currentTab);
    if (e.key === 'ArrowRight') index = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') index = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') index = 0;
    if (e.key === 'End') index = tabs.length - 1;
    e.preventDefault();
    tabs[index].focus();
    selectWebsiteExample(tabs[index].dataset.siteType);
  });
  content.addEventListener('pointerover', e => {
    if (stage.dataset.section !== 'projects') return;
    const row = e.target.closest('.project-row');
    if (row) {
      activateProjectPreview(Number(row.dataset.projectIndex));
      projectPreview.classList.add('is-visible');
    }
  });
  content.addEventListener('pointerleave', () => {
    if (stage.dataset.section === 'projects') {
      activateProjectPreview(0);
      projectPreview.classList.remove('is-visible');
    }
  });
  content.addEventListener('focusin', e => {
    if (stage.dataset.section !== 'projects') return;
    const row = e.target.closest('.project-row');
    if (row) {
      activateProjectPreview(Number(row.dataset.projectIndex));
      projectPreview.classList.add('is-visible');
    }
  });
  content.addEventListener('focusout', e => {
    if (stage.dataset.section === 'projects' && !content.contains(e.relatedTarget)) {
      activateProjectPreview(0);
      projectPreview.classList.remove('is-visible');
    }
  });

  function openSection(section) {
    if (section === 'projects') return;
    stage.querySelector('.hero > .about-status')?.remove();
    if (section === 'sites') {
      if (stage.classList.contains('sites-entering')) return;
      if (reduceMotion) {
        content.innerHTML = localizeMarkup(sections.sites);
        setState('content', 'sites');
        initializeSitesDemo();
        return;
      }
      stage.dataset.section = 'sites';
      stage.classList.remove('menu-open');
      stage.classList.add('sites-entering');
      menu.setAttribute('aria-hidden', 'true');
      const finishEntry = event => {
        if (event.target !== wrapper || event.animationName !== 'sites-enter-orb') return;
        wrapper.removeEventListener('animationend', finishEntry);
        content.innerHTML = localizeMarkup(sections.sites);
        initializeSitesDemo();
        stage.classList.add('sites-landing');
        stage.classList.remove('sites-entering');
        setState('content', 'sites');
        requestAnimationFrame(() => stage.classList.remove('sites-landing'));
      };
      wrapper.addEventListener('animationend', finishEntry);
      return;
    }
    content.innerHTML = localizeMarkup(sections[section]);
    setState('content', section);
    if (section === 'projects') {
      activePreviewIndex = -1;
      activateProjectPreview(0);
      projectPreview.classList.remove('is-visible');
    }
    syncAboutStatus();
  }
  function syncAboutStatus() {
    if (stage.dataset.section !== 'about') return;
    const aboutSection = content.querySelector('.about-section');
    const status = content.querySelector('.about-status') || stage.querySelector('.hero > .about-status');
    if (!aboutSection || !status) return;
    if (window.innerWidth > 700) stage.querySelector('.hero').append(status);
    else aboutSection.append(status);
  }
  backButton.addEventListener('click', () => setState('menu', stage.dataset.section));

  wrapper.addEventListener('transitionend', e => {
    if (e.target === wrapper && e.propertyName === 'width') resize();
  });

  wrapper.addEventListener('pointermove', e => {
    const rect = wrapper.getBoundingClientRect();
    if (!canParallax) return;
    pointer.targetX = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
    pointer.targetY = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    pointer.targetHover = 1;
  });
  wrapper.addEventListener('pointerleave', () => { pointer.targetX = 0; pointer.targetY = 0; pointer.targetHover = 0; });
  window.addEventListener('resize', () => { resize(); resizeSitesUniverse(); syncAboutStatus(); }, { passive: true });
  resize();
  resizeSitesUniverse();
  const orbResizeObserver = new ResizeObserver(entries => {
    const rect = entries[0].contentRect;
    width = rect.width;
    height = rect.height;
    if (!baseOrbWidth && width > 0) baseOrbWidth = width;
    ensureCanvasCapacity(width);
  });
  orbResizeObserver.observe(wrapper);
  requestAnimationFrame(draw);
})();
