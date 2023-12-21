import React from "react";
import "./Survey.css";
import { useNavigate } from "react-router-dom";

function Survey({ survey }) {
  const navigate = useNavigate();

  const onSurveyClick = () => {
    navigate(`../survey/${survey._id}`);
  };
  return (
    <div className="survey-box" onClick={onSurveyClick}>
      <h2>{survey.title}</h2>
      <p>Click To Answer</p>
    </div>
  );
}

export default Survey;
