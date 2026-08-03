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
    const label = count === 1 ? '1 Project' : `${count} Projects`;
    return html`
<a href="/work/?tag=${name}" class="tech-card">
  <div class="card-left">
    <div class="tech-icon">
      <img src="${icon}" alt="${name}">
    </div>
    <div class="tech-info">
      <span class="tech-name">${name}</span>
      <span class="tech-count">${label}</span>
    </div>
  </div>
</a>`;
  };
}
