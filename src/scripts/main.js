/**
 * Divine Fly Fishing — Main JavaScript
 * Handles UI interactions, sliders, and scroll effects.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCore();
  initNavbar();
  initTestimonialSlider();
  initPackageSlider();
  initAccordion();
  initSmoothScroll();
  initAboutParallax();
});

/**
 * Core elements like the year in footer.
 */
function initCore() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

/**
 * Sticky Navbar & Mobile Menu
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('mobileNavOverlay');
  const menuClose = document.getElementById('menuClose');
  const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-nav card, .mobile-nav a');
  const sections = document.querySelectorAll('section[id]');

  const closeMenu = () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('open');
    navOverlay?.classList.remove('active');
  };

  // Scroll listener for sticky nav & active link
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    navbar.classList.toggle('scrolled', isScrolled);
    
    // Highlight Active Link
    const navScrollY = window.scrollY + navbar.offsetHeight + 120; // Increased offset for better sync
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (navScrollY >= top && navScrollY < top + height) {
        navLinksAll.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  // Mobile Menu Toggle
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
    navOverlay?.classList.toggle('active', isOpen);
  });

  // Dedicated Close Button
  menuClose?.addEventListener('click', closeMenu);

  // Clicking overlay or links closes the menu
  navOverlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Testimonials Slider Logic
 */
function initTestimonialSlider() {
  const slider = document.getElementById('testimonialSlider');
  const slides = document.querySelectorAll('.ts-slide');
  const prevBtn = document.getElementById('tsPrev');
  const nextBtn = document.getElementById('tsNext');
  const dots = document.querySelectorAll('.ts-dot');
  
  if (!slider || slides.length === 0) return;

  let current = 0;
  let timer;

  const updateDots = () => {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === current);
    });
  };

  const showSlide = (index) => {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    updateDots();
  };

  const startAutoPlay = () => {
    timer = setInterval(() => showSlide(current + 1), 10000);
  };

  const resetAutoPlay = () => {
    clearInterval(timer);
    startAutoPlay();
  };

  nextBtn?.addEventListener('click', () => { showSlide(current + 1); resetAutoPlay(); });
  prevBtn?.addEventListener('click', () => { showSlide(current - 1); resetAutoPlay(); });

  // Pointer drag support for desktop and mobile
  let startX = 0;
  let isDragging = false;

  const endDrag = (endX) => {
    if (!isDragging) return;
    isDragging = false;
    slider.classList.remove('dragging');
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      showSlide(diff > 0 ? current + 1 : current - 1);
    }
    startAutoPlay();
  };

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    slider.classList.add('dragging');
    clearInterval(timer);
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
  });

  slider.addEventListener('mouseup', (e) => endDrag(e.pageX));
  slider.addEventListener('mouseleave', () => endDrag(startX));

  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    slider.classList.add('dragging');
    clearInterval(timer);
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].pageX;
    endDrag(touchEndX);
  }, { passive: true });

  startAutoPlay();
}

/**
 * Packages Section Slider
 */
function initPackageSlider() {
  const track = document.getElementById('packagesSlider');
  const prevBtn = document.getElementById('pkgPrev');
  const nextBtn = document.getElementById('pkgNext');
  
  if (!track) return;

  const cards = track.querySelectorAll('.pkg-card');
  let index = 0;

  const getVisibleCards = () => window.innerWidth <= 576 ? 1 : 2;
  const getMaxIndex = () => Math.max(0, cards.length - getVisibleCards());

  const updateSlider = () => {
    const maxIdx = getMaxIndex();
    if (index > maxIdx) index = maxIdx;
    if (index < 0) index = 0;

    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(${-index * cardWidth}px)`;
  };

  nextBtn?.addEventListener('click', () => { if (index < getMaxIndex()) { index++; updateSlider(); } });
  prevBtn?.addEventListener('click', () => { if (index > 0) { index--; updateSlider(); } });

  window.addEventListener('resize', updateSlider);
}

/**
 * Step-By-Step Accordion
 */
function initAccordion() {
  const items = document.querySelectorAll('.sbs-item');
  items.forEach(item => {
    const header = item.querySelector('.sbs-header');
    header?.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });
}

/**
 * Smooth Scrolling with Offset
 */
function initSmoothScroll() {
  const navbar = document.getElementById('navbar');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/**
 * Parallax Effect for About Section Photos
 */
function initAboutParallax() {
  const photos = document.querySelectorAll('.booth-photo');
  if (photos.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    photos.forEach((photo, index) => {
      const speed = (index + 1) * 0.05;
      const yOffset = -(scrolled * speed);
      // Keep the original rotation but add the Y translation
      const rotation = index === 0 ? -10 : -5;
      photo.style.transform = `translateY(${yOffset * 0.2}px) rotate(${rotation}deg)`;
    });
  }, { passive: true });
}
