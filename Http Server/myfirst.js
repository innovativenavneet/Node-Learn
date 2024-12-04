// Import the built-in 'http' module to create an HTTP server
var http = require("http");

const fs = require("fs");
// Create an HTTP server instance
http
  .createServer(function (req, res) {
    // Set the response header with status code 200 (OK) and content type as 'text/html'
    res.writeHead(200, { "Content-Type": "text/html" });
    console.log("request received at 8080")
    // Send the response with the text "Hello World!"
    console.log(req.headers);
    res.end("Hello World!");
  })
  // Make the server listen on port 8080
  .listen(8080,()=>console.log("server at 8080 started"));

// Import a custom module, 'myfirstmodule', which should contain a method 'myDateTime'
var dt = require("./myfirstmodule");

// Create another HTTP server instance (not required since one is already created above)
http
  .createServer(function (req, res) {
    // Set the response header with status code 200 (OK) and content type as 'text/html'
    res.writeHead(200, { "Content-Type": "text/html" });

    // Check if 'myDateTime' exists in 'myfirstmodule' before using it
    if (dt.myDateTime) {
      console.log("request received at 8081")

      // Write the current date and time to the response
      res.write("The date and time are currently: " + dt.myDateTime());
    } else {
      // Handle the case where 'myDateTime' is not defined

      console.log("request received at 8081")

      res.write("The 'myDateTime' function is not defined in the module.");
    }

    // End the response
    res.end();
  })
  // Make the server listen on port 8081 to avoid port conflict with the previous server
  .listen(8081,()=>console.log("server at 8081 started"));



