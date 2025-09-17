import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./BlogForm.css";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Admin",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // track publishing state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading state

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    if (image) data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog added successfully!");
      setFormData({ title: "", content: "", author: "Admin" });
      setImage(null);
    } catch (error) {
      toast.error("Error adding blog");
      console.error(error);
    } finally {
      setLoading(false); // reset loading
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>Add New Blog</h2>
      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Blog Content"
        rows="5"
        value={formData.content}
        onChange={handleChange}
        required
      ></textarea>
      <input type="file" onChange={handleFileChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Publishing..." : "Publish Blog"}
      </button>

      {loading && <p className="loading-msg">Please wait, publishing your blog...</p>}
    </form>
  );
}
