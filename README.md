# Michigan Moai

Static marketing + directory site for [Michigan Moai](https://michiganmoai.org), a nonprofit supporting AANHPI (Asian American, Native Hawaiian, Pacific Islander) mental health access in Michigan and PSYPACT-participating states.

The site's primary purpose is to connect people to two free directories:

- **Therapists** — bilingual, culturally fluent clinicians experienced with AANHPI clients.
- **Legal services** — attorneys and advocacy orgs experienced with hate crimes, immigration, and civil rights cases.

## Stack

Vanilla HTML, CSS, JavaScript — **no framework, no build step**. Hosted on GitHub Pages with custom domain `michiganmoai.org` (see [CNAME](CNAME)).

## Run locally

```bash
python3 -m http.server 5500
```

Then open <http://localhost:5500>.

## Layout

```text
index.html            Landing page
style.css             Design system (tokens, components, layout)
main.js               Mobile nav, dropdown, scroll-reveal
about/                /about/    — mission, team, the "moai" concept
therapist/            /therapist/ — therapist directory + PDF download
legal/                /legal/    — legal directory + PDF download
projects/             /projects/ — workshops, partners, programs
pngs/                 Site imagery (logo, illustrations, team photos)
pdfs/                 Downloadable directories
favicon/              Favicon set + site.webmanifest
sitemap.xml           Keep in sync when adding pages
.claude/skills/       Claude Code skills used to maintain the site
CLAUDE.md             Project conventions for AI assistants and humans
```

## Conventions

- Every HTML page begins with the GitHub Pages → custom-domain redirect snippet and the Google Analytics tag — preserve both when adding pages.
- All paths are absolute (`/style.css`, `/pngs/...`) so the site works from the domain root.
- Update [sitemap.xml](sitemap.xml) when adding a new page.
- Design and code conventions are documented in [CLAUDE.md](CLAUDE.md) and [.claude/skills/ui-design/SKILL.md](.claude/skills/ui-design/SKILL.md).

## Contact

[support@michiganmoai.org](mailto:support@michiganmoai.org) · [LinkedIn](https://www.linkedin.com/company/michigan-moai/)
