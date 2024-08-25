import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { LiaStoreSolid, LiaSignInAltSolid } from "react-icons/lia";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import Search from "./Search";
import logo from '../assets/App-logo.webp'
import "../App.css"; 

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img
          src={logo}
          alt="App Logo"
        />
      </div>
      <div className="navbar-search">
        <Search />
      </div>
      <div className="navbar-icons">
        <div className="navbar-icon">
          <LiaSignInAltSolid />
          <span className="navbar-icon-text">Sign In</span>
        </div>
        <div className="navbar-icon">
          <LiaStoreSolid />
          <span className="navbar-icon-text">Stores</span>
        </div>
        <div className="navbar-icon">
          <BiSolidPurchaseTagAlt />
          <span className="navbar-icon-text">Purchases</span>
        </div>
        <div className="navbar-icon">
          <FaShoppingCart />
          <span className="navbar-icon-text">Cart</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
