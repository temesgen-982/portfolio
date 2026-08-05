import { html } from '../utils/html.js';
import { header } from '../partials/header.js';
import { footer } from '../partials/footer.js';
import { prefetch } from '../partials/prefetch.js';

export function MainLayout({ title, active, content }) {
  return html`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  <link rel="stylesheet" href="/css/main.css">
</head>

<body>
  ${header({ active })}
  <main>
    ${content}
  </main>
  ${footer()}
  ${prefetch()}
</body>

</html>`;
}
