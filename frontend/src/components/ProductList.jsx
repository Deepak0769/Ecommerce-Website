import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-card">
          <div className="product-image">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} />
            ) : (
              <div className="placeholder-image">📦</div>
            )}
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
            <p className="product-stock">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
