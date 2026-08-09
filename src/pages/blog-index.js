import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { blogCard } from '../components/blog-card.js';

export function BlogIndexPage({ posts }) {
  const content = html`
  <section class="projects section">
    <div class="container stack">
      <h2>Blog</h2>
      <p class="blog-intro">I usually write most of the blogs to clarify things for myself.</p>
      <div class="blog-cards">
        ${posts.map(blogCard()).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({
    title: 'Blog',
    active: 'blog',
    content,
    description: 'Notes on things I\'ve been building or learning as a full stack developer.',
    path: '/blog/',
  });
}
