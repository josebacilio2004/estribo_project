document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const heroTitle = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .btn');

    // Hero entrance
    setTimeout(() => {
        if(heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.style.transition = 'all 1.2s cubic-bezier(0.2, 0.6, 0.2, 1)';
        }
        if(heroSub) {
            heroSub.style.opacity = '1';
            heroSub.style.transform = 'translateY(0)';
            heroSub.style.transition = 'all 1.2s cubic-bezier(0.2, 0.6, 0.2, 1) 0.3s';
        }
        if(heroBtn) {
            heroBtn.style.opacity = '1';
            heroBtn.style.transform = 'translateY(0)';
            heroBtn.style.transition = 'all 1.2s cubic-bezier(0.2, 0.6, 0.2, 1) 0.6s';
        }
    }, 500);

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // Mobile menu logic (to be refined if needed)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Form Submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias! Hemos recibido tu mensaje desde Huancayo y nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
});
