const User = require("../models/user.model");
const Type = require("../models/type.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  // check if user is available in DB
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  // check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.file);
  const profilePicturePath = req.file
    ? req.file.filename
    : "OIP.jpg";

  console.log(req.body);
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "all fields are required" });
  }

    const type = await Type.findOne({ name: 'user' });
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    try {
      const user = new User({
        email,
        password: hashedPass,
        firstName,
        lastName,
        user_type: type._id,
        profile: profilePicturePath,
      });

      await user.save();

      // login after register
      login(req, res);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  
};

module.exports = {
  login,
  register,
};
