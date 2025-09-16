import React from "react";
import "./MissionValues.css";

export default function MissionValues() {
  const values = [
    {
      icon: "✅",
      title: "Customer First",
      text: "We put our customers at the heart of everything we do, ensuring the best shopping experience.",
    },
    {
      icon: "🚚",
      title: "Fast & Reliable Delivery",
      text: "Quick shipping and reliable delivery you can always count on.",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      text: "Safe, simple, and trusted payment options for worry-free transactions.",
    },
    {
      icon: "🌍",
      title: "Wide Product Range",
      text: "From everyday essentials to unique finds, we’ve got it all.",
    },
  ];

  return (
    <section className="mission-values">
      <h2 className="section-title">Our Mission & Values</h2>
      <div className="values-grid">
        {values.map((value, index) => (
          <div className="value-card" key={index}>
            <div className="icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
