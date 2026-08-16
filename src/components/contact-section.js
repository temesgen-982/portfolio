import { html } from '../utils/html.js';
import { contactForm } from './contact-form.js';
import { getIcon } from '../partials/icons.js';

export function contactSection() {
  return html`
  <section id="contact" class="contact section">
    <div class="container stack">
      <div class="contact-header stack">
        <h2 class="section-title">Let's work together</h2>
        <p>I'm always open to discussing new projects and ideas.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-list">
          <a href="mailto:tedenadane@gmail.com" class="contact-item">
            <div class="contact-left">
              <div class="icon-badge">${getIcon('email')}</div>
              <div class="contact-info">
                <span class="contact-label">Email</span>
                <span class="contact-detail">tedenadane@gmail.com</span>
              </div>
            </div>
            <div class="contact-actions">
              <button class="copy-btn" type="button" data-copy="tedenadane@gmail.com" aria-label="Copy email">${getIcon('copy')}</button>
              ${getIcon('external')}
            </div>
          </a>
          <a href="https://www.linkedin.com/in/temesgen-adane/" target="_blank" rel="noopener" class="contact-item">
            <div class="contact-left">
              <div class="icon-badge">${getIcon('linkedin')}</div>
              <div class="contact-info">
                <span class="contact-label">LinkedIn</span>
                <span class="contact-detail">linkedin.com/in/temesgen-adane</span>
              </div>
            </div>
            <div class="contact-actions">
              ${getIcon('external')}
            </div>
          </a>
          <div class="contact-item">
            <div class="contact-left">
              <div class="icon-badge">${getIcon('location')}</div>
              <div class="contact-info">
                <span class="contact-label">Location</span>
                <span class="contact-detail">Hawassa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>
        ${contactForm()}
      </div>
    </div>
  </section>

  <script>
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          btn.classList.add('copied');
          btn.setAttribute('aria-label', 'Copied!');
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.setAttribute('aria-label', 'Copy email');
          }, 1500);
        } catch { /* clipboard unavailable */ }
      });
    });
  </script>`;
}