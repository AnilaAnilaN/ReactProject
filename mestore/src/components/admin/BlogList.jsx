import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogList.css";

export default function BlogList({ onEdit }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs(); // refresh list
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p className="loading">Loading blogs...</p>;
  if (blogs.length === 0) return <p>No blogs yet.</p>;

  return (
    <div className="blog-list">
      <h2>All Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-card">
          <h3>{blog.title}</h3>
          <p>{blog.content.substring(0, 100)}...</p>
          {blog.image && <img src={blog.image} alt={blog.title} />}
          <div className="blog-actions">
            <button onClick={() => onEdit(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
