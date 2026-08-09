export const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[c]));
