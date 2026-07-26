import { html } from '../utils/html.js';

export function header({ active }) {
  return html`
<header class="cluster">
  <a href="/">Temesgen Adane</a>

  <input type="checkbox" id="menu-toggle" class="menu-checkbox">

  <label for="menu-toggle" class="menu-button">
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="mobile-menu">
        <rect id="bottom" y="16" width="26" height="4" fill="currentColor" />
        <rect id="center2" y="8" width="26" height="4" fill="currentColor" />
        <rect id="center1" y="8" width="26" height="4" fill="currentColor" />
        <rect id="top" width="26" height="4" fill="currentColor" />
      </g>
    </svg>
  </label>

  <div class="side-panel">
    <nav>
      <ul>
        <li><a href="/" class="${active === 'home' ? 'active' : ''}">Home</a></li>
        <li><a href="/work/" class="${active === 'work' ? 'active' : ''}">Work</a></li>
        <li><a href="/now/" class="${active === 'now' ? 'active' : ''}">Now</a></li>
        <li><a href="/blog/" class="${active === 'blog' ? 'active' : ''}">Blog</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}
