import { html } from '../utils/html.js';

export function header({ active }) {
  return html`
<header>
  <div class="container">
    <a class="brand" href="/">Temesgen Adane</a>
    <nav>
      <ul>
        <li><a href="/" class="${active === 'home' ? 'active' : ''}">Home</a></li>
        <li><a href="/work/" class="${active === 'work' ? 'active' : ''}">Work</a></li>
        <li><a href="/now/" class="${active === 'now' ? 'active' : ''}">Now</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}
