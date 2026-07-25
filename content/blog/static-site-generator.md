---
title: "Building a Static Site Generator"
desc: "How I built my portfolio with zero dependencies using plain Node.js."
date: 2026-07-10
tags: ["nodejs", "javascript"]
---

I wanted a personal site that was fast, simple, and completely under my control.

## Why not a framework?

Frameworks are great for teams, but for a personal site they add complexity I don't need. A few JS files and some CSS is all it takes.

## How it works

The build script reads page templates, renders them to static HTML, and writes them to `dist/`. No runtime, no client-side JS framework.

```js
const { default: renderPage } = await import(path.join(pagesDir, file));
fs.writeFileSync(`${dir}/index.html`, renderPage());
```

That's the core loop.

## What I learned

Building your own tools teaches you more than using someone else's. You understand every layer, and you can change anything without fighting upstream.
