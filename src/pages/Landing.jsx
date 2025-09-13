import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div className="landing-container">
      {/* Floating Circles */}
      <div className="floating-circle circle1"></div>
      <div className="floating-circle circle2"></div>
      <div className="floating-circle circle3"></div>

      {/* Hero Section */}
      <div className="landing-hero">
        <h1 className="landing-title">Welcome, Alex! 📚</h1>
        <p className="landing-subtitle">
          Discover books, authors, and topics personalized just for you.
        </p>

        <Link to="/home" className="landing-button">
          Explore Now
        </Link>
      </div>

      {/* Footer */}
      <div className="landing-footer">
        College Student Book Finder – Personalized Experience for Alex
      </div>
    </div>
  );
}
