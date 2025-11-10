import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Auth API
export const login = (username, password) => api.post('/auth/login/', { username, password });
export const register = (userData) => api.post('/auth/register/', userData);
export const logout = () => api.post('/auth/logout/');
export const getUser = () => api.get('/auth/user/');

// Product API
export const getProducts = (params) => api.get('/products/', { params });
export const getProduct = (id) => api.get(`/products/${id}/`);

// Cart API
export const getCart = () => {
  const sessionId = getSessionId();
  return api.get(`/cart/?session_id=${sessionId}`);
};

export const addToCart = (productId, quantity = 1) => {
  const sessionId = getSessionId();
  return api.post('/cart/', {
    session_id: sessionId,
    product_id: productId,
    quantity: quantity,
  });
};

export const removeFromCart = (productId) => {
  const sessionId = getSessionId();
  return api.post('/cart/remove/', {
    session_id: sessionId,
    product_id: productId,
  });
};

export const clearCart = () => {
  const sessionId = getSessionId();
  return api.post('/cart/clear/', {
    session_id: sessionId,
  });
};

// Review API
export const getReviews = (productId) => api.get(`/products/reviews/?product_id=${productId}`);
export const createReview = (data) => api.post('/products/reviews/', data);

// Wishlist API
export const getWishlist = () => api.get('/products/wishlist/');
export const addToWishlist = (productId) => api.post('/products/wishlist/', { product_id: productId });
export const removeFromWishlist = (id) => api.delete(`/products/wishlist/${id}/`);

export default api;
