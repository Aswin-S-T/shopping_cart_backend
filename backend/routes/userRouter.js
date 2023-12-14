const express = require("express");
const {
  createAccount,
  login,
  getAllProducts,
  getProductDetails,
  addProduct,
  addToCart,
  getCartItems,
} = require("../contollers/userController");
const data = require("../data");
const Product = require("../models/productModel");

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

userRouter.post("/add-product", async (req, res) => {
  addProduct(req.body).then((result) => {
    res.send(result);
  });
});

userRouter.get("/get-all-products", (req, res) => {
  getAllProducts().then((result) => {
    res.send(result);
  });
});

userRouter.get("/product/:productId", (req, res) => {
  getProductDetails(req.params.productId).then((result) => {
    res.send(result);
  });
});

userRouter.post("/add-to-cart", (req, res) => {
  addToCart(req.body).then((result) => {
    res.send(result);
  });
});

userRouter.get("/get-cart-items/:userId", (req, res) => {
  getCartItems(req.params.userId).then((result) => {
    res.send(result);
  });
});

module.exports = userRouter;
