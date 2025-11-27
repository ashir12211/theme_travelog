from odoo import http
from odoo.http import request
import logging

_logger = logging.getLogger(__name__)


class PackageBookingController(http.Controller):

    @http.route('/website/package/submit', type='http', auth="public", methods=['POST'], website=True, csrf=False)
    def submit_package_booking(self, **post):
        try:
            _logger.info(f"Processing Booking: {post}")

            # --- FIX STARTS HERE ---
            # 1. Safely find the "Website" source.
            # We use .search() instead of .ref() so it never crashes.
            source = request.env['utm.source'].sudo().search([('name', 'ilike', 'Website')], limit=1)

            # 2. Safely find the "Website" Sales Team (Optional, but recommended)
            team = request.env['crm.team'].sudo().search([('name', 'ilike', 'Website')], limit=1)
            # --- FIX ENDS HERE ---

            # 3. Format the Description - Get actual package name
            package_id_raw = post.get('package_id')
            package_name = 'Custom Inquiry'
            
            if package_id_raw:
                try:
                    if ',' in package_id_raw:
                        model_name, record_id = package_id_raw.split(',')
                        record_id = int(record_id)
                        
                        if model_name == 'travel.package':
                            package = request.env['travel.package'].sudo().browse(record_id)
                            if package.exists():
                                package_name = package.package_name or package.name
                        elif model_name == 'featured.destination':
                            dest = request.env['featured.destination'].sudo().browse(record_id)
                            if dest.exists():
                                package_name = dest.fd_name
                    else:
                        # Fallback for old format (assumes travel.package)
                        package = request.env['travel.package'].sudo().browse(int(package_id_raw))
                        if package.exists():
                            package_name = package.package_name or package.name

                except (ValueError, TypeError):
                    _logger.warning(f"Invalid package_id: {package_id_raw}")
            
            description = (
                f"📦 Package: {package_name}<br/>"
                f"📅 Date: {post.get('travel_date')}<br/>"
                f"👥 Guests: {post.get('guest_count')}<br/>"
                f"✉️ Email: {post.get('email_from')}"
            )

            # 4. Prepare Data
            vals = {
                'name': f"{package_name} - {post.get('contact_name')}",
                'contact_name': post.get('contact_name'),
                'email_from': post.get('email_from'),
                'phone': post.get('phone'),
                'description': description,
                'type': 'opportunity',

                # Use the variables we found safely above
                'source_id': source.id if source else False,
                'team_id': team.id if team else False,
            }

            # 5. Create the Opportunity
            new_lead = request.env['crm.lead'].sudo().create(vals)
            _logger.info(f"SUCCESS: Created Lead ID {new_lead.id}")

            # Redirect back to the form page with success parameter
            return request.redirect('/?booking_success=1#booking-form')

        except Exception as e:
            # This prints the REAL error to your log without crashing the browser entirely
            _logger.error(f"ERROR IN CONTROLLER: {str(e)}")
            return request.redirect('/book-now')