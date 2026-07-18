export function aboutCard({ icon, title, desc }) {
  return `
<article class="about-card">
  <img class="icon" src="${icon}" alt="${title} icon">
  <h3>${title}</h3>
  <p>${desc}</p>
</article>`;
}
