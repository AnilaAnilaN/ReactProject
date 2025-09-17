import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="blog-hero">
      <div className="blog-hero-content">
        <h1>Our Insights & Stories</h1>
        <p>Read the latest updates, tutorials, and news from MeStore</p>
        <div className="blog-hero-search">
          <input type="text" placeholder="Search blogs..." />
          <button>Search</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
