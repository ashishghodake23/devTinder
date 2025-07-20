const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

const adminAuth = (req, res, next) => {
    const token = "xyzz";
    const isAuth = token === "xyz";
    if(!isAuth) {
        res.status(401).send("Not authorized");
    } else {
        next();
    }
}

const userAuth = async(req, res, next) => {
    try{
    const {token} = req.cookies
    if(!token){
        throw new Error("Token is not Valid !!")
    }

    const decodedData = await jwt.verify(token,"DEV@TINDER123")
    const {_id} = decodedData;

    const user = await UserModel.findById(_id);

    req.user = user;
    next();

    } catch(err) {
       res.status(400).send("Token Failed")
    }


}

module.exports = {adminAuth, userAuth}