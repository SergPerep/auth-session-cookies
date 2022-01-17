const bcrypt = require("bcryptjs");
const pool = require("../db");

module.exports = async (email, password) => {
    try {
        const dbData = await pool.query(`SELECT password FROM users WHERE email=$1`, [email]);
        const hash = dbData.rows[0].password;
        const isPasswordVerified = await bcrypt.compare(password, hash);
        return isPasswordVerified;
    } catch (error) {
        console.error(error.message);
    }
}