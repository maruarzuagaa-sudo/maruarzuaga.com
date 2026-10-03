# Maru Arzuaga — Portfolio v0.1 (structure prototype)

Static site: HTML + CSS + JS with GSAP / ScrollTrigger and Lenis (loaded from CDN).

## Run locally
    cd ~/maru-portfolio && python3 serve.py
Then open http://localhost:5173

## Where to edit
- `js/data.js`: categories (Social Media, Branding, Papelería) and projects. Each project has title, client, year, `did` / `role` / `context` texts and 4 images (`null` = placeholder). Images go in `/images/<category>/`.
- `js/i18n.js`: all interface/home texts in Spanish (default) and English, keyed by `data-i18n`.
- `js/logos.js`: monochrome tool logos for the hero marquee.
- `index.html`: home structure. `category.html` + `js/category.js`: category pages with the projects.
- `js/core.js`: nav, menu, footer, email/socials/WhatsApp number, page transitions, cursor.
- `legal.html` + `js/legal.js`: privacy policy and copyright (ES/EN).
- `images/me/`: About photo (`about.jpg`) and the hero cursor-trail photos (`01–05.jpg`).
- `css/style.css`: design tokens (`:root`), type scale, all layouts.
- `fonts/`: drop `ArticulatCF-Light.woff2` here to use Articulat (falls back to Inter Tight).
