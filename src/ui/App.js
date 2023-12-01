// src/App.js or another parent component
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Home from './pages/home/Home';
import RandomQuiz from './pages/random_quiz/RandomQuiz';
import AddQuestion from './pages/add_question/AddQuestion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-primary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            QuizApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add-question" end>
                  Add Question
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/quizzes" end>
                  random10 Quiz
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/quizzes" element={<RandomQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
