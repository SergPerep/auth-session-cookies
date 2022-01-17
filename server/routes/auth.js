// Modules
const router = require('express').Router();
require('dotenv').config();
const pool = require("../db");

// Utils
const validateEmail = require("../utils/validateEmail");
const validatePassword = require("../utils/validatePassword");
const checkWhetherUserAlreadyExists = require("../utils/checkWhetherUserAlreadyExists");
const verifyPassword = require("../utils/verifyPassword");
const genHash = require("../utils/genHash");

// Routes
router.get("/check-auth", (req, res) => {
    const userId = req.session.userId;
    if (!userId) return res.json({ auth: false });
    res.json({ auth: true })
})

router.post("/login", async (req, res) => {
    try {
        console.log("-- login --")
        if (req.session?.userId) return res.json("You are already authenticated");

        const { email, password } = req.body;

        if (!email && !password) return res.status(400).json("Missing credentials");

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) return res.status(400).json("Invalid email");

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) return res.status(400).json("Invalid password");

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(email);
        if (!isUserAlreadyExists) return res.status(400).json("User doesn't exist. Try to sign up")

        const isPasswordVerified = await verifyPassword(email, password);
        if (!isPasswordVerified) return res.status(400).json("Email and/or password do not match");

        // Remove password-value from request
        req.body.password = undefined;

        const dbData = await pool.query(`SELECT id FROM users WHERE email=$1`, [email]);
        const userId = dbData.rows[0].id;

        if (!userId) return res.status(401);
        req.session.userId = userId;
        res.status(201).json("You are succesfully loged in");

    } catch (error) {
        console.error(error.message);
    }
})

router.post("/register", async (req, res) => {
    try {

        if (req.session?.userId) return res.json("You are already authenticated");

        const { name, email, password } = req.body;
        if (![email, name, password].every(Boolean)) return res.status(400).json("Missing credentials");

        if (!email) return res.status(400).json("Missing credentials");

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) res.status(400).json("Invalid email");

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(email);
        if (isUserAlreadyExists) return res.status(400).json("User already exists. Try to log in");

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) return res.status(400).json("Invalid password");

        const hash = await genHash(password);

        req.body.password = hash;

        const dbData = await pool.query(`
            INSERT INTO
                users (name, email, password)
            VALUES ($1, $2, $3) RETURNING id`, [name, email, hash]);
        const userId = dbData.rows[0].id;
        req.session.userId = userId;
        res.json("You are succesfully signed up");

    } catch (error) {
        console.error(error.message);
    }
})

router.get("/logout", (req, res) => {

    if (!req.session?.userId) return res.json("You are not authenticated");

    req.session.destroy(err => { if (err) throw err })

    res.clearCookie('connect.sid');

    res.json({ auth: false });

})

module.exports = router;