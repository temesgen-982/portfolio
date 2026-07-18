# Portfolio

A static portfolio site built with zero dependencies. Plain Node.js composes template strings at build time — no frameworks, no bundlers, no npm install.

## Quick Start

```bash
node build.js
```

Outputs a `dist/` folder ready to deploy.

## File Structure

```
portfolio/
  build.js
  package.json       ← just `"type": "module"` and a single alias for the data folder
  css/
  assets/
  data/
  src/
    layouts/         ← HTML skeleton
    partials/        ← reusable fragments (header, footer, prefetch)
    components/
    pages/
  dist/
```

## How It Works

Each page in `src/pages/` is a function that returns HTML. It imports `MainLayout` and passes its content in:

```js
import { MainLayout } from '../layouts/MainLayout.js';
import projects from '../../data/projects.json' with { type: 'json' };

export default function WorkPage() {
  const content = `<section>...</section>`;
  return MainLayout({ title: 'Work', active: 'work', content });
}
```

`build.js` loops over every file in `src/pages/`, calls it, and writes the result to `dist/`. CSS and assets are copied untouched.

## Adding a Page

1. Create `src/pages/newpage.js`
2. Export a default function that returns `MainLayout({ ... })`
3. Run `node build.js`
4. `dist/newpage.html` appears

## Adding Data

Add a `.json` file to `data/`, import it in your page or component:

```js
import things from '#data/things.json' with { type: 'json' };
```
