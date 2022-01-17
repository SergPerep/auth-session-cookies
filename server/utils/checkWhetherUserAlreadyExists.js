const pool = require("../db");

module.exports = async (email) => {
    try {
        const dbData = await pool.query(`SELECT name FROM users WHERE email=$1;`, [email]);
        const isUserAlreadyExists = dbData.rows.length !== 0;
        return isUserAlreadyExists;
    } catch (error) {
        console.error(error.message);
    }
}