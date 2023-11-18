import React, { useState } from "react";
import axios from "axios";
import "./AddQuestion.css";
import { categories } from "../../../common/constants/categories";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
    text: "",
    answer: "",
    difficulty: "",
    category: { name: "" },
    type: "OPEN_ENDED",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        category: { name: value },
      }));
    } else {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/questions/add",
        question,
      );
      console.log("Question added: ", response.data);
      window.location = "/";
    } catch (error) {
      console.error("Error adding question: ", error);
      setErrorMessage("Please fill in all the required fields");
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
            value={question.category?.name || ""}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
