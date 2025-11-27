/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.TravelogNavbar = publicWidget.Widget.extend({
    selector: '.s_travelog_navbar',
    
    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this._onScroll = this._onScroll.bind(this);
        this._setupScrollListener();
        this._checkInitialScroll();
    },

    /**
     * Setup scroll event listener
     */
    _setupScrollListener: function () {
        window.addEventListener('scroll', this._onScroll, { passive: true });
    },

    /**
     * Check scroll position on page load
     */
    _checkInitialScroll: function () {
        this._onScroll();
    },

    /**
     * Handle scroll event
     */
    _onScroll: function () {
        const scrollPosition = window.scrollY;
        const navbar = this.el;
        
        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    },

    /**
     * @override
     */
    destroy: function () {
        window.removeEventListener('scroll', this._onScroll);
        this._super.apply(this, arguments);
    },
});

export default publicWidget.registry.TravelogNavbar;
