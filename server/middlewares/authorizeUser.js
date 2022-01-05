require("dotenv").config();
const jwt = require("jsonwebtoken");


const authorizeUser = async(req, res, next) => {
    try {
        const token = req.header("token");
        const secret = process.env.JWT_SECRET;
        let payload;
        jwt.verify(token, secret, (err, decoded) => payload = err ? false : decoded);

        // If token does not exists
        if(!token) {
            return res.status(401).json("Not authorized");
        }

        // If token is false
        if (!payload) {
            return res.status(401).json("Not authorized");
        }
        
        const { userId } = payload;
        req.user = userId;
        next();
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = authorizeUser;