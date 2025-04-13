const express=require('express')
const {registerController, loginController, getUserByIdController, verifyMailController, forgetPasswordController, resetPassword, resetPasswordController}=require('../controllers/authController')
const {validateRegistrationRules}=require('../middlewares/validationMiddleware');
const { authenticatedRoutes } = require('../middlewares/authMiddleware');
 const router=express.Router();

//To get the Collection of User models
 router.get('/user',authenticatedRoutes,getUserByIdController)
 //Register API
 router.post('/register',validateRegistrationRules,registerController)
  //Register API
 router.post('/login',loginController)
  //Register API
  router.post('/mail-verification',verifyMailController)
  //forget password api
  router.post('/forget-password',forgetPasswordController)
  //reset password
  router.post('/reset-password',authenticatedRoutes,resetPasswordController)
 router.post('/logout',(req,res)=>{})
 module.exports=router