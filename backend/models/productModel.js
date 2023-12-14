const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: String, required: true },
    manufacturer: { type: String },
    ratings: {},
  },
  {
    timestamp: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
