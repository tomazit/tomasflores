# Tomás Daniel Flores · Portfolio

Portfolio personal de **Tomás Daniel Flores**, estudiante de Ingeniería en Sistemas y desarrollador web en Rosario, Santa Fe. Presenta mi perfil, los servicios web que ofrezco y distintas demostraciones conceptuales.

**Sitio:** [tomasflores.dev](https://tomasflores.dev)  
**GitHub:** [@tomazit](https://github.com/tomazit)

## Sobre el sitio

La experiencia parte de una esfera animada formada por puntos. Desde el menú se accede a las secciones del portfolio y a **Sitios web**, un recorrido explicativo por tres tipos de proyectos:

- **Landing page:** una página enfocada en una propuesta y una acción concreta.
- **Sitio corporativo:** varias secciones para presentar una marca, sus servicios y su trabajo.
- **eCommerce:** una tienda conceptual con catálogo y recorrido de compra.

Cada demostración tiene una identidad visual propia y puede ampliarse a pantalla completa. Son ejemplos visuales: sus formularios, botones de compra y demás interacciones no están conectados a servicios reales.

La sección **Ejemplos** está temporalmente deshabilitada mientras preparo ese contenido.

## Tecnologías

- HTML semántico
- CSS, con diseño adaptable a móvil, tablet y escritorio
- JavaScript nativo
- Canvas 2D para la esfera de partículas y su entorno visual
- GitHub Pages para publicar el sitio

No requiere frameworks, paquetes ni proceso de compilación. Las tipografías Instrument Serif, Manrope y DM Mono se cargan desde Google Fonts.

## Estructura

```text
.
├── index.html                  # Estructura, metadatos SEO y datos estructurados
├── styles.css                  # Diseño, animaciones y reglas responsive
├── script.js                   # Navegación, esfera y demostraciones
├── CNAME                       # Dominio personalizado de GitHub Pages
├── robots.txt                  # Indicaciones para rastreadores
└── assets/
    ├── argentina-provincias.svg
    ├── favicon.svg
    ├── social-preview.svg       # Imagen para compartir el enlace
    ├── tomas-profile.webp
    └── projects/                # Imágenes conceptuales de Ejemplos
```

## Probar en local

Podés abrir `index.html` directamente en el navegador. Para probarlo con un servidor local, desde la carpeta del proyecto ejecutá:

```bash
python -m http.server 8000
```

Después abrí <http://localhost:8000>.

## Publicar con GitHub Pages

1. Subí los cambios al repositorio `tomazit/tomasflores`.
2. En GitHub, abrí **Settings → Pages** y configurá la publicación desde la rama `main`, carpeta raíz (`/`).
3. En **Custom domain**, usá `tomasflores.dev`. El archivo `CNAME` ya contiene ese dominio.
4. En Cloudflare, mantené los cuatro registros **A** del dominio raíz apuntando a las direcciones oficiales de GitHub Pages y el CNAME de `www` apuntando a `tomazit.github.io`. Para la validación de GitHub Pages, estos registros deben estar en modo **DNS only**.
5. Cuando GitHub termine de emitir el certificado, activá **Enforce HTTPS** en la configuración de Pages.

## Personalizar el contenido

Los datos principales están al comienzo de `script.js`:

- `ABOUT_PORTRAIT`: ruta a la foto del perfil.
- `GITHUB_URL`, `WHATSAPP_URL` y `EMAIL_URL`: enlaces de contacto.
- `websiteExamples`: textos y datos de las tres demostraciones.
- `projects`: títulos, descripciones, tecnologías, imágenes y enlaces de la sección Ejemplos.

Los archivos de imagen se guardan en `assets/`. La navegación y el contenido base están en `index.html`; colores, tipografías, tamaños y comportamiento responsive se ajustan en `styles.css`.

## Accesibilidad y movimiento

La navegación se puede usar con teclado, los controles incluyen etiquetas accesibles y los estilos respetan `prefers-reduced-motion` para reducir las animaciones cuando el sistema lo solicita.
