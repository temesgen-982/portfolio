import { html } from '../utils/html.js';
import projects from '#data/projects.json' with { type: 'json' };

const normalize = s => s.toLowerCase().replace(/\s+/g, '');

const countBySkill = new Map();
for (const p of projects) {
  for (const t of p.tags ?? []) {
    const key = normalize(t);
    countBySkill.set(key, (countBySkill.get(key) ?? 0) + 1);
  }
}

export function skillCard() {
  return ({ name, icon }) => {
    const count = countBySkill.get(normalize(name)) ?? 0;
    const label = count === 0 ? 'No projects yet' : count === 1 ? '1 project' : `${count} projects`;
    return html`
<a href="/work/?tag=${name}" class="skill-item ${count === 0 ? 'inactive' : ''}">
  <div class="skill-icon">
    <img src="${icon}" alt="${name}">
  </div>
  <div class="skill-info">
    <span class="skill-name">${name}</span>
    <span class="skill-count">${label}</span>
  </div>
</a>`;
  };
}
