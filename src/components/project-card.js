import { html } from '../utils/html.js';
import { githubIcon } from '../partials/icons.js';
import skills from '#data/skills.json' with { type: 'json' };

const skillByName = new Map(skills.map(s => [s.name, s]));

const externalIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
const calendarIcon = `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;

export function projectCard() {
  return ({ title, desc, image, projectUrl, liveUrl, skills = [], theme = 'orange', updated = '' }) => {
    const techTags = skills
      .map(name => skillByName.get(name))
      .filter(Boolean)
      .slice(0, 2)
      .map(skill => html`
      <span class="skill-tag" style="color: ${skill.color}">
        <img src="${skill.icon}" alt="${skill.name}">
        <span>${skill.name}</span>
      </span>`).join('');

    const accent = skills.map(name => skillByName.get(name)).find(Boolean)?.color ?? '';

    return html`
<article class="project-card theme-${theme}" style="${accent ? `--theme-accent: ${accent};` : ''}">
  <div class="card-preview">
    <img src="${image}" alt="${title}">
  </div>
  <div class="card-content">
    <div>
      <div class="card-header">
        <div class="tech-tag">
          ${techTags}
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${desc}</p>
      </div>
    </div>
    <div>
      <div class="card-links">
        ${liveUrl ? html`<a href="${liveUrl}" class="action-link live">${externalIcon} Live Demo</a><div class="divider"></div>` : ''}
        <a href="${projectUrl}" class="action-link code">${githubIcon} View Project</a>
      </div>
      <div class="card-footer">
        ${updated ? html`<div class="footer-item">${calendarIcon} Updated ${updated}</div>` : ''}
      </div>
    </div>
  </div>
</article>`;
  };
}
