const { generateDecodedToken } = require("../utils/authHandler");
const ErrorHandler = require("../utils/errorHandler");
exports.authenticatedRoutes = async (req, res, next) => {
  
  try {
    console.log(req.path,'req.path',req.path.startsWith('/reset-password'));
    
    let secretKey;
    let token;
  if(req.path.startsWith('/reset-password')){
    secretKey=process.env.RESET_SECRET;
    token=req.header("Authorization")?.replace("Bearer ", "");
  }else {
    secretKey= process.env.LOGIN_SECRET;
      token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
  }
    //extracting the token
      //if the token is not there
      if(!token){
        throw new ErrorHandler('Token Not Found',401)
  }
  //Determine which API  is being served
  
  const {err,decoded}=await generateDecodedToken( token,secretKey)
  if(err){
    throw new ErrorHandler('Token Invalid or Expired')
  }
  req.user=decoded.data;
  next();
  } catch (error) {
    next(error)
  }
};

exports.authorize=(...roles)=>{
  return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return res.status(403).json({
        message:"Forbidden: You don't have access"
      })
    }
    next();
  }

}


//why req.user=decoded.data;?Centralizing User Information:
// After this middleware runs, every downstream middleware and route handler will have access to req.user This means you no longer need to decode the token again in your controllers; you can simply use req.user to access details like the user ID or email.