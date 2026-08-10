import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { nowPlaying } from '../components/now-playing.js';
import { locationIcon } from '../partials/icons.js';
import nowEntries from '#data/now.json' with { type: 'json' };

export default function NowPage() {
  const [current] = nowEntries;

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

      <div class="now-cards">
        ${nowPlaying()}
        <div class="location-card">
          <div class="location-card__title">
            <span class="location-card__icon">${locationIcon}</span>
            <span>Location</span>
          </div>
          <div class="location-card__body">
            <span class="location-card__city">Hawassa, <br> Ethiopia</span>
            <span class="location-card__tz">EAT (UTC+3)</span>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  return MainLayout({
    title: 'Now',
    active: 'now',
    content,
    description: 'What I\'m focused on right now.',
    path: '/now/',
  });
}
