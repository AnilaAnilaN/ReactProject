import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css";

export default function ProductForm({ selectedProduct, onSaved }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Shop",
    stock: 0,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category,
        stock: selectedProduct.stock,
      });
      setImage(null); // reset image input
    }
  }, [selectedProduct]);

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
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      if (selectedProduct) {
        // Edit product
        await axios.put(
          `http://localhost:5000/api/products/${selectedProduct._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Add new product
        await axios.post("http://localhost:5000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSaved(); // refresh list
      setFormData({ name: "", description: "", price: "", category: "Shop", stock: 0 });
      setImage(null);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{selectedProduct ? "Edit Product" : "Add New Product"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option>Shop</option>
        <option>Electronics</option>
        <option>Fashion</option>
        <option>Grocery</option>
        <option>Home & Living</option>
      </select>
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : selectedProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
