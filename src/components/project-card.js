import { html } from '../utils/html.js';

export function projectCard() {
  return ({ title, desc, image }) => {
    return html`
<article class="project-card">
  <img src="${image}" alt="${title}" class="project-img">
  <div class="project-info">
    <h3 class="project-title">${title}</h3>
    <p class="project-desc">${desc}</p>
  </div>
</article>`;
  };
}