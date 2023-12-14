const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"] || req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "something_secret",
      (error, decoded) => {
        if (error) {
          return res.json.status(401).json({ message: "Invalid token" });
        } else {
          req.user = decoded.user;
          next();
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error...." });
  }
};
