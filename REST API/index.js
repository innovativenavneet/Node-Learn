const express = require("express");
const userData = require('./MOCK_DATA.json');
const fs = require('fs');

const PORT = 8000;

const app = express();

// Middlewares 
app.use(express.urlencoded({extended: false}));

// Routes ::: 

// parsing and trying to enlist all the user using express:: 

// 1. parsing through CSR (Client Side Rendering) so using JSON 
app.get('/user',(req,res)=>{
    return res.json(userData);
}) // this will return userData on the servert at //localhost:8000/user;


// 2. parsing through SSR (Server Side Rendering) so using HTML
app.get('/api/user',(req,res)=>{
    const html = `
    <ul> ${userData.map((user)=>`<li>
        Name :
    ${user.first_name}</li>
    <li>Email id : ${user.email}</li>`)}</ul> 
    `;
// res.send is a method that we use to send to the server 
    res.send(html);
})
// Note :: 
//    So the conslsion is that we are making a hybrid server in which at route 
//    /api/user we are getting html rendered element which is called SSR 
//    and at /user we are rendering JSON file which is called CSR 


// 3. Passing user as a query parameter 
app.get('/user/:id',(req,res)=>{

    const id= Number(req.params.id); //this will store which id number we are requesting to server 
    const user = userData.find((user)=> user.id === id); //if the user id exists then store that to user
    return res.json(user);

})
// lets query from DB about ip_address
app.get('/user/ip/:ip', (req, res) => {
    const ip_address = req.params.ip; // Get the IP address from the request
    const add = userData.find((user) => user.ip_address === ip_address); // Match IP address

    if (add) {
        return res.json(add); // Send user data if found
    } else {
        return res.status(404).json({ error: "IP address not found" }); // Send an error if not found
    }
});

// now lets do other operatins as well like put, patch and delete

app.route('user/id/:id')
.put((req,res)=>{
    //edit user with id 

    return res.json("respond is pending ");
})
.delete((res,req)=>{
    // delete user with a particular id 

    return res.json("user is deleted");
})

//creating a post request to the server 
app.post('/api/user', (req, res) => {
    const body = req.body; // Extract the request body from the frontend here i am using postman

    // Add a new user to the userData array with a unique ID
    userData.push({ ...body, id: userData.length + 1 });

    // Write the updated userData array back to the MOCK_DATA.json file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData, null, 2), (err) => {
        if (err) {
            // Handle file write errors
            console.error("Error writing to file:", err);
            return res.status(500).json({ status: "error", message: "Failed to update data" });
        }

        // Send a success response with the new user's ID
        return res.json({ status: "success", id: userData.length });
    });

    console.log("Request body received:", body); // Log the received body for debugging
});

app.listen(PORT,()=> console.log("Server is started on PORT 8000"));