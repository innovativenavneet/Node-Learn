// this whole code serves a purpose is it is subnsidiry 
// function as compared to node URL functions 

const express = require("express"); // we are importing express here as a library 


const app = express(); //storing the module here 

app.get("/",(req,res)=>{ // here we are saying at root route what will happen 
    return res.send("Hello from the homepage"); //for root respond it as hello from homepage

})

app.get("/about",(req,res)=>{
    return res.send("i am about section"); //this is sending response to server
})


//Server is listening at 8000 and giving response 
app.listen(8000,()=>console.log("hey server is started"));

//we don't need HTTP method to keep listenign to the server 





