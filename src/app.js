const express = require("express");
const app = express();
const connectDB = require("./Schemas/database")
const UserModel = require("./models/user");
const bcrypt = require('bcrypt');
const cookiesParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth')

//Middleware for converting JSON TO JS Object
app.use(express.json());
app.use(cookiesParser())

// Post API
app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        const passwordHash = await bcrypt.hash(password,10);

        const user = new UserModel({
            firstName, lastName, email, password: passwordHash
        })
        await user.save();
        res.send("User Added Successfully !!!!")
    } catch (err) {
        res.status(404).send(err.message)
    }
})

// POST API
app.post("/login", async (req,res)=> {
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email:email})
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Credentials");
        } else{
            // 1. Create a JWT Token 
           const token = jwt.sign({_id:user._id}, "DEV@TINDER123")

            // 2. Add the token to cookie & send response back
            res.cookie("token", token)

            res.send("Login Successfully !!")
        }

    } catch (error) {
        res.status(404).send("ERROR : " + error.message)
    }
})

// Get API
app.get("/profile", userAuth, async(req, res) => {
    try{
        const user = req.user
        res.send(user);
    }catch {
        throw new Error("lkdfhkdflkd")
    }     
})

// POST API
app.post("/connectionRequest",userAuth, async (req,res)=> {

    try{
        const user = req.user;
        res.send("Connection Request send By : " + user.firstName)
    }catch {
        throw new Error("lkdfhkdflkd")
    } 
})

// Get API
app.get("/feed", async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.send(user);
    } catch (err) {
        res.status(400).send("Data Not Found");
    }

})

//Model.findOne Method
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        const users = await UserModel.findOne({ email: userEmail })
        res.send(users);
    } catch (err) {
        res.status(404).send("User Not Found")
    };

})

// Delete API
app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await UserModel.findByIdAndDelete(userId);
        res.send(" Deleted Successfully");
    } catch (err) {
        res.status(404).send("Errorr", err.message)
    }
})

// Update API
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    try {
        const userUpdate = await UserModel.findByIdAndUpdate({ _id: userId }, data);
        res.send("Updated Name Succesfully");
    } catch (err) {
        res.status(404).send("Cannot Update - Something went wrong")
    }
})

connectDB().then(() => {
    app.listen(7777, () => {
        console.log("Server listening");
        console.log("Database connected successfully");
    })
}).catch((err) => {
    console.error("Database Connection Failed", err);
})









// Router & Router Handler & Middlewares
// const {adminAuth} = require("./middlewares/auth");

// app.use("/auth", adminAuth, (req, res) => {
//       res.send("Authorized Auth User");
// })



// app.get("/user", (req,res) => {
//     console.log(req.query);
//     res.send({firstName:"Ashish", lastName:"Ghodake"})
// })

// app.post("/user", (req,res) => {
//     res.send("Data Saved successfully")
// })

// app.delete("/user", (req,res) => {
//     res.send("Data Deleted successfully");
// })

// // app.use --> will accept all HTTP Methods
// app.use("/home", (req,res) => {
//     res.send("Home listening");
// })

// app.use("/test", (req,res) => {
//     res.send("Test Listening");
// })

// app.use("/",(req,res) => {
//     res.send("Default page Listening");
// })
