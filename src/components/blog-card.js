import { html } from '../utils/html.js';

export function blogCard({ base }) {
  return ({ title, desc, image, date, slug, words, readTime, tags }) => html`
<article class="blog-card cluster">
  <img src="${base}${image}" alt="${title}" class="blog-card-image">
  <div class="blog-card-body stack">
    <div class="blog-card-meta cluster">
      <time>${date}</time>
      <span>${readTime}</span>
    </div>
    <h3>${title}</h3>
    <p>${desc}</p>
    <div class="blog-card-tags cluster">
      ${tags.map(tag => html`<span class="tag">${tag}</span>`).join('')}
    </div>
    <a href="${base}/blog/${slug}/" class="button button--secondary">read more</a>
  </div>
</article>`;
}
