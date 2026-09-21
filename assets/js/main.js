/**
 * Frame & Preserve - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Reset on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // 2.5 Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Material Selector (Home 2)
    const materialTabs = document.querySelectorAll('.material-selector .nav-link');
    const materialPanels = document.querySelectorAll('.material-panel');

    if (materialTabs.length > 0 && materialPanels.length > 0) {
        materialTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                materialTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const target = tab.getAttribute('data-target');

                // Hide all panels
                materialPanels.forEach(panel => {
                    panel.classList.add('d-none');
                    panel.classList.remove('active');
                });

                // Show target panel
                const targetPanel = document.getElementById(`panel-${target}`);
                if (targetPanel) {
                    targetPanel.classList.remove('d-none');
                    // Small timeout to allow display:block to apply before animating opacity
                    setTimeout(() => {
                        targetPanel.classList.add('active');
                    }, 10);
                }
            });
        });
    }

    // 4. Gallery Filtering (Home 2 & Gallery Page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-img-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300); // match transition time
                    }
                });
            });
        });
    }

    // 5. Timeline Scroll Animation (Home 2)
    const timelineSteps = document.querySelectorAll('.timeline-step');
    if (timelineSteps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        timelineSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.6s ease-out';
            observer.observe(step);
        });
    }

    // 6. Form Upload Preview Placeholder
    const uploadInput = document.getElementById('file-upload');
    const uploadPreview = document.getElementById('upload-preview');

    if (uploadInput && uploadPreview) {
        uploadInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                uploadPreview.innerHTML = `<div class="p-3 bg-surface border mt-3 text-sm">Selected file: ${this.files[0].name}</div>`;
            }
        });
    }

    // 7. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Theme Toggle (Dark Mode)
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeCss = document.getElementById('theme-css');

    // Check initial preference from local storage or OS
    let isDarkMode = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (themeCss) {
        themeCss.disabled = !isDarkMode; // Disable dark mode CSS if not dark mode
    }
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (themeCss) {
                themeCss.disabled = !isDarkMode;
            }
            if (isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    });

    // 9. RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    const rtlCss = document.getElementById('rtl-css');

    let isRtl = localStorage.getItem('dir') === 'rtl';

    if (isRtl) {
        document.documentElement.setAttribute('dir', 'rtl');
        if (rtlCss) rtlCss.disabled = false;
    } else {
        if (rtlCss) rtlCss.disabled = true;
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            isRtl = !isRtl;
            document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
            if (rtlCss) {
                rtlCss.disabled = !isRtl;
            }
            localStorage.setItem('dir', isRtl ? 'rtl' : 'ltr');
        });
    });

    // Move header buttons to mobile menu on small screens
    function handleResponsiveMenu() {
        const headerActions = document.querySelector('.header-actions');
        const navLinks = document.querySelector('.nav-links');
        const themeToggle = document.querySelector('.theme-toggle');
        const rtlToggle = document.querySelector('.rtl-toggle');
        // Find the quote button by href since we removed the extra classes
        const quoteBtn = document.querySelector('.header-actions a[href="quote.html"]');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 1024) {
            if (themeToggle && themeToggle.parentElement !== navLinks) {
                let mobileControls = document.querySelector('.nav-mobile-controls');
                if (!mobileControls) {
                    mobileControls = document.createElement('li');
                    mobileControls.className = 'nav-mobile-controls';
                    navLinks.appendChild(mobileControls);
                }
                mobileControls.appendChild(themeToggle);
                mobileControls.appendChild(rtlToggle);
                if (quoteBtn) {
                    quoteBtn.classList.remove('d-none', 'd-lg-block', 'btn-sm');
                    quoteBtn.classList.add('btn-primary-mobile');
                    mobileControls.appendChild(quoteBtn);
                }
            }
        } else {
            if (themeToggle && themeToggle.parentElement !== headerActions) {
                headerActions.insertBefore(themeToggle, menuToggle);
                headerActions.insertBefore(rtlToggle, menuToggle);
                if (quoteBtn) {
                    quoteBtn.classList.add('d-none', 'd-lg-block', 'btn-sm');
                    quoteBtn.classList.remove('btn-primary-mobile');
                    headerActions.insertBefore(quoteBtn, menuToggle);
                }
                const mobileControls = document.querySelector('.nav-mobile-controls');
                if (mobileControls) {
                    mobileControls.remove();
                }
            }
        }
    }
    
    window.addEventListener('resize', handleResponsiveMenu);
    handleResponsiveMenu();
});

