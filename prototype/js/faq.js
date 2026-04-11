document.addEventListener('DOMContentLoaded', () => {
    const DURATION = 300;
    document.querySelectorAll('.faq__item').forEach(details => {
        const answer = details.querySelector('.faq__answer');
        let animation = null;

        details.addEventListener('click', (e) => {
            e.preventDefault();
            if (animation) animation.cancel();

            if (details.open) {
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
});
