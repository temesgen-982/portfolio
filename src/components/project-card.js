import { html } from '../utils/html.js';
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

export function projectCard() {
  return ({ title, desc, image, skills, updated, slug, ...rest }) => {
    const href = projectHref(rest);
    const year = projectYear(updated);
    return html`
<article class="project-card">
  <div class="project-preview">
    <img src="${image}" alt="${title}" class="project-img" loading="lazy" style="view-transition-name: pt-${slug}">
    <div class="project-actions">
      ${href ? `<a href="${href}" target="_blank" rel="noopener" class="project-action" aria-label="Open ${title}" title="Live site"><span>Live</span>${getIcon('external')}</a>` : ''}
      ${slug ? `<a href="/work/${slug}/" class="project-action" aria-label="More about ${title}" title="More"><span>More</span>${getIcon('arrowRight')}</a>` : ''}
    </div>
  </div>
  <div class="project-info">
    <div class="project-meta">
      <span class="status-dot"></span>
      ${year ? `<span class="project-year">${year}</span>` : ''}
    </div>
    <h3 class="project-title">${title}</h3>
    <p class="project-desc">${desc}</p>
    <div class="project-tags">
      ${(skills ?? []).map(t => html`<span class="tag">${t}</span>`).join('')}
    </div>
  </div>
</article>`;
  };
}