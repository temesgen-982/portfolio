import fs from 'fs';
import path from 'path';

const VOID_TAGS = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const RAW_TAGS = new Set(['script', 'style', 'pre', 'textarea']); // content preserved verbatim
const INLINE_MAX_LEN = 60; // leaf elements shorter than this collapse to one line
const INDENT = '  ';

function findHtmlLiterals(src) {
  const spans = [];
  const re = /\bhtml\s*`/g;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index + m[0].length;
    const end = scanToMatchingBacktick(src, start);
    if (end === -1) continue;
    spans.push({ start, end });
    re.lastIndex = end + 1;
  }
  return spans;
}

function scanToMatchingBacktick(src, i) {
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '`') return i;
    if (ch === '$' && src[i + 1] === '{') { i = skipExpression(src, i + 2); continue; }
    i++;
  }
  return -1;
}

function skipExpression(src, i) {
  let depth = 1;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === '{') { depth++; i++; continue; }
    if (ch === '}') { depth--; i++; continue; }
    if (ch === '`') { i = scanToMatchingBacktick(src, i + 1) + 1; continue; }
    if (ch === '"' || ch === "'") {
      i++;
      while (i < src.length && src[i] !== ch) { if (src[i] === '\\') i++; i++; }
      i++;
      continue;
    }
    i++;
  }
  return i;
}

// Masks a region of text behind a null-byte placeholder token so later
// passes (tag-splitting, reindenting) never look inside it.
function mask(str, regex, store) {
  return str.replace(regex, (match) => {
    store.push(match);
    return `\u0000${store.length - 1}\u0000`;
  });
}

function unmask(str, store) {
  // Raw-tag bodies (script/style/pre/textarea) are masked after interpolations,
  // so a body may contain nested placeholders. String.replace does not rescan
  // inserted replacement text, so loop until every placeholder is resolved.
  let prev;
  do {
    prev = str;
    str = str.replace(/\u0000(\d+)\u0000/g, (_, i) => store[Number(i)] ?? '');
  } while (str !== prev);
  return str;
}

// Masks, in order: interpolations, HTML comments, and the raw inner
// content of script/style/pre/textarea (which must never be reindented
// or split, since whitespace inside them is often meaningful).
function maskProtectedRegions(raw) {
  const store = [];
  let out = raw;

  out = mask(out, /\$\{(?:[^{}]|\{[^{}]*\})*\}/g, store);
  out = mask(out, /<!--[\s\S]*?-->/g, store);

  for (const tag of RAW_TAGS) {
    const re = new RegExp(`(<${tag}\\b[^>]*>)([\\s\\S]*?)(</${tag}>)`, 'gi');
    out = out.replace(re, (_, open, body, close) => {
      const bodyIdx = store.push(body) - 1;
      return `${open}\u0000${bodyIdx}\u0000${close}`;
    });
  }

  return { masked: out, store };
}

function tagName(token) {
  return (token.match(/^<\/?([a-zA-Z0-9-]+)/) || [])[1] || '';
}

function reindentHtml(raw) {
  const { masked, store } = maskProtectedRegions(raw);

  const tokens = masked
    .split(/(<[^>]+>)/g)
    .map(t => t.trim())
    .filter(Boolean);

  const lines = [];
  let depth = 1;
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    const isTag = token.startsWith('<');

    if (isTag) {
      const isClosing = /^<\//.test(token);
      const name = tagName(token);
      const isSelfClosing = /\/>$/.test(token) || VOID_TAGS.has(name);

      // Leaf-element collapse: <tag>text</tag> or <tag>text</tag> with a
      // single masked placeholder body, all short enough to fit one line.
      if (!isClosing && !isSelfClosing) {
        const next = tokens[i + 1];
        const after = tokens[i + 2];
        const closesNext = after && after === `</${name}>`;
        if (next && !next.startsWith('<') && closesNext) {
          const oneLine = `${token}${next}${after}`;
          if (oneLine.length <= INLINE_MAX_LEN) {
            lines.push(INDENT.repeat(depth) + oneLine);
            i += 3;
            continue;
          }
        }
      }

      if (isClosing) depth = Math.max(1, depth - 1);
      lines.push(INDENT.repeat(depth) + token);
      if (!isClosing && !isSelfClosing) depth++;
      i++;
    } else {
      lines.push(INDENT.repeat(depth) + token);
      i++;
    }
  }

  let result = '\n' + lines.join('\n') + '\n' + INDENT.repeat(Math.max(0, depth - 1));
  return unmask(result, store);
}

function formatFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8');
  const spans = findHtmlLiterals(src);
  if (spans.length === 0) return false;

  let out = '';
  let cursor = 0;
  for (const { start, end } of spans) {
    out += src.slice(cursor, start);
    out += reindentHtml(src.slice(start, end));
    cursor = end;
  }
  out += src.slice(cursor);

  if (out !== src) {
    fs.writeFileSync(filePath, out);
    return true;
  }
  return false;
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.js')) files.push(full);
  }
  return files;
}

export function formatDir(dir) {
  const files = walk(dir);
  let changed = 0;
  for (const file of files) {
    if (formatFile(file)) changed++;
  }
  return changed;
}

export function formatFileIfJs(filePath) {
  if (!filePath || !filePath.endsWith('.js') || /node_modules|dist/.test(filePath)) return false;
  return formatFile(filePath);
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] || 'src';
  if (fs.statSync(target).isDirectory()) {
    const changed = formatDir(target);
    console.log(`${changed}/${walk(target).length} file(s) changed.`);
  } else {
    const changed = formatFile(target) ? 1 : 0;
    console.log(`${changed} file(s) changed.`);
  }
}
