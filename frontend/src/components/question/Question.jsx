import React, { useState, useEffect } from "react";

function Question({ question , setAnswers}) {
  const [answer, setAnswer] = useState([]);

  const handleOptionChange = (option) => {
    // Toggle the selected state of the option
    if (answer.includes(option)) {
        setAnswer(
            answer.filter((selected) => selected !== option)
      );
    } else {
        setAnswer([...answer, option]);
    }
  };

  useEffect(() => {
    console.log(typeof(answer));
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (a) => a.questionId === question._id
      );

      if (existingAnswerIndex !== -1) {
        // If the question is already answered, update the existing answer
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId: question._id,
          choices: answer,
        };
        return updatedAnswers;
      } else {
        // If the question is not answered, add a new answer
        return [...prevAnswers, { questionId: question._id, choices: answer }];
      }
    });
  }, [answer, question._id, setAnswers]);

  return (
    <div>
      <h3>{question.text}</h3>
      {question.type === "radio" && (
        <>
          {question.options.map((option, index) => (
            <label key={index}>
              {option}
              <input
                type="radio"
                name={question.text}
                value={option}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>
          ))}
        </>
      )}

      {question.type === "mcq" && (
        <>
          {question.options.map((option, index) => (
            <label key={index}>
              {option}
              <input
                type="checkbox"
                name={question.text}
                value={option}
                onChange={() => handleOptionChange(option)}
              />
            </label>
          ))}
        </>
      )}

      {question.type === "text" && (
        <>
          <label>
            <input
              type="text"
              name={question.text}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </label>
        </>
      )}
    </div>
  );
}

export default Question;
