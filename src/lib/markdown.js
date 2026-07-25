import { marked } from './marked.esm.js';

export function markdownToHtml(md) {
  return marked.parse(md);
}
