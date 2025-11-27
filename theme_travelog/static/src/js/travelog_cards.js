/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.TravelogCards = publicWidget.Widget.extend({
    selector: ".s_travelog_cards",
    disabledInEditableMode: false,

    /**
     * @override
     */
    start() {
        this._super(...arguments);
        this._initObserver();
        this._initCardInteractions();
        return this._super.apply(this, arguments);
    },

    /**
     * Initialize Intersection Observer for scroll animations
     * @private
     */
    _initObserver() {
        const cards = this.el.querySelectorAll(".travelog_card_wrapper");

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.animationDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add("js_animated");
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach((card) => {
            observer.observe(card);
        });
    },

    /**
     * Initialize card hover and click interactions
     * @private
     */
    _initCardInteractions() {
        const cards = this.el.querySelectorAll(".travelog_card");

        cards.forEach((card) => {
            // Add tilt effect on mouse move
            card.addEventListener("mousemove", (e) => {
                this._handleCardTilt(e, card);
            });

            // Reset tilt on mouse leave
            card.addEventListener("mouseleave", () => {
                this._resetCardTilt(card);
            });

            // Smooth scroll to top when clicking explore link
            const link = card.querySelector(".travelog_card_link");
            if (link) {
                link.addEventListener("click", (e) => {
                    this._handleExploreClick(e);
                });
            }

            // Add ripple effect on card click (but not on buttons/links)
            card.addEventListener("click", (e) => {
                // Don't create ripple if clicking on a link or button
                if (!e.target.closest('a, button')) {
                    this._createRipple(e, card);
                }
            });
        });

        // Animate rating stars on hover
        this._initRatingAnimation();
    },

    /**
     * Handle card tilt effect
     * @private
     * @param {Event} e - Mouse event
     * @param {Element} card - Card element
     */
    _handleCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    },

    /**
     * Reset card tilt effect
     * @private
     * @param {Element} card - Card element
     */
    _resetCardTilt(card) {
        card.style.transform = "";
    },

    /**
     * Handle explore link click
     * @private
     * @param {Event} e - Click event
     */
    _handleExploreClick(e) {
        // Don't prevent default - allow navigation to work

        // Add pulse animation to the clicked link
        const link = e.currentTarget;
        link.style.animation = "pulse 0.3s ease";

        setTimeout(() => {
            link.style.animation = "";
        }, 300);

        // Navigation will happen naturally via href
    },

    /**
     * Create ripple effect on card click
     * @private
     * @param {Event} e - Click event
     * @param {Element} card - Card element
     */
    _createRipple(e, card) {
        const ripple = document.createElement("span");
        const rect = card.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add("js_ripple");

        // Remove any existing ripples
        const existingRipple = card.querySelector(".js_ripple");
        if (existingRipple) {
            existingRipple.remove();
        }

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    },

    /**
     * Initialize rating stars animation
     * @private
     */
    _initRatingAnimation() {
        const ratings = this.el.querySelectorAll(".travelog_card_rating");

        ratings.forEach((rating) => {
            const stars = rating.querySelectorAll("i");

            rating.addEventListener("mouseenter", () => {
                stars.forEach((star, idx) => {
                    setTimeout(() => {
                        star.style.transform = "scale(1.2) rotate(10deg)";
                        star.style.transition = "transform 0.2s ease";
                    }, idx * 50);
                });
            });

            rating.addEventListener("mouseleave", () => {
                stars.forEach((star) => {
                    star.style.transform = "";
                });
            });
        });
    },

    /**
     * @override
     */
    destroy() {
        // Clean up event listeners
        const cards = this.el.querySelectorAll(".travelog_card");
        cards.forEach((card) => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });

        this._super(...arguments);
    },
});

export default publicWidget.registry.TravelogCards;