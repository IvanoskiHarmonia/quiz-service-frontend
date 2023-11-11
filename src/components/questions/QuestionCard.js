import React, { useState } from 'react';
import useAllQuestions from '../../hooks/useAllQuestions';
import './QuestionCard.css';

function QuestionCard() {
    const { questions, loading, error } = useAllQuestions();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading questions!</p>;

    return (
        <div className="all-questions-container">
            <h2>All Questions</h2>
            {questions.map((question, index) => (
                <QuestionItem key={index} question={question} />
            ))}
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
            <textarea className="answer-box" placeholder="Type your answer here..."></textarea>
            <button onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Hide' : 'Show'} Answer
            </button>
            {showAnswer && <div className="answer">Answer: {question.answer}</div>}
        </div>
    );
}

export default QuestionCard;