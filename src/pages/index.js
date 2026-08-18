import { html } from '../utils/html.js';
import { MainLayout, SITE_URL } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import { contactSection } from '../components/contact-section.js';
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
    sameAs: socialLinks.map(l => l.url).filter(u => u.startsWith('http')),
  }).replace(/</g, '\\u003c');

  const heroSocials = [
    { name: 'Telegram', url: 'https://t.me/beshow', icon: 'telegram' },
    { name: 'GitHub', url: 'https://github.com/temesgen-982', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/temesgen-adane/', icon: 'linkedin' },
  ];

  const content = html`
  <section class="hero">
    <div class="container hero-inner">
      <div class="hero-portrait">
        <img src="/assets/portrait.webp" alt="Temesgen Adane" width="192" height="192" loading="eager" fetchpriority="high">
      </div>
      <div class="hero-main">
        <h1>Temesgen Adane</h1>
        <p class="hero-title">Full Stack Developer</p>
        <p class="hero-bio">I like making things from scratch, figuring out how they work, and sometimes making them far more complicated than they need to be.<br>Read my <a href="/blog/">blog</a>.</p>
        <p class="hero-location">${getIcon('location')} Ethiopia (UTC+3)</p>
        <div class="hero-actions">
          <div class="hero-socials">
            ${heroSocials.map(link =>
    html`<a class="social-pill" href="${link.url}" title="${link.name}" target="_blank" rel="noopener">${getIcon(link.icon)}</a>`
  ).join('')}
          </div>
          <a class="btn btn-primary" href="/assets/Temesgen-Adane-CV.pdf" target="_blank" rel="noopener">${getIcon('download')} Resume</a>
          <a class="btn btn-primary" href="mailto:tedenadane@gmail.com">${getIcon('email')} Email</a>
        </div>
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
      <a class="view-more" href="/assets/Temesgen-Adane-CV.pdf" target="_blank" rel="noopener">View my full resume ${getIcon('external')}</a>
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

  <section class="projects section">
    <div class="container stack">
      <div class="section-header">
        <div class="header-badge">${getIcon('folder')}</div>
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="project-cards">
        ${projects.slice(0, 4).map(projectCard()).join('')}
      </div>
      <a class="view-more" href="/work/">All projects [${String(projects.length).padStart(2, '0')}] ${getIcon('external')}</a>
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
      <div class="section-header">
        <div class="header-badge">${getIcon('code')}</div>
        <h2 class="section-title">Skills &amp; tools</h2>
      </div>
      <p class="skills-note">I build with these every day — <a href="/work/">see them in action</a>.</p>
      <div class="skill-chips">
        ${skills.map(skill => html`
        <div class="skill-chip">
          <img src="${skill.icon}" alt="" width="16" height="16" loading="lazy">
          <span>${skill.name}</span>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="github section">
    <div class="container stack">
      <div class="section-header">
        <div class="header-badge">${getIcon('github')}</div>
        <h2 class="section-title">GitHub</h2>
      </div>
      ${githubHeatmap()}
    </div>
  </section>

  <section class="writing section">
    <div class="container stack">
      <div class="section-header">
        <div class="header-badge">${getIcon('pen')}</div>
        <h2 class="section-title">Writing</h2>
      </div>
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

  ${contactSection()}`;

  return MainLayout({
    title: 'Home',
    active: 'home',
    content,
    description: 'Temesgen Adane — a full stack developer from Ethiopia building fast, scalable web applications.',
    path: '/',
    jsonLd: personJsonLd,
  });
}
