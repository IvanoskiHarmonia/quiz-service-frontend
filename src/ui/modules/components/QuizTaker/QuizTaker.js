import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../QuestionCard/QuestionCard';
import QuizResultsScreen from '../QuizResultsScreen/QuizResultsScreen';
import axios from 'axios';

function QuizTaker() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/quizzes/${quizId}/questions`)
      .then(response => {
        setQuestions(response.data);
        setLoading(false);
        const initialAnswers = {};
        response.data.forEach(question => {
          initialAnswers[question.id] = '';
        });
        setAnswers(initialAnswers);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setError(error);
        setLoading(false);
      });
  }, [quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const submission = { answers: answers };
    console.log('Submitting quiz:', submission);

    axios
      .post(`http://localhost:8000/api/quizzes/${quizId}/submit`, submission)
      .then(response => {
        setQuizResults(response.data.answerDetails);
        console.log('Quiz results:', response.data.answerDetails);
        window.scrollTo(0, 0);
      })
      .catch(error => {
        console.error('Error submitting quiz:', error);
      });
  };

  if (quizResults) {
    return <QuizResultsScreen results={quizResults} />;
  }

  return (
    <div className="all-questions-container m-4">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {!loading &&
        !error &&
        questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            onAnswerChange={handleAnswerChange}
            showAnswerButton={false}
          />
        ))}
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizTaker;
