import React, { useState } from "react";
import { sendRequest } from "../../request";
import "./addSurvey.css";

const AddSurvey = ({setModalState}) => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", type: "text", options: [""] },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [""] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const response = await sendRequest({
        method: "post",
        route: "survey",
        body: {
          title: title,
          questions,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <h1>Add Survey</h1>
      <label>Survey Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2>Questions:</h2>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <label>Question Text:</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, "text", e.target.value)
            }
          />
          <label>Question Type:</label>
          <select
            value={question.type}
            onChange={(e) =>
              handleQuestionChange(index, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="mcq">MCQ</option>
          </select>
          {(question.type === "radio" || question.type === "mcq") && (
            <div>
              <h3>Options:</h3>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>Option:</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                  />
                </div>
              ))}
              <button onClick={() => addOption(index)}>Add Option</button>
            </div>
          )}
        </div>
      ))}
      <div className="buttons">
        <button onClick={addQuestion}>Add Question</button>
        <button onClick={handleSubmit}>Add Survey</button>
        <button onClick={() => setModalState(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default AddSurvey;
