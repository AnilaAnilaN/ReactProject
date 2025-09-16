import React from "react";
import "./OurStory.css";

export default function OurStory() {
  return (
    <section className="our-story">
      <div className="our-story-container">
        {/* Left: Image */}
        <div className="our-story-image">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80"
            alt="Our Warehouse"
          />
        </div>

        {/* Right: Text */}
        <div className="our-story-text">
          <h2>Our Story</h2>
          <p>
            At <span className="highlight">MeStore</span>, we believe shopping
            should be easy, enjoyable, and accessible for everyone.  
            What started as a small initiative has grown into a trusted platform
            that connects people with the products they love.  
          </p>
          <p>
            Our mission is simple: to provide quality products, seamless
            service, and an experience that keeps you coming back.  
            We’re more than just an ecommerce store — we’re a team passionate
            about making online shopping better every day.
          </p>
        </div>
      </div>
    </section>
  );
}
