/** @odoo-module **/

'use strict';

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Insights Banner Widget
 * Handles card interactions and animations
 * Following Odoo 19 JS best practices
 */
publicWidget.registry.InsightsBanner = publicWidget.Widget.extend({
    selector: '.s_insights_banner',
    events: {
        'click .insight-card': '_onCardClick',
        'mouseenter .insight-card': '_onCardHover',
        'mouseleave .insight-card': '_onCardLeave',
    },

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this._initCards();
        return this._super.apply(this, arguments);
    },

    /**
     * Initialize card animations
     */
    _initCards: function () {
        // Add stagger animation on load
        this.$('.insight-card').each(function (index) {
            $(this).css({
                'animation-delay': (index * 0.2) + 's',
                'opacity': '0'
            });

            setTimeout(() => {
                $(this).css({
                    'opacity': '1',
                    'transition': 'opacity 0.6s ease-out'
                });
            }, index * 200);
        });
    },

    /**
     * Handle card click
     */
    _onCardClick: function (ev) {
        const $card = $(ev.currentTarget);

        // Add click animation
        $card.css('transform', $card.css('transform') + ' scale(0.95)');

        setTimeout(() => {
            $card.css('transform', '');
        }, 200);

        // Optional: Navigate to a specific page or open modal
        // window.location.href = '/blog';
    },

    /**
     * Handle card hover
     */
    _onCardHover: function (ev) {
        const $card = $(ev.currentTarget);
        const $otherCards = this.$('.insight-card').not($card);

        // Dim other cards
        $otherCards.css('opacity', '0.6');
    },

    /**
     * Handle card leave
     */
    _onCardLeave: function (ev) {
        // Restore all cards opacity
        this.$('.insight-card').css('opacity', '1');
    },
});

export default publicWidget.registry.InsightsBanner;
