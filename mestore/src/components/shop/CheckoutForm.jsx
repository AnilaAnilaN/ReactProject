import React, { useState } from "react";
import "./CheckoutForm.css";

export default function CheckoutForm({ product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="checkout-form">
      <h2>
        Checkout for <span className="product-name">{product.name}</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address
          <textarea
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
}