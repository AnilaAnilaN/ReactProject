import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogList.css";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
            {blog.image && <img src={blog.image} alt={blog.title} />}
          </div>
        ))
      )}
    </div>
  );
}
