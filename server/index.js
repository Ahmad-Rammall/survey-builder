const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const bodyParser = require('body-parser');

const app = express();

// to get json data + x-www-form-urlencoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectToMongoDB();
});
