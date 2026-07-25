import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  fs.writeFileSync(`${dir}/index.html`, renderPage());
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
  'css/components/experience.css',
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

const assetsDir = path.join(__dirname, 'assets');
const assetsToCopy = [
  'sample-image.jpeg',
  'system-settings-svgrepo-com.svg',
  'bulb-svgrepo-com.svg',
  'terminal-svgrepo-com.svg',
  'user-circle-svgrepo-com.svg',
  'pen-tool-svgrepo-com.svg',
  'layers-svgrepo-com.svg',
  'code-svgrepo-com.svg',
  'fonts/Plus_Jakarta_Sans/PlusJakartaSans-VariableFont_wght.ttf',
  'Temesgen-Adane-CV.pdf',
];

for (const file of assetsToCopy) {
  const src = path.join(assetsDir, file);
  const dest = path.join('dist/assets', file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const langDir = path.join(assetsDir, 'language-icons');
if (fs.existsSync(langDir)) {
  fs.cpSync(langDir, 'dist/assets/language-icons', { recursive: true });
}
console.log('Built to dist/');
