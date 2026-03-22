document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 800);
        });
        // Fallback if load event already fired
        if (document.readyState === 'complete') {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.add('loaded');
            }, 800);
        }
    } else {
        document.body.classList.add('loaded');
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Slide Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slideup');
    slideUpElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    if (mobileBtn && mobileOverlay) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileOverlay.classList.toggle('open');
            if (isOpen) {
                mobileBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                mobileBtn.children[1].style.opacity = '0';
                mobileBtn.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                document.body.style.overflow = 'hidden';
            } else {
                mobileBtn.children[0].style.transform = 'none';
                mobileBtn.children[1].style.opacity = '1';
                mobileBtn.children[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('open');
                mobileBtn.children[0].style.transform = 'none';
                mobileBtn.children[1].style.opacity = '1';
                mobileBtn.children[2].style.transform = 'none';
                document.body.style.overflow = '';
            });
        });
    }
});
