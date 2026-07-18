import { header } from '../partials/header.js';
import { footer } from '../partials/footer.js';
import { prefetch } from '../partials/prefetch.js';

export function MainLayout({ title, active, content, base }) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>

  <link rel="stylesheet" href="${base}/css/main.css">
</head>

<body>
  ${header({ active, base })}
  ${content}
  ${footer(base)}
  ${prefetch(base)}
</body>

</html>`;
}
