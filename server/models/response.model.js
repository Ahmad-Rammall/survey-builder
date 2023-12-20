const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey.questions",
        required: true,
      },
      choices: [{type: String}], // for radio / mcq
      text: String, // for text questions
    },
  ],
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
