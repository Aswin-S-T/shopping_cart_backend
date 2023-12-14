const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userMode");
const jwt = require("jsonwebtoken");
const {
  forebiddenResponse,
  successResponse,
  errorResponse,
} = require("../status");
const bcrypt = require("bcrypt");

module.exports = {
  createAccount: (data) => {
    return new Promise(async (resolve, reject) => {
      let { username, email } = data;
      let bcryptedPassword = await bcrypt.hash(data.password, 10);
      data.password = bcryptedPassword;
      await User.findOne({ email }).then(async (user) => {
        if (user) {
          resolve(forebiddenResponse);
        } else {
          await User.create(data).then((result) => {
            const payload = {
              user: {
                id: result?._id,
              },
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET || "something_secret",
              { expiresIn: "30d" },
              (err, token) => {
                if (err) throw err;

                successResponse.data = result;
                successResponse.token = token;
                resolve(successResponse);
              }
            );
          });
        }
      });
    });
  },
  login: (loginData) => {
    return new Promise(async (resolve, reject) => {
      let { email, password } = loginData;

      await User.findOne({ email: loginData.email }).then(async (user) => {
        if (user) {
          console.log("user exists");
          await bcrypt
            .compare(user.password, loginData.password)
            .then((same) => {
              if (same) {
                successResponse.data = user;
                resolve(successResponse);
              } else {
                errorResponse.message = "Invalid username or password";
                resolve(errorResponse);
              }
            });
        } else {
          console.log("user not exists");
        }
      });
    });
  },
  addProduct: (data) => {
    return new Promise(async (resolve, reject) => {
      await Product.create(data).then(() => {
        successResponse.message = "Product added";
        resolve(successResponse);
      });
    });
  },
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      let products = [];
      Product.find().then((result) => {
        successResponse.data = result;
        resolve(successResponse);
      });
    });
  },
  getProductDetails: (productId) => {
    return new Promise(async (resolve, reject) => {
      let product = await Product.findOne({ _id: productId });
      if (product) {
        successResponse.data = product;
        resolve(successResponse);
      } else {
        errorResponse.message = "No product Found";
        resolve(errorResponse);
      }
    });
  },
  addToCart: (data) => {
    return new Promise(async (resolve, reject) => {
      let { userId, productId } = data;

      await Cart.findOne({ userId }).then((cart) => {
        if (cart) {
          Cart.updateOne({ userId }, { $push: { cartItems: productId } }).then(
            () => {
              successResponse.message = "Successfully added to cart";
              resolve(successResponse);
            }
          );
        } else {
          let item = [];
          item.push(productId);
          let cartModel = {
            userId,
            cartItems: item,
          };

          Cart.create(cartModel).then(() => {
            successResponse.message = "Successfully added to cart";
            resolve(successResponse);
          });
        }
      });
    });
  },
  getCartItems: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await Cart.findOne({ userId });
      if (cartItems) {
        successResponse.data = cartItems?.cartItems;
        resolve(successResponse);
      } else {
        errorResponse.message = "No cart Found";
        resolve(errorResponse);
      }
    });
  },
};
