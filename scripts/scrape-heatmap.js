import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERNAME = 'temesgen-982';

async function scrapeContributions() {
  const res = await fetch(`https://github.com/users/${USERNAME}/contributions`);
  if (!res.ok) {
    throw new Error(`Failed to fetch contributions: ${res.status}`);
  }
  const html = await res.text();

  const cellRegex = /data-date="([\d-]+)"[^>]*data-level="(\d)"/g;
  const points = [];
  let match;
  while ((match = cellRegex.exec(html)) !== null) {
    points.push({ date: match[1], level: parseInt(match[2], 10) });
  }

  if (points.length === 0) {
    throw new Error('No contribution data found — GitHub may have changed their markup.');
  }

  points.sort((a, b) => a.date.localeCompare(b.date));

  const epoch = new Date(points[0].date + 'T00:00:00Z');
  const grid = [];
  for (const point of points) {
    const day = new Date(point.date + 'T00:00:00Z');
    const week = Math.floor((day - epoch) / (7 * 24 * 60 * 60 * 1000));
    if (!grid[week]) grid[week] = new Array(7).fill(0);
    grid[week][day.getUTCDay()] = point.level;
  }

  return grid;
}

function validateGrid(grid) {
  const totalCells = grid.flat().filter(v => v !== undefined).length;
  if (grid.length < 40) {
    throw new Error(`Suspiciously few weeks scraped: ${grid.length} (expected ~52-53)`);
  }
  if (totalCells < 200) {
    throw new Error(`Suspiciously few data points: ${totalCells}`);
  }
  const invalidLevels = grid.flat().filter(v => v !== undefined && (v < 0 || v > 4));
  if (invalidLevels.length > 0) {
    throw new Error(`Found invalid contribution levels: ${invalidLevels.join(', ')}`);
  }
}

export async function scrapeHeatmap() {
  const grid = await scrapeContributions();
  validateGrid(grid);
  const out = path.join(__dirname, '../data/github-heatmap.json');
  fs.writeFileSync(out, JSON.stringify(grid));
  console.log(`Scraped ${grid.length} weeks of contribution data.`);
  return grid;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await scrapeHeatmap();
}
