/**
 * Innovate Tech - Main JavaScript
 * This file contains all the JavaScript functionality for the website
 */

// DOM ready function
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initSectionAnimations();
    initCounters();
    enhanceSmoothScroll();
    initBackToTop();
    initParticles();
    initFormValidation();
    setCurrentYear();
});

/**
 * Theme Toggle Functionality
 * Handles switching between light and dark themes
 */
function initThemeToggle() {
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlEl.classList.add('dark');
    }
    
    function toggleTheme() {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            htmlEl.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Add event listeners to theme toggle buttons
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);
}

/**
 * Mobile Menu Functionality
 * Controls the mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

/**
 * Section Animations
 * Handles scroll-based animations for sections
 */
function initSectionAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll(
        ".section-fade-in, .scroll-fade-in, .scroll-from-left, " +
        ".scroll-from-right, .scroll-item-pop"
    );
    
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

/**
 * Counter Animations
 * Animates number counters when they come into view
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const counterSpeed = 200; // Lower is faster
    
    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const count = parseInt(counter.textContent || '0', 10);
        const increment = target / counterSpeed;
        
        if (count < target) {
            counter.textContent = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 1);
        } else {
            counter.textContent = target;
        }
    };
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    
    counters.forEach((counter) => {
        observer.observe(counter);
    });
}

/**
 * Smooth Scroll Functionality
 * Enhances anchor links with smooth scrolling
 */
function enhanceSmoothScroll() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href');
            if (!targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Get the navbar height to offset scrolling position
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            // Calculate offset position
            const offsetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            // Smooth scroll
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Back to Top Button
 * Controls the back to top button visibility and functionality
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Particle Effect
 * Creates particle elements for the hero section
 */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 50 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Add particle to container
        container.appendChild(particle);
    }
}

/**
 * Form Validation
 * Handles form submission and validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form inputs
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email format validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

/**
 * Set Current Year
 * Updates footer copyright year
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Window resize handler
 * Handles responsive adjustments
 */
window.addEventListener('resize', debounce(() => {
    // Re-initialize particles for responsive sizing
    initParticles();
}, 250));

/**
 * Debounce function
 * Limits how often a function can be called
 */
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        // Start counting when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter.parentElement);
            }
        });
        
        observer.observe(counter.parentElement);
    });
});



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }

  function acceptCookies() {
    document.cookie = "cookie_consent=accepted; path=/; max-age=" + 60 * 60 * 24 * 365;
    document.getElementById('cookie-banner').style.display = 'none';
  }

  function declineCookies() {
    document.cookie = "cookie_consent=declined; path=/; max-age=" + 60 * 60 * 24 * 365;
    document.getElementById('cookie-banner').style.display = 'none';
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (!getCookie('cookie_consent')) {
      document.getElementById('cookie-banner').style.display = 'block';
    }
  });


  