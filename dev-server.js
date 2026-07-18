import http from 'http';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const DIST = 'dist';
const PORT = 8080;

let clients = [];

let building = false;
let pending = false;

function rebuild() {
  if (building) {
    pending = true;
    return;
  }
  building = true;

  exec('node build.js', (err, stdout, stderr) => {
    building = false;
    if (err) {
      console.error(stderr);
    } else {
      console.log('Rebuilt.');
      clients.forEach(res => res.write('data: reload\n\n'));
    }
    if (pending) {
      pending = false;
      rebuild();
    }
  });
}

let debounceTimer;
function scheduleRebuild() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(rebuild, 100);
}

const server = http.createServer((req, res) => {
  if (req.url === '/__livereload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    clients.push(res);
    req.on('close', () => { clients = clients.filter(c => c !== res); });
    return;
  }

  let filePath = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (req.url === '/') filePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath);
    const types = {
      '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
      '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg',
      '.ttf': 'font/ttf', '.json': 'application/json'
    };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });

    if (ext === '.html') {
      const inject = `<script>
        new EventSource('/__livereload').onmessage = () => location.reload();
      </script></body>`;
      res.end(content.toString().replace('</body>', inject));
    } else {
      res.end(content);
    }
  });
});

server.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));

['src', 'css', 'data', 'assets'].forEach(dir => {
  fs.watch(dir, { recursive: true }, () => scheduleRebuild());
});

rebuild();
