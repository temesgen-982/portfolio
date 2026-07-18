export function aboutCard({ base }) {
  return ({ icon, title, desc }) => `
<article class="about-card">
  <img class="icon" src="${base}${icon}" alt="${title} icon">
  <h3>${title}</h3>
  <p>${desc}</p>
</article>`;
}
