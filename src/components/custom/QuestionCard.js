import React, { useState } from "react";

function QuestionCard({ question, onAnswerChange, showAnswerButton }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const handleAnswerChange = (event) => {
    const newAnswer = event.target.value;
    setUserAnswer(newAnswer);
    onAnswerChange(question.id, newAnswer);
  };

  return (
    <div
      className="question-card"
      style={{ background: getGradientStyle(question.difficulty) }}
    >
      <div className="question-content">
        <p>Question: {question.text}</p>
        <p className="difficulty">Difficulty: {question.difficulty}</p>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Type your answer here..."
          style={{ height: "125px" }}
          value={userAnswer}
          onChange={handleAnswerChange}
        ></textarea>
        <label htmlFor="answer" className="form-label">
          Answer
        </label>
      </div>
      {showAnswerButton && (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? "Hide" : "Show"} Answer
          </button>
          {showAnswer && (
            <div className="answer">Answer: {question.answer}</div>
          )}
        </div>
      )}
    </div>
  );
}

const getGradientStyle = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "linear-gradient(to bottom, #add8e6af, white)";
    case "MEDIUM":
      return "linear-gradient(to bottom, #FED8B1AF, white)";
    case "HARD":
      return "linear-gradient(to bottom, #FF474CAF, white)";
    default:
      return "none";
  }
};

export default QuestionCard;
