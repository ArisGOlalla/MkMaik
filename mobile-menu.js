(() => {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const panel = document.getElementById('mobileSiteNav');
  if (!toggle || !panel) return;
  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    toggle.textContent = open ? '✕ CERRAR' : '☰ MENÚ';
  };
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  panel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!panel.hidden && !panel.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  setOpen(false);
})();
