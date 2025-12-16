{
    'name': 'Travelog Packages',
    'version': '19.0.1.0',
    'category': 'Travel',
    'author': 'XAPP',
    'summary': 'Manage travel packages for Travelog website',
    'depends': ['base', 'website'],
    'price': 10,
    'currency': 'USD',

    'data': [
        'security/ir.model.access.csv',
        'views/travel_package_views.xml',
        'views/featured_destination.xml',
        'views/menu.xml',
    ],

    'images': [

        'static/description/travelog_cover.png',
        'static/description/travelog_screenshot.png',

    ],

    'installable': True,
    'application': False,
    'sequence': 1,
}
