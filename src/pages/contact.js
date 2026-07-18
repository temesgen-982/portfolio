import { MainLayout } from '../layouts/MainLayout.js';

export default function ContactPage({ base }) {
  const content = `
  <section class="contact section">
    <div class="blocker"></div>
    <div class="container stack">
      <div class="contact-header stack">
        <h2>Let's work together</h2>
        <p>I'm always open to discussing new projects and ideas.</p>
        <div>
          <button class="button button--ghost">tedenadane@gmail.com</button>
          <div class="button-offset">
            <button class="button button--primary"></button>
          </div>
        </div>
      </div>
      <form action="" class="contact-form">
        <div>
          <input type="text" placeholder="Name" required>
          <input type="email" placeholder="Email" required>
        </div>
        <textarea placeholder="Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </section>`;

  return MainLayout({ title: 'Contact', active: 'contact', base, content });
}
