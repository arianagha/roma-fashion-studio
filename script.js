document.addEventListener('DOMContentLoaded', () => {

    // ── Preloader ──
    const preloader = document.querySelector('.preloader');
    const showPage = () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 800);
    };
    if (preloader) {
        window.addEventListener('load', showPage);
        if (document.readyState === 'complete') showPage();
    } else {
        document.body.classList.add('loaded');
    }

    // ── Custom Cursor ──
    const cursor = document.querySelector('.cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        let mx = 0, my = 0, cx = 0, cy = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
        });

        (function animateCursor() {
            cx += (mx - cx) * 0.15;
            cy += (my - cy) * 0.15;
            cursor.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
            requestAnimationFrame(animateCursor);
        })();

        const hoverTargets = document.querySelectorAll('a, button, .product-card, .mobile-menu-btn, .lookbook-item');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
        });

        document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // ── Page Transitions ──
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (!href || href === '#' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
                if (this.hostname !== window.location.hostname) return;

                e.preventDefault();
                pageTransition.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
    }

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ── Intersection Observer for Slide Up Animations ──
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.slideup').forEach(el => observer.observe(el));

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') { e.preventDefault(); return; }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ── Mobile Menu Toggle ──
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    if (mobileBtn && mobileOverlay) {
        const toggleMenu = (open) => {
            if (open) {
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
        };

        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileOverlay.classList.toggle('open');
            toggleMenu(isOpen);
        });

        mobileOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('open');
                toggleMenu(false);
            });
        });
    }

    // ── Ticker Duplication ──
    document.querySelectorAll('.ticker-inner').forEach(inner => {
        const content = inner.innerHTML;
        inner.innerHTML = content + content;
    });
});
