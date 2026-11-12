// Assignment 6: Node server for my webpage (no Express)

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = 3000;
const ROOT = __dirname; // this folder

// Which page each URL shows
const ROUTES = {
  "/": "index.html",
  "/index": "index.html",
  "/introduction": "introduction.html",
};

// File types the server can send
const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Runs every time the browser asks for something
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`); // show the request in the terminal

  // Get the path from the URL
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split("?")[0]);
  } catch {
    return sendNotFound(res);
  }

  // Use the route if there is one, otherwise look for the file (like style.css)
  const fileName = ROUTES[urlPath] || urlPath.slice(1);
  const filePath = path.join(ROOT, fileName);

  // Stay inside this folder and only send known file types
  const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
  if (!filePath.startsWith(ROOT + path.sep) || !type) {
    return sendNotFound(res);
  }

  // Read the file and send it
  fs.readFile(filePath, (err, data) => {
    if (err) return sendNotFound(res);
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

// Page not found
function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end('<h1>404</h1><p>Page not found. Go to <a href="/">the home page</a>.</p>');
}

// Start the server on port 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  // Print this computer's IP address
  for (const addresses of Object.values(os.networkInterfaces())) {
    for (const a of addresses) {
      if (a.family === "IPv4" && !a.internal) {
        console.log(`Also at http://${a.address}:${PORT}`);
      }
    }
  }
});
