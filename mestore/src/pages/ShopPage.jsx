import React, { useState, useEffect } from "react";
import axios from "axios";
import CategorySidebar from "../components/shop/CategorySidebar";
import ProductGrid from "../components/shop/ProductGrid";
import CheckoutForm from "../components/shop/CheckoutForm";
import CheckoutPage from "../components/shop/CheckoutPage";
import "./ShopPage.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [step, setStep] = useState("browse"); 
  const [showModal, setShowModal] = useState(false);

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
    setStep("form");
    setShowModal(true);
  };

  const handleFormSubmit = (userData) => {
    setCheckoutData(userData);
    setStep("checkout");
  };

  const closeModal = () => {
    setShowModal(false);
    setStep("browse");
    setBuyNowProduct(null);
    setCheckoutData(null);
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
        />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>✖</button>

            {step === "form" && buyNowProduct && (
              <CheckoutForm product={buyNowProduct} onSubmit={handleFormSubmit} />
            )}

            {step === "checkout" && buyNowProduct && checkoutData && (
              <CheckoutPage product={buyNowProduct} userData={checkoutData} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
