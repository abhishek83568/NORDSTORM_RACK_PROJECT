import React from "react";
import "../App.css";
import { FaFacebook, FaTwitterSquare, FaInstagramSquare, FaSnapchatSquare, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
            <hr />
      <div className="sb__footer section__padding">
    
        <div className="sb__footer-links">
          <div className="sb__footer-links-div">
            <h4>Help & Information</h4>
            <a href="/customer">
              <p>Customer Service</p>
            </a>
            <a href="/Delivery">
              <p>Delivery Information</p>
            </a>
            <a href="/return">
              <p>Returns & Refunds</p>
            </a>
            <a href="/help">
              <p>Help Center</p>
            </a>
            <a href="/track">
              <p>Track my order</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Resources</h4>
            <a href="/resource">
              <p>Resource Center</p>
            </a>
            <a href="/resource">
              <p>Testimonials</p>
            </a>
            <a href="/resource">
              <p>STV</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Partners</h4>
            <a href="/employer">
              <p>Swing Tech</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Company</h4>
            <a href="/about">
              <p>About</p>
            </a>
            <a href="/press">
              <p>Press</p>
            </a>
            <a href="/career">
              <p>Career</p>
            </a>
          </div>
          <div className="sb__footer-links-div">
            <h4>Connect us on </h4>
            <div className="socialmedia">
              <p><FaFacebook /></p>
              <p><FaInstagramSquare /></p>
              <p><FaYoutube /></p>
              <p><FaSnapchatSquare /></p>
              <p><FaTwitterSquare /></p>
            </div>
          </div>
        </div>
        <hr />
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>&copy; {new Date().getFullYear()} CodeInn. All rights reserved.</p>
          </div>
          <div className="sb__footer-below-links">
            <a href="/terms">
              <div><p>Terms & Conditions</p></div>
            </a>
            <a href="/privacy">
              <div><p>Privacy</p></div>
            </a>
            <a href="/security">
              <div><p>Security</p></div>
            </a>
            <a href="/cookie">
              <div><p>Cookie Declaration</p></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
