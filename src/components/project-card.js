import { html } from '../utils/html.js';

export function projectCard() {
  return ({ title, desc, image, liveUrl, projectUrl }) => html`
<article class="project-card stack">
  ${liveUrl ? html`<a href="${liveUrl}" class="live-link">Live site</a>` : ''}
  <img src="${image}" alt="${title}" class="project-image">
  <div class="stack">
    <h3>${title}</h3>
    <p>${desc}</p>
    <a href="${projectUrl}" class="button button--secondary">view project</a>
  </div>
</article>`;
}
