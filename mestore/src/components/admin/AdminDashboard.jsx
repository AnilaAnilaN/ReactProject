import React, { useState } from "react";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-tabs">
        <button onClick={() => setActiveTab("blogs")}>Manage Blogs</button>
        <button onClick={() => setActiveTab("products")}>Manage Products</button>
      </div>

      <div className="admin-content">
        {activeTab === "blogs" && (
          <>
            <BlogForm />
            <BlogList />
          </>
        )}
        {activeTab === "products" && <p>Products management coming soon...</p>}
      </div>
    </div>
  );
}
