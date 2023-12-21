const Response = require("../models/response.model");
const Survey = require("../models/survey.model");

const addResponse = async (req, res) => {
  try {
    const { surveyId, answers } = req.body;
    const userId = req.user._id;
    console.log(req.body);

    const survey = await Survey.findOne({ _id: surveyId });

    if (!survey) res.status(404).json({ error: "Survey Doesn't Exist" });

    for (const answer of answers) {
      const question = survey.questions.find(
        (question) => String(question._id) === String(answer.questionId)
      );

      if (!question) res.status(404).json({ error: "Question Doesn't Exist" });

      console.log(typeof(answer.choices));
      console.log(survey);

      if (question.type === "radio" || question.type === "mcq") {
        const invalidChoices = answer.choices.filter(
          (choice) => !question.options.includes(choice)
        );
        if (invalidChoices.length > 0) {
          return res.status(400).json({
            error: `Invalid choices for the question : ${question}`,
            invalidChoices,
          });
        }
      }
    }

    const response = new Response({ surveyId, answers, userId });
    await response.save();
    res.status(200).json({ message: "Response Added", response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSurveyResponses = async (req, res) => {
  if(req.type !== "admin") return res.status(401).json({message: "Unauthorized"})

  try {
    const surveyId = req.params.surveyId;
    const responses = await Response.find({ surveyId });
    res.status(200).json({ responses });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteResponse = async (req, res) => {

  try {
    const responseId = req.params.id;
    await Response.findOneAndDelete({ _id: responseId });
    res.status(200).json({ message: "Response Deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateResponse = async (req, res) => {

  try {
    const responseId = req.params.id;
    const { newAnswers } = req.body;

    const response = await Response.findOne({ _id: responseId });
    const survey = await Survey.findOne({ _id: response.surveyId });

    for (const answer of newAnswers) {
      const question = survey.questions.find(
        (question) => String(question._id) === String(answer.questionId)
      );

      if (!question) res.status(404).json({ error: "Question Doesn't Exist" });

      if (question.type === "radio" || question.type === "mcq") {
        const invalidChoices = answer.choices.filter(
          (choice) => !question.options.includes(choice)
        );
        if (invalidChoices.length > 0) {
          return res.status(400).json({
            error: `Invalid choices for the question : ${question}`,
            invalidChoices,
          });
        }
      }

      if(question.type === "text"){
        answer.choices = []
      }
    }

    const updatedResponse = await Response.updateOne(
      { _id: responseId },
      { answers: newAnswers }
    );
    res.status(200).json({ message: "Response Updated", updatedResponse });

  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  addResponse,
  getSurveyResponses,
  deleteResponse,
  updateResponse,
};
