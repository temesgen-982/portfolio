import { html } from '../utils/html.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function blogCard() {
  return ({ title, desc, date, slug }) => html`
<article class="blog-card">
  <time class="blog-card-date">${formatDate(date)}</time>
  <div class="blog-card-body">
    <h3><a href="/blog/${slug}/">${title}</a></h3>
    <p>${desc}</p>
  </div>
</article>`;
}
