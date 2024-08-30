import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Register = () => {
    const navigate=useNavigate()
  const [register, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7346/user/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(register),
      });

      const data = await response.json();
      console.log(data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div>
      <form onSubmit={handleRegister} className="register-form">
        
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Enter first name"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Enter last name"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <button type="submit">Register</button>
      <h1 className="Signin">Already have an account ?  <Link to={'/'} style={{color:"blue"}}>Sign In </Link> </h1>
      </form>
      </div>
      

      <Footer/>
    </div>
  );
};

export default Register;
