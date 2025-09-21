import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage"; // Import HomePage
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./components/shop/CheckoutPage";
import "./App.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Render HomePage at root */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
             <Route path="/blogs" element={<BlogPage />} />
             <Route path="/blog" element={<BlogPage />} /> {/* alias */}
             <Route path="/blog/:id" element={<BlogDetail />} />
             <Route path="/shop/" element={<ShopPage />} />
             <Route path="/cart" element={<CartPage />} />
             <Route path="/order-history" element={<OrderHistoryPage />} />
             <Route path="/account" element={<AccountPage />} />
             <Route path="/checkout" element={<CheckoutPage />} />


            {/* Admin route */}
            <Route
              path="/admin"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard />
                ) : (
                  <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
                )
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
