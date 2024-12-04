const http = require("http");
const fs = require("fs");

// Create a server to handle requests
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New request received\n`;

  // Append the log to 'log.txt'
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    // Log file written successfully, now handle the request
    switch (req.url) {
      case '/': // Homepage
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Homepage");
        break;

      case '/about': // About page
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About");
        break;

      case '/contacts': // Contacts page
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Contacts");
        break;

      default: // 404 Not Found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404: Page Not Found");
        break;
    }
  });
});

// Make the server listen on port 3000
myServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
