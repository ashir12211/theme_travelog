/** @odoo-module **/

'use strict';

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Book Now Banner Widget
 * Simple hover effects for customer avatars
 * Following Odoo JS best practices
 */
publicWidget.registry.BookNowBanner = publicWidget.Widget.extend({
    selector: '.s_book_now_banner',

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);

        // Add smooth entrance animation
        this._addEntranceAnimation();

        return this._super.apply(this, arguments);
    },

    /**
     * Add entrance animation to banner content
     */
    _addEntranceAnimation: function () {
        const badge = this.el.querySelector('.s_book_now_banner_badge');
        const title = this.el.querySelector('.s_book_now_banner_title');
        const reviews = this.el.querySelector('.s_book_now_banner_reviews');

        if (badge) {
            setTimeout(() => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateY(20px)';
                badge.style.transition = 'all 0.6s ease';

                requestAnimationFrame(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateY(0)';
                });
            }, 100);
        }

        if (title) {
            setTimeout(() => {
                title.style.opacity = '0';
                title.style.transform = 'translateY(30px)';
                title.style.transition = 'all 0.8s ease';

                requestAnimationFrame(() => {
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                });
            }, 300);
        }

        if (reviews) {
            setTimeout(() => {
                reviews.style.opacity = '0';
                reviews.style.transform = 'translateY(20px)';
                reviews.style.transition = 'all 0.6s ease';

                requestAnimationFrame(() => {
                    reviews.style.opacity = '1';
                    reviews.style.transform = 'translateY(0)';
                });
            }, 600);
        }
    },
});

export default publicWidget.registry.BookNowBanner;
