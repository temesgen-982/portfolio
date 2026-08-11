import { html } from '../utils/html.js';
import { MainLayout, SITE_URL } from '../layouts/MainLayout.js';
import { getIcon } from '../partials/icons.js';

const projectHref = (p) => {
  if ((p.liveUrl ?? '').startsWith('http')) return p.liveUrl;
  if ((p.projectUrl ?? '').startsWith('http')) return p.projectUrl;
  return '';
};

const projectYear = (updated) => {
  const year = (updated ?? '').match(/\d{4}/);
  return year ? year[0] : '';
};

export function ProjectPage({ project }) {
  const year = projectYear(project.updated);
  const href = projectHref(project);
  const summary = project.summary || project.desc;
  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const highlights = project.highlights ?? [];

  const articleJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.desc,
    image: `${SITE_URL}${project.image}`,
    url: `${SITE_URL}/work/${project.slug}/`,
    author: {
      '@type': 'Person',
      name: 'Temesgen Adane',
      url: SITE_URL,
    },
  }).replace(/</g, '\\u003c');

  const content = html`
  <div class="project-layout section">
    <aside class="project-sticky">
      <a href="/work/" class="back-link" onclick="event.preventDefault(); if (window.history.length > 1) { history.back(); } else { location.href = '/work/'; }">&larr; Back</a>
      <h1 class="project-title-lg">${project.title}</h1>
      <p class="project-desc-lg">${summary}</p>
      <div class="project-meta">
        ${year ? `<span class="project-year">${year}</span>` : ''}
        <span>${(project.skills ?? []).length} skills</span>
      </div>
      <div class="project-tags">
        ${(project.skills ?? []).map(t => html`<span class="tag">${t}</span>`).join('')}
      </div>
      ${href ? `<a href="${href}" target="_blank" rel="noopener" class="btn btn-primary project-visit">${getIcon('external')} Visit live site</a>` : ''}
    </aside>
    <main class="project-media">
      ${gallery.map((img, i) => html`
      <div class="media-card">
        <img src="${img}" alt="${project.title}" loading="lazy" ${i === 0 ? `style="view-transition-name: pt-${project.slug}"` : ''}>
      </div>`).join('')}
      ${highlights.length ? html`
      <div class="project-highlights">
        <h2>Highlights</h2>
        <ul>
          ${highlights.map(h => html`<li>${h}</li>`).join('')}
        </ul>
      </div>` : ''}
    </main>
  </div>`;

  return MainLayout({
    title: project.title,
    active: 'work',
    content,
    description: project.desc,
    path: `/work/${project.slug}/`,
    type: 'article',
    jsonLd: articleJsonLd,
  });
}
