const express=require('express')
const {registerController, loginController}=require('../controllers/authController')
 const router=express.Router();

//To get the Collection of User models
 router.get('/users',(req,res)=>{

 })
 //Register API
 router.post('/register',registerController)
  //Register API
 router.post('/login',loginController)
 module.exports=router