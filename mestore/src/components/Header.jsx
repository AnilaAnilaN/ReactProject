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
          {/* Shop with dropdown */}
          <li className="nav-item" onClick={toggleShop}>
            Shop ▾
            {shopOpen && (
              <ul className="dropdown">
                <li><a href="/electronics">Electronics</a></li>
                <li><a href="/fashion">Fashion</a></li>
                <li><a href="/grocery">Grocery</a></li>
                <li><a href="/home-living">Home & Living</a></li>
              </ul>
            )}
          </li>

          {/* Direct links */}
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
