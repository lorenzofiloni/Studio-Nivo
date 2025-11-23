// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a little animation to the button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections (except hero)
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
    
    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Project card hover effect with cursor
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--accent)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border)';
    });
});

// Add subtle parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Animated counter for skills (optional enhancement)
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

// Trigger skill animation when in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillTags.forEach(tag => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Console message for developers who inspect 😊
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #2a9d8f;');
console.log('%cWelcome to Studio Nivo', 'font-size: 14px; color: #666;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #999;');

// ================================
// FLOATING STUDIOS - INTERACTIVE EFFECTS
// ================================

// Cursor repulsion effect
const blobs = document.querySelectorAll('.blob');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    blobs.forEach(blob => {
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - blobCenterX;
        const distanceY = mouseY - blobCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Repulsion radius
        const repulsionRadius = 120;
        
        if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const moveX = -distanceX * force * 0.3;
            const moveY = -distanceY * force * 0.3;
            
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            blob.style.transform = 'translate(0, 0)';
        }
    });
});

// Click ripple effect
document.addEventListener('click', (e) => {
    blobs.forEach(blob => {
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - blobCenterX;
        const distanceY = e.clientY - blobCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 200) {
            // Create ripple effect
            blob.style.transition = 'transform 340ms cubic-bezier(.22,.9,.35,1)';
            const currentTransform = blob.style.transform;
            blob.style.transform = currentTransform + ' scale(1.08)';
            
            setTimeout(() => {
                blob.style.transform = currentTransform;
            }, 340);
        }
    });
});

// Parallax scroll effect for blobs
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const foregroundBlob = document.querySelector('.blob-foreground');
            const midBlob = document.querySelector('.blob-mid');
            const backgroundBlob = document.querySelector('.blob-background');
            
            if (foregroundBlob && scrolled < window.innerHeight * 2) {
                foregroundBlob.style.transform = `translateY(${scrolled * 0.12}px)`;
            }
            if (midBlob && scrolled < window.innerHeight * 2) {
                midBlob.style.transform = `translateY(${scrolled * 0.08}px)`;
            }
            if (backgroundBlob && scrolled < window.innerHeight * 2) {
                backgroundBlob.style.transform = `translateY(${scrolled * -0.06}px)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Check for reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('Reduced motion mode active - animations simplified');
}