import React from 'react';
import './ProductCard.css'; // Assuming you'll create a CSS file for ProductCard

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-button">Add to Cart</button>
    </div>
  );
}
