const emailValidator = require("email-validator");
module.exports = (email) => emailValidator.validate(email);