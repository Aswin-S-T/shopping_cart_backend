const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("User router apis called");
});

module.exports = userRouter;