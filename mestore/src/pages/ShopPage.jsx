import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategorySidebar from "../components/shop/CategorySidebar";
import ProductGrid from "../components/shop/ProductGrid";
import CheckoutPage from "../components/shop/CheckoutPage";
import { CartContext } from '../context/CartProvider.jsx';
import toast from 'react-hot-toast';
import "./ShopPage.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [step, setStep] = useState("browse"); 
  const [showModal, setShowModal] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    setBuyNowProduct(product);
    setStep("checkout"); // Directly go to checkout step
    setShowModal(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1); // Add 1 quantity of the product to cart
    toast.success(`${product.name} added to cart!`);
  };

  const closeModal = () => {
    setShowModal(false);
    setStep("browse");
    setBuyNowProduct(null);
  };

  return (
    <div className="shop-page">
      <div className="shop-content">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onBuy={handleBuyNow}
          onAddToCart={handleAddToCart}
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>✖</button>

            {step === "checkout" && buyNowProduct && (
              <CheckoutPage product={buyNowProduct} onDone={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}