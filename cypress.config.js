const { defineConfig } = require('cypress');
const http = require('http');
const fs = require('fs');
const path = require('path');

let server = null;

function startServer() {
  return new Promise((resolve, reject) => {
    const httpServer = http.createServer((req, res) => {
      let filePath = path.join(__dirname, req.url);
      if (filePath.endsWith('/')) {
        filePath = path.join(filePath, 'index.html');
      }

      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
      };

      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('404 - Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    httpServer.listen(3000, () => {
      console.log('✓ Servidor iniciado en http://localhost:3000');
      resolve(httpServer);
    });

    httpServer.on('error', reject);
  });
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    async setupNodeEvents(on, config) {
      server = await startServer();
      process.on('exit', () => {
        if (server) server.close();
      });
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 2000,
    requestTimeout: 2000
  }
});
