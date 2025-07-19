const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    age : {
        type : Number
    }
})

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel ;