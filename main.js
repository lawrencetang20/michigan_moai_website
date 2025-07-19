// main.js

// — toggle mobile nav (unchanged) —
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.site-nav ul');
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// — scroll reveal (unchanged) —
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

// Toggle dropdown on click
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    link.nextElementSibling.classList.toggle('show');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu.show')
    .forEach(menu => menu.classList.remove('show'));
});

document.querySelectorAll('.close').forEach(btn => {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-close');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    } else {
      // fallback: close parent modal if id not found
      this.closest('.modal').style.display = 'none';
    }
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
