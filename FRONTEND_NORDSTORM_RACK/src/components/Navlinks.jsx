import React from 'react';
import { Navlink } from '../BrowserRouter/Navlink';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Navlinks = () => {
  return (
    <div className="navlinks-container">
      {
        Navlink.map((el, index) => (
          <Link to={el.to} key={index} className="navlink-item">
            {el.title}
          </Link>
        ))
      }
    </div>
  );
};

export default Navlinks;
