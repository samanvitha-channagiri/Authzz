const express = require("express");
const {
  registerController,
  loginController,
  getUserByIdController,
  verifyMailController,
  forgetPasswordController,
  resetPasswordController,
  getAllUser,
  logoutController
} = require("../controllers/authController");
const {
  validateRegistrationRules,
} = require("../middlewares/validationMiddleware");
const { authenticatedRoutes,authorize } = require("../middlewares/authMiddleware");
const loginLimiter = require("../middlewares/loginLimiter");
const router = express.Router();
//To get the Collection of User models
router.get(
  "/users",
  authenticatedRoutes,
  authorize("admin"),
  getAllUser
);
//To get the user profile
router.get("/user", authenticatedRoutes, getUserByIdController);
//Register API
router.post("/register", validateRegistrationRules, registerController);
//Register API
router.post("/login",loginLimiter, loginController);
//Register API
router.post("/mail-verification", verifyMailController);
//forget password api
router.post("/forget-password", forgetPasswordController);
//reset password
router.post("/reset-password", authenticatedRoutes, resetPasswordController);
router.post("/logout", authenticatedRoutes,logoutController);
module.exports = router;
