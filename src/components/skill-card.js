import { html } from '../utils/html.js';

export function skillCard() {
  return ({ name, icon }) => html`
<a href="/work/?tag=${name}" class="skill-item">
  <div class="skill-icon">
    <img src="${icon}" alt="${name}">
  </div>
  <div class="skill-info">
    <span class="skill-name">${name}</span>
  </div>
</a>`;
}
