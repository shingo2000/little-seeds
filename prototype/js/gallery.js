document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox__image-wrapper');
    const items = document.querySelectorAll('.gallery__item');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const item = items[currentIndex];
        const thumb = item.querySelector('.gallery__thumb');
        const img = thumb.querySelector('img');
        if (img) {
            lightboxImage.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        } else {
            const placeholder = thumb.querySelector('.placeholder');
            lightboxImage.innerHTML = `<div class="placeholder" style="width:80vw;height:60vh;max-width:800px">${placeholder.textContent}</div>`;
        }
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateLightboxImage();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        updateLightboxImage();
    }

    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox__prev').addEventListener('click', showPrev);
    lightbox.querySelector('.lightbox__next').addEventListener('click', showNext);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
});
