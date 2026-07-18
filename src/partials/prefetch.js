export function prefetch(base) {
  return `
<script>
window.addEventListener('load', () => {
  document.querySelectorAll('nav a[href^="${base}/"]').forEach(link => {
    const el = document.createElement('link');
    el.rel = 'prefetch';
    el.href = link.getAttribute('href');
    document.head.appendChild(el);
  });
});
</script>`;
}
