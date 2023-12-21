import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    auto_select: true,
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      const expiryTime = new Date().getTime() + tokenResponse.expires_in * 1000;
      localStorage.setItem('authToken', tokenResponse.access_token);
      localStorage.setItem('expiryTime', expiryTime);
      setIsAuthenticated(true);
      navigate('/');
    },
    onError: error => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={() => login()} className="login-button">
        Login with Google
      </button>
    </div>
  );
};

export default Login;
