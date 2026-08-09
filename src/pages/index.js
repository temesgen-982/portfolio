import { html } from '../utils/html.js';
import { MainLayout, SITE_URL } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import { skillCard } from '../components/skill-card.js';
import { contactForm } from '../components/contact-form.js';
import { githubHeatmap } from '../components/github-heatmap.js';
import { formatDate } from '../components/blog-card.js';
import { getIcon } from '../partials/icons.js';
import { loadPosts } from '../lib/posts.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };
import projects from '#data/projects.json' with { type: 'json' };
import experience from '#data/experience.json' with { type: 'json' };
import education from '#data/education.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

export default function IndexPage() {
  const posts = loadPosts();

  const personJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Temesgen Adane',
    url: SITE_URL,
    image: `${SITE_URL}/assets/portrait.webp`,
    jobTitle: 'Full Stack Developer',
    email: 'mailto:tedenadane@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hawassa',
      addressCountry: 'ET',
    },
    sameAs: socialLinks.map(l => l.url).filter(u => u.startsWith('http')),
  }).replace(/</g, '\\u003c');

  const content = html`
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-main">
        <h1>Hi! I'm Temesgen.</h1>
        <p class="sub">A Full Stack developer from Ethiopia, with real-world experience building large scale applications.</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="/assets/Temesgen-Adane-CV.pdf" target="_blank" rel="noopener">${getIcon('download')} Download CV</a>
        </div>
      </div>
      <div class="hero-side">
        <div class="hero-social">
          ${socialLinks.filter(l => l.group.includes('hero')).map(link =>
    html`<a class="social-box" href="${link.url}" title="${link.name}" ${link.url.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${getIcon(link.icon)}</a>`
  ).join('')}
        </div>
        ${githubHeatmap(12)}
      </div>
    </div>
  </section>

  <section class="projects section">
    <div class="container stack">
      <h2 class="section-title">Projects</h2>
      <div class="project-cards">
        ${projects.map(projectCard()).join('')}
      </div>
      <a class="view-more" href="/work/">View more projects &rarr;</a>
    </div>
  </section>

  <section class="about section">
    <div class="container about-row">
      <img class="about-photo" src="/assets/portrait.webp" alt="Temesgen Adane" width="480" height="640">
      <div>
        <h2 class="section-title">About</h2>
        <p class="bio-text">I'm a full-stack developer who enjoys turning ideas into clean, useful and scalable software. I love learning, shipping and improving every day.</p>
        <a href="/assets/Temesgen-Adane-CV.pdf" class="download-btn" target="_blank" rel="noopener">${getIcon('download')} Download CV</a>
      </div>
    </div>
  </section>

  <section class="experience section">
    <div class="container">
      <div class="section-header">
        <div class="header-badge">${getIcon('work')}</div>
        <h2 class="section-title">Work experience</h2>
      </div>
      <div class="timeline">
        ${experience.map(job => html`
        <div class="timeline-item">
          <div class="timeline-date">${job.period}</div>
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div class="timeline-line"></div>
          </div>
          <div class="timeline-content">
            <h3 class="timeline-title">${job.title}</h3>
            <div class="timeline-company">${job.company}</div>
            <p class="timeline-desc">${job.desc}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="education section">
    <div class="container">
      <div class="section-header">
        <div class="header-badge">${getIcon('grad')}</div>
        <h2 class="section-title">Education</h2>
      </div>
      ${education.filter(edu => !edu.certUrl).map(edu => html`
      <div class="single-entry">
        <div class="timeline-date">${edu.startDate && edu.endDate && edu.startDate !== edu.endDate ? `${edu.startDate} — ${edu.endDate}` : edu.startDate || edu.endDate || ''}</div>
        <div>
          <h3 class="timeline-title">${edu.title}</h3>
          <div class="timeline-company">${edu.school}</div>
          <p class="timeline-desc">${edu.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </section>

  <section class="certificates section">
    <div class="container">
      <div class="section-header">
        <div class="header-badge">${getIcon('award')}</div>
        <h2 class="section-title">Certificates</h2>
      </div>
      <div class="certificates-grid">
        ${education.filter(edu => edu.certUrl).map(edu => html`
        <a href="${edu.certUrl}" class="cert-card" target="_blank" rel="noopener">
          <div class="cert-info">
            <span class="cert-title">${edu.title}</span>
            <span class="cert-issuer">${edu.school}</span>
            <span class="cert-date">${edu.endDate || edu.startDate || ''}</span>
          </div>
          ${getIcon('external')}
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="skills section">
    <div class="container stack">
      <h2 class="section-title">Skills &amp; tools</h2>
      <p class="skills-note">The tools I use to bring ideas to life.</p>
      <div class="skills-grid">
        ${skills.map(skillCard()).join('')}
      </div>
    </div>
  </section>

  <section class="writing section">
    <div class="container stack">
      <h2 class="section-title">Writing</h2>
      <p class="blog-sub">A few notes on things I've been building or learning.</p>
      <div class="blog-list">
        ${posts.map(post => html`
        <a href="/blog/${post.slug}/" class="blog-row">
          <div>
            <p class="blog-title">${post.title}</p>
            <p class="blog-excerpt">${post.desc}</p>
          </div>
          <span class="blog-date">${formatDate(post.date)}</span>
        </a>`).join('')}
      </div>
      <a href="/blog/" class="blog-all">All posts &rarr;</a>
    </div>
  </section>

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

  return MainLayout({
    title: 'Home',
    active: 'home',
    content,
    description: 'Temesgen Adane — a full stack developer from Ethiopia building fast, scalable web applications.',
    path: '/',
    jsonLd: personJsonLd,
  });
}
