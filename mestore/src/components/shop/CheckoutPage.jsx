// src/components/shop/CheckoutPage.jsx
import React, { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import "./CheckoutPage.css";

export default function CheckoutPage({ product, userData, onDone }) {
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const payload = {
        customer: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        },
        items: [
          {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
          },
        ],
        total: product.price, // single product, quantity 1
        paymentMethod: "COD",
      };

      const res = await api.post("/orders", payload);
      toast.success("Order placed successfully!");

      if (onDone) onDone(res.data); // notify parent
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error(err.response?.data?.error || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Order Summary</h2>
      <div className="order-summary">
        <p>
          <strong>Product:</strong> {product.name}
        </p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Customer:</strong> {userData.name} ({userData.email})
        </p>
        <p>
          <strong>Address:</strong> {userData.address}
        </p>
        <p>
          <strong>Phone:</strong> {userData.phone}
        </p>
      </div>

      <div className="checkout-actions">
        <button onClick={handlePlaceOrder} disabled={placing}>
          {placing ? "Placing..." : "Place Order (COD)"}
        </button>
      </div>
    </div>
  );
}
