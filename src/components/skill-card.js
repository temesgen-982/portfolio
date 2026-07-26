import { html } from '../utils/html.js';

export function skillCard() {
  return ({ name, icon }) => html`
<a href="/work/?tag=${name}" class="stack center skill-link">
  <img src="${icon}" alt="${name}">
  <span>${name}</span>
</a>`;
}
