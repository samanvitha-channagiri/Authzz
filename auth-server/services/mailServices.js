const {transporter}=require("../utils/mailHandler")
const {generateOTP}=require('../utils/generateOtp')

async function sendVerificationMail(user){
    //use await because, once you get the otp then only you'll send that
    let verificationOTP=await generateOTP() 
//send verification mail
const verificationLink=`http://localhost:5173/verify-otp?userid=${user._id}`

const mailOptions={
  from:process.env.EMAIL_USER,
  to:user?.email,
  subject:`Welcome to Code with Dipesh`,
  
  html:`<p>Welcome to code with sam,your account has been created with email:${user?.email}</p><b>Please verify email using the otp ${verificationOTP} by clicking </b> <a href="${verificationLink}">verify</a>`
}
await transporter.sendMail(mailOptions)
return verificationOTP
}
module.exports={
    sendVerificationMail
}