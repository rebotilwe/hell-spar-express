/* ============================================================
   Shell Ottawa — script.js
   Handles: Swiper slider, navbar scroll effect, smooth scroll,
            gallery lightbox (Chocolat), back-to-top
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       1. NAVBAR — add solid background on scroll
    ---------------------------------------------------------- */
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                navbar.style.background = '#1A1A1A';
                navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
            } else {
                navbar.style.background = '#1A1A1A';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    /* ----------------------------------------------------------
       2. SMOOTH SCROLL — for all anchor links (#section)
    ---------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 80; // navbar height
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });

                // Close offcanvas on mobile if open
                var offcanvas = document.getElementById('offcanvasNavbar');
                if (offcanvas && offcanvas.classList.contains('show')) {
                    var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                }
            }
        });
    });

    /* ----------------------------------------------------------
       3. SWIPER — project/gallery slider
    ---------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {

        /* Gallery swiper on homepage */
        if (document.querySelector('.project-swiper')) {
            var projectSwiper = new Swiper('.project-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 16,
                loop: true,
                speed: 600,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    0:    { slidesPerView: 1 },
                    576:  { slidesPerView: 2 },
                    992:  { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                },
            });

            /* Wire up custom arrow buttons */
            var arrowLeft  = document.querySelector('.icon-arrow-left');
            var arrowRight = document.querySelector('.icon-arrow-right');
            if (arrowLeft)  arrowLeft.addEventListener('click',  function () { projectSwiper.slidePrev(); });
            if (arrowRight) arrowRight.addEventListener('click', function () { projectSwiper.slideNext(); });
        }

        /* ----------------------------------------------------------
           4. CHOCOLAT LIGHTBOX — gallery image links
        ---------------------------------------------------------- */
        if (typeof Chocolat !== 'undefined') {
            Chocolat(document.querySelectorAll('.image-link'), {
                loop: true,
            });
        }

        /* ----------------------------------------------------------
           5. BACK TO TOP BUTTON — appears after scrolling 400px
        ---------------------------------------------------------- */
        var backToTop = document.createElement('a');
        backToTop.innerHTML = '<iconify-icon icon="tabler:arrow-up" style="font-size:20px;"></iconify-icon>';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.style.cssText = [
            'position:fixed',
            'bottom:98px',          /* sits above WhatsApp button */
            'right:28px',
            'z-index:9998',
            'background:#FBCE07',
            'color:#1A1A1A',
            'width:44px',
            'height:44px',
            'border-radius:50%',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'text-decoration:none',
            'opacity:0',
            'pointer-events:none',
            'transition:opacity 0.3s ease',
            'box-shadow:0 2px 10px rgba(0,0,0,0.2)',
        ].join(';');

        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });

        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        /* ----------------------------------------------------------
           6. ACTIVE NAV LINK — highlight current page in navbar
        ---------------------------------------------------------- */
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href === currentPage) {
                link.classList.add('active');
                link.style.color = '#FBCE07';
            }
        });

        /* ----------------------------------------------------------
           7. PRICING TABS — remember last selected tab in sessionStorage
        ---------------------------------------------------------- */
        var tabs = document.querySelectorAll('#myTab .nav-link');
        var savedTab = sessionStorage.getItem('shell_price_tab');
        if (savedTab) {
            var savedEl = document.querySelector('#myTab [data-bs-target="' + savedTab + '"]');
            if (savedEl) {
                var bsTab = new bootstrap.Tab(savedEl);
                bsTab.show();
            }
        }
        tabs.forEach(function (tab) {
            tab.addEventListener('shown.bs.tab', function (e) {
                sessionStorage.setItem('shell_price_tab', e.target.getAttribute('data-bs-target'));
            });
        });

    }); // end DOMContentLoaded

})();