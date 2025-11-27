import base64

from odoo import models, fields ,api

class TravelPackage(models.Model):
    _name = 'travel.package'
    _description = 'Travel Package'
    _order = 'start_date desc'

    name = fields.Char(string="Package Name", required=True)
    location = fields.Char(string="Location", required=True)
    price = fields.Float(string="Price", required=True)
    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")
    image = fields.Binary(string="Package Image", attachment=True)
    description = fields.Text(string="Description", required=True)
    is_featured = fields.Boolean(string="Show in website")
    package_name = fields.Char(string="Booking package name")
    is_dropdown = fields.Boolean(string="Show in dropdown")

    image_base64 = fields.Char(compute='_compute_image_base64')

    @api.depends('image')
    def _compute_image_base64(self):
        for record in self:
            if record.image:
                record.image_base64 = base64.b64encode(record.image).decode('utf-8')
            else:
                record.image_base64 = False