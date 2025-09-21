// src/components/shop/CheckoutPage.jsx
import React, { useState, useContext } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import { CartContext } from '../../context/CartProvider.jsx';
import { UserContext } from '../../context/UserProvider.jsx';
import "./CheckoutPage.css";

export default function CheckoutPage({ onDone, product: singleProduct }) {
  const [placing, setPlacing] = useState(false);
  const { cart, clearCart } = useContext(CartContext);
  const { user, loading } = useContext(UserContext);

  const itemsToCheckout = singleProduct ? [{ product: singleProduct, quantity: 1 }] : cart.items;

  const calculateTotal = () => {
    if (singleProduct) {
      return (singleProduct.price || 0).toFixed(2);
    }
    return (cart.total || 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (loading) {
      return;
    }
    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }
    if (itemsToCheckout.length === 0) {
      toast.error("No items to checkout.");
      return;
    }

    setPlacing(true);
    try {
      const orderItems = itemsToCheckout.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const payload = {
        customer: {
          name: user.name || "",
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        items: orderItems,
        total: calculateTotal(),
        paymentMethod: "COD",
      };

      const res = await api.post("/api/orders", payload);
      toast.success("Order placed successfully!");
      if (!singleProduct) {
        clearCart(); // Clear cart only if it's a cart checkout
      }

      if (onDone) onDone(res.data);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error(err.response?.data?.error || "Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return <div className="checkout-page">Loading user data...</div>;
  }

  return (
    <div className="checkout-page">
      <h2>Order Summary</h2>
      {itemsToCheckout.length === 0 ? (
        <p>No items to checkout. Please add items to your cart or select a product to buy.</p>
      ) : (
        <div className="order-summary">
          {itemsToCheckout.map(item => (
            <div key={item.product._id} className="order-item">
              <p><strong>{item.product.name}</strong> x {item.quantity} - ${(item.product.price || 0).toFixed(2)} each</p>
            </div>
          ))}
          <h3>Total: ${calculateTotal()}</h3>
          <p>
            <strong>Customer:</strong> {user?.name} ({user?.email})
          </p>
          <p>
            <strong>Payment Method:</strong> Cash On Delivery
          </p>
        </div>
      )}

      <div className="checkout-actions">
        <button onClick={handlePlaceOrder} disabled={placing || itemsToCheckout.length === 0}>
          {placing ? "Placing..." : "Place Order (COD)"}
        </button>
      </div>
    </div>
  );
}
