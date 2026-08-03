import { html } from '../utils/html.js';
import { getIcon } from './icons.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };

export function footer() {
  const items = socialLinks.map(link => {
    const url = link.url;
    const svg = getIcon(link.icon);
    return html`      <a href="${url}"${link.icon === 'cv' ? ' target="_blank" rel="noopener"' : ''}>${svg}</a>`;
  }).join('\n');

  return html`
<footer>
  <div class="container">
      <p class="footer-text">Footer what? 😂</p>
      <div class="cluster">
${items}
    </div>
  </div>
</footer>`;
}
