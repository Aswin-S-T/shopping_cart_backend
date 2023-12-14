const express = require("express");
const {
  createAccount,
  login,
  getAllProducts,
  getProductDetails,
  addProduct,
  addToCart,
  getCartItems,
  deleteCartItems,
} = require("../contollers/userController");
const data = require("../data");
const Product = require("../models/productModel");
const auth = require("../utils/auth");

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

userRouter.post("/add-product", auth, async (req, res) => {
  addProduct(req.body).then((result) => {
    res.send(result);
  });
});

userRouter.get("/get-all-products", auth, (req, res) => {
  getAllProducts(req.query).then((result) => {
    res.send(result);
  });
});

userRouter.get("/product/:productId", auth, (req, res) => {
  getProductDetails(req.params.productId).then((result) => {
    res.send(result);
  });
});

userRouter.post("/add-to-cart", auth, (req, res) => {
  addToCart(req.body).then((result) => {
    res.send(result);
  });
});

userRouter.get("/get-cart-items/:userId", auth, (req, res) => {
  getCartItems(req.params.userId).then((result) => {
    res.send(result);
  });
});

userRouter.get("/delete-cart/:userId", auth, (req, res) => {
  deleteCartItems(req.params.userId).then((result) => {
    res.send(result);
  });
});

module.exports = userRouter;
