const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const pool = require("../db");
const checkEmailNamePass = require('../middlewares/checkEmailNamePass');
const verifyToken = require('../middlewares/verifyToken');


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

const genJWToken = (userId) => {
    const payload = { userId };
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1hr" });
}

const checkWhetherUserAlreadyExist = async (email) => {
    try {
        const dbRes = await pool.query(`SELECT name FROM users WHERE email=$1;`, [email]);
        const isUserAlreadyExists = dbRes.rows === 0;
        return isUserAlreadyExists;
    } catch (error) {
        console.error(error.message);
    }
}

router.post("/signup", checkEmailNamePass, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUserAlreadyExists = await checkWhetherUserAlreadyExist(email);
        if (isUserAlreadyExists) {
            return res.status(400).json("User already exists. Try login.");
        }

        const hash = await genHash(password);
        const dbRes = await pool.query(
            `INSERT INTO
                users (name, email, password)
            VALUES
                ($1, $2, $3) RETURNING id;`
            , [name, email, hash]
        );
        const userId = dbRes.rows[0].id;
        const token = genJWToken(userId);
        console.log(token);
        // Feedback to client
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/login", checkEmailNamePass, async (req, res) => {
    try {
        const { email, password } = req.body;
        const dbRes = await pool.query(`SELECT password, id FROM users WHERE email=$1;`, [email]);
        const hash = dbRes.rows[0].password;

        const isUserVerified = await bcrypt.compare(password, hash);
        if (!isUserVerified) {
            return res.status(401).json("Email or password do not match");
        }

        const userId = dbRes.rows[0].id;
        const token = genJWToken(userId);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/token-verification", verifyToken, async (req, res) => {
    try {
        // If verifyToken-middleware lets request through,
        // it means that token is valid
        const isTokenValid = true;
        res.json(isTokenValid);
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;