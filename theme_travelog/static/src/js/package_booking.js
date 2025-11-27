/** @odoo-module **/

import { Component } from "@odoo/owl";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('package_booking_form');

    if (!form) return;

    // Form validation
    const inputs = form.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });

        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        // Add loading state
        const submitBtn = form.querySelector('.btn_submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="btn_text">Processing...</span>
                <span class="spinner"></span>
            `;
        }

        form.classList.add('loading');
    });

    // Date validation - prevent past dates
    const startDateInput = document.getElementById('start_date');
    if (startDateInput) {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.setAttribute('min', today);
    }

    // Phone number formatting (basic)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            e.target.value = value;
        });
    }

    // Budget formatting
    const budgetInput = document.getElementById('budget');
    if (budgetInput) {
        budgetInput.addEventListener('blur', function(e) {
            if (e.target.value) {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) {
                    e.target.value = value.toFixed(2);
                }
            }
        });
    }

    // Guest number validation
    const guestsInput = document.getElementById('guests');
    if (guestsInput) {
        guestsInput.addEventListener('input', function(e) {
            if (e.target.value < 1) {
                e.target.value = 1;
            }
            if (e.target.value > 50) {
                e.target.value = 50;
            }
        });
    }

    // Add smooth scroll to error message if exists
    const errorMsg = document.querySelector('.form_error');
    if (errorMsg) {
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Character counter for special requirements
    const specialReqTextarea = document.getElementById('special_requirements');
    if (specialReqTextarea) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'char_counter';
        counter.textContent = `0 / ${maxLength} characters`;
        specialReqTextarea.setAttribute('maxlength', maxLength);
        specialReqTextarea.parentNode.appendChild(counter);

        specialReqTextarea.addEventListener('input', function(e) {
            const length = e.target.value.length;
            counter.textContent = `${length} / ${maxLength} characters`;

            if (length > maxLength * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#6b7280';
            }
        });
    }

    // Add animation to form sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const formSections = document.querySelectorAll('.form_section');
    formSections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});