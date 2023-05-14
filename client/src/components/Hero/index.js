// about component implementation

// importing react
import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <h2 className="hero-title">
        <img src={`/images/GigIt.png`} alt="gigit logo" class="hero-logo" />
      </h2>
      <h2 className="vertical-line">|</h2>
      <ul className="hero-content">
        <li>Book your next gig 🚀</li>
        <li>Show off your side hustles 💪</li>
        <li>Increase your revenue 💸</li>
      </ul>
    </div>
  );
};

export default Hero;
