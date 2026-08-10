import { html } from '../utils/html.js';
import { MainLayout } from '../layouts/MainLayout.js';
import { projectCard } from '../components/project-card.js';
import projects from '#data/projects.json' with { type: 'json' };
import skills from '#data/skills.json' with { type: 'json' };

const closeIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export default function WorkPage() {
  const used = new Set(projects.flatMap(p => p.skills));
  const usedSkills = [];
  const seen = new Set();
  for (const s of skills) {
    if (used.has(s.name)) {
      usedSkills.push(s);
      seen.add(s.name);
    }
  }
  for (const name of used) {
    if (seen.has(name)) continue;
    usedSkills.push({ name, icon: '' });
    seen.add(name);
  }

  const countFor = name => projects.filter(p => p.skills.includes(name)).length;

  const content = html`
  <section class="projects section">
    <div class="container stack">
      <h2>Work</h2>
      <p>A selection of projects I've built. Filterable by skill.</p>

      <div class="work-filter">
        <div class="filter-chips" role="group" aria-label="Filter by skill">
    ${usedSkills.map(s => html`
          <button type="button" class="filter-chip" data-skill="${s.name}" data-icon="${s.icon}" aria-pressed="false">
            ${s.icon ? `<img class="filter-chip-icon" src="${s.icon}" alt="" loading="lazy">` : ''}
            <span class="filter-chip-name">${s.name}</span>
            <span class="filter-chip-count">${countFor(s.name)}</span>
          </button>`).join('')}
        </div>
      </div>

      <div class="filter-active" id="filter-active" hidden>
        <span class="filter-active-label">Filtering by</span>
        <div class="filter-active-chips" id="filter-active-chips"></div>
        <button type="button" class="filter-clear" id="filter-clear">Clear all</button>
        <span class="filter-result-count" id="filter-result-count"></span>
      </div>

      <div class="project-cards" id="project-grid">
        ${projects.map(p => projectCard()(p).replace('<article', `<article data-skills="${p.skills.join(',')}"`)).join('')}
      </div>

      <p class="filter-empty" id="filter-empty" hidden>No projects match those filters.</p>
    </div>
  </section>

  <script>
    const headerEl = document.querySelector('header');
    const filterBar = document.querySelector('.work-filter');
    const grid = document.getElementById('project-grid');
    const emptyState = document.getElementById('filter-empty');
    const activeBar = document.getElementById('filter-active');
    const activeChipsWrap = document.getElementById('filter-active-chips');
    const resultCount = document.getElementById('filter-result-count');
    const clearBtn = document.getElementById('filter-clear');
    const chipButtons = Array.from(document.querySelectorAll('.filter-chip'));

    function setupSticky() {
      if (!headerEl || !filterBar) return;
      const isMobile = window.matchMedia('(max-width: 599px)').matches;
      const headerH = headerEl.offsetHeight;
      if (isMobile) {
        filterBar.style.top = headerH + 'px';
        grid.style.scrollMarginTop = (headerH + filterBar.offsetHeight + 4) + 'px';
      } else {
        filterBar.style.top = '';
        grid.style.scrollMarginTop = (headerH + 4) + 'px';
      }
    }
    setupSticky();
    window.addEventListener('resize', setupSticky);

    const initialTags = [];
    new URLSearchParams(window.location.search).getAll('tag').forEach(v =>
      v.split(',').forEach(t => { if (t) initialTags.push(t); })
    );
    const validTags = new Set(chipButtons.map(b => b.dataset.skill));
    const active = new Set(initialTags.filter(t => validTags.has(t)));

    const closeSvg = '${closeIcon}';

    function matches(card) {
      if (active.size === 0) return true;
      const cardSkills = card.dataset.skills.split(',');
      return Array.from(active).every(t => cardSkills.includes(t));
    }

    function render() {
      const cards = document.querySelectorAll('.project-card');
      let visible = 0;
      cards.forEach(card => {
        const ok = matches(card);
        card.classList.toggle('filtered-out', !ok);
        if (ok) visible++;
      });

      chipButtons.forEach(btn => {
        const on = active.has(btn.dataset.skill);
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', String(on));
      });

      activeChipsWrap.innerHTML = Array.from(active).map(name => {
        const btn = chipButtons.find(b => b.dataset.skill === name);
        const icon = btn && btn.dataset.icon
          ? '<img class="filter-chip-icon" src="' + btn.dataset.icon + '" alt="">'
          : '';
        return '<button type="button" class="filter-active-chip" data-skill="' + name + '">'
          + icon + '<span>' + name + '</span>' + closeSvg + '</button>';
      }).join('');

      activeBar.hidden = active.size === 0;
      emptyState.hidden = visible > 0;
      resultCount.textContent = active.size === 0
        ? cards.length + ' projects'
        : visible + ' of ' + cards.length + ' projects';

      const params = new URLSearchParams(window.location.search);
      params.delete('tag');
      Array.from(active).forEach(t => params.append('tag', t));
      const qs = params.toString();
      history.replaceState(null, '', qs ? window.location.pathname + '?' + qs : window.location.pathname);
    }

    function scrollToResults() {
      const rect = grid.getBoundingClientRect();
      if (rect.top < 0 || rect.top > window.innerHeight) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    chipButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.skill;
        const adding = !active.has(name);
        if (adding) active.add(name);
        else active.delete(name);
        render();
        if (adding) scrollToResults();
      });
    });

    clearBtn.addEventListener('click', () => {
      active.clear();
      render();
    });

    activeChipsWrap.addEventListener('click', e => {
      const chip = e.target.closest('.filter-active-chip');
      if (!chip) return;
      active.delete(chip.dataset.skill);
      render();
    });

    render();
  </script>`;

  return MainLayout({
    title: 'Work',
    active: 'work',
    content,
    description: 'A selection of projects I\'ve built — web apps, APIs, and tools for real-world problems.',
    path: '/work/',
  });
}
