import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { html } from '../utils/html.js';

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

export function githubHeatmap(maxWeeks = 53) {
  const heatmap = loadHeatmap();
  if (heatmap.length === 0) return '';

  const weeks = heatmap.slice(-maxWeeks);

  const grid = weeks
    .map(week =>
      `<div class="heatmap-week">${week
        .map(level =>
          level === undefined
            ? `<div class="heatmap-cell heatmap-cell--empty"></div>`
            : `<div class="heatmap-cell" data-level="${level}"></div>`
        )
        .join('')}</div>`
    )
    .join('');

  return html`
<div class="github-heatmap" role="img" aria-label="GitHub contribution activity">
  <span class="heatmap-label"><span class="heatmap-count">Last 0 weeks</span></span>
  <div class="heatmap-grid">
    ${grid}
  </div>
</div>
<script>
  (function () {
    const heatmap = document.querySelector('.github-heatmap');
    if (!heatmap) return;
    const grid = heatmap.querySelector('.heatmap-grid');
    const countEl = heatmap.querySelector('.heatmap-count');
    const weeks = Array.from(grid.querySelectorAll('.heatmap-week'));
    const CELL = 14;
    const GAP = 4;

    function fit() {
      const visible = Math.min(weeks.length, Math.max(6, Math.floor((grid.clientWidth + GAP) / (CELL + GAP))));
      weeks.forEach((week, i) => {
        week.style.display = i < visible ? '' : 'none';
      });
      countEl.textContent = 'Last ' + visible + ' weeks';
    }

    fit();
    window.addEventListener('resize', fit);
    requestAnimationFrame(fit);
  })();
</script>`;
}