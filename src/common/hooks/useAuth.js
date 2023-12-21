import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const checkTokenExpiry = token => {
    const expiryTime = localStorage.getItem('expiryTime');
    return new Date().getTime() > expiryTime;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ? !checkTokenExpiry() : false;
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(!checkTokenExpiry(token));
    }
  }, []);

  const handleLogin = (token, expiryTime, navigate) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('expiryTime', expiryTime);
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryTime');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
