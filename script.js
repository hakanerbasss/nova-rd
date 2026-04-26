/* ===== NOVA R&D - JavaScript Master ===== */

// ===== MOBILE NAV =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLi.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== PARTICLE EFFECT =====
const particleContainer = document.getElementById('particles');
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(108, 99, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 8}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
    `;
    particleContainer.appendChild(particle);
}

// Add float keyframes dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const isCurrency = counter.getAttribute('data-target').startsWith('$');
    const duration = 2000;
    const step = Math.max(1, Math.floor(target / 60));
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current >= target) {
            counter.textContent = isCurrency ? '$' + target + 'M' : target;
            return;
        }
        counter.textContent = isCurrency ? '$' + current + 'M' : current;
        requestAnimationFrame(updateCounter);
    };
    updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.research-card, .project-item, .team-card, .about-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    // Simulation (replace with actual API call)
    setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check-circle"></i>';
        btn.style.background = 'linear-gradient(135deg, #00d4aa, #00a87e)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===== SMOOTH CURSOR GLOW (desktop only) =====
const hero = document.querySelector('.hero');
let cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108, 99, 255, 0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
`;

if (window.innerWidth > 768) {
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

console.log('🚀 Nova R&D — Engineering the Future');
console.log('📧 contact@novard.io');
