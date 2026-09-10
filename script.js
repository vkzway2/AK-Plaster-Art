/**
 * AK Plaster Art — Core Interactive JavaScript Engine
 * Specialization: POP (Plaster of Paris) Works • Mumbai
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Dark / Light Theme Toggle Engine
  const themeToggle = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const mobileThemeIconSun = document.getElementById('mobile-theme-icon-sun');
  const mobileThemeIconMoon = document.getElementById('mobile-theme-icon-moon');
  const mobileThemeText = document.getElementById('mobile-theme-text');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      themeIconSun?.classList.remove('hidden');
      themeIconMoon?.classList.add('hidden');
      mobileThemeIconSun?.classList.remove('hidden');
      mobileThemeIconMoon?.classList.add('hidden');
      if (mobileThemeText) mobileThemeText.innerText = 'LIGHT MODE';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      themeIconSun?.classList.add('hidden');
      themeIconMoon?.classList.remove('hidden');
      mobileThemeIconSun?.classList.add('hidden');
      mobileThemeIconMoon?.classList.remove('hidden');
      if (mobileThemeText) mobileThemeText.innerText = 'DARK MODE';
    }
    localStorage.setItem('ak-theme', theme);
  };

  const savedTheme = localStorage.getItem('ak-theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(savedTheme);

  const toggleCurrentTheme = () => {
    const isLight = document.documentElement.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  };

  themeToggle?.addEventListener('click', toggleCurrentTheme);
  mobileThemeToggle?.addEventListener('click', toggleCurrentTheme);

  // 3. Hero Headline Kinetic Motion Graphics (Mouse + Scroll)
  const heroSection = document.getElementById('hero');
  const wallHeadline = document.getElementById('hero-wall-headline');
  const heroAccentLine = document.getElementById('hero-accent-line');

  if (heroSection && wallHeadline) {
    let mouseX = 0.5, mouseY = 0.5;
    let targetMouseX = 0.5, targetMouseY = 0.5;
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight || window.innerHeight;
      targetScrollProgress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetMouseX = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      targetMouseY = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetMouseX = 0.5;
      targetMouseY = 0.5;
    });

    // High-performance smooth animation loop (Lerp)
    const animateMotionGraphics = () => {
      const lerp = 0.08;
      mouseX += (targetMouseX - mouseX) * lerp;
      mouseY += (targetMouseY - mouseY) * lerp;
      scrollProgress += (targetScrollProgress - scrollProgress) * lerp;

      // 1. Mouse 3D Perspective Tilt on Headline
      const tiltY = (mouseX - 0.5) * 16; // -8deg to +8deg
      const tiltX = -(mouseY - 0.5) * 14; // -7deg to +7deg
      wallHeadline.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;

      // 2. Kinetic Typographical Motion Graphics on Scroll
      // Word 1 (PRECISION): glides smoothly to the left
      const word1X = (scrollProgress * -45).toFixed(1);
      const word1Z = (scrollProgress * 22).toFixed(1);
      // Word 2 (BUILT INTO): counter-motion glides smoothly to the right
      const word2X = (scrollProgress * 45).toFixed(1);
      const word2Z = (scrollProgress * 12).toFixed(1);
      // Word 3 (EVERY SURFACE.): elevates forward with depth
      const word3Y = (scrollProgress * 14).toFixed(1);
      const word3Z = (scrollProgress * 32).toFixed(1);

      wallHeadline.style.setProperty('--word1-x', `${word1X}px`);
      wallHeadline.style.setProperty('--word1-z', `${word1Z}px`);
      wallHeadline.style.setProperty('--word2-x', `${word2X}px`);
      wallHeadline.style.setProperty('--word2-z', `${word2Z}px`);
      wallHeadline.style.setProperty('--word3-y', `${word3Y}px`);
      wallHeadline.style.setProperty('--word3-z', `${word3Z}px`);

      // 3. Wall Texture Specular & Lighting Motion (Mouse + Scroll)
      const textureOffsetX = ((mouseX - 0.5) * 50 + scrollProgress * 80).toFixed(1);
      const textureOffsetY = ((mouseY - 0.5) * 35 + scrollProgress * 50).toFixed(1);
      wallHeadline.style.setProperty('--texture-offset-x', `${textureOffsetX}px`);
      wallHeadline.style.setProperty('--texture-offset-y', `${textureOffsetY}px`);
      wallHeadline.style.setProperty('--mouse-light-x', `${(mouseX * 100).toFixed(1)}%`);
      wallHeadline.style.setProperty('--mouse-light-y', `${(mouseY * 100).toFixed(1)}%`);
      wallHeadline.style.setProperty('--scroll-light-x', `${(30 + scrollProgress * 50).toFixed(1)}%`);
      wallHeadline.style.setProperty('--scroll-light-y', `${(20 + scrollProgress * 60).toFixed(1)}%`);

      // 4. Accent Underline Expansion & Glow
      if (heroAccentLine) {
        const scaleX = (1 + scrollProgress * 0.25).toFixed(2);
        heroAccentLine.style.transform = `scaleX(${scaleX})`;
        heroAccentLine.style.boxShadow = `0 0 ${8 + scrollProgress * 18}px rgba(245, 158, 11, ${(0.4 + scrollProgress * 0.4).toFixed(2)})`;
      }

      requestAnimationFrame(animateMotionGraphics);
    };

    requestAnimationFrame(animateMotionGraphics);
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
    const toggleMenu = (open) => {
      if (open) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen?.classList.add('hidden');
        menuIconClose?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen?.classList.remove('hidden');
        menuIconClose?.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };

    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      toggleMenu(isHidden);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
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

// 10. Helper for Reliable WhatsApp Dispatch on Mobile & Desktop
function dispatchWhatsApp(message) {
  const whatsappUrl = `https://wa.me/918840035249?text=${message}`;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (window.innerWidth < 1024);
  if (isMobile) {
    // Direct window.location.href ensures mobile devices launch the WhatsApp application without popup blockers
    window.location.href = whatsappUrl;
  } else {
    // On desktop browsers, open new tab with fallback to location.href if popup blocked
    const win = window.open(whatsappUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  }
}

// 11. Form Submission Handlers (WhatsApp Integration with Mandatory Validation)
function handleModalSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('modal-form');
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = document.getElementById('modal-name')?.value.trim() || '';
  const phone = document.getElementById('modal-phone')?.value.trim() || '';
  const location = document.getElementById('modal-location')?.value.trim() || '';
  const service = document.getElementById('modal-service')?.value.trim() || '';

  // Validate minimum 10 digits for mobile number
  const phoneDigits = phone.replace(/[^0-9]/g, '');
  if (phoneDigits.length < 10) {
    const phoneInput = document.getElementById('modal-phone');
    if (phoneInput) {
      phoneInput.setCustomValidity('Please enter a valid 10-digit mobile number');
      phoneInput.reportValidity();
      phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''), { once: true });
    }
    return;
  }

  const message = `Hello AK Plaster Art,%0A%0AI would like to schedule a site visit for a project:%0A- *Client*: ${encodeURIComponent(name)}%0A- *Phone*: ${encodeURIComponent(phone)}%0A- *Location in Mumbai*: ${encodeURIComponent(location)}%0A- *Work Type*: ${encodeURIComponent(service)}%0A%0APlease let me know your availability.`;
  
  closeSiteVisitModal();
  dispatchWhatsApp(message);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contact-form');
  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = document.getElementById('contact-name')?.value.trim() || '';
  const phone = document.getElementById('contact-phone')?.value.trim() || '';
  const location = document.getElementById('contact-location')?.value.trim() || '';
  const service = document.getElementById('contact-service')?.value.trim() || '';
  const details = document.getElementById('contact-message')?.value.trim() || '';

  const phoneDigits = phone.replace(/[^0-9]/g, '');
  if (phoneDigits.length < 10) {
    const phoneInput = document.getElementById('contact-phone');
    if (phoneInput) {
      phoneInput.setCustomValidity('Please enter a valid 10-digit mobile number');
      phoneInput.reportValidity();
      phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''), { once: true });
    }
    return;
  }

  const message = `Hello AK Plaster Art,%0A%0AI would like to discuss a project estimate:%0A- *Client*: ${encodeURIComponent(name)}%0A- *Phone*: ${encodeURIComponent(phone)}%0A- *Site Location*: ${encodeURIComponent(location)}%0A- *Primary Work*: ${encodeURIComponent(service)}%0A- *Scope / Details*: ${encodeURIComponent(details)}%0A%0ALooking forward to your response.`;

  dispatchWhatsApp(message);
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