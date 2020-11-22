(function () {
    const nav = document.querySelector('.top-nav'),
        navBg = document.querySelector('.top-nav>.nav-bg'),
        header = document.querySelector('.header'),
        icons = document.querySelectorAll('img[data-role="icon"]'),
        slideVideoOverlay = document.querySelectorAll('.slide-video>.video-overlay'),
        accordeon = document.querySelectorAll('.accordeon'),
        selectPlanButtons = document.querySelectorAll('.select-plan>.select-plan-button'),
        planA1 = document.querySelector('.plan-a1'),
        planA2 = document.querySelector('.plan-a2'),
        buttonPlanA1 = document.querySelector('.select-plan>.select-plan-button[data-plan="a1"]'),
        buttonPlanA2 = document.querySelector('.select-plan>.select-plan-button[data-plan="a2"]'),
        variantFeedback = document.querySelector('.variants-feedback'),
        variantListener = document.querySelector('.variants-listener'),
        selectVariantButtons = document.querySelectorAll('.variant-buttons>.variant-button'),
        buttonVariantFeedback = document.querySelector('.variant-buttons>.variant-button[data-plan="feedback"]'),
        buttonVariantListener = document.querySelector('.variant-buttons>.variant-button[data-plan="listener"]');

    window.addEventListener('scroll', function (e) {
        if (this.scrollY < (header.clientHeight - nav.clientHeight)) {
            navBg.classList.remove('shown');
        } else {
            navBg.classList.add('shown');
        }
    });

    icons.forEach(icon => {
        icon.setAttribute('draggable', false);
    });

    slideVideoOverlay.forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            const currentFrame = overlay.nextElementSibling,
                currentUrl = currentFrame.getAttribute('src');
            overlay.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], 300).onfinish = () => {
                overlay.style.opacity = 0;
                overlay.style.display = 'none';
                currentFrame.src = currentUrl + "?autoplay=1";
            }
        });
    });

    accordeon.forEach(function (e) {
        const header = e.querySelector('.accordeon-header');

        header.addEventListener('click', function () {
            this.parentElement.classList.toggle('opened');
        });
    });

    selectPlanButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            if (btn.getAttribute('data-plan') == 'a1') {
                if (!planA1.classList.contains('active')) {
                    planA1.classList.add('active');
                    planA2.classList.remove('active');
                    buttonPlanA1.classList.add('active');
                    buttonPlanA2.classList.remove('active');
                }
            } else {
                if (!planA2.classList.contains('active')) {
                    planA1.classList.remove('active');
                    planA2.classList.add('active');
                    buttonPlanA1.classList.remove('active');
                    buttonPlanA2.classList.add('active');
                }
            }

        });
    });

    selectVariantButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            if (btn.getAttribute('data-plan') == 'feedback') {
                if (!variantFeedback.classList.contains('active')) {
                    variantFeedback.classList.add('active');
                    variantListener.classList.remove('active');
                    buttonVariantFeedback.classList.add('active');
                    buttonVariantListener.classList.remove('active');
                }
            } else {
                if (!variantListener.classList.contains('active')) {
                    variantFeedback.classList.remove('active');
                    variantListener.classList.add('active');
                    buttonVariantFeedback.classList.remove('active');
                    buttonVariantListener.classList.add('active');
                }
            }


        });
    });
})();