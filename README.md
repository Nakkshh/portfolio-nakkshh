# Nakshatra Jain — Portfolio (v8)

Personal portfolio site for **Nakshatra Jain**, backend & cloud engineer, B.Tech CSE student at VIT Bhopal. Built as a static multi-page site with a terminal/dev-tool aesthetic — command palette, live GitHub stats, and an embedded resume viewer.

**Live:** [portfolio-nakkshh.vercel.app](https://portfolio-nakkshh.vercel.app)

---

## Tech Stack

- **HTML5 / CSS3** — hand-written, no framework
- **Vanilla JavaScript** — no build step, no bundler
- **Vercel** — static hosting + deployment
- **Formspree** — contact form backend
- **Google Fonts** — display, mono, and body typefaces (see `css/global.css`)

No frameworks, no npm dependencies. Every page is a standalone `.html` file sharing a single stylesheet and script.

---

## Project Structure

```
portfolio-v8/
├─ .github/
│  └─ workflows/
│     └─ update-stats.yml      # Scheduled job to refresh GitHub stats
├─ .vscode/
│  └─ settings.json
├─ assets/
│  ├─ favicon.ico, favicon-*.png, apple-touch-icon.png
│  ├─ android-chrome-*.png, og-image.png, site.webmanifest
│  ├─ Nakshatra_Jain_Resume (1).pdf   # Resume PDF served on /resume.html
│  ├─ resume-page-1.jpg              # Resume preview image (mobile view)
│  └─ stats.json                     # Cached GitHub stats
├─ css/
│  └─ global.css               # Shared design tokens, layout, components
├─ js/
│  └─ main.js                  # Shared behavior: nav, command palette, reveals, clock
├─ contact.html                 # Contact form + direct links
├─ experience.html               # Work experience, education, certifications
├─ index.html                   # Home / hero / about
├─ projects.html                 # Project showcase (live + archived)
├─ resume.html                   # Embedded resume viewer (PDF iframe / image on mobile)
├─ skills.html                   # Tech stack breakdown by category
└─ vercel.json                  # Vercel routing/config
```

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Hero intro, live GitHub stats, current focus, about section |
| `projects.html` | Live projects (NexGate, VaultAI, Nexora) + archived work |
| `experience.html` | Work simulations, education, certifications |
| `skills.html` | Tech stack grouped by domain with proficiency levels |
| `contact.html` | Contact form (Formspree) + direct email/GitHub/LinkedIn links |
| `resume.html` | Full resume viewer — PDF on desktop/tablet, image on mobile |

---

## Key Features

- **Command palette** (`⌘K`) — quick navigation and actions across the site
- **Live GitHub stats** — commits, repos, stars, followers, PRs pulled via `update-stats.yml`
- **Responsive resume viewer** — renders as an embedded PDF on desktop/tablet, falls back to a static image + download link on mobile for reliability
- **Scroll-reveal animations** — sections fade/slide in on scroll (`.reveal` classes)
- **Custom cursor + progress bar** — desktop-only visual polish
- **Dark, terminal-inspired design system** — monospace accents, green terminal color (`--green`), grid background

---

## Design System

Defined in `css/global.css` via CSS custom properties:

- `--green` — primary accent (terminal green)
- `--bg`, `--bg2`, `--bg3` — background layers
- `--text`, `--text2`, `--text3` — text hierarchy
- `--line`, `--line2` — border colors
- `--mono`, `--display`, `--body` — font families

Skill proficiency levels use a consistent three-tier color system:
- **Green** — Proficient
- **Grey** — Familiar
- **Black** — Learning

---

## Running Locally

No build step required — this is a static site.

```bash
# Clone the repo
git clone <repo-url>
cd portfolio-v8

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000` (or the port your server uses).

---

## Deployment

Deployed on **Vercel** with `vercel.json` handling routing. Pushing to the connected branch triggers an automatic deploy.

---

## Content Maintenance Notes

- **Resume PDF**: keep `assets/Nakshatra_Jain_Resume (1).pdf` and the LaTeX source resume in sync — the download link and mobile image (`resume-page-1.jpg`) should always reflect the latest version.
- **Projects**: `projects.html` project bullets and metrics should match the resume exactly — no divergent numbers or unlisted projects.
- **CGPA / stats**: cross-check `experience.html`, `index.html`, and meta tags whenever CGPA or cert counts change — these are duplicated across files and easy to let drift.
- **GitHub stats**: refreshed via `.github/workflows/update-stats.yml`; update the workflow if the GitHub username or stat source changes.

---

## License

Personal project — all rights reserved. Not licensed for reuse.

---

**Contact:** [nakshtrajain25@gmail.com](mailto:nakshtrajain25@gmail.com) · [github.com/Nakkshh](https://github.com/Nakkshh) · [linkedin.com/in/nakshatra-jain](https://www.linkedin.com/in/nakshatra-jain-b345a0308/)