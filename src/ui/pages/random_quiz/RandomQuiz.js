import React, { useState, useEffect } from "react";
import useDynamicQuizFetch from "../../../common/services/useDynamicQuizFetch";
import QuestionCard from "../../modules/components/QuestionCard/QuestionCard";
import QuizResultsScreen from "../../modules/components/QuizResultsScreen/QuizResultsScreen";
import axios from "axios";

function RandomQuiz() {
  const { questions, loading, error } = useDynamicQuizFetch();
  const [answers, setAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    const initialAnswers = {};
    questions.forEach((question) => {
      initialAnswers[question.id] = ""; // Or any default value
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const submission = {
      answers: answers,
    };

    axios
      .post("http://localhost:8000/api/quizzes/submit", submission)
      .then((response) => {
        setQuizResults(response.data.answerDetails);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (quizResults) {
    return <QuizResultsScreen results={quizResults} />;
  }

  return (
    <div className="all-questions-container m-4">
      <h2 className="display-6 text-center">Quiz</h2>

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {questions.map((question) => (
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

export default RandomQuiz;
