const express = require("express");
const { addBlog, getBlogs, getBlogById  } = require("../controllers/blogController");
const upload = require("../middleware/upload");

const router = express.Router();

// Create blog with image upload
router.post("/", upload.single("image"), addBlog);

// Get all blogs
router.get("/", getBlogs);
router.get("/:id", getBlogById); 

module.exports = router;
