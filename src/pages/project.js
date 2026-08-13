import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { html } from '../utils/html.js';
import { MainLayout, SITE_URL } from '../layouts/MainLayout.js';
import { getIcon } from '../partials/icons.js';
import { projectCard } from '../components/project-card.js';
import projects from '#data/projects.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const projectHref = (p) => {
  if ((p.liveUrl ?? '').startsWith('http')) return p.liveUrl;
  if ((p.projectUrl ?? '').startsWith('http')) return p.projectUrl;
  return '';
};

const projectRepo = (p) => (p.projectUrl ?? '').startsWith('http') ? p.projectUrl : '';

const projectYear = (updated) => {
  const year = (updated ?? '').match(/\d{4}/);
  return year ? year[0] : '';
};

function loadGraph(slug) {
  try {
    const raw = fs.readFileSync(path.join(__dirname, `../../data/commits/${slug}.json`), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function renderCommitGraph(graph) {
  const { rows, width, rowHeight, laneWidth, pad } = graph;
  const x = lane => pad + lane * laneWidth;

  const rowsHtml = rows.map(row => {
    const midY = rowHeight / 2;
    let svg = '';

    for (const lane of row.passThroughLanes) {
      svg += `<line x1="${x(lane)}" y1="0" x2="${x(lane)}" y2="${rowHeight}" stroke="var(--color-border)" stroke-width="2"/>`;
    }
    if (row.hasIncoming) {
      svg += `<line x1="${x(row.lane)}" y1="0" x2="${x(row.lane)}" y2="${midY}" stroke="${row.color}" stroke-width="2"/>`;
    }
    for (const p of row.parentLanes) {
      const x1 = x(row.lane), x2 = x(p.lane);
      svg += x1 === x2
        ? `<line x1="${x1}" y1="${midY}" x2="${x2}" y2="${rowHeight}" stroke="${row.color}" stroke-width="2"/>`
        : `<path d="M${x1},${midY} C${x1},${midY + 10} ${x2},${midY - 10} ${x2},${rowHeight}" fill="none" stroke="${row.color}" stroke-width="2"/>`;
    }
    svg += `<circle cx="${x(row.lane)}" cy="${midY}" r="4" fill="${row.color}"${row.isMerge ? ' stroke="var(--color-bg-surface)" stroke-width="2"' : ''}/>`;

    return `
    <li class="commit-row">
      <svg class="commit-graph-col" width="${width}" height="${rowHeight}" viewBox="0 0 ${width} ${rowHeight}">${svg}</svg>
      <span class="commit-message">${row.message}</span>
      <a href="${row.url}" target="_blank" rel="noopener" class="commit-sha">${row.sha}</a>
    </li>`;
  }).join('');

  return `<ul class="commit-list" style="--graph-width:${width}px">${rowsHtml}</ul>`;
}

export function ProjectPage({ project }) {
  const year = projectYear(project.updated);
  const href = projectHref(project);
  const repo = projectRepo(project);
  const summary = project.summary || project.desc;
  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const highlights = project.highlights ?? [];

  const index = projects.findIndex(p => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : null;

  const sharedCount = (a, b) => (a.skills ?? []).filter(s => (b.skills ?? []).includes(s)).length;
  const related = projects
    .filter(p => p.slug !== project.slug)
    .map(p => ({ p, score: sharedCount(p, project) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(x => x.p);

  const stats = project.stats ?? [];
  const graph = loadGraph(project.slug);
  const skillMap = new Map(skills.map(s => [s.name, s]));
  const tech = (project.skills ?? []).map(name => {
    const s = skillMap.get(name);
    return s
      ? `<span class="tech-chip"><img src="${s.icon}" alt="" loading="lazy">${name}</span>`
      : `<span class="tech-chip">${name}</span>`;
  }).join('');

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
      ${(href || repo) ? html`
      <div class="project-links">
        ${href ? `<a href="${href}" target="_blank" rel="noopener" class="btn btn-primary">${getIcon('external')} Visit live site</a>` : ''}
        ${repo ? `<a href="${repo}" target="_blank" rel="noopener" class="btn btn-primary">${getIcon('github')} Source</a>` : ''}
      </div>` : ''}
    </aside>
    <main class="project-media">
      ${stats.length ? html`
      <div class="project-stats">
        ${stats.map(s => html`<div class="stat"><span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span></div>`).join('')}
      </div>` : ''}
      ${gallery.length ? html`
      <div class="media-card">
        <img src="${gallery[0]}" alt="${project.title}" loading="lazy" data-lightbox style="view-transition-name: pt-${project.slug}">
      </div>` : ''}
      ${tech ? html`
      <div class="tech-stack">
        <h2>Built with</h2>
        <p>The core technologies behind ${project.title}.</p>
        <div class="tech-list">${tech}</div>
      </div>` : ''}
      ${gallery.slice(1).map(img => html`
      <div class="media-card">
        <img src="${img}" alt="${project.title}" loading="lazy" data-lightbox>
      </div>`).join('')}
      ${highlights.length ? html`
      <div class="project-highlights">
        <h2>Highlights</h2>
        <ul>
          ${highlights.map(h => html`<li>${h}</li>`).join('')}
        </ul>
      </div>` : ''}
      ${graph ? html`
      <div class="commit-history">
        <h2>Commit history</h2>
        ${renderCommitGraph(graph)}
      </div>` : ''}
    </main>
  </div>

  <div class="lightbox" id="project-lightbox" hidden>
    <button type="button" class="lightbox-close" aria-label="Close lightbox">${closeIcon}</button>
    <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image">${getIcon('arrowRight')}</button>
    <figure class="lightbox-figure">
      <img class="lightbox-img" src="" alt="">
      <figcaption class="lightbox-count"></figcaption>
    </figure>
    <button type="button" class="lightbox-nav lightbox-next" aria-label="Next image">${getIcon('arrowRight')}</button>
  </div>

  ${(prev || next) ? html`
  <div class="container">
    <nav class="project-pager" aria-label="Project navigation">
      ${prev ? `
      <a class="pager-link pager-prev" href="/work/${prev.slug}/">
        <span class="pager-label">${getIcon('arrowRight')} Previous</span>
        <span class="pager-title">${prev.title}</span>
      </a>` : '<span class="pager-empty" aria-hidden="true"></span>'}
      ${next ? `
      <a class="pager-link pager-next" href="/work/${next.slug}/">
        <span class="pager-label">Next ${getIcon('arrowRight')}</span>
        <span class="pager-title">${next.title}</span>
      </a>` : '<span class="pager-empty" aria-hidden="true"></span>'}
    </nav>
  </div>` : ''}

  ${related.length ? html`
  <section class="project-related section">
    <div class="container stack">
      <h2>More projects</h2>
      <div class="project-cards">
        ${related.map(p => projectCard()(p)).join('')}
      </div>
    </div>
  </section>` : ''}

  <script>
    const lbImages = Array.from(document.querySelectorAll('.project-media img[data-lightbox]'));
    const lightbox = document.getElementById('project-lightbox');
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCount = lightbox.querySelector('.lightbox-count');
    let lbIndex = 0;

    function openLightbox(i) {
      lbIndex = ((i % lbImages.length) + lbImages.length) % lbImages.length;
      const img = lbImages[lbIndex];
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCount.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
    }

    lbImages.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => openLightbox(lbIndex - 1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => openLightbox(lbIndex + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(lbIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(lbIndex + 1);
    });
  </script>`;

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
