const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TokenSchema = new mongoose.Schema(
  {
    UserId: Schema.Types.ObjectId,
    Token: String,
    ExpiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
