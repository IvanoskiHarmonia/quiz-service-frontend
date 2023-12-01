import React from 'react';

function QuizResultsScreen({ results }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Quiz Results</h2>
      {results.map((result, index) => (
        <div key={index} className="card mb-3">
          <div className="card-header text-bg-primary">
            Question {index + 1}
          </div>
          <div className="card-body">
            <h5 className="card-title">Question: {result.question.text}</h5>
            <hr className="border border-primary border-1 opacity-75" />
            <p className="card-text mt-3">
              <strong>Your Answer:</strong>{' '}
              {result.userAnswer || 'No answer given'}
            </p>
            <p className="card-text">
              <strong>Correct Answer:</strong> {result.question.answer}
            </p>
            <p
              className={`card-text fw-bolder ${
                result.isCorrect ? 'text-success' : 'text-danger'
              }`}
            >
              {result.isCorrect ? 'Correct' : 'Incorrect'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizResultsScreen;
