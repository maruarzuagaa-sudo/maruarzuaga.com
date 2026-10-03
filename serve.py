"""Local dev server with caching disabled, so every reload shows the latest files.
Usage: python3 serve.py  →  http://localhost:5173
"""
import http.server
import socketserver


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(('', 5173), NoCacheHandler) as httpd:
    print('Serving on http://localhost:5173')
    httpd.serve_forever()
