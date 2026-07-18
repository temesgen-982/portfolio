export function projectCard({ title, desc, image, liveUrl, projectUrl }) {
  return `
<article class="project-card stack">
  ${liveUrl ? `<a href="${liveUrl}" class="live-link">Live site</a>` : ''}
  <img src="${image}" alt="${title}" class="project-image">
  <div class="stack">
    <h3>${title}</h3>
    <p>${desc}</p>
    <a href="${projectUrl}" class="button button--secondary">view project</a>
  </div>
</article>`;
}
