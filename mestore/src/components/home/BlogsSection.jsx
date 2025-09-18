import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogsSection.css';

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        // Display a limited number of blog posts, e.g., the first 3
        setBlogs(response.data.slice(0, 3)); 
      } catch (err) {
        setError('Failed to fetch blog posts.');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="blogs-section">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="blogs-section error-message">{error}</div>;
  }

  return (
    <section className="blogs-section">
      <h2>Latest Blog Posts</h2>
      <div className="blog-grid">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-summary">{blog.content.substring(0, 100)}...</p>
              <a href={`/blog/${blog._id}`} className="read-more-link">Read More</a>
            </div>
          ))
        ) : (
          <p>No blog posts to display.</p>
        )}
      </div>
    </section>
  );
}