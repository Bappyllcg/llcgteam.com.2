/**
 * LLCG Team - Agency Core Interactions & Animations
 * Exact mechanics mirroring baunfire.com
 */

(function ($) {
  'use strict';

  // State
  const state = {
    isMenuOpen: false,
    activeModal: null,
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2,
    currentServiceIndex: 0
  };

  /* ============================================================
     1. CUSTOM MAGNETIC CURSOR
  ============================================================ */
  function initCursor() {
    const $cursor = $('.custom-cursor');
    const $dot = $('.custom-cursor-dot');
    const $ring = $('.custom-cursor-ring');
    const $text = $('.cursor-text');

    if (!$cursor.length || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    $(window).on('mousemove', function (e) {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      $dot.css({
        left: state.mouseX + 'px',
        top: state.mouseY + 'px',
      });
    });

    function renderCursor() {
      state.cursorX += (state.mouseX - state.cursorX) * 0.15;
      state.cursorY += (state.mouseY - state.cursorY) * 0.15;

      $ring.css({
        left: state.cursorX + 'px',
        top: state.cursorY + 'px',
      });

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover on links, buttons, pill buttons
    $(document).on('mouseenter', 'a, button, [data-cursor="hover"], .default-button, .chip-btn', function () {
      $cursor.addClass('is-hover');
    }).on('mouseleave', 'a, button, [data-cursor="hover"], .default-button, .chip-btn', function () {
      $cursor.removeClass('is-hover');
    });

    // Hover on project cards -> Expand into "VIEW CASE" circle
    $(document).on('mouseenter', '[data-cursor="project"], .thumbnail-container', function () {
      $cursor.addClass('is-project');
      $text.text($(this).attr('data-cursor-text') || 'VIEW CASE');
    }).on('mouseleave', '[data-cursor="project"], .thumbnail-container', function () {
      $cursor.removeClass('is-project');
    });
  }

  /* ============================================================
     2. FULLSCREEN RADIAL COVER MENU
  ============================================================ */
  function initCoverMenu() {
    const $menu = $('#coverMenu');
    const $hamburger = $('#hamburgerBtn');
    const $menuLinks = $('.menu-nav-link');

    function toggleMenu(open) {
      state.isMenuOpen = typeof open === 'boolean' ? open : !state.isMenuOpen;

      if (state.isMenuOpen) {
        $hamburger.addClass('is-active').attr('aria-expanded', 'true');
        $menu.addClass('is-open');
        $('body').addClass('overflow-hidden');
        // When cover menu is open, header must be white text on dark menu backdrop
        $('#mainHeader').addClass('background-is-black theme-dark').removeClass('background-is-white theme-light');
        $('#headerCta').addClass('background-is-black').removeClass('background-is-white');
        $('#hamburgerBtn').addClass('background-is-black').removeClass('background-is-white');
      } else {
        $hamburger.removeClass('is-active').attr('aria-expanded', 'false');
        $menu.removeClass('is-open');
        $('body').removeClass('overflow-hidden');
        // Re-evaluate header theme for current scroll position
        $(window).trigger('scroll');
      }
    }

    $hamburger.on('click', function (e) {
      e.preventDefault();
      toggleMenu();
    });

    $menuLinks.on('click', function () {
      toggleMenu(false);
    });

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        if (state.isMenuOpen) toggleMenu(false);
        if (state.activeModal) closeModal();
      }
    });
  }

  /* ============================================================
     3. HERO LETTERS & AMBIENT PARALLAX
  ============================================================ */
  function initHeroParallax() {
    const $sculpture = $('#heroSculpture');
    const $orbit = $('.hero-orbit-circle');
    const $cross1 = $('.constellation-1');
    const $cross2 = $('.constellation-2');

    if (!$sculpture.length) return;

    $(window).on('mousemove', function (e) {
      const xRatio = (e.clientX / window.innerWidth - 0.5);
      const yRatio = (e.clientY / window.innerHeight - 0.5);

      $sculpture.css({
        transform: `translate3d(${xRatio * -24}px, calc(-50% + ${yRatio * -20}px), 0)`
      });
      $orbit.css({
        transform: `translate3d(${xRatio * 18}px, calc(-50% + ${yRatio * 16}px), 0)`
      });
      $cross1.css({
        transform: `translate3d(${xRatio * 32}px, ${yRatio * 28}px, 0)`
      });
      $cross2.css({
        transform: `translate3d(${xRatio * -22}px, ${yRatio * -18}px, 0)`
      });
    });

    $(window).on('scroll', function () {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        $sculpture.css({
          transform: `translate3d(0, calc(-50% + ${scrollY * 0.35}px), 0)`,
          opacity: Math.max(0, 0.9 - (scrollY / window.innerHeight) * 1.2)
        });
      }
    });
  }

  /* ============================================================
     3B. DYNAMIC HEADER THEME SWITCHING (DARK VS LIGHT SECTIONS)
  ============================================================ */
  function initHeaderThemeObserver() {
    const $header = $('#mainHeader');
    const $cta = $('#headerCta');
    const $hamburger = $('#hamburgerBtn');
    if (!$header.length) return;

    let ticking = false;

    function evaluateTheme() {
      if (state.isMenuOpen) return;

      // Checkpoint is the vertical center of the fixed header (y ≈ 50px)
      const checkY = 50;
      const bodyTheme = document.body.getAttribute('data-theme') || 'dark';
      let activeTheme = bodyTheme;

      // Query all elements with data-theme (excluding body) in live DOM order
      const themedElements = document.querySelectorAll('[data-theme]:not(body)');
      for (let i = 0; i < themedElements.length; i++) {
        const el = themedElements[i];
        const rect = el.getBoundingClientRect();
        // If the header's vertical center lies within this element's bounds
        if (rect.top <= checkY && rect.bottom > checkY) {
          activeTheme = el.getAttribute('data-theme') || bodyTheme;
          break;
        }
      }

      const isDark = (activeTheme === 'dark' || activeTheme === 'black');

      if (isDark) {
        // Dark Section: Header elements turn White
        $header.addClass('background-is-black theme-dark').removeClass('background-is-white theme-light');
        $cta.addClass('background-is-black').removeClass('background-is-white');
        $hamburger.addClass('background-is-black').removeClass('background-is-white');
      } else {
        // Light Section: Header elements turn Dark
        $header.addClass('background-is-white theme-light').removeClass('background-is-black theme-dark');
        $cta.addClass('background-is-white').removeClass('background-is-black');
        $hamburger.addClass('background-is-white').removeClass('background-is-black');
      }

      // Logo scroll morph (Baunfire exact behavior):
      // When scrolled down past 80px, wordmark collapses to symbol; at top, full wordmark shows
      const $identity = $('.identity');
      if (window.scrollY > 80) {
        $identity.addClass('is-symbol');
      } else {
        $identity.removeClass('is-symbol');
      }

      ticking = false;
    }

    function onScrollOrResize() {
      if (!ticking) {
        requestAnimationFrame(evaluateTheme);
        ticking = true;
      }
    }

    $(window).on('scroll resize', onScrollOrResize);
    evaluateTheme();
  }

  /* ============================================================
     4. FEATURED WORK SCROLL ENTRY & CURTAIN REVEAL
  ============================================================ */
  function initWorksReveal() {
    const $containers = $('.image-container');
    if (!$containers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('show');
        }
      });
    }, { threshold: 0.15 });

    $containers.each(function () {
      observer.observe(this);
    });
  }

  /* ============================================================
     5. BAUNFIRE "WHAT WE DO" - CONTINUOUS SYMMETRICAL SLIT CURTAIN WIPE
  ============================================================ */
  function initStickyServiceStack() {
    const $track = $('#servicesTrack');
    const $cards = $('.service-card-stack');

    if (!$track.length || !$cards.length) return;

    let ticking = false;

    function updateServices() {
      const scrollY = window.scrollY;
      const trackTop = $track.offset().top;
      const trackHeight = $track.outerHeight() - window.innerHeight;

      if (trackHeight <= 0) return;

      const rawProgress = (scrollY - trackTop) / trackHeight;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Card 0: Websites
      // - 0.00 to 0.20: fully open
      // - 0.20 to 0.38: closes symmetrically into center slit
      // - > 0.38: closed
      let frac0 = 0;
      if (progress <= 0.20) {
        frac0 = 1.0;
      } else if (progress < 0.38) {
        frac0 = 1.0 - (progress - 0.20) / 0.18;
      } else {
        frac0 = 0.0;
      }

      // Card 1: Creative
      // - < 0.28: closed
      // - 0.28 to 0.44: opens symmetrically from center slit
      // - 0.44 to 0.58: fully open
      // - 0.58 to 0.74: closes symmetrically into center slit
      // - > 0.74: closed
      let frac1 = 0;
      if (progress < 0.28) {
        frac1 = 0.0;
      } else if (progress < 0.44) {
        frac1 = (progress - 0.28) / 0.16;
      } else if (progress <= 0.58) {
        frac1 = 1.0;
      } else if (progress < 0.74) {
        frac1 = 1.0 - (progress - 0.58) / 0.16;
      } else {
        frac1 = 0.0;
      }

      // Card 2: Strategy
      // - < 0.64: closed
      // - 0.64 to 0.80: opens symmetrically from center slit
      // - 0.80 to 1.00: fully open
      let frac2 = 0;
      if (progress < 0.64) {
        frac2 = 0.0;
      } else if (progress < 0.80) {
        frac2 = (progress - 0.64) / 0.16;
      } else {
        frac2 = 1.0;
      }

      const fractions = [frac0, frac1, frac2];

      // Determine active card for interaction
      let maxFrac = -1;
      let activeIdx = 0;
      fractions.forEach((f, idx) => {
        if (f > maxFrac) {
          maxFrac = f;
          activeIdx = idx;
        }
      });
      state.currentServiceIndex = activeIdx;

      // Apply symmetrical slit clip-path and opacity to each card
      $cards.each(function (idx) {
        const frac = fractions[idx];
        const cardEl = this;
        const keyImageEl = cardEl.querySelector('.key-image');

        // Symmetrical inset: 0% when fully open, 50% when fully closed
        const inset = Math.max(0, Math.min(50, (1 - frac) * 50));
        if (keyImageEl) {
          keyImageEl.style.clipPath = `inset(0 ${inset.toFixed(2)}% 0 ${inset.toFixed(2)}%)`;
        }

        if (frac > 0.01) {
          cardEl.style.opacity = Math.min(1, frac * 1.35).toFixed(3);
          cardEl.style.visibility = 'visible';
          cardEl.style.pointerEvents = idx === activeIdx ? 'auto' : 'none';
          cardEl.style.zIndex = idx === activeIdx ? '10' : '3';
        } else {
          cardEl.style.opacity = '0';
          cardEl.style.visibility = 'hidden';
          cardEl.style.pointerEvents = 'none';
          cardEl.style.zIndex = '1';
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateServices);
        ticking = true;
      }
    }

    $(window).on('scroll resize', onScroll);
    updateServices();
  }

  /* ============================================================
     6. STATS COUNTER
  ============================================================ */
  function initCounters() {
    const $counters = $('.counter-val');
    if (!$counters.length) return;

    let hasRun = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          $counters.each(function () {
            const $this = $(this);
            const target = parseFloat($this.attr('data-target'));
            const suffix = $this.attr('data-suffix') || '';
            const isFloat = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const current = target * easeProgress;

              $this.text((isFloat ? current.toFixed(1) : Math.floor(current)) + suffix);

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                $this.text((isFloat ? target.toFixed(1) : target) + suffix);
              }
            }
            requestAnimationFrame(updateCount);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('statsSection');
    if (statsSection) observer.observe(statsSection);
  }

  /* ============================================================
     7. PROJECT CASE STUDY MODAL
  ============================================================ */
  function initProjectModal() {
    const $modal = $('#projectModal');

    window.openProjectModal = function (projectId) {
      if (typeof LLCG_DATA === 'undefined') return;
      const project = LLCG_DATA.projects.find(p => p.id === projectId);
      if (!project) return;

      state.activeModal = 'project';

      $('#modalClient').text(project.client);
      $('#modalTitle').text(project.title);
      $('#modalCategory').text(project.category);
      $('#modalChallenge').text(project.challenge);
      $('#modalSolution').text(project.solution);
      $('#modalImpact').text(project.impact);
      $('#modalImage').attr('src', project.image).attr('alt', project.title);

      const $tags = $('#modalTags').empty();
      project.tags.forEach(t => {
        $tags.append(`<span class="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider uppercase text-white/90">${t}</span>`);
      });

      $modal.removeClass('hidden').addClass('flex');
      setTimeout(() => {
        $modal.find('.modal-backdrop').removeClass('opacity-0').addClass('opacity-100');
        $modal.find('.modal-panel').removeClass('translate-y-10 opacity-0').addClass('translate-y-0 opacity-100');
      }, 20);

      $('body').addClass('overflow-hidden');
    };

    window.closeModal = function () {
      state.activeModal = null;
      $modal.find('.modal-backdrop').removeClass('opacity-100').addClass('opacity-0');
      $modal.find('.modal-panel').removeClass('translate-y-0 opacity-100').addClass('translate-y-10 opacity-0');

      setTimeout(() => {
        $modal.removeClass('flex').addClass('hidden');
        $('body').removeClass('overflow-hidden');
      }, 350);
    };

    $('.close-modal-btn, .modal-backdrop').on('click', function () {
      closeModal();
    });

    $(document).on('click', '[data-open-project]', function (e) {
      e.preventDefault();
      const pId = $(this).attr('data-open-project');
      openProjectModal(pId);
    });
  }

  /* ============================================================
     8. CONSULTATION FORM & BUTTON CHIPS
  ============================================================ */
  function initConsultationForm() {
    const $form = $('#inquiryForm');
    if (!$form.length) return;

    $('.chip-btn').on('click', function () {
      $(this).toggleClass('bg-agency-red text-white border-agency-red bg-white/5 text-white/80');
      const isSelected = $(this).hasClass('bg-agency-red');
      const $checkbox = $(this).find('input[type="checkbox"]');
      if ($checkbox.length) $checkbox.prop('checked', isSelected);
    });

    $('.budget-btn').on('click', function () {
      $('.budget-btn').removeClass('border-agency-red text-agency-red bg-agency-red/10').addClass('border-white/10 text-white/70');
      $(this).removeClass('border-white/10 text-white/70').addClass('border-agency-red text-agency-red bg-agency-red/10');
      $('#selectedBudget').val($(this).attr('data-budget'));
    });

    $form.on('submit', function (e) {
      e.preventDefault();
      const $btn = $('#submitInquiryBtn');
      const $success = $('#formSuccessMessage');

      $btn.prop('disabled', true).text('TRANSMITTING INQUIRY...');
      setTimeout(() => {
        $form.slideUp(400);
        $success.removeClass('hidden').addClass('block');
      }, 1000);
    });
  }

  /* ============================================================
     10. BAUNFIRE STAGGERED ROLLING BUTTONS & PILL BUTTONS
  ============================================================ */
  function initRollingButtons() {
    $('.button-cta, .btn-roll').each(function () {
      const $el = $(this);
      if ($el.find('.char-inner').length) return;
      const text = $el.text().trim();
      if (!text) return;

      const words = text.split(/\s+/);
      let charIndex = 0;
      let html = '<span class="btn-rolling-text" aria-label="' + text + '">';
      words.forEach((word, wIdx) => {
        html += '<span class="word">';
        for (let i = 0; i < word.length; i++) {
          const c = word[i];
          html += `<span class="char" style="--i:${charIndex}"><span class="char-inner" data-char="${c}">${c}</span></span>`;
          charIndex++;
        }
        html += '</span>';
        if (wIdx < words.length - 1) {
          html += '<span class="space">&nbsp;</span>';
        }
      });
      html += '</span>';
      $el.empty().append(html);
    });

    // Pill buttons automated enhancement: Ensure rolling text & circle ripple are present
    $('.default-button, .hero-pill-button').each(function () {
      const $btn = $(this);
      if ($btn.find('.circle-fill').length) return;
      
      const text = $btn.find('.text').text().trim() || $btn.text().trim();
      $btn.empty().append(`
        <span class="btn-text-roll">
          <span class="btn-text-main">${text}</span>
          <span class="btn-text-hover">${text}</span>
        </span>
        <span class="circle-fill"></span>
        <span class="icon-wrap">
          <span class="plus-icon"></span>
        </span>
      `);
    });
  }

  /* ============================================================
     INITIALIZE
  ============================================================ */
  $(document).ready(function () {
    initCursor();
    initCoverMenu();
    initHeroParallax();
    initHeaderThemeObserver();
    initRollingButtons();
    initWorksReveal();
    initStickyServiceStack();
    initCounters();
    initProjectModal();
    initConsultationForm();

    // Smooth scroll for internal hashes
    $('a[href^="#"]').on('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
        }, 800);
      }
    });
  });
})(jQuery);
