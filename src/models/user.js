const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength: 30
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error ("Email is Invalid "  + value);
            }
        }
    },
    password : {
        type : String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not Strong " + value);
            }
        }
    },
    age : {
        type : Number,
        min: 18
    },
    photoURL : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png"
    },
    skills : {
        type: [String]
    }
},
{timestamps:true}
)

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel ;