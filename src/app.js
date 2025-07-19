const express = require("express");
const app = express();
const connectDB = require("./Schemas/database")
const UserModel = require("./models/user");

//Middleware for converting JSON TO JS Object
app.use(express.json());

// Post API
app.post("/signup", async (req, res) => {
    const user = new UserModel(req.body)
    await user.save();
    res.send("User Added Successfully !!!!")
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
