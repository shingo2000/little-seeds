document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.header__menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.menu-overlay__close-btn');
    const menuLinks = document.querySelectorAll('.menu-overlay__item a');

    function openMenu() {
        menuOverlay.classList.add('is-open');
        menuOverlay.setAttribute('aria-hidden', 'false');
        menuBtn.setAttribute('aria-label', 'メニューを閉じる');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOverlay.classList.remove('is-open');
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-label', 'メニューを開く');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

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
