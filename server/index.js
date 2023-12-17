const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const path = require('path');


const app = express();
app.use(cors());

// static folder
app.use(express.static(path.join(__dirname , "./images")))

// to get json data + x-www-form-urlencoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to log http requests in the terminal
app.use(morgan("common"));

// Authentication Route
const authRoutes = require("./routes/auth.routes");

// Upload Pictures Route
const uploadRoutes = require("./routes/uploadProfile.routes");
app.use("/uploadProfile", uploadRoutes);

app.listen(process.env.PORT, () => {
  connectToMongoDB();
});
