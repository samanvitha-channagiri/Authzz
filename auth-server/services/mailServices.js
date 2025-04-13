const {transporter}=require("../utils/mailHandler")
const {generateOTP}=require('../utils/generateOtp')
const {generateTokens}=require('../utils/authHandler')

async function sendVerificationMail(user){
    //use await because, once you get the otp then only you'll send that
    let verificationOTP=await generateOTP() 
//send verification mail
const verificationLink=`http://localhost:5173/verify-otp?userid=${user._id}`

const mailOptions={
  from:process.env.EMAIL_USER,
  to:user?.email,
  subject:`Welcome to code with Sam`,
  
  html:`<p>Welcome to code with sam,your account has been created with email:${user?.email}</p><b>Please verify email using the otp ${verificationOTP} by clicking </b> <a href="${verificationLink}">verify</a>`
}
await transporter.sendMail(mailOptions)
return verificationOTP
}

async function sendForgetPasswordLink(user){
  const { token } = await generateTokens(user,process.env.RESET_SECRET);
//send verification mail
const resetPasswordLink=`http://localhost:5173/reset-password?token=${token}`

const mailOptions={
from:process.env.EMAIL_USER,
to:user?.email,
subject:`Reset Password Link`,

html:`<p>Welcome to code with sam,your account has been created with email:${user?.email}</p><b>Please reset your account password by clicking  this link</b> <a href="${resetPasswordLink}">Reset password link</a>`
}
await transporter.sendMail(mailOptions)
return token
}
module.exports={
    sendVerificationMail,
    sendForgetPasswordLink
}