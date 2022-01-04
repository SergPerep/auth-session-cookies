const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();


const genHash = async (password) => {
    try {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error(error.message);
    }
}

const genJWToken = (user_id) => {
    const payload = { user_id };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1hr" });
}

router.post("/signup", async (req, res) => {
    try {
        

    } catch (err) {
        console.error(err.message);
    }
});

router.post("/login", async (req, res) => {
    console.log("--login");
    res.json("--login");
    try {

    } catch (err) {
        console.error(err.message);
    }
});



module.exports = router;