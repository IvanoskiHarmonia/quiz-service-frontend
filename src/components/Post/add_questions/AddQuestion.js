import React, { useState } from "react";
import axios from "axios";
import "./add_question.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
    text: "",
    type: "",
    options: [],
    answer: "",
    difficulty: "",
    category: "",
  });

  const categories = [
    "JAVA",
    "PYTHON",
    "JAVASCRIPT",
    "C",
    "C_PLUS_PLUS",
    "C_SHARP",
    "PHP",
    "RUBY",
    "SQL",
    "SWIFT",
    "GO",
    "TYPESCRIPT",
    "KOTLIN",
    "RUST",
    "SCALA",
    "PERL",
    "R",
    "MATLAB",
    "OBJECTIVE_C",
    "VISUAL_BASIC",
    "HASKELL",
    "CLOJURE",
    "GROOVY",
    "DART",
    "BASH",
    "COBOL",
    "FORTRAN",
    "LISP",
    "PASCAL",
    "PROLOG",
    "SCHEME",
    "SMALLTALK",
    "ADA",
    "FORTH",
    "F_SHARP",
    "LUA",
    "OCAML",
    "PEARL",
    "POWERSHELL",
    "RACKET",
    "VB_SCRIPT",
    "VERILOG",
    "VHDL",
    "COFFEE_SCRIPT",
    "ERLANG",
    "HACK",
    "JULIA",
    "OBJECTIVE_J",
    "PUPPET",
    "RUBY_ON_RAILS",
    "DJANGO",
    "SPRING",
    "FLASK",
    "LARAVEL",
    "EXPRESS_JS",
    "ASP_NET",
    "ANGULAR",
    "REACT",
    "VUE_JS",
    "EMBER_JS",
    "METEOR_JS",
    "BACKBONE_JS",
    "NODE_JS",
    "RUBY_GEMS",
    "DJANGO_REST_FRAMEWORK",
  ].sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleOptionChange = (e) => {
    setQuestion({ ...question, options: e.target.value.split(",") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/questions/add",
        question,
      );
      console.log(response.data);
      // Reset form or redirect as needed
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="display-6">Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="text"
            name="text"
            placeholder="Enter the question"
            onChange={handleChange}
            value={question.text}
            rows="3"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="text" className="form-label">
            Question <span style={{ color: "red" }}>*</span>
          </label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="options"
            name="options"
            placeholder="Enter options, separated by commas"
            onChange={handleOptionChange}
            value={question.options.join(", ")}
            rows="2"
          ></textarea>
          <label htmlFor="options" className="form-label">
            Options
          </label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="answer"
            name="answer"
            placeholder="Enter the answer"
            onChange={handleChange}
            value={question.answer}
            style={{ height: "150px" }}
          ></textarea>
          <label htmlFor="answer" className="form-label">
            Answer <span style={{ color: "red" }}>*</span>
          </label>
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type <span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-select"
            id="type"
            name="type"
            onChange={handleChange}
            value={question.type}
          >
            <option value="">Select Type</option>
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_THE_BLANK">Fill in blank</option>
            <option value="OPEN_ENDED">Open Ended</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="difficulty" className="form-label">
            Difficulty <span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-select"
            id="difficulty"
            name="difficulty"
            onChange={handleChange}
            value={question.difficulty}
          >
            <option value="">Select Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category <span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            onChange={handleChange}
            value={question.category}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
