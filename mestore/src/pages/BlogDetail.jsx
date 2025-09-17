// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!id) throw new Error("Missing blog id");
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        if (!cancelled) setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        if (!cancelled) {
          const msg = err.response?.data?.error || err.message || "Failed to load blog";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBlog();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <p className="loading">Loading blog...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="error">Blog not found.</p>;

  return (
    <div className="blog-detail">
      <div className="blog-detail-hero">
        <h1>{blog.title}</h1>
        <p className="blog-detail-meta">
          By {blog.author || "Admin"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {blog.image && (
        <div className="blog-detail-image">
          <img src={blog.image} alt={blog.title} />
        </div>
      )}

      <div className="blog-detail-content">
        {/* if content is HTML, render it as HTML; otherwise render plain text */}
        {/<[a-z][\s\S]*>/i.test(blog.content || "") ? (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p>{blog.content}</p>
        )}
      </div>

      <div className="blog-detail-footer">
        <Link to="/blogs" className="back-btn">
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
