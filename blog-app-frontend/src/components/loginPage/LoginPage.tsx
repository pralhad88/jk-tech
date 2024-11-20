import React from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login-lite";
import { useAuth } from '../../context/AuthContext';
import { userLogIn } from '../../api/apiCalls';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const accessToken = credentialResponse.credential;
    const apiRes = await userLogIn(accessToken, 'google');
    login(apiRes.accessToken, { name: apiRes.name, email: apiRes.email, profilePicture: apiRes.profilePicture });
  };

  const handleFacebookResponse = async (response: any) => {
    const accessToken = response.authResponse.accessToken;
    const apiRes = await userLogIn(accessToken, 'facebook');
    login(apiRes.accessToken, { name: apiRes.name, email: apiRes.email, profilePicture: apiRes.profilePicture });
  };

  return (
    <GoogleOAuthProvider clientId="105589100605-ma8mtmoh0ggk7e5ouc0opl520vpvtrlb.apps.googleusercontent.com">
      <div className="login-container">
        <h1 className="login-header">Login </h1>

        <div className="login-buttons">
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.error("Google login error");
              }}
            />
          </div>

          <div className="facebook-login">
            <FacebookLogin
              appId="1513784152669161"
              onSuccess={handleFacebookResponse}
              onFailure={(error) => console.error("Facebook login error:", error)}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
