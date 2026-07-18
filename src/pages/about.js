import { MainLayout } from '../layouts/MainLayout.js';
import { aboutCard } from '../components/about-card.js';
import aboutCards from '#data/about-cards.json' with { type: 'json' };

export default function AboutPage(base) {
  const content = `
  <section class="about section">
    <div class="blocker"></div>
    <div class="container stack">
      <div class="about-header stack">
        <h2>About</h2>
        <p>I'm a full-stack developer with a passion for building beautiful, functional, and user-centered experiences.
          I believe in the power of thoughtful system design and clean code to create meaningful impact.</p>
      </div>
      <div class="about-cards">
        ${aboutCards.map(aboutCard(base)).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: 'About', active: 'about', content, base });
}
