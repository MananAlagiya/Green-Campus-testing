// Navigation Toggle
const mobileMenu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mock Backend Logic
const Backend = {
    getPledgeCount: () => {
        return parseInt(localStorage.getItem('pledge_count')) || 5432;
    },
    addPledge: () => {
        let count = Backend.getPledgeCount();
        count++;
        localStorage.setItem('pledge_count', count);
        return count;
    }
};

// Pledge Functionality
const pledgeBtn = document.querySelector('#pledge-btn');
const pledgeCountDisplay = document.querySelector('#pledge-count');

if (pledgeBtn && pledgeCountDisplay) {
    // Initial load
    pledgeCountDisplay.innerHTML = `Current Pledges: ${Backend.getPledgeCount().toLocaleString()}`;

    pledgeBtn.addEventListener('click', () => {
        const newCount = Backend.addPledge();
        pledgeCountDisplay.innerHTML = `Current Pledges: ${newCount.toLocaleString()}`;
        
        // Visual feedback
        pledgeBtn.innerHTML = "Pledge Taken! <i class='fa-solid fa-check'></i>";
        pledgeBtn.style.background = "#00d2ff";
        pledgeBtn.disabled = true;
        
        // GSAP Animation for number jump
        gsap.fromTo(pledgeCountDisplay, { scale: 1.2, color: "#00ff88" }, { scale: 1, color: "#a0a0a0", duration: 0.5 });
    });
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Hero Animations
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    });

    gsap.from('.hero p', {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.btn-container', {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.8
    });

    // Scroll Animations for Focus Cards
    gsap.from('.focus-card', {
        scrollTrigger: {
            trigger: '.focus-areas',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Impact Stats Counting Animation
    const animateStats = () => {
        const stats = [
            { id: '#stat-reduction', end: 45, suffix: '%' },
            { id: '#stat-participants', end: 12.5, suffix: 'k' },
            { id: '#stat-waste', end: 8.2, suffix: 't' }
        ];

        stats.forEach(stat => {
            const el = document.querySelector(stat.id);
            if (!el) return;
            
            let obj = { val: 0 };
            gsap.to(obj, {
                val: stat.end,
                duration: 2,
                scrollTrigger: {
                    trigger: '.impact',
                    start: 'top 80%',
                },
                onUpdate: () => {
                    el.innerHTML = obj.val.toFixed(1).replace('.0', '') + stat.suffix;
                }
            });
        });
    };

    animateStats();
});

// Mobile menu style additions
const style = document.createElement('style');
style.innerHTML = `
    @media (max-width: 900px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: var(--nav-height);
            left: 0;
            width: 100%;
            background: rgba(5, 11, 10, 0.95);
            padding: 40px;
            gap: 20px;
            text-align: center;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-glass);
        }
    }
`;
document.head.appendChild(style);
