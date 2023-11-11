// src/components/QuestionsComponent.js
import React, { useState } from "react";
import "./QuestionComponent.css";
import useDynamicQuestionFetch from "../../hooks/useDynamicQuestionFetch";

function QuestionsComponent() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  const { questions, loading, error } = useDynamicQuestionFetch(
    category,
    difficulty,
    type,
  );

  const categories = ["Java", "Spring"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const types = [
    "MULTIPLE_CHOICE",
    "TRUE_FALSE",
    "FILL_IN_THE_BLANK",
    "OPEN_ENDED",
  ];

  return (
    <div className="all-questions-container">
      <h2>All Questions</h2>

      <select
        className="select-box"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Select Difficulty</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      {category && difficulty && (
        <select
          className="select-box"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select Type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        questions.map((question, index) => (
          <QuestionItem key={index} question={question} />
        ))
      )}
    </div>
  );
}

function QuestionItem({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="question-card">
      <div className="question-content">
        <p>Question: {question.text}</p>
        <p className="difficulty">Difficulty: {question.difficulty}</p>
      </div>
      <textarea
        className="answer-box"
        placeholder="Type your answer here..."
      ></textarea>
      <button onClick={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? "Hide" : "Show"} Answer
      </button>
      {showAnswer && <div className="answer">Answer: {question.answer}</div>}
    </div>
  );
}

export default QuestionsComponent;
