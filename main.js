// toggle mobile nav
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.site-nav ul');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// scroll‐reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ---------- existing code: menu toggle & scroll reveal ----------
// (leave your existing code above)

// ------------ modal open/close logic ------------

// open modal when clicking a person-card
document.querySelectorAll('.person-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = 'modal-' + card.dataset.person;
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
  });
});

// close modal when clicking × or outside content
document.querySelectorAll('.modal').forEach(modal => {
  // click on close button
  modal.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  // click outside modal-content
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

