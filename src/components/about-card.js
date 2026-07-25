import { html } from '../utils/html.js';

export function aboutCard() {
  return ({ icon, title, desc }) => html`
<article class="about-card">
  <img class="icon" src="${icon}" alt="${title} icon">
  <h3>${title}</h3>
  <p>${desc}</p>
</article>`;
}
