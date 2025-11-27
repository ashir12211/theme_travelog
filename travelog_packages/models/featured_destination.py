import base64

from odoo import models, fields ,api

class FeaturedDestination(models.Model):
    _name = 'featured.destination'
    _description = 'Featured Destination'

    fd_name = fields.Char(string="Package Name", required=True)
    fd_location = fields.Char(string="Location", required=True)
    fd_price = fields.Float(string="Price/Night", required=True)
    fd_image = fields.Binary(string="Image", attachment=True)
    fd_description = fields.Text(string="Description", required=True)
    fd_is_featured = fields.Boolean(string="Show in Website")
    is_dropdown = fields.Boolean(string="Show in dropdown")

    fd_image_base64 = fields.Char(compute='_compute_image_base64')

    @api.depends('fd_image')
    def _compute_image_base64(self):
        for record in self:
            if record.fd_image:
                record.fd_image_base64 = base64.b64encode(record.fd_image).decode('utf-8')
            else:
                record.fd_image_base64 = False