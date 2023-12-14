const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderItems: [],
  },
  {
    timestamp: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
