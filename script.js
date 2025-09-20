// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const currentTheme = body.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', updateNavbarBackground);

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
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

// EmailJS initialization removed - using Formspree instead

// Contact form handling with Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Submit form to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact me directly at namitaggarwal.fullstack@gmail.com', 'error');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        
        // Prevent default form submission
        e.preventDefault();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-item, .experience-item, .education-item, .project-item, .blog-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on hover
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize theme icon and navbar background
updateThemeIcon(currentTheme);
updateNavbarBackground();

// Dynamic Duration Calculator
function calculateDuration(startDate, endDate) {
    const start = new Date(startDate + '-01');
    const end = endDate === 'present' ? new Date() : new Date(endDate + '-01');
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (endDate === 'present' && end.getDate() < start.getDate()) {
        months--;
    }
    
    if (years === 0) {
        return months === 1 ? '1 mo' : `${months} mos`;
    } else if (months === 0) {
        return years === 1 ? '1 yr' : `${years} yrs`;
    } else {
        const yearText = years === 1 ? '1 yr' : `${years} yrs`;
        const monthText = months === 1 ? '1 mo' : `${months} mos`;
        return `${yearText} ${monthText}`;
    }
}

function updateDurations() {
    const durationElements = document.querySelectorAll('.experience-duration[data-start]');
    
    durationElements.forEach(element => {
        const startDate = element.getAttribute('data-start');
        const endDate = element.getAttribute('data-end');
        const durationSpan = element.querySelector('.duration-calc');
        
        if (durationSpan) {
            const duration = calculateDuration(startDate, endDate);
            durationSpan.textContent = duration;
        }
    });
}

// Calculate total years of experience
function calculateTotalExperience() {
    const startDate = new Date('2020-02-01'); // Start of QA Trainee role
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }
    
    // Calculate precise years with decimal
    const preciseYears = years + (months / 12);
    const displayYears = preciseYears.toFixed(1);
    
    // Update hero experience (decimal)
    const heroExperienceElement = document.getElementById('hero-experience');
    if (heroExperienceElement) {
        heroExperienceElement.textContent = displayYears;
    }
    
    // Update about experience (decimal)
    const aboutExperienceElement = document.getElementById('about-experience');
    if (aboutExperienceElement) {
        aboutExperienceElement.textContent = displayYears;
    }
    
    // Update stats experience (decimal with +)
    const totalExperienceElement = document.getElementById('total-experience');
    if (totalExperienceElement) {
        totalExperienceElement.textContent = `${displayYears}+`;
    }
}

// Initialize durations and total experience on page load
updateDurations();
calculateTotalExperience();

// Update durations every month to keep them current
setInterval(() => {
    updateDurations();
    calculateTotalExperience();
}, 30 * 24 * 60 * 60 * 1000); // 30 days

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateNavbarBackground(); // Update navbar background when theme changes
});

// Expandable Experience and Education Functions
function toggleExperience(element) {
    // Get all experience items
    const allExperienceItems = document.querySelectorAll('.experience-item');
    
    // Check if the clicked item is already expanded
    const isCurrentlyExpanded = element.classList.contains('expanded');
    
    // Remove expanded class from all items
    allExperienceItems.forEach(item => {
        item.classList.remove('expanded');
    });
    
    // If the clicked item wasn't expanded, expand it
    if (!isCurrentlyExpanded) {
        element.classList.add('expanded');
    }
}

function toggleEducation(element) {
    // Get all education items
    const allEducationItems = document.querySelectorAll('.education-item');
    
    // Check if the clicked item is already expanded
    const isCurrentlyExpanded = element.classList.contains('expanded');
    
    // Remove expanded class from all items
    allEducationItems.forEach(item => {
        item.classList.remove('expanded');
    });
    
    // If the clicked item wasn't expanded, expand it
    if (!isCurrentlyExpanded) {
        element.classList.add('expanded');
    }
}

// Add loaded class styles
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: #007bff;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
