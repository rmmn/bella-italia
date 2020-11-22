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
        buttonVariantListener = document.querySelector('.variant-buttons>.variant-button[data-plan="listener"]'),
        menuItems = document.querySelectorAll('.top-menu>li>.nav-link'),
        navOverlay = document.querySelector('.nav-overlay'),
        menu = document.querySelector('.menu');

    window.addEventListener('scroll', function (e) {
        if (this.scrollY < (header.clientHeight - nav.clientHeight)) {
            navBg.classList.remove('shown');
        } else {
            navBg.classList.add('shown');
        }

        // menuItems.forEach(m => {
        //     const id = m.getAttribute('href').split('#')[1];

        //     if (isElementInViewport(document.getElementById(id))) {
        //         m.classList.add('active');
        //     } else {
        //         m.classList.remove('active');
        //     }
        // })
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

    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function (e) {
            e.preventDefault();

            const id = this.getAttribute('href').split('#')[1],
                yOffset = -nav.clientHeight,
                element = document.getElementById(id),
                y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            window.history.pushState(null, "", window.location.href.split('#')[0] + '#' + id);

            menuItems.forEach(m => {
                if (m.getAttribute('href') == '#' + id) {
                    m.classList.add('active');
                } else {
                    m.classList.remove('active');
                }
            });

            navOverlay.classList.remove('opened');
            menu.classList.remove('open');

            if (window.scrollY > (header.clientHeight - nav.clientHeight)) {
                navBg.classList.remove('shown');
            }

            if (window.innerWidth <= 768 || window.innerHeight <= window.innerHeight < (document.querySelector('.top-menu').clientHeight + 174)) {
                document.body.removeAttribute('style');
                document.querySelector("html").removeAttribute('style');
            }
        });
    });

    menu.addEventListener('click', function () {
        if (this.classList.contains('open')) {
            this.classList.remove('open');
            navOverlay.classList.remove('opened');
            navBg.classList.remove('shown');

            if (window.scrollY > (header.clientHeight - nav.clientHeight)) {
                navBg.classList.add('shown');
            }

            if (window.innerWidth <= 768 || window.innerHeight < (document.querySelector('.top-menu').clientHeight + 174)) {
                document.body.removeAttribute('style');
                document.querySelector("html").removeAttribute('style');
            }
        } else {
            this.classList.add('open');
            navOverlay.classList.add('opened');
            navBg.classList.add('shown');

            if (window.innerWidth <= 768 || window.innerHeight < (document.querySelector('.top-menu').clientHeight + 174)) {
                document.body.style.overflow = "hidden";
                document.querySelector("html").style.overflow = "hidden";
            }
        }
    });

    scrollWhenLoaded();

    function scrollWhenLoaded() {
        const hash = window.location.hash;

        if (hash != '') {
            const id = hash.split('#')[1],
                yOffset = -nav.clientHeight,
                element = document.getElementById(id),
                y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            menuItems.forEach(menuItem => {
                if (menuItem.getAttribute('href') == hash) {
                    menuItem.classList.add('active');
                } else {
                    menuItem.classList.remove('active');
                }
            });
        }
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return rect.bottom + 60 >= 0 &&
            rect.right > 0 &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
            rect.top + 60 < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
    }


})();