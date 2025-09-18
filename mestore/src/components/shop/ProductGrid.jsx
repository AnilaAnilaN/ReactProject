import React from "react";
import { FaCartPlus, FaBolt } from "react-icons/fa";
import "./ProductGrid.css";

export default function ProductGrid({ products = [], selectedCategory = "All", onAddToCart, onBuy }) {
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts =
    selectedCategory === "All"
      ? safeProducts
      : safeProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="product-grid">
      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found in this category.</p>
      ) : (
        filteredProducts.map((product) => (
          <div key={product._id || product.id} className="product-card">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name || "Product"}
              className="product-img"
            />
            <h4>{product.name || "Unnamed Product"}</h4>
            <p className="product-desc">
              {product.description
                ? product.description.length > 80
                  ? product.description.slice(0, 77) + "..."
                  : product.description
                : "No description available."}
            </p>
            <p className="price">${product.price || "N/A"}</p>
            <div className="product-actions">
              <button
                className="btn-cart"
                onClick={() => onAddToCart && onAddToCart(product)}
              >
                <FaCartPlus /> Add to Cart
              </button>
              <button
                className="btn-buy"
                onClick={() => onBuy && onBuy(product)}
              >
                <FaBolt /> Buy Now
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}