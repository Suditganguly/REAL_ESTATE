import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/");
  }
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          {/* <input type='text' placeholder='Your Name' /> */}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="password" />
        </div>
        <button onClick={handleLogin}>Continue</button>
        <p className="loginsignup-login">
          Don't have an account ?{" "}
          <Link to="/register">
            <span>Register here</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name=" " id="" />
          <p>By continuing,I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
