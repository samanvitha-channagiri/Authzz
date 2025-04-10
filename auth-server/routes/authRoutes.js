const express=require('express')
const {registerController, loginController}=require('../controllers/authController')
const {validateRegistrationRules}=require('../middlewares/validationMiddleware')
 const router=express.Router();

//To get the Collection of User models
 router.get('/users',(req,res)=>{
 })
 //Register API
 router.post('/register',validateRegistrationRules,registerController)
  //Register API
 router.post('/login',loginController)
 module.exports=router