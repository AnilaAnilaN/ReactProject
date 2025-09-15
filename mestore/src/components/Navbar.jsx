import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);

  const toggleShop = () => {
    setShopOpen(!shopOpen);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {/* Shop with dropdown */}
        <li className="menu-item" onClick={toggleShop}>
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
        <li className="menu-item"><a href="/about">About</a></li>
        <li className="menu-item"><a href="/contact">Contact</a></li>
        <li className="menu-item"><a href="/blog">Blog</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
