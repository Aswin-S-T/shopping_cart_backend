const express = require("express");
const { createAccount, login } = require("../contollers/userController");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("User router apis called");
});

userRouter.post("/register", (req, res) => {
  let { username, email } = req.body;
  createAccount(req.body).then((result) => {
    res.send(result);
  });
});

userRouter.post("/login", (req, res) => {
  login(req.body).then((result) => {
    res.send(result);
  });
});

module.exports = userRouter;
