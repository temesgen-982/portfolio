import { html } from '../utils/html.js';
import { getIcon } from './icons.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };

const tooltipIcons = new Set(['email', 'cv']);

export function footer(base) {
  const links = socialLinks.filter(l => l.group.includes('footer'));

  const items = links.map(link => {
    const url = link.icon === 'cv' ? `${base}${link.url}` : link.url;
    const svg = getIcon(link.icon);
    if (tooltipIcons.has(link.icon)) {
      const tipId = `footer-${link.icon}-tip`;
      return html`
      <div class="tip-anchor tip-above" style="anchor-name: --${tipId}">
        <a href="${url}"${link.icon === 'cv' ? ' target="_blank" rel="noopener"' : ''}>${svg}</a>
        <div class="tip-box" style="position-anchor: --${tipId}">${link.name === 'CV' ? 'View CV' : link.url.replace('mailto:', '')}</div>
      </div>`;
    }
    return html`      <a href="${url}"${link.icon === 'cv' ? ' target="_blank" rel="noopener"' : ''}>${svg}</a>`;
  }).join('\n');

  return html`
<footer>
  <div class="container cluster">
    <span>Temesgen Adane</span>
    <div class="cluster">
${items}
    </div>
  </div>
</footer>`;
}
