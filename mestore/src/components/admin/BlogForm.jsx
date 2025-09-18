import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./BlogForm.css";

export default function BlogForm({ selectedBlog, onSaved }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Admin",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBlog) {
      setFormData({
        title: selectedBlog.title,
        content: selectedBlog.content,
        author: selectedBlog.author || "Admin",
      });
      setImage(null); // reset image input
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    if (image) data.append("image", image);

    try {
      if (selectedBlog) {
        // update
        await axios.put(
          `http://localhost:5000/api/blogs/${selectedBlog._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Blog updated successfully!");
      } else {
        // create
        await axios.post("http://localhost:5000/api/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Blog added successfully!");
      }

      setFormData({ title: "", content: "", author: "Admin" });
      setImage(null);
      if (onSaved) onSaved(); // refresh list in parent
    } catch (error) {
      toast.error("Error saving blog");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      <h2>{selectedBlog ? "Edit Blog" : "Add New Blog"}</h2>
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
        {loading ? (selectedBlog ? "Updating..." : "Publishing...") : selectedBlog ? "Update Blog" : "Publish Blog"}
      </button>

      {loading && (
        <p className="loading-msg">
          {selectedBlog ? "Updating blog..." : "Publishing blog..."}
        </p>
      )}
    </form>
  );
}
