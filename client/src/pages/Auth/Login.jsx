import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useUser } from "../../context/UserDetailContext.jsx"; // ✅ correct import

const LoginSignup = () => {
  const navigate = useNavigate();
  const { setUserDetails } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_URL}/login`,
        { email, password }
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // ✅ Correctly update context
        setUserDetails({ user, token, bookings: [] });

        navigate("/");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.msg || error.message
      );
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button onClick={handleLogin}>Continue</button>
        <p className="loginsignup-login">
          Don't have an account?{" "}
          <Link to="/register">
            <span>Register here</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
