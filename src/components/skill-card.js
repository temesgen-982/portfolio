export function skillCard({ name, icon }) {
  return `
<div class="stack center">
  <img src="${icon}" alt="${name}">
  <span>${name}</span>
</div>`;
}
