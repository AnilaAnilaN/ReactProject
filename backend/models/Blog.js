const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Admin" },
    image: { type: String }, // Cloudinary image URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
