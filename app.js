/**
 * AURODERMA CLINICAL DERMATOLOGY & AESTHETIC SCIENCE
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initSkinQuiz();
  initTreatmentFilters();
  initFaqAccordion();
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

  // Option Click Handlers
  document.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
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

    // Tailored consultation guidance based on patient profile
    if (state.concern === 'Pigmentation') {
      resultTitle.textContent = 'Pigmentation & Complexion Clarifying Profile';
      resultSummary.textContent = `Optimized for ${state.skinType} skin. Dr. Vinod Khanna will evaluate depth of pigmentation and skin barrier health during your consultation to determine an evidence-backed, root-cause medical protocol.`;
    } else if (state.concern === 'Acne & Scars') {
      resultTitle.textContent = 'Acne & Dermal Remodeling Clinical Profile';
      resultSummary.textContent = `Engineered for ${state.skinType} skin. Dr. Vinod Khanna will personally inspect active inflammation, comedones, and scar depth to formulate a customized clinical treatment plan.`;
    } else if (state.concern === 'Anti-Aging') {
      resultTitle.textContent = 'Skin Restoration & Vitality Consultation Profile';
      resultSummary.textContent = `Designed for ${state.skinType} complexion. Focuses on cellular renewal, collagen integrity, and skin barrier resilience, to be discussed during your in-person evaluation.`;
    } else {
      resultTitle.textContent = 'Clinical Skin Health & Barrier Care Profile';
      resultSummary.textContent = `Formulated for ${state.skinType} dermis. A personalized roadmap prioritizing medical-grade barrier stabilization and individualized dermatological care.`;
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
}

/* ==========================================================================
   5. FAQ Accordion
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
