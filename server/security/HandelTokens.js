const RefreshTokenModels = require("../models/RefreshTokens");
const HandelRefreshToken = async (type, UserId, Token, res) => {
  try {
    if (type === "Add") {
      //First Remove all the Present Tokens for the User
      await RefreshTokenModels.deleteMany({ UserId: UserId })
        .then(() => console.log("deleted all the Previous Tokens for the User"))
        .catch((error) => {
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: "Cannot handel Token Request!!!",
            ServerError: error,
          });
        });
      //Add new Token for the User
      const NewToken = await new RefreshTokenModels({
        UserId: UserId,
        RefreshToken: Token,
      });
      //saving the token to the Database
      await NewToken.save()
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: "Cannot handel Token Request!!!",
            ServerError: error,
          });
        });
      return;
    } else if (type === "Remove") {
      await RefreshTokenModels.deleteMany({ UserId: UserId })
        .then(() => console.log("deleted all the Tokens for the User"))
        .catch((error) => {
          return res.status(500).json({
            Status: "Error",
            ErrorMessage: "Cannot handel Token Request!!!",
            ServerError: error,
          });
        });
      return;
    }
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot handel Token Request!!!",
      ServerError: error,
    });
  }
};
module.exports = HandelRefreshToken;
