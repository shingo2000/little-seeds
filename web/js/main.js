document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.header__menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.menu-overlay__close-btn');
    const menuLinks = document.querySelectorAll('.menu-overlay__item a');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function openMenu() {
        menuOverlay.classList.add('is-open');
        menuOverlay.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを閉じる');
        document.body.style.overflow = 'hidden';
        themeColorMeta.setAttribute('content', '#ede8e2');
    }

    function closeMenu() {
        menuOverlay.classList.remove('is-open');
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
        themeColorMeta.setAttribute('content', '#ffffff');
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Hero slideshow
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('hero__slide--active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('hero__slide--active');
        }, 3000);
    }

    // FAQ accordion animation
    const DURATION = 300;
    document.querySelectorAll('.faq__item').forEach(details => {
        const answer = details.querySelector('.faq__answer');
        let animation = null;

        details.addEventListener('click', (e) => {
            e.preventDefault();
            if (animation) animation.cancel();

            if (details.open) {
                // close
                const startHeight = answer.offsetHeight;
                answer.style.height = startHeight + 'px';
                animation = answer.animate(
                    { height: [startHeight + 'px', '0px'] },
                    { duration: DURATION, easing: 'ease' }
                );
                animation.onfinish = () => {
                    details.open = false;
                    answer.style.height = '';
                    animation = null;
                };
            } else {
                // open
                details.open = true;
                const endHeight = answer.offsetHeight;
                answer.style.height = '0px';
                animation = answer.animate(
                    { height: ['0px', endHeight + 'px'] },
                    { duration: DURATION, easing: 'ease' }
                );
                animation.onfinish = () => {
                    answer.style.height = '';
                    animation = null;
                };
            }
        });
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            closeMenu();

            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    });
});
