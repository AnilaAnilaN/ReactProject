// src/components/blog/BlogList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BlogList.css";
import Pagination from "./Pagination";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // adjust as needed

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data); // same as admin
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <section className="blog-list">
      <div className="blog-list-container">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <div className="blog-card-image">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} />
                ) : (
                  <div className="blog-card-placeholder"></div>
                )}
              </div>
              <div className="blog-card-content">
                <h2>{blog.title}</h2>
                <p>
                  {blog.content.length > 150
                    ? blog.content.substring(0, 150) + "..."
                    : blog.content}
                </p>
                <div className="blog-card-meta">
                  <span>By {blog.author || "Unknown"}</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <a href={`/blog/${blog._id}`} className="view-more">
                  View More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available yet.</p>
        )}
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default BlogList;
