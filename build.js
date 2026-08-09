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
  if (name === 'blog-index' || name === 'blog-post' || name === 'project') continue;
  const { default: renderPage } = await import(path.join(pagesDir, file));
  const dir = name === 'index' ? 'dist' : `dist/${name}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/index.html`, renderPage());
}

const { loadPosts } = await import('./src/lib/posts.js');
const { BlogPostPage } = await import('./src/pages/blog-post.js');
const { BlogIndexPage } = await import('./src/pages/blog-index.js');

const posts = loadPosts();
if (posts.length > 0) {
  for (const post of posts) {
    fs.mkdirSync(`dist/blog/${post.slug}`, { recursive: true });
    fs.writeFileSync(`dist/blog/${post.slug}/index.html`, BlogPostPage({ post }));
  }

  fs.writeFileSync('dist/blog/index.html', BlogIndexPage({ posts }));
}

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/projects.json'), 'utf-8'));
const { ProjectPage } = await import('./src/pages/project.js');
for (const project of projects) {
  fs.mkdirSync(`dist/work/${project.slug}`, { recursive: true });
  fs.writeFileSync(`dist/work/${project.slug}/index.html`, ProjectPage({ project }));
}

const { SITE_URL } = await import('./src/layouts/MainLayout.js');
const siteUrls = ['/', '/work/', '/blog/', '/now/']
  .concat(posts.map(p => `/blog/${p.slug}/`))
  .concat(projects.map(p => `/work/${p.slug}/`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${siteUrls.map(u => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync('dist/sitemap.xml', sitemap);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

const cssOrder = [
  'css/tokens.css',
  'css/reset.css',
  'css/base.css',
  'css/layout.css',
  'css/buttons.css',
  'css/components/header.css',
  'css/components/hero.css',
  'css/components/project-card.css',
  'css/components/project.css',
  'css/components/blog-card.css',
  'css/components/blog-post.css',
  'css/components/experience.css',
  'css/components/filters.css',
  'css/components/skill-cards.css',
  'css/components/github-heatmap.css',
  'css/components/contact.css',
  'css/components/footer.css',
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
  'Temesgen-Adane-CV.pdf',
  'portrait.webp',
];

for (const file of assetsToCopy) {
  const src = path.join(assetsDir, file);
  const dest = path.join('dist/assets', file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const projectsDir = path.join(assetsDir, 'projects');
if (fs.existsSync(projectsDir)) {
  fs.cpSync(projectsDir, 'dist/assets/projects', { recursive: true });
}

const langDir = path.join(assetsDir, 'language-icons');
if (fs.existsSync(langDir)) {
  fs.cpSync(langDir, 'dist/assets/language-icons', { recursive: true });
}
console.log('Built to dist/');
