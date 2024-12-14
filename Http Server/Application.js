const http = require("http");
const fs = require("fs");
// initializin url to pass 
const url = require("url");

// Create a server to handle requests
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.method} ${req.url} New request received\n`;



    // THIS IS HOW WE HANDLE QUERY IN NODE JS 



//   lets start the parsing of the URL 
  const myUrl = url.parse(req.url,true); //ths will let myUrl to save the path name  
  console.log(myUrl);
//   this will return :: 
// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?=0',
//     query: '=0',
//     pathname: '/about/navneet',
//     path: '/about/navneet?=0',
//     href: '/about/navneet?=0'
//   }


  // Append the log to 'log.txt'
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    // Log file written successfully, now handle the request

    // switch (req.url) =< insted of this we will use myUrl.pathname
    switch (myUrl.pathname) {
      case '/': // Homepage
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Homepage");
        break;

      case '/about': // About page

      const username = myUrl.query.myname; //this will store the query name that will pass by the user 
      res.writeHead(200, { "Content-Type": "text/plain" });
  
    //   this will throw this username to interface of the user 
      res.end(`Hi, ${username}`);

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
