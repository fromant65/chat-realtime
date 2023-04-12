import React from "react";
import LoginWithMail from "./LoginWithMail";
import RegisterWithMail from "./RegisterWithMail";
import "../../css/login/login.css";
const Login = () => {
  return (
    <div className="login-container">
      <RegisterWithMail />
      <LoginWithMail />
    </div>
  );
};

export default Login;
