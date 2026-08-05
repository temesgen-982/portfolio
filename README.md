A static portfolio site built with zero dependencies.

Plain Node.js composes template strings at build time — no frameworks, no bundlers, no npm install. Blog posts are plain Markdown.

## Quick Start

```bash
npm run dev      # dev server with live reload on http://localhost:8080
npm run build    # output to dist/
```

## How It Works

Each page in `src/pages/` exports a default function that returns HTML via `MainLayout`. Pages take no arguments:

```js
import { MainLayout } from '../layouts/MainLayout.js';
import projects from '#data/projects.json' with { type: 'json' };

export default function WorkPage() {
  const content = `
    <div class="project-cards">
      ${projects.map(projectCard()).join('')}
    </div>`;
  return MainLayout({ title: 'Work', active: 'work', content });
}
```

`build.js` loops over every file in `src/pages/`, calls it, and writes the result to `dist/<name>/index.html`. Blog posts in `content/blog/*.md` are parsed into HTML and written to `dist/blog/<slug>/index.html`, with an index at `dist/blog/index.html`. CSS is concatenated from `cssOrder` into `dist/css/main.css`.

## Clean URLs

Pages output as `dist/<name>/index.html`, so URLs are `/work/`, `/about/`, etc. — no `.html` extensions.

## Deployment & Automation

Two GitHub Actions workflows live in `.github/workflows/`:

- **`deploy.yml`** — builds the site and deploys to GitHub Pages on every push to `main`. It runs `node build.js`, adds a `CNAME` file, and uploads `dist/` as the deployment artifact.
- **`scrape-heatmap.yml`** — runs daily (and on demand) to refresh the GitHub contribution data used by the heatmap on the homepage. It runs `scripts/scrape-heatmap.js`, which writes `data/github-heatmap.json` and commits it. If the scrape fails, it opens a GitHub issue.

## Blog

Drop a Markdown file with YAML frontmatter into `content/blog/`:

```md
---
title: My Post
date: 2026-01-15
tags: [blog]
---

The post body, written in Markdown.
```

`build.js` renders each post to `dist/blog/<slug>/index.html` and refreshes `dist/blog/index.html`, sorted by date.

## Adding a Page

1. Create `src/pages/newpage.js`
2. Export a default function that returns `MainLayout({ title, active, content })`
3. Run `npm run build`
4. `dist/newpage/index.html` appears

## Adding Data

Add a `.json` file to `data/`, import it with the `#data/` alias:

```js
import things from '#data/things.json' with { type: 'json' };
```

## Adding CSS

1. Create the file in `css/` or `css/components/`
2. Add it to the `cssOrder` array in `build.js`
3. The build throws if a CSS file exists but isn't in `cssOrder`