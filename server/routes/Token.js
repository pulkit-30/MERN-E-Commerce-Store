const HandelToken = require("../security/HandelTokens");
const RefreshToken = require("../utils/refreshToken");
const AccessToken = require("../utils/accessToken");
const RefreshTokenModel = require("../models/RefreshTokens");
const route = require("express").Router();
route.post("/newToken", async (req, res) => {
  try {
    RefreshTokenModel.findOne(
      { RefreshToken: req.body.RefreshToken },
      async (error, TokenData) => {
        if (error) {
          return res.status(403).json({
            Status: "Error",
            ErrorMessage: "Not Authenticated",
            ServerError: error,
          });
        } else if (TokenData) {
          await HandelToken(
            "Remove",
            req.body.UserId,
            req.body.RefreshToken,
            res
          )
            .then(() => {
              //Create AccessToken
              const UserAccessToken = AccessToken(
                { UserId: req.body.UserId, Email: req.body.Email },
                res
              );
              //create Refresh Token
              const UserRefreshToken = RefreshToken(
                { UserId: req.body.UserId, Email: req.body.Email },
                res
              );
              HandelToken("Add", req.body.UserId, UserRefreshToken, res);
              return res.status(200).json({
                Status: "Success",
                data: {
                  RefreshToken: UserRefreshToken,
                  AccessToken: UserAccessToken,
                },
              });
            })
            .catch((error) => {
              return res.status(401).json({
                Status: "Error",
                ErrorMessage: "Cannot Secure the tokens",
                ServerError: error,
              });
            });
        } else {
          res.status(400).json({
            Status: "Error",
            ErrorMessage: "Not Authenticated",
          });
        }
      }
    );
  } catch (error) {
    return res.status(401).json({
      Status: "Error",
      ErrorMessage: "Cannot Exchange Token",
      ServerError: error,
    });
  }
});

module.exports = route;
