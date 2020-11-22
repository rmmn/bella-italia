(function () {
    const elements = {
        nav: document.querySelector('.top-nav'),
        navBg: document.querySelector('.top-nav>.nav-bg'),
        header: document.querySelector('.header'),
        icons: document.querySelectorAll('img[data-role="icon"]'),
        slideVideoOverlay: document.querySelectorAll('.slide-video>.video-overlay'),
        accordeon: document.querySelectorAll('.accordeon'),
        selectPlanButtons: document.querySelectorAll('.select-plan>.select-plan-button'),
        planA1: document.querySelector('.plan-a1'),
        planA2: document.querySelector('.plan-a2'),
        buttonPlanA1: document.querySelector('.select-plan>.select-plan-button[data-plan="a1"]'),
        buttonPlanA2: document.querySelector('.select-plan>.select-plan-button[data-plan="a2"]'),
        variantFeedback: document.querySelector('.variants-feedback'),
        variantListener: document.querySelector('.variants-listener'),
        selectVariantButtons: document.querySelectorAll('.variant-buttons>.variant-button'),
        buttonVariantFeedback: document.querySelector('.variant-buttons>.variant-button[data-plan="feedback"]'),
        buttonVariantListener: document.querySelector('.variant-buttons>.variant-button[data-plan="listener"]'),
        menuItems: document.querySelectorAll('.top-menu>li>.nav-link'),
        navOverlay: document.querySelector('.nav-overlay'),
        menu: document.querySelector('.menu')
    };

    elements.icons.forEach(icon => {
        icon.setAttribute('draggable', false);
    });

    function toggleMenu(open = true) {
        if (!open) {
            elements.menu.classList.remove('open');
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
            elements.menu.classList.add('open');
            navOverlay.classList.add('opened');
            navBg.classList.add('shown');

            if (window.innerWidth <= 768 || window.innerHeight < (document.querySelector('.top-menu').clientHeight + 174)) {
                document.body.style.overflow = "hidden";
                document.querySelector("html").style.overflow = "hidden";
            }
        }
    }

    function toggleNavBg(show) {
        if (show) {
            navBg.classList.add('shown');
        } else {
            navBg.classList.remove('shown');
        }
    }

    function scrollToSection(e) {
        e.preventDefault();

        const id = this.getAttribute('href').split('#')[1],
            yOffset = -nav.clientHeight,
            element = document.getElementById(id),
            y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });

        window.history.pushState(null, "", window.location.href.split('#')[0] + '#' + id);

        elements.menuItems.forEach(m => {
            if (m.getAttribute('href') == '#' + id) {
                m.classList.add('active');
            } else {
                m.classList.remove('active');
            }
        });

        toggleMenu(false);
    }

    function scrollWhenLoaded() {
        const hash = window.location.hash;

        if (hash != '') {
            const id = hash.split('#')[1],
                yOffset = -nav.clientHeight,
                element = document.getElementById(id),
                y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            elements.menuItems.forEach(menuItem => {
                if (menuItem.getAttribute('href') == hash) {
                    menuItem.classList.add('active');
                } else {
                    menuItem.classList.remove('active');
                }
            });
        }
    }

    function selectPlan(e, btn) {
        if (btn.getAttribute('data-plan') == 'a1') {
            if (!elements.planA1.classList.contains('active')) {
                elements.planA1.classList.add('active');
                elements.planA2.classList.remove('active');
                elements.buttonPlanA1.classList.add('active');
                elements.buttonPlanA2.classList.remove('active');
            }
        } else {
            if (!elements.planA2.classList.contains('active')) {
                elements.planA1.classList.remove('active');
                elements.planA2.classList.add('active');
                elements.buttonPlanA1.classList.remove('active');
                elements.buttonPlanA2.classList.add('active');
            }
        }
    }

    function selectVariant(e, btn) {
        if (btn.getAttribute('data-plan') == 'feedback') {
            if (!elements.variantFeedback.classList.contains('active')) {
                elements.variantFeedback.classList.add('active');
                elements.variantListener.classList.remove('active');
                elements.buttonVariantFeedback.classList.add('active');
                elements.buttonVariantListener.classList.remove('active');
            }
        } else {
            if (!elements.variantListener.classList.contains('active')) {
                elements.variantFeedback.classList.remove('active');
                elements.variantListener.classList.add('active');
                elements.buttonVariantFeedback.classList.remove('active');
                elements.buttonVariantListener.classList.add('active');
            }
        }
    }

    function toggleAccordeon(e) {
        this.parentElement.classList.toggle('opened');
    }

    function videoFadeOutPlaceholder(e, overlay) {
        const currentFrame = e.currentTarget.nextElementSibling,
            currentUrl = currentFrame.getAttribute('src');
        e.currentTarget.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], 300).onfinish = () => {
            e.currentTarget.style.opacity = 0;
            e.currentTarget.style.display = 'none';
            currentFrame.src = currentUrl + "?autoplay=1";
        }
    }

    elements.selectVariantButtons.forEach(btn => {
        btn.addEventListener('click', selectVariant(e, btn));
    });

    elements.selectPlanButtons.forEach(btn => {
        btn.addEventListener('click', selectPlan(e, btn));
    });

    elements.accordeon.forEach(function (e) {
        const header = e.querySelector('.accordeon-header');
        header.addEventListener('click', toggleAccordeon(e));
    });

    elements.slideVideoOverlay.forEach(overlay => {
        overlay.addEventListener('click', videoFadeOutPlaceholder(e, overlay));
    });

    elements.menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', scrollToSection(e))
    });

    elements.menu.addEventListener('click', function () {
        toggleMenu(this.classList.contains('open'))
    });

    window.addEventListener('scroll', toggleNavBg(this.scrollY < (header.clientHeight - nav.clientHeight)));

    scrollWhenLoaded();
})();