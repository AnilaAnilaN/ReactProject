import React from 'react';
import './AboutSection.css';
import { Link } from 'react-router-dom'; // Assuming react-router-dom is used for navigation

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>Our Story & Mission</h2>
        <p>
          At [Your Store Name], we believe in more than just selling products; we're about creating experiences.
          Our journey began with a simple idea: to offer high-quality items that bring joy and value to your life.
          Discover our commitment to excellence, sustainability, and customer satisfaction.
        </p>
        <Link to="/about" className="about-button">Learn More About Us</Link>
      </div>
    </section>
  );
}