const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
