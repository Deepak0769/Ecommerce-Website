import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { addToWishlist, getReviews, createReview } from '../api/api';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const fetchReviews = useCallback(async () => {
    try {
      const response = await getReviews(product.id);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [product.id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      setMessage('');
      await addToCart(product.id, quantity);
      setMessage('Added to cart successfully!');
      setQuantity(1);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      setMessage('Please login to add to wishlist');
      return;
    }
    try {
      await addToWishlist(product.id);
      setMessage('Added to wishlist!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add to wishlist');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage('Please login to write a review');
      return;
    }
    try {
      await createReview({ ...reviewData, product: product.id });
      setMessage('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewData({ rating: 5, comment: '' });
      fetchReviews();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to submit review');
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail-image">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} />
          ) : (
            <div className="placeholder-image-large">📦</div>
          )}
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <div className="product-rating">
            {'⭐'.repeat(Math.round(product.average_rating || 0))}
            <span> ({product.review_count || 0} reviews)</span>
          </div>
          <p className="product-detail-price">${parseFloat(product.price).toFixed(2)}</p>
          <p className="product-detail-stock">
            {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </p>
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={product.stock === 0}
              />
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
            <button
              className="wishlist-btn"
              onClick={handleAddToWishlist}
            >
              ❤️ Wishlist
            </button>
          </div>
          
          {message && <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        </div>
      </div>

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          {isAuthenticated && (
            <button 
              className="write-review-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-group">
              <label>Rating:</label>
              <select 
                value={reviewData.rating}
                onChange={(e) => setReviewData({...reviewData, rating: parseInt(e.target.value)})}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} ⭐</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Comment:</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                required
                rows="4"
              />
            </div>
            <button type="submit" className="submit-review-btn">Submit Review</button>
          </form>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <strong>{review.username}</strong>
                  <span className="review-rating">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
