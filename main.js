// Michigan Moai — site interactions
// Vanilla, no dependencies. Respects prefers-reduced-motion.

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------------
  // First-visit page loader — remove from the DOM once the curtain has lifted
  // (safety timeout in case the exit animation never fires)
  // -------------------------------------------------------------------------
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    pageLoader.addEventListener('animationend', (e) => {
      if (e.animationName === 'loader-exit') pageLoader.remove();
    });
    setTimeout(() => {
      if (pageLoader.isConnected) pageLoader.remove();
    }, 3000);
  }

  // -------------------------------------------------------------------------
  // Mobile navigation
  // -------------------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'site-nav');
    siteNav.id = 'site-nav';

    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when a link is clicked
    siteNav.querySelectorAll('a.nav-link').forEach((a) => {
      a.addEventListener('click', () => {
        if (siteNav.classList.contains('is-open')) {
          siteNav.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // Header elevation once the page is scrolled
  // -------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    updateHeader();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateHeader);
      }
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // Dropdown menus (click / keyboard)
  // -------------------------------------------------------------------------
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(':scope > a');
    const menu = dropdown.querySelector(':scope > .dropdown-menu');
    if (!trigger || !menu) return;

    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    const open = () => {
      closeAllDropdowns();
      menu.classList.add('show');
      trigger.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      menu.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const toggle = () => (menu.classList.contains('show') ? close() : open());

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        const first = menu.querySelector('a');
        if (first) first.focus();
      }
    });
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
        trigger.focus();
      }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.show').forEach((m) => m.classList.remove('show'));
    document.querySelectorAll('.dropdown > a[aria-expanded="true"]').forEach((a) =>
      a.setAttribute('aria-expanded', 'false')
    );
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) closeAllDropdowns();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  // -------------------------------------------------------------------------
  // Mark current page in the nav
  // -------------------------------------------------------------------------
  const here = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav a.nav-link').forEach((a) => {
    const href = a.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === here) a.setAttribute('aria-current', 'page');
  });

  // -------------------------------------------------------------------------
  // Ambient background + scroll parallax — decorative depth layer, skipped
  // entirely when reduced motion is requested
  // -------------------------------------------------------------------------
  if (!prefersReducedMotion) {
    const ambient = document.createElement('div');
    ambient.className = 'ambient-bg';
    ambient.setAttribute('aria-hidden', 'true');
    ambient.innerHTML =
      '<div class="motif motif-1" data-speed="0.10"><span class="motif-ring"></span></div>' +
      '<div class="motif motif-2" data-speed="0.16"><span class="motif-dot"></span></div>' +
      '<div class="motif motif-3" data-speed="0.07"><span class="motif-ring motif-amber"></span></div>' +
      '<div class="motif motif-4" data-speed="0.13"><span class="motif-ring"></span></div>' +
      '<div class="motif motif-5" data-speed="0.05"><span class="motif-dot"></span></div>' +
      '<div class="motif motif-6" data-speed="0.04"><span class="bg-blob"></span></div>' +
      '<div class="motif motif-7" data-speed="0.09"><span class="bg-blob"></span></div>' +
      '<div class="motif motif-8" data-speed="0.14"><span class="bg-blob"></span></div>' +
      '<div class="motif motif-9" data-speed="0.12"><span class="motif-leaf"></span></div>' +
      '<div class="motif motif-10" data-speed="0.06"><span class="motif-leaf motif-leaf--amber"></span></div>';
    document.body.prepend(ambient);

    // Fixed layers drift upward at different rates — depth illusion
    const fixedLayers = Array.from(ambient.querySelectorAll('.motif')).map((el) => ({
      el,
      speed: parseFloat(el.dataset.speed),
    }));

    // In-flow decorative elements lag slightly behind the scroll
    const laggers = [];
    const heroAmbient = document.querySelector('.hero-ambient');
    if (heroAmbient) laggers.push({ el: heroAmbient, speed: 0.1 });

    const heroRing = document.querySelector('.hero-ring');

    // Illustrations drift gently relative to the viewport center.
    // Positions are measured from layout (not getBoundingClientRect) so the
    // applied transform never feeds back into the next measurement.
    const floaters = Array.from(
      document.querySelectorAll('.split-illustration img, .moai-circle-illo, .community-illo img')
    ).map((el) => ({ el, top: 0, height: 0 }));

    const measure = () => {
      floaters.forEach((f) => {
        let top = 0;
        let node = f.el;
        while (node) {
          top += node.offsetTop;
          node = node.offsetParent;
        }
        f.top = top;
        f.height = f.el.offsetHeight;
      });
    };

    let pending = false;
    const apply = () => {
      pending = false;
      const y = window.scrollY;
      const mid = y + window.innerHeight / 2;

      fixedLayers.forEach(({ el, speed }) => {
        el.style.transform = 'translate3d(0, ' + (-y * speed).toFixed(1) + 'px, 0)';
      });
      laggers.forEach(({ el, speed }) => {
        el.style.transform = 'translate3d(0, ' + (y * speed).toFixed(1) + 'px, 0)';
      });
      if (heroRing) {
        heroRing.style.transform =
          'translate(-50%, calc(-50% + ' + (y * 0.06).toFixed(1) + 'px))';
      }
      floaters.forEach(({ el, top, height }) => {
        const offset = (mid - (top + height / 2)) * 0.04;
        el.style.transform = 'translate3d(0, ' + offset.toFixed(1) + 'px, 0)';
      });
    };
    const queue = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(apply);
      }
    };

    measure();
    apply();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', () => { measure(); queue(); }, { passive: true });
    window.addEventListener('load', () => { measure(); queue(); });

    // -----------------------------------------------------------------------
    // Hero picture follows the pointer (desktop only). Uses the individual
    // `translate` property so it composes with the CSS float/spin animations
    // and the scroll-parallax transform instead of fighting them.
    // -----------------------------------------------------------------------
    const heroSection = document.querySelector('.hero');
    const heroImg = document.querySelector('.hero-illustration img');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (heroSection && heroImg && finePointer) {
      let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId = null;
      const settle = () => {
        curX += (targetX - curX) * 0.08;
        curY += (targetY - curY) * 0.08;
        heroImg.style.translate = curX.toFixed(2) + 'px ' + curY.toFixed(2) + 'px';
        if (heroRing) {
          heroRing.style.translate =
            (-curX * 0.5).toFixed(2) + 'px ' + (-curY * 0.5).toFixed(2) + 'px';
        }
        if (Math.abs(targetX - curX) > 0.1 || Math.abs(targetY - curY) > 0.1) {
          rafId = requestAnimationFrame(settle);
        } else {
          rafId = null;
        }
      };
      const kick = () => { if (!rafId) rafId = requestAnimationFrame(settle); };
      heroSection.addEventListener('pointermove', (e) => {
        const r = heroSection.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 16;
        targetY = ((e.clientY - r.top) / r.height - 0.5) * 12;
        kick();
      });
      heroSection.addEventListener('pointerleave', () => {
        targetX = 0;
        targetY = 0;
        kick();
      });
    }
  }

  // -------------------------------------------------------------------------
  // Scroll reveal — disabled entirely when reduced motion is requested
  // -------------------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('active'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach((el) => io.observe(el));
})();
