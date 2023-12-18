const express = require("express");
const { login, register } = require("../controllers/auth.controllers");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + file.originalname );
  },
});

// upload middleware
const upload = multer({ storage });

router.post("/login", login);
router.post("/register", upload.single("image"), register);

module.exports = router;
