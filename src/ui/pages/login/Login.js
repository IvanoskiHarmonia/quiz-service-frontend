import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/hooks/useAuth';
import logo from '../../../resources/logo/logo512.png';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const login = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    auto_select: true,
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      handleLogin(
        tokenResponse.access_token,
        new Date().getTime() + tokenResponse.expires_in,
        navigate,
      );
    },
    onError: error => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <div className="card mt-5">
            <div className="card-body shadow">
              <div className="d-flex justify-content-center">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: '40px', height: '40px' }}
                />
                <h2 className="card-title text-center ms-3">Login Page</h2>
              </div>

              <div className="d-flex justify-content-center">
                <button onClick={() => login()} className="btn btn-primary">
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
