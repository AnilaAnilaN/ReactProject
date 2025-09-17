import React, { useState } from "react";
import "./ContactForm.css";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Sending message...", { id: "sendMsg" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!", { id: "sendMsg" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || "Failed to send message.", { id: "sendMsg" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to connect to server.", { id: "sendMsg" });
    }
  };

  return (
    <section className="contact-form-section">
      <div className="form-container">
        <h2>Send Us a Message</h2>
        <p>Have a question or feedback? We’ll get back to you soon.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
