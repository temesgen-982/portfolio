import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { nowPlaying } from '../components/now-playing.js';
import { locationIcon } from '../partials/icons.js';
import nowEntries from '#data/now.json' with { type: 'json' };
import gallery from '#data/gallery.json' with { type: 'json' };

const ethiopiaMapPath = 'M37.906 0.000 L38.513 0.454 L39.099 0.219 L39.341 0.428 L40.026 0.440 L40.897 0.841 L41.155 1.186 L41.599 1.507 L42.010 2.094 L42.352 2.417 L42.000 2.859 L41.662 3.328 L41.740 3.604 L41.756 3.909 L42.314 3.925 L42.555 3.854 L42.777 4.033 L42.559 4.387 L42.928 4.937 L43.297 5.419 L43.679 5.776 L46.948 6.963 L47.789 6.956 L44.964 9.958 L43.661 10.002 L42.770 10.707 L42.129 10.725 L41.855 11.041 L41.172 11.040 L40.768 10.702 L39.855 11.121 L39.559 11.537 L38.893 11.459 L38.671 11.343 L38.437 11.371 L38.121 11.361 L36.855 10.512 L36.159 10.512 L35.817 10.182 L35.817 9.621 L35.298 9.453 L34.707 8.365 L34.250 8.133 L34.075 7.733 L33.568 7.246 L32.954 7.174 L33.295 6.605 L33.825 6.580 L33.975 6.275 L33.962 5.376 L34.257 4.329 L34.731 4.049 L34.832 3.640 L35.260 2.877 L35.864 2.381 L36.270 1.396 L36.430 0.537 L37.594 0.746 L37.906 0.000 Z';

export default function NowPage() {
  const [current] = nowEntries;

  const content = html`
  <section class="section">
    <div class="container stack">
      <h1>Now</h1>
      <p>This is what I'm focused on right now. Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener" style="text-decoration: underline">nownownow.com</a>.</p>
      <p class="now-updated"><em>Last updated ${current.date}</em></p>
      <ul class="now-list">
        ${current.items.map(item => html`<li>${item}</li>`).join('')}
      </ul>

      <div class="now-cards">
        ${nowPlaying()}
        <div class="location-card">
          <svg class="location-card__map" viewBox="32 0 16 12" aria-hidden="true" focusable="false">
            <path d="${ethiopiaMapPath}"/>
          </svg>
          <div class="location-card__title">
            <span class="location-card__icon">${locationIcon}</span>
            <span>Location</span>
            <span class="location-card__clock" id="local-clock" aria-label="Local time in Ethiopia">--:--</span>
          </div>
          <div class="location-card__body">
            <div class="location-card__details">
              <span class="location-card__city">Ethiopia</span>
              <span class="location-card__tz">EAT (UTC+3)</span>
            </div>
          </div>
        </div>
      </div>

      <h3 class="gallery-heading">From the gallery...</h3>
      <p>Photos from 2026.</p>
      <div class="gallery">
        ${gallery.map(photo => `
          <figure class="gallery__item">
            <img
              src="/assets/gallery/${photo.src}"
              alt="${photo.caption || (photo.date ? `Photo from ${photo.date}` : 'Photo')}"
              loading="lazy"
              decoding="async">
            <figcaption class="gallery__meta">
              ${photo.date ? `<span class="gallery__date">${photo.date}</span>` : ''}
              ${photo.caption ? `<span class="gallery__caption">${photo.caption}</span>` : ''}
            </figcaption>
          </figure>`).join('')}
      </div>
    </div>
  </section>

  <script>
    const clockEl = document.getElementById('local-clock');
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Addis_Ababa',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    function tick() {
      if (clockEl) clockEl.textContent = fmt.format(new Date());
    }
    tick();
    setInterval(tick, 10000);
  </script>`;

  return MainLayout({
    title: 'Now',
    active: 'now',
    content,
    description: 'What I\'m focused on right now.',
    path: '/now/',
  });
}
