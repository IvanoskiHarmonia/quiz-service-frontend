import React, { useState } from 'react';
import './Home.css';
import { categories } from '../../../common/constants/categories';
import { difficulties } from '../../../common/constants/difficulties';
import useDynamicQuestionFetch from '../../../common/services/useDynamicQuestionFetch';
import QuestionCard from '../../modules/components/QuestionCard/QuestionCard';
import Flashcard from '../../modules/components/Flashcard/Flashcard';

function Home() {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [viewMode, setViewMode] = useState('questionCard');

  const { questions, loading, error } = useDynamicQuestionFetch(
    category,
    difficulty,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(15);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion,
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        className={`page-item ${currentPage === number ? 'disabled' : ''}`}
      >
        <a
          onClick={e => {
            e.preventDefault();
            setCurrentPage(number);
            window.scrollTo(0, 0);
          }}
          href="!#"
          className="page-link"
        >
          {number}
        </a>
      </li>
    );
  });

  const renderQuestions = () => {
    return currentQuestions.map(question => {
      if (viewMode === 'flashcard') {
        return <Flashcard key={question.id} question={question} />;
      } else {
        return (
          <QuestionCard
            key={question.id}
            question={question}
            onAnswerChange={handleAnswerChange}
            userAnswer={userAnswers[question.id] || ''}
            showAnswerButton={true}
          />
        );
      }
    });
  };

  return (
    <div className="all-questions-container">
      <h2 className="display-6 text-center">All Questions</h2>

      <div className="view-buttons-center">
        <button
          className={`btn me-2 ${
            viewMode === 'questionCard' ? 'btn-primary' : 'btn-secondary'
          }`}
          onClick={() => setViewMode('questionCard')}
        >
          Question Card View
        </button>
        <button
          className={`btn ${
            viewMode === 'flashcard' ? 'btn-primary' : 'btn-secondary'
          }`}
          onClick={() => setViewMode('flashcard')}
        >
          Flashcard View
        </button>
      </div>

      <select
        className="select-box"
        value={category}
        onChange={e => {
          setCategory(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {category && (
        <select
          className="select-box"
          value={difficulty}
          onChange={e => {
            setDifficulty(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Select Difficulty</option>
          {difficulties.map(d => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        renderQuestions()
      )}

      <nav>
        <ul className="pagination justify-content-center">
          {renderPageNumbers}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
