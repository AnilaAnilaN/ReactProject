import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from './Modal';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { UserContext } from '../context/UserProvider.jsx';
import "./Header.css";

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleNav = () => setNavActive(!navActive);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Optionally redirect or refresh user state
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    // Optionally redirect or refresh user state
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">MeStore</Link>
      </div>

      <div className="hamburger" onClick={toggleNav}>
        ☰
      </div>

      <nav className={`nav ${navActive ? "active" : ""}`}>
        <ul>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/blog">Blog</Link>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <Link to="/order-history">Order History</Link>
              </li>
              <li className="nav-item">
                <Link to="/account">Account</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="account-cart">
        <div className="account">
          {user ? (
            <button onClick={handleLogout} className="header-btn">Logout</button>
          ) : (
            <>
              <button onClick={() => setShowLoginModal(true)} className="header-btn">Login</button>
              <button onClick={() => setShowRegisterModal(true)} className="header-btn">Register</button>
            </>
          )}
        </div>
        <div className="cart">
          <Link to="/cart">
            <span className="icon">🛒</span>
          </Link>
        </div>
      </div>

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginPage 
          onClose={handleLoginSuccess} 
          onShowRegister={() => { 
            setShowLoginModal(false); 
            setShowRegisterModal(true); 
          }}
        />
      </Modal>

      <Modal show={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterPage 
          onClose={handleRegisterSuccess} 
          onShowLogin={() => { 
            setShowRegisterModal(false); 
            setShowLoginModal(true); 
          }}
        />
      </Modal>
    </header>
  );
}
