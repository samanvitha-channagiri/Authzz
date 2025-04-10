const { body } = require("express-validator");

exports.validateRegistrationRules = [
  body("username")
    .trim() // Removes whitespace from the beginning and end
    .isLength({ min: 3 })
    .escape() // Converts HTML characters to their escape sequences (e.g., converts <div> to &lt;div&gt;)
    .withMessage("User name must be atleast 3 characters long"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid Main Format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];


// normalizeEmail()--> Converts the email to a standard format (lowercase, etc.)