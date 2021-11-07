const route = require("express").Router();
const UserModel = require("../models/User");
const sendEmail = require("../utils/email");
const handelToken = require("../security/HandelTokens");
const Verify = require("../middleware/jwtverification");
const jwt = require("jsonwebtoken");
//Delete the User
route.delete("/delete/:UserId", Verify, (req, res) => {
  try {
    if (req.User) {
      handelToken("Remove", req.User.UserID, req.body.RefreshToken, res);
      UserModel.deleteOne({ _id: req.User.UserID }).catch((error) => {
        return res.status(401).json({
          Status: "Error",
          ErrorMessage:
            "Something went wrong !!!! \n cannot Delete the Account , Please try Later ",
          ServerError: error,
        });
      });
      return res.status(200).json({
        Status: "Success",
        data: {
          Message: "Your Account has been deleted Successfully",
        },
      });
    } else {
      return res.status(500).json({
        Status: "Error",
        ErrorMessage:
          "Something went wrong !!!! \n cannot Delete the Account , Please try Later !!!! ",
        ServerError: error,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage:
        "Something went wrong !!!! \n cannot Delete the Account , Please try Later 2 ",
      ServerError: error,
    });
  }
});
//User Essentials
route.post("/ResendVerification", async (req, res) => {
  try {
    const User = await UserModel.findOne({ Email: req.body.Email }).catch(
      (error) => {
        return res.status(500).json({
          Status: "Error",
          ErrorMessage: "No User Found",
          ServerError: error,
        });
      }
    );
    if (User === null) {
      return res.status(400).json({
        Status: "Error",
        ErrorMessage: "No User Found",
      });
    }
    sendEmail(res, "Email", User, {
      subject: "Verify your Account",
      text: "Please verify your account to SignIn",
    });
  } catch (err) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "No User Found",
      ServerError: err,
    });
  }
});

route.post("/ForgetPassword", async (req, res) => {
  try {
    const User = await UserModel.findOne({ Email: req.body.Email }).catch(
      (error) => {
        return res.status(500).json({
          Status: "Error",
          ErrorMessage: "No User Found",
          ServerError: error,
        });
      }
    );
    if (User === null) {
      return res.status(400).json({
        Status: "Error",
        ErrorMessage: "No User Found",
      });
    }
    sendEmail(res, "Password", User, {
      subject: "Verify your Account",
      text: "Please verify your account to SignIn",
    });
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "No User Found",
      ServerError: error,
    });
  }
});

route.post("/LogOut/:UserId", async (req, res) => {
  try {
    await handelToken("Remove", req.body.UserId, req.header.Token, res)
      .then(() => {
        console.log("SuccessFully deleted the Refresh Tokens");
      })
      .catch((error) => {
        return res.status(401).json({
          Status: "Error",
          ErrorMessage: "Cannot Logged Out !!! \n Please try later",
          ServerError: error,
        });
      });
    return res.status(200).json({
      Status: "Success",
      Message: "Successfully Logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot Logged Out !!! \n Please try later",
      ServerError: error,
    });
  }
});

module.exports = route;
