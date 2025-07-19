const express = require("express");
const app = express();

const connectDB = require("./Schemas/database")

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
    console.log("Server listening");
})
}) .catch((err)=>{
    console.error("Database Connection Failed");
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
