const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pool = require('./db');
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", require('./routes/auth'));


app.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        // Feedback to client
        console.error(error.message);
    }
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});