import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const New = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://nordstorm-rack-project.onrender.com/product/get-products"
        );

        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.product)) {
            setProducts(data.product);
          } else {
            setError("Unexpected response structure");
            console.error("Products not found in response:", data);
          }
        } else {
          setError(`Failed to fetch products: ${response.statusText}`);
        }
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch products: ${err.message}`);
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      const cartResponse = await axios.post(
        "https://nordstorm-rack-project.onrender.com/cart/user-cartData",
        {
          user: "userId",
          product: product._id,
          quantity: 1,
          price: product.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(cartResponse.data.message);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Handle Sorting
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    sortProducts(option);
  };

  const sortProducts = (option) => {
    const sortedProducts = [...products];
    switch (option) {
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "titleAtoZ":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleZtoA":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setProducts(sortedProducts);
  };

  // Handle Filtering
  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleSubCategoryFilter = (e) => {
    setSubCategoryFilter(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (categoryFilter ? product.category === categoryFilter : true) &&
      (subCategoryFilter ? product.subCategory === subCategoryFilter : true)
    );
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-products">
      <h1>All Products</h1>

      {/* Sorting and Filtering Options */}
      <div className="controls">
        <label>Sort By:</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="titleAtoZ">Title: A to Z</option>
          <option value="titleZtoA">Title: Z to A</option>
        </select>

        <label>Category</label>
        <select onChange={handleCategoryFilter}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
        </select>

        <label>Sub-Category</label>
        <select onChange={handleSubCategoryFilter}>
          <option value="">All</option>
          <option value="Men's Wear">Men's Wear</option>
          <option value="Women's Wear">Women's Wear</option>
          <option value="Footwear">Footwear</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleProductClick(product._id)}
            >
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Sub-Category: {product.subCategory}</p>

              <div className="product-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default New;
