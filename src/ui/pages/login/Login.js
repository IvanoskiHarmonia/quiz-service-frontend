import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/hooks/useAuth';
import logo from '../../../resources/logo/logo512.png';
import googleLogo from '../../../resources/logo/web_neutral_sq_na@1x.png';

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const login = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    auto_select: true,
    onSuccess: async tokenResponse => {
      try {
        const googleUserResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          },
        );

        await axios.post(
          'http://localhost:8000/api/users/login',
          {
            token: tokenResponse.access_token,
            expiresAt: new Date().getTime() + tokenResponse.expires_in,
            email: googleUserResponse.data.email,
          },
          { withCredentials: true },
        );

        handleLogin(navigate);
      } catch (error) {
        console.error('Failed to fetch user data or send to backend:', error);
      }
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
              <div className="d-flex justify-content-center mb-1">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: '60px', height: '60px', borderRadius: '5px' }}
                  className="shadow"
                />
              </div>
              <h2 className="card-title text-center mb-2">Login Page</h2>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => login()}
                  className="btn btn-primary d-flex align-items-center"
                >
                  <img
                    src={googleLogo}
                    alt="Google Logo"
                    style={{
                      width: '25px',
                      height: '25px',
                      marginRight: '10px',
                    }}
                    className="shadow"
                  />
                  Sign in
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
