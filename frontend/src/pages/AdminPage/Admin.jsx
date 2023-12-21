import React , {useState , useEffect} from "react";
import { sendRequest } from "../../request";
import Survey from "../../components/survey/Survey";
import AddSurvey from "../../components/AddSurveyModal/AddSurvey";

function Admin() {
  const [surveys, setSurveys] = useState([]);
  const [modalState , setModalState] = useState(false);

  const getAllSurveys = async () => {
    const response = await sendRequest({
      route: "survey",
    });
    console.log(response);
    setSurveys(response.data.surveys);
  };

  

  useEffect(() => {
    getAllSurveys()
  }, [])
  return (
    <div>
      <div className="surveys">
        {surveys.map((s) => <Survey key={s._id} survey={s}/>)}
      </div>

      {modalState && <AddSurvey setModalState={setModalState} />}
      <button onClick={() => setModalState(!modalState)}>Add Survey</button>
    </div>
  );
}

export default Admin;
