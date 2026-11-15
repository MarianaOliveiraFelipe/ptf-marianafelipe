const track = document.querySelector('#project-track');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
function moveCarousel(direction) {
  const card = track.querySelector('.project-card');
  if (!card) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  track.scrollBy({left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth'});
}
function updateControls() {
  prev.disabled = track.scrollLeft <= 2;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
}
prev.addEventListener('click', () => moveCarousel(-1));
next.addEventListener('click', () => moveCarousel(1));
track.addEventListener('scroll', updateControls, {passive:true});
window.addEventListener('resize', updateControls);
updateControls();
document.querySelector('#year').textContent = new Date().getFullYear();
const navLinks = [...document.querySelectorAll('.navbar a')];
const sections = [...document.querySelectorAll('main > section')];
const header = document.querySelector('.site-header');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    header.classList.toggle('dark', entry.target.classList.contains('about') || entry.target.classList.contains('contact'));
  });
}, {rootMargin:'-35% 0px -45% 0px'});
sections.forEach(section => sectionObserver.observe(section));
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
  }, {threshold:.12});
  document.querySelectorAll('.about h2,.about-grid,.projects-heading,.project-card,.contact h2,.email,.social-links').forEach(el => {el.classList.add('reveal');revealObserver.observe(el);});
  if (window.matchMedia('(pointer:fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    let x=0,y=0,dx=0,dy=0;
    window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.opacity='1';},{passive:true});
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('pointerenter',()=>dot.classList.add('big'));el.addEventListener('pointerleave',()=>dot.classList.remove('big'));});
    function animate(){dx+=(x-dx)*.18;dy+=(y-dy)*.18;dot.style.transform=`translate(${dx}px,${dy}px) translate(-50%,-50%)`;requestAnimationFrame(animate);}animate();
  }
}
