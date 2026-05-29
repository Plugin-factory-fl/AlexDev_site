# Alex Software Services — Site

Static marketing site for web development and Chrome extension services. Built for **GitHub Pages** (classic deploy from the `main` branch root).

## Live URL

After GitHub Pages is enabled:

**https://plugin-factory-fl.github.io/AlexDev_site/**

## Pages

| Page | Path |
|------|------|
| Home | `/index.html` |
| Portfolio hub | `/portfolio.html` |
| Website projects | `/portfolio/websites.html` |
| Extension projects | `/portfolio/extensions.html` |

## Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **main** / folder: **/ (root)**
4. Save — the site updates within a few minutes after each push to `main`

## Local preview

```bash
# From repo root (Python 3)
python3 -m http.server 8080
# Open http://localhost:8080
```

## Structure

```
├── index.html
├── portfolio.html
├── portfolio/
│   ├── websites.html
│   └── extensions.html
├── css/styles.css
├── js/main.js
└── assets/
```
