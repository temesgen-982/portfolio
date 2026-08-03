import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import { skillCard } from '../components/skill-card.js';
import { contactForm } from '../components/contact-form.js';
import { getIcon, ellipsisIcon } from '../partials/icons.js'; import socialLinks from '#data/social-links.json' with { type: 'json' };
import projects from '#data/projects.json' with { type: 'json' };
import experience from '#data/experience.json' with { type: 'json' };
import education from '#data/education.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

export default function IndexPage() {
  const content = html`
  <div class="hero center">
    <div class="blocker"></div>
    <div class="blocker"></div>
    <div class="hero-header stack">
      <h1>Hi<span class="text-outline">!</span> I'm <span class="accent-header">Temesgen.</span></h1>
      <p>A full-stack developer from Ethiopia.</p>
      <div class="button-offset">
        <a href="/work/" class="button">Explore My Work</a>
      </div>
    </div>
    <div class="hero-social">
      ${socialLinks.filter(l => l.group.includes('hero')).map((link, i) => {
    const svg = getIcon(link.icon);
    const url = link.url;
    const tooltip = link.icon === 'email' ? link.url.replace('mailto:', '') : link.icon === 'cv' ? 'View CV' : link.name;
    return html`
      <div class="tip-anchor tip-below" style="anchor-name: --tip-${i}">
        <a href="${url}" class="social-box" ${link.icon === 'cv' ? 'target="_blank" rel="noopener"' : ''}>${svg}</a>
        <div class="tip-box" style="position-anchor: --tip-${i}">${tooltip}</div>
      </div>`;
  }).join('')}
      <div class="tip-anchor tip-below" style="anchor-name: --tip-more">
        <button class="social-box ellipsis-btn" onclick="document.getElementById('moreLinks').showModal()">${ellipsisIcon}</button>
        <div class="tip-box" style="position-anchor: --tip-more">Elsewhere</div>
      </div>
    </div>
    <div class="hero-side"></div>
  </div>

  <dialog id="moreLinks" class="modal">
    <div class="modal-inner">
      <h3>Elsewhere...</h3>
      ${socialLinks.filter(l => l.group.includes('modal')).map(link =>
    html`<a href="${link.url}" target="_blank" rel="noopener">${getIcon(link.icon)} ${link.name}</a>`
  ).join('\n      ')}
      <button class="button modal-close" onclick="this.closest('dialog').close()">Close</button>
    </div>
  </dialog>
  <script>
    document.getElementById('moreLinks').addEventListener('click', e => {
      if (e.target === e.currentTarget) e.target.close();
    });
  </script>

  <div class="blocker"></div>

  <section class="projects section">
    <div class="container stack">
      <div class="projects-header">
        <h2>Selected Projects</h2>
      </div>
      <div class="project-cards">
        ${projects.map(projectCard()).join('')}
      </div>
      <div class="projects-footer">
        <a href="/work/">view more projects</a>
      </div>
    </div>
  </section>

  <section class="experience section">
    <div class="container stack">
      <div class="about-header stack">
        <h2>About</h2>
        <p>I'm a full-stack developer with a passion for building beautiful, functional, and user-centered experiences.
          I believe in the power of thoughtful system design and clean code to create meaningful impact.</p>
      </div>
      <div class="experience-header stack">
        <h2>Experience</h2>
      </div>
      <div class="timeline">
        ${experience.map(job => html`
        <div class="timeline-item">
          <div class="timeline-period">${job.period}</div>
          <h3 class="timeline-title">${job.title}</h3>
          <div class="timeline-company">${job.company}</div>
          <p class="timeline-desc">${job.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="experience section">
    <div class="container stack">
      <div class="experience-header stack">
        <h2>Education & Certificates</h2>
      </div>
      <div class="timeline">
        ${education.map(edu => html`
        <div class="timeline-item">
          <div class="timeline-period">${edu.startDate && edu.endDate && edu.startDate !== edu.endDate ? `${edu.startDate} — ${edu.endDate}` : edu.startDate || edu.endDate || ''}</div>
          <h3 class="timeline-title">${edu.title}</h3>
          <div class="timeline-company">${edu.school}</div>
          <p class="timeline-desc">${edu.desc}</p>
          ${edu.certUrl ? html`<a href="${edu.certUrl}" class="timeline-cert" target="_blank" rel="noopener">View Certificate →</a>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="skills section">
    <div class="container stack">
      <h2>Skills & Tools</h2>
      <p class="skills-intro">The tools I use to bring ideas to life. You can click to view projects.</p>
      <div class="skill-cards">
        ${skills.map(skillCard()).join('')}
      </div>
    </div>
  </section>

  <section class="contact">
    <div class="container stack">
      <div class="contact-header stack">
        <h2>Let's work together</h2>
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

  return MainLayout({ title: 'Home', active: 'home', content });
}
