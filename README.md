# Travelog - Website Theme for Odoo 19

Copyright and License
---------------------
* Copyright XAPP.

A sophisticated and fully responsive website theme designed for travel agencies, tour operators, and adventure booking platforms.


## 🌟 Features

### Design Components
- **Dynamic Hero Banner** - Immersive hero section with booking capabilities
- **Featured Destinations** - Highlight top travel spots with dedicated management
- **Package Banners** - Showcase special offers and seasonal packages
- **Insights & Blog** - Beautiful blog layouts for travel stories
- **Services Grid** - Clean display of agency services
- **Marquee Text** - Dynamic scrolling text for announcements
- **Contact Section** - Integrated inquiry forms

### Technical Features
- ✅ Fully Responsive Design (Mobile, Tablet, Desktop)
- ✅ Drag & Drop Website Builder Compatible
- ✅ Custom Booking Logic
- ✅ Fast Loading Performance
- ✅ Clean & Maintainable Code
- ✅ Cross-browser Compatible

## 📋 Requirements

- Odoo 19.0+
- Website Module (built-in)
- Travelog Packages Module (included)

## 🚀 Installation

### Method 1: Through Odoo Apps (Recommended)
1. Go to **Apps** in your Odoo instance
2. Click **Update Apps List**
3. Search for "Travelog Theme"
4. Click **Install**

### Method 2: Manual Installation
1. Download the module
2. Extract to your Odoo addons directory:
   ```bash
   /path/to/odoo/addons/theme_travelog/
   ```
3. Update the apps list:
   ```bash
   ./odoo-bin -u all -d your_database
   ```
4. Install from Apps menu

## 🎨 Usage

### Getting Started
1. After installation, go to **Website** menu
2. Click **Edit** to enter Website Builder mode
3. Click on **Blocks** (+ icon) in the left sidebar
4. Drag and drop desired sections to your page

### Understand
- Make Sure CRM Module is Activate (for Booking)
- When Update Package from Backend, Make Sure Refresh and Re-Drag Snippet

### Available Snippet Collections

#### Home Snippets
- Hero Section
- Featured Destinations
- Package Booking Form
- Insights Banner
- Marquee Text
- Package Banners

#### About Snippets
- About Hero
- Our Story
- Team Members
- Stats & Achievements

#### Services Snippets
- Services Grid
- Service Details
- 
#### Extra Add More Snippets
### Customization
All sections are fully customizable through the Odoo Website Builder:
- Edit text directly by clicking on it
- Change images by clicking on them
- Modify colors through the theme customizer
- Adjust layouts using drag & drop

## 📁 Module Structure

```
theme_travelog/
├── __init__.py
├── __manifest__.py
├── README.md
├── static/
│   ├── description/          # App Store assets
│   └── src/
│       ├── scss/             # Stylesheets
│       ├── js/               # JavaScript files
│       └── img/              # Theme images
└── views/                    # XML templates
```

## 🎯 Perfect For

- Travel Agencies
- Tour Operators
- Adventure Booking Sites
- Destination Management Companies
- Tourism Boards

## 🛠️ Technical Details

### CSS Architecture
- Modular SCSS files for each component
- Responsive design with mobile-first approach
- Clean and maintainable code structure

### JavaScript Implementation
- Vanilla JavaScript & Odoo Widget System
- Event delegation for better performance
- Smooth animations and interactions

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Changelog

### Version 19.0.1.0 (Current)
- Initial release for Odoo 19
- Integrated Package Booking System
- Featured Destinations Management
- Modern Responsive Design

## 🐛 Known Issues

No known issues at this time.

## 📞 Support

For questions, issues, or feature requests:

- **Email**: teamxapp.dev@gmail.com
- **Website**: -----
- **Documentation**: Included in module

## 👨‍💻 Credits

Developed by **XAPP**

## 📄 License

This module is licensed under the LGPL-3.

## ⚠️ Disclaimer

This theme is provided "as is" without warranty of any kind. Always test in a development environment before deploying to production.

---

**Enjoy building beautiful travel websites with Travelog! 🚀**
