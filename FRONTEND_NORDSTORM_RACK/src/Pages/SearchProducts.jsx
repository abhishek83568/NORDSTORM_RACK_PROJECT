import "../App.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SearchProducts = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const initialQuery = queryParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://nordstorm-rack-project.onrender.com/deals/get-searchDeals?limit=5&page=${page}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      const newProducts = data.product || [];
      setFilteredProducts((prev) => [...prev, ...newProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setFilteredProducts([]);
    setPage(1);
    fetchProducts();
  }, [query]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  

  return (
    <div className="product-grid">
     
      <div className="grid-container">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchProducts;
