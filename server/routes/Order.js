const route = require("express").Router();
const OrderModel = require("../models/User");
const sendEmail = require("../utils/email");
const handelToken = require("../security/HandelTokens");
const Verify = require("../middleware/jwtverification");
const jwt = require("jsonwebtoken");

route.post("/:UserId", async (req, res) => {
  try {
    const newOrder = OrderModel({
      UserId: req.params.UserId,
      Product: req.body.Product,
      UserDetails: req.body.UserDetails,
    });
    newOrder
      .save()
      .then(() => {
        res.status(200).json({
          Status: "Success",
          Message: "Order has been Placed Successfully",
        });
      })
      .catch((error) =>
        res.status(400).json({
          Status: "Error",
          ErrorMessage: "Cannot Logged Out !!! \n Please try later",
          ServerError: error,
        })
      );
  } catch (error) {
    return res.status(500).json({
      Status: "Error",
      ErrorMessage: "Cannot Logged Out !!! \n Please try later",
      ServerError: error,
    });
  }
});

module.exports = route;
