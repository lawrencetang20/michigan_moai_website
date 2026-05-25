# Michigan Moai Website

Static marketing + directory site for [Michigan Moai](https://michiganmoai.org), an AANHPI mental-health nonprofit. The two therapist + legal directories are the primary conversion targets, not donations.

## Stack

- Vanilla HTML, CSS, JS. **No framework, no build step** — keep it that way.
- Hosted on **GitHub Pages** with custom domain `michiganmoai.org` (see [CNAME](CNAME)).
- Every page links absolute paths (`/style.css`, `/main.js`, `/pngs/...`) so it works from the domain root.

## Layout

- [index.html](index.html) — landing page with the two directory bars.
- [style.css](style.css) — all site styles.
- [main.js](main.js) — mobile nav toggle, dropdown, scroll reveal, modal close.
- [about/](about/), [therapist/](therapist/), [legal/](legal/), [projects/](projects/) — each is a single `index.html` so URLs are `/about/`, `/therapist/`, etc.
- [pngs/](pngs/) — site imagery (logo, illustrations, headshots).
- [pdfs/](pdfs/) — downloadable docs.
- [favicon/](favicon/) — favicon set + `site.webmanifest`.
- [sitemap.xml](sitemap.xml) — keep in sync when adding pages.

## Conventions

- Every HTML page begins with the same redirect snippet that bounces visitors from `lawrencetang20.github.io/michigan_moai_website/...` to `michiganmoai.org/...`. Preserve it when creating new pages.
- Design vocabulary: full-width alternating "directory bars" with illustration + heading + CTA. Green palette anchored on `#68B047`. Display font is Comfortaa (loaded from Google Fonts in each page's `<head>`).
- Google Analytics tag `G-HEDYX29RSE` is loaded on each page — include it on any new page.

## Audience

Primary visitor is someone in distress looking for a culturally competent therapist. Prefer calm, trust, low cognitive load, and a fast path to the directory over marketing flourish.
