/** @odoo-module **/

'use strict';

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Modern Services Widget
 * Handles service item interactions and animations
 * Following Odoo 19 JS best practices
 */
publicWidget.registry.ModernServices = publicWidget.Widget.extend({
    selector: '.s_modern_services',
    events: {
        'mouseenter .service-item': '_onServiceHover',
        'mouseleave .service-item': '_onServiceLeave',
        'click .service-item': '_onServiceClick',
    },

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this._initServices();
        this._setupScrollAnimation();
        return this._super.apply(this, arguments);
    },

    /**
     * Initialize services with stagger animation
     */
    _initServices: function () {
        const $services = this.$('.service-item');

        $services.each(function (index) {
            const $service = $(this);

            // Add entrance animation delay
            setTimeout(() => {
                $service.css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }, index * 150);
        });
    },

    /**
     * Setup scroll-based animations
     */
    _setupScrollAnimation: function () {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('in-view');
                }
            });
        }, {
            threshold: 0.2
        });

        this.$('.service-item').each(function () {
            observer.observe(this);
        });
    },

    /**
     * Handle service hover
     */
    _onServiceHover: function (ev) {
        const $service = $(ev.currentTarget);
        const $number = $service.find('.service-number');
        const $icon = $service.find('.service-icon');

        // Add pulse effect to number
        $number.css('animation', 'pulse 0.6s ease-in-out');

        // Rotate icon
        $icon.css('transform', 'translateY(-5px) rotate(5deg)');
    },

    /**
     * Handle service leave
     */
    _onServiceLeave: function (ev) {
        const $service = $(ev.currentTarget);
        const $number = $service.find('.service-number');
        const $icon = $service.find('.service-icon');

        // Reset animations
        $number.css('animation', '');
        $icon.css('transform', '');
    },

    /**
     * Handle service click
     */
    _onServiceClick: function (ev) {
        const $service = $(ev.currentTarget);

        // Add click ripple effect
        const $ripple = $('<div class="service-ripple"></div>');
        $service.append($ripple);

        setTimeout(() => {
            $ripple.remove();
        }, 600);

        // Optional: Expand service details or navigate
        // this._expandService($service);
    },

    /**
     * Expand service details (optional)
     */
    _expandService: function ($service) {
        const $description = $service.find('.service-description');

        if ($service.hasClass('expanded')) {
            $description.slideUp(300);
            $service.removeClass('expanded');
        } else {
            // Collapse other services
            this.$('.service-item.expanded .service-description').slideUp(300);
            this.$('.service-item').removeClass('expanded');

            // Expand current service
            $description.slideDown(300);
            $service.addClass('expanded');
        }
    },
});

export default publicWidget.registry.ModernServices;
