const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendVerificationMail } = require("../services/mailServices");
const {
  findUserByEmailOrUsername,
  createUserOrUpdate,
} = require("../services/authservices");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateTokens = require("../utils/authHandler");
const ErrorHandler = require("../utils/errorHandler");
const { isFieldErrorFree } = require("../utils/isFieldErrorFree");

exports.registerController = async (req, res, next) => {
  //data sanitization against site script XSS and validate
  await isFieldErrorFree(req, res);
  const { username, password, email } = req.body;
  try {
    //Service function to find data from email or username
    const userExist = await findUserByEmailOrUsername(email, username);
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
    const user = await findUserByEmailOrUsername(email, username);
    if (!user) {
      throw new ErrorHandler("Username of Email does not exist", 401);
    }

    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      throw new ErrorHandler("Password does not match", 401);
    }

    const { token, refreshToken } = await generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    console.log(user, correctPassword, token);
    res.status(201).json({
      error: false,
      data: user,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error); //yov middleware ig 4 args irutto, express recognizes it as the error handling middleware
  }
};

//storing the data, only if you want to show it in response
//username email n stuff database jothe exact matchagbeku names, illandre send it like password:hashedPassword
