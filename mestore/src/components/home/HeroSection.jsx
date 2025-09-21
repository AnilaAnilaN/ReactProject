import React from 'react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Shape Your Style</h1>
        <p>Discover the latest trends and timeless classics. Shop now and elevate your wardrobe!</p>
        <button className="hero-button">Shop New Arrivals</button>
      </div>
    </section>
  );
}