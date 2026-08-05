import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import nowEntries from '#data/now.json' with { type: 'json' };

export default function NowPage() {
  const [current, ...past] = nowEntries;

  const content = html`
  <section class="section">
    <div class="container stack">
      <h2>Now</h2>
      <p>This is what I'm focused on right now. Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener" style="text-decoration: underline">nownownow.com</a>.</p>
      <ul class="stack">
        ${current.items.map(item => html`<li>${item}</li>`).join('')}
      </ul>
      <p><em>Last updated ${current.date}</em></p>

      <hr>

      <h3>Past entries</h3>
      <div class="stack">
        ${past.map(entry => html`
          <details>
            <summary>${entry.date}</summary>
            <ul>
              ${entry.items.map(item => html`<li>${item}</li>`).join('')}
            </ul>
          </details>
        `).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: 'Now', active: 'now', content });
}
