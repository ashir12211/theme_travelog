/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.TravelogAboutStats = publicWidget.Widget.extend({
    selector: '.s_travelog_about_stats',
    disabledInEditableMode: false,

    start: function () {
        this._super.apply(this, arguments);
        this.hasAnimated = false;
        this._setupIntersectionObserver();
    },

    _setupIntersectionObserver: function () {
        const self = this;
        const options = {
            threshold: 0.3
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !self.hasAnimated) {
                    self.hasAnimated = true;
                    self._animateCounters();
                }
            });
        }, options);

        observer.observe(this.el);
    },

    _animateCounters: function () {
        const counters = this.$('[data-counter]');

        counters.each(function () {
            const $counter = $(this);
            const target = parseInt($counter.attr('data-counter'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = function () {
                current += increment;
                if (current < target) {
                    $counter.text(Math.floor(current));
                    requestAnimationFrame(updateCounter);
                } else {
                    $counter.text(target);
                }
            };

            updateCounter();
        });
    },
});

export default publicWidget.registry.TravelogAboutStats;
