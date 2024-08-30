// src/components/Home.js
import React from "react";
import TopDeals from "../assets/TopDeals.webp";
import BrandSlideshow from "../components/BrandSlideshow";
import FlashOffer from "../assets/FlashOffer.png";
import Shopping from "../components/Shopping";
import ProductSlide from "../components/ProductSlide";
import MultipleBrand from "../assets/MultipleBrand.webp";
import vinceBrand from "../assets/vinceBrand.webp";
import Deals from "../components/Deals";
import VideoSlideshow from "../components/VideoSlideshow";
import Trending from "../components/Trending";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
const navigate=useNavigate()
  
  return (
    <div className="home-container">
      <h1 className="home-heading">More to Rack , easier and faster.</h1>
      <button onClick={()=>navigate('/register')} className="signin-button" >Sign In or create account</button>
      <hr className="home-divider" />

      <img src={TopDeals} alt="Top Deals" className="home-image" />
      <hr className="home-divider" />

      <div className="component-container">
        <BrandSlideshow />
      </div>

      <hr className="home-divider" />

      <img src={FlashOffer} alt="Flash Offer" className="home-image" />
      <hr className="home-divider" />

      <div className="component-container">
        <Shopping />
      </div>

      <hr className="home-divider" />

      <div className="home-section">
        <h1 className="section-title">
          Recommended for You in Great Brands, Great Prices
        </h1>
        <div className="component-container">
          <ProductSlide />
        </div>
      </div>

      <img src={MultipleBrand} alt="Multiple Brands" className="home-image" />
      <img src={vinceBrand} alt="Vince Brand" className="home-image" />

      <hr className="home-divider" />

      <div className="component-container">
        <Deals />
      </div>

      <div className="home-section">
        <h1 className="section-title">
          Score! See something you love? Click the photo to shop our Instagram.
          Plus, tag us @nordstromrack to share your finds.
        </h1>
        <div className="component-container">
          <VideoSlideshow />
        </div>
      </div>

      <div className="trending-section">
        <h1 className="section-title">TRENDING NOW</h1>
        <div className="component-container">
          <Trending />
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
