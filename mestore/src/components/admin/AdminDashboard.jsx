import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import MessagesList from "./MessagesList";
import OrdersList from "./OrdersList";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blogs");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(false);
  const [refreshBlogs, setRefreshBlogs] = useState(false);

  // Notification badge states
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unattendedOrders, setUnattendedOrders] = useState(0);

  useEffect(() => {
    // Fetch unread messages and orders count
    axios
      .get("http://localhost:5000/api/unread/count")
      .then((res) => {
        setUnreadMessages(res.data.unreadMessages || 0);
        setUnattendedOrders(res.data.unreadOrders || 0);
      })
      .catch((err) => {
        console.error("Error fetching unread counts:", err);
        setUnreadMessages(0);
        setUnattendedOrders(0);
      });

    // Fetch unattended orders count (assuming status 'pending' means unattended)
    // This is now handled by the /api/unread/count endpoint
    /*
    axios
      .get("http://localhost:5000/api/orders?status=pending")
      .then((res) => {
        const orders = Array.isArray(res.data) ? res.data : [];
        setUnattendedOrders(orders.length);
      })
      .catch(() => setUnattendedOrders(0));
    */
  }, [refreshBlogs, refreshProducts]);

  const handleEditProduct = (product) => setSelectedProduct(product);
  const handleEditBlog = (blog) => setSelectedBlog(blog);

  const handleProductSaved = () => {
    setSelectedProduct(null);
    setRefreshProducts((prev) => !prev);
  };

  const handleBlogSaved = () => {
    setSelectedBlog(null);
    setRefreshBlogs((prev) => !prev);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button onClick={() => setActiveTab("blogs")}>Manage Blogs</button>
        <button onClick={() => setActiveTab("products")}>Manage Products</button>
        <div className="tab-icons">
          <div
            className={`tab-icon ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
            style={{ position: "relative" }}
          >
            <FaEnvelope />
            {unreadMessages > 0 && (
              <span className="badge">{unreadMessages}</span>
            )}
          </div>
          <div
            className={`tab-icon ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
            style={{ position: "relative" }}
          >
            <FaShoppingCart />
            {unattendedOrders > 0 && (
              <span className="badge">{unattendedOrders}</span>
            )}
          </div>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === "blogs" && (
          <>
            <BlogForm selectedBlog={selectedBlog} onSaved={handleBlogSaved} />
            <BlogList key={refreshBlogs} onEdit={handleEditBlog} />
          </>
        )}
        {activeTab === "products" && (
          <>
            <ProductForm
              selectedProduct={selectedProduct}
              onSaved={handleProductSaved}
            />
            <ProductList key={refreshProducts} onEdit={handleEditProduct} />
          </>
        )}
        {activeTab === "messages" && <MessagesList />}
        {activeTab === "orders" && <OrdersList />}
      </div>
    </div>
  );
}