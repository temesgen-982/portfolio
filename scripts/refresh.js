import { scrapeCommits } from './scrape-commits.js';
import { scrapeHeatmap } from './scrape-heatmap.js';

let failed = 0;

try {
  await scrapeCommits();
} catch (err) {
  failed = 1;
  console.error(`✗ commit history scrape failed: ${err.message}`);
}

try {
  await scrapeHeatmap();
} catch (err) {
  failed = 1;
  console.error(`✗ heatmap scrape failed: ${err.message}`);
}

process.exit(failed);