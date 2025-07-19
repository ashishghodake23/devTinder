const adminAuth = (req, res, next) => {
    const token = "xyzz";
    const isAuth = token === "xyz";
    if(!isAuth) {
        res.status(401).send("Not authorized");
    } else {
        next();
    }
}

module.exports = {adminAuth}