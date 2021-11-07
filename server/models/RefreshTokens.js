const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    RefreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RefreshTokens", RefreshTokenSchema);
