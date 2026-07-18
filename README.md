A static portfolio site built with zero dependencies. 

Plain Node.js composes template strings at build time — no frameworks, no bundlers, no npm install.

## Quick Start

```bash
npm run dev      # dev server with live reload on http://localhost:8080
npm run build    # output to dist/
```

## File Structure

```
portfolio/
  build.js              ← build script, concatenates CSS and generates HTML
  dev-server.js         ← dev server with live reload
  package.json          ← just type + scripts, no dependencies
  css/
    tokens.css          ← design tokens, font-face
    reset.css           ← normalize
    base.css            ← typography, body defaults
    layout.css          ← .container, .stack, .cluster
    buttons.css         ← shared button styles
    utilities.css       ← .sr-only, .center, etc.
    components/         ← component-scoped styles
  assets/               ← fonts, icons, images — copied as-is
  data/                 ← content as JSON
  src/
    layouts/            ← MainLayout (head, header, footer)
    partials/           ← header, footer, prefetch
    components/         ← card components (project, blog, about, skill)
    pages/              ← each file becomes a clean URL
  dist/                 ← generated, gitignored
```

## How It Works

Each page in `src/pages/` is a function that receives `{ base }` and returns HTML via `MainLayout`:

```js
import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import projects from '#data/projects.json' with { type: 'json' };

export default function WorkPage({ base }) {
  const content = `
    <div class="project-cards">
      ${projects.map(projectCard({ base })).join('')}
    </div>`;
  return MainLayout({ title: 'Work', active: 'work', base, content });
}
```

`build.js` loops over every file in `src/pages/`, calls it with `{ base }`, and writes the result to `dist/<name>/index.html`. CSS is concatenated from `cssOrder` into `dist/css/main.css`. Assets are copied untouched.

## Clean URLs

Pages output as `dist/<name>/index.html`, so URLs are `/work/`, `/about/`, etc. — no `.html` extensions.

## Base Path

For GitHub Pages project pages (deployed under `/<repo>/`), set `BASE_URL` on build:

```bash
BASE_URL=/portfolio node build.js
```

Local builds use `BASE_URL=''` (root). The deploy workflow sets this automatically.

## Adding a Page

1. Create `src/pages/newpage.js`
2. Export a default function that receives `{ base }` and returns `MainLayout({ ... })`
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
