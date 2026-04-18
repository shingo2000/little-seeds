document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const imageWrapper = lightbox.querySelector('.lightbox__image-wrapper');
    const counterCurrent = lightbox.querySelector('.lightbox__current');
    const counterTotal = lightbox.querySelector('.lightbox__total');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const items = document.querySelectorAll('.gallery__item');
    if (counterTotal) counterTotal.textContent = items.length;
    let currentIndex = 0;

    function updateImage() {
        const item = items[currentIndex];
        const img = item.querySelector('img');
        if (img) {
            imageWrapper.innerHTML = `<img src="${img.src}" alt="${img.alt || ''}">`;
        }
        if (counterCurrent) counterCurrent.textContent = currentIndex + 1;
    }

    function openLightbox(index) {
        currentIndex = index;
        updateImage();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        updateImage();
    }

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Tap on overlay area (outside image) to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === imageWrapper) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // Swipe gesture (touch)
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50;

    lightbox.addEventListener('touchstart', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
            if (dx > 0) showPrev();
            else showNext();
        }
    }, { passive: true });
});
