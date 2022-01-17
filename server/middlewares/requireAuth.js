const pool = require("../db");

module.exports = async (req, res, next) => {

    try {
        const userId = req.session?.userId;
        
        if (!userId) return res.status(403).json("Not authorized");

        const dbData = await pool.query("SELECT id, name, email FROM users WHERE id=$1", [userId]);
        const user = dbData.rows[0];
        
        if (!user) return res.status(403).json("Not authorized");

        req.user = user;

        next();
    } catch (error) {
        consoe.error(error.message);
    }
}