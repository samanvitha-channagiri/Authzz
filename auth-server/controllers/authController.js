const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendVerificationMail, sendForgetPasswordLink } = require("../services/mailServices");
const { findUser, createUserOrUpdate } = require("../services/authservices");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const {
  generateTokens,
  generateDecodedToken,
} = require("../utils/authHandler");
const ErrorHandler = require("../utils/errorHandler");
const { isFieldErrorFree } = require("../utils/isFieldErrorFree");

exports.getUserByIdController = async (req, res, next) => {
  //extracting the id
  const userId = req.user.id;
  try {
    const user = await findUser({ id: userId }, [
      "-password",
      "-refreshToken",
      "-otp",
      "-__v",
    ]);
    //if user does not exist
    if (!user) {
      throw new ErrorHandler("User with this id not found");
    }
    res.status(200).json({
      message: "User fetched success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerController = async (req, res, next) => {
  //data sanitization against site script XSS and validate
  await isFieldErrorFree(req, res);
  const { username, password, email } = req.body;
  try {
    //Service function to find data from email or username
    const userExist = await findUser({ email, username });
    if (userExist) {
      throw new ErrorHandler("User With Email of Username already exist", 400);
    }
    //hash the password
    const hashedPassword = await hashPassword(password);
    //storing the data to db
    const savedData = await createUserOrUpdate({
      username,
      email,
      password: hashedPassword,
    });
    //sending Mail
    const verificationOTP = await sendVerificationMail(savedData);
    //Updating the otp in the existing user
    const updatedData = await createUserOrUpdate(
      {
        otp: verificationOTP,
      },
      savedData
    );
    res.status(201).json({
      error: false,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    //Service function to find data from email or username
    const user = await findUser({ email, username });
    if (!user) {
      throw new ErrorHandler("Username of Email does not exist", 401);
    }

    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      throw new ErrorHandler("Password does not match", 401);
    }

    const { token, refreshToken } = await generateTokens(user, "LOGIN_SECRET");

    //updating refresh token in existing user model
    const updatedData = await createUserOrUpdate(
      {
        refreshToken: refreshToken,
      },
      user
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      error: false,
      data: updatedData,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error); //yav middleware ig 4 args irutto, express recognizes it as the error handling middleware
  }
};
//storing the data, only if you want to show it in response
//username email n stuff database jothe exact matchagbeku names, illandre send it like password:hashedPassword

exports.refreshTokenController = async (req, res, next) => {
  const refreshToken = req.cookie.refreshToken || req.body.refreshToken;
  //if there is no refresh token
  if (!refreshToken) {
    throw new ErrorHandler("Refresh token not found", 401);
  }

  try {
    //In order to verify the incoming refresh token -->required stuff are--> token and secret key
    const { error, decoded } = await generateDecodedToken(
      refreshToken,
      "LOGIN_SECRET"
    );

    if (Boolean(error)) {
      throw new ErrorHandler("Invalid token", 401);
    }

    //find the user associated with the refresh token
    const user = await User.findById(decoded.data?.id);

    //if the user is not found, deny the access
    if (!user) {
      throw new ErrorHandler("User not found", 404);
    }
    //if the stored refresh token does not match the incoming
    //deny the access
    if (user?.refreshToken !== refreshToken) {
      throw new ErrorHandler("Refresh token is not valid", 401);
    }

    const { token: accessToken } = await generateTokens(user, "LOGIN_SECRET");

    //set options
    let cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    //clear existing cookie
    res.clearCookie("accessToken", cookieOptions);

    //set the new tokens in cookies

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ accessToken, message: "Access Token Generated" });

    console.log(error, decoded);
  } catch (error) {
    next(error);
  }
};

exports.verifyMailController = async (req, res, next) => {
  // await isFieldErrorFree(req, res);

  const { otp, userId } = req.body;
  try {
    const user = await findUser({ id: userId });
    if (!user) {
      throw new ErrorHandler("User with this id not found");
    }
    if (user.otp !== otp) {
      throw new ErrorHandler("OTP does not match");
    }
    //updating that the  email is verified
    let response = await createUserOrUpdate({ email_verified: true }, user);
    res
      .status(200)
      .json({ response, message: "OTP Verified" });
  } catch (error) {
    next(error);
  }
};
exports.forgetPasswordController = async (req, res, next) => {
  //recieve the email
  const { email } = req.body;
  try {
    //Service function to find data from email or username
    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler("Username of Email does not exist", 401);
    }

    const token = await sendForgetPasswordLink(user);
   
    res.status(201).json({
      error: false,
  message:"link has been sent",
  token
    
    });
  } catch (error) {
    next(error); //yav middleware ig 4 args irutto, express recognizes it as the error handling middleware
  }
  
};
exports.resetPasswordController = async (req, res, next) => {
    //extracting the id
    const userId = req.user.id;
    const {password}=req.body;
    try {
      const user = await findUser({ id: userId }, [
        "-password",
        "-refreshToken",
        "-otp",
        "-__v",
      ]);
      //if user does not exist
      if (!user) {
        throw new ErrorHandler("User with this id not found");
      }

      const hashedPassword = await hashPassword(password);
    
    const updatedData = await createUserOrUpdate(
      {
        password:hashedPassword,
      },
      user
    );

      res.status(200).json({
        message: "Password updated successfully",
        data: updatedData,
      });
    } catch (error) {
      next(error);
    }

};

exports.logoutController=async(req,res,next)=>{
   console.log(req);
   
  const {userId}=req.user.id;
  try{
    const user=await findUser({id:userId});
    if(!user){
      throw new ErrorHandler('User with id not found!');
    }
    //clearing the cookie
    res.clearCookie('accessToken',
      {
        httpOnly:true,
        secure:false,
        sameSite:'Lax'
      }
    )
    res.clearCookie('refreshToken',
      {
        httpOnly:true,
        secure:false,
        sameSite:'Lax'
      }
    )
    res.status(200).json({
      error:false,
      message:'Log out successful'
    })
  }catch(error){

  }

}