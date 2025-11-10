import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { getProducts } from '../api/api';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    ordering: '-created_at',
    min_price: '',
    max_price: '',
    in_stock: false,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filters.search) params.search = filters.search;
      if (filters.ordering) params.ordering = filters.ordering;
      if (filters.min_price) params.min_price = filters.min_price;
      if (filters.max_price) params.max_price = filters.max_price;
      if (filters.in_stock) params.in_stock = 'true';

      const response = await getProducts(params);
      setProducts(response.data.results || response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleFilter = (filterData) => {
    setFilters({
      ...filters,
      min_price: filterData.minPrice,
      max_price: filterData.maxPrice,
      in_stock: filterData.inStock,
    });
  };

  const handleSort = (ordering) => {
    setFilters({ ...filters, ordering });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">Featured Products</h1>
      
      <SearchBar 
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
      />

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default HomePage;
