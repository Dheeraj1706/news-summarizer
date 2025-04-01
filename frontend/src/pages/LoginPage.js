import React, { useState } from "react";
import "../styles/LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import videoBg from "../assets/earth.mp4";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/auth/login", formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", formData.email); // Save user email for display
        navigate("/home");
      } else {
        await axios.post("http://localhost:5000/api/auth/register", formData);
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert(error.response?.data?.message || "Authentication error");
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="video-background">
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="login-overlay">
        <div className="news-title">
          <h1>News Summarizer</h1>
          <p>Less Clutter, More Clarity - News That Matters.</p>
        </div>
        
        <div className="auth-container">
          {isLogin ? (
            <>
              <h2>Login to Your Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                
                <div className="auth-switch">
                  Don't have an account? <span onClick={() => setIsLogin(false)}>Sign Up</span>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2>Create Your Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <button type="submit" className="login-button">
                  Sign Up
                </button>
                
                <div className="auth-switch">
                  Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 