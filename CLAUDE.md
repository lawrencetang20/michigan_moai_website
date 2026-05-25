# Michigan Moai Website

Static marketing + directory site for [Michigan Moai](https://michiganmoai.org), an AANHPI (Asian American, Native Hawaiian, Pacific Islander) mental-health nonprofit. The therapist + legal directories are the primary conversion targets — **not donations**.

## Stack

- Vanilla HTML, CSS, JS. **No framework, no build step** — keep it that way.
- Hosted on **GitHub Pages** with custom domain `michiganmoai.org` (see [CNAME](CNAME)).
- Every page links absolute paths (`/style.css`, `/main.js`, `/pngs/...`) so it works from the domain root.

## Layout

- [index.html](index.html) — landing page (hero, directory cards, moai explainer, value props, crisis note).
- [style.css](style.css) — full design system: tokens, typography, components, layout primitives.
- [main.js](main.js) — mobile nav, accessible dropdown (keyboard + Escape), scroll-reveal honoring `prefers-reduced-motion`.
- [about/](about/), [therapist/](therapist/), [legal/](legal/), [projects/](projects/) — each is a single `index.html` so URLs are `/about/`, `/therapist/`, etc.
- [pngs/](pngs/) — site imagery (logo, illustrations, headshots).
- [pdfs/](pdfs/) — downloadable docs (therapist + legal directories).
- [favicon/](favicon/) — favicon set + `site.webmanifest`.
- [sitemap.xml](sitemap.xml) — keep in sync when adding pages.
- [.claude/skills/ui-design/](.claude/skills/ui-design/) — the canonical design-and-craft rulebook this site is built against.

## Conventions

### Required boilerplate on every page

- The GitHub Pages → custom-domain redirect snippet (bounces visitors from `lawrencetang20.github.io/michigan_moai_website/...` to `michiganmoai.org/...`).
- The Google Analytics tag `G-HEDYX29RSE`.
- The skip-link (`<a class="skip-link" href="#main">Skip to content</a>`) as the first focusable element.
- The shared `<header class="site-header">` and `<footer class="site-footer">` markup — copy from [index.html](index.html).
- `<main id="main">` so the skip link works.

### Design vocabulary

- **Light-mode-first.** The audience is someone in distress arriving from search — abrupt brightness changes are jarring at that moment.
- **Verb-first headlines.** The home page leads with "Find a culturally fluent AANHPI therapist in Michigan." — not the org's mission. Mission belongs on `/about/`.
- **Directory CTAs are the page.** "View therapist directory" should win the eye on the home page. Donations are deliberately not solicited — Michigan Moai's conversion is "find help," not "give money."
- **The moai concept.** Used structurally, not decoratively — see the explainer block on [index.html](index.html) and [about/index.html](about/index.html). Avoid stock pan-Asian iconography (lotus, cherry blossoms, calligraphy).
- **Friction acknowledgment.** A gentle "Reaching out isn't easy" callout near each directory CTA. Reduces the cognitive cost of the action.
- **Crisis fallback.** The 988 Suicide & Crisis Lifeline (with the AANHPI-specific page link) is referenced on the home page and the therapist directory page.

### Visual tokens (defined in [style.css](style.css) `:root`)

- **Primary green:** `#3F8230` (`--green-600`). The legacy `#68B047` is kept as `--green-400`/`--green-500` for surfaces but the primary CTA and brand wordmark use `--green-600`/`--green-700` for WCAG AA contrast on white.
- **Warm accent:** `--amber-500` (`#C77A3B`) — reserved for the legal directory and the moai-icon center; used sparingly so it stays meaningful.
- **Crisis red:** `--crisis-500` — reserved exclusively for 988 / emergency callouts. Never use red for decoration.
- **Spacing:** multiples of 4 only (`--space-1` through `--space-10`).
- **Type pair:** **Comfortaa** (display only — h1/h2/brand) + **Inter** (body, h3/h4, labels). Both via Google Fonts.
- **Radii:** `--radius-md` (10px) for inputs/buttons, `--radius-lg` (16px) for cards, `--radius-xl` (24px) for hero illustrations and the moai explainer.

### Component vocabulary

Defined in [style.css](style.css); reuse before inventing:

- `.hero`, `.stat-strip`, `.directory-card`, `.value-card`, `.moai-explainer`
- `.page-header`, `.section` (with modifiers: `--mint`, `--warm`, `--sand`, `--tight`, `--airy`)
- `.split` (two-column content/illustration block)
- `.team-card`, `.project-card`, `.partner-card`
- `.callout`, `.callout-mint`, `.crisis-note`
- `.tag`, `.tag-amber`, `.tag-sand` (pills used for languages, specialties)
- `.btn`, `.btn-lg`, `.btn-secondary`, `.btn-amber`, `.btn-ghost`, `.btn-arrow`
- `.skip-link`, `.eyebrow`, `.lede`, `.tabular`

### Accessibility (non-negotiable)

- WCAG 2.2 AA contrast — verified for body text on every surface.
- `:focus-visible` outline preserved on all interactive elements (`--shadow-focus`).
- `prefers-reduced-motion` disables scroll-reveal + all transforms.
- Hover effects gated behind `@media (hover: hover) and (pointer: fine)` to avoid sticky hover on touch.
- Non-English text wrapped in `<span lang="…">` (e.g., the language pills on the therapist page) so screen readers pronounce correctly.

### Run locally

```bash
python3 -m http.server 5500
```

Then open <http://localhost:5500>.

## Audience

Primary visitor is someone (or a family member of someone) in psychological distress, often first-generation immigrant, looking for a culturally fluent therapist. Every choice — copy, color, density, motion — should serve **calm, trust, and a short path to the directory**. Marketing flourish, donate-first heroes, and clever interactions are the wrong move for this audience. When in doubt, choose the boring, legible, fast option.

For the full design-and-craft ruleset (typography details, animation framework, accessibility checklist, anti-patterns to avoid), see [.claude/skills/ui-design/SKILL.md](.claude/skills/ui-design/SKILL.md).
