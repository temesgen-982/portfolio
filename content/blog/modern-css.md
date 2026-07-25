---
title: "Getting Started with Modern CSS"
desc: "A deep dive into CSS custom properties, container queries, and other modern features."
date: 2026-06-15
tags: ["css", "frontend"]
---

CSS has changed a lot in the last few years. Here's what actually matters.

## Custom properties

They're not just variables — they're **live**, computed at paint time, not parse time.

```css
:root {
  --accent: #4183c4;
}
```

- Cascade normally
- Inherit like any other property
- Can be updated with JS via `style.setProperty`

Check the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) for the full spec.
