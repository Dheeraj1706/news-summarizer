
import React, { useRef, useEffect } from "react";
import "./App.css";
import videoBg from "./earth.mp4";

function App() {
  const signupRef = useRef(null);

  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="app">
      {}
      <div className="custom-cursor"></div>

      {}
      <section className="hero-section">
        <video autoPlay muted loop className="background-video">
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content">
          <h1>News Summarizer</h1>
          <p>Less Clutter, More Clarity - News That Matters.</p>
          <button onClick={scrollToSignup} className="cta-button glow-on-hover">
            Get Started
          </button>
        </div>
      </section>

      {}
      <section ref={signupRef} className="signup-section">
        <div className="signup-container">
          <h2>Create Your Account</h2>
          <form className="signup-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" required />
            </div>
            <button type="submit" className="submit-button glow-on-hover">
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;














