/**
 * ZENITH RECRUTARE SRL - MAIN JAVASCRIPT
 * Plain vanilla JS, no external dependencies, high performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initFaqAccordion();
  initModals();
  initCookieBanner();
  initContactForm();
  initStatsCounter();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER & NAVBAR SCROLL STATE
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');

  if (!hamburger || !drawer || !backdrop) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    drawer.classList.toggle('is-open', isOpen);
    backdrop.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggleMenu());
  backdrop.addEventListener('click', () => toggleMenu(false));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });

  // Close when clicking a nav link in the mobile drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL ANIMATIONS (IntersectionObserver & Fallback)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  // Enable animation styles via progressive enhancement class
  document.documentElement.classList.add('has-scroll-reveal');

  const checkElements = () => {
    const triggerBottom = window.innerHeight * 1.15;
    reveals.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerBottom) {
          el.classList.add('is-revealed');
        }
      }
    });
  };

  // Immediate check for visible elements on load
  checkElements();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '100px 0px 100px 0px'
    });

    reveals.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        observer.observe(el);
      }
    });
  }

  // Backup scroll event listener & timeout guarantee
  window.addEventListener('scroll', checkElements, { passive: true });
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('is-revealed'));
  }, 2200);
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION (Servicii)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Close all other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('is-active', !isActive);
      questionBtn.setAttribute('aria-expanded', (!isActive).toString());
    });
  });
}

/* --------------------------------------------------------------------------
   5. POLICY MODALS (GDPR & COOKIES)
   -------------------------------------------------------------------------- */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus on close button for accessibility
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-open-modal');
      openModal(targetId);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.is-open');
      if (activeModal) closeModal(activeModal);
    }
  });
}

/* --------------------------------------------------------------------------
   6. COOKIE CONSENT BANNER
   -------------------------------------------------------------------------- */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const consentKey = 'zenith_cookie_consent';
  const currentConsent = localStorage.getItem(consentKey) || localStorage.getItem('primezenith_cookie_consent');

  if (!currentConsent) {
    // Show banner after short delay for gentle entrance
    setTimeout(() => {
      banner.classList.add('is-visible');
    }, 900);
  }

  const acceptAllBtn = document.getElementById('cookie-accept-all');
  const acceptEssentialBtn = document.getElementById('cookie-accept-essential');

  const setConsent = (type) => {
    localStorage.setItem(consentKey, type);
    banner.classList.remove('is-visible');
  };

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => setConsent('all'));
  }
  if (acceptEssentialBtn) {
    acceptEssentialBtn.addEventListener('click', () => setConsent('essential'));
  }

  // Allow resetting / opening settings from footer link
  const openCookiePreferences = document.querySelectorAll('[data-open-cookie-settings]');
  openCookiePreferences.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      banner.classList.add('is-visible');
    });
  });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM VALIDATION & HANDLING (Contact)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Handle URL query parameter pre-selection (?tip=angajator or ?tip=candidat)
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('tip');
  if (typeParam === 'candidat' || typeParam === 'angajator') {
    const radioToSelect = form.querySelector(`input[name="tip_solicitare"][value="${typeParam}"]`);
    if (radioToSelect) {
      radioToSelect.checked = true;
    }
  }

  const isEn = document.documentElement.lang === 'en';

  // Toggle dynamic CV upload visibility/context based on request type
  const typeRadios = form.querySelectorAll('input[name="tip_solicitare"]');
  const cvUploadGroup = document.getElementById('cv-upload-group');
  const updateCvNotice = () => {
    const isCandidat = form.querySelector('input[name="tip_solicitare"][value="candidat"]')?.checked;
    if (cvUploadGroup) {
      const helper = cvUploadGroup.querySelector('.upload-helper-text');
      if (helper) {
        if (isEn) {
          helper.textContent = isCandidat 
            ? 'Recommended for candidates: attach your updated CV (PDF, DOC or DOCX, max 5MB).'
            : 'Optional: attach the job description or role specifications (PDF or DOC, max 5MB).';
        } else {
          helper.textContent = isCandidat 
            ? 'Recomandat pentru candidați: atașați CV-ul dumneavoastră actualizat (PDF, DOC sau DOCX, max 5MB).'
            : 'Opțional: atașați fișa postului sau specificațiile tehnice (PDF sau DOC, max 5MB).';
        }
      }
    }
  };
  typeRadios.forEach(radio => radio.addEventListener('change', updateCvNotice));
  updateCvNotice();

  // File upload input display & validation
  const cvFileInput = document.getElementById('cv-file');
  const fileNameDisplay = document.getElementById('file-name-display');
  const uploadBox = document.querySelector('.file-upload-box');

  if (cvFileInput && fileNameDisplay) {
    cvFileInput.addEventListener('change', () => {
      if (cvFileInput.files && cvFileInput.files[0]) {
        const file = cvFileInput.files[0];
        const maxBytes = 5 * 1024 * 1024; // 5MB

        if (file.size > maxBytes) {
          alert(isEn 
            ? 'The file exceeds the maximum 5MB limit. Please choose a smaller file.'
            : 'Fișierul depășește limita maximă de 5MB. Vă rugăm să alegeți un fișier mai mic.');
          cvFileInput.value = '';
          fileNameDisplay.style.display = 'none';
          fileNameDisplay.textContent = '';
          return;
        }

        fileNameDisplay.textContent = isEn 
          ? `Selected file: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`
          : `Fișier selectat: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        fileNameDisplay.style.display = 'block';
      } else {
        fileNameDisplay.style.display = 'none';
        fileNameDisplay.textContent = '';
      }
    });

    // Drag and drop states
    if (uploadBox) {
      ['dragenter', 'dragover'].forEach(name => {
        uploadBox.addEventListener(name, (e) => {
          e.preventDefault();
          uploadBox.classList.add('drag-over');
        });
      });
      ['dragleave', 'drop'].forEach(name => {
        uploadBox.addEventListener(name, (e) => {
          e.preventDefault();
          uploadBox.classList.remove('drag-over');
        });
      });
    }
  }

  // Validation functions
  const validateField = (input) => {
    const group = input.closest('.form-group');
    if (!group) return true;
    const errorMsg = group.querySelector('.form-error-msg');
    let isValid = true;
    let message = '';

    const val = input.value.trim();

    if (input.id === 'contact-name') {
      if (!val || val.length < 3) {
        isValid = false;
        message = isEn 
          ? 'Please enter your full name (at least 3 characters).'
          : 'Vă rugăm să introduceți numele complet (minim 3 caractere).';
      }
    } else if (input.id === 'contact-email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !emailRegex.test(val)) {
        isValid = false;
        message = isEn 
          ? 'Please enter a valid email address.'
          : 'Vă rugăm să introduceți o adresă de email validă.';
      }
    } else if (input.id === 'contact-phone') {
      // Romanian or international phone format validation (at least 9 digits)
      const phoneDigits = val.replace(/\D/g, '');
      if (!val || phoneDigits.length < 9) {
        isValid = false;
        message = isEn 
          ? 'Please enter a valid phone number (e.g. +40 722 000 000).'
          : 'Vă rugăm să introduceți un număr de telefon valid (ex: 0722 000 000).';
      }
    } else if (input.id === 'contact-message') {
      if (!val || val.length < 10) {
        isValid = false;
        message = isEn 
          ? 'Please enter a message of at least 10 characters.'
          : 'Vă rugăm să introduceți un mesaj de minim 10 caractere.';
      }
    }

    if (!isValid) {
      group.classList.add('has-error');
      input.classList.add('is-invalid');
      if (errorMsg) errorMsg.textContent = message;
    } else {
      group.classList.remove('has-error');
      input.classList.remove('is-invalid');
      if (errorMsg) errorMsg.textContent = '';
    }

    return isValid;
  };

  // Real-time validation on blur
  const inputsToValidate = form.querySelectorAll('#contact-name, #contact-email, #contact-phone, #contact-message');
  inputsToValidate.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });

  // Form submission handler
  const alertSuccess = document.getElementById('form-success-alert');
  const alertError = document.getElementById('form-error-alert');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isFormValid = true;
    inputsToValidate.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    const gdprCheckbox = document.getElementById('gdpr-consent');
    const gdprGroup = gdprCheckbox?.closest('.checkbox-group');
    if (gdprCheckbox && !gdprCheckbox.checked) {
      isFormValid = false;
      alert(isEn 
        ? 'You must agree to the personal data processing policy (GDPR) to send your message.'
        : 'Trebuie să fiți de acord cu prelucrarea datelor cu caracter personal (GDPR) pentru a trimite mesajul.');
      if (gdprGroup) gdprGroup.style.outline = '1px solid var(--color-error)';
      return;
    } else if (gdprGroup) {
      gdprGroup.style.outline = 'none';
    }

    if (!isFormValid) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Indicate loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right: 8px;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.9"></path>
      </svg>
      ${isEn ? 'Sending message...' : 'Se trimite mesajul...'}
    `;

    if (alertSuccess) alertSuccess.classList.remove('is-visible');
    if (alertError) alertError.classList.remove('is-visible');

    // Formspree submission via fetch
    const formAction = form.getAttribute('action');
    const isPlaceholderAction = formAction.includes('your-form-id');

    try {
      if (isPlaceholderAction) {
        // Simulated response for placeholder demonstration
        await new Promise(resolve => setTimeout(resolve, 900));
        if (alertSuccess) {
          alertSuccess.classList.add('is-visible');
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
        if (fileNameDisplay) fileNameDisplay.style.display = 'none';
      } else {
        // Real Formspree submission
        const formData = new FormData(form);
        const response = await fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (alertSuccess) {
            alertSuccess.classList.add('is-visible');
            alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          form.reset();
          if (fileNameDisplay) fileNameDisplay.style.display = 'none';
        } else {
          throw new Error('Formspree a returnat o eroare');
        }
      }
    } catch (err) {
      if (alertError) {
        alertError.classList.add('is-visible');
        alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}

/* --------------------------------------------------------------------------
   8. STATS COUNTER ANIMATION (Despre Noi)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-number[data-count]');
  if (!statsElements.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const ease = 1 - (1 - progress) * (1 - progress);
      const currentVal = Math.floor(ease * target);

      el.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statsElements.forEach(el => observer.observe(el));
  } else {
    statsElements.forEach(el => animateCount(el));
  }
}
