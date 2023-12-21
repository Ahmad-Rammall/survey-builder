const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Type = require("../models/type.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(403).send("Unauthorized");
  } else {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ email: decoded.email }).select(
      "-password"
    );
    const type = await Type.findOne({ _id:user.user_type })
    req.user = user;
    req.type = type.name;
    next();
  }
};

module.exports = {
  authMiddleware,
};
