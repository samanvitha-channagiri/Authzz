const {body}=require('express-validator')

exports.validateRegistrationRules = [
  body("username")
    .trim()
    .isLength({ min: 3})
    .escape()
    .withMessage("User name must be atleast 3 characters long"),
    body('email').isEmail().normalizeEmail().withMessage('Invalid Main Format'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
];
