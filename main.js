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

// — open person modals (unchanged) —
document.querySelectorAll('.person-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = 'modal-' + card.dataset.person;
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
  });
});

// — open About‐Us modal —
const aboutBtn   = document.getElementById('open-about-modal');
const aboutModal = document.getElementById('about-modal');
if (aboutBtn && aboutModal) {
  aboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'flex';
  });
}

// toggle dropdown on click (desktop only)
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth > 768) {
      e.preventDefault();
      link.nextElementSibling.classList.toggle('show');
    }
  });
});

// close if you click outside
document.addEventListener('click', e => {
  document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
    if (!menu.parentElement.contains(e.target)) {
      menu.classList.remove('show');
    }
  });
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

// Optional: close modal when clicking outside modal-content
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});


// make home up and down not side to side add photos
// light green for directory section
// 