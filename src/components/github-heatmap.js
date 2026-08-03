import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { html } from '../utils/html.js';
import { getIcon } from '../partials/icons.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadHeatmap() {
  try {
    const raw = fs.readFileSync(path.join(__dirname, '../../data/github-heatmap.json'), 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function githubHeatmap(weeks = 5) {
  const heatmap = loadHeatmap();
  if (heatmap.length === 0) return '';

  const cells = heatmap
    .slice(-weeks)
    .map(week =>
      week
        .map(level =>
          level === undefined
            ? `<div class="heatmap-cell heatmap-cell--empty"></div>`
            : `<div class="heatmap-cell" data-level="${level}"></div>`
        )
        .join('')
    )
    .join('');

  return html`
<div class="github-heatmap" role="img" aria-label="GitHub contribution activity">
  <span class="heatmap-label">${getIcon('github')} Last ${weeks} weeks</span>
  <div class="heatmap-grid">
    ${cells}
  </div>
</div>`;
}
