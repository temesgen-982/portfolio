import { html } from '../utils/html.js';

const projectHref = (p) => {
  if ((p.liveUrl ?? '').startsWith('http')) return p.liveUrl;
  if ((p.projectUrl ?? '').startsWith('http')) return p.projectUrl;
  return '';
};

export function projectCard() {
  return ({ title, desc, image, ...rest }) => {
    const href = projectHref(rest);
    const preview = href
      ? `<a href="${href}" target="_blank" rel="noopener" class="project-img-link" aria-label="Open ${title}"><img src="${image}" alt="${title}" class="project-img"></a>`
      : `<img src="${image}" alt="${title}" class="project-img">`;
    return html`
<article class="project-card">
  ${preview}
  <div class="project-info">
    <h3 class="project-title">${title}</h3>
    <p class="project-desc">${desc}</p>
  </div>
</article>`;
  };
}