const User = require("../models/userMode");
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
          await User.create(data).then(() => {
            resolve(successResponse);
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
};
