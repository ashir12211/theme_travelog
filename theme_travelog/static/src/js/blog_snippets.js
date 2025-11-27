/** @odoo-module **/

'use strict';

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Blog Category Filter Widget
 * Handles category filtering for blog posts
 * Following Odoo 19 JS best practices
 */
publicWidget.registry.BlogCategoryFilter = publicWidget.Widget.extend({
    selector: '.s_blog_post_grid',
    events: {
        'click .category-btn': '_onCategoryClick',
        'click .load-more-btn': '_onLoadMore',
    },

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this.currentCategory = 'all';
        this.visiblePosts = 6;
        return this._super.apply(this, arguments);
    },

    /**
     * Handle category button click
     */
    _onCategoryClick: function (ev) {
        ev.preventDefault();
        const $btn = $(ev.currentTarget);
        const category = $btn.data('category');

        // Update active state
        this.$('.category-btn').removeClass('active');
        $btn.addClass('active');

        // Filter posts
        this._filterPosts(category);
        this.currentCategory = category;
    },

    /**
     * Filter blog posts by category
     */
    _filterPosts: function (category) {
        const $posts = this.$('.blog-post-item');

        if (category === 'all') {
            $posts.fadeIn(400);
        } else {
            $posts.each(function () {
                const $post = $(this);
                const postCategory = $post.data('category');

                if (postCategory === category) {
                    $post.fadeIn(400);
                } else {
                    $post.fadeOut(400);
                }
            });
        }
    },

    /**
     * Handle load more button click
     */
    _onLoadMore: function (ev) {
        ev.preventDefault();
        const $btn = $(ev.currentTarget);

        // Add loading state
        $btn.html('<i class="fa fa-spinner fa-spin me-2"></i>Loading...');
        $btn.prop('disabled', true);

        // Simulate loading (in real implementation, this would be an AJAX call)
        setTimeout(() => {
            // Reset button
            $btn.html('<i class="fa fa-refresh me-2"></i>Load More Posts');
            $btn.prop('disabled', false);

            // Show success message
            this._showNotification('More posts loaded successfully!');
        }, 1000);
    },

    /**
     * Show notification message
     */
    _showNotification: function (message) {
        const notification = $(`
            <div class="blog-notification">
                <i class="fa fa-check-circle me-2"></i>${message}
            </div>
        `);

        $('body').append(notification);

        setTimeout(() => {
            notification.addClass('show');
        }, 100);

        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
});

/**
 * Blog Search Widget
 * Handles blog search functionality
 */
publicWidget.registry.BlogSearch = publicWidget.Widget.extend({
    selector: '.s_blog_hero_banner',
    events: {
        'submit .blog-search-form': '_onSearchSubmit',
    },

    /**
     * Handle search form submission
     */
    _onSearchSubmit: function (ev) {
        const $form = $(ev.currentTarget);
        const searchTerm = $form.find('input[name="search"]').val().trim();

        if (!searchTerm) {
            ev.preventDefault();
            this._showSearchError('Please enter a search term');
            return false;
        }

        // Form will submit normally to /blog with search parameter
        return true;
    },

    /**
     * Show search error message
     */
    _showSearchError: function (message) {
        const $input = this.$('.blog-search-form input[name="search"]');
        $input.addClass('is-invalid');

        const errorMsg = $(`<div class="invalid-feedback d-block">${message}</div>`);
        $input.parent().append(errorMsg);

        setTimeout(() => {
            $input.removeClass('is-invalid');
            errorMsg.remove();
        }, 3000);
    },
});

/**
 * Blog Card Hover Effect Widget
 * Adds smooth hover animations to blog cards
 */
publicWidget.registry.BlogCardHover = publicWidget.Widget.extend({
    selector: '.blog-card',

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);
        this._addHoverEffects();
        return this._super.apply(this, arguments);
    },

    /**
     * Add hover effects to blog cards
     */
    _addHoverEffects: function () {
        this.$el.on('mouseenter', () => {
            this.$el.find('.blog-card-image img').css('transform', 'scale(1.1)');
        });

        this.$el.on('mouseleave', () => {
            this.$el.find('.blog-card-image img').css('transform', 'scale(1)');
        });
    },
});

export default {
    BlogCategoryFilter: publicWidget.registry.BlogCategoryFilter,
    BlogSearch: publicWidget.registry.BlogSearch,
    BlogCardHover: publicWidget.registry.BlogCardHover,
};
