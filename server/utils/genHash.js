const bcrypt = require("bcryptjs");

module.exports = async (password) => {
    try {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error(error.message);
    }
}