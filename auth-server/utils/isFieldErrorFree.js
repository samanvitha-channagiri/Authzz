const { validationResult } = require("express-validator");

exports.isFieldErrorFree=async (req,res)=>{
    const errors=await validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }
}//illi return agtide incase error illa andre just sumne authController file alli execution continue agutta?