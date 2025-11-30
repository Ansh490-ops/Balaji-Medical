#!/usr/bin/env python3
import http.server
import socketserver
import mimetypes
import os

# Ensure correct MIME types
mimetypes.add_type('text/plain', '.txt')
mimetypes.add_type('application/xml', '.xml')
mimetypes.add_type('text/html', '.html')
mimetypes.add_type('text/css', '.css')

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache control headers to prevent caching
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path):
        # Ensure robots.txt is served as text/plain
        if path.endswith('robots.txt'):
            return 'text/plain', None
        # Ensure sitemap.xml is served as application/xml
        if path.endswith('sitemap.xml'):
            return 'application/xml', None
        return super().guess_type(path)

PORT = 5000
Handler = CustomHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Server running at http://0.0.0.0:{PORT}/")
    httpd.serve_forever()
