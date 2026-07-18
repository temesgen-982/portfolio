import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import { aboutCard } from '../components/about-card.js';
import { skillCard } from '../components/skill-card.js';
import projects from '#data/projects.json' with { type: 'json' };
import aboutCards from '#data/about-cards.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

export default function IndexPage({ base }) {
  const content = `
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
      <a href="mailto:tedenadane@gmail.com" class="social-box"><img src="${base}/assets/email-svgrepo-com.svg" alt="Email"></a>
      <a href="https://github.com" class="social-box"><img src="${base}/assets/github-svgrepo-com.svg" alt="GitHub"></a>
      <a href="https://linkedin.com" class="social-box"><img src="${base}/assets/linkedin-svgrepo-com.svg" alt="LinkedIn"></a>
    </div>
    <div class="hero-side"></div>
  </div>

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

  return MainLayout({ title: 'Home', active: 'home', base, content });
}
