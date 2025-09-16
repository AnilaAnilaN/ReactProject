import React from "react";
import "./ContactInfo.css";

export default function ContactInfo() {
  const infoItems = [
    {
      icon: "📞",
      title: "Phone",
      detail: "+1 234 567 890",
    },
    {
      icon: "✉️",
      title: "Email",
      detail: "support@mestore.com",
    },
    {
      icon: "📍",
      title: "Location",
      detail: "123 MeStore Street, New York, USA",
    },
  ];

  return (
    <section className="contact-info">
      <div className="contact-info-container">
        {infoItems.map((item, index) => (
          <div className="contact-card" key={index}>
            <span className="contact-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
