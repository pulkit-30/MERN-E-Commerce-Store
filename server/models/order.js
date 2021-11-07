const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    Product: [
      {
        ProductId: {
          type: String,
          required: true,
        },
        Quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    UserDetails: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
