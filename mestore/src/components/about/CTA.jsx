import React from "react";
import { Link } from "react-router-dom";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Experience Better Shopping?</h2>
        <p>Join thousands of happy customers and explore our wide range of products today.</p>
        <div className="cta-buttons">
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
