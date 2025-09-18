import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard'; // Import the new ProductCard component
import './ProductsSection.css';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Display a limited number of products, e.g., the first 8
        setProducts(response.data.slice(0, 8)); 
      } catch (err) {
        setError('Failed to fetch products.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="products-section">Loading products...</div>;
  }

  if (error) {
    return <div className="products-section error-message">{error}</div>;
  }

  return (
    <section className="products-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products to display.</p>
        )}
      </div>
    </section>
  );
}