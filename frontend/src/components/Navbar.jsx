import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            🛒 E-Commerce Store
          </Link>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/wishlist" className="navbar-link">
                ❤️ Wishlist
              </Link>
            )}
            <Link to="/cart" className="navbar-link cart-link">
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            {isAuthenticated ? (
              <>
                <span className="navbar-user">👤 {user?.username}</span>
                <button onClick={logout} className="navbar-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleAuthClick('login')} className="navbar-btn">
                  Login
                </button>
                <button onClick={() => handleAuthClick('register')} className="navbar-btn navbar-btn-register">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        mode={authMode}
      />
    </>
  );
};

export default Navbar;
