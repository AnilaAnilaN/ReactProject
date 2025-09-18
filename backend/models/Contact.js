// backend/models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String }, // Cloudinary image URL if needed
    read: { type: Boolean, default: false }, // track unread
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Contact", contactSchema);
