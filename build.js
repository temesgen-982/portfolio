import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || '';

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });

const pagesDir = path.join(__dirname, 'src/pages');
for (const file of fs.readdirSync(pagesDir)) {
  const name = path.basename(file, '.js');
  const { default: renderPage } = await import(path.join(pagesDir, file));
  const dir = name === 'index' ? 'dist' : `dist/${name}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, renderPage(BASE_URL));
}

fs.cpSync('css', 'dist/css', { recursive: true });
fs.cpSync('assets', 'dist/assets', { recursive: true });
console.log('Built to dist/');
