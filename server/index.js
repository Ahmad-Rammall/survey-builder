const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const path = require('path');
const { authMiddleware } = require("./middlewares/auth.middleware");

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
app.use("/auth", authRoutes);

// Survey Routes
const surveyRoutes = require("./routes/survey.routes");
app.use("/survey",authMiddleware, surveyRoutes);

// Response Routes
const responseRoutes = require('./routes/response.routes')
app.use("/response" , authMiddleware , responseRoutes);

app.listen(process.env.PORT, () => {
  connectToMongoDB();
});
