import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    difficulty: '',
    questions: [],
  });
  const [allQuestions, setAllQuestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch all questions
    axios
      .get('http://localhost:8000/api/questions/all')
      .then(response => {
        setAllQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleInputChange = e => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionToggle = questionId => {
    setQuizData(prevState => ({
      ...prevState,
      questions: prevState.questions.includes(questionId)
        ? prevState.questions.filter(id => id !== questionId)
        : [...prevState.questions, questionId],
    }));
    
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (
      Object.values(quizData).some(
        field => field === '' || (Array.isArray(field) && field.length === 0),
      )
    ) {
      setError('Please fill in all fields and select at least 10 question.');
      return;
    }

    if (quizData.questions.length < 10) {
      setError('Please select at least 10 questions.');
      return;
    }

    const submissionData = {
      ...quizData,
      questions: allQuestions.filter(q => quizData.questions.includes(q.id)),
    };

    axios
      .post('http://localhost:8000/api/quizzes/create', submissionData)
      .then(response => {
        console.log('Quiz created:', response.data);
        /* TODO: Reset form or navigate away */
        setQuizData({
          title: '',
          description: '',
          difficulty: '',
          questions: [],
        });
        window.scrollTo(0, 0);
        setError('');
        setSuccess('Quiz created successfully!');
      })
      .catch(error => {
        console.error('Error creating quiz:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {/* Title */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={quizData.title}
          onChange={handleInputChange}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={quizData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* Difficulty */}
      <div className="mb-3">
        <label htmlFor="difficulty" className="form-label">
          Difficulty
        </label>
        <select
          className="form-select"
          id="difficulty"
          name="difficulty"
          value={quizData.difficulty}
          onChange={handleInputChange}
        >
          <option value="">Select Difficulty</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>

      {/* Questions Selection */}
      <div className="mb-3">
        <label className="form-label">Select Questions</label>
        {allQuestions.map(question => (
          <div key={question.id} className="form-check mt-2 mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              value={question.id}
              id={`question-${question.id}`}
              checked={quizData.questions.includes(question.id)}
              onChange={() => handleQuestionToggle(question.id)}
            />
            <label
              className="form-check-label border-start border-primary-subtle ps-2"
              htmlFor={`question-${question.id}`}
            >
              {question.text}{' '}
              {/* if EASY subtle blue, if medium subtle yellow, if hard red */}
              <span
                className={`container-fluid rounded ${
                  question.difficulty === 'EASY'
                    ? 'bg-primary-subtle'
                    : question.difficulty === 'MEDIUM'
                      ? 'bg-warning-subtle'
                      : 'bg-danger-subtle'
                }`}
              >
                {question.difficulty === 'EASY'
                  ? 'Easy'
                  : question.difficulty === 'MEDIUM'
                    ? 'Medium'
                    : 'Hard'}
              </span>
            </label>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary">
        Create Quiz
      </button>
    </form>
  );
}

export default CreateQuiz;
