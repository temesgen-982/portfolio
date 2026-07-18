import { MainLayout } from '../layouts/MainLayout.js';
import { blogCard } from '../components/blog-card.js';
import blogPosts from '#data/blog-posts.json' with { type: 'json' };

export default function BlogPage({ base }) {
  const content = `
  <section class="projects section">
    <div class="blocker"></div>
    <div class="container stack">
      <h2>Blog</h2>
      <div class="blog-cards stack">
        ${blogPosts.map(blogCard({ base })).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: 'Blog', active: 'blog', base, content });
}
