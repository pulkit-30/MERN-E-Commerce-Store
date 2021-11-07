const route = require("express").Router();
const UserModel = require("../models/User");
route.post("/Email", (req, res) => {
  UserModel.find({ Email: req.body.Email }, (error, User) => {
    if (error) {
      return res.status(400).json({
        Status: "Error",
        ErrorMessage: "Something Went Wrong !!!",
        ServerError: error,
      });
    }
    if (User.length === 0) {
      return res.status(200).send({
        Status: "Success",
        data: {
          isValid: true,
        },
      });
    } else {
      return res.status(200).send({
        Status: "Error",
        data: {
          isValid: false,
        },
      });
    }
  });
});

module.exports = route;
