import React, { useState, useEffect } from 'react';
import './ProductGrid.css';
import { Link } from 'react-router-dom';
import { products } from './productData';
import { FaSearch } from "react-icons/fa";

const ProductGrid = () => {
  const [likedProducts, setLikedProducts] = useState({});
  const [sortOrder, setSortOrder] = useState(''); // State to manage sort order
  const [selectedCategory, setSelectedCategory] = useState('All'); // State to manage selected category
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search input

  // Load liked products from localStorage on initial render
  useEffect(() => {
    const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
    setLikedProducts(storedLikedProducts);
  }, []);

  // Save liked products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  }, [likedProducts]);

  // Toggle heart icon
  const toggleHeart = (productId) => {
    setLikedProducts((prev) => {
      const newLikedProducts = { ...prev };
      newLikedProducts[productId] = !newLikedProducts[productId];
      return newLikedProducts;
    });
  };

  const sortProducts = (order) => {
    setSortOrder(order);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const extractPrice = (price) => parseFloat(price.replace('₹', '').replace(',', ''));

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return extractPrice(a.price) - extractPrice(b.price);
    if (sortOrder === 'highToLow') return extractPrice(b.price) - extractPrice(a.price);
    return 0;
  });

  return (
    <div>
      <div className="product-controls">
        <div className="icos"><FaSearch /></div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-box"
        />

        <select
          onChange={(e) => sortProducts(e.target.value)}
          value={sortOrder}
          className="sort-dropdown"
        >
          <option value="">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <select
          onChange={(e) => filterByCategory(e.target.value)}
          value={selectedCategory}
          className="category-dropdown"
        >
          <option value="All">All Categories</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Kitchenware">Kitchenware</option>
          <option value="Self-care">Self-care</option>
        </select>
      </div>

      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="heart-icon" onClick={() => toggleHeart(product.id)}>
              {likedProducts[product.id] ? '❤️' : '🤍'}
            </div>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-seller">{product.seller}</p>
            <p className="product-price">{product.price}</p>
            <Link to={`/details/${product.id}`}>
              <button className="view-more-btn">View More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
