import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    type: '',
    difficulty: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = e => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Basic validation
    if (Object.values(quizData).some(field => field === '')) {
      setError('Please fill in all fields.');
      return;
    }

    axios
      .post('http://localhost:8000/api/quizzes', quizData)
      .then(response => {
        console.log('Quiz created:', response.data);
        /* TODO: Reset form or navigate away */
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
      {/* Form fields for title, description, type, and difficulty */}
      <button type="submit" className="btn btn-primary">
        Create Quiz
      </button>
    </form>
  );
}

export default CreateQuiz;
