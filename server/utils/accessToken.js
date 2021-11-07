const jwt = require("jsonwebtoken");
const CreateAccessToken = (User, res) => {
  //generating a accessToken and returning it to the file.
  //this accessToken will have UserId and Email and valid till 30s of creating
  try {
    const accessToken = jwt.sign(
      {
        UserID: User._id,
        Email: User.Email,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "10m" }
    );
    if (accessToken) {
      return accessToken;
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
module.exports = CreateAccessToken;
