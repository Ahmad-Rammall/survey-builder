const Survey = require("../models/survey.model");

const addSurvey = async (req, res) => {
  if(req.type !== "admin") return res.status(401).json({message: "Unauthorized"})

  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(200).json({ message: " Added Survey", survey: survey });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({});
    console.log(surveys);
    res.status(200).json({ surveys });
  } catch (error) {
    res.status(500).json({ error: e });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findOne({ _id: req.params.id });
    res.status(200).json({ survey });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateSurveyById = async (req, res) => {
  if(req.type !== "admin") return res.status(401).json({message: "Unauthorized"})

  try {
    // runValidators to validate data before updating
    const survey = await Survey.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Survey Updated", survey });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteSurveyId = async (req, res) => {
  if(req.type !== "admin") return res.status(401).json({message: "Unauthorized"})

  try {
    await Survey.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "Survey Deleted" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  addSurvey,
  getAllSurveys,
  getSurveyById,
  deleteSurveyId,
  updateSurveyById,
};
