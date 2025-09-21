import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserProvider.jsx';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { user, loading: userLoading } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || userLoading) return; // Don't fetch if user is not logged in or still loading

      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await api.get('/api/orders/myorders', config);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, userLoading]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(`/api/orders/${orderId}/cancel`, {}, config);
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error(err.response?.data?.message || "Failed to cancel order.");
    }
  };

  if (userLoading || loading) {
    return <div className="order-history-page">Loading order history...</div>;
  }

  if (error) {
    return <div className="order-history-page error-message">{error}</div>;
  }

  if (!user) {
    return <div className="order-history-page"><p>Please log in to view your order history.</p></div>;
  }

  return (
    <div className="order-history-page">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h2>Order ID: {order._id}</h2>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: {order.status}</p>
              <div className="order-items">
                <h3>Items:</h3>
                {order.items.map((item) => (
                  <div key={item.product} className="order-item">
                    <p>{item.name} x {item.quantity} - ${(item.price || 0).toFixed(2)} each</p>
                  </div>
                ))}
              </div>
              {order.status === 'pending' && (
                <button onClick={() => handleCancelOrder(order._id)} className="cancel-order-btn">
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;