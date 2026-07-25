import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import { aboutCard } from '../components/about-card.js';
import { skillCard } from '../components/skill-card.js';
import { contactForm } from '../components/contact-form.js';
import { getIcon, ellipsisIcon } from '../partials/icons.js';
import socialLinks from '#data/social-links.json' with { type: 'json' };
import projects from '#data/projects.json' with { type: 'json' };
import aboutCards from '#data/about-cards.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

export default function IndexPage({ base }) {
  const content = html`
  <div class="hero center">
    <div class="blocker"></div>
    <div class="blocker"></div>
    <div class="hero-header stack">
      <h1>Temesgen Adane</h1>
      <p>A Full-stack developer crafting digital experiences from concept to reality.</p>
      <div class="button-offset">
        <a href="${base}/work/" class="button button--primary">Explore My Work</a>
      </div>
    </div>
    <div class="hero-social">
      ${socialLinks.filter(l => l.group.includes('hero')).map(link => {
    const svg = getIcon(link.icon);
    const url = link.icon === 'cv' ? `${base}${link.url}` : link.url;
    if (link.icon === 'email') {
      return html`
      <div class="tip-anchor tip-below" style="anchor-name: --email-tip">
        <a href="${url}" class="social-box">${svg}</a>
        <div class="tip-box" style="position-anchor: --email-tip">${link.url.replace('mailto:', '')}</div>
      </div>`;
    }
    if (link.icon === 'cv') {
      return html`
      <div class="tip-anchor tip-below" style="anchor-name: --cv-tip">
        <a href="${url}" class="social-box" target="_blank" rel="noopener">${svg}</a>
        <div class="tip-box" style="position-anchor: --cv-tip">View CV</div>
      </div>`;
    }
    return html`      <a href="${url}" class="social-box">${svg}</a>`;
  }).join('')}
      <button class="social-box ellipsis-btn" onclick="document.getElementById('moreLinks').showModal()">${ellipsisIcon}</button>
    </div>
    <div class="hero-side"></div>
  </div>

  <dialog id="moreLinks" class="modal">
    <div class="modal-inner">
      <h3>Elsewhere...</h3>
      ${socialLinks.filter(l => l.group.includes('modal')).map(link =>
    html`<a href="${link.url}" target="_blank" rel="noopener">${getIcon(link.icon)} ${link.name}</a>`
  ).join('\n      ')}
      <button class="button button--ghost modal-close" onclick="this.closest('dialog').close()">Close</button>
    </div>
  </dialog>
  <script>
    document.getElementById('moreLinks').addEventListener('click', e => {
      if (e.target === e.currentTarget) e.target.close();
    });
  </script>

  <section class="projects section">
    <div class="blocker"></div>
    <div class="container stack">
      <div class="projects-header cluster">
        <h2>Selected Projects</h2>
        <a href="${base}/work/">view more</a>
      </div>
      <div class="project-cards">
        ${projects.map(projectCard({ base })).join('')}
      </div>
    </div>
  </section>

  <section class="about section">
    <div class="blocker"></div>
    <div class="container stack">
      <div class="about-header stack">
        <h2>About</h2>
        <p>I'm a full-stack developer with a passion for building beautiful, functional, and user-centered experiences.
          I believe in the power of thoughtful system design and clean code to create meaningful impact.</p>
        <div class="button-offset">
          <a href="${base}/about/" class="button button--primary">Learn more</a>
        </div>
      </div>
      <div class="about-cards">
        ${aboutCards.map(aboutCard({ base })).join('')}
      </div>
    </div>
  </section>

  <section class="skills section">
    <div class="blocker"></div>
    <div class="container stack">
      <h2>Skills & Tools</h2>
      <div class="skill-cards">
        ${skills.map(skillCard({ base })).join('')}
      </div>
    </div>
  </section>

  <section class="contact">
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

  return MainLayout({ title: 'Home', active: 'home', base, content });
}
