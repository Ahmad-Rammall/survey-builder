const router = require("express").Router();
const {
  addSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurveyById,
  deleteSurveyId,
} = require("../controllers/survey.controller");

router.post("/", addSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurveyById);
router.delete("/:id", deleteSurveyId);


module.exports = router;
