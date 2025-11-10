import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from '../api/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      // Ensure cartItems is always an array
      setCartItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartAPI(productId, quantity);
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const cartCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  const cartTotal = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + parseFloat(item.total_price), 0) : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
