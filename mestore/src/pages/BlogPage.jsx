import React from "react";
import HeroSection from "../components/blog/HeroSection";
import BlogList from "../components/blog/BlogList";
import Pagination from "../components/blog/Pagination";
import "./BlogPage.css";

const BlogPage = () => {
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <HeroSection />

      {/* Blog List */}
      <div className="blog-page-content">
        <BlogList />
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default BlogPage;
