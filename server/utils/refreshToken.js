const jwt = require("jsonwebtoken");
const CreateRefreshToken = (User, res) => {
  //generating a RefreshToken and returning it to the file.
  //this RefreshToken will have UserId and Email and valid till 30s of creating
  try {
    const refreshToken = jwt.sign(
      {
        UserId: User.UserId,
        Email: User.Email,
      },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );
    if (refreshToken) {
      return refreshToken;
    } else {
      return res.status(500).json({
        Status: "Error",
        ErrorMessage: "Cannot Secure The User Data!!! \n please try Later",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot send verification Email !!! \n Please try Later",
      ServerError: error,
    });
  }
};
module.exports = CreateRefreshToken;
