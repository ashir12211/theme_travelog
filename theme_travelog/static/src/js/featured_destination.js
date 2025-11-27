/** @odoo-module **/

import publicWidget from '@web/legacy/js/public/public_widget';

publicWidget.registry.FeaturedDestinations = publicWidget.Widget.extend({
    selector: '.s_featured_destinations',

    /**
     * @override
     */
    start() {
        this._super.apply(this, arguments);
        this._initScrollAnimations();
        this._initCardInteractions();
        this._initParallaxEffect();
        this._initMagneticButtons();
    },

    /**
     * Initialize scroll-triggered animations
     * @private
     */
    _initScrollAnimations() {
        const cards = this.el.querySelectorAll('.js_featured_card');

        if (cards.length === 0) {
            return;
        }

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = parseInt(card.dataset.index, 10) * 150;

                    setTimeout(() => {
                        card.classList.add('is-visible');
                    }, delay);

                    cardObserver.unobserve(card);
                }
            });
        }, observerOptions);

        cards.forEach((card) => {
            cardObserver.observe(card);
        });
    },

    /**
     * Initialize card interaction effects
     * @private
     */
    _initCardInteractions() {
        const cards = this.el.querySelectorAll('.s_featured_destination_card');

        cards.forEach((card) => {
            card.addEventListener('mouseenter', (ev) => {
                this._onCardMouseEnter(ev);
            });

            card.addEventListener('mousemove', (ev) => {
                this._onCardMouseMove(ev);
            });

            card.addEventListener('mouseleave', (ev) => {
                this._onCardMouseLeave(ev);
            });
        });
    },

    /**
     * Handle card mouse enter
     * @private
     * @param {Event} ev
     */
    _onCardMouseEnter(ev) {
        const card = ev.currentTarget;
        const particles = card.querySelectorAll('.particle');

        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.opacity = '1';
                this._animateParticle(particle);
            }, index * 100);
        });
    },

    /**
     * Handle card mouse move for tilt effect
     * @private
     * @param {Event} ev
     */
    _onCardMouseMove(ev) {
        const card = ev.currentTarget;
        const rect = card.getBoundingClientRect();
        const xPos = ev.clientX - rect.left;
        const yPos = ev.clientY - rect.top;

        const xPercent = (xPos / rect.width - 0.5) * 2;
        const yPercent = (yPos / rect.height - 0.5) * 2;

        const tiltX = yPercent * 5;
        const tiltY = -xPercent * 5;

        const imgEl = card.querySelector('.s_featured_destination_image img');
        if (imgEl) {
            const parallaxX = xPercent * 20;
            const parallaxY = yPercent * 20;
            imgEl.style.transform = `scale(1.15) rotate(2deg) translate(${parallaxX}px, ${parallaxY}px)`;
        }

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-15px) scale(1.02)`;
    },

    /**
     * Handle card mouse leave
     * @private
     * @param {Event} ev
     */
    _onCardMouseLeave(ev) {
        const card = ev.currentTarget;
        const particles = card.querySelectorAll('.particle');

        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';

        const imgEl = card.querySelector('.s_featured_destination_image img');
        if (imgEl) {
            imgEl.style.transform = 'scale(1) rotate(0deg) translate(0, 0)';
        }

        particles.forEach((particle) => {
            particle.style.opacity = '0';
        });
    },

    /**
     * Animate particle with random movement
     * @private
     * @param {HTMLElement} particle
     */
    _animateParticle(particle) {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;

        particle.style.transition = 'all 3s ease-out';
        particle.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.5)`;

        setTimeout(() => {
            particle.style.transition = 'all 2s ease-in';
            particle.style.transform = 'translate(0, 0) scale(1)';
        }, 3000);
    },

    /**
     * Initialize parallax scrolling effect
     * @private
     */
    _initParallaxEffect() {
        const shapes = this.el.querySelectorAll('.s_featured_destinations_bg_shapes .shape');

        if (shapes.length === 0) {
            return;
        }

        let rafId = null;

        const handleScroll = () => {
            if (rafId) {
                return;
            }

            rafId = requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                const sectionTop = this.el.offsetTop;
                const sectionHeight = this.el.offsetHeight;

                if (scrollPosition + window.innerHeight > sectionTop &&
                    scrollPosition < sectionTop + sectionHeight) {

                    const relativeScroll = scrollPosition - sectionTop;

                    shapes.forEach((shape, index) => {
                        const speed = 0.2 + (index * 0.1);
                        const translateY = relativeScroll * speed;
                        shape.style.transform = `translateY(${translateY}px)`;
                    });
                }

                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        this._scrollHandler = handleScroll;
    },

    /**
     * Initialize magnetic button effect
     * @private
     */
    _initMagneticButtons() {
        const buttons = this.el.querySelectorAll('.s_featured_destination_btn');

        buttons.forEach((btn) => {
            btn.addEventListener('mousemove', (ev) => {
                this._magneticButtonMove(ev, btn);
            });

            btn.addEventListener('mouseleave', () => {
                this._magneticButtonReset(btn);
            });
        });
    },

    /**
     * Handle magnetic button movement
     * @private
     * @param {Event} ev
     * @param {HTMLElement} btn
     */
    _magneticButtonMove(ev, btn) {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = ev.clientX - btnCenterX;
        const deltaY = ev.clientY - btnCenterY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = rect.width;

        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = deltaX * strength * 0.3;
            const moveY = deltaY * strength * 0.3;

            btn.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-5px)`;
        }
    },

    /**
     * Reset magnetic button position
     * @private
     * @param {HTMLElement} btn
     */
    _magneticButtonReset(btn) {
        btn.style.transform = 'translate(0, 0)';
    },

    /**
     * Create ripple effect on button click
     * @private
     * @param {Event} ev
     */
    _createRippleEffect(ev) {
        const btn = ev.currentTarget;
        const rect = btn.getBoundingClientRect();

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';

        const size = Math.max(rect.width, rect.height);
        const xPos = ev.clientX - rect.left - size / 2;
        const yPos = ev.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${xPos}px;
            top: ${yPos}px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;

        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    /**
     * @override
     */
    destroy() {
        if (this._scrollHandler) {
            window.removeEventListener('scroll', this._scrollHandler);
        }
        this._super.apply(this, arguments);
    }
});

export default publicWidget.registry.FeaturedDestinations;