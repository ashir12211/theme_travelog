/** @odoo-module **/

import publicWidget from '@web/legacy/js/public/public_widget';

publicWidget.registry.TravelogHero = publicWidget.Widget.extend({
    selector: '.s_travelog_hero',

    /**
     * @override
     */
    start() {
        this._super.apply(this, arguments);
        this._initCounterAnimation();
        this._initParallaxEffect();
        this._initCardHoverEffects();
    },

    /**
     * Initialize counter animation for statistics
     * @private
     */
    _initCounterAnimation() {
        const counterElements = this.el.querySelectorAll('[data-counter]');

        if (counterElements.length === 0) {
            return;
        }

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this._animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach((el) => {
            counterObserver.observe(el);
        });
    },

    /**
     * Animate counter from 0 to target value
     * @private
     * @param {HTMLElement} el - Counter element
     */
    _animateCounter(el) {
        const targetValue = parseInt(el.dataset.counter, 10);
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * targetValue);

            el.textContent = this._formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = this._formatNumber(targetValue);
            }
        };

        requestAnimationFrame(updateCounter);
    },

    /**
     * Format number with commas for thousands
     * @private
     * @param {Number} num - Number to format
     * @returns {String}
     */
    _formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * Initialize parallax scrolling effect
     * @private
     */
    _initParallaxEffect() {
        let rafId = null;

        const handleScroll = () => {
            if (rafId) {
                return;
            }

            rafId = requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                const heroHeight = this.el.offsetHeight;

                if (scrollPosition < heroHeight) {
                    const translateValue = scrollPosition * 0.5;
                    const bgElements = this.el.querySelectorAll('.o_we_bg_filter');

                    bgElements.forEach((bgEl) => {
                        bgEl.style.transform = `translateY(${translateValue}px)`;
                    });
                }

                rafId = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Cleanup on destroy
        this._scrollHandler = handleScroll;
    },

    /**
     * Add interactive hover effects to gallery cards
     * @private
     */
    _initCardHoverEffects() {
        const cards = this.el.querySelectorAll('.s_travelog_hero_card');

        cards.forEach((card) => {
            card.addEventListener('mouseenter', (ev) => {
                this._onCardMouseEnter(ev);
            });

            card.addEventListener('mouseleave', (ev) => {
                this._onCardMouseLeave(ev);
            });

            card.addEventListener('mousemove', (ev) => {
                this._onCardMouseMove(ev);
            });
        });
    },

    /**
     * Handle card mouse enter event
     * @private
     * @param {Event} ev
     */
    _onCardMouseEnter(ev) {
        const card = ev.currentTarget;
        card.style.transition = 'transform 0.3s ease';
    },

    /**
     * Handle card mouse leave event
     * @private
     * @param {Event} ev
     */
    _onCardMouseLeave(ev) {
        const card = ev.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    },

    /**
     * Handle card mouse move for 3D tilt effect
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

        const rotateY = xPercent * 10;
        const rotateX = -yPercent * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
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

export default publicWidget.registry.TravelogHero;