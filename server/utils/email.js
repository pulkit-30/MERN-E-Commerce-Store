require("dotenv").config();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const TokenModel = require("../models/verificationToken");
const sendEmail = async (
  res,
  type,
  { _id, Email, UserName },
  { subject, text, html }
) => {
  try {
    //deleting all the tokens generated for the user
    await TokenModel.deleteMany({ UserId: _id })
      .then(() => console.log("Deleted All the Previous Tokens"))
      .catch((err) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage: "Something Went Wrong !!! \n Please try Later",
          ServerError: err,
        })
      );
    //generating secure Token
    const token = uuidv4() + _id;
    const NewToken = await new TokenModel({
      UserId: _id,
      Token: token,
      ExpiresAt: Date.now() + 21600000,
    });
    await NewToken.save()
      .then(() => {})
      .catch((err) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage:
            "Cannot send verification Email !!! \n Please try Later",
          ServerError: err,
        })
      );
    //NodeMailer Transporter
    let transporter = nodemailer.createTransport({
      host: process.env.Host,
      service: process.env.Service,
      port: 465,
      secure: true,
      auth: {
        user: process.env.UserEmail, // generated ethereal user
        pass: process.env.UserPassword, // generated ethereal password
      },
    });
    //mailing options
    const mailOptions = {
      from: process.env.Email,
      to: Email,
      subject: subject,
      text: text,
      html: `<center><h1>GuruKool</h1>
      <p>Hii ${UserName}</p>
      <p>To verify your account click on the button below👇</p>
      <a href=http://localhost/verify/${type}/${_id}/${token}><button>Verify</button></a>
      <p>This link is valid only for 6 hours</p>
      </center>`,
    };
    //sending Email
    transporter
      .sendMail(mailOptions)
      .then(() => {
        return res.status(200).json({
          Status: "Success",
          data: {
            User: { _id, Email, UserName },
            Message:
              "Verification Email has been sent to your registered EmailId, \n Please verify the Email and SignIn again",
          },
        });
      })
      .catch((error) =>
        res.status(500).json({
          Status: "Error",
          ErrorMessage:
            "Cannot send verification Email !!! \n Please try Later",
          ServerError: error,
        })
      );
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot send verification Email !!! \n Please try Later",
      ServerError: error,
    });
  }
};
module.exports = sendEmail;
