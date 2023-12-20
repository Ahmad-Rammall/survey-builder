const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(403).send("Unauthorized");
  } else {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    req.user = user;
    next();
  }
};

module.exports = {
  authMiddleware,
};
