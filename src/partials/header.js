import { html } from '../utils/html.js';
import { getIcon } from './icons.js';

export function header({ active }) {
  return html`
<header>
  <div class="container">
    <a class="brand" href="/">Temesgen</a>
    <div class="header-right">
      <nav>
        <ul>
          <li><a href="/" class="${active === 'home' ? 'active' : ''}" ${active === 'home' ? 'aria-current="page"' : ''}>Home</a></li>
          <li><a href="/work/" class="${active === 'work' ? 'active' : ''}" ${active === 'work' ? 'aria-current="page"' : ''}>Work</a></li>
          <li><a href="/blog/" class="${active === 'blog' ? 'active' : ''}" ${active === 'blog' ? 'aria-current="page"' : ''}>Blog</a></li>
          <li><a href="/now/" class="${active === 'now' ? 'active' : ''}" ${active === 'now' ? 'aria-current="page"' : ''}>Now</a></li>
        </ul>
      </nav>
      <button class="theme-toggle" type="button" aria-label="Toggle color theme">
        <span class="theme-toggle-sun">${getIcon('sun')}</span>
        <span class="theme-toggle-moon">${getIcon('moon')}</span>
      </button>
    </div>
  </div>
</header>
<script>
  document.querySelector('.theme-toggle')?.addEventListener('click', function () {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
</script>`;
}