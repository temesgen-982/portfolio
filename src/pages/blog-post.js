import { html } from '../utils/html.js';
import { MainLayout, SITE_URL } from '../layouts/MainLayout.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function BlogPostPage({ post }) {
  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.desc,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Temesgen Adane',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
  }).replace(/</g, '\\u003c');

  const content = html`
  <section class="projects section">
    <div class="container flow">
      <a href="/blog/" class="back-link">&larr; back to blog</a>
      <time class="post-date">${formatDate(post.date)}</time>
      <h1 style="view-transition-name: blog-title-${post.slug}">${post.title}</h1>
      <div class="post-content">
        ${post.html}
      </div>
    </div>
  </section>`;

  return MainLayout({
    title: post.title,
    active: 'blog',
    content,
    description: post.desc,
    path: `/blog/${post.slug}/`,
    type: 'article',
    jsonLd: articleJsonLd,
  });
}
