const express = require("express");

const app = express();

app.use("/home", (req,res) => {
    res.send("Home listening");
})

app.use("/test", (req,res) => {
    res.send("Test Listening");
})

app.use("/",(req,res) => {
    res.send("Default page Listening");
})

app.listen(7777, () => {
    console.log("Server listening");
})