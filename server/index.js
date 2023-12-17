const express = require("express");
require("dotenv").config();
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');


const app = express();
app.use(cors());

// to get json data + x-www-form-urlencoded
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to log http requests in the terminal
app.use(morgan("common"));

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectToMongoDB();
});
