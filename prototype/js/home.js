document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('hero__slide--active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('hero__slide--active');
        }, 3000);
    }
});
