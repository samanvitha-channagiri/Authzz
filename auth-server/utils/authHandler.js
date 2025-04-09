const jwt=require('jsonwebtoken')
const generateTokens=async(user)=>{
      //Get the token
      let token=jwt.sign({data:{email:user?.email,id:user?.id}},'LOGIN_SECRET',{expiresIn:60*60})

      let refreshToken=jwt.sign({data:{email:user?.email,id:user?.id}},'LOGIN_SECRET',{expiresIn:'7d'})

      return {token,refreshToken}
}

module.exports=generateTokens