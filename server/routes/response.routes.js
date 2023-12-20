const router = require("express").Router();
const {
  addResponse,
  getSurveyResponses,
  deleteResponse,
  updateResponse,
} = require("../controllers/response.controllers");

router.post("/", addResponse);
router.get("/:surveyId", getSurveyResponses);
router.delete("/:id", deleteResponse);
router.put("/:id", updateResponse);

module.exports = router;
