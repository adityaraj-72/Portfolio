/**
 * main.js
 * Core application logic for Aditya Raj's Portfolio
 * - Theme switcher (Dark/Light) with localStorage persistence
 * - Sticky navigation & active link scroll tracking
 * - Scroll progress indicator
 * - Mobile hamburger drawer menu
 * - Interactive Project Details Modal
 * - Skill category filtering
 * - Form validation & respectful mailto launcher
 * - Copy email to clipboard with toast notification
 * - Scroll reveal animations
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Scroll Progress Bar & Sticky Navbar
  // --------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / (scrollHeight || 1)) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Navbar background blur/shrink
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (scrollTop > 380) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Section Highlighting on Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Initial call

  // --------------------------------------------------------------------------
  // 5. Technical Skills Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCategories.forEach(function (card) {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Project Details Modal System
  // --------------------------------------------------------------------------
  const projectModalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalTags = document.getElementById('modal-tags');
  const modalBody = document.getElementById('modal-body');
  const modalLinks = document.getElementById('modal-links');

  // Project Detailed Data (Strictly based on provided information)
  const projectDetailsData = {
    'krishi-drone': {
      title: "E-Yantra Krishi Drone: Vision-Based Infected Plant Detection System",
      date: "December 2024",
      tags: ["Arduino", "IR Sensors", "Embedded C", "Motor Driver", "Image Processing", "Computer Vision Concepts"],
      overview: "An autonomous vision-based agricultural inspection system designed to detect and localize infected crop leaves and plant beds using computational image-processing pipelines.",
      highlights: [
        "Implemented perspective transformation algorithms to convert oblique camera viewpoints into standardized top/bird's-eye views of plant beds.",
        "Designed an image-processing pipeline for identifying infected plant regions through color-space analysis and precise color-thresholding.",
        "Applied contour detection and morphological operations to segment and isolate affected foliage with high geometric precision.",
        "Engineered the hardware control system integrating Arduino microcontroller, IR sensors, and motor driver modules for coordinated movement."
      ],
      hardwareAndSoftware: [
        { label: "Microcontroller & Logic", value: "Arduino & Embedded C" },
        { label: "Hardware Sensors & Actuators", value: "IR Sensors & Motor Driver Module" },
        { label: "Vision Pipeline", value: "Perspective Transformation, Color-Space Analysis, Morphological Filtering, Contour Detection" }
      ],
      githubUrl: null
    },
    'line-follower': {
      title: "Line Follower Robot",
      date: "December 2024",
      tags: ["Arduino", "IR Sensors", "Embedded C", "Motor Driver"],
      overview: "An autonomous robotic vehicle engineered to identify, navigate, and dynamically track predefined paths using optical infrared sensor feedback.",
      highlights: [
        "Built an autonomous robot capable of detecting and following a predefined path using IR sensors.",
        "Programmed the Arduino microcontroller to process high-frequency sensor inputs and dynamically modulate motor speed.",
        "Used a motor driver module for directional steering, torque management, and reliable motor control.",
        "Calibrated sensors to improve path detection accuracy, minimize tracking latency, and reduce deviation from reference tracks."
      ],
      hardwareAndSoftware: [
        { label: "Microcontroller", value: "Arduino" },
        { label: "Sensor Array", value: "IR (Infrared) Optical Sensors" },
        { label: "Actuation", value: "Motor Driver & DC Motors" },
        { label: "Firmware Language", value: "Embedded C" }
      ],
      githubUrl: null
    },
    'portfolio': {
      title: "Personal Portfolio Website",
      date: "January 2026",
      tags: ["HTML", "CSS", "JavaScript"],
      overview: "A premium, fully responsive engineering portfolio website engineered from scratch to present academic credentials, technical skills, robotics systems, and software projects to recruiters.",
      highlights: [
        "Designed and developed a responsive personal portfolio website to showcase projects and technical skills.",
        "Implemented structured sections including Experience, Education, and Contact with a clean UI design.",
        "Applied CSS styling and modern layout techniques (CSS Grid, Flexbox, custom properties) to ensure cross-device compatibility.",
        "Optimized webpage performance, asset loading, and navigation flow for an improved user experience."
      ],
      hardwareAndSoftware: [
        { label: "Markup & Semantics", value: "HTML5 (Accessible, SEO-optimized)" },
        { label: "Styling & System", value: "CSS3 (Custom properties, Dark/Light modes, Glassmorphism)" },
        { label: "Client-side Logic", value: "Vanilla JavaScript (Canvas animation, Validation, Modal dialogs)" }
      ],
      githubUrl: "https://github.com/adityaraj-72/Portfolio"
    }
  };

  const detailButtons = document.querySelectorAll('.view-project-details-btn');

  detailButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const projectId = button.getAttribute('data-project-id');
      const data = projectDetailsData[projectId];

      if (!data) return;

      modalTitle.textContent = data.title;
      modalDate.textContent = data.date;

      // Render tags
      modalTags.innerHTML = '';
      data.tags.forEach(function (tag) {
        const tagEl = document.createElement('span');
        tagEl.className = 'tech-tag';
        tagEl.textContent = tag;
        modalTags.appendChild(tagEl);
      });

      // Render body
      let contentHtml = `
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 6px; font-family: var(--font-mono); text-transform: uppercase;">Overview</h4>
          <p style="font-size: 0.95rem; line-height: 1.6;">${data.overview}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 1rem; color: var(--accent-cyan); margin-bottom: 10px; font-family: var(--font-mono); text-transform: uppercase;">Key Contributions & Technical Work</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${data.highlights.map(h => `
              <li style="display: flex; gap: 10px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                <span style="color: var(--accent-cyan); font-weight: bold;">▹</span>
                <span>${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 16px; margin-bottom: 20px;">
          <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; font-family: var(--font-mono); text-transform: uppercase;">System Specifications</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${data.hardwareAndSoftware.map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; flex-wrap: wrap; gap: 4px;">
                <span style="color: var(--text-muted); font-family: var(--font-mono);">${item.label}:</span>
                <span style="color: var(--text-primary); font-weight: 600;">${item.value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      modalBody.innerHTML = contentHtml;

      // Render links
      modalLinks.innerHTML = '';
      if (data.githubUrl) {
        const ghBtn = document.createElement('a');
        ghBtn.href = data.githubUrl;
        ghBtn.target = '_blank';
        ghBtn.rel = 'noopener noreferrer';
        ghBtn.className = 'btn btn-primary btn-sm';
        ghBtn.innerHTML = `
          <svg style="width:16px;height:16px;" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View Repository on GitHub
        `;
        modalLinks.appendChild(ghBtn);
      }

      openModal();
    });
  });

  function openModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', function (e) {
      if (e.target === projectModalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectModalBackdrop && projectModalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Copy Email & Toast Notification
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const email = 'adityar.ug24.ee@nitp.ac.in';
      navigator.clipboard.writeText(email).then(function () {
        showToast('Email address copied to clipboard!');
      }).catch(function () {
        showToast('adityar.ug24.ee@nitp.ac.in');
      });
    });
  });

  // --------------------------------------------------------------------------
  // 8. Contact Form Validation & Respectful Direct Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formSuccessDialog = document.getElementById('form-success-dialog');
  const formSuccessCloseBtn = document.getElementById('form-success-close-btn');
  const prefilledMailtoBtn = document.getElementById('prefilled-mailto-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFeedback(nameInput, 'Please enter your name.');
        isValid = false;
      } else {
        hideFeedback(nameInput);
      }

      // Validate Email (RFC compliant regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFeedback(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        hideFeedback(emailInput);
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showFeedback(subjectInput, 'Please enter a subject.');
        isValid = false;
      } else {
        hideFeedback(subjectInput);
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFeedback(messageInput, 'Message must be at least 10 characters long.');
        isValid = false;
      } else {
        hideFeedback(messageInput);
      }

      if (!isValid) return;

      // Prepare mailto link with encoded parameters
      const name = nameInput.value.trim();
      const userEmail = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      const mailtoUrl = `mailto:adityar.ug24.ee@nitp.ac.in?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Sender: ${name} (${userEmail})\n\nMessage:\n${message}`)}`;

      if (prefilledMailtoBtn) {
        prefilledMailtoBtn.setAttribute('href', mailtoUrl);
      }

      // Show friendly confirmation dialog
      if (formSuccessDialog) {
        formSuccessDialog.classList.add('open');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      contactForm.reset();
    });
  }

  function showFeedback(inputEl, message) {
    const parent = inputEl.closest('.form-group');
    if (!parent) return;
    const feedback = parent.querySelector('.form-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.classList.add('show');
    }
    inputEl.style.borderColor = '#ef4444';
  }

  function hideFeedback(inputEl) {
    const parent = inputEl.closest('.form-group');
    if (!parent) return;
    const feedback = parent.querySelector('.form-feedback');
    if (feedback) {
      feedback.classList.remove('show');
    }
    inputEl.style.borderColor = '';
  }

  if (formSuccessCloseBtn && formSuccessDialog) {
    formSuccessCloseBtn.addEventListener('click', function () {
      formSuccessDialog.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // --------------------------------------------------------------------------
  // 9. Scroll Reveal Animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }
});
