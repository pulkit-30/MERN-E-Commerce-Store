require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshTokenModels = require("../models/RefreshTokens");
const Verify = (req, res, callback) => {
  RefreshTokenModels.findOne(
    { RefreshToken: req.body.RefreshToken },
    (error, TokenData) => {
      if (error) {
        return res.status(403).json({
          Status: "Error",
          ErrorMessage: "Not Authenticated",
          ServerError: error,
        });
      } else {
        if (TokenData) {
          if (req.params.UserId === TokenData.UserId) {
            jwt.verify(
              req.headers.token,
              process.env.ACCESS_TOKEN_KEY,
              (error, verifiedToken) => {
                if (error) {
                  return res.status(500).json({
                    Status: "Error",
                    ErrorMessage: "Not Authenticated",
                    ServerError: error,
                  });
                } else {
                  req.User = verifiedToken;
                  console.log("User is Authenticated");
                  return callback();
                }
              }
            );
          } else {
            console.log(error);
            return res.status(403).json({
              Status: "Error",
              ErrorMessage: "Not Authenticated",
              ServerError: error,
            });
          }
        } else {
          console.log(error);
          return res.status(403).json({
            Status: "Error",
            ErrorMessage: "Not Authenticated",
            ServerError: error,
          });
        }
      }
    }
  );
};

module.exports = Verify;
