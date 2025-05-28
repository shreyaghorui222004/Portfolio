// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Fixed Role Animation System
class RoleAnimator {
    constructor() {
        this.roles = document.querySelectorAll('.role');
        this.currentIndex = 0;
        this.isAnimating = false;
        this.interval = null;
        
        this.init();
    }
    
    init() {
        if (this.roles.length === 0) return;
        
        // Initialize all roles as hidden
        this.roles.forEach((role, index) => {
            role.classList.remove('active', 'exit');
            if (index === 0) {
                role.classList.add('active');
            }
        });
        
        // Start the rotation after initial delay
        setTimeout(() => {
            this.startRotation();
        }, 2000);
    }
    
    startRotation() {
        this.interval = setInterval(() => {
            this.nextRole();
        }, 3000);
    }
    
    nextRole() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const currentRole = this.roles[this.currentIndex];
        
        // Exit current role
        currentRole.classList.remove('active');
        currentRole.classList.add('exit');
        
        // Calculate next index
        this.currentIndex = (this.currentIndex + 1) % this.roles.length;
        const nextRole = this.roles[this.currentIndex];
        
        // After exit animation, show next role
        setTimeout(() => {
            currentRole.classList.remove('exit');
            nextRole.classList.add('active');
            this.isAnimating = false;
        }, 300);
    }
    
    destroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Initialize role animator when DOM is loaded
let roleAnimator;
document.addEventListener('DOMContentLoaded', () => {
    roleAnimator = new RoleAnimator();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    // About section elements
    document.querySelectorAll('.text-block').forEach((element, index) => {
        element.classList.add('slide-in-left');
        element.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(element);
    });

    document.querySelectorAll('.about-visual').forEach(element => {
        element.classList.add('slide-in-right');
        observer.observe(element);
    });

    // Stats cards
    document.querySelectorAll('.stat-card').forEach((element, index) => {
        element.classList.add('scale-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Skill categories
    document.querySelectorAll('.skill-category').forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(element);
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((element, index) => {
        element.classList.add('scale-in');
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });

    // Contact elements
    document.querySelectorAll('.contact-card').forEach(element => {
        element.classList.add('slide-in-left');
        observer.observe(element);
    });

    document.querySelectorAll('.contact-form-wrapper').forEach(element => {
        element.classList.add('slide-in-right');
        observer.observe(element);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Skill progress bar animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            setTimeout(() => {
                entry.target.style.width = width;
            }, 500);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple form validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    `;

    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    `;

    // Style close button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
        opacity: 0.8;
    `;

    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = 'rgba(255, 255, 255, 0.2)';
        closeButton.style.opacity = '1';
    });

    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'none';
        closeButton.style.opacity = '0.8';
    });

    // Add to document
    document.body.appendChild(notification);

    // Close button functionality
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationColor(type) {
    switch (type) {
        case 'success':
            return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
        case 'error':
            return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        default:
            return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 Portfolio loaded successfully!');
    console.log('✨ Role animation initialized!');
});