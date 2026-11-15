
// Ano no rodapé
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Destaca no menu lateral a seção que está sendo lida
const sections = document.querySelectorAll('.case-section');
const links = document.querySelectorAll('.case-nav a');
if ('IntersectionObserver' in window && sections.length && links.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => link.classList.toggle(
          'active', link.getAttribute('href') === '#' + entry.target.id
        ));
      }
    });
  }, { rootMargin: '-20% 0px -65% 0px' });
  sections.forEach(section => observer.observe(section));
}

// Bolinha que segue o mouse (mesmo efeito da página principal)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.matchMedia('(pointer:fine)').matches) {
  // Se a <div class="cursor-dot"> não existir no HTML, cria automaticamente
  let dot = document.querySelector('.cursor-dot');
  if (!dot) {
    dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.setAttribute('aria-hidden', 'true');
    document.body.prepend(dot);
  }
  if (dot) {
    let x = 0, y = 0, dx = 0, dy = 0;
    window.addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY; dot.style.opacity = '1';
    }, { passive: true });
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('pointerenter', () => dot.classList.add('big'));
      el.addEventListener('pointerleave', () => dot.classList.remove('big'));
    });
    (function animate() {
      dx += (x - dx) * .18; dy += (y - dy) * .18;
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      requestAnimationFrame(animate);
    })();
  }
}
lucide.createIcons();