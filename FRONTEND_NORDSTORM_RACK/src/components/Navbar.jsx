import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  LiaStoreSolid,
  LiaSignInAltSolid,
  LiaSignOutAltSolid,
} from "react-icons/lia";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import Search from "./Search";
import logo from "../assets/App-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isError, setIsError] = useState(null);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [userDetails, setUserDetails] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nordstorm-rack-project.onrender.com/user/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );

      const loginUser = await response.json();

      if (response.ok) {
        localStorage.setItem("token", loginUser.token);
        localStorage.setItem("firstName", loginUser.existingUser.firstname);
        setUserDetails(loginUser.existingUser.firstname);
        setIsLoggedIn(true);
        setIsDropdownOpen(false);
        setIsError(null);
      } else {
        setIsError(loginUser.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsError("Something went wrong. Please try again.");
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setIsLoggedIn(false);
    setUserDetails(null);
    navigate("/");
  };

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    const storedUserDetails = localStorage.getItem("firstName");
    if (token && storedUserDetails) {
      setIsLoggedIn(true);
      setUserDetails(storedUserDetails);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={logo} alt="App Logo" onClick={handleLogoClick} />
      </div>
      <div className="navbar-search">
        <Search />
      </div>
      <div className="navbar-icons">
        <div className="navbar-icon">
          <LiaStoreSolid />
          <span className="navbar-icon-text">Stores</span>
        </div>
        <div className="navbar-icon">
          <BiSolidPurchaseTagAlt />
          <span className="navbar-icon-text">Purchases</span>
        </div>
        <div className="navbar-icon" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          <span className="navbar-icon-text">Cart</span>
        </div>
        <div className="navbar-icon" onClick={handleToggleDropdown}>
          {isLoggedIn ? (
            <div className="navbar-icon" onClick={handleLogout}>
              <LiaSignOutAltSolid />
              <span className="navbar-icon-text">Logout</span>
            </div>
          ) : (
            <div className="navbar-icon">
              <LiaSignInAltSolid />
              <span className="navbar-icon-text">Sign In</span>
            </div>
          )}
        </div>
      </div>

      {isDropdownOpen && !isLoggedIn && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <h3>Sign In</h3>
          {isError && <p className="error-message">{isError}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) =>
                setLogin({ ...login, [e.target.name]: e.target.value })
              }
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) =>
                setLogin({ ...login, [e.target.name]: e.target.value })
              }
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <h3>
            New to Nordstrom Rack?{" "}
            <Link
              to={"/register"}
              onClick={handleToggleDropdown}
              style={{ color: "blue" }}
            >
              Register Now
            </Link>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Navbar;
