/**
 * AK Plaster Art — Core Interactive JavaScript Engine
 * Specialization: POP (Plaster of Paris) Works • Mumbai
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Navigation Shrink & Active Link Highlight on Scroll
  const nav = document.getElementById('main-nav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // ScrollSpy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active', 'text-white');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-white');
        link.classList.remove('text-slate-300');
      }
    });
  });

  // 3. Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      } );
    });
  }

  // 4. Animated Number Counters (12+ and 200+)
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  const runCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target > 50 ? 12 : 80;
      const increment = target > 50 ? Math.ceil(target / 45) : 1;

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCounter, speed);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  const heroStatsBar = document.querySelector('#hero .grid');
  if (heroStatsBar) {
    counterObserver.observe(heroStatsBar);
  }

  // 5. Interactive Before / After Dual Image Slider
  const sliderContainer = document.getElementById('ba-slider');
  const beforeOverlay = document.getElementById('ba-before-overlay');
  const beforeImg = document.getElementById('ba-before-img');
  const handle = document.getElementById('ba-handle');

  if (sliderContainer && beforeOverlay && handle && beforeImg) {
    let isDragging = false;

    const setSliderPosition = (percentage) => {
      const clamped = Math.max(0, Math.min(100, percentage));
      beforeOverlay.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      // Ensure image width matches full container width to avoid distorting
      beforeImg.style.width = `${sliderContainer.offsetWidth}px`;
    };

    const updateFromPosition = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      const xPos = clientX - rect.left;
      const percentage = (xPos / rect.width) * 100;
      setSliderPosition(percentage);
    };

    // Initial setup
    const syncImageWidth = () => {
      beforeImg.style.width = `${sliderContainer.offsetWidth}px`;
    };
    syncImageWidth();
    window.addEventListener('resize', syncImageWidth);

    sliderContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateFromPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateFromPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support
    sliderContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateFromPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateFromPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Keyboard navigation (Arrow keys)
    sliderContainer.setAttribute('tabindex', '0');
    sliderContainer.addEventListener('keydown', (e) => {
      const currentWidth = parseFloat(beforeOverlay.style.width) || 50;
      if (e.key === 'ArrowLeft') {
        setSliderPosition(currentWidth - 5);
      } else if (e.key === 'ArrowRight') {
        setSliderPosition(currentWidth + 5);
      }
    });
  }

  // 6. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden-item');
          item.style.display = 'block';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.classList.add('hidden-item');
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
        }
      });
    });
  });

  // 7. GSAP ScrollTrigger Animations (if GSAP is available)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade up service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 35,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out',
      });
    });

    // Process steps sequential reveal
    gsap.utils.toArray('.process-step').forEach((step, i) => {
      gsap.from(step, {
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
      });
    });
  }
});

// 8. Lightbox Modal Functions
function openLightbox(imgSrc, title, category) {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCategory = document.getElementById('lightbox-category');

  if (modal && modalImg && modalTitle && modalCategory) {
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.innerText = title;
    modalCategory.innerText = category;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 9. Site Visit Modal Functions
function openSiteVisitModal() {
  const modal = document.getElementById('site-visit-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSiteVisitModal() {
  const modal = document.getElementById('site-visit-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openServiceInquiry(serviceName) {
  openSiteVisitModal();
  const serviceSelect = document.getElementById('modal-service');
  if (serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value.includes(serviceName)) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }
}

// 10. Form Submission Handlers (WhatsApp Integration)
function handleModalSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('modal-name')?.value || '';
  const phone = document.getElementById('modal-phone')?.value || '';
  const location = document.getElementById('modal-location')?.value || '';
  const service = document.getElementById('modal-service')?.value || '';

  const message = `Hello AK Plaster Art,%0A%0AI would like to schedule a site visit for a project:%0A- *Client*: ${encodeURIComponent(name)}%0A- *Phone*: ${encodeURIComponent(phone)}%0A- *Location in Mumbai*: ${encodeURIComponent(location)}%0A- *Work Type*: ${encodeURIComponent(service)}%0A%0APlease let me know your availability.`;
  
  closeSiteVisitModal();
  window.open(`https://wa.me/918840035249?text=${message}`, '_blank');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contact-name')?.value || '';
  const phone = document.getElementById('contact-phone')?.value || '';
  const location = document.getElementById('contact-location')?.value || '';
  const service = document.getElementById('contact-service')?.value || '';
  const details = document.getElementById('contact-message')?.value || '';

  const message = `Hello AK Plaster Art,%0A%0AI would like to discuss a project estimate:%0A- *Client*: ${encodeURIComponent(name)}%0A- *Phone*: ${encodeURIComponent(phone)}%0A- *Site Location*: ${encodeURIComponent(location)}%0A- *Primary Work*: ${encodeURIComponent(service)}%0A- *Scope / Details*: ${encodeURIComponent(details)}%0A%0ALooking forward to your response.`;

  window.open(`https://wa.me/918840035249?text=${message}`, '_blank');
}

// Close modals on ESC or outside click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSiteVisitModal();
  }
});

document.addEventListener('click', (e) => {
  const lightboxModal = document.getElementById('lightbox-modal');
  const siteVisitModal = document.getElementById('site-visit-modal');
  if (e.target === lightboxModal) closeLightbox();
  if (e.target === siteVisitModal) closeSiteVisitModal();
});