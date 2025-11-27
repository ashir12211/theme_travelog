/** @odoo-module **/

'use strict';

import publicWidget from "@web/legacy/js/public/public_widget";

/**
 * Booking Success Modal Widget
 * Shows a beautiful success popup after booking submission
 * Following Odoo 19 JS best practices
 */
publicWidget.registry.BookingSuccessModal = publicWidget.Widget.extend({
    selector: '.s_booking_form',
    events: {
        'submit': '_onFormSubmit',
    },

    /**
     * @override
     */
    start: function () {
        this._super.apply(this, arguments);

        // Check if we should show success modal (from URL parameter)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('booking_success') === '1') {
            this._showSuccessModal();
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        return this._super.apply(this, arguments);
    },

    /**
     * Handle form submission
     */
    _onFormSubmit: function (ev) {
        const form = ev.currentTarget;

        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Submitting...';
        }
    },

    /**
     * Show success modal with animation
     */
    _showSuccessModal: function () {
        // Create modal HTML
        const modalHtml = `
            <div class="modal fade booking-success-modal" id="bookingSuccessModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-body p-0">
                            <div class="text-center p-5">
                                <!-- Success Icon with Animation -->
                                <div class="success-checkmark mb-4">
                                    <div class="check-icon">
                                        <span class="icon-line line-tip"></span>
                                        <span class="icon-line line-long"></span>
                                        <div class="icon-circle"></div>
                                        <div class="icon-fix"></div>
                                    </div>
                                </div>
                                
                                <!-- Heading -->
                                <h2 class="modal-title fw-bold mb-3" style="color: #1e293b; font-size: 2rem;">
                                    Request Successfully Submitted
                                </h2>
                                
                                <!-- Subheading -->
                                <p class="modal-subtitle text-muted mb-4" style="font-size: 1.1rem; line-height: 1.6;">
                                    Thank you. Your booking request is with our operations team.<br/>
                                    Expect a quote within <strong>24 hours</strong>.
                                </p>
                                
                                <!-- Decorative Line -->
                                <div class="d-flex align-items-center justify-content-center gap-2 mb-4">
                                    <div style="width: 60px; height: 2px; background: linear-gradient(90deg, transparent, #667eea);"></div>
                                    <i class="fa fa-plane" style="color: #667eea; font-size: 1.2rem;"></i>
                                    <div style="width: 60px; height: 2px; background: linear-gradient(90deg, #667eea, transparent);"></div>
                                </div>
                                
                                <!-- Action Buttons -->
                                <div class="d-flex gap-3 justify-content-center flex-wrap">
                                    <button type="button" class="btn btn-primary px-4 py-2 rounded-pill" data-bs-dismiss="modal">
                                        <i class="fa fa-home me-2"></i>Back to Home
                                    </button>
                                    <a href="/packages" class="btn btn-outline-primary px-4 py-2 rounded-pill">
                                        <i class="fa fa-compass me-2"></i>Explore More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append modal to body
        const $modal = $(modalHtml);
        $('body').append($modal);

        // Show modal using jQuery (Odoo 19 compatible)
        const modalElement = document.getElementById('bookingSuccessModal');
        $(modalElement).modal('show');

        // Add confetti effect (optional - only if confetti library is available)
        if (typeof window.confetti === 'function') {
            this._triggerConfetti();
        }

        // Clean up modal after it's hidden
        $(modalElement).on('hidden.bs.modal', function () {
            $modal.remove();
        });
    },

    /**
     * Trigger confetti animation
     */
    _triggerConfetti: function () {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Create confetti particles
            if (window.confetti) {
                window.confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                }));
                window.confetti(Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                }));
            }
        }, 250);
    },
});

export default publicWidget.registry.BookingSuccessModal;
