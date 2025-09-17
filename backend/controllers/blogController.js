const Blog = require("../models/Blog");
const cloudinary = require("../utils/cloudinary"); // optional if using Cloudinary

// Add a new blog
const addBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    let imageUrl = "";
    // Only upload if req.file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const newBlog = new Blog({
      title,
      content,
      author: author || "Admin", // fallback if author is not provided
      image: imageUrl,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error in addBlog:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error in getBlogs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error("Error in getBlogById:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addBlog, getBlogs, getBlogById };
