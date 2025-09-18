const Blog = require("../models/Blog");
const { uploadToCloudinary } = require("../utils/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const checkExists = require("../utils/checkExists");

// Add a new blog
const addBlog = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  let imageUrl = "";

  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.path);
  }

  const newBlog = new Blog({
    title,
    content,
    author: author || "Admin",
    image: imageUrl,
  });

  await newBlog.save();
  res.status(201).json(newBlog);
});

// Get all blogs
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(blogs);
});

// Get blog by ID
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await checkExists(Blog, req.params.id, res, "Blog");
  res.status(200).json(blog);
});

// Update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;
  const blog = await checkExists(Blog, req.params.id, res, "Blog");

  if (req.file) {
    blog.image = await uploadToCloudinary(req.file.path);
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.author = author || blog.author;

  await blog.save();
  res.status(200).json(blog);
});

// Delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await checkExists(Blog, req.params.id, res, "Blog");
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
});

module.exports = { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
