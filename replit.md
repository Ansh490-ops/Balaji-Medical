# Balaji Medical - Healthcare Website

## Overview
A multi-page medical service website for "Balaji Medical" in Lucknow. Users can submit service requests (order medicine, book doctor appointments, medical checkups) via WhatsApp. Website features blue color scheme, SEO optimization, and responsive design.

## Project Type
- **Type**: Static Frontend (HTML/CSS/JavaScript)
- **No Backend**: Pure client-side application
- **No Build Process**: Served directly via Python HTTP server
- **Data Collection**: Via WhatsApp (no database)

## Project Structure
```
.
├── index.html        # Home page with service request form
├── services.html     # Services page with hero for medicine photos
├── about.html        # About Us page
├── contact.html      # Contact page with inquiry form
├── style.css         # All styling (blue gradient theme)
├── script.js         # Form logic, WhatsApp integration
├── sitemap.xml       # SEO sitemap for search engines
├── robots.txt        # Search engine crawler instructions
└── replit.md         # Project documentation
```

## Features
- Multi-page website: Home, Services, About, Contact
- Medical service request form (WhatsApp integration)
- Contact inquiry form (WhatsApp integration)
- Blue gradient color scheme (#1a73e8 to #0d47a1)
- Responsive design for all devices
- Services page hero section for medicine photos

## SEO Implementation (November 29, 2025)
### Meta Tags
- Optimized title tags (50-60 characters) for each page
- Meta descriptions (150-160 characters) with keywords
- Robots meta tags for indexing
- Canonical URLs for all pages

### Social Media (Open Graph & Twitter Cards)
- og:title, og:description, og:url, og:site_name
- og:image placeholder (needs actual image: og-image.png)
- Twitter card meta tags

### Structured Data (Schema.org JSON-LD)
- MedicalBusiness + LocalBusiness schema on all pages
- ItemList schema for services
- ContactPage and AboutPage schemas
- Address, phone, email, opening hours included

### Files
- sitemap.xml: Lists all pages with priorities
- robots.txt: Allows all crawlers, includes sitemap URL

### SEO Keywords Targeted
- "Balaji Medical Lucknow"
- "Order medicine online Lucknow"
- "Doctor appointment Manak Nagar"
- "Medical checkup Lucknow"
- "Medicine home delivery Lucknow"

## Contact Information
- **Business**: Balaji Medical
- **Address**: Narain Puri, Manak Nagar, Lucknow
- **Phone**: +91 8004353261
- **Email**: surajpal.443378@gmail.com
- **WhatsApp**: 8004353261

## Technical Details
- **Server**: Python HTTP server on port 5000
- **Deployment**: Static site deployment configured
- **External Services**: WhatsApp for form submissions

## User Preferences
- Blue color theme
- WhatsApp for data collection (no database)
- Services page hero section blank for uploading medicine photos
- No Vaccination service in listings
- No stats section on About page

## Recent Changes (November 29, 2025)
- Complete SEO optimization for all pages
- Added meta tags, Open Graph, Twitter Cards
- Added Schema.org structured data (MedicalBusiness, LocalBusiness)
- Created sitemap.xml and robots.txt
- Removed Vaccination service from all pages
- Services page hero section made blank for photos

## Running the Application
The application runs automatically via the "Medical Service Form" workflow:
- Command: `python -m http.server 5000`
- Access via the Replit webview preview

## TODO for Complete SEO
- Add og-image.png (1200x630px) for social media sharing
- Submit sitemap to Google Search Console
- Create Google Business Profile
- Add medicine photos to services page hero section
