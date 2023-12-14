const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    cartItems: [],
  },
  {
    timestamp: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
