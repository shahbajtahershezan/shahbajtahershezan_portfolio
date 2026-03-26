(function() {
  "use strict";

  /**
   * Mobile navigation toggle
   */
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu ul');
  
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('show');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('.navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('show')) {
        mobileNavToggle.click();
      }
    });
  });

  /**
   * Preloader
   */
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  /**
   * Sticky header on scroll
   */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Navmenu Scrollspy
   */
const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // show button after scrolling 300px
    scrollTopButton.classList.add('active');
  } else {
    scrollTopButton.classList.remove('active');
  }
});

// Scroll to top on click
scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


  /**
   * Experience Section Animations
   */
  function initExperienceAnimations() {
    const experienceCard = document.querySelector('.erp-card');
    const responsibilityItems = document.querySelectorAll('.responsibility-item');
    const skillCategories = document.querySelectorAll('.skill-category');
    const achievements = document.querySelector('.achievements');
    const achievementItems = document.querySelectorAll('.achievement-list li');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add hover effect to skill tags
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', function() {
        this.classList.add('active');
      });
      
      tag.addEventListener('mouseleave', function() {
        this.classList.remove('active');
      });
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('erp-card')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 100);
          }
          
          if (entry.target.classList.contains('responsibility-item')) {
            const index = Array.from(responsibilityItems).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 100 + (index * 100));
          }
          
          if (entry.target.classList.contains('skill-category')) {
            const index = Array.from(skillCategories).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 300 + (index * 150));
          }
          
          if (entry.target.classList.contains('achievements')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
              achievementItems.forEach((item, index) => {
                setTimeout(() => {
                  item.classList.add('visible');
                }, index * 100);
              });
            }, 500);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements
    if (experienceCard) observer.observe(experienceCard);
    responsibilityItems.forEach(item => observer.observe(item));
    skillCategories.forEach(category => observer.observe(category));
    if (achievements) observer.observe(achievements);
  }

  /**
   * Education Cards Animation
   */
  function animateEducationCards() {
    const educationCards = document.querySelectorAll('.education-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.3 });

    educationCards.forEach(card => {
      observer.observe(card);
    });
  }

  /**
   * Theme Toggle Functionality
   */
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or preferred scheme
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Toggle theme function
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    }
    
    // Add event listener to theme toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  /**
   * Initialize all animations and functionality
   */
  function initAll() {
    initExperienceAnimations();
    animateEducationCards();
    initThemeToggle();
    
    // Add active class to experience section on scroll
    function checkScroll() {
      const section = document.getElementById('experience');
      if (!section) return;
      
      const sectionPosition = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
        section.classList.add('active');
      }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check
  }

  /**
   * Wait for DOM to be fully loaded before initializing
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();