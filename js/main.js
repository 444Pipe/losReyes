/* ============================================================
   LECHONERÍA LOS REYES® — Interacciones
   ============================================================ */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  const preloader = $('#preloader');
  const hidePreloader = () => {
    preloader.classList.add('is-done');
    setTimeout(() => preloader.remove(), 700);
  };
  window.addEventListener('load', () => setTimeout(hidePreloader, 500));
  // Respaldo por si 'load' tarda demasiado (video pesado, red lenta)
  setTimeout(hidePreloader, 3500);

  /* ---------- Nav: fondo al hacer scroll + progreso ---------- */
  const nav = $('#nav');
  const progress = $('#scrollProgress');

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${total > 0 ? (y / total) * 100 : 0}%`;
    updateActiveLink();
    updateParallax();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const burger = $('#navBurger');
  const links = $('#navLinks');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.nav__link, .nav__cta', links).forEach((a) =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
    })
  );

  /* ---------- Link activo según sección visible ---------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  function updateActiveLink() {
    const pos = window.scrollY + window.innerHeight * 0.35;
    let currentId = 'inicio';
    for (const sec of sections) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    }
    navLinks.forEach((a) =>
      a.classList.toggle('is-active', a.getAttribute('href') === `#${currentId}`)
    );
  }

  /* ---------- Reveal on scroll (con stagger automático) ---------- */
  const revealEls = $$('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el, i) => {
    // Stagger entre hermanos cercanos dentro del mismo padre
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    const idx = siblings.indexOf(el);
    el.style.setProperty('--d', `${Math.min(idx * 0.12, 0.6)}s`);
    io.observe(el);
  });

  /* ---------- Contadores animados ---------- */
  const counters = $$('[data-count]');
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        counterIO.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterIO.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reducedMotion) { el.textContent = target.toLocaleString('es-CO'); return; }
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased).toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Parallax suave (hero crown + fondo eventos) ---------- */
  const parallaxEls = $$('[data-parallax]');
  function updateParallax() {
    if (reducedMotion) return;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax);
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset * -1}px)`;
    });
  }

  /* ---------- Tilt 3D en tarjetas del menú ---------- */
  if (!reducedMotion && matchMedia('(hover: hover)').matches) {
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- Galería: arrastrar para hacer scroll ---------- */
  const scroller = $('#galleryScroller');
  if (scroller) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    scroller.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      scrollStart = scroller.scrollLeft;
      scroller.classList.add('is-dragging');
      scroller.setPointerCapture(e.pointerId);
    });
    scroller.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      scroller.scrollLeft = scrollStart - (e.clientX - startX);
    });
    const stopDrag = () => {
      isDown = false;
      scroller.classList.remove('is-dragging');
    };
    scroller.addEventListener('pointerup', stopDrag);
    scroller.addEventListener('pointercancel', stopDrag);
    scroller.addEventListener('pointerleave', stopDrag);
  }

  /* ---------- Año en el footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Estado inicial
  onScroll();
})();
