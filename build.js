import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || '';

if (fs.existsSync('dist')) {
  for (const entry of fs.readdirSync('dist')) {
    fs.rmSync(`dist/${entry}`, { recursive: true, force: true });
  }
} else {
  fs.mkdirSync('dist', { recursive: true });
}

const pagesDir = path.join(__dirname, 'src/pages');
for (const file of fs.readdirSync(pagesDir)) {
  const name = path.basename(file, '.js');
  const { default: renderPage } = await import(path.join(pagesDir, file));
  const dir = name === 'index' ? 'dist' : `dist/${name}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, renderPage({ base: BASE_URL }));
}

const cssOrder = [
  'css/tokens.css',
  'css/reset.css',
  'css/base.css',
  'css/layout.css',
  'css/buttons.css',
  'css/components/header.css',
  'css/components/hero.css',
  'css/components/project-card.css',
  'css/components/blog-card.css',
  'css/components/about-card.css',
  'css/components/skill-cards.css',
  'css/components/contact.css',
  'css/components/footer.css',
  'css/components/side-panel.css',
  'css/utilities.css',
];

const cssDir = path.join(__dirname, 'css');
const allCssFiles = fs.readdirSync(cssDir, { recursive: true })
  .filter(f => f.endsWith('.css'))
  .map(f => `css/${f}`);

const missing = allCssFiles.filter(f => !cssOrder.includes(f));
if (missing.length) {
  throw new Error(`CSS files not in cssOrder: ${missing.join(', ')}`);
}

fs.mkdirSync('dist/css', { recursive: true });
fs.writeFileSync('dist/css/main.css', cssOrder.map(f => fs.readFileSync(f, 'utf-8')).join('\n\n'));

fs.cpSync('assets', 'dist/assets', { recursive: true });
console.log('Built to dist/');
