import React, { useState } from 'react';
import QuizSelection from './QuizSelection';
import CreateQuiz from './CreateQuiz';
import RandomQuiz from './RandomQuiz';

function QuizPage() {
  const [activeTab, setActiveTab] = useState('selection');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'selection' ? 'active' : ''}`}
            onClick={() => handleTabChange('selection')}
          >
            Quiz Selection
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => handleTabChange('create')}
          >
            Create Quiz
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'random' ? 'active' : ''}`}
            onClick={() => handleTabChange('random')}
          >
            Random Quiz
          </button>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {activeTab === 'selection' && <QuizSelection />}
        {activeTab === 'create' && <CreateQuiz />}
        {activeTab === 'random' && <RandomQuiz />}
      </div>
    </div>
  );
}

export default QuizPage;
