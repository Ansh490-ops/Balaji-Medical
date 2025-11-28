# Medical Service Form

## Overview
A simple static web application for medical service requests. Users can submit requests for medicine orders, doctor appointments, or medical checkups. The form collects user information and location, then sends data to Google Sheets and redirects to WhatsApp for confirmation.

## Project Type
- **Type**: Static Frontend (HTML/CSS/JavaScript)
- **No Backend**: Pure client-side application
- **No Build Process**: Served directly via Python HTTP server

## Project Structure
```
.
├── index.html      # Main form page
├── script.js       # Form logic, geolocation, API calls
├── style.css       # Styling
└── README.md       # Project documentation
```

## Features
- Medical service request form with fields: name, email, phone, service type, notes
- Automatic geolocation detection
- Manual address entry fallback
- Google Sheets integration via Apps Script
- WhatsApp redirect with form data
- Form auto-reset after submission

## Technical Details
- **Server**: Python HTTP server on port 5000
- **Deployment**: Static site deployment configured
- **External Services**:
  - Google Apps Script for data storage
  - WhatsApp for user confirmation

## Recent Changes (November 28, 2025)
- Imported from GitHub repository
- Configured for Replit environment
- Set up Python HTTP server workflow on port 5000
- Configured static site deployment
- Added .gitignore for Python environment

## Running the Application
The application runs automatically via the "Medical Service Form" workflow:
- Command: `python -m http.server 5000`
- Access via the Replit webview preview
