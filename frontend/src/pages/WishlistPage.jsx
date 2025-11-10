import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getWishlist, removeFromWishlist } from '../api/api';
import './WishlistPage.css';

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="wishlist-empty">
          <h2>Please login to view your wishlist</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="container">
        <div className="wishlist-empty">
          <h2>Your wishlist is empty</h2>
          <p>Add products you love to your wishlist!</p>
          <Link to="/" className="shop-btn">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">My Wishlist</h1>
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-card">
            <Link to={`/product/${item.product.id}`} className="wishlist-image">
              {item.product.image_url ? (
                <img src={item.product.image_url} alt={item.product.name} />
              ) : (
                <div className="placeholder">📦</div>
              )}
            </Link>
            <div className="wishlist-info">
              <Link to={`/product/${item.product.id}`}>
                <h3>{item.product.name}</h3>
              </Link>
              <p className="wishlist-price">${parseFloat(item.product.price).toFixed(2)}</p>
              <button 
                onClick={() => handleRemove(item.id)}
                className="remove-wishlist-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
