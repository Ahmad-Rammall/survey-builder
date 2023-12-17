const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on("error", (error) => {
    console.log("Error connection to MongoDB: ", error);
  });

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB...");
  });
};

module.exports = { connectToMongoDB };
