require("dotenv").config();
const route = require("express").Router();
const UserModel = require("../models/User");
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("../utils/accessToken");
const RefreshToken = require("../utils/refreshToken");
const HandelToken = require("../security/HandelTokens");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/email");
//Create a new Account
route.post("/Register", async (req, res) => {
  //exception handling
  try {
    //creating Salt to hash the Password
    const salt = await bcrypt.genSalt(10);
    //hashing password
    const HashedPassword = await bcrypt
      .hash(req.body.Password, salt)
      .catch((err) => {
        return res.status(500).json({
          Status: "Error",
          ErrorMessage:
            "Something Went Wrong!!!! \n cannot secure the credentials",
          ServerError: err,
        });
      });
    let data = req.body;
    //using hashed Password
    data.Password = HashedPassword;
    //add UserName
    data.UserName = req.body.FirstName + " " + req.body.LastName;
    //Create NewUser
    const NewUser = await new UserModel(data);
    // Save the data of newUser in Mongoose collection
    await NewUser.save()
      .then(() => {
        //Object destructing of newUser
        const { Password, ...other } = NewUser._doc;
        //sending the verification email to the user to verify the account
        sendEmail(res, "Email", other, {
          subject: "Verify your Account",
          text: "Please verify your account to SignIn",
        });
      })
      .catch((err) =>
        res.status(401).json({
          Status: "Error",
          ErrorMessage:
            "Something Went Wrong!!!! \n Try with other Credentials",
          ServerError: err,
        })
      );
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
      ServerError: error,
    });
  }
});

//Sign In route
route.post("/SignIn", async (req, res) => {
  try {
    let User;
    //if User want to Sign In with Email
    if (req.body.Email) {
      User = await UserModel.findOne({ Email: req.body.Email }).catch(
        (error) => {
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
            ServerError: error,
          });
        }
      );
    }
    //if User want to Sign In with UserName
    if (req.body.UserName) {
      User = await UserModel.findOne({ UserName: req.body.UserName }).catch(
        (error) => {
          return res.status(400).json({
            Status: "Error",
            ErrorMessage: "No User found , Try with different credentials",
            ServerError: error,
          });
        }
      );
    }
    //if No User found
    if (!User) {
      return res.status(400).json({
        Status: "Error",
        ErrorMessage: "No User found , Try with different Credentials",
      });
    }
    //to check the Password Validation
    const validated = await bcrypt.compare(req.body.Password, User.Password);
    if (!validated) {
      return res.status(401).json({
        Status: "Error",
        ErrorMessage: "Invalid Password",
      });
    }
    //to check the Account isVerified or not
    if (!User.isVerified) {
      return res.status(403).json({
        Status: "Error",
        ErrorMessage:
          "Account is not Verified , Please verified your Account first",
      });
    }
    //Now thw User found,Password is correct and user is verified, then send the data to the client and SignIn
    // filter the data
    const { Password, ...other } = User._doc;
    //Create AccessToken
    const UserAccessToken = AccessToken(other, res);
    //create Refresh Token
    const UserRefreshToken = RefreshToken(other, res);
    //Adding the RefreshToken to the database for Security
    await HandelToken("Add", other._id, UserRefreshToken, res);
    return res.status(200).json({
      Status: "Success",
      Type: "SignIn",
      data: {
        User: other,
        AccessToken: UserAccessToken,
        RefreshToken: UserRefreshToken,
        Message: "User Sign In Successfully",
      },
      Message: "SuccessFully LogIn",
    });
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
      ServerError: error,
    });
  }
});

module.exports = route;
