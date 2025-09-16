import React from "react";
import "./WhyShop.css";

export default function WhyShop() {
  const points = [
    { title: "24/7 Customer Support", desc: "We’re always here to help, anytime you need us." },
    { title: "100% Secure Checkout", desc: "Shop confidently with our secure payment systems." },
    { title: "Easy Returns", desc: "Hassle-free returns make shopping stress-free." },
    { title: "Global Reach", desc: "Delivering products to customers worldwide." },
  ];

  return (
    <section className="why-shop">
      <h2 className="section-title">Why Shop With Us</h2>
      <div className="why-shop-row">
        {points.map((point, index) => (
          <div className="why-shop-card" key={index}>
            <h3>{point.title}</h3>
            <p>{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
