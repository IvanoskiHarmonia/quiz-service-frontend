// src/components/QuestionsComponent.js
import React, { useState } from "react";
import "./QuestionsComponent.css";
import useDynamicQuestionFetch from "../../hooks/useDynamicQuestionFetch";

function QuestionsComponent() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

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

  // Pagination component
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <a
          onClick={(e) => {
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

  const categories = ["Java", "Spring"];
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="all-questions-container">
      <h2 className="display-6">All Questions</h2>

      <select
        className="select-box"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setCurrentPage(1);
        }}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {category && (
        <select
          className="select-box"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">Select Difficulty</option>
          {difficulties.map((d) => (
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
        currentQuestions.map((question, index) => (
          <QuestionItem key={index} question={question} />
        ))
      )}

      <nav>
        <ul className="pagination">{renderPageNumbers}</ul>
      </nav>
    </div>
  );
}

function QuestionItem({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);

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
        ></textarea>
        <label htmlFor="answer" className="form-label">
          Answer
        </label>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Hide" : "Show"} Answer
      </button>
      {showAnswer && <div className="answer">Answer: {question.answer}</div>}
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

export default QuestionsComponent;
