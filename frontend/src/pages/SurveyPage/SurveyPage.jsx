import React, { useEffect, useState } from "react";
import { sendRequest } from "../../request";
import { useParams } from "react-router-dom";
import Question from "../../components/question/Question";

function SurveyPage() {
  const [survey, setSurvey] = useState();
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState([]);

  const { id } = useParams();
  const getSurvey = async () => {
    try {
      const response = await sendRequest({
        route: `survey/${id}`,
      });
      setSurvey(response.data.survey);
    } catch (error) {
        console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await sendRequest({
        method: 'POST',
        route: 'response',
        body:{
            surveyId: id,
            answers
        }
      })
      console.log(response);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  useEffect(() => {
    getSurvey();
  }, []);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  return (
    <div>
      {survey ? (
        <>
          <h1>{survey.title}</h1>
          <div className="questions">
            {survey.questions.map((q) => (
              <Question key={q._id} question={q} setAnswers={setAnswers} answers={answers}/>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit Survey</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SurveyPage;
