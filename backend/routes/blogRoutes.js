const express = require("express");
const { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");
const upload = require("../middleware/upload");

const router = express.Router();

// Create blog with image upload
router.post("/", upload.single("image"), addBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog
router.get("/:id", getBlogById);

// Update blog
router.put("/:id", upload.single("image"), updateBlog);

// Delete blog
router.delete("/:id", deleteBlog);

module.exports = router;
