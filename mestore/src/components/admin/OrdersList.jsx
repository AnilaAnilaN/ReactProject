import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrdersList.css";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      const data = Array.isArray(res.data) ? res.data : res.data.orders || [];
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh the orders list after update
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="orders-list-container">
      <h2>User Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-card">
              <div className="order-details">
                <strong>Customer:</strong> {order.customer?.name} ({order.customer?.email}) <br />
                <strong>Phone:</strong> {order.customer?.phone} <br />
                <strong>Address:</strong> {order.customer?.address} <br />
                <span className="order-status">
                  <strong>Status:</strong>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </span> <br />
                <span className="order-total"><strong>Total:</strong> ${order.total}</span>
              </div>
              <strong>Items:</strong>
              <ul className="order-items">
                {(order.items || []).map((item, idx) => (
                  <li key={idx}>
                    {item.name} - ${item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}