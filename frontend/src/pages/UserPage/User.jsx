import React, {useState, useEffect} from "react";
import Survey from "../../components/survey/Survey";
import { sendRequest } from "../../request";

function User() {
  const [surveys, setSurveys] = useState([]);
  const getAllSurveys = async () => {
    const response = await sendRequest({
      route: "survey",
    });
    setSurveys(response.data.surveys);
  };

  useEffect(() => {
    getAllSurveys();
  }, []);
  return (
    <div>
      {surveys.map((survey) => (
        <Survey key={survey.id} survey={survey} />
      ))}
    </div>
  );
}

export default User;
