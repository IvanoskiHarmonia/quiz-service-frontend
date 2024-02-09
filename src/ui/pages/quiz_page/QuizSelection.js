import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuizSelection() {
  const [quizzes, setQuizzes] = useState([]);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/quizzes/all')
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  useEffect(() => {
    if (sortType) {
      // Add sorting logic here based on sortType
    }
  }, [sortType, quizzes]);

  return (
    <div className="quiz-selection-container">
      <div className="mb-3">
        <label htmlFor="sortType" className="form-label">
          Sort By:
        </label>
        <select
          className="form-select"
          id="sortType"
          value={sortType}
          onChange={e => setSortType(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="difficulty">Difficulty</option>
          <option value="type">Type</option>
        </select>
      </div>

      {quizzes.map(quiz => (
        <div key={quiz.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{quiz.title}</h5>
            <p className="card-text">{quiz.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Difficulty: {quiz.difficulty}
              </small>
            </p>
            <button className="btn btn-primary">Start Quiz</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuizSelection;
