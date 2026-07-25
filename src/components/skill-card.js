import { html } from '../utils/html.js';

export function skillCard({ base }) {
  return ({ name, icon }) => html`
<div class="stack center">
  <img src="${base}${icon}" alt="${name}">
  <span>${name}</span>
</div>`;
}
