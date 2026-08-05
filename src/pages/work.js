import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import projects from '#data/projects.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

export default function WorkPage() {
  const categories = [...new Set(projects.map(p => p.category))];
  const tagSet = new Set();
  for (const p of projects) p.tags.forEach(t => tagSet.add(t));
  const tags = skills.map(s => s.name).filter(t => tagSet.has(t));

  const content = html`
  <section class="projects section">
    <div class="container stack">
      <h2>Work</h2>
      <p>A selection of projects I've built.</p>

      <div class="filters">
        <div class="filter-group">
          <label for="category-filter">Category</label>
          <select id="category-filter" data-filter="category">
            <option value="all">All</option>
            ${categories.map(c => html`<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="tag-filter">Skills & Tools</label>
          <select id="tag-filter" data-filter="tag">
            <option value="all">All</option>
            ${tags.map(t => html`<option value="${t}">${t}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="project-cards">
        ${projects.map(p => {
          const card = projectCard()(p);
          return card.replace('<article', `<article data-category="${p.category}" data-tags="${p.tags.join(',')}"`);
        }).join('')}
      </div>
    </div>
  </section>

  <script>
    function filterProjects() {
      const category = document.getElementById('category-filter').value;
      const tag = document.getElementById('tag-filter').value;

      document.querySelectorAll('.project-card').forEach(card => {
        const matchCategory = category === 'all' || card.dataset.category === category;
        const matchTag = tag === 'all' || card.dataset.tags.split(',').includes(tag);
        card.classList.toggle('filtered-out', !(matchCategory && matchTag));
      });
    }

    document.querySelectorAll('.filters select').forEach(select => {
      select.addEventListener('change', filterProjects);
    });

    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get('tag');
    const categoryParam = params.get('category');
    if (categoryParam) {
      const catSelect = document.getElementById('category-filter');
      if ([...catSelect.options].some(o => o.value === categoryParam)) {
        catSelect.value = categoryParam;
      }
    }
    if (tagParam) {
      const tagSelect = document.getElementById('tag-filter');
      if ([...tagSelect.options].some(o => o.value === tagParam)) {
        tagSelect.value = tagParam;
      }
    }
    if (categoryParam || tagParam) filterProjects();
  </script>`;

  return MainLayout({ title: 'Work', active: 'work', content });
}
