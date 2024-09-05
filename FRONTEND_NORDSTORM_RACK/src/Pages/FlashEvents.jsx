import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "../App.css";
const FlashEvents = () => {
  const [deals, setDeals] = useState([]);

  const url = `https://nordstorm-rack-project.onrender.com/deals/get-deals`;
  const fetchDeals = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDeals(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);
 
  return (
    <div>
      <div className="flash-container">
        {deals.map((product, index) => (
          <div key={index} className="flash-item">
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

export default FlashEvents;
