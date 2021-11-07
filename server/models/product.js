const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
    },
    ProductDescription: {
      type: String,
      required: true,
    },
    Rating: {
      type: Number,
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
