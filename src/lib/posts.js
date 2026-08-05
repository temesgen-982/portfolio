import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseFrontmatter } from './frontmatter.js';
import { markdownToHtml } from './markdown.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadPosts() {
  const postsDir = path.join(__dirname, '../../content/blog');
  if (!fs.existsSync(postsDir)) return [];
  const posts = fs.readdirSync(postsDir).map(file => {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    return { ...data, slug: file.replace('.md', ''), html: markdownToHtml(content) };
  });
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}
