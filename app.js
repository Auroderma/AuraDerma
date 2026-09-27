/**
 * AURODERMA CLINICAL DERMATOLOGY & AESTHETIC SCIENCE
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initSkinQuiz();
  initTreatmentFilters();
  initBeforeAfterSlider();
  initFaqAccordion();
  initBookingModal();
  initForms();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('auroderma-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('auroderma-theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-regular fa-moon';
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  toggleBtn?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    if (navMenu?.classList.contains('open')) {
      icon?.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon?.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Close nav when clicking a link
  navMenu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const icon = toggleBtn?.querySelector('i');
      icon?.classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

/* ==========================================================================
   3. Interactive Skin Consultation Quiz
   ========================================================================== */
function initSkinQuiz() {
  const quizState = {
    skinType: null,
    concern: null,
    approach: null
  };

  const steps = [
    document.getElementById('quizStep1'),
    document.getElementById('quizStep2'),
    document.getElementById('quizStep3')
  ];

  const indicators = [
    document.getElementById('stepIndicator1'),
    document.getElementById('stepIndicator2'),
    document.getElementById('stepIndicator3')
  ];

  const lines = [
    document.getElementById('stepLine1'),
    document.getElementById('stepLine2')
  ];

  const quizResult = document.getElementById('quizResult');
  const retakeBtn = document.getElementById('quizRetakeBtn');
  const bookNowBtn = document.getElementById('quizBookNowBtn');

  // Option Click Handlers
  document.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const step = parseInt(btn.dataset.step);
      const val = btn.dataset.val;

      if (step === 1) {
        quizState.skinType = val;
        goToStep(2);
      } else if (step === 2) {
        quizState.concern = val;
        goToStep(3);
      } else if (step === 3) {
        quizState.approach = val;
        renderQuizResult(quizState);
      }
    });
  });

  function goToStep(nextStepNumber) {
    steps.forEach((step, index) => {
      step?.classList.toggle('active', index === nextStepNumber - 1);
    });

    indicators.forEach((indicator, index) => {
      indicator?.classList.toggle('active', index <= nextStepNumber - 1);
    });

    lines.forEach((line, index) => {
      line?.classList.toggle('completed', index < nextStepNumber - 1);
    });
  }

  function renderQuizResult(state) {
    steps.forEach(s => s?.classList.remove('active'));
    document.querySelector('.quiz-stepper')?.style.setProperty('display', 'none');
    if (quizResult) quizResult.style.display = 'block';

    const resultTitle = document.getElementById('resultTitle');
    const resultSummary = document.getElementById('resultSummary');
    const recProcedure = document.getElementById('recProcedure');
    const recDowntime = document.getElementById('recDowntime');
    const recRegimen = document.getElementById('recRegimen');
    const recProtocol = document.getElementById('recProtocol');

    // Tailored algorithm based on selections
    if (state.concern === 'Pigmentation') {
      resultTitle.textContent = 'PicoSure® Melasma Shield & Cellular Clarifying Protocol';
      resultSummary.textContent = `Optimized for ${state.skinType} skin. Combines ultra-short photon pulses with melanin dispersion to clear deep pigment without thermal irritation.`;
      recProcedure.textContent = 'PicoSure Focused Array Laser + Tranexamic Infusion';
      recDowntime.textContent = '0 - 12 Hours Mild Flush';
      recRegimen.textContent = 'AuroDerma Niacinamide 10% & Barrier Lipid Shield';
      recProtocol.textContent = '3 to 4 Sessions at 3-week intervals';
    } else if (state.concern === 'Acne & Scars') {
      resultTitle.textContent = 'Fractional CO2 Sub-Dermal Scar Elevation Protocol';
      resultSummary.textContent = `Engineered for ${state.skinType} skin to dissolve fibrotic tethering and trigger intense dermal collagen remodeling.`;
      recProcedure.textContent = 'AuroResurface™ Fractional CO2 + Subcision';
      recDowntime.textContent = '3 - 5 Days Micro-Crusting (Normal)';
      recRegimen.textContent = 'AuroDerma Advanced Derma-Recovery Complex';
      recProtocol.textContent = '3 Sessions spaced 5 weeks apart';
    } else if (state.concern === 'Anti-Aging') {
      resultTitle.textContent = 'Sub-Dermal Biostimulation & Micro-Tox Hydrolift';
      resultSummary.textContent = `A dual-vector regimen for ${state.skinType} complexion addressing dynamic wrinkle relaxation and extracellular matrix regeneration.`;
      recProcedure.textContent = 'Profhilo® Hyaluronic Remodeling + Micro-Tox';
      recDowntime.textContent = 'Immediate Return to Activities';
      recRegimen.textContent = 'Copper Tripeptide-1 Cellular Recovery Elixir';
      recProtocol.textContent = '2 Initial Sessions, 1 Annual Booster';
    } else {
      resultTitle.textContent = 'Vortex HydraFacial MD & Bio-Enzymatic Renewal';
      resultSummary.textContent = `Formulated for ${state.skinType} dermis. Deep extraction of micro-comedones, infusion of medical humectants, and barrier stabilization.`;
      recProcedure.textContent = 'AuroGlow™ Medical HydraFacial MD Protocol';
      recDowntime.textContent = 'Zero Downtime (Immediate Luminescence)';
      recRegimen.textContent = 'AuroDerma Multi-Weight Hyaluronic Acid Complex';
      recProtocol.textContent = 'Monthly Maintenance Sessions';
    }
  }

  retakeBtn?.addEventListener('click', () => {
    quizState.skinType = null;
    quizState.concern = null;
    quizState.approach = null;
    document.querySelector('.quiz-stepper')?.style.removeProperty('display');
    if (quizResult) quizResult.style.display = 'none';
    goToStep(1);
  });

  bookNowBtn?.addEventListener('click', () => {
    const recText = document.getElementById('recProcedure')?.textContent || 'Prescribed Protocol';
    openBookingModalWithTreatment(recText);
  });
}

/* ==========================================================================
   4. Treatment Category Filters
   ========================================================================== */
function initTreatmentFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.treatment-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Select Treatment Buttons inside cards
  document.querySelectorAll('.select-treatment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const treatment = btn.dataset.treatment;
      openBookingModalWithTreatment(treatment);
    });
  });
}

/* ==========================================================================
   5. Interactive Before & After Comparison Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const range = document.getElementById('baRangeInput');
  const afterLayer = document.getElementById('baAfterLayer');
  const divider = document.getElementById('baDivider');

  if (!range || !afterLayer || !divider) return;

  function updateSlider(val) {
    afterLayer.style.width = `${val}%`;
    divider.style.left = `${val}%`;
  }

  range.addEventListener('input', (e) => {
    updateSlider(e.target.value);
  });

  // Initial set
  updateSlider(50);
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherHeader = other.querySelector('.accordion-header');
          const otherContent = other.querySelector('.accordion-content');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   7. Booking Modal Logic
   ========================================================================== */
function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = [
    document.getElementById('openBookingBtn'),
    document.getElementById('heroBookBtn'),
    document.getElementById('spotlightOrderBtn'),
    document.getElementById('consultDoctorBtn')
  ];

  openButtons.forEach(btn => {
    btn?.addEventListener('click', () => {
      openBookingModal();
    });
  });

  closeBtn?.addEventListener('click', closeBookingModal);

  // Close when clicking backdrop
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBookingModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeBookingModal();
    }
  });
}

function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal?.classList.add('active');
  modal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal?.classList.remove('active');
  modal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openBookingModalWithTreatment(treatmentName) {
  openBookingModal();
  const select = document.getElementById('mService');
  if (select) {
    let found = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(treatmentName) || select.options[i].value.includes(treatmentName)) {
        select.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found && treatmentName) {
      const newOption = new Option(treatmentName, treatmentName, true, true);
      select.add(newOption);
    }
  }
}

/* ==========================================================================
   8. Form Submission Handlers & Toast Notifications
   ========================================================================== */
function initForms() {
  // Inline Contact/Booking Form
  const inlineForm = document.getElementById('inlineBookingForm');
  inlineForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value || 'Guest';
    const service = document.getElementById('formService')?.value || 'Consultation';

    showToast(`Appointment Request Received!`, `Thank you ${name}. Our clinical coordinator will confirm your ${service} reservation.`);
    inlineForm.reset();
  });

  // Modal Booking Form
  const modalForm = document.getElementById('modalBookingForm');
  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('mName')?.value || 'Guest';
    const service = document.getElementById('mService')?.value || 'Consultation';

    closeBookingModal();
    showToast(`Consultation Scheduled!`, `Thank you ${name}. A confirmation email with pre-care instructions has been queued for your ${service}.`);
    modalForm.reset();
  });

  // Set default minimum date for date inputs to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  const dateInputs = [document.getElementById('formDate'), document.getElementById('mDate')];
  dateInputs.forEach(input => {
    if (input) input.min = minDateStr;
  });
}

function showToast(title, message) {
  const toast = document.getElementById('toastNotification');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast) return;

  if (toastTitle) toastTitle.textContent = title;
  if (toastMessage) toastMessage.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}
