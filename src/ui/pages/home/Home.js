// src/components/QuestionsComponent.js
import React, { useState } from "react";
import "./Home.css";
import useDynamicQuestionFetch from "../../../common/services/useDynamicQuestionFetch";
import QuestionCard from "../../modules/components/QuestionCard/QuestionCard";

function Home() {
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

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "disabled" : ""}`}
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
          <QuestionCard
            key={index}
            question={question}
            showAnswerButton={true}
          />
        ))
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
