import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { blogCard } from '../components/blog-card.js';
import blogPosts from '#data/blog-posts.json' with { type: 'json' };

export default function BlogPage() {
  const content = html`
  <section class="projects section">
    <div class="blocker"></div>
    <div class="container stack">
      <h2>Blog</h2>
      <div class="blog-cards stack">
        ${blogPosts.map(blogCard()).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: 'Blog', active: 'blog', content });
}
