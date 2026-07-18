import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import projects from '#data/projects.json' with { type: 'json' };

export default function WorkPage({ base }) {
  const content = `
  <section class="projects section">
    <div class="blocker"></div>
    <div class="container stack">
      <h2>Work</h2>
      <div class="project-cards">
        ${projects.map(projectCard({ base })).join('')}
      </div>
    </div>
  </section>`;

  return MainLayout({ title: 'Work', active: 'work', base, content });
}
