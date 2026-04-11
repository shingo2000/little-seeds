document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.header__menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.menu-overlay__close-btn');
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
});
