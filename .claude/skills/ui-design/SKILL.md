---
name: ui-design
description: Apply modern UI/UX design principles when editing the Michigan Moai website (index.html and per-section pages under about/, therapist/, legal/, projects/) or other user-facing surfaces. Encodes layout/copy UX for a mental-health-access nonprofit, Emil Kowalski's design-engineering + animation philosophy, Impeccable anti-patterns, typography/spacing/color systems, and WCAG 2.2 AA accessibility. Invoke when adding UI, reviewing a UI diff, restyling an existing view, animating an element, or when the user asks for design feedback.
---

# UI Design Skill — Michigan Moai

Use this skill when touching user-facing surfaces — primarily [index.html](../../../index.html) and the per-section `index.html` files under [about/](../../../about/), [therapist/](../../../therapist/), [legal/](../../../legal/), [projects/](../../../projects/). The site is **vanilla HTML + a single [style.css](../../../style.css) with CSS custom properties** (no Tailwind, no framework, no build step), **light-mode-first** because the audience is someone in distress arriving from search and looking for a therapist. Respect that stack — don't introduce a framework to make a small change.

> Taste is a trained instinct, not personal preference. It's developed by studying great work, understanding *why* something feels good, and encoding those reasons as explicit rules. This file is that encoding.

---

## Audience-specific north star

Before any rule below, hold this in mind: the primary visitor is someone (or a family member of someone) in psychological distress, often a first-generation immigrant, looking for a culturally competent therapist. Every choice — copy, color, density, motion — should serve **calm, trust, and a short path to the directory**. Marketing flourish, donate-first heroes, and clever interactions are the wrong move for this audience. When in doubt, choose the boring, legible, fast option.

---

## Review format (REQUIRED when reviewing a diff)

Use a markdown table with **Before | After | Why** columns. Never use separate "Before:" and "After:" lines.

| Before | After | Why |
|---|---|---|
| `transition: all 300ms` | `transition: transform 200ms ease-out` | Specify exact properties; `all` causes accidental transitions on newly-added properties |
| `transform: scale(0)` | `transform: scale(0.95); opacity: 0` | Nothing in reality appears from nothing — the entrance feels unnatural |

---

## 1. Core principles

### Refactoring UI (hierarchy, systems, restraint)
1. **Design in grayscale first.** Get hierarchy right via spacing, weight, and size before adding color. Color is an amplifier, not a crutch.
2. **Constrained system, not one-off values.** Spacing, font sizes, colors, and radii must come from a small scale. The site already defines tokens in `:root` of [style.css](../../../style.css) — use them. If a value you need doesn't exist, add it to `:root` rather than inlining a new hex/px.
3. **Establish hierarchy by de-emphasizing.** Instead of making important things bigger, make secondary things smaller, lighter, or lower-contrast.
4. **Whitespace is a feature.** Generous padding inside the directory bars and gaps between sections beat tight layouts. Err on the side of more space.
5. **No ornamental flourishes.** No gratuitous shadows, gradients, icons, or animations. Each effect must carry meaning.
6. **Labels before values.** Smaller, dimmer label above a larger, brighter value. Never the reverse.
7. **Contrast pulls focus.** The single thing a user should do next — "View Therapist Directory" — gets the strongest contrast. Everything else steps back.

### Taste (from Emil Kowalski's "Agents with Taste" + Impeccable)
- **Unseen details compound.** Most details users never consciously notice are the point. When the site functions exactly as assumed, users proceed to the directory without thought — that is the goal.
- **Beauty is leverage.** Good defaults and animations differentiate in a world of functionally-adequate software. Beauty is underutilized.
- **Cohesion matters more than any single rule.** Easing, timing, type, color, naming, copy — match the motion to the mood of the product. A site for someone in distress should be calm and steady, not playful and bouncy.
- **Review with fresh eyes the next day.** Imperfections invisible during development become obvious with a rested eye. Play animations in slow motion to spot timing issues.

---

## 2. Nonprofit-landing UX (the 5-second rule)

Within 5 seconds of arrival, a visitor must be able to answer:
1. **What is this?** ("a nonprofit that helps you find a culturally competent AANHPI therapist in Michigan")
2. **Is this for me?** (cues that signal AANHPI focus + Michigan + trauma-informed)
3. **What do I do next?** (the directory CTA, with strongest contrast)

Concrete moves:
- **Above-the-fold clarity beats hero novelty.** One sentence headline that names the problem and the audience, one supporting sentence, one primary CTA to the therapist directory. Resist the urge to add a carousel, a video, or two competing CTAs.
- **The directory CTA is the page.** "View Therapist Directory" and "View Legal Directory" should be the strongest visual elements on the home page. Treat the rest as supporting cast.
- **Progressive disclosure.** Mission depth, founder bios, philosophy — those belong on `/about/`. The home page is a doorway, not a brochure.
- **Trust signals near the CTA.** Languages supported, PSYPACT coverage, "free to use," partner orgs, founder credentials. A few specific, verifiable claims beat one vague superlative.
- **Empty / loading / error states.** Any directory page needs all three. A blank "no results" page with no guidance is hostile to someone in distress; give a fallback action ("contact us directly", "email support@…").
- **Calm color encoding.** Use the green palette for primary actions; reserve any red/orange entirely for true emergency or warning cues (crisis hotline, validation errors). Never use red as decoration — you burn your signal for the one moment it actually matters.

---

## 3. Data visualization (only if/when added)

The current site has no charts, but if "Projects" or an impact report ever introduces them:

- **One idea per chart.** If you're describing two things, use two charts.
- **Start bar-chart y-axes at zero.** Always. Truncated zero baselines mislead.
- **Sort categorical axes by value,** not alphabetically, unless order has semantic meaning (days of week, severity).
- **Label directly** when there are ≤5 series — kill the legend.
- **Match tick density to width.** A 400px-wide chart does not need 20 x-axis labels.
- **Color sparingly.** Grayscale for baseline series, one accent color for the thing you want the reader to notice.

---

## 4. Typography (the details that separate good from great)

Apply these on top of the existing `:root` tokens in [style.css](../../../style.css).

- **Type scale**: use a small set (e.g., 14 / 16 / 18 / 20 / 28 / 40). Don't invent `15px` or `17px`.
- **Comfortaa quirks**: the display face used here has rounded, low-contrast strokes — calm and friendly, but it loses sharpness at body-text sizes and under heavy weights. Reserve Comfortaa for headings and the brand wordmark; pair it with a more legible humanist sans (e.g., Inter, Nunito Sans, or system-ui) for paragraphs and form labels.
- **Weight**: 400 body, 500–600 emphasis/labels, 700 for rare headings. Avoid 300 — it thins out on white.
- **Body line length** 60–80 characters (target ~70) for readable prose. Below 60 breaks rhythm; above 80 costs comprehension. The current directory bars in [style.css](../../../style.css) cap at `max-width: 1400px` with two columns — make sure the right-hand text column stays in the 60–80ch range, not the full 700px.
- **`tabular-nums`** (`font-variant-numeric: tabular-nums`) on any column of numbers — phone numbers, license numbers, dates in a directory listing. Otherwise digits jitter across rows.
- **Real ellipsis character `…`**, not three dots. Set `text-overflow: ellipsis` for truncation.
- **Loosen letter-spacing on uppercase labels** (`letter-spacing: 0.04em` or so). Tight caps look cramped.
- **Fallback font x-height** should roughly match Comfortaa to prevent layout shift when the webfont loads (FOUT).
- **Underline is for links only.** Use bold for UI emphasis; italic for prose citations, never for UI buttons.
- **Monospace** for things that read as identifiers (license #, dates in a tabular layout). Sans for everything else.

---

## 5. Color

- **Never pure black on a "light" surface.** A near-black like `#1A1F1A` reads warmer and softer than `#000` on white — important for a calming visual tone.
- **Gray text on colored backgrounds is an anti-pattern.** Use a tinted color from the same hue family (e.g., a darker green on the light-green directory bars) instead of neutral gray.
- **Build palettes with 5–9 shades per hue** — systematic, not ad-hoc. The site already has `--bar-green-1` through `--bar-green-6` for this; keep extending rather than inlining new hex values.
- **Color contrast ≥ 4.5:1** for normal text, ≥ 3:1 for large text (18pt+/14pt bold) and UI borders. Verify body text against every directory-bar background, not just white. Light-green-on-light-green is the most common failure here.
- **Color is never the only signal.** Status dots (e.g., "telehealth" / "in-person") need text or an icon alongside.
- **Reserve red and orange** for emergency-style affordances (crisis line links, validation errors, alerts). Don't decorate with them.

---

## 5b. Theming (light + dark) — what flips, what stays

The current site is light-only. If a dark mode is ever added (or a section like an admin/intake form needs one), follow this discipline so it doesn't break:

- Define the **same token names** under `:root` and `html.dark`. Both define `--surface`, `--text`, `--text-dim`, `--accent`, `--border`, etc.
- **Flip every surface, border, text, and shadow value.** Raw hex in a component means that component breaks in one theme. If you're reaching for `rgba(0,0,0,0.06)` as a background, stop — it's invisible on dark. Use `var(--surface-subtle)` instead.
- **Semantic colors stay in the same hue family but shift in lightness.** Green on light (`#68B047`) becomes lighter green on dark (`#A6D88C`) — same meaning, different luminance. Never swap hues between themes.
- **Soft variants flip format.** On light they're solid pastels (`#E4F7E0`); on dark they're semi-transparent (`rgba(166, 216, 140, 0.14)`) so they blend with whatever surface is behind them.
- **Shadows stop doing work on dark.** A `0 4px 14px rgba(0,0,0,0.45)` shadow is mostly invisible on a dark surface. Use borders + tint-shift for elevation on dark; reserve shadows for overlays (modals, toasts).

### 5c. `color-mix()` over opacity-on-color

Prefer `color-mix(in srgb, var(--clr-primary) 18%, transparent)` to `rgba(104, 176, 71, 0.18)`. Why:
- Works with CSS variables (you can't interpolate alpha on `var()`).
- Automatically inherits theme changes — the mix recomputes against the current accent.
- Reads as intent (*18% of the primary*) instead of a raw tuple.

Browser support is ≥ 2023 (Chrome 111, Firefox 113, Safari 16.2) — safe for this project.

---

## 6. Spacing, radii, elevation

- **Spacing: multiples of 4** (4, 8, 12, 16, 20, 24, 32, 40). Nothing else.
- **Radius: pick one or two values and stick to them** (e.g., 6px for inputs/buttons, 10px for cards). The current `.btn` and `.directory-bar-content` mix radii — pick a system and apply it everywhere.
- **Shadows carry meaning** (surface elevation above the plane) — don't sprinkle them for decoration.
- **Hit targets ≥ 44px** on touch / mobile; ≥ 24×24 CSS pixels on desktop (WCAG 2.2). Inspect the mobile hamburger and the nav dropdown for this.

---

## 6b. Deterministic visual checks — Anthony Hobday's "Safer Rules"

Pass/fail rules verifiable on a diff without subjective judgement. Run them in a review pass *after* hierarchy and color work. Source: [anthonyhobday.com/sideprojects/saferules](https://anthonyhobday.com/sideprojects/saferules/).

### Color + contrast

1. **Near-black / near-white, never pure.** `#0A0A0C` beats `#000`; `#FAFAF9` beats `#FFF`. Harsh edges hurt on screen.
2. **Saturate neutrals** — tint blacks/whites/grays toward your palette's warm or cool bias. Never mix warm and cool neutrals in the same design. (For a green-primary site, neutrals should lean slightly warm-green.)
3. **Distinct brightness steps.** Colors in a palette should read differently even desaturated to grayscale. If two tokens are indistinguishable in grayscale, one is redundant.
4. **Lower icon contrast when paired with text.** A full-contrast icon next to full-contrast text creates double-weight; drop the icon 1 step.
5. **No shadows on dark surfaces.** Shadows assume a light source behind the viewer; on dark, they're invisible or muddy.
6. **One depth technique per design.** Don't mix `box-shadow` elevation with `border + tint` elevation in the same view.

### Type + spacing formulas

7. **Body text ≥ 16px.** Anything smaller is secondary.
8. **Line length 60–80 characters, target 70.**
9. **Letter-spacing/line-height scales with size.** Big text gets tighter tracking and leading; small text gets looser.
10. **Two typefaces max.** One display + one body. Three = chaos.
11. **Button horizontal padding = 2× vertical.** `8px 16px` reads balanced; `8px 8px` feels stubby.
12. **Outer padding ≥ inner padding.** A card with `padding: 20px` containing children spaced `gap: 24px` breaks — the container loses its frame.
13. **Mathematical spacing scale.** Multiples of 4 (or 8). Nothing off-grid.

### Geometry + layout

14. **Nested corner radius = outer − gap.** A button with radius 8 inside a card with radius 12 at 4px inset: inner radius = 12 − 4 = 8.
15. **Optical alignment over mathematical.** Circles and pointed shapes need to be nudged a pixel or two to *look* centered.
16. **Universal alignment.** Every element snaps to something.
17. **Visual-weight order.** Series of elements get arranged by weight, heaviest on the outer edge.
18. **12-column grid.** Divides cleanly into 2/3/4/6.
19. **Shadow blur = 2× distance.** `0 4px 8px` reads natural; `0 4px 2px` looks pasted on.
20. **Container brightness delta.** Light UI: ~7% between nested surfaces.
21. **Avoid double hard divides.** Two adjacent borders, or a border + background transition on the same line, double the visual weight.
22. **Pair simple and complex.** A busy background needs a simple foreground and vice versa.

### Process

23. **Every choice has a reason.** Spacing, color, shadow, weight — if you can't articulate *why*, it's decoration not design.
24. **High contrast for the one thing.** The directory CTA gets maximum contrast; structural chrome steps back.
25. **Lighter = nearer.** On light, elements closer to the viewer get *darker*. Reverse breaks depth.
26. **Measure space between high-contrast points.** Visual spacing is the gap between where the eye lands, not the literal bounding box.

---

## 6c. Interaction hygiene — from Rauno Freiberg

Source: [rauno.me/craft/interfaces](https://rauno.me/craft/interfaces).

- **Every single-input field goes inside a `<form>`.** Enter submits; without a form, users have to reach for a button. Even a lonely search input.
- **`user-select: none` on interactive chrome** (buttons, nav, icons, labels-of-clickable-things). Prevents accidental text selection on double-click or drag.
- **Disabled states explain themselves.** A disabled button with no tooltip is a dead-end. Use `title` or an inline hint.
- **Frequent, low-novelty actions skip animation.** Keyboard shortcuts, repeat-click actions, toolbar buttons. One-off actions (modal open) earn motion.
- **Inputs auto-focus when the only reasonable action is typing.** A directory search bar can auto-focus on `/therapist/`.
- **Escape closes; Enter submits.** Always.
- **Design the prototype, not the wireframe.** Skip grayscale boxes and go straight to real-stack high-fidelity. Lower-fidelity work hides what will actually break.

---

## 7. Animation — Emil Kowalski's decision framework

### 7.1 Should this animate at all?

| Frequency | Decision |
|---|---|
| 100+ times/day (keyboard shortcuts, command palette) | **No animation. Ever.** |
| Tens of times/day (hover, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, celebrations) | Can add delight |

A nonprofit landing page sits at the "rare / first-time" end for most visitors, so a touch of motion on the directory bars (scroll-reveal already in [main.js](../../../main.js)) is fine. But **don't animate the nav, dropdown, or directory list rows** — these are repeated interactions.

### 7.2 What is the purpose?

Every animation must answer "why does this animate?" Valid answers:
- **Spatial consistency** (drawer enters and exits the same direction)
- **State indication** (a morphing button signals state change)
- **Feedback** (button scale on press confirms the click)
- **Preventing jarring changes** (smooth appearance/disappearance)

Invalid: "it looks cool" + frequent exposure. Don't animate.

### 7.3 What easing?

| Situation | Easing |
|---|---|
| Entering / exiting | `ease-out` (fast start, responsive) |
| Moving / morphing on screen | `ease-in-out` |
| Hover, color change | `ease` |
| Constant motion (marquee, spinner) | `linear` |
| Default when unsure | `ease-out` |

**Never use `ease-in` for UI.** It starts slow, making the interface feel sluggish.

**CSS built-in easings are weak.** Use custom cubic-beziers:

```css
:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* strong ease-out for UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* strong ease-in-out for movement */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* iOS-like drawer */
}
```

### 7.4 How fast?

| Element | Duration |
|---|---|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory | Can be longer |

Keep UI animations **under 300ms**. 180ms feels more responsive than 400ms. Larger elements animate slightly slower; **exit should be ~20% faster than entrance**.

### 7.5 Asymmetric enter/exit timing

Slow where the user is *deciding*, fast where the *system is responding*.

---

## 8. Component craft rules

- **Never animate from `scale(0)`.** Start from `scale(0.95)` + `opacity: 0`. Nothing in reality appears from nothing.
- **Buttons must feel responsive.** `transform: scale(0.97)` on `:active`, `transition: transform 160ms ease-out`.
- **Popovers must be origin-aware.** Scale from the trigger location, not center. **Modals are the exception** — they keep `transform-origin: center`.
- **Tooltips: delay the first, skip animation on subsequent hovers.**
- **Use CSS transitions, not keyframes, for rapidly-triggered UI.** Transitions retarget smoothly when interrupted.
- **Use `@starting-style`** for enter animations without JS, where browser support allows.
- **Stagger list entries 30–80ms apart.** Never block interaction during a stagger.
- **`translateY(100%)` over hardcoded pixel values** — percentages adapt to content.
- **`scale()` scales children too** (unlike width/height).
- **Springs** are for drag interactions with momentum. Subtle bounce (0.1–0.3). Avoid bounce on a mental-health site — it reads as flippant.

---

## 9. Gestures & drag

(Not currently used on this site, but for any future mobile-first interaction like a swipeable directory card.)

- **Momentum-based dismissal**: velocity = |distance| / elapsedTime. If velocity > ~0.11, dismiss regardless of threshold.
- **Damping at boundaries**: the more a user drags past natural bounds, the less the element moves.
- **Pointer capture** once dragging starts.
- **Ignore additional touch points** after drag begins.
- **Friction over hard stops.** Real things slow down before stopping.

---

## 10. Performance

- **Only animate `transform` and `opacity`** for GPU-accelerated motion. `padding` / `margin` / `height` / `width` trigger layout + paint.
- **CSS variables inherit** — updating a parent recalculates all children. For hot paths, set `element.style.transform` directly.
- **CSS animations beat JS under load.** Use CSS for predetermined animations; JS for dynamic/interruptible ones.
- **WAAPI (`element.animate(...)`)** gives JS control with CSS performance.
- **Optimize images.** PNGs in [pngs/](../../../pngs/) should be ≤ 200KB each where possible — Squoosh or `sharp-cli` for export. Consider WebP with PNG fallback. Slow images delay LCP for visitors on phone data.
- **Preload the directory CTA route.** `<link rel="prefetch" href="/therapist/">` in `<head>` makes the most-likely-next-click instant.

---

## 11. Accessibility — WCAG 2.2 AA checklist

This audience is especially likely to include people using screen readers, voice control, or with low vision (older relatives helping a family member find care). Don't skip these.

- **Contrast** ≥ 4.5:1 text, ≥ 3:1 large text and UI borders. The `#226c2d` heading on `#e4f7e0` and `#333` body on the same background both need verification — and the lightest greens get dangerous fast.
- **Focus visible**: every interactive element shows a focus ring not hidden by the sticky header or overflow. Don't remove `outline` without a replacement.
- **Target size** ≥ 24×24 CSS px (WCAG 2.2). Icon-only buttons (the hamburger) commonly fail.
- **Keyboard**: every click has a keyboard equivalent; tab order follows visual order. The current dropdown menu should open on Enter/Space *and* arrow keys, close on Escape.
- **Labels**: every `<input>` has a programmatic label. Placeholder is not a label.
- **Semantic HTML**: `<button>` for actions, `<a>` for navigation. Never `<div onclick>`.
- **Color is not the only signal**: status indicators need text or an icon.
- **`prefers-reduced-motion`**: reduced means *fewer and gentler*, not *zero*. Keep opacity/color transitions; remove position/scale movement. The `.reveal` scroll animation should respect this.

```css
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```
- **Hover-only effects** behind `@media (hover: hover) and (pointer: fine)` to avoid sticky-hover on touch.
- **Text resize**: layout must not break at 200% zoom.
- **`lang` attribute**: `<html lang="en">` is already set — when adding any text in another language (Mandarin, Korean, Vietnamese, Hindi, etc.), wrap it with `<span lang="zh">…</span>` so screen readers pronounce it correctly.
- **Skip link**: add a `Skip to content` link as the first focusable element. Anyone navigating by keyboard or screen reader will thank you.

---

## 12. Impeccable anti-patterns (do NOT ship these)

- Default fonts: Arial, generic Inter without intentional fallback stack.
- Gray text on colored backgrounds — tint from the same hue family instead.
- Pure black (`#000`) on white — always tint near-black.
- Excessive card nesting (directory bars inside directory bars).
- Bounce / elastic easing — reads as dated and flippant on a mental-health site.
- `transition: all` — causes accidental transitions on newly-added properties.
- Animation on every hover of a list of 50 therapist cards.
- Three-dot `...` where `…` belongs.
- Removing `outline` with no replacement focus state.
- "Skeleton loaders that never fill" — if a real skeleton shows for > 1s, use a proper loading indicator.
- **Donation-first heroes on a help-first site.** Don't put "Donate" above "Find a Therapist" in the visual hierarchy; it inverts the value to the visitor.
- **Untranslated language pride.** Putting "心" or "नमस्ते" decoratively in the header without ever surfacing actually-translated content reads to native speakers as performative.
- **Tokenizing stock photography.** A grid of stock-photo Asian faces looks like a recruitment ad, not a care org. Use real community photography or restrained illustration.

---

## 13. Workflow when editing the site

1. **Read before you write.** Load [index.html](../../../index.html) and [style.css](../../../style.css), scan `:root` tokens and existing component patterns before adding styles.
2. **Reuse tokens.** Raw hex or px outside the scale → stop and either reuse a token or add a new one to `:root`.
3. **Check hierarchy first.** Before worrying about color, ask: does the eye land on the directory CTA? Fix that with size/weight/whitespace.
4. **Preserve the GitHub Pages redirect snippet** at the top of every new HTML page — see [CLAUDE.md](../../../CLAUDE.md).
5. **Apply the animation decision framework** (§7) before adding any motion.
6. **Run the a11y checklist** (§11) on anything interactive.
7. **Test the states.** Empty (no therapists matched), loading, error, long-content-overflow. Not just the happy path.
8. **Verify in the browser.** Per CLAUDE.md: UI changes aren't "done" until opened in a browser. Type-checks and tests verify code correctness, not feature correctness.
9. **Review the next day, in slow motion.** Temporarily 3–5× the animation duration and frame-step in DevTools' Animations panel.

---

## 14. What NOT to do in this repo

- Don't introduce Tailwind, shadcn, Material, Bootstrap, or any CSS framework for a small change. The site is intentionally vanilla — preserve the no-build-step property (see [CLAUDE.md](../../../CLAUDE.md)).
- Don't add Framer Motion / GSAP / Lottie for decorative effects when CSS + WAAPI suffice.
- Don't pull in icon fonts or SVG sprite systems to add one icon — inline the SVG.
- Don't switch the public site to dark-mode default; visitors-in-distress arriving from search expect light, and brightness changes can be jarring at the moment of arrival.
- Don't redesign a view the user didn't ask about. Scope the change to what was requested.
- Don't add Google Analytics to a *new* tag — the existing `G-HEDYX29RSE` snippet in each page's `<head>` is the canonical one (per CLAUDE.md); preserve it as-is when creating new pages.

---

## 15. Quick design-review prompts

- Could a first-time visitor name what we do, who it's for, and what to click — within 5 seconds?
- Is every px value, hex, and font-size in the existing scale?
- Is color doing work, or just decorating?
- Does every interactive element have hover, focus, disabled, and ≥ 24×24 target?
- Do empty / loading / error states exist for the directory pages?
- Does body text on every directory-bar background clear 4.5:1 contrast?
- Is every animation justified by §7.2? Easing right? Under 300ms?
- Do numeric columns use `tabular-nums`?
- Are popovers / dropdowns origin-aware (§8)?
- Is the directory CTA the visually heaviest element above the fold, or is something else (logo, hero illustration) stealing the eye?

---

## 16. Final review checklist

| Issue | Fix |
|---|---|
| `transition: all` | Specify exact properties: `transition: transform 200ms ease-out` |
| `scale(0)` entry | Start from `scale(0.95)` + `opacity: 0` |
| `ease-in` on UI | Switch to `ease-out` or a custom curve |
| `transform-origin: center` on dropdown | Set to trigger location (modals are exempt) |
| Animation on keyboard action | Remove the animation |
| Duration > 300ms on UI | Reduce to 150–250ms |
| Hover animation with no media query | Gate with `@media (hover: hover) and (pointer: fine)` |
| Keyframes on rapidly-triggered element | Use CSS transitions for interruptibility |
| Same enter/exit duration | Exit ~20% faster than enter |
| All items appear at once | Stagger 30–80ms between items |
| Numeric column not `tabular-nums` | Add `font-variant-numeric: tabular-nums` |
| Gray text on colored background | Use a tinted shade from the same hue family |
| `...` instead of `…` | Replace with the real ellipsis character |
| Hover rule outside `@media (hover: hover)` | Wrap it; otherwise sticky-hover on touch |
| `prefers-reduced-motion` kills all transitions | Keep opacity/color; only drop `transform`, `scale`, loops |
| Donate CTA outweighs directory CTA | Reorder so "Find a Therapist" wins the eye |
| Untagged non-English text | Wrap in `<span lang="…">` so screen readers pronounce correctly |

---

## Sources

### Emil Kowalski
- [emil-design-eng SKILL.md](https://github.com/emilkowalski/skill/blob/main/skills/emil-design-eng/SKILL.md) — canonical design-engineering rules
- [Agents with Taste (essay)](https://emilkowal.ski/ui/agents-with-taste) — the philosophy of encoding taste as rules
- [Great animations](https://emilkowal.ski/ui/great-animations) and [Good vs Great Animations](https://emilkowal.ski/ui/good-vs-great-animations)
- [Animations on the Web (course)](https://animations.dev/)
- [Emil Kowalski — personal site](https://emilkowal.ski/)

### Taste-focused skills
- [Impeccable (pbakaus/impeccable)](https://github.com/pbakaus/impeccable) — 23 commands, 7 design disciplines, explicit anti-patterns
- [Taste Skill](https://www.tasteskill.dev/) — anti-slop frontend framework for AI agents
- [Design Taste — Skill Builder](https://design-taste-repo.vercel.app/)

### Foundational
- [Refactoring UI principles — tailwindcss-design](https://playbooks.com/skills/anilcancakir/my-claude-code/tailwindcss-design)
- [Anthony Hobday — Safer Rules for Visual Design](https://anthonyhobday.com/sideprojects/saferules/)
- [Rauno Freiberg — Interfaces](https://rauno.me/craft/interfaces)
- [Nielsen Norman Group — Nonprofit Website Usability](https://www.nngroup.com/articles/nonprofit-websites/)

### Accessibility
- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 AA Checklist — Level Access](https://www.levelaccess.com/blog/wcag-2-2-aa-summary-and-checklist-for-website-owners/)
- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
