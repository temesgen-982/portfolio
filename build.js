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
  if (name === 'blog-index' || name === 'blog-post') continue;
  const { default: renderPage } = await import(path.join(pagesDir, file));
  const dir = name === 'index' ? 'dist' : `dist/${name}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, renderPage());
}

const postsDir = path.join(__dirname, 'content/blog');
if (fs.existsSync(postsDir)) {
  const { parseFrontmatter } = await import('./src/lib/frontmatter.js');
  const { markdownToHtml } = await import('./src/lib/markdown.js');
  const { BlogPostPage } = await import('./src/pages/blog-post.js');
  const { BlogIndexPage } = await import('./src/pages/blog-index.js');

  const posts = fs.readdirSync(postsDir).map(file => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    return { ...data, slug: file.replace('.md', ''), html: markdownToHtml(content) };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const post of posts) {
    fs.mkdirSync(`dist/blog/${post.slug}`, { recursive: true });
    fs.writeFileSync(`dist/blog/${post.slug}/index.html`, BlogPostPage({ post }));
  }

  fs.writeFileSync('dist/blog/index.html', BlogIndexPage({ posts }));
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
  'css/components/blog-post.css',
  'css/components/experience.css',
  'css/components/filters.css',
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
  'image.webp',
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
