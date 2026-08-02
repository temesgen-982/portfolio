import { html } from '../utils/html.js';
import { getIcon } from './icons.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };

export function footer() {
  const links = socialLinks.filter(l => l.group.includes('footer'));

  const items = links.map(link => {
    const url = link.url;
    const svg = getIcon(link.icon);
    return html`      <a href="${url}"${link.icon === 'cv' ? ' target="_blank" rel="noopener"' : ''}>${svg}</a>`;
  }).join('\n');

  return html`
<footer>
  <div class="container">
    <div class="stack">
      <span>My Socials:</span>
      <div class="cluster">
${items}
      </div>
    </div>
  </div>
</footer>`;
}
