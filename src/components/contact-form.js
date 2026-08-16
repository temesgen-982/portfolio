import { html } from '../utils/html.js';
import { sendIcon } from '../partials/icons.js';

const WORKER_URL = 'https://form-contact-worker.temesgen-982.workers.dev';
const TURNSTILE_SITE_KEY = '0x4AAAAAAD5OFAcmiQ2Cudbd';

export function contactForm() {
  return html`
      <form id="contact-form" class="contact-form">
        <div>
          <label class="sr-only" for="contact-name">Name</label>
          <input type="text" id="contact-name" name="name" placeholder="Name" required>
          <label class="sr-only" for="contact-email">Email</label>
          <input type="email" id="contact-email" name="email" placeholder="Email" required>
        </div>
        <!-- honeypot: hidden from real users via CSS, bots often fill it -->
        <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
        <label class="sr-only" for="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="Message" rows="5" required></textarea>
        <div class="cf-turnstile" data-sitekey="${TURNSTILE_SITE_KEY}"></div>
        <button type="submit" class="submit-btn">${sendIcon} Send Message</button>
      </form>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      <script>
        const sendIcon = ${JSON.stringify(sendIcon)};
        function setBtnLabel(btn, label) {
          btn.innerHTML = sendIcon + ' ' + label;
        }
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        setBtnLabel(submitBtn, 'Sending...');
        const payload = {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
          website: form.website.value,
          turnstileToken: form.querySelector('[name="cf-turnstile-response"]')?.value,
        };
        try {
          const res = await fetch('https://form-contact-worker.temesgen-982.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const result = await res.json();
          if (result.success) {
            form.reset();
            setBtnLabel(submitBtn, 'Sent!');
          } else {
            setBtnLabel(submitBtn, 'Failed — try again');
            submitBtn.disabled = false;
            if (window.turnstile) window.turnstile.reset();
          }
        } catch {
          setBtnLabel(submitBtn, 'Failed — try again');
          submitBtn.disabled = false;
          if (window.turnstile) window.turnstile.reset();
        }
    });
  </script>`;
}
