import React from "react";
import "./Survey.css";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../request";

function Survey({ survey, admin }) {
  const navigate = useNavigate();
  console.log(`${survey._id}`);

  const deleteSurvey = async () => {
    const response = await sendRequest({
      method: "delete",
      route: `survey/${survey._id}`,
    });
    navigate(0)
  };

  const onSurveyClick = () => {
    navigate(`../survey/${survey._id}`);
  };
  return (
    <div className="container">
      <div className="survey-box" onClick={onSurveyClick}>
        <h2>{survey.title}</h2>
      </div>
      {admin ? (
        <button onClick={deleteSurvey}>Delete</button>
      ) : (
        <p>Click To Answer</p>
      )}
    </div>
  );
}

export default Survey;
