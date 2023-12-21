import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import RandomQuiz from './pages/random_quiz/RandomQuiz';
import AddQuestion from './pages/add_question/AddQuestion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? !checkTokenExpiry() : false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      const isTokenExpired = checkTokenExpiry(token);
      setIsAuthenticated(!isTokenExpired);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  function checkTokenExpiry(token) {
    const expiryTime = localStorage.getItem('expiryTime');
    return new Date().getTime() > expiryTime;
  }

  const googleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryTime');
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <nav
          className="navbar navbar-expand-lg navbar-light shadow bg-primary"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              QuizApp
            </a>
            {isAuthenticated && (
              <button className="shadow btn btn-light" onClick={googleLogout}>
                Logout
              </button>
            )}
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
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  onLogin={handleLogin}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-question"
              element={
                <ProtectedRoute>
                  <AddQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes"
              element={
                <ProtectedRoute>
                  <RandomQuiz />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
