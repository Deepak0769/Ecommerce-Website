import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, loading } = useCart();

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              {item.product.image_url ? (
                <img src={item.product.image_url} alt={item.product.name} />
              ) : (
                <div className="placeholder-image-small">📦</div>
              )}
            </div>
            <div className="cart-item-details">
              <h3>{item.product.name}</h3>
              <p className="cart-item-price">${parseFloat(item.product.price).toFixed(2)} each</p>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
            </div>
            <div className="cart-item-total">
              <p className="cart-item-total-price">${parseFloat(item.total_price).toFixed(2)}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
