import { html, escapeHtml } from '../utils/html.js';
import { header } from '../partials/header.js';
import { footer } from '../partials/footer.js';
import { prefetch } from '../partials/prefetch.js';

export const SITE_NAME = 'Temesgen Adane';
export const SITE_URL = 'https://temesgen.dev.et';

const siteDescription = 'Full stack developer from Ethiopia building large scale web applications.';
const siteImage = `${SITE_URL}/assets/portrait.webp`;

export function MainLayout({
  title,
  active,
  content,
  description = siteDescription,
  path = '/',
  image = siteImage,
  type = 'website',
  jsonLd,
}) {
  const pageTitle = title === 'Home' ? `${SITE_NAME} — Full Stack Developer` : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;
  const metaDescription = description;

  return html`<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(metaDescription)}">
  <link rel="canonical" href="${url}">

  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDescription)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
  <meta name="twitter:image" content="${image}">

  <link rel="stylesheet" href="/css/main.css">
  ${jsonLd ? `<script type="application/ld+json">${jsonLd}</script>` : ''}
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