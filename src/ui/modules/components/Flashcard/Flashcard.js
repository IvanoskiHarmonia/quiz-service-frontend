import React, { useState } from 'react';
import './Flashcard.css';
import ChangeGradientByDifficulty from '../../utils/ChangeGradientByDifficulty';

function Flashcard({ question }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={flipCard}
    >
      <div className="flashcard-inner">
        <div
          className="flashcard-front"
          style={{
            background: ChangeGradientByDifficulty(question.difficulty),
          }}
        >
          <p>{question.text}</p>
        </div>
        <div className="flashcard-back">
          <p>{question.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
