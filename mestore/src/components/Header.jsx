import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [shopOpen, setShopOpen] = useState(false);
  const [navActive, setNavActive] = useState(false);

  const toggleShop = () => setShopOpen(!shopOpen);
  const toggleNav = () => setNavActive(!navActive);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">MeStore</div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={toggleNav}>☰</div>

      {/* Navigation */}
      <nav className={`nav ${navActive ? "active" : ""}`}>
        <ul>
         

          {/* Direct links */}
          <li className="nav-item"><a href="/">Home</a></li>
          <li className="nav-item"><a href="/shop">Shop</a></li>
          <li className="nav-item"><a href="/about">About</a></li>
          <li className="nav-item"><a href="/contact">Contact</a></li>
          <li className="nav-item"><a href="/blog">Blog</a></li>
        </ul>
      </nav>

      {/* Account */}
      <div className="account">
        <span className="icon">👤</span>
        <a href="#">Create Account</a>
      </div>
    </header>
  );
}
