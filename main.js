// Michigan Moai — site interactions
// Vanilla, no dependencies. Respects prefers-reduced-motion.

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
