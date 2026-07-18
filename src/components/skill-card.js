export function skillCard({ base }) {
  return ({ name, icon }) => `
<div class="stack center">
  <img src="${base}${icon}" alt="${name}">
  <span>${name}</span>
</div>`;
}
