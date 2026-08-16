import { html } from '../utils/html.js';
import { getIcon } from './icons.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };

export function footer() {
  const items = socialLinks
    .filter(link => link.group.includes('footer'))
    .map(link => {
      const url = link.url;
      const svg = getIcon(link.icon);
      return html`      <a href="${url}" title="${link.name}" aria-label="${link.name}" ${link.icon === 'cv' ? 'target="_blank" rel="noopener"' : ''}>${svg}</a>`;
    })
    .join('\n');

  return html`
<footer>
  <div class="container">
    <div class="footer-socials">
      ${items}
    </div>
  </div>
</footer>`;
}