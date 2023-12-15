import React, { useState } from 'react';
import ChangeGradientByDifficulty from '../../utils/ChangeGradientByDifficulty';

function QuestionCard({
  question,
  onAnswerChange,
  userAnswer,
  showAnswerButton,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [localUserAnswer, setLocalUserAnswer] = useState(userAnswer || '');

  const handleAnswerChange = event => {
    const newAnswer = event.target.value;
    setLocalUserAnswer(newAnswer);
    onAnswerChange(question.id, newAnswer);
  };

  return (
    <div
      className="question-card"
      style={{ background: ChangeGradientByDifficulty(question.difficulty) }}
    >
      <div className="question-content">
        <p>Question: {question.text}</p>
        <p className="difficulty">Difficulty: {question.difficulty}</p>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Type your answer here..."
          style={{ height: '125px' }}
          value={localUserAnswer}
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
            {showAnswer ? 'Hide' : 'Show'} Answer
          </button>
          {showAnswer && (
            <div className="answer">Answer: {question.answer}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
