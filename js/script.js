/**
 * ============================================================
 * PERSONAL PORTFOLIO — MAIN SCRIPT
 * ============================================================
 * Features:
 *   • Login / Logout protection
 *   • Smooth scrolling & active nav highlight
 *   • Mobile menu auto-close
 *   • Scroll-to-top button
 *   • Scroll-reveal animations
 *   • Animated skill bars
 *   • Animated stat counters
 *   • Project category filtering
 *   • Project detail modal
 *   • Typing animation (Typed.js)
 *   • Contact form (mailto: demo)
 *   • Dynamic copyright year
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // =========================================================
    // 1. LOGIN PROTECTION
    // =========================================================
    // Only show the main app if the user is logged in.
    // If not logged in, redirect to login.html.
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html';
            return; // Stop further script execution
        }

        // ---- Dynamic Year ----
        const yearEl = document.getElementById('currentYear');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // ---- Logout ----
        function handleLogout() {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                handleLogout();
            }
        });

        const footerLogout = document.getElementById('footerLogout');
        if (footerLogout) footerLogout.addEventListener('click', function (e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // =========================================================
    // 2. NAVBAR — Scroll Effect & Active Section
    // =========================================================
    const navbar = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.btn-logout)');

    function onScroll() {
        // Sticky navbar shadow
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load

    // =========================================================
    // 3. MOBILE MENU — Auto-close on link click
    // =========================================================
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        const mobileLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Close Bootstrap collapse
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            });
        });
    }

    // =========================================================
    // 4. SMOOTH SCROLL (fallback for browsers without CSS scroll-behavior)
    // =========================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // =========================================================
    // 5. SCROLL-TO-TOP BUTTON
    // =========================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================================
    // 6. SCROLL REVEAL ANIMATION
    // =========================================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(function (el) {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 120;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // Run on load

    // =========================================================
    // 7. SKILL BAR ANIMATION
    // =========================================================
    function animateSkillBars() {
        const items = document.querySelectorAll('.skill-item');
        items.forEach(function (item) {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80 && !item.classList.contains('animated')) {
                item.classList.add('animated');
            }
        });
    }
    window.addEventListener('scroll', animateSkillBars, { passive: true });
    animateSkillBars(); // Run on load

    // =========================================================
    // 7.5. LANGUAGE BAR ANIMATION
    // =========================================================
    function animateLanguageBars() {
        const bars = document.querySelectorAll('.language-card');
        bars.forEach(function (card) {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80 && !card.classList.contains('animated')) {
                card.classList.add('animated');
            }
        });
    }
    window.addEventListener('scroll', animateLanguageBars, { passive: true });
    animateLanguageBars(); // Run on load

    // =========================================================
    // 8. STAT COUNTER ANIMATION
    // =========================================================
    let statsCounted = false;
    function animateStats() {
        if (statsCounted) return;
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        if (statNumbers.length === 0) return;
        const rect = statNumbers[0].getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            statsCounted = true;
            statNumbers.forEach(function (el) {
                const target = parseInt(el.getAttribute('data-target'), 10);
                let count = 0;
                const duration = 2000; // ms
                const increment = target / (duration / 16);
                function updateCount() {
                    count += increment;
                    if (count < target) {
                        el.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        el.textContent = target;
                    }
                }
                updateCount();
            });
        }
    }
    window.addEventListener('scroll', animateStats, { passive: true });
    animateStats();

    // =========================================================
    // 9. TYPING ANIMATION (Typed.js)
    // =========================================================
    // Replace the strings array with your own titles
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-output', {
            strings: [
                'Student',
                'Web Developer',
                'IT Professional',
                'Problem Solver',
                'Creative Thinker'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // =========================================================
    // 10. PROJECT FILTERING
    // =========================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            // Update active button
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(function (card) {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add fadeIn keyframe dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = '@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }';
    document.head.appendChild(styleSheet);

    // =========================================================
    // 11. PROJECT MODAL
    // =========================================================
    const modalEl = document.getElementById('projectModal');
    if (modalEl) {
        modalEl.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            // Find the closest project card
            const card = button.closest('.project-card');
            if (!card) return;

            document.getElementById('projectModalLabel').textContent = card.getAttribute('data-title') || 'Project Details';
            document.getElementById('modalObjective').textContent = card.getAttribute('data-objective') || '';
            document.getElementById('modalProblem').textContent = card.getAttribute('data-problem') || '';
            document.getElementById('modalFeatures').textContent = card.getAttribute('data-features') || '';
            document.getElementById('modalContribution').textContent = card.getAttribute('data-contribution') || '';

            // Image
            const imgSrc = card.querySelector('.project-image img')?.src || '';
            document.getElementById('modalProjectImage').src = imgSrc;

            // Tech tags
            const techContainer = document.getElementById('modalTech');
            techContainer.innerHTML = '';
            try {
                const techs = JSON.parse(card.getAttribute('data-tech') || '[]');
                techs.forEach(function (t) {
                    const span = document.createElement('span');
                    span.textContent = t;
                    techContainer.appendChild(span);
                });
            } catch (e) { /* ignore */ }

            // Links
            const liveLink = document.getElementById('modalLiveLink');
            const githubLink = document.getElementById('modalGithubLink');
            liveLink.href = card.getAttribute('data-link') || '#';
            githubLink.href = card.getAttribute('data-github') || '#';
        });
    }

    // =========================================================
    // 12. CONTACT FORM (Front-End Demo — mailto: only)
    // =========================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name    = document.getElementById('contactName').value.trim();
            const email   = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }

            // Build mailto subject and body
            const finalSubject = subject
                ? encodeURIComponent('[Portfolio] ' + subject)
                : encodeURIComponent('[Portfolio] New Message from ' + name);
            const finalBody = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Email: ' + email + '\n\n' +
                'Message:\n' + message
            );

            // Open default email client — NO server involved
            window.location.href = 'mailto:[your-email@example.com]?subject=' + finalSubject + '&body=' + finalBody;

            // Clear form
            contactForm.reset();
            alert('Your email client should open now. If it does not, please email me directly at [your-email@example.com].\n\n⚠️ This is a front-end demo — no data is sent to any server.');
        });
    }

    // =========================================================
    // 13. CONVERT TO PDF — Opens resume.html for printing
    // =========================================================

}); // end DOMContentLoaded