import { html } from '../utils/html.js';

export function skillCard() {
  return ({ name, icon }) => html`
<div class="stack center">
  <img src="${icon}" alt="${name}">
  <span>${name}</span>
</div>`;
}
