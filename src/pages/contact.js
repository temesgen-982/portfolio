import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { contactForm } from '../components/contact-form.js';

export default function ContactPage() {
  const content = html`
  <section class="contact section">
    <div class="blocker"></div>
    <div class="container stack">
      <div class="contact-header stack">
        <h2>Let's work together</h2>
        <p>I'm always open to discussing new projects and ideas.</p>
        <div>
          <button class="button button--ghost">tedenadane@gmail.com</button>
          <div class="button-offset">
            <button class="button button--primary" onclick="navigator.clipboard.writeText('tedenadane@gmail.com').then(() => this.textContent = 'Copied!')">Copy</button>
          </div>
        </div>
      </div>
      ${contactForm()}
    </div>
  </section>`;

  return MainLayout({ title: 'Contact', active: 'contact', content });
}
