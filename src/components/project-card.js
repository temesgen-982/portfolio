import { html } from '../utils/html.js';
import { getIcon } from '../partials/icons.js';
import skills from '#data/skills.json' with { type: 'json' };

const skillByName = new Map(skills.map(s => [s.name, s]));

export function projectCard() {
  return ({ title, desc, image, projectUrl, liveUrl, skills = [], updated = '' }) => {
    const tags = skills
      .map(name => skillByName.get(name))
      .filter(Boolean)
      .slice(0, 2)
      .map(skill => html`
      <span class="skill-tag" style="color: ${skill.color}; background: color-mix(in srgb, ${skill.color} 12%, transparent)">${skill.name}</span>`)
      .join('');

    return html`
<article class="project-card">
  <div class="card-preview">
    <img src="${image}" alt="${title}">
  </div>
  <div class="card-body-wrap">
    <div>
      <h3 class="card-title">${title}</h3>
      <p class="card-description">${desc}</p>
      <div class="tech-tag">
        ${tags}
      </div>
    </div>
    <div class="card-bottom">
      <div class="card-links">
        ${liveUrl ? html`<a href="${liveUrl}" class="action-link live">${getIcon('external')} Live demo</a>` : ''}
        ${projectUrl ? html`<a href="${projectUrl}" class="action-link code">${getIcon('arrowRight')} Case study</a>` : ''}
      </div>
      ${updated ? html`<span class="card-footer">${updated}</span>` : ''}
    </div>
  </div>
</article>`;
  };
}
