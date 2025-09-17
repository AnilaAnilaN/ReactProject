import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/AdminLogin";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";

import "./App.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<h1>Welcome to MeStore</h1>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
             <Route path="/blogs" element={<BlogPage />} />
             <Route path="/blog" element={<BlogPage />} /> {/* alias */}
             <Route path="/blog/:id" element={<BlogDetail />} />


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
