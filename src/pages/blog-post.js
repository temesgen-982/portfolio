import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function BlogPostPage({ post }) {
  const content = html`
  <section class="projects section">
    <div class="container flow">
      <a href="/blog/" class="back-link">&larr; back to blog</a>
      <time class="post-date">${formatDate(post.date)}</time>
      <h1>${post.title}</h1>
      <div class="post-content">
        ${post.html}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: post.title, active: 'blog', content });
}
