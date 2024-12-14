// here we are reusing rest apis codes to understand MongoDB

const express = require("express");
const { mongo, default: mongoose } = require("mongoose");
const PORT = 8000;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// let's connect mongoDB to server 
mongoose.connect("mongodb://127.0.0.1:27017/navneet-DB")
.then(()=>console.log("Mongo DB is connected "))
.catch(error => console.log("error occured from DB" , error));


// Let's start mongoDB from here :: 
// Step 1: Schema :: 
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    jobTitle: {
        type: String
    }
},
{timestamps: true}
);

// Step 2: MODEL ::
const User = mongoose.model("user",userSchema);

// let's create a post request using MongoDB
app.post("/api/user", async(req,res)=>{
    // we are doing this just to ensure that everything is available or not 
   try{

   
    const body = req.body;
    if(
        !body ||
        !body.firstName || 
        !body.lastName ||
        !body.email || 
        !body.jobTitle    
    ){
        return res.status(400).json({msg:"All fields are compulsary find the missing field "});
    }

const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    jobTitle: body.jobTitle,  
});
console.log(result);

// now we will write status codes of each task
return res.status(201).json({msg: "sucess",data : result})

}
catch(error){
    console.error("Error creating user:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
}
});

// let's get data from mongoDB server
app.get('/api/user', async (req, res) => {
    try {
        // Fetch all users from the database
        const allDbUsers = await User.find({});

        // Generate HTML dynamically using the fetched data
        const html = `
            <ul>
                ${allDbUsers.map(user => `
                    <li>${user.firstName} - ${user.email}</li>
                `).join('')}
            </ul>
        `;

        // Send the generated HTML as a response
        res.send(html);
        res.status(208).json({ msg: "sucess"});
    } catch (error) {
        console.error("Error fetching users:", error);

        // Handle errors and send a server error response
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});


// 3. getting user as a query parameter 
app.get('/api/user/:id', async (req, res) => {
    try {
        // Fetch user by ID
        const user = await User.findById(req.params.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user data
        return res.json(user);
    } catch (error) {
        // Handle errors (e.g., invalid ObjectId format)
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

// now lets do other operatins as well like put, patch and delete
app.route('/api/user/:id')
    .patch(async (req, res) => {
        try {
            // Fetch update data from request body
            const updateData = req.body;

            // Find user by ID and update
            const user = await User.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true } // Return updated user and run validation
            );

            // Check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Return success message and updated user data
            return res.json({
                status: "success",
                updatedUser: user
            });

        } catch (error) {
            // Handle errors (e.g., invalid ObjectId format)
            console.error("Error updating user:", error);
            return res.status(500).json({ 
                error: "Internal Server Error", 
                message: error.message 
            });
        }
    })
    .delete(async (req, res) => { // Corrected parameter order
        try {
            // Find and delete the user by ID
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            // Check if user exists
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }

            // Return success message
            return res.json({ status: "success", message: "User is deleted", deletedUser });
        } catch (error) {
            // Handle errors
            console.error("Error deleting user:", error);
            return res.status(500).json({ 
                error: "Internal Server Error", 
                message: error.message 
            });
        }
    });

app.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));
