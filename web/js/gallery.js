document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const scroller = lightbox.querySelector('.lightbox__scroller');
    const counterCurrent = lightbox.querySelector('.lightbox__current');
    const counterTotal = lightbox.querySelector('.lightbox__total');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const items = document.querySelectorAll('.gallery__item');

    if (!scroller || items.length === 0) return;

    if (counterTotal) counterTotal.textContent = items.length;

    // Pre-populate slides once so scroll-snap has targets
    items.forEach((item) => {
        const img = item.querySelector('img');
        const slide = document.createElement('div');
        slide.className = 'lightbox__slide';
        const slideImg = document.createElement('img');
        slideImg.src = img.src;
        slideImg.alt = img.alt || '';
        slideImg.loading = 'lazy';
        slide.appendChild(slideImg);
        scroller.appendChild(slide);
    });

    function currentIndex() {
        const width = scroller.clientWidth || 1;
        return Math.round(scroller.scrollLeft / width);
    }

    function updateCounter() {
        if (counterCurrent) counterCurrent.textContent = currentIndex() + 1;
    }

    function openLightbox(index) {
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Wait for transition/layout then jump scroll position
        requestAnimationFrame(() => {
            scroller.style.scrollBehavior = 'auto';
            scroller.scrollLeft = index * scroller.clientWidth;
            requestAnimationFrame(() => {
                scroller.style.scrollBehavior = '';
                updateCounter();
            });
        });
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function scrollBy(delta) {
        const width = scroller.clientWidth;
        const next = Math.max(0, Math.min((items.length - 1) * width, scroller.scrollLeft + delta * width));
        scroller.scrollTo({ left: next, behavior: 'smooth' });
    }

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Update counter as user scrolls
    let scrollTimer = null;
    scroller.addEventListener('scroll', () => {
        if (scrollTimer) cancelAnimationFrame(scrollTimer);
        scrollTimer = requestAnimationFrame(updateCounter);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') scrollBy(-1);
        if (e.key === 'ArrowRight') scrollBy(1);
    });

    // Mouse drag (desktop)
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    scroller.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartScroll = scroller.scrollLeft;
        scroller.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        scroller.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        scroller.classList.remove('is-dragging');
        // Snap to nearest slide
        const width = scroller.clientWidth;
        const idx = Math.round(scroller.scrollLeft / width);
        scroller.scrollTo({ left: idx * width, behavior: 'smooth' });
    });
});
