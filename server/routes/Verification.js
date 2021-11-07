const route = require("express").Router();
const TokenModel = require("../models/verificationToken");
const UserModel = require("../models/User");

route.get("/:type/:UserId/:token", (req, res) => {
  try {
    TokenModel.findOne({ Token: req.params.token }, (error, TokenData) => {
      if (error) {
        return res.status(500).json({
          Status: "Error",
          ErrorMessage:
            "Something Went Wrong!!!! \n Cannot verify Your Account",
          ServerError: error,
        });
      }
      if (TokenData !== null) {
        if (TokenData.UserId == req.params.UserId) {
          if (req.params.type === "Email") {
            UserModel.findByIdAndUpdate(
              TokenData.UserId,
              {
                $set: { isVerified: true },
              },
              {
                new: true,
              }
            )
              .then(() => {
                console.log("Updated User SuccessFully");
              })
              .catch((error) =>
                res.status(500).json({
                  Status: "Error",
                  ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
                  ServerError: error,
                })
              );
          } else if (req.params.type === "Password") {
            console.log("password change request");
          }
          TokenModel.deleteOne({ _id: TokenData._id })
            .then(() => {
              console.log("Token deleted successfully");
            })
            .catch((err) =>
              res.status(500).json({
                Status: "Error",
                ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
                ServerError: err,
              })
            );
          return res.status(200).json("Verified");
        } else {
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
            ServerError: error,
          });
        }
      } else {
        return res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Something Went Wrong!!!! \n Please try Later",
      ServerError: err,
    });
  }
});
module.exports = route;
