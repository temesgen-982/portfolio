const WORKER_URL = 'https://form-contact-worker.temesgen-982.workers.dev';
const TURNSTILE_SITE_KEY = '0x4AAAAAAD5OFAcmiQ2Cudbd';

export function contactForm() {
  return `
      <form id="contact-form" class="contact-form">
        <div>
          <input type="text" name="name" placeholder="Name" required>
          <input type="email" name="email" placeholder="Email" required>
        </div>
        <!-- honeypot: hidden from real users via CSS, bots often fill it -->
        <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
        <textarea name="message" placeholder="Message" rows="5" required></textarea>
        <div class="cf-turnstile" data-sitekey="${TURNSTILE_SITE_KEY}"></div>
        <button type="submit">Send Message</button>
      </form>
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      <script>
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
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
            submitBtn.textContent = 'Sent!';
          } else {
            submitBtn.textContent = 'Failed — try again';
            submitBtn.disabled = false;
            if (window.turnstile) window.turnstile.reset();
          }
        } catch {
          submitBtn.textContent = 'Failed — try again';
          submitBtn.disabled = false;
          if (window.turnstile) window.turnstile.reset();
        }
    });      
  </script>`;
}
