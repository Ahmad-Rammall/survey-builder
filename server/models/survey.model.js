const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: { type: String, required: true },
      type: { type: String, required: true, enum: ["radio", "mcq", "text"] },
      options: [{ type: String }], // for mcq / radio
    },
  ],
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
