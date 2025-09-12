// ===== PORTFOLIO WEBSITE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {
       // Initialize all functionality
       initNavbar();
       initScrollAnimations();
       initSkillCards();
       initSmoothScrolling();
       initTypingEffect();
       initParallaxEffects();
       initPageTransitions();
       initContactForm();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
       const navbar = document.getElementById('mainNav');
       const navLinks = document.querySelectorAll('.nav-link');

       // Navbar scroll effect
       window.addEventListener('scroll', function () {
              if (window.scrollY > 50) {
                     navbar.classList.add('scrolled');
              } else {
                     navbar.classList.remove('scrolled');
              }
       });

       // Active link highlighting
       window.addEventListener('scroll', function () {
              let current = '';
              const sections = document.querySelectorAll('section[id]');

              sections.forEach(section => {
                     const sectionTop = section.offsetTop;
                     const sectionHeight = section.clientHeight;
                     if (window.scrollY >= (sectionTop - 200)) {
                            current = section.getAttribute('id');
                     }
              });

              navLinks.forEach(link => {
                     link.classList.remove('active');
                     if (link.getAttribute('href') === `#${current}`) {
                            link.classList.add('active');
                     }
              });
       });

       // Mobile menu close on link click
       navLinks.forEach(link => {
              link.addEventListener('click', function () {
                     const navbarCollapse = document.querySelector('.navbar-collapse');
                     if (navbarCollapse.classList.contains('show')) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                            bsCollapse.hide();
                     }
              });
       });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
       const observerOptions = {
              threshold: 0.1,
              rootMargin: '0px 0px -50px 0px'
       };

       const observer = new IntersectionObserver(function (entries) {
              entries.forEach(entry => {
                     if (entry.isIntersecting) {
                            entry.target.classList.add('visible');

                            // Special handling for skill cards
                            if (entry.target.classList.contains('skill-card')) {
                                   animateSkillCard(entry.target);
                            }

                            // Special handling for project cards
                            if (entry.target.classList.contains('project-card')) {
                                   animateProjectCard(entry.target);
                            }
                     }
              });
       }, observerOptions);

       // Observe elements for animation
       const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .social-link');
       animatedElements.forEach(el => {
              el.classList.add('fade-in');
              observer.observe(el);
       });
}

// ===== SKILL CARDS ANIMATION =====
function initSkillCards() {
       const skillCards = document.querySelectorAll('.skill-card');

       skillCards.forEach((card, index) => {
              // Add staggered animation delay
              card.style.animationDelay = `${index * 0.1}s`;

              // Add hover effects
              card.addEventListener('mouseenter', function () {
                     this.style.transform = 'translateY(-10px) scale(1.02)';
              });

              card.addEventListener('mouseleave', function () {
                     this.style.transform = 'translateY(0) scale(1)';
              });
       });
}

function animateSkillCard(card) {
       // Add bounce animation when card comes into view
       card.style.animation = 'fadeInUp 0.6s ease-out';

       // Add a subtle pulse effect to the icon
       const icon = card.querySelector('.skill-icon');
       if (icon) {
              icon.style.animation = 'pulse 2s ease-in-out infinite';
       }
}

// ===== PROJECT CARD ANIMATIONS =====
function animateProjectCard(card) {
       // Add staggered animation delay
       const cards = document.querySelectorAll('.project-card');
       const cardIndex = Array.from(cards).indexOf(card);
       card.style.animationDelay = `${cardIndex * 0.1}s`;

       // Add hover effects
       card.addEventListener('mouseenter', function () {
              this.style.transform = 'translateY(-10px) scale(1.02)';
       });

       card.addEventListener('mouseleave', function () {
              this.style.transform = 'translateY(0) scale(1)';
       });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
       const links = document.querySelectorAll('a[href^="#"]');

       links.forEach(link => {
              link.addEventListener('click', function (e) {
                     e.preventDefault();

                     const targetId = this.getAttribute('href');
                     const targetSection = document.querySelector(targetId);

                     if (targetSection) {
                            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                            window.scrollTo({
                                   top: offsetTop,
                                   behavior: 'smooth'
                            });
                     }
              });
       });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
       const heroTitle = document.querySelector('.hero-title');
       if (!heroTitle) return;

       const originalText = heroTitle.innerHTML;
       const textElement = heroTitle.querySelector('span');
       const text = textElement.textContent;

       textElement.textContent = '';
       textElement.style.borderRight = '2px solid white';

       let i = 0;
       const typeWriter = () => {
              if (i < text.length) {
                     textElement.textContent += text.charAt(i);
                     i++;
                     setTimeout(typeWriter, 100);
              } else {
                     // Remove cursor after typing is complete
                     setTimeout(() => {
                            textElement.style.borderRight = 'none';
                     }, 1000);
              }
       };

       // Start typing effect after a short delay
       setTimeout(typeWriter, 1000);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
       const heroSection = document.querySelector('.hero-section');
       const profileCard = document.querySelector('.profile-card');

       if (!heroSection || !profileCard) return;

       window.addEventListener('scroll', function () {
              const scrolled = window.pageYOffset;
              const rate = scrolled * -0.5;

              if (scrolled < window.innerHeight) {
                     profileCard.style.transform = `translateY(${rate}px)`;
              }
       });
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
       // Add loading animation to elements
       const elementsToAnimate = document.querySelectorAll('.hero-content, .hero-image, .skill-item, .project-card');

       elementsToAnimate.forEach((element, index) => {
              element.style.opacity = '0';
              element.style.transform = 'translateY(30px)';
              element.style.transition = 'all 0.6s ease-out';

              setTimeout(() => {
                     element.style.opacity = '1';
                     element.style.transform = 'translateY(0)';
              }, index * 100);
       });
}

// ===== CTA BUTTON EFFECTS =====
document.addEventListener('DOMContentLoaded', function () {
       const ctaButtons = document.querySelectorAll('.cta-button');

       ctaButtons.forEach(button => {
              // Ripple effect
              button.addEventListener('click', function (e) {
                     const ripple = document.createElement('span');
                     const rect = this.getBoundingClientRect();
                     const size = Math.max(rect.width, rect.height);
                     const x = e.clientX - rect.left - size / 2;
                     const y = e.clientY - rect.top - size / 2;

                     ripple.style.width = ripple.style.height = size + 'px';
                     ripple.style.left = x + 'px';
                     ripple.style.top = y + 'px';
                     ripple.classList.add('ripple');

                     this.appendChild(ripple);

                     setTimeout(() => {
                            ripple.remove();
                     }, 600);
              });
       });
});

// ===== SOCIAL LINKS HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function () {
       const socialLinks = document.querySelectorAll('.social-link');

       socialLinks.forEach(link => {
              link.addEventListener('mouseenter', function () {
                     this.style.transform = 'translateY(-5px) scale(1.1)';
                     this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
              });

              link.addEventListener('mouseleave', function () {
                     this.style.transform = 'translateY(0) scale(1)';
                     this.style.boxShadow = 'none';
              });
       });
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function createScrollToTopButton() {
       const scrollButton = document.createElement('button');
       scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
       scrollButton.className = 'scroll-to-top';
       scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

       document.body.appendChild(scrollButton);

       // Show/hide button based on scroll position
       window.addEventListener('scroll', function () {
              if (window.scrollY > 300) {
                     scrollButton.style.opacity = '1';
                     scrollButton.style.visibility = 'visible';
              } else {
                     scrollButton.style.opacity = '0';
                     scrollButton.style.visibility = 'hidden';
              }
       });

       // Scroll to top functionality
       scrollButton.addEventListener('click', function () {
              window.scrollTo({
                     top: 0,
                     behavior: 'smooth'
              });
       });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events for better performance
function throttle(func, wait) {
       let timeout;
       return function executedFunction(...args) {
              const later = () => {
                     clearTimeout(timeout);
                     func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
       };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function () {
       // Scroll-based animations and effects
       const navbar = document.getElementById('mainNav');
       if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
       } else {
              navbar.classList.remove('scrolled');
       }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
       const images = document.querySelectorAll('img[data-src]');

       const imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                     if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                     }
              });
       });

       images.forEach(img => imageObserver.observe(img));
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initContactForm() {
       const contactForm = document.getElementById('contactForm');
       if (!contactForm) return;

       contactForm.addEventListener('submit', function (e) {
              e.preventDefault();

              // Get form data
              const formData = new FormData(this);
              const name = formData.get('name');
              const email = formData.get('email');
              const subject = formData.get('subject');
              const message = formData.get('message');

              // Basic validation
              if (!name || !email || !subject || !message) {
                     showNotification('Please fill in all required fields.', 'error');
                     return;
              }

              // Email validation
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                     showNotification('Please enter a valid email address.', 'error');
                     return;
              }

              // Create mailto link
              const mailtoLink = `mailto:neshaprasathcs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

              // Open email client
              window.location.href = mailtoLink;

              // Show success message
              showNotification('Thank you! Your email client should open with the message ready to send.', 'success');

              // Reset form
              this.reset();
       });

       // Add real-time validation
       const inputs = contactForm.querySelectorAll('input, textarea');
       inputs.forEach(input => {
              input.addEventListener('blur', function () {
                     validateField(this);
              });

              input.addEventListener('input', function () {
                     clearFieldError(this);
              });
       });
}

function validateField(field) {
       const value = field.value.trim();
       const fieldName = field.name;

       clearFieldError(field);

       if (field.hasAttribute('required') && !value) {
              showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`);
              return false;
       }

       if (fieldName === 'email' && value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                     showFieldError(field, 'Please enter a valid email address.');
                     return false;
              }
       }

       return true;
}

function showFieldError(field, message) {
       field.classList.add('is-invalid');

       let errorDiv = field.parentNode.querySelector('.invalid-feedback');
       if (!errorDiv) {
              errorDiv = document.createElement('div');
              errorDiv.className = 'invalid-feedback';
              field.parentNode.appendChild(errorDiv);
       }
       errorDiv.textContent = message;
}

function clearFieldError(field) {
       field.classList.remove('is-invalid');
       const errorDiv = field.parentNode.querySelector('.invalid-feedback');
       if (errorDiv) {
              errorDiv.remove();
       }
}

function showNotification(message, type = 'info') {
       // Remove existing notifications
       const existingNotifications = document.querySelectorAll('.notification');
       existingNotifications.forEach(notification => notification.remove());

       // Create notification element
       const notification = document.createElement('div');
       notification.className = `notification notification-${type}`;
       notification.innerHTML = `
              <div class="notification-content">
                     <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                     <span>${message}</span>
                     <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                            <i class="fas fa-times"></i>
                     </button>
              </div>
       `;

       // Add styles
       notification.style.cssText = `
              position: fixed;
              top: 20px;
              right: 20px;
              background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
              color: white;
              padding: 15px 20px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              z-index: 9999;
              max-width: 400px;
              animation: slideInRight 0.3s ease-out;
       `;

       document.body.appendChild(notification);

       // Auto remove after 5 seconds
       setTimeout(() => {
              if (notification.parentNode) {
                     notification.style.animation = 'slideOutRight 0.3s ease-out';
                     setTimeout(() => notification.remove(), 300);
              }
       }, 5000);
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🚀 Portfolio Website Loaded Successfully!
👨‍💻 Built with HTML5, CSS3, JavaScript & Bootstrap 5
✨ Featuring smooth animations and responsive design
📱 Optimized for all devices
📧 Contact form functionality included
`);

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
       console.error('Portfolio Website Error:', e.error);
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function (e) {
       // ESC key to close mobile menu
       if (e.key === 'Escape') {
              const navbarCollapse = document.querySelector('.navbar-collapse');
              if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                     const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                     bsCollapse.hide();
              }
       }
});

// Focus management for better accessibility
document.addEventListener('DOMContentLoaded', function () {
       const focusableElements = document.querySelectorAll('a, button, input, textarea, select');

       focusableElements.forEach(element => {
              element.addEventListener('focus', function () {
                     this.style.outline = '2px solid var(--primary-color)';
                     this.style.outlineOffset = '2px';
              });

              element.addEventListener('blur', function () {
                     this.style.outline = 'none';
              });
       });
});
