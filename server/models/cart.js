const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    CartItem: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
