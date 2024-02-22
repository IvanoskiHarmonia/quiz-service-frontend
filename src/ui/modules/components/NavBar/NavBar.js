import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../common/hooks/useAuth';
import './navbar.css';

const NavBar = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-primary shadow d-flex justify-content-between custom-navbar"
      data-bs-theme="dark"
    >
      {isAuthenticated && (
        <div className="container-fluid">
          <a className="navbar-brand m-0" href="/">
            QuizApp
          </a>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <div className="navbar justify-content-center" id="navbarNav">
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
                  Quizzes
                </NavLink>
              </li>
            </ul>
          </div>

          <button className="shadow btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
