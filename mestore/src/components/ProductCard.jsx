import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider.jsx';
import './ProductCard.css'; // Assuming you'll create a CSS file for ProductCard

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
