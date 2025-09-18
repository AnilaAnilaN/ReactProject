import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

export default function ProductList({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // refresh list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="product-list-container">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="product-placeholder">No Image</div>
            )}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description || "No description"}</p>
              <p className="product-meta">
                Price: ${product.price} | Stock: {product.stock}
              </p>
              <p className="product-category">{product.category}</p>
              <div className="product-actions">
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
